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
  PlatformAutomationRow,
} from '../../../core/services/plataforma.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';
import { ToastService } from '../../../core/services/toast.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';
import { ZmPageBackLinkComponent } from '../../../shared/components/ui';
import { GestgoComboboxComponent, type GestgoComboboxOption } from '@/shared/components/combobox';
import { GestgoSheetService } from '../../../shared/components/sheet/sheet.service';
import type { GestgoSheetRef } from '../../../shared/components/sheet/sheet-ref';

type FiltroAutomacao = 'todas' | 'ativas' | 'pausadas';
const FILTRO_PADRAO_AUTOMACAO: FiltroAutomacao = 'todas';
type ActionType = 'send_email' | 'send_email_template' | 'create_task' | 'create_notification';
type ConditionOp = 'eq' | 'neq' | 'exists' | 'not_exists';

interface ActionDraft {
  type: ActionType;
  to: string;
  subject: string;
  body: string;
  title: string;
  priority: string;
  templateId: string;
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
  'lead.created': 'lead_id, lead_name, lead_clinic, lead_email, lead_phone',
  'trial.started': 'org_id, org_name, plan_key, niche, trial_days, owner_name, owner_email',
  'support.ticket.created': 'ticket_id, protocol, organization_id, category',
  'document.signed': 'submission_id, protocol_number, org_id, status',
  'protocol.review_pending': 'submission_id, protocol_number, org_id, status',
  'appointment.created': 'appointment_id, org_id, status, starts_at',
  'appointment.cancelled': 'appointment_id, org_id, status, starts_at',
};

@Component({
  selector: 'app-plataforma-automacoes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ListSkeletonComponent, ZmPageBackLinkComponent, GestgoComboboxComponent],
  templateUrl: './plataforma-automacoes.component.html',
  styleUrl: './plataforma-automacoes.component.css',
})
export class PlataformaAutomacoesComponent implements OnInit, OnDestroy {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly error = signal('');
  readonly acting = signal(false);
  readonly items = signal<PlatformAutomationRow[]>([]);
  readonly filtro = signal<FiltroAutomacao>(FILTRO_PADRAO_AUTOMACAO);
  readonly filterDrawerOpen = signal(false);
  filtroRascunho: FiltroAutomacao = FILTRO_PADRAO_AUTOMACAO;
  @ViewChild('filtrosTpl') filtrosTpl?: TemplateRef<void>;
  readonly editing = signal(false);
  readonly editId = signal<number | null>(null);

  readonly name = signal('');
  readonly description = signal('');
  readonly triggerEvent = signal('lead.created');
  readonly status = signal('draft');
  readonly waitSeconds = signal(0);
  readonly actions = signal<ActionDraft[]>([emptyAction()]);
  readonly conditions = signal<ConditionDraft[]>([]);

  readonly triggerOptions = [
    { id: 'lead.created', label: 'Lead criado' },
    { id: 'trial.started', label: 'Trial iniciado' },
    { id: 'document.signed', label: 'Documento assinado' },
    { id: 'protocol.review_pending', label: 'Protocolo em revisão' },
    { id: 'protocol.completed', label: 'Protocolo concluído' },
    { id: 'appointment.created', label: 'Agendamento criado' },
    { id: 'appointment.cancelled', label: 'Agendamento cancelado' },
    { id: 'support.ticket.created', label: 'Chamado aberto' },
  ];

  readonly conditionOps: { id: ConditionOp; label: string }[] = [
    { id: 'eq', label: 'igual a' },
    { id: 'neq', label: 'diferente de' },
    { id: 'exists', label: 'existe' },
    { id: 'not_exists', label: 'não existe' },
  ];

  readonly triggerComboOptions: GestgoComboboxOption[] = this.triggerOptions.map((o) => ({
    value: o.id,
    label: `${o.label} (${o.id})`,
  }));

  readonly conditionOpOptions: GestgoComboboxOption[] = this.conditionOps.map((o) => ({
    value: o.id,
    label: o.label,
  }));

  readonly statusOptions: GestgoComboboxOption[] = [
    { value: 'draft', label: 'Rascunho' },
    { value: 'active', label: 'Ativa' },
    { value: 'paused', label: 'Pausada' },
  ];

  readonly actionTypeOptions: GestgoComboboxOption[] = [
    { value: 'create_task', label: 'Criar tarefa' },
    { value: 'send_email', label: 'Enviar e-mail' },
    { value: 'send_email_template', label: 'Enviar e-mail (modelo)' },
    { value: 'create_notification', label: 'Criar notificação' },
  ];

  readonly priorityOptions: GestgoComboboxOption[] = [
    { value: 'low', label: 'Baixa' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'Alta' },
  ];

  readonly placeholderHint = 'Use placeholders como {{lead_name}} nos campos de texto.';
  readonly maxActions = MAX_ACTIONS;
  readonly maxConditions = MAX_CONDITIONS;

  readonly fieldHint = computed(
    () => TRIGGER_FIELD_HINTS[this.triggerEvent()] ?? 'Campos top-level do payload do evento',
  );

  readonly filtros: { id: FiltroAutomacao; label: string }[] = [
    { id: 'todas', label: 'Todas' },
    { id: 'ativas', label: 'Ativas' },
    { id: 'pausadas', label: 'Pausadas' },
  ];

