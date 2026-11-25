import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  PlataformaService,
  PlatformCannedReplyRow,
  PlatformSupportAgentRow,
} from '../../../core/services/plataforma.service';
import { AuthService } from '../../../core/services/auth.service';
import {
  SupportAttachment,
  SupportMessage,
  SupportService,
  SupportTicket,
} from '../../../core/services/support.service';
import { ToastService } from '../../../core/services/toast.service';
import {
  GestgoComboboxComponent,
  type GestgoComboboxOption,
} from '../../../shared/components/combobox';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';
import { ZmPageBackLinkComponent } from '../../../shared/components/ui';
import { GestgoSheetService } from '../../../shared/components/sheet/sheet.service';
import type { GestgoSheetRef } from '../../../shared/components/sheet/sheet-ref';

type ComposeMode = 'reply' | 'note';
type ListTab = 'all' | 'mine' | 'unassigned' | 'waiting';
type StatusTone = 'novo' | 'andamento' | 'resolvido' | 'encerrado' | 'aguardando';

type NordModalElement = HTMLElement & {
  open?: boolean;
  showModal: () => void;
  close: () => void;
};

interface MessageDayGroup {
  day: string;
  messages: SupportMessage[];
}

@Component({
  selector: 'app-plataforma-atendimento',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [JsonPipe, ZmPageBackLinkComponent, GestgoComboboxComponent, ListSkeletonComponent],
  templateUrl: './plataforma-atendimento.component.html',
  styleUrl: './plataforma-atendimento.component.css',
})
export class PlataformaAtendimentoComponent implements OnInit, OnDestroy {
  private readonly messagesEl = viewChild<ElementRef<HTMLElement>>('messagesEl');
  private readonly anexoModalRef = viewChild<ElementRef<NordModalElement>>('anexoModal');

  readonly items = signal<SupportTicket[]>([]);
  readonly selected = signal<SupportTicket | null>(null);
  readonly agents = signal<PlatformSupportAgentRow[]>([]);
  readonly loading = signal(false);
  readonly acting = signal(false);
  readonly error = signal('');
  readonly statusFilter = signal('all');
  readonly categoryFilter = signal('all');
  readonly priorityFilter = signal('all');
  readonly assigneeFilter = signal('all');
  readonly search = signal('');
  readonly draft = signal('');
  readonly noteDraft = signal('');
  readonly waiting = signal(0);
  readonly draftFiles = signal<File[]>([]);
  readonly cannedReplies = signal<PlatformCannedReplyRow[]>([]);
  readonly filterDrawerOpen = signal(false);
  readonly listTab = signal<ListTab>('all');
  readonly composeMode = signal<ComposeMode>('reply');
  readonly previewAberto = signal(false);
  readonly previewLoading = signal(false);
  readonly previewAttachment = signal<SupportAttachment | null>(null);
  readonly previewUrl = signal<string | null>(null);

  private previewBlob: Blob | null = null;
  private previewObjectUrl: string | null = null;

  statusRascunho = 'all';
  categoryRascunho = 'all';
  priorityRascunho = 'all';
  assigneeRascunho = 'all';

  @ViewChild('filtrosTpl') filtrosTpl?: TemplateRef<void>;

  readonly canManage = computed(
    () =>
      this.auth.hasPermission('support.tickets.manage') ||
      this.auth.hasPermission('platform.admin'),
  );

