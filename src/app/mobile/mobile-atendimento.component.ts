import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  SupportService,
  type SupportMessage,
  type SupportTicket,
} from '../core/services/support.service';
import { MobileShellService } from './mobile-shell.service';
import { GestgoComboboxComponent, type GestgoComboboxOption } from '@/shared/components/combobox';

type View = 'list' | 'detail' | 'novo';

@Component({
  selector: 'app-mobile-atendimento',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink, GestgoComboboxComponent],
  templateUrl: './mobile-atendimento.component.html',
  styleUrls: ['./mobile-shared.css', './mobile-atendimento.component.css'],
})
export class MobileAtendimentoComponent implements OnInit, OnDestroy {
  private readonly support = inject(SupportService);
  private readonly shell = inject(MobileShellService);
  private pollTimer: ReturnType<typeof setInterval> | null = null;

  readonly view = signal<View>('list');
  readonly loading = signal(true);
  readonly acting = signal(false);
  readonly error = signal<string | null>(null);
  readonly items = signal<SupportTicket[]>([]);
  readonly selected = signal<SupportTicket | null>(null);

  readonly subject = signal('');
  readonly category = signal('duvida_utilizacao');
  readonly message = signal('');
  readonly draft = signal('');

  readonly categorias = [
    { value: 'duvida_utilizacao', label: 'Dúvida de utilização' },
    { value: 'problema_tecnico', label: 'Problema técnico' },
    { value: 'comercial', label: 'Comercial' },
    { value: 'financeiro', label: 'Financeiro' },
    { value: 'sugestao', label: 'Sugestão' },
    { value: 'privacidade_seguranca', label: 'Privacidade e segurança' },
    { value: 'solicitacao_administrativa', label: 'Solicitação administrativa' },
  ] as const;

  readonly categoriaOptions: GestgoComboboxOption[] = this.categorias.map((c) => ({
    value: c.value,
    label: c.label,
  }));

  onCategoryChange(value: string | null): void {
    if (value) this.category.set(value);
  }

  ngOnInit(): void {
    this.carregar();
    this.pollTimer = setInterval(() => this.refreshSelectedQuiet(), 12000);
  }

  ngOnDestroy(): void {
    if (this.pollTimer) clearInterval(this.pollTimer);
  }

  carregar(): void {
    this.loading.set(true);
    this.error.set(null);
    this.support.listClinic().subscribe({
      next: (res) => {
        this.items.set(res.data ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar os atendimentos.');
        this.loading.set(false);
      },
    });
  }

  abrir(id: number): void {
    this.acting.set(true);
    this.error.set(null);
    this.support.getClinic(id).subscribe({
      next: (res) => {
        this.selected.set(res.data);
        this.view.set('detail');
        this.acting.set(false);
        this.draft.set('');
      },
      error: () => {
        this.error.set('Não foi possível abrir o chamado.');
        this.acting.set(false);
      },
    });
  }

  voltarLista(): void {
    this.view.set('list');
    this.selected.set(null);
    this.carregar();
  }

  abrirNovo(): void {
    this.subject.set('');
    this.category.set('duvida_utilizacao');
    this.message.set('');
    this.error.set(null);
    this.view.set('novo');
  }

  criar(): void {
    const subject = this.subject().trim();
    const message = this.message().trim();
    if (!subject || !message) {
      this.error.set('Informe assunto e mensagem.');
      return;
    }
    this.acting.set(true);
    this.error.set(null);
    this.support
      .createClinic({
        subject,
        category: this.category(),
        message,
        context: { module: 'mobile', route: '/m/atendimento', device: 'mobile' },
      })
      .subscribe({
        next: (res) => {
          this.acting.set(false);
          this.shell.toast('Chamado aberto');
          this.selected.set(res.data);
          this.view.set('detail');
          this.carregar();
        },
        error: (err) => {
          this.acting.set(false);
          this.error.set(err?.error?.message || 'Não foi possível abrir o chamado.');
        },
      });
  }

  responder(): void {
    const ticket = this.selected();
    const body = this.draft().trim();
    if (!ticket || !body) return;
    this.acting.set(true);
    this.support.replyClinic(ticket.id, body).subscribe({
      next: (res) => {
        this.acting.set(false);
        this.selected.set(res.data);
        this.draft.set('');
        this.shell.toast('Mensagem enviada');
      },
      error: (err) => {
        this.acting.set(false);
        this.error.set(err?.error?.message || 'Não foi possível enviar.');
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
        return 'Aguardando você';
      case 'waiting_internal':
        return 'Aguardando Gestgo';
      case 'resolved':
        return 'Resolvido';
      case 'closed':
        return 'Encerrado';
      default:
        return status || '—';
    }
  }

  statusTone(status: string): 'ok' | 'warn' | '' {
    if (status === 'resolved' || status === 'closed') return 'ok';
    if (status === 'waiting_customer' || status === 'new') return 'warn';
    return '';
  }

  mensagensPublicas(t: SupportTicket): SupportMessage[] {
    return (t.messages ?? []).filter((m) => !m.is_internal);
  }

  formatDate(iso?: string | null): string {
    if (!iso) return '—';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  isMine(m: SupportMessage): boolean {
    return m.author_role === 'customer' || m.author_role === 'clinic' || m.author_role === 'user';
  }

  private refreshSelectedQuiet(): void {
    const t = this.selected();
    if (!t || this.view() !== 'detail') return;
    this.support.getClinic(t.id).subscribe({
      next: (res) => this.selected.set(res.data),
      error: () => {},
    });
  }
}
