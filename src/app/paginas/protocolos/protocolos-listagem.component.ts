import { Component, OnInit, inject, Signal, signal } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProtocolosService, Protocolo } from '../../core/services/protocolos.service';
import { TemplatesService, Template } from '../../core/services/templates.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ZmPaginationComponent } from '../../shared/components/ui';
import {
  SearchBoxComponent,
  DataTableComponent,
  BadgeComponent,
  UpEmptyStateComponent,
  ListFiltersPanelComponent,
} from '../../shared/components/up';
import { OpenPickerOnInteractDirective } from '@/shared/directives/open-picker-on-interact.directive';
import { MAT_FORM_IMPORTS } from '@/shared/material';
import { formatDateToYmd } from '@/shared/utils/date-time.util';

@Component({
  selector: 'app-protocolos-listagem',
  standalone: true,
  imports: [
    ...MAT_FORM_IMPORTS,
    OpenPickerOnInteractDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    ZmSkeletonListComponent,
    ZmPaginationComponent,
    SearchBoxComponent,
    DataTableComponent,
    BadgeComponent,
    UpEmptyStateComponent,
    ListFiltersPanelComponent,
  ],
  templateUrl: './protocolos-listagem.component.html',
})
export class ProtocolosListagemComponent implements OnInit {
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

  readonly buscaControl = new FormControl('', { nonNullable: true });
  template_id: number | '' = '';
  status: string = '';
  data_inicio: Date | null = null;
  data_fim: Date | null = null;
  readonly filtersOpen = signal(false);

  private protocolosService = inject(ProtocolosService);
  private templatesService = inject(TemplatesService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly opcoesStatusFiltro = [
    { value: '', label: 'Todas' },
    { value: 'pending', label: 'Pendente' },
    { value: 'approved', label: 'Aprovado' },
    { value: 'rejected', label: 'Reprovado' },
    { value: 'revoked', label: 'Revogado' },
  ];

  get opcoesTemplateFiltro(): { value: string; label: string }[] {
    return [
      { value: '', label: 'Todos' },
      ...this.templates.map((t) => ({ value: String(t.id), label: t.name })),
    ];
  }

  templateFiltroValue(value: string): number | '' {
    return value === '' ? '' : Number(value);
  }

  ngOnInit(): void {
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
      this.data_inicio !== null ||
      this.data_fim !== null
    );
  }

  toggleFilters(): void {
    this.filtersOpen.update((open) => !open);
  }

  closeFilters(): void {
    this.filtersOpen.set(false);
  }

  carregar(page = 1): void {
    const params: Parameters<ProtocolosService['list']>[0] = { per_page: 20, page };
    if (this.buscaControl.value?.trim()) params.busca = this.buscaControl.value.trim();
    if (this.template_id !== '') params.template_id = Number(this.template_id);
    if (this.status) params.status = this.status;
    const dataInicio = formatDateToYmd(this.data_inicio);
    const dataFim = formatDateToYmd(this.data_fim);
    if (dataInicio) params.data_inicio = dataInicio;
    if (dataFim) params.data_fim = dataFim;

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
    this.closeFilters();
  }

  limparFiltros(): void {
    this.template_id = '';
    this.status = '';
    this.data_inicio = null;
    this.data_fim = null;
    this.carregar(1);
    this.closeFilters();
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
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  exportarCsv(): void {
    this.exportando = true;
    const params: { template_id?: number; status?: string; data_inicio?: string; data_fim?: string } = {};
    if (this.template_id !== '') params.template_id = Number(this.template_id);
    if (this.status) params.status = this.status;
    const dataInicio = formatDateToYmd(this.data_inicio);
    const dataFim = formatDateToYmd(this.data_fim);
    if (dataInicio) params.data_inicio = dataInicio;
    if (dataFim) params.data_fim = dataFim;

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
    const params: { template_id?: number; status?: string; data_inicio?: string; data_fim?: string; limit?: number } = {
      limit: 50,
    };
    if (this.template_id !== '') params.template_id = Number(this.template_id);
    if (this.status) params.status = this.status;
    const dataInicio = formatDateToYmd(this.data_inicio);
    const dataFim = formatDateToYmd(this.data_fim);
    if (dataInicio) params.data_inicio = dataInicio;
    if (dataFim) params.data_fim = dataFim;

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
}
