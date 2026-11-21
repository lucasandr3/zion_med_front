import { Component, OnInit, OnDestroy, inject, Signal, ChangeDetectionStrategy, signal, computed, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlataformaService, PlatformTenant } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';
import { statusAssinaturaOuCobrancaPt } from '../../../core/utils/status-labels-pt';
import { ZmPageBackLinkComponent, ZmPaginationComponent } from '../../../shared/components/ui';
import { GestgoSheetService } from '../../../shared/components/sheet/sheet.service';
import type { GestgoSheetRef } from '../../../shared/components/sheet/sheet-ref';

type FiltroCliente = 'todos' | 'trial' | 'ativos' | 'inativos' | 'bloqueados' | 'duplicados';

const AVATAR_COLORS = ['#12b886', '#3b82f6', '#a855f7', '#f97316', '#ec4899', '#0ea5a4'];

@Component({
  selector: 'app-plataforma-clientes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterLink, ListSkeletonComponent, ZmPageBackLinkComponent, ZmPaginationComponent],
  templateUrl: './plataforma-clientes-fullbleed.component.html',
  styleUrl: './plataforma-clientes-fullbleed.component.css',
})
export class PlataformaClientesComponent implements OnInit, OnDestroy {
  protected readonly rotuloStatusAssinaturaCobranca = statusAssinaturaOuCobrancaPt;

  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly estadoErro = signal(false);
  readonly tenants = signal<PlatformTenant[]>([]);
  readonly busca = signal('');
  readonly filtroAtivo = signal<FiltroCliente>('todos');
  readonly ordenacao = signal<'prioridade' | 'nome'>('prioridade');
  readonly paginaAtual = signal(1);
  readonly itensPorPagina = 20;
  readonly filterDrawerOpen = signal(false);
  filtroRascunho: FiltroCliente = 'todos';
  ordenacaoRascunho: 'prioridade' | 'nome' = 'prioridade';

  @ViewChild('clientesFiltrosTpl') clientesFiltrosTpl?: TemplateRef<void>;
  readonly filtros = [
    { id: 'todos' as const, label: 'Todos' },
    { id: 'trial' as const, label: 'Período de teste' },
    { id: 'ativos' as const, label: 'Ativos' },
    { id: 'inativos' as const, label: 'Inativos' },
    { id: 'bloqueados' as const, label: 'Cobrança bloqueada' },
    { id: 'duplicados' as const, label: 'Possíveis duplicados' },
  ];

  readonly nomesDuplicados = computed(() => {
    const contagem = new Map<string, number>();
    this.tenants().forEach((tenant) => {
      const nome = this.normalizar(tenant.name);
      contagem.set(nome, (contagem.get(nome) ?? 0) + 1);
    });
    return new Set([...contagem.entries()].filter(([, total]) => total > 1).map(([nome]) => nome));
  });

  readonly metricas = computed(() => ({
    total: this.tenants().length,
    trial: this.tenants().filter((tenant) => this.emTrial(tenant)).length,
    inativos: this.tenants().filter((tenant) => this.inativo(tenant)).length,
    bloqueados: this.tenants().filter((tenant) => this.bloqueado(tenant)).length,
    duplicados: this.nomesDuplicados().size,
  }));

  readonly tenantsFiltrados = computed(() => {
    const termo = this.normalizar(this.busca());
    const lista = this.tenants().filter((tenant) => {
      const correspondeBusca = !termo || [tenant.name, tenant.slug, ...(tenant.active_plans ?? [])]
        .some((valor) => this.normalizar(valor).includes(termo));
      return correspondeBusca && this.correspondeFiltro(tenant, this.filtroAtivo());
    });
    return [...lista].sort((a, b) => this.ordenacao() === 'nome'
      ? a.name.localeCompare(b.name, 'pt-BR')
      : this.prioridade(a) - this.prioridade(b) || a.name.localeCompare(b.name, 'pt-BR'));
  });

