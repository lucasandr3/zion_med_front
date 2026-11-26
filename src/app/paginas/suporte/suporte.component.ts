import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnDestroy,
  OnInit,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  SupportAttachment,
  SupportMessage,
  SupportService,
  SupportTicket,
} from '../../core/services/support.service';
import { ToastService } from '../../core/services/toast.service';
import {
  GestgoComboboxComponent,
  type GestgoComboboxOption,
} from '../../shared/components/combobox';
import { ListSkeletonComponent } from '../../shared/components/list-skeleton/list-skeleton.component';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';

type NordModalElement = HTMLElement & {
  open?: boolean;
  showModal: () => void;
  close: () => void;
};

type StatusTone = 'novo' | 'andamento' | 'resolvido' | 'encerrado' | 'aguardando';

interface StatusStep {
  key: string;
  label: string;
  state: 'done' | 'current' | 'todo';
}

interface MessageDayGroup {
  day: string;
  messages: SupportMessage[];
}

@Component({
  selector: 'app-suporte',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterLink, ListSkeletonComponent, ZmPageBackLinkComponent, GestgoComboboxComponent],
  templateUrl: './suporte.component.html',
  styleUrl: './suporte.component.css',
})
export class SuporteComponent implements OnInit, OnDestroy {
  private readonly messagesEl = viewChild<ElementRef<HTMLElement>>('messagesEl');
  private readonly anexoModalRef = viewChild<ElementRef<NordModalElement>>('anexoModal');

  readonly items = signal<SupportTicket[]>([]);
  readonly selected = signal<SupportTicket | null>(null);
  readonly loading = signal(false);
  readonly acting = signal(false);
  readonly creating = signal(false);
  readonly error = signal('');
  readonly subject = signal('');
  readonly category = signal('duvida_utilizacao');
  readonly message = signal('');
  readonly draft = signal('');
  readonly createFiles = signal<File[]>([]);
  readonly draftFiles = signal<File[]>([]);
  readonly previewAberto = signal(false);
  readonly previewLoading = signal(false);
  readonly previewAttachment = signal<SupportAttachment | null>(null);
  readonly previewUrl = signal<string | null>(null);
  private previewBlob: Blob | null = null;
  private previewObjectUrl: string | null = null;

  readonly categoriasOpcoes: GestgoComboboxOption[] = [
    { value: 'duvida_utilizacao', label: 'Dúvida de utilização' },
    { value: 'problema_tecnico', label: 'Problema técnico' },
    { value: 'comercial', label: 'Comercial' },
    { value: 'financeiro', label: 'Financeiro' },
    { value: 'sugestao', label: 'Sugestão' },
    { value: 'privacidade_seguranca', label: 'Privacidade e segurança' },
    { value: 'solicitacao_administrativa', label: 'Solicitação administrativa' },
  ];

  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private readonly support = inject(SupportService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);
  readonly acceptTypes = this.support.acceptTypes;

  readonly statusSteps = computed((): StatusStep[] => {
    const status = this.selected()?.status ?? '';
    const order = ['new', 'in_progress', 'resolved'] as const;
    const labels = ['Novo', 'Em atendimento', 'Resolvido'] as const;
    let currentIndex = 0;
    if (status === 'closed' || status === 'resolved') currentIndex = 2;
    else if (status === 'in_progress' || status === 'waiting_customer' || status === 'waiting_internal') {
      currentIndex = 1;
    } else {
      currentIndex = 0;
    }
    if (status === 'closed') {
      return labels.map((label, i) => ({
        key: order[i],
        label,
        state: 'done' as const,
      }));
    }
    return labels.map((label, i) => ({
      key: order[i],
      label,
      state: i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'todo',
    }));
  });

