import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
  Signal,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PlataformaService,
  PlatformFailedJobRow,
  PlatformJobRow,
  PlatformJobsOverview,
} from '../../../core/services/plataforma.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';
import { ToastService } from '../../../core/services/toast.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';
import { ZmPageBackLinkComponent } from '../../../shared/components/ui';
import { GestgoSheetService } from '../../../shared/components/sheet/sheet.service';
import type { GestgoSheetRef } from '../../../shared/components/sheet/sheet-ref';

type FiltroFila = 'pendentes' | 'falhos';
const FILTRO_PADRAO_FILA: FiltroFila = 'pendentes';

@Component({
  selector: 'app-plataforma-filas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ListSkeletonComponent, ZmPageBackLinkComponent],
  templateUrl: './plataforma-filas.component.html',
  styleUrl: './plataforma-filas.component.css',
})
export class PlataformaFilasComponent implements OnInit, OnDestroy {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly error = signal('');
  readonly acting = signal(false);
  readonly overview = signal<PlatformJobsOverview | null>(null);
  readonly filtro = signal<FiltroFila>(FILTRO_PADRAO_FILA);
  readonly filterDrawerOpen = signal(false);
  filtroRascunho: FiltroFila = FILTRO_PADRAO_FILA;
  @ViewChild('filtrosTpl') filtrosTpl?: TemplateRef<void>;
  private readonly purgeFragment = 'Pronto para publicar';

  readonly filtros: { id: FiltroFila; label: string }[] = [
    { id: 'pendentes', label: 'Pendentes' },
    { id: 'falhos', label: 'Falhos' },
  ];

  readonly pendentes = computed(() => this.overview()?.pending_jobs ?? []);
  readonly falhos = computed(() => this.overview()?.failed_jobs ?? []);
  readonly listaAtual = computed(() =>
    this.filtro() === 'falhos' ? this.falhos() : this.pendentes(),
  );

  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private readonly vcr = inject(ViewContainerRef);
  private readonly gestgoSheet = inject(GestgoSheetService);
  private filtrosSheetRef?: GestgoSheetRef<void>;

  ngOnInit(): void {
    const filtroParam = this.route.snapshot.queryParamMap.get('filtro');
    if (filtroParam === 'falhos' || filtroParam === 'pendentes') {
      this.filtro.set(filtroParam);
    }
    this.carregar();
  }

  ngOnDestroy(): void {
    this.filtrosSheetRef?.close();
  }

  get temFiltrosAtivos(): boolean {
    return this.filtro() !== FILTRO_PADRAO_FILA;
  }

  get quantidadeFiltrosAtivos(): number {
    return this.temFiltrosAtivos ? 1 : 0;
  }

  openFilterDrawer(): void {
    if (this.filtrosSheetRef) {
      this.filtrosSheetRef.close();
      return;
    }
    if (!this.filtrosTpl) return;
    this.filtroRascunho = this.filtro();
    this.filterDrawerOpen.set(true);
    this.filtrosSheetRef = this.gestgoSheet.create<void, void>({
      zContent: this.filtrosTpl,
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
    this.selecionarFiltro(this.filtroRascunho);
    this.filtrosSheetRef?.close();
  }

  limparFiltrosDrawer(): void {
    this.filtroRascunho = FILTRO_PADRAO_FILA;
    this.aplicarFiltrosDrawer();
  }

  quantidadeFiltro(id: FiltroFila): number {
    const o = this.overview();
    if (!o) return 0;
    return id === 'falhos' ? o.failed : o.pending + o.reserved;
  }

  selecionarFiltro(id: FiltroFila): void {
    this.filtro.set(id);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { filtro: id },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  carregar(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
      this.plataformaService.getJobsOverview(),
    );
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.error.set('');
        this.overview.set(res.data ?? null);
      },
      error: () => {
        this.listaPronta.set(true);
        this.error.set('Não foi possível carregar as filas de jobs.');
      },
    });
  }

  async retryFailed(job: PlatformFailedJobRow): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Reprocessar job',
      message: `Reenviar "${this.jobTypeLabel(job.job_type)}" para a fila?`,
      confirmLabel: 'Reprocessar',
    });
    if (!ok) return;
    this.acting.set(true);
    this.plataformaService.retryFailedJob(job.id).subscribe({
      next: () => {
        this.acting.set(false);
        this.toast.success('Reenfileirado', 'O job voltou para a fila com no máximo 2 tentativas.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível reprocessar o job.');
      },
    });
  }

  async retryAllFailed(): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Reprocessar falhos',
      message: 'Reenfileirar todos os jobs falhos listados?',
      confirmLabel: 'Reprocessar todos',
      variant: 'danger',
    });
    if (!ok) return;
    this.acting.set(true);
    this.plataformaService.retryAllFailedJobs(null).subscribe({
      next: (res) => {
        this.acting.set(false);
        this.toast.success('Reenfileirados', `${res.data?.retried ?? 0} job(s) voltaram para a fila.`);
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível reprocessar os jobs.');
      },
    });
  }

  async discardFailed(job: PlatformFailedJobRow): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Descartar job falho',
      message: 'Remover este registro de falha sem reenviar?',
      confirmLabel: 'Descartar',
      variant: 'danger',
    });
    if (!ok) return;
    this.acting.set(true);
    this.plataformaService.discardFailedJob(job.id).subscribe({
      next: () => {
        this.acting.set(false);
        this.toast.success('Descartado', 'Job falho removido.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível descartar.');
      },
    });
  }

  async discardPending(job: PlatformJobRow): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Remover da fila',
      message: 'Descartar este job pendente sem executar?',
      confirmLabel: 'Remover',
      variant: 'danger',
    });
    if (!ok) return;
    this.acting.set(true);
    this.plataformaService.discardPendingJob(job.id).subscribe({
      next: () => {
        this.acting.set(false);
        this.toast.success('Removido', 'Job pendente descartado.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível remover o job.');
      },
    });
  }

  async purgeEmails(): Promise<void> {
    const fragment = this.purgeFragment;
    const ok = await this.confirm.request({
      title: 'Limpar e-mails da fila',
      message: `Remover da fila os e-mails cujo assunto contenha "${fragment}"?`,
      confirmLabel: 'Limpar fila',
      variant: 'danger',
    });
    if (!ok) return;
    this.acting.set(true);
    this.plataformaService.purgeEmailJobs(fragment).subscribe({
      next: (res) => {
        this.acting.set(false);
        this.toast.success('Fila limpa', `${res.data?.removed ?? 0} job(s) de e-mail removido(s).`);
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível limpar a fila de e-mails.');
      },
    });
  }

  formatarData(iso?: string | null): string {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  }

  jobTypeLabel(type: string): string {
    const map: Record<string, string> = {
      SendTransactionalEmailJob: 'E-mail transacional',
      GenerateSubmissionPdfJob: 'Gerar PDF',
    };
    return map[type] ?? type;
  }
}