  readonly listaAtual = computed(() => {
    const list = this.items();
    const f = this.filtro();
    if (f === 'ativas') return list.filter((i) => i.status === 'active');
    if (f === 'pausadas') return list.filter((i) => i.status === 'paused');
    return list;
  });

  private plataformaService = inject(PlataformaService);
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
    return this.filtro() !== FILTRO_PADRAO_AUTOMACAO;
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
    this.filtroRascunho = FILTRO_PADRAO_AUTOMACAO;
    this.aplicarFiltrosDrawer();
  }

  quantidadeFiltro(id: FiltroAutomacao): number {
    const list = this.items();
    if (id === 'ativas') return list.filter((i) => i.status === 'active').length;
    if (id === 'pausadas') return list.filter((i) => i.status === 'paused').length;
    return list.length;
  }

  selecionarFiltro(id: FiltroAutomacao): void {
    this.filtro.set(id);
  }

  carregar(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
      this.plataformaService.getPlatformAutomations(),
    );
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.error.set('');
        this.items.set(res.data?.items ?? []);
      },
      error: () => {
        this.listaPronta.set(true);
        this.error.set('Não foi possível carregar as automações.');
      },
    });
  }

  novo(): void {
    this.editing.set(true);
    this.editId.set(null);
    this.name.set('');
    this.description.set('');
    this.triggerEvent.set('lead.created');
    this.status.set('draft');
    this.waitSeconds.set(0);
    this.actions.set([emptyAction()]);
    this.conditions.set([]);
  }

  editar(item: PlatformAutomationRow): void {
    this.acting.set(true);
    this.plataformaService.getPlatformAutomation(item.id).subscribe({
      next: (res) => {
        this.acting.set(false);
        const data = res.data;
        this.editing.set(true);
        this.editId.set(data.id);
        this.name.set(data.name);
        this.description.set(data.description || '');
        this.triggerEvent.set(data.trigger_event);
        this.status.set(data.status || 'draft');
        const config = data.config ?? {};
        this.waitSeconds.set(Number(config.wait_seconds ?? 0));

        const rawActions = Array.isArray(config.actions) ? config.actions : [];
        if (rawActions.length > MAX_ACTIONS) {
          this.toast.info('Ações', `Exibindo as primeiras ${MAX_ACTIONS} ações.`);
        }
        const mappedActions = (rawActions.length ? rawActions : [{}])
          .slice(0, MAX_ACTIONS)
          .map((action) => mapAction(action as Record<string, unknown>));
        this.actions.set(mappedActions);

        const rawConditions = Array.isArray(config.conditions) ? config.conditions : [];
        if (rawConditions.length > MAX_CONDITIONS) {
          this.toast.info('Condições', `Exibindo as primeiras ${MAX_CONDITIONS} condições.`);
        }
        this.conditions.set(
          rawConditions.slice(0, MAX_CONDITIONS).map((c) => mapCondition(c as Record<string, unknown>)),
        );
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível abrir a automação.');
      },
    });
  }

  cancelar(): void {
    this.editing.set(false);
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
    const req = id
      ? this.plataformaService.updatePlatformAutomation(id, payload)
      : this.plataformaService.createPlatformAutomation(payload);
    req.subscribe({
      next: () => {
        this.acting.set(false);
        this.editing.set(false);
        this.toast.success('Salvo', 'Automação atualizada.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível salvar a automação.');
      },
    });
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
  onActionTemplateId(index: number, event: Event): void {
    this.updateAction(index, { templateId: (event.target as HTMLInputElement).value });
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

  async pausar(item: PlatformAutomationRow): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Pausar automação',
      message: `Pausar "${item.name}"? Novos eventos não dispararão ações.`,
      confirmLabel: 'Pausar',
    });
    if (!ok) return;
    this.acting.set(true);
    this.plataformaService.pausePlatformAutomation(item.id).subscribe({
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

  async ativar(item: PlatformAutomationRow): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Ativar automação',
      message: `Ativar "${item.name}"?`,
      confirmLabel: 'Ativar',
    });
    if (!ok) return;
    this.acting.set(true);
    this.plataformaService.activatePlatformAutomation(item.id).subscribe({
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
  onTrigger(value: string | null): void {
    if (value) this.triggerEvent.set(value);
  }
  onStatus(value: string | null): void {
    if (value) this.status.set(value);
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
    if (type === 'send_email_template') {
      const templateId = Number(draft.templateId);
      if (!templateId) throw new Error(`Ação ${index}: informe o ID do modelo.`);
      const action: Record<string, unknown> = { type, template_id: templateId };
      if (draft.to.trim()) action['to'] = draft.to.trim();
      return action;
    }
    if (type === 'create_notification') {
      if (!draft.title.trim() || !draft.body.trim()) {
        throw new Error(`Ação ${index}: informe título e corpo da notificação.`);
      }
      return {
        type,
        title: draft.title.trim(),
        body: draft.body.trim(),
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
    to: '{{lead_email}}',
    subject: '',
    body: '',
    title: '',
    priority: 'normal',
    templateId: '',
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
    type: ['send_email', 'send_email_template', 'create_task', 'create_notification'].includes(type)
      ? type
      : 'create_task',
    to: String(action['to'] ?? '{{lead_email}}'),
    subject: String(action['subject'] ?? ''),
    body: String(action['body'] ?? action['description'] ?? ''),
    title: String(action['title'] ?? ''),
    priority: String(action['priority'] ?? 'normal'),
    templateId: action['template_id'] != null ? String(action['template_id']) : '',
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
