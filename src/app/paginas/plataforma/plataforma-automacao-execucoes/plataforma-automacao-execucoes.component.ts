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
import {
  PlataformaService,
  PlatformAutomationExecutionRow,
} from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';
import { ZmPageBackLinkComponent } from '../../../shared/components/ui';
import { GestgoSheetService } from '../../../shared/components/sheet/sheet.service';
import type { GestgoSheetRef } from '../../../shared/components/sheet/sheet-ref';

type FiltroExecucao = 'todas' | 'falhas' | 'ok';
const FILTRO_PADRAO_EXECUCAO: FiltroExecucao = 'todas';

@Component({
  selector: 'app-plataforma-automacao-execucoes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ListSkeletonComponent, ZmPageBackLinkComponent],
  templateUrl: './plataforma-automacao-execucoes.component.html',
  styleUrl: './plataforma-automacao-execucoes.component.css',
})
export class PlataformaAutomacaoExecucoesComponent implements OnInit, OnDestroy {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly error = signal('');
  readonly items = signal<PlatformAutomationExecutionRow[]>([]);
  readonly filtro = signal<FiltroExecucao>(FILTRO_PADRAO_EXECUCAO);
  readonly filterDrawerOpen = signal(false);
  filtroRascunho: FiltroExecucao = FILTRO_PADRAO_EXECUCAO;
  @ViewChild('filtrosTpl') filtrosTpl?: TemplateRef<void>;

  readonly filtros: { id: FiltroExecucao; label: string }[] = [
    { id: 'todas', label: 'Todas' },
    { id: 'ok', label: 'Concluídas' },
    { id: 'falhas', label: 'Falhas' },
  ];

  readonly listaAtual = computed(() => {
    const list = this.items();
    const f = this.filtro();
    if (f === 'falhas') return list.filter((i) => i.status === 'failed');
    if (f === 'ok') return list.filter((i) => i.status === 'completed');
    return list;
  });

  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);
  private readonly vcr = inject(ViewContainerRef);
  private readonly gestgoSheet = inject(GestgoSheetService);
  private filtrosSheetRef?: GestgoSheetRef<void>;

  ngOnInit(): void {
    this.carregar();
  }

  ngOnDestroy(): void {
    this.filtrosSheetRef?.close();
  }

  get temFiltrosAtivos(): boolean {
    return this.filtro() !== FILTRO_PADRAO_EXECUCAO;
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
    this.filtroRascunho = FILTRO_PADRAO_EXECUCAO;
    this.aplicarFiltrosDrawer();
  }

  quantidadeFiltro(id: FiltroExecucao): number {
    const list = this.items();
    if (id === 'falhas') return list.filter((i) => i.status === 'failed').length;
    if (id === 'ok') return list.filter((i) => i.status === 'completed').length;
    return list.length;
  }

  selecionarFiltro(id: FiltroExecucao): void {
    this.filtro.set(id);
  }

  carregar(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
      this.plataformaService.getPlatformAutomationExecutions(),
    );
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.error.set('');
        this.items.set(res.data ?? []);
      },
      error: () => {
        this.listaPronta.set(true);
        this.error.set('Não foi possível carregar o histórico de execuções.');
      },
    });
  }

  statusLabel(status: string): string {
    switch (status) {
      case 'scheduled':
        return 'Agendada';
      case 'running':
        return 'Em execução';
      case 'completed':
        return 'Concluída';
      case 'ignored':
        return 'Ignorada';
      case 'cancelled':
        return 'Cancelada';
      case 'failed':
        return 'Falha';
      default:
        return status;
    }
  }

  formatarData(value?: string | null): string {
    if (!value) return '—';
    try {
      return new Date(value).toLocaleString('pt-BR');
    } catch {
      return value;
    }
  }
}
