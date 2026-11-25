import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  PlataformaService,
  PlatformCannedReplyRow,
  PlatformSupportAgentRow,
} from '../../../core/services/plataforma.service';
import { AuthService } from '../../../core/services/auth.service';
import { SupportAttachment, SupportService, SupportTicket } from '../../../core/services/support.service';
import { ToastService } from '../../../core/services/toast.service';
import { ZmPageBackLinkComponent } from '../../../shared/components/ui';
import { GestgoSheetService } from '../../../shared/components/sheet/sheet.service';
import type { GestgoSheetRef } from '../../../shared/components/sheet/sheet-ref';

@Component({
  selector: 'app-plataforma-atendimento',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [JsonPipe, ZmPageBackLinkComponent],
  templateUrl: './plataforma-atendimento.component.html',
  styleUrl: './plataforma-atendimento.component.css',
})
export class PlataformaAtendimentoComponent implements OnInit, OnDestroy {
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

  readonly statusFiltros = [
    { id: 'all', label: 'Todos' },
    { id: 'new', label: 'Novos' },
    { id: 'waiting_internal', label: 'Aguardando equipe' },
    { id: 'waiting_customer', label: 'Aguardando cliente' },
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
    this.draftFiles.set(input?.files ? Array.from(input.files) : []);
  }

  baixarAnexo(attachment: SupportAttachment): void {
    const ticket = this.selected();
    if (!ticket) return;
    this.plataforma.downloadPlatformSupportAttachment(ticket.id, attachment.id).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = attachment.original_name || 'anexo';
        a.click();
        URL.revokeObjectURL(url);
      },
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

  onTriageCategory(event: Event): void {
    const category = (event.target as HTMLSelectElement).value;
    if (!category) return;
    this.patchTicket({ category });
  }

  onTriagePriority(event: Event): void {
    const priority = (event.target as HTMLSelectElement).value;
    if (!priority) return;
    this.patchTicket({ priority });
  }

  onTriageAssignee(event: Event): void {
    const raw = (event.target as HTMLSelectElement).value;
    const assignee_user_id = raw === '' ? 0 : Number(raw);
    this.patchTicket({ assignee_user_id });
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

  categoryLabel(category: string): string {
    return this.categories.find((c) => c.value === category)?.label ?? category;
  }

  priorityLabel(priority: string): string {
    return this.priorities.find((p) => p.value === priority)?.label ?? priority;
  }

  formatarData(value?: string | null): string {
    if (!value) return '—';
    try {
      return new Date(value).toLocaleString('pt-BR');
    } catch {
      return value;
    }
  }

  carregarRespostasProntas(): void {
    this.plataforma.getPlatformCannedReplies(true).subscribe({
      next: (res) => this.cannedReplies.set(res.data ?? []),
      error: () => this.cannedReplies.set([]),
    });
  }

  aplicarRespostaPronta(event: Event): void {
    const value = (event.target as HTMLSelectElement | null)?.value ?? '';
    const id = Number(value);
    if (!id) return;
    const item = this.cannedReplies().find((r) => r.id === id);
    if (!item) return;
    const current = this.draft().trim();
    this.draft.set(current ? `${current}\n\n${item.body}` : item.body);
    (event.target as HTMLSelectElement).value = '';
  }

  onDraft(event: Event): void {
    this.draft.set((event.target as HTMLTextAreaElement | null)?.value ?? '');
  }

  onNoteDraft(event: Event): void {
    this.noteDraft.set((event.target as HTMLTextAreaElement | null)?.value ?? '');
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
