import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  ChangeDetectionStrategy,
  signal,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, switchMap, tap, catchError, finalize, of } from 'rxjs';
import { ProtocolosService, Protocolo } from '../../core/services/protocolos.service';
import { TemplatesService, Template } from '../../core/services/templates.service';
import { ListSkeletonComponent } from '../../shared/components/list-skeleton/list-skeleton.component';
import { ZmEmptyStateComponent, ZmPaginationComponent } from '../../shared/components/ui';
import { GestgoSheetService } from '@/shared/components/sheet/sheet.service';
import type { GestgoSheetRef } from '@/shared/components/sheet/sheet-ref';
import { GestgoComboboxComponent, type GestgoComboboxOption } from '@/shared/components/combobox';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
import { formatarDataHoraBr } from '@/shared/utils/date';

const LATE_AFTER_H = 24;

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-protocolos-listagem',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  imports: [
    ...NORD_FORM_IMPORTS,
    FormsModule,
    ListSkeletonComponent,
    ZmEmptyStateComponent,
    ZmPaginationComponent,
    GestgoComboboxComponent,
  ],
  templateUrl: './protocolos-listagem.component.html',
  styleUrls: ['./protocolos-listagem.component.css'],
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
  readonly showSkeleton = signal(false);
  readonly listaPronta = signal(false);
  readonly erro = signal('');
  readonly exportando = signal(false);

  busca = '';
  template_id: number | '' = '';
  status = '';
  data_inicio = '';
  data_fim = '';
  readonly filterDrawerOpen = signal(false);

  @ViewChild('protocolosFiltrosTpl') protocolosFiltrosTpl?: TemplateRef<void>;

  private filtrosSheetRef?: GestgoSheetRef<void>;

  private protocolosService = inject(ProtocolosService);
  private templatesService = inject(TemplatesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private readonly vcr = inject(ViewContainerRef);
  private readonly gestgoSheet = inject(GestgoSheetService);
  private readonly destroyRef = inject(DestroyRef);
  /** Uma fila com switchMap: nova página cancela a request anterior. */
  private readonly carregar$ = new Subject<number>();

  readonly opcoesStatusFiltro: GestgoComboboxOption[] = [
    { value: '', label: 'Todas' },
    { value: 'pending', label: 'Pendente' },
    { value: 'approved', label: 'Aprovado' },
    { value: 'rejected', label: 'Reprovado' },
    { value: 'revoked', label: 'Revogado' },
  ];

  get opcoesTemplateFiltro(): GestgoComboboxOption[] {
    return [
      { value: '', label: 'Todos' },
      ...this.templates().map((t) => ({ value: String(t.id), label: t.name })),
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
    const statusFromQuery = this.route.snapshot.queryParamMap.get('status');
    if (statusFromQuery) {
      this.status = statusFromQuery;
    }
    this.templatesService.list().subscribe({ next: (t) => this.templates.set(t) });

    this.carregar$
      .pipe(
        switchMap((page) => {
          const params: Parameters<ProtocolosService['list']>[0] = { per_page: 20, page };
          if (this.busca?.trim()) params.busca = this.busca.trim();
          if (this.template_id !== '') params.template_id = Number(this.template_id);
          if (this.status) params.status = this.status;
          if (this.data_inicio) params.data_inicio = this.data_inicio;
          if (this.data_fim) params.data_fim = this.data_fim;

          this.erro.set('');
          this.showSkeleton.set(false);
          const skeletonTimer = setTimeout(() => this.showSkeleton.set(true), 300);

          return this.protocolosService.list(params).pipe(
            tap((res) => {
              this.listaPronta.set(true);
              this.protocolos.set(res.data);
              this.meta.set(res.meta);
            }),
            catchError(() => {
              this.listaPronta.set(true);
              this.erro.set('Não foi possível carregar os protocolos.');
              return of(null);
            }),
            finalize(() => {
              clearTimeout(skeletonTimer);
              this.showSkeleton.set(false);
            }),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

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
    this.carregar$.next(page);
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

  limparTudo(): void {
    this.busca = '';
    this.limparFiltros();
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

  irParaDetalhe(p: Protocolo, event: Event): void {
    if ((event.target as HTMLElement).closest('a, button, nord-button')) return;
    this.router.navigate(['/protocolos', p.id]);
  }

  pessoaNome(p: Protocolo): string {
    return p.person?.name?.trim() || p.submitter_name?.trim() || '—';
  }

  isPendente(p: Protocolo): boolean {
    return (p.status || '').toLowerCase() === 'pending';
  }

  isAtrasado(p: Protocolo): boolean {
    if (!this.isPendente(p)) return false;
    const d = this.parseDate(p.submitted_at || p.created_at);
    if (!d) return false;
    return (Date.now() - d.getTime()) / 36e5 > LATE_AFTER_H;
  }

  statusLabelFor(p: Protocolo): string {
    if (p.consent_expired && (p.status || '').toLowerCase() === 'approved') return 'Vencido';
    return this.statusLabel(p.status);
  }

  badgeVariant(p: Protocolo): 'warning' | 'success' | 'danger' {
    const s = (p.status || '').toLowerCase();
    if (p.consent_expired && s === 'approved') return 'warning';
    if (s === 'pending') return 'warning';
    if (s === 'approved') return 'success';
    return 'danger';
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
    return formatarDataHoraBr(val) || '—';
  }

  relativo(val: string | undefined): string {
    const d = this.parseDate(val);
    if (!d) return '';
    const h = Math.floor((Date.now() - d.getTime()) / 36e5);
    if (h < 1) return 'há minutos';
    if (h < 24) return `há ${h} h`;
    const days = Math.floor(h / 24);
    return `há ${days} ${days === 1 ? 'dia' : 'dias'}`;
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
    const shown = this.protocolos().length;
    const total = this.meta().total;
    if (shown === total) return total === 1 ? '1 protocolo' : `${total} protocolos`;
    return `${shown} de ${total} protocolos`;
  }

  private parseDate(val: string | undefined): Date | null {
    if (!val) return null;
    const d = new Date(val);
    return Number.isNaN(d.getTime()) ? null : d;
  }
}
