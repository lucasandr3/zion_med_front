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
  AutomationsService,
  OrgOperationalTaskRow,
} from '../../../core/services/automations.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';
import { ToastService } from '../../../core/services/toast.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';
import { ZmPageBackLinkComponent } from '../../../shared/components/ui';
import { GestgoSheetService } from '../../../shared/components/sheet/sheet.service';
import type { GestgoSheetRef } from '../../../shared/components/sheet/sheet-ref';

type FiltroTarefa = 'open' | 'done' | 'all';
const FILTRO_PADRAO_TAREFA: FiltroTarefa = 'open';

@Component({
  selector: 'app-automacoes-tarefas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ListSkeletonComponent, ZmPageBackLinkComponent],
  templateUrl: './automacoes-tarefas.component.html',
  styleUrl: './automacoes-tarefas.component.css',
})
export class AutomacoesTarefasComponent implements OnInit, OnDestroy {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly error = signal('');
  readonly acting = signal(false);
  readonly items = signal<OrgOperationalTaskRow[]>([]);
  readonly openCount = signal(0);
  readonly doneCount = signal(0);
  readonly filtro = signal<FiltroTarefa>(FILTRO_PADRAO_TAREFA);
  readonly filterDrawerOpen = signal(false);
  filtroRascunho: FiltroTarefa = FILTRO_PADRAO_TAREFA;
  @ViewChild('filtrosTpl') filtrosTpl?: TemplateRef<void>;
  readonly novaTitulo = signal('');

  readonly filtros: { id: FiltroTarefa; label: string }[] = [
    { id: 'open', label: 'Abertas' },
    { id: 'done', label: 'Concluídas' },
    { id: 'all', label: 'Todas' },
  ];

  readonly listaAtual = computed(() => this.items());

  private automations = inject(AutomationsService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);
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
    return this.filtro() !== FILTRO_PADRAO_TAREFA;
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
    this.filtroRascunho = FILTRO_PADRAO_TAREFA;
    this.aplicarFiltrosDrawer();
  }

  quantidadeFiltro(id: FiltroTarefa): number {
    if (id === 'open') return this.openCount();
    if (id === 'done') return this.doneCount();
    return this.openCount() + this.doneCount();
  }

  selecionarFiltro(id: FiltroTarefa): void {
    this.filtro.set(id);
    this.carregar();
  }

  carregar(): void {
    const status = this.filtro() === 'all' ? undefined : this.filtro();
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
      this.automations.getTasks(status),
    );
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.error.set('');
        this.items.set(res.data?.items ?? []);
        this.openCount.set(res.data?.open ?? 0);
        this.doneCount.set(res.data?.done ?? 0);
      },
      error: () => {
        this.listaPronta.set(true);
        this.error.set('Não foi possível carregar as tarefas.');
      },
    });
  }

  criar(): void {
    const title = this.novaTitulo().trim();
    if (!title) {
      this.toast.error('Título', 'Informe um título para a tarefa.');
      return;
    }
    this.acting.set(true);
    this.automations.createTask({ title, priority: 'normal' }).subscribe({
      next: () => {
        this.acting.set(false);
        this.novaTitulo.set('');
        this.toast.success('Criada', 'Tarefa adicionada.');
        this.filtro.set('open');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível criar a tarefa.');
      },
    });
  }

  onTituloInput(event: Event): void {
    const el = event.target as HTMLInputElement | null;
    this.novaTitulo.set(el?.value ?? '');
  }

  async concluir(item: OrgOperationalTaskRow): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Concluir tarefa',
      message: `Marcar "${item.title}" como concluída?`,
      confirmLabel: 'Concluir',
    });
    if (!ok) return;
    this.acting.set(true);
    this.automations.completeTask(item.id).subscribe({
      next: () => {
        this.acting.set(false);
        this.toast.success('Concluída', 'Tarefa atualizada.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível concluir.');
      },
    });
  }

  async reabrir(item: OrgOperationalTaskRow): Promise<void> {
    this.acting.set(true);
    this.automations.reopenTask(item.id).subscribe({
      next: () => {
        this.acting.set(false);
        this.toast.success('Reaberta', 'Tarefa reaberta.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível reabrir.');
      },
    });
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
