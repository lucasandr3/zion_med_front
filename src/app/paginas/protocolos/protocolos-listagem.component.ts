import { Component, OnInit, OnDestroy, inject, Signal, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProtocolosService, Protocolo } from '../../core/services/protocolos.service';
import { TemplatesService, Template } from '../../core/services/templates.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ZmPaginationComponent, ZmEmptyStateComponent } from '../../shared/components/ui';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { ZardSheetService } from '@/shared/components/sheet/sheet.service';
import type { ZardSheetRef } from '@/shared/components/sheet/sheet-ref';
import { FlatpickrDirective } from 'angularx-flatpickr';
import { ZardComboboxComponent, type ZardComboboxOption } from '@/shared/components/combobox';
import { ZardTableImports } from '@/shared/components/table';
import { ZARD_FORM_CONTROL_IMPORTS } from '@/shared/components/input';
@Component({
  selector: 'app-protocolos-listagem',
  standalone: true,
  imports: [
    ...ZARD_FORM_CONTROL_IMPORTS,
    ...ZardTableImports,
    FlatpickrDirective,
    FormsModule,
    RouterLink,
    ZmSkeletonListComponent,
    ZmPaginationComponent,
    ZmEmptyStateComponent,
    ZardCardComponent,
    ZardButtonComponent,
    ZardBadgeComponent,
    ZardComboboxComponent,
  ],
  templateUrl: './protocolos-listagem.component.html',
})
export class ProtocolosListagemComponent implements OnInit, OnDestroy {
  protocolos: Protocolo[] = [];
  templates: Template[] = [];
  meta: { current_page: number; last_page: number; per_page: number; total: number } = {
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  };
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';
  exportando = false;

  busca = '';
  template_id: number | '' = '';
  status: string = '';
  data_inicio = '';
  data_fim = '';
  filterDrawerOpen = false;
  /** Calendário no body para não ser cortado pelo overflow do sheet. */
  flatpickrAppendTo!: HTMLElement;

  @ViewChild('protocolosFiltrosTpl') protocolosFiltrosTpl?: TemplateRef<void>;

  private filtrosSheetRef?: ZardSheetRef<void>;

  private protocolosService = inject(ProtocolosService);
  private templatesService = inject(TemplatesService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private readonly vcr = inject(ViewContainerRef);
  private readonly zardSheet = inject(ZardSheetService);

  readonly opcoesStatusFiltro: ZardComboboxOption[] = [
    { value: '', label: 'Todas' },
    { value: 'pending', label: 'Pendente' },
    { value: 'approved', label: 'Aprovado' },
    { value: 'rejected', label: 'Reprovado' },
    { value: 'revoked', label: 'Revogado' },
  ];

  get opcoesTemplateFiltro(): ZardComboboxOption[] {
    return [
      { value: '', label: 'Todos' },
      ...this.templates.map((t) => ({ value: String(t.id), label: t.name })),
    ];
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
    this.flatpickrAppendTo = document.body;
    const statusFromQuery = this.route.snapshot.queryParamMap.get('status');
    if (statusFromQuery) {
      this.status = statusFromQuery;
    }
    this.templatesService.list().subscribe({ next: (t) => (this.templates = t) });
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
        this.listaPronta = true;
        this.protocolos = res.data;
        this.meta = res.meta;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Não foi possível carregar os protocolos.';
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
    this.filterDrawerOpen = true;
    this.filtrosSheetRef = this.zardSheet.create<void, void>({
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
        this.filterDrawerOpen = false;
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
    this.exportando = true;
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
        this.exportando = false;
      },
      error: () => (this.exportando = false),
    });
  }

  exportarPdf(): void {
    this.exportando = true;
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
        this.exportando = false;
      },
      error: () => (this.exportando = false),
    });
  }

  contagemTexto(): string {
    const n = this.meta.total;
    return n === 1 ? '1 registro' : `${n} registros`;
  }
}
