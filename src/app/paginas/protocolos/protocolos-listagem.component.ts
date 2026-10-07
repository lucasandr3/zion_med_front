import { Component, OnInit, OnDestroy, inject, Signal, ViewChild, TemplateRef, ViewContainerRef, ChangeDetectionStrategy, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProtocolosService, Protocolo } from '../../core/services/protocolos.service';
import { TemplatesService, Template } from '../../core/services/templates.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../shared/components/list-skeleton/list-skeleton.component';
import { ZmPaginationComponent } from '../../shared/components/ui';
import { GestgoSheetService } from '@/shared/components/sheet/sheet.service';
import type { GestgoSheetRef } from '@/shared/components/sheet/sheet-ref';
import { GestgoComboboxComponent, type GestgoComboboxOption } from '@/shared/components/combobox';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-protocolos-listagem',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  imports: [
    ...NORD_FORM_IMPORTS,
    FormsModule,
    RouterLink,
    ListSkeletonComponent,
    ZmPaginationComponent,
    GestgoComboboxComponent],
  templateUrl: './protocolos-listagem.component.html',
})
export class ProtocolosListagemComponent implements OnInit, OnDestroy {
  readonly protocolos = signal<Protocolo[]>([]);
  readonly templates = signal<Template[]>([]);
  readonly meta = signal<{ current_page: number; last_page: number; per_page: number; total: number }>({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  });
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly erro = signal('');
  readonly exportando = signal(false);

  busca = '';
  template_id: number | '' = '';
  status: string = '';
  data_inicio = '';
  data_fim = '';
  readonly filterDrawerOpen = signal(false);

  @ViewChild('protocolosFiltrosTpl') protocolosFiltrosTpl?: TemplateRef<void>;

  private filtrosSheetRef?: GestgoSheetRef<void>;

  private protocolosService = inject(ProtocolosService);
  private templatesService = inject(TemplatesService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private readonly vcr = inject(ViewContainerRef);
  private readonly gestgoSheet = inject(GestgoSheetService);

  readonly opcoesStatusFiltro: GestgoComboboxOption[] = [
    { value: '', label: 'Todas' },
    { value: 'pending', label: 'Pendente' },
    { value: 'approved', label: 'Aprovado' },
    { value: 'rejected', label: 'Reprovado' },
    { value: 'revoked', label: 'Revogado' }];

  get opcoesTemplateFiltro(): GestgoComboboxOption[] {
    return [
      { value: '', label: 'Todos' },
      ...this.templates().map((t) => ({ value: String(t.id), label: t.name }))];
  }

  get templateFiltroKey(): string {
    return this.template_id === '' ? '' : String(this.template_id);
  }

  selecionarTemplateFiltro(key: string | null): void {
    if (!key) {
      this.template_id = '';
      return;
    }
    this.template_id = key === '' ? '' : Number(key);
  }

  selecionarStatusFiltro(key: string | null): void {
    this.status = key ?? '';
  }

  ngOnDestroy(): void {
    this.filtrosSheetRef?.close();
  }
  ngOnInit(): void {
    const statusFromQuery = this.route.snapshot.queryParamMap.get('status');
    if (statusFromQuery) {
      this.status = statusFromQuery;
    }
    this.templatesService.list().subscribe({ next: (t) => this.templates.set(t) });
    this.carregar();
  }

  get temFiltrosAtivos(): boolean {
    return !!(
      this.template_id !== '' ||
      this.status !== '' ||
      this.data_inicio !== '' ||
      this.data_fim !== ''
    );
  }

  get quantidadeFiltrosAtivos(): number {
    let n = 0;
    if (this.template_id !== '') n++;
    if (this.status !== '') n++;
    if (this.data_inicio !== '') n++;
    if (this.data_fim !== '') n++;
    return n;
  }

  carregar(page = 1): void {
    const params: Parameters<ProtocolosService['list']>[0] = { per_page: 20, page };
    if (this.busca?.trim()) params.busca = this.busca.trim();
    if (this.template_id !== '') params.template_id = Number(this.template_id);
    if (this.status) params.status = this.status;
    if (this.data_inicio) params.data_inicio = this.data_inicio;
    if (this.data_fim) params.data_fim = this.data_fim;

    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.protocolosService.list(params));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.protocolos.set(res.data);
        this.meta.set(res.meta);
      },
      error: () => {
        this.listaPronta.set(true);
        this.erro.set('Não foi possível carregar os protocolos.');
      },
    });
  }

  aplicarFiltros(): void {
    this.carregar(1);
    this.filtrosSheetRef?.close();
  }

  limparFiltros(): void {
    this.template_id = '';
    this.status = '';
    this.data_inicio = '';
    this.data_fim = '';
    this.carregar(1);
    this.filtrosSheetRef?.close();
  }

  openFilterDrawer(): void {
    if (this.filtrosSheetRef) {
      this.filtrosSheetRef.close();
      return;
    }
    if (!this.protocolosFiltrosTpl) {
      return;
    }
    this.filterDrawerOpen.set(true);
    this.filtrosSheetRef = this.gestgoSheet.create<void, void>({
      zContent: this.protocolosFiltrosTpl,
      zViewContainerRef: this.vcr,
      zSide: 'right',
      zSize: 'lg',
      zTitle: 'Filtros',
      zHideFooter: true,
      zOkText: null,
      zCancelText: null,
      zAfterClose: () => {
        this.filtrosSheetRef = undefined;
        this.filterDrawerOpen.set(false);
      },
    });
  }

  irParaDetalhe(p: Protocolo, event: Event): void {
    if ((event.target as HTMLElement).closest('a, button')) return;
    this.router.navigate(['/protocolos', p.id]);
  }

  statusLabel(s: string): string {
    const map: Record<string, string> = {
      pending: 'Pendente',
      approved: 'Aprovado',
      rejected: 'Reprovado',
      revoked: 'Revogado',
    };
    return map[s?.toLowerCase()] ?? s;
  }

  dataFormatada(val: string | undefined): string {
    if (!val) return '—';
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  exportarCsv(): void {
    this.exportando.set(true);
    const params: { template_id?: number; status?: string; data_inicio?: string; data_fim?: string } = {};
    if (this.template_id !== '') params.template_id = Number(this.template_id);
    if (this.status) params.status = this.status;
    if (this.data_inicio) params.data_inicio = this.data_inicio;
    if (this.data_fim) params.data_fim = this.data_fim;

    this.protocolosService.exportarCsv(params).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `protocolos-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        this.exportando.set(false);
      },
      error: () => this.exportando.set(false),
    });
  }

  exportarPdf(): void {
    this.exportando.set(true);
    const params: { template_id?: number; status?: string; data_inicio?: string; data_fim?: string; limit?: number } = { limit: 50 };
    if (this.template_id !== '') params.template_id = Number(this.template_id);
    if (this.status) params.status = this.status;
    if (this.data_inicio) params.data_inicio = this.data_inicio;
    if (this.data_fim) params.data_fim = this.data_fim;

    this.protocolosService.exportarPdf(params).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `protocolos-pdf-${new Date().toISOString().slice(0, 10)}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        this.exportando.set(false);
      },
      error: () => this.exportando.set(false),
    });
  }

  contagemTexto(): string {
    const n = this.meta().total;
    return n === 1 ? '1 registro' : `${n} registros`;
  }
}