  readonly totalPaginas = computed(() => Math.max(1, Math.ceil(this.tenantsFiltrados().length / this.itensPorPagina)));

  readonly tenantsVisiveis = computed(() => {
    const pagina = Math.min(this.paginaAtual(), this.totalPaginas());
    const inicio = (pagina - 1) * this.itensPorPagina;
    return this.tenantsFiltrados().slice(inicio, inicio + this.itensPorPagina);
  });

  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);
  private route = inject(ActivatedRoute);
  private readonly vcr = inject(ViewContainerRef);
  private readonly gestgoSheet = inject(GestgoSheetService);
  private filtrosSheetRef?: GestgoSheetRef<void>;

  ngOnInit(): void {
    const filtro = this.route.snapshot.queryParamMap.get('filtro');
    if (this.filtros.some((item) => item.id === filtro)) {
      this.filtroAtivo.set(filtro as FiltroCliente);
    }
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getTenants());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.tenants.set(res.data ?? []);
      },
      error: () => {
        this.listaPronta.set(true);
        this.estadoErro.set(true);
      },
    });
  }

  ngOnDestroy(): void {
    this.filtrosSheetRef?.close();
  }

  get temFiltrosAtivos(): boolean {
    return this.filtroAtivo() !== 'todos' || this.ordenacao() !== 'prioridade';
  }

  get quantidadeFiltrosAtivos(): number {
    return Number(this.filtroAtivo() !== 'todos') + Number(this.ordenacao() !== 'prioridade');
  }

  openFilterDrawer(): void {
    if (this.filtrosSheetRef) {
      this.filtrosSheetRef.close();
      return;
    }
    if (!this.clientesFiltrosTpl) return;
    this.filtroRascunho = this.filtroAtivo();
    this.ordenacaoRascunho = this.ordenacao();
    this.filterDrawerOpen.set(true);
    this.filtrosSheetRef = this.gestgoSheet.create<void, void>({
      zContent: this.clientesFiltrosTpl,
      zViewContainerRef: this.vcr,
      zSide: 'right',
      zSize: 'custom',
      zWidth: 'min(100vw, 24rem)',
      zHeight: '100dvh',
      zTitle: 'Filtros',
      zCustomClasses: 'gestgo-filter-sheet-panel',
      zHideFooter: true,
      zOkText: null,
      zCancelText: null,
      zMaskClosable: true,
      zAfterClose: () => {
        this.filtrosSheetRef = undefined;
        this.filterDrawerOpen.set(false);
      },
    });
  }

  aplicarFiltrosDrawer(): void {
    this.filtroAtivo.set(this.filtroRascunho);
    this.ordenacao.set(this.ordenacaoRascunho);
    this.paginaAtual.set(1);
    this.filtrosSheetRef?.close();
  }

  limparFiltrosDrawer(): void {
    this.filtroRascunho = 'todos';
    this.ordenacaoRascunho = 'prioridade';
    this.filtroAtivo.set('todos');
    this.ordenacao.set('prioridade');
    this.paginaAtual.set(1);
    this.filtrosSheetRef?.close();
  }

  planosRotulo(tenant: PlatformTenant): string {
    const plans = tenant.active_plans ?? [];
    if (plans.length === 0) return 'Sem plano ativo';
    return plans.join(', ');
  }

  atualizarBusca(event: Event): void { this.busca.set((event.target as HTMLInputElement).value); this.paginaAtual.set(1); }
  selecionarFiltro(filtro: FiltroCliente): void { this.filtroAtivo.set(filtro); this.paginaAtual.set(1); }
  selecionarOrdenacao(ordem: 'prioridade' | 'nome'): void { this.ordenacao.set(ordem); this.paginaAtual.set(1); }
  limparFiltros(): void { this.busca.set(''); this.filtroAtivo.set('todos'); this.paginaAtual.set(1); }
  irParaPagina(pagina: number): void { this.paginaAtual.set(Math.min(Math.max(1, pagina), this.totalPaginas())); }
  contagemTexto(): string {
    const total = this.tenantsFiltrados().length;
    if (total === 0) return 'Nenhum cliente encontrado';
    const inicio = (this.paginaAtual() - 1) * this.itensPorPagina + 1;
    const fim = Math.min(this.paginaAtual() * this.itensPorPagina, total);
    return `${inicio}–${fim} de ${total} ${total === 1 ? 'cliente' : 'clientes'}`;
  }
  quantidadeFiltro(filtro: FiltroCliente): number {
    return this.tenants().filter((tenant) => this.correspondeFiltro(tenant, filtro)).length;
  }
  iniciais(nome: string): string {
    return nome.trim().split(/\s+/).slice(0, 2).map((parte) => parte[0]?.toUpperCase() ?? '').join('');
  }
  corAvatar(nome: string): string {
    let hash = 0;
    for (let i = 0; i < nome.length; i++) hash += nome.charCodeAt(i);
    return AVATAR_COLORS[hash % AVATAR_COLORS.length];
  }
  possivelDuplicado(tenant: PlatformTenant): boolean { return this.nomesDuplicados().has(this.normalizar(tenant.name)); }
  statusPrincipal(tenant: PlatformTenant): string | null { return tenant.billing_status || tenant.subscription_status || null; }
  resumoSituacao(tenant: PlatformTenant): string {
    if (this.bloqueado(tenant)) return 'Cobrança bloqueada · requer atenção';
    if (this.inativo(tenant)) return 'Inativo · reativar ou revisar cadastro';
    if (this.emTrial(tenant)) return 'Em teste · acompanhar conversão';
    if (this.ativo(tenant)) return 'Cliente ativo';
    return 'Situação ainda não informada';
  }

  badgeVariant(status?: string | null): 'success' | 'warning' | 'danger' | 'neutral' | 'info' {
    const k = this.normalizar(status);
    if (['active', 'ativo', 'ok', 'paid', 'pago'].includes(k)) return 'success';
    if (['trial', 'teste', 'attention', 'past_due', 'pending', 'pendente'].includes(k)) return 'warning';
    if (['blocked', 'bloqueado', 'inactive', 'inativo', 'overdue', 'vencido'].includes(k)) return 'danger';
    return 'neutral';
  }

  private correspondeFiltro(tenant: PlatformTenant, filtro: string): boolean {
    if (filtro === 'todos') return true;
    if (filtro === 'trial') return this.emTrial(tenant);
    if (filtro === 'ativos') return this.ativo(tenant);
    if (filtro === 'inativos') return this.inativo(tenant);
    if (filtro === 'bloqueados') return this.bloqueado(tenant);
    return this.possivelDuplicado(tenant);
  }
  private prioridade(tenant: PlatformTenant): number {
    if (this.bloqueado(tenant)) return 0;
    if (this.emTrial(tenant)) return 1;
    if (this.inativo(tenant)) return 2;
    if (this.possivelDuplicado(tenant)) return 3;
    if (this.ativo(tenant)) return 4;
    return 5;
  }
  private emTrial(tenant: PlatformTenant): boolean { return this.statusContem(tenant, ['trial', 'teste']); }
  private bloqueado(tenant: PlatformTenant): boolean { return this.statusContem(tenant, ['blocked', 'bloqueado', 'overdue', 'vencido']); }
  private inativo(tenant: PlatformTenant): boolean { return this.statusContem(tenant, ['inactive', 'inativo', 'cancelled', 'canceled', 'cancelado']); }
  private ativo(tenant: PlatformTenant): boolean {
    return this.statusContem(tenant, ['active', 'ativo', 'ok', 'paid', 'pago']) && !this.bloqueado(tenant);
  }
  private statusContem(tenant: PlatformTenant, valores: string[]): boolean {
    const statuses = [tenant.subscription_status, tenant.billing_status].map((status) => this.normalizar(status));
    return valores.some((valor) => statuses.includes(valor));
  }
  private normalizar(valor?: string | null): string {
    return (valor ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
  }
}
