import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  Signal,
  inject,
  signal,
} from '@angular/core';
import {
  PlataformaService,
  PlatformJourneyRow,
  PlatformJourneyStep,
} from '../../../core/services/plataforma.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';
import { ToastService } from '../../../core/services/toast.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';
import { ZmPageBackLinkComponent } from '../../../shared/components/ui';

interface StepDraft {
  key: string;
  delay_days: number;
  title: string;
  description: string;
  priority: string;
  condition_field: string;
  condition_op: string;
  condition_value: string;
}

@Component({
  selector: 'app-plataforma-relacionamento-jornadas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ListSkeletonComponent, ZmPageBackLinkComponent],
  templateUrl: './plataforma-relacionamento-jornadas.component.html',
  styleUrl: './plataforma-relacionamento-jornadas.component.css',
})
export class PlataformaRelacionamentoJornadasComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly error = signal('');
  readonly acting = signal(false);
  readonly items = signal<PlatformJourneyRow[]>([]);
  readonly enrollmentsActive = signal(0);
  readonly editing = signal(false);
  readonly editId = signal<number | null>(null);

  readonly name = signal('');
  readonly description = signal('');
  readonly entryEvent = signal('trial.started');
  readonly status = signal('draft');
  readonly exitSubscription = signal(true);
  readonly exitTrialExpired = signal(true);
  readonly steps = signal<StepDraft[]>([this.emptyStep('day0_task')]);

  readonly entryOptions = [
    { id: 'lead.created', label: 'Lead criado' },
    { id: 'trial.started', label: 'Trial iniciado' },
    { id: 'document.signed', label: 'Documento assinado' },
    { id: 'protocol.review_pending', label: 'Protocolo em revisão' },
    { id: 'support.ticket.created', label: 'Chamado aberto' },
  ];

  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
      this.plataformaService.getRelationshipJourneys(),
    );
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.error.set('');
        this.items.set(res.data?.items ?? []);
        this.enrollmentsActive.set(res.data?.enrollments_active ?? 0);
      },
      error: () => {
        this.listaPronta.set(true);
        this.error.set('Não foi possível carregar as jornadas.');
      },
    });
  }

  novo(): void {
    this.editing.set(true);
    this.editId.set(null);
    this.name.set('');
    this.description.set('');
    this.entryEvent.set('trial.started');
    this.status.set('draft');
    this.exitSubscription.set(true);
    this.exitTrialExpired.set(true);
    this.steps.set([this.emptyStep('day0_task')]);
  }

  editar(item: PlatformJourneyRow): void {
    this.acting.set(true);
    this.plataformaService.getRelationshipJourney(item.id).subscribe({
      next: (res) => {
        this.acting.set(false);
        const data = res.data;
        this.editing.set(true);
        this.editId.set(data.id);
        this.name.set(data.name);
        this.description.set(data.description || '');
        this.entryEvent.set(data.entry_event);
        this.status.set(data.status || 'draft');
        const exit = data.config?.exit_when ?? [];
        this.exitSubscription.set(exit.includes('subscription_active'));
        this.exitTrialExpired.set(exit.includes('trial_expired'));
        const mapped = (data.config?.steps ?? []).map((step) => this.fromApiStep(step));
        this.steps.set(mapped.length ? mapped : [this.emptyStep('day0_task')]);
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível abrir a jornada.');
      },
    });
  }

  cancelar(): void {
    this.editing.set(false);
  }

  adicionarPasso(): void {
    const idx = this.steps().length;
    this.steps.set([...this.steps(), this.emptyStep(`day${idx}_task`)]);
  }

  removerPasso(index: number): void {
    const list = [...this.steps()];
    if (list.length <= 1) return;
    list.splice(index, 1);
    this.steps.set(list);
  }

  salvar(): void {
    const name = this.name().trim();
    if (!name) {
      this.toast.error('Campos', 'Informe o nome.');
      return;
    }
    const steps = this.steps();
    for (const step of steps) {
      if (!step.key.trim() || !step.title.trim()) {
        this.toast.error('Passos', 'Cada passo precisa de key e título da tarefa.');
        return;
      }
    }
    const exit_when: string[] = [];
    if (this.exitSubscription()) exit_when.push('subscription_active');
    if (this.exitTrialExpired()) exit_when.push('trial_expired');
    const payload = {
      name,
      description: this.description().trim() || undefined,
      entry_event: this.entryEvent(),
      status: this.status(),
      config: {
        exit_when,
        steps: steps.map((step) => this.toApiStep(step)),
      },
    };
    this.acting.set(true);
    const id = this.editId();
    const req = id
      ? this.plataformaService.updateRelationshipJourney(id, payload)
      : this.plataformaService.createRelationshipJourney(payload);
    req.subscribe({
      next: () => {
        this.acting.set(false);
        this.editing.set(false);
        this.toast.success('Salvo', 'Jornada atualizada.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível salvar a jornada.');
      },
    });
  }

  async pausar(item: PlatformJourneyRow): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Pausar jornada',
      message: `Pausar "${item.name}"? Novas matrículas não serão criadas; passos já agendados param na próxima execução.`,
      confirmLabel: 'Pausar',
    });
    if (!ok) return;
    this.acting.set(true);
    this.plataformaService.pauseRelationshipJourney(item.id).subscribe({
      next: () => {
        this.acting.set(false);
        this.toast.success('Pausada', 'Jornada pausada.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível pausar.');
      },
    });
  }

  async ativar(item: PlatformJourneyRow): Promise<void> {
    this.acting.set(true);
    this.plataformaService.activateRelationshipJourney(item.id).subscribe({
      next: () => {
        this.acting.set(false);
        this.toast.success('Ativada', 'Jornada ativa.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível ativar.');
      },
    });
  }

  statusLabel(status: string): string {
    switch (status) {
      case 'active':
        return 'Ativa';
      case 'paused':
        return 'Pausada';
      case 'draft':
        return 'Rascunho';
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

  onName(e: Event): void {
    this.name.set((e.target as HTMLInputElement).value);
  }
  onDescription(e: Event): void {
    this.description.set((e.target as HTMLTextAreaElement).value);
  }
  onEntry(e: Event): void {
    this.entryEvent.set((e.target as HTMLSelectElement).value);
  }
  onStatus(e: Event): void {
    this.status.set((e.target as HTMLSelectElement).value);
  }
  onExitSubscription(e: Event): void {
    this.exitSubscription.set((e.target as HTMLInputElement).checked);
  }
  onExitTrial(e: Event): void {
    this.exitTrialExpired.set((e.target as HTMLInputElement).checked);
  }

  updateStep(index: number, field: keyof StepDraft, event: Event): void {
    const el = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const value = field === 'delay_days' ? Number(el.value) || 0 : el.value;
    const list = this.steps().map((step, i) =>
      i === index ? { ...step, [field]: value } : step,
    );
    this.steps.set(list);
  }

  private emptyStep(key: string): StepDraft {
    return {
      key,
      delay_days: 0,
      title: '',
      description: '',
      priority: 'normal',
      condition_field: '',
      condition_op: 'eq',
      condition_value: '',
    };
  }

  private fromApiStep(step: PlatformJourneyStep): StepDraft {
    const action = (step.actions?.[0] ?? {}) as Record<string, unknown>;
    const cond = step.conditions?.[0];
    return {
      key: step.key || 'step',
      delay_days: Number(step.delay_days ?? 0),
      title: String(action['title'] ?? ''),
      description: String(action['description'] ?? ''),
      priority: String(action['priority'] ?? 'normal'),
      condition_field: String(cond?.field ?? ''),
      condition_op: String(cond?.op ?? 'eq'),
      condition_value: cond?.value != null ? String(cond.value) : '',
    };
  }

  private toApiStep(step: StepDraft): PlatformJourneyStep {
    const actions = [
      {
        type: 'create_task',
        title: step.title.trim(),
        description: step.description.trim() || undefined,
        priority: step.priority,
        related_type: this.entryEvent() === 'lead.created' ? 'demonstration_request' : 'organization',
        related_id: this.entryEvent() === 'lead.created' ? '{{lead_id}}' : '{{org_id}}',
      },
    ];
    const out: PlatformJourneyStep = {
      key: step.key.trim(),
      delay_days: Number(step.delay_days) || 0,
      actions,
    };
    if (step.condition_field.trim()) {
      out.conditions = [
        {
          field: step.condition_field.trim(),
          op: step.condition_op || 'eq',
          value: step.condition_value,
        },
      ];
    }
    return out;
  }
}