  readonly messageDayGroups = computed((): MessageDayGroup[] => {
    const messages = (this.selected()?.messages ?? []).filter((m) => !m.is_internal);
    const groups: MessageDayGroup[] = [];
    for (const msg of messages) {
      const day = this.formatarDia(msg.created_at);
      const last = groups[groups.length - 1];
      if (last && last.day === day) {
        last.messages.push(msg);
      } else {
        groups.push({ day, messages: [msg] });
      }
    }
    return groups;
  });

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
        if (shouldOpen && !modal.open) {
          modal.showModal();
        } else if (!shouldOpen && modal.open) {
          modal.close();
        }
      });
    });
  }

  ngOnInit(): void {
    this.carregar();
    this.pollTimer = setInterval(() => this.refreshSelectedQuiet(), 12000);
  }

  ngOnDestroy(): void {
    if (this.pollTimer) clearInterval(this.pollTimer);
    this.limparPreview();
  }

  carregar(): void {
    this.loading.set(true);
    this.support.listClinic().subscribe({
      next: (res) => {
        this.loading.set(false);
        this.error.set('');
        this.items.set(res.data ?? []);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Não foi possível carregar seus atendimentos.');
      },
    });
  }

  abrir(item: SupportTicket): void {
    this.support.getClinic(item.id).subscribe({
      next: (res) => {
        this.creating.set(false);
        this.selected.set(res.data);
      },
      error: () => this.toast.error('Erro', 'Não foi possível abrir o chamado.'),
    });
  }

  novo(): void {
    this.selected.set(null);
    this.creating.set(true);
    this.subject.set('');
    this.message.set('');
    this.category.set('duvida_utilizacao');
    this.createFiles.set([]);
  }

  cancelarCriacao(): void {
    this.creating.set(false);
  }

  criar(): void {
    const subject = this.subject().trim();
    const message = this.message().trim();
    if (!subject || !message) {
      this.toast.error('Campos', 'Informe assunto e mensagem.');
      return;
    }
    const files = this.createFiles();
    const fileError = this.support.validateFiles(files);
    if (fileError) {
      this.toast.error('Anexos', fileError);
      return;
    }
    this.acting.set(true);
    this.support
      .createClinic({
        subject,
        category: this.category(),
        message,
        files,
        context: {
          module: 'suporte',
          route: this.sanitizeRoute(this.router.url),
          frontend_version: 'web',
          browser: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 180) : '',
          device:
            typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)
              ? 'mobile'
              : 'desktop',
        },
      })
      .subscribe({
        next: (res) => {
          this.acting.set(false);
          this.creating.set(false);
          this.createFiles.set([]);
          this.selected.set(res.data);
          this.carregar();
          this.toast.success('Aberto', `Chamado ${res.data.protocol} criado.`);
        },
        error: () => {
          this.acting.set(false);
          this.toast.error('Erro', 'Não foi possível abrir o atendimento.');
        },
      });
  }

  responder(): void {
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
    this.support.replyClinic(ticket.id, message, files).subscribe({
      next: (res) => {
        this.acting.set(false);
        this.draft.set('');
        this.draftFiles.set([]);
        this.selected.set(res.data);
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Falha ao enviar mensagem.');
      },
    });
  }

  onDraftKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' || event.shiftKey) return;
    event.preventDefault();
    this.responder();
  }

  onCreateFiles(event: Event): void {
    this.createFiles.set(this.mergeFiles(this.createFiles(), this.readFiles(event)));
    this.resetFileInput(event);
  }

  onDraftFiles(event: Event): void {
    this.draftFiles.set(this.mergeFiles(this.draftFiles(), this.readFiles(event)));
    this.resetFileInput(event);
  }

  removerCreateFile(index: number): void {
    this.createFiles.update((files) => files.filter((_, i) => i !== index));
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
    this.support.downloadClinicAttachment(ticket.id, attachment.id).subscribe({
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
    this.support.downloadClinicAttachment(ticket.id, attachment.id).subscribe({
      next: (blob) => this.saveBlob(blob, attachment.original_name),
      error: () => this.toast.error('Erro', 'Não foi possível baixar o anexo.'),
    });
  }

  isImageAttachment(attachment: SupportAttachment): boolean {
    const mime = (attachment.mime || '').toLowerCase();
    if (mime.startsWith('image/')) return true;
    return /\.(png|jpe?g|webp|gif|bmp)$/i.test(attachment.original_name || '');
  }

  formatSize(size?: number): string {
    if (!size || size <= 0) return '';
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  avaliar(score: number): void {
    const ticket = this.selected();
    if (!ticket) return;
    this.support.rateClinic(ticket.id, score).subscribe({
      next: (res) => {
        this.selected.set(res.data);
        this.toast.success('Obrigado', 'Avaliação registrada.');
      },
      error: () => this.toast.error('Erro', 'Não foi possível avaliar.'),
    });
  }

  statusLabel(status: string): string {
    switch (status) {
      case 'new':
        return 'Novo';
      case 'in_progress':
        return 'Em atendimento';
      case 'waiting_customer':
        return 'Aguardando você';
      case 'waiting_internal':
        return 'Com a equipe Gestgo';
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
        return 'aguardando';
      default:
        return 'andamento';
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

  onSubject(event: Event): void {
    this.subject.set((event.target as HTMLInputElement | null)?.value ?? '');
  }

  onMessage(event: Event): void {
    this.message.set((event.target as HTMLTextAreaElement | null)?.value ?? '');
  }

  onDraft(event: Event): void {
    this.draft.set((event.target as HTMLTextAreaElement | null)?.value ?? '');
  }

  onCategoryChange(value: string | null): void {
    this.category.set(value?.trim() || 'duvida_utilizacao');
  }

  private sanitizeRoute(url: string): string {
    return (url || '/').split('?')[0].split('#')[0].slice(0, 120);
  }

  private readFiles(event: Event): File[] {
    const input = event.target as HTMLInputElement | null;
    return input?.files ? Array.from(input.files) : [];
  }

  private mergeFiles(current: File[], incoming: File[]): File[] {
    const merged = [...current];
    for (const file of incoming) {
      if (merged.length >= this.support.maxFiles) break;
      if (merged.some((f) => f.name === file.name && f.size === file.size)) continue;
      merged.push(file);
    }
    return merged.slice(0, this.support.maxFiles);
  }

  private resetFileInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (input) input.value = '';
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
    if (!ticket || this.creating()) return;
    this.support.getClinic(ticket.id).subscribe({
      next: (res) => this.selected.set(res.data),
      error: () => undefined,
    });
  }
}
