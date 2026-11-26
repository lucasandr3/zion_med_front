import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  DocumentSendsService,
  type DocumentSendItem,
} from '../core/services/document-sends.service';
import { MobileShellService } from './mobile-shell.service';

type CaixaEnvio = 'pendentes' | 'assinados' | 'expirados' | '';

@Component({
  selector: 'app-mobile-envios',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './mobile-envios.component.html',
  styleUrls: ['./mobile-shared.css', './mobile-envios.component.css'],
})
export class MobileEnviosComponent implements OnInit {
  private readonly envios = inject(DocumentSendsService);
  private readonly shell = inject(MobileShellService);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly items = signal<DocumentSendItem[]>([]);
  readonly caixa = signal<CaixaEnvio>('pendentes');
  readonly acaoId = signal<number | null>(null);

  ngOnInit(): void {
    this.carregar();
  }

  setCaixa(c: CaixaEnvio): void {
    this.caixa.set(c);
    this.carregar();
  }

  carregar(): void {
    this.loading.set(true);
    this.error.set(null);
    const caixa = this.caixa();
    this.envios
      .list({
        caixa: caixa || undefined,
        per_page: 40,
        page: 1,
      })
      .subscribe({
        next: (res) => {
          this.items.set(res.data || []);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Não foi possível carregar os envios.');
          this.loading.set(false);
        },
      });
  }

  pacienteNome(e: DocumentSendItem): string {
    return e.person?.name || e.recipient_name || 'Paciente';
  }

  iniciais(nome: string): string {
    const parts = (nome || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase();
  }

  statusLabel(e: DocumentSendItem): string {
    if (e.status === 'pendente') return 'Pendente';
    if (e.status === 'assinado') return 'Assinado';
    if (e.status === 'expirado') return 'Expirado';
    if (e.status === 'cancelado') return 'Cancelado';
    return e.status || '—';
  }

  formatDate(iso?: string | null): string {
    if (!iso) return '—';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  }

  podeReenviar(e: DocumentSendItem): boolean {
    return e.status === 'pendente' || e.status === 'expirado';
  }

  reenviar(e: DocumentSendItem): void {
    if (!this.podeReenviar(e) || this.acaoId()) return;
    this.acaoId.set(e.id);
    this.envios.reenvio(e.id).subscribe({
      next: () => {
        this.acaoId.set(null);
        this.shell.toast('Lembrete/reenvio registrado');
        this.carregar();
      },
      error: (err) => {
        this.acaoId.set(null);
        this.shell.toast(err?.error?.message ?? 'Não foi possível reenviar');
      },
    });
  }

  cancelar(e: DocumentSendItem): void {
    if (e.status !== 'pendente') return;
    if (!window.confirm(`Cancelar envio de "${e.template_name || 'documento'}"?`)) return;
    this.acaoId.set(e.id);
    this.envios.cancel(e.id).subscribe({
      next: () => {
        this.acaoId.set(null);
        this.shell.toast('Envio cancelado');
        this.carregar();
      },
      error: (err) => {
        this.acaoId.set(null);
        this.shell.toast(err?.error?.message ?? 'Não foi possível cancelar');
      },
    });
  }

  abrirProtocolo(e: DocumentSendItem): void {
    if (e.form_submission_id) {
      void this.router.navigate(['/m/documentos', e.form_submission_id]);
      return;
    }
    void this.router.navigate(['/m/documentos']);
  }
}
