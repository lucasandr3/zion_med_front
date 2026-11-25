import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutomationsService } from '../../core/services/automations.service';
import { ToastService } from '../../core/services/toast.service';
import {
  GestgoComboboxComponent,
  type GestgoComboboxOption,
} from '@/shared/components/combobox';
import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';

type ActionType = 'create_task' | 'create_notification' | 'send_email';
type ConditionOp = 'eq' | 'neq' | 'exists' | 'not_exists';

interface ActionDraft {
  type: ActionType;
  to: string;
  subject: string;
  body: string;
  title: string;
  priority: string;
  relatedType: string;
  relatedId: string;
}

interface ConditionDraft {
  field: string;
  op: ConditionOp;
  value: string;
}

const MAX_ACTIONS = 5;
const MAX_CONDITIONS = 10;

const TRIGGER_FIELD_HINTS: Record<string, string> = {
  'document.signed': 'submission_id, protocol_number, org_id, status',
  'protocol.review_pending': 'submission_id, protocol_number, org_id, status',
  'protocol.completed': 'submission_id, protocol_number, org_id, status',
  'appointment.created': 'appointment_id, org_id, status, starts_at',
  'appointment.cancelled': 'appointment_id, org_id, status, starts_at',
};

@Component({
  selector: 'app-automacoes-formulario',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ZmPageBackLinkComponent, GestgoComboboxComponent, GestgoCardComponent],
  templateUrl: './automacoes-formulario.component.html',
  styleUrl: './automacoes-formulario.component.css',
})
export class AutomacoesFormularioComponent implements OnInit {
  readonly loading = signal(false);
  readonly acting = signal(false);
  readonly editId = signal<number | null>(null);

  readonly name = signal('');
  readonly description = signal('');
  readonly triggerEvent = signal('document.signed');
  readonly status = signal('draft');
  readonly waitSeconds = signal(0);
  readonly actions = signal<ActionDraft[]>([emptyAction()]);
  readonly conditions = signal<ConditionDraft[]>([]);

  readonly triggerOptions: GestgoComboboxOption[] = [
    { value: 'document.signed', label: 'Documento assinado' },
    { value: 'protocol.review_pending', label: 'Protocolo em revisão' },
    { value: 'protocol.completed', label: 'Protocolo concluído' },
    { value: 'appointment.created', label: 'Agendamento criado' },
    { value: 'appointment.cancelled', label: 'Agendamento cancelado' },
  ];

  readonly statusOptions: GestgoComboboxOption[] = [
    { value: 'draft', label: 'Rascunho' },
    { value: 'active', label: 'Ativa' },
    { value: 'paused', label: 'Pausada' },
  ];

  readonly conditionOpOptions: GestgoComboboxOption[] = [
    { value: 'eq', label: 'igual a' },
    { value: 'neq', label: 'diferente de' },
    { value: 'exists', label: 'existe' },
    { value: 'not_exists', label: 'não existe' },
  ];

  readonly actionTypeOptions: GestgoComboboxOption[] = [
    { value: 'create_task', label: 'Criar tarefa' },
    { value: 'create_notification', label: 'Criar notificação' },
    { value: 'send_email', label: 'Enviar e-mail' },
  ];

  readonly priorityOptions: GestgoComboboxOption[] = [
    { value: 'low', label: 'Baixa' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'Alta' },
  ];

  readonly maxActions = MAX_ACTIONS;
  readonly maxConditions = MAX_CONDITIONS;
  readonly placeholderHint = 'Use placeholders como {{protocol_number}} nos textos.';
  readonly relatedIdHint = 'ex.: {{submission_id}}';
  readonly isEdit = computed(() => this.editId() != null);

