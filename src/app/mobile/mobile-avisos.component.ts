import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NotificacoesService, type Notificacao } from '../core/services/notificacoes.service';
import { MobileShellService } from './mobile-shell.service';

@Component({
  selector: 'app-mobile-avisos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './mobile-avisos.component.html',
  styleUrls: ['./mobile-shared.css', './mobile-avisos.component.css'],
})
export class MobileAvisosComponent implements OnInit {
  private readonly notifs = inject(NotificacoesService);
  private readonly shell = inject(MobileShellService);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly items = signal<Notificacao[]>([]);
  readonly acting = signal(false);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.loading.set(true);
    this.error.set(null);
    this.notifs.list().subscribe({
      next: (list) => {
        this.items.set(list || []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar as notificações.');
        this.loading.set(false);
      },
    });
  }

  unreadCount(): number {
    return this.items().filter((n) => !n.read_at).length;
  }

  title(n: Notificacao): string {
    const d = (n.data ?? {}) as Record<string, unknown>;
    return String(d['title'] ?? 'Notificação');
  }

  body(n: Notificacao): string {
    const d = (n.data ?? {}) as Record<string, unknown>;
    return String(d['body'] ?? d['message'] ?? '');
  }

  formatDate(iso?: string | null): string {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  abrir(n: Notificacao): void {
    if (!n.read_at) {
      this.notifs.marcarComoLida(n.id).subscribe({
        next: () => this.carregar(),
        error: () => {},
      });
    }
    const d = (n.data ?? {}) as Record<string, unknown>;
    if (d['submission_id']) {
      void this.router.navigate(['/m/documentos', d['submission_id']]);
      return;
    }
    void this.router.navigate(['/m/documentos']);
  }

  marcarTodas(): void {
    this.acting.set(true);
    this.notifs.marcarTodasComoLidas().subscribe({
      next: () => {
        this.acting.set(false);
        this.shell.toast('Todas marcadas como lidas');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.shell.toast('Não foi possível marcar');
      },
    });
  }
}