  readonly listTabs: { id: ListTab; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'mine', label: 'Meus' },
    { id: 'unassigned', label: 'Sem responsável' },
    { id: 'waiting', label: 'Aguardando resposta' },
  ];

  readonly statusFiltros = [
    { id: 'all', label: 'Todos' },
    { id: 'new', label: 'Novos' },
    { id: 'waiting_internal', label: 'Aguardando equipe' },
    { id: 'waiting_customer', label: 'Aguardando cliente' },
  ];

  readonly statusQuick = [
    { value: 'new', label: 'Novo' },
    { value: 'in_progress', label: 'Em atendimento' },
    { value: 'resolved', label: 'Resolvido' },
    { value: 'closed', label: 'Encerrado' },
  ];

  readonly categories = [
    { value: 'comercial', label: 'Comercial' },
    { value: 'financeiro', label: 'Financeiro' },
    { value: 'duvida_utilizacao', label: 'Dúvida de utilização' },
    { value: 'problema_tecnico', label: 'Problema técnico' },
    { value: 'sugestao', label: 'Sugestão' },
    { value: 'privacidade_seguranca', label: 'Privacidade e segurança' },
    { value: 'solicitacao_administrativa', label: 'Solicitação administrativa' },
  ];

  readonly priorities = [
    { value: 'low', label: 'Baixa' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'Alta' },
    { value: 'urgent', label: 'Urgente' },
  ];

  readonly categoryOptions: GestgoComboboxOption[] = this.categories.map((c) => ({
    value: c.value,
    label: c.label,
  }));

  readonly priorityOptions: GestgoComboboxOption[] = this.priorities.map((p) => ({
    value: p.value,
    label: p.label,
  }));

  readonly filterCategoryOptions: GestgoComboboxOption[] = [
    { value: 'all', label: 'Todas' },
    ...this.categoryOptions,
  ];

  readonly filterPriorityOptions: GestgoComboboxOption[] = [
    { value: 'all', label: 'Todas' },
    ...this.priorityOptions,
  ];

  readonly assigneeOptions = computed((): GestgoComboboxOption[] => [
    { value: '', label: 'Sem responsável' },
    ...this.agents().map((a) => ({ value: String(a.id), label: a.name })),
  ]);

  readonly filterAssigneeOptions = computed((): GestgoComboboxOption[] => [
    { value: 'all', label: 'Todos' },
    { value: 'unassigned', label: 'Sem responsável' },
    ...this.agents().map((a) => ({ value: String(a.id), label: a.name })),
  ]);

  readonly cannedReplyOptions = computed((): GestgoComboboxOption[] =>
    this.cannedReplies().map((r) => ({
      value: String(r.id),
      label: r.shortcut ? `${r.title} (${r.shortcut})` : r.title,
    })),
  );

  readonly messageDayGroups = computed((): MessageDayGroup[] => {
    const messages = (this.selected()?.messages ?? []).filter((m) => !m.is_internal);
    const groups: MessageDayGroup[] = [];
    for (const msg of messages) {
      const day = this.formatarDia(msg.created_at);
      const last = groups[groups.length - 1];
      if (last && last.day === day) last.messages.push(msg);
      else groups.push({ day, messages: [msg] });
    }
    return groups;
  });

  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private searchTimer: ReturnType<typeof setTimeout> | null = null;
  private plataforma = inject(PlataformaService);
  private support = inject(SupportService);
  private toast = inject(ToastService);
  private auth = inject(AuthService);
  private readonly vcr = inject(ViewContainerRef);
  private readonly gestgoSheet = inject(GestgoSheetService);
  private filtrosSheetRef?: GestgoSheetRef<void>;
  readonly acceptTypes = this.support.acceptTypes;

  constructor() {
    effect(() => {
      this.messageDayGroups();
      const el = this.messagesEl()?.nativeElement;
      if (!el) return;
      queueMicrotask(() => {
        el.scrollTop = el.scrollHeight;
      });
    });

    effect(() => {
      const shouldOpen = this.previewAberto();
      const el = this.anexoModalRef()?.nativeElement;
      if (!el) return;
      queueMicrotask(() => {
        const modal = this.anexoModalRef()?.nativeElement;
        if (!modal) return;
        if (shouldOpen && !modal.open) modal.showModal();
        else if (!shouldOpen && modal.open) modal.close();
      });
    });
  }

  ngOnInit(): void {
    this.carregarLista();
    this.carregarRespostasProntas();
    this.carregarAgentes();
    this.pollTimer = setInterval(() => this.refreshSelectedQuiet(), 15000);
  }

  ngOnDestroy(): void {
    this.filtrosSheetRef?.close();
    if (this.pollTimer) clearInterval(this.pollTimer);
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.limparPreview();
  }

  get temFiltrosAtivos(): boolean {
    return (
      this.statusFilter() !== 'all' ||
      this.categoryFilter() !== 'all' ||
      this.priorityFilter() !== 'all' ||
      this.assigneeFilter() !== 'all'
    );
  }

  get quantidadeFiltrosAtivos(): number {
    return (
      Number(this.statusFilter() !== 'all') +
      Number(this.categoryFilter() !== 'all') +
      Number(this.priorityFilter() !== 'all') +
      Number(this.assigneeFilter() !== 'all')
    );
  }

  setListTab(tab: ListTab): void {
    this.listTab.set(tab);
    if (tab === 'all') {
      this.statusFilter.set('all');
      this.assigneeFilter.set('all');
    } else if (tab === 'mine') {
      const me = this.auth.getUser()?.id;
      this.statusFilter.set('all');
      this.assigneeFilter.set(me ? String(me) : 'all');
    } else if (tab === 'unassigned') {
      this.statusFilter.set('all');
      this.assigneeFilter.set('unassigned');
    } else {
      this.statusFilter.set('waiting_internal');
      this.assigneeFilter.set('all');
    }
    this.carregarLista();
  }

  setComposeMode(mode: ComposeMode): void {
    this.composeMode.set(mode);
  }

  openFilterDrawer(): void {
    if (this.filtrosSheetRef) {
      this.filtrosSheetRef.close();
      return;
    }
    if (!this.filtrosTpl) return;
    this.statusRascunho = this.statusFilter();
    this.categoryRascunho = this.categoryFilter();
    this.priorityRascunho = this.priorityFilter();
    this.assigneeRascunho = this.assigneeFilter();
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
    this.statusFilter.set(this.statusRascunho || 'all');
    this.categoryFilter.set(this.categoryRascunho || 'all');
    this.priorityFilter.set(this.priorityRascunho || 'all');
    this.assigneeFilter.set(this.assigneeRascunho || 'all');
    this.syncListTabFromFilters();
    this.filtrosSheetRef?.close();
    this.carregarLista();
  }

  limparFiltrosDrawer(): void {
    this.statusRascunho = 'all';
    this.categoryRascunho = 'all';
    this.priorityRascunho = 'all';
    this.assigneeRascunho = 'all';
    this.statusFilter.set('all');
    this.categoryFilter.set('all');
    this.priorityFilter.set('all');
    this.assigneeFilter.set('all');
    this.listTab.set('all');
    this.filtrosSheetRef?.close();
    this.carregarLista();
  }

  limparTudo(): void {
    this.search.set('');
    this.limparFiltrosDrawer();
  }

  carregarLista(): void {
    this.loading.set(true);
    const status = this.statusFilter() === 'all' ? undefined : this.statusFilter();
    const category = this.categoryFilter() === 'all' ? undefined : this.categoryFilter();
    const priority = this.priorityFilter() === 'all' ? undefined : this.priorityFilter();
    const assigneeRaw = this.assigneeFilter();
    const assignee_user_id =
      assigneeRaw === 'all' ? undefined : assigneeRaw === 'unassigned' ? 0 : Number(assigneeRaw);
    const q = this.search().trim() || undefined;
    this.plataforma
      .getPlatformSupportInbox({ status, category, priority, assignee_user_id, q })
      .subscribe({
        next: (res) => {
          this.loading.set(false);
          this.error.set('');
          this.items.set(res.data?.items ?? []);
          this.waiting.set(res.data?.waiting_response ?? 0);
          const current = this.selected();
          if (current) {
            const still = (res.data?.items ?? []).find((i) => i.id === current.id);
            if (!still) this.selected.set(null);
          }
        },
        error: () => {
          this.loading.set(false);
          this.error.set('Não foi possível carregar a caixa de entrada.');
        },
      });
  }

  carregarAgentes(): void {
    this.plataforma.getPlatformSupportAgents().subscribe({
      next: (res) => this.agents.set(res.data ?? []),
      error: () => this.agents.set([]),
    });
  }

  selecionar(item: SupportTicket): void {
    this.composeMode.set('reply');
    this.plataforma.getPlatformSupportTicket(item.id).subscribe({
      next: (res) => this.selected.set(res.data),
      error: () => this.toast.error('Erro', 'Não foi possível abrir o chamado.'),
    });
  }

  onSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value ?? '');
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.carregarLista(), 300);
  }

  enviarComposer(): void {
    if (this.composeMode() === 'note') {
      this.adicionarNota();
      return;
    }
    this.enviarResposta();
  }

  onComposerKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' || event.shiftKey) return;
    event.preventDefault();
    this.enviarComposer();
  }

  enviarResposta(): void {
    const ticket = this.selected();
    const message = this.draft().trim();
    const files = this.draftFiles();
    if (!ticket || (!message && files.length === 0)) return;
    const fileError = this.support.validateFiles(files);
    if (fileError) {
      this.toast.error('Anexos', fileError);
      return;
    }
    this.acting.set(true);
    this.plataforma.replyPlatformSupportTicket(ticket.id, message, files).subscribe({
      next: (res) => {
        this.acting.set(false);
        this.draft.set('');
        this.draftFiles.set([]);
        this.selected.set(res.data);
        this.carregarLista();
        this.toast.success('Enviado', 'Resposta registrada.');
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Falha ao responder.');
      },
    });
  }

  onDraftFiles(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    const incoming = input?.files ? Array.from(input.files) : [];
    const merged = [...this.draftFiles()];
    for (const file of incoming) {
      if (merged.length >= this.support.maxFiles) break;
      if (merged.some((f) => f.name === file.name && f.size === file.size)) continue;
      merged.push(file);
    }
    this.draftFiles.set(merged.slice(0, this.support.maxFiles));
    if (input) input.value = '';
  }

  removerDraftFile(index: number): void {
    this.draftFiles.update((files) => files.filter((_, i) => i !== index));
  }

  abrirAnexo(attachment: SupportAttachment): void {
    if (this.isImageAttachment(attachment)) {
      this.abrirPreviewAnexo(attachment);
      return;
    }
    this.baixarAnexo(attachment);
  }

  anexoIcone(attachment: SupportAttachment): string {
    return this.isImageAttachment(attachment) ? 'image' : 'description';
  }

  abrirPreviewAnexo(attachment: SupportAttachment): void {
    const ticket = this.selected();
    if (!ticket) return;
    this.limparPreview();
    this.previewAttachment.set(attachment);
    this.previewLoading.set(true);
    this.previewAberto.set(true);
    this.plataforma.downloadPlatformSupportAttachment(ticket.id, attachment.id).subscribe({
      next: (blob) => {
        this.previewBlob = blob;
        this.previewObjectUrl = URL.createObjectURL(blob);
        this.previewUrl.set(this.previewObjectUrl);
        this.previewLoading.set(false);
      },
      error: () => {
        this.previewLoading.set(false);
        this.toast.error('Erro', 'Não foi possível abrir o anexo.');
        this.fecharPreviewAnexo();
      },
    });
  }

  fecharPreviewAnexo(): void {
    this.previewAberto.set(false);
    this.limparPreview();
  }

  baixarPreviewAnexo(): void {
    const attachment = this.previewAttachment();
    if (!attachment) return;
    if (this.previewBlob) {
      this.saveBlob(this.previewBlob, attachment.original_name);
      return;
    }
    this.baixarAnexo(attachment);
  }

  baixarAnexo(attachment: SupportAttachment): void {
    const ticket = this.selected();
    if (!ticket) return;
    this.plataforma.downloadPlatformSupportAttachment(ticket.id, attachment.id).subscribe({
      next: (blob) => this.saveBlob(blob, attachment.original_name),
      error: () => this.toast.error('Erro', 'Não foi possível baixar o anexo.'),
    });
  }

  formatSize(size?: number): string {
    if (!size || size <= 0) return '';
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  adicionarNota(): void {
    const ticket = this.selected();
    const message = this.noteDraft().trim();
    if (!ticket || !message || !this.canManage()) return;
    this.acting.set(true);
    this.plataforma.notePlatformSupportTicket(ticket.id, message).subscribe({
      next: (res) => {
        this.acting.set(false);
        this.noteDraft.set('');
        this.selected.set(res.data);
        this.toast.success('Nota', 'Nota interna salva.');
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Falha ao salvar nota.');
      },
    });
  }

  atualizarStatus(status: string): void {
    this.patchTicket({ status });
  }

  assigneeValue(ticket: SupportTicket): string {
    return ticket.assignee_user_id != null ? String(ticket.assignee_user_id) : '';
  }

  onTriageCategory(value: string | null): void {
    if (!value) return;
    this.patchTicket({ category: value });
  }

  onTriagePriority(value: string | null): void {
    if (!value) return;
    this.patchTicket({ priority: value });
  }

  onTriageAssignee(value: string | null): void {
    const assignee_user_id = !value ? 0 : Number(value);
    this.patchTicket({ assignee_user_id });
  }

  onFilterCategory(value: string | null): void {
    this.categoryRascunho = value || 'all';
  }

  onFilterPriority(value: string | null): void {
    this.priorityRascunho = value || 'all';
  }

  onFilterAssignee(value: string | null): void {
    this.assigneeRascunho = value || 'all';
  }

  assumirChamado(): void {
    const me = this.auth.getUser()?.id;
    if (!me) return;
    this.patchTicket({ assignee_user_id: me, status: 'in_progress' });
  }

  private patchTicket(payload: {
    status?: string;
    priority?: string;
    category?: string;
    assignee_user_id?: number | null;
  }): void {
    const ticket = this.selected();
    if (!ticket || !this.canManage()) return;
    this.acting.set(true);
    this.plataforma.updatePlatformSupportTicket(ticket.id, payload).subscribe({
      next: (res) => {
        this.acting.set(false);
        this.selected.set(res.data);
        this.carregarLista();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível atualizar o chamado.');
      },
    });
  }

  statusLabel(status: string): string {
    switch (status) {
      case 'new':
        return 'Novo';
      case 'in_progress':
        return 'Em atendimento';
      case 'waiting_customer':
        return 'Aguardando cliente';
      case 'waiting_internal':
        return 'Aguardando equipe';
      case 'resolved':
        return 'Resolvido';
      case 'closed':
        return 'Encerrado';
      default:
        return status;
    }
  }

  statusTone(status: string): StatusTone {
    switch (status) {
      case 'new':
        return 'novo';
      case 'resolved':
        return 'resolvido';
      case 'closed':
        return 'encerrado';
      case 'waiting_customer':
      case 'waiting_internal':
        return 'aguardando';
      default:
        return 'andamento';
    }
  }

  categoryLabel(category: string): string {
    return this.categories.find((c) => c.value === category)?.label ?? category;
  }

  priorityLabel(priority: string): string {
    return this.priorities.find((p) => p.value === priority)?.label ?? priority;
  }

  contextValue(context: Record<string, unknown>, key: string): string {
    const value = context[key];
    return value == null || value === '' ? '—' : String(value);
  }

  formatarData(value?: string | null): string {
    if (!value) return '—';
    try {
      return new Date(value).toLocaleString('pt-BR');
    } catch {
      return value;
    }
  }

  formatarDataCurta(value?: string | null): string {
    if (!value) return '—';
    try {
      return new Date(value).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return value;
    }
  }

  formatarHora(value?: string | null): string {
    if (!value) return '';
    try {
      return new Date(value).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } catch {
      return '';
    }
  }

  formatarDia(value?: string | null): string {
    if (!value) return 'Sem data';
    try {
      return new Date(value).toLocaleDateString('pt-BR');
    } catch {
      return 'Sem data';
    }
  }

  carregarRespostasProntas(): void {
    this.plataforma.getPlatformCannedReplies(true).subscribe({
      next: (res) => this.cannedReplies.set(res.data ?? []),
      error: () => this.cannedReplies.set([]),
    });
  }

  aplicarRespostaPronta(value: string | null): void {
    const id = Number(value);
    if (!id) return;
    const item = this.cannedReplies().find((r) => r.id === id);
    if (!item) return;
    const current = this.draft().trim();
    this.draft.set(current ? `${current}\n\n${item.body}` : item.body);
  }

  onDraft(event: Event): void {
    this.draft.set((event.target as HTMLTextAreaElement | null)?.value ?? '');
  }

  onNoteDraft(event: Event): void {
    this.noteDraft.set((event.target as HTMLTextAreaElement | null)?.value ?? '');
  }

  isImageAttachment(attachment: SupportAttachment): boolean {
    const mime = (attachment.mime || '').toLowerCase();
    if (mime.startsWith('image/')) return true;
    return /\.(png|jpe?g|webp|gif|bmp)$/i.test(attachment.original_name || '');
  }

  private syncListTabFromFilters(): void {
    const me = this.auth.getUser()?.id;
    const assignee = this.assigneeFilter();
    const status = this.statusFilter();
    if (status === 'waiting_internal' && assignee === 'all') {
      this.listTab.set('waiting');
    } else if (assignee === 'unassigned' && status === 'all') {
      this.listTab.set('unassigned');
    } else if (me && assignee === String(me) && status === 'all') {
      this.listTab.set('mine');
    } else if (status === 'all' && assignee === 'all') {
      this.listTab.set('all');
    } else {
      this.listTab.set('all');
    }
  }

  private saveBlob(blob: Blob, name: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name || 'anexo';
    a.click();
    URL.revokeObjectURL(url);
  }

  private limparPreview(): void {
    if (this.previewObjectUrl) {
      URL.revokeObjectURL(this.previewObjectUrl);
      this.previewObjectUrl = null;
    }
    this.previewBlob = null;
    this.previewUrl.set(null);
    this.previewAttachment.set(null);
    this.previewLoading.set(false);
  }

  private refreshSelectedQuiet(): void {
    const ticket = this.selected();
    if (!ticket) return;
    this.plataforma.getPlatformSupportTicket(ticket.id).subscribe({
      next: (res) => this.selected.set(res.data),
      error: () => undefined,
    });
  }
}
