import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  Signal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AutomationsService,
  OrgAutomationExecutionRow,
  OrgAutomationRow,
} from '../../core/services/automations.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { ToastService } from '../../core/services/toast.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../shared/components/list-skeleton/list-skeleton.component';

type Aba = 'regras' | 'historico';

@Component({
  selector: 'app-automacoes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ListSkeletonComponent, RouterLink],
  templateUrl: './automacoes.component.html',
  styleUrl: './automacoes.component.css',
})
export class AutomacoesComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly error = signal('');
  readonly acting = signal(false);
  readonly aba = signal<Aba>('regras');
  readonly items = signal<OrgAutomationRow[]>([]);
  readonly executions = signal<OrgAutomationExecutionRow[]>([]);
  readonly activeCount = signal(0);
  readonly tasksOpen = signal(0);

  readonly listaAtual = computed(() =>
    this.aba() === 'regras' ? this.items() : this.executions(),
  );

  private automations = inject(AutomationsService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);

  ngOnInit(): void {
    this.carregar();
    this.carregarOverview();
  }

  private carregarOverview(): void {
    this.automations.overview().subscribe({
      next: (res) => this.tasksOpen.set(res.data?.tasks_open ?? 0),
      error: () => this.tasksOpen.set(0),
    });
  }

  selecionarAba(aba: Aba): void {
    this.aba.set(aba);
    this.carregar();
  }

  carregar(): void {
    this.carregarOverview();
    if (this.aba() === 'historico') {
      const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.automations.executions());
      this.showSkeleton = showSkeleton;
      data$.subscribe({
        next: (res) => {
          this.listaPronta.set(true);
          this.error.set('');
          this.executions.set(res.data ?? []);
        },
        error: () => {
          this.listaPronta.set(true);
          this.error.set('Não foi possível carregar o histórico.');
        },
      });
      return;
    }

    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.automations.list());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.error.set('');
        this.items.set(res.data?.items ?? []);
        this.activeCount.set(res.data?.active ?? 0);
      },
      error: () => {
        this.listaPronta.set(true);
        this.error.set('Não foi possível carregar as automações.');
      },
    });
  }

  async pausar(item: OrgAutomationRow): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Pausar automação',
      message: `Pausar "${item.name}"?`,
      confirmLabel: 'Pausar',
    });
    if (!ok) return;
    this.acting.set(true);
    this.automations.pause(item.id).subscribe({
      next: () => {
        this.acting.set(false);
        this.toast.success('Pausada', 'Automação pausada.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível pausar.');
      },
    });
  }

  async ativar(item: OrgAutomationRow): Promise<void> {
    this.acting.set(true);
    this.automations.activate(item.id).subscribe({
      next: () => {
        this.acting.set(false);
        this.toast.success('Ativada', 'Automação ativa.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível ativar.');
      },
    });
  }

  eventoLabel(event: string): string {
    switch (event) {
      case 'document.signed':
        return 'Quando um documento é assinado';
      case 'protocol.review_pending':
        return 'Quando um protocolo aguarda revisão';
      case 'appointment.created':
        return 'Quando um agendamento é criado';
      case 'appointment.cancelled':
        return 'Quando um agendamento é cancelado';
      default:
        return event;
    }
  }

  statusLabel(status: string): string {
    switch (status) {
      case 'active':
        return 'Ativa';
      case 'paused':
        return 'Pausada';
      case 'completed':
        return 'Concluída';
      case 'failed':
        return 'Falha';
      case 'ignored':
        return 'Ignorada';
      case 'cancelled':
        return 'Cancelada';
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
