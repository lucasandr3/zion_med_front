import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SupportAttachment, SupportService, SupportTicket } from '../../core/services/support.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-suporte',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterLink],
  templateUrl: './suporte.component.html',
  styleUrl: './suporte.component.css',
})
export class SuporteComponent implements OnInit, OnDestroy {
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

  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private support = inject(SupportService);
  private toast = inject(ToastService);
  private router = inject(Router);
  readonly acceptTypes = this.support.acceptTypes;

  ngOnInit(): void {
    this.carregar();
    this.pollTimer = setInterval(() => this.refreshSelectedQuiet(), 12000);
  }

  ngOnDestroy(): void {
    if (this.pollTimer) clearInterval(this.pollTimer);
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
          device: typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
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

  onCreateFiles(event: Event): void {
    this.createFiles.set(this.readFiles(event));
  }

  onDraftFiles(event: Event): void {
    this.draftFiles.set(this.readFiles(event));
  }

  baixarAnexo(attachment: SupportAttachment): void {
    const ticket = this.selected();
    if (!ticket) return;
    this.support.downloadClinicAttachment(ticket.id, attachment.id).subscribe({
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
      case 'new': return 'Novo';
      case 'in_progress': return 'Em atendimento';
      case 'waiting_customer': return 'Aguardando você';
      case 'waiting_internal': return 'Com a equipe Gestgo';
      case 'resolved': return 'Resolvido';
      case 'closed': return 'Encerrado';
      default: return status;
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

  onSubject(event: Event): void {
    this.subject.set((event.target as HTMLInputElement | null)?.value ?? '');
  }

  onMessage(event: Event): void {
    this.message.set((event.target as HTMLTextAreaElement | null)?.value ?? '');
  }

  onDraft(event: Event): void {
    this.draft.set((event.target as HTMLTextAreaElement | null)?.value ?? '');
  }

  onCategory(event: Event): void {
    this.category.set((event.target as HTMLSelectElement | null)?.value ?? 'duvida_utilizacao');
  }

  private sanitizeRoute(url: string): string {
    return (url || '/').split('?')[0].split('#')[0].slice(0, 120);
  }

  private readFiles(event: Event): File[] {
    const input = event.target as HTMLInputElement | null;
    return input?.files ? Array.from(input.files) : [];
  }

  private saveBlob(blob: Blob, name: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name || 'anexo';
    a.click();
    URL.revokeObjectURL(url);
  }

  private refreshSelectedQuiet(): void {
    const ticket = this.selected();
    if (!ticket) return;
    this.support.getClinic(ticket.id).subscribe({
      next: (res) => this.selected.set(res.data),
      error: () => undefined,
    });
  }
}