  readonly fieldHint = computed(
    () => TRIGGER_FIELD_HINTS[this.triggerEvent()] ?? 'Campos do evento',
  );

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly automations = inject(AutomationsService);
  private readonly toast = inject(ToastService);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;
    const id = Number(idParam);
    if (!id) {
      void this.router.navigateByUrl('/automacoes');
      return;
    }
    this.editId.set(id);
    this.carregar(id);
  }

  private carregar(id: number): void {
    this.loading.set(true);
    this.automations.get(id).subscribe({
      next: (res) => {
        this.loading.set(false);
        const data = res.data;
        this.name.set(data.name);
        this.description.set(data.description || '');
        this.triggerEvent.set(data.trigger_event);
        this.status.set(data.status || 'draft');
        const config = data.config ?? {};
        this.waitSeconds.set(Number(config.wait_seconds ?? 0));

        const rawActions = Array.isArray(config.actions) ? config.actions : [];
        const mappedActions = (rawActions.length ? rawActions : [{}])
          .slice(0, MAX_ACTIONS)
          .map((action) => mapAction(action as Record<string, unknown>));
        this.actions.set(mappedActions);

        const rawConditions = Array.isArray(config.conditions) ? config.conditions : [];
        this.conditions.set(
          rawConditions.slice(0, MAX_CONDITIONS).map((c) => mapCondition(c as Record<string, unknown>)),
        );
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Erro', 'Não foi possível abrir a automação.');
        void this.router.navigateByUrl('/automacoes');
      },
    });
  }

  salvar(): void {
    const name = this.name().trim();
    if (!name) {
      this.toast.error('Campos', 'Informe o nome.');
      return;
    }
    let builtActions: Array<Record<string, unknown>>;
    try {
      builtActions = this.actions().map((draft, index) => this.buildAction(draft, index + 1));
    } catch (err) {
      this.toast.error('Ação', err instanceof Error ? err.message : 'Ação inválida.');
      return;
    }
    const payload = {
      name,
      description: this.description().trim() || undefined,
      trigger_event: this.triggerEvent(),
      status: this.status(),
      config: {
        wait_seconds: Number(this.waitSeconds()) || 0,
        conditions: this.buildConditions(),
        actions: builtActions,
      },
    };
    this.acting.set(true);
    const id = this.editId();
    const req = id ? this.automations.update(id, payload) : this.automations.create(payload);
    req.subscribe({
      next: () => {
        this.acting.set(false);
        this.toast.success('Salvo', id ? 'Automação atualizada.' : 'Automação criada.');
        void this.router.navigateByUrl('/automacoes');
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível salvar a automação.');
      },
    });
  }

  cancelar(): void {
    void this.router.navigateByUrl('/automacoes');
  }

  adicionarAcao(): void {
    if (this.actions().length >= MAX_ACTIONS) return;
    this.actions.update((list) => [...list, emptyAction()]);
  }

  removerAcao(index: number): void {
    if (this.actions().length <= 1) return;
    this.actions.update((list) => list.filter((_, i) => i !== index));
  }

  updateAction(index: number, patch: Partial<ActionDraft>): void {
    this.actions.update((list) =>
      list.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  }

  onActionType(index: number, value: string | null): void {
    if (!value) return;
    this.updateAction(index, { type: value as ActionType });
  }
  onActionTo(index: number, event: Event): void {
    this.updateAction(index, { to: (event.target as HTMLInputElement).value });
  }
  onActionSubject(index: number, event: Event): void {
    this.updateAction(index, { subject: (event.target as HTMLInputElement).value });
  }
  onActionBody(index: number, event: Event): void {
    this.updateAction(index, { body: (event.target as HTMLTextAreaElement).value });
  }
  onActionTitle(index: number, event: Event): void {
    this.updateAction(index, { title: (event.target as HTMLInputElement).value });
  }
  onActionPriority(index: number, value: string | null): void {
    if (!value) return;
    this.updateAction(index, { priority: value });
  }
  onActionRelatedType(index: number, event: Event): void {
    this.updateAction(index, { relatedType: (event.target as HTMLInputElement).value });
  }
  onActionRelatedId(index: number, event: Event): void {
    this.updateAction(index, { relatedId: (event.target as HTMLInputElement).value });
  }

  adicionarCondicao(): void {
    if (this.conditions().length >= MAX_CONDITIONS) return;
    this.conditions.update((list) => [...list, emptyCondition()]);
  }

  removerCondicao(index: number): void {
    this.conditions.update((list) => list.filter((_, i) => i !== index));
  }

  updateCondition(index: number, patch: Partial<ConditionDraft>): void {
    this.conditions.update((list) =>
      list.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  }

  onConditionField(index: number, event: Event): void {
    this.updateCondition(index, { field: (event.target as HTMLInputElement).value });
  }
  onConditionOp(index: number, value: string | null): void {
    if (!value) return;
    this.updateCondition(index, { op: value as ConditionOp });
  }
  onConditionValue(index: number, event: Event): void {
    this.updateCondition(index, { value: (event.target as HTMLInputElement).value });
  }

  needsConditionValue(op: ConditionOp): boolean {
    return op === 'eq' || op === 'neq';
  }

  onName(e: Event): void {
    this.name.set((e.target as HTMLInputElement).value);
  }
  onDescription(e: Event): void {
    this.description.set((e.target as HTMLTextAreaElement).value);
  }
  onTrigger(value: string | null): void {
    if (!value) return;
    this.triggerEvent.set(value);
  }
  onStatus(value: string | null): void {
    if (!value) return;
    this.status.set(value);
  }
  onWait(e: Event): void {
    this.waitSeconds.set(Number((e.target as HTMLInputElement).value) || 0);
  }

  private buildConditions(): Array<{ field: string; op: string; value?: string }> {
    return this.conditions()
      .map((c) => ({
        field: c.field.trim(),
        op: c.op,
        value: c.value.trim(),
      }))
      .filter((c) => c.field && c.op)
      .map((c) =>
        this.needsConditionValue(c.op as ConditionOp)
          ? { field: c.field, op: c.op, value: c.value }
          : { field: c.field, op: c.op },
      );
  }

  private buildAction(draft: ActionDraft, index: number): Record<string, unknown> {
    const type = draft.type;
    if (type === 'send_email') {
      if (!draft.to.trim() || !draft.subject.trim() || !draft.body.trim()) {
        throw new Error(`Ação ${index}: informe destinatário, assunto e corpo.`);
      }
      return {
        type,
        to: draft.to.trim(),
        subject: draft.subject.trim(),
        body: draft.body.trim(),
      };
    }
    if (type === 'create_notification') {
      if (!draft.title.trim() || !draft.body.trim()) {
        throw new Error(`Ação ${index}: informe título e corpo da notificação.`);
      }
      return {
        type,
        title: draft.title.trim(),
        body: draft.body.trim(),
        notification_type: 'organization.automation',
      };
    }
    if (!draft.title.trim()) {
      throw new Error(`Ação ${index}: informe o título da tarefa.`);
    }
    const action: Record<string, unknown> = {
      type: 'create_task',
      title: draft.title.trim(),
      priority: draft.priority || 'normal',
    };
    if (draft.body.trim()) action['description'] = draft.body.trim();
    if (draft.relatedType.trim()) action['related_type'] = draft.relatedType.trim();
    if (draft.relatedId.trim()) action['related_id'] = draft.relatedId.trim();
    return action;
  }
}

function emptyAction(): ActionDraft {
  return {
    type: 'create_task',
    to: '',
    subject: '',
    body: '',
    title: '',
    priority: 'normal',
    relatedType: '',
    relatedId: '',
  };
}

function emptyCondition(): ConditionDraft {
  return { field: '', op: 'eq', value: '' };
}

function mapAction(action: Record<string, unknown>): ActionDraft {
  const type = String(action['type'] ?? 'create_task') as ActionType;
  return {
    type: ['send_email', 'create_task', 'create_notification'].includes(type) ? type : 'create_task',
    to: String(action['to'] ?? ''),
    subject: String(action['subject'] ?? ''),
    body: String(action['body'] ?? action['description'] ?? ''),
    title: String(action['title'] ?? ''),
    priority: String(action['priority'] ?? 'normal'),
    relatedType: String(action['related_type'] ?? ''),
    relatedId: String(action['related_id'] ?? ''),
  };
}

function mapCondition(raw: Record<string, unknown>): ConditionDraft {
  const opRaw = String(raw['op'] ?? 'eq') as ConditionOp;
  const op = ['eq', 'neq', 'exists', 'not_exists'].includes(opRaw) ? opRaw : 'eq';
  return {
    field: String(raw['field'] ?? ''),
    op,
    value: raw['value'] != null ? String(raw['value']) : '',
  };
}
