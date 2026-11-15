import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';
import { DashboardService } from '../core/services/dashboard.service';
import { ProtocolosService, type Protocolo } from '../core/services/protocolos.service';
import { preparePainelHop } from '../core/utils/gestgo-experience.util';
import { MobileShellService } from './mobile-shell.service';

@Component({
  selector: 'app-mobile-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './mobile-home.component.html',
  styleUrls: ['./mobile-shared.css', './mobile-home.component.css'],
})
export class MobileHomeComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly dashboard = inject(DashboardService);
  private readonly protocolos = inject(ProtocolosService);
  private readonly shell = inject(MobileShellService);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly total = signal(0);
  readonly pendentes = signal(0);
  readonly assinados = signal(0);
  readonly pendingItems = signal<Protocolo[]>([]);

  get nome(): string {
    return this.auth.getUser()?.name?.split(/\s+/)[0] || 'olá';
  }

  ngOnInit(): void {
    this.carregar();
  }

  abrirNotificacoes(): void {
    this.shell.openNotifications();
  }

  abrirMenu(): void {
    this.shell.openMenu();
  }

  carregar(): void {
    this.loading.set(true);
    this.error.set(null);
    forkJoin({
      dash: this.dashboard.getDashboard().pipe(catchError(() => of(null))),
      pending: this.protocolos.list({ status: 'pending', per_page: 5, page: 1 }).pipe(
        catchError(() =>
          of({
            data: [] as Protocolo[],
            meta: { current_page: 1, last_page: 1, per_page: 5, total: 0 },
          }),
        ),
      ),
      approved: this.protocolos.list({ status: 'approved', per_page: 1, page: 1 }).pipe(
        catchError(() =>
          of({
            data: [] as Protocolo[],
            meta: { current_page: 1, last_page: 1, per_page: 1, total: 0 },
          }),
        ),
      ),
    }).subscribe({
      next: ({ dash, pending, approved }) => {
        const porStatus = dash?.por_status || {};
        const pend = Number(porStatus['pending'] ?? pending.meta.total ?? pending.data.length) || 0;
        const ok = Number(porStatus['approved'] ?? approved.meta.total ?? 0) || 0;
        const totalDocs =
          Number(dash?.ultimos_30_dias ?? 0) ||
          Object.values(porStatus).reduce((a, b) => a + Number(b || 0), 0) ||
          pend + ok;
        this.total.set(totalDocs);
        this.pendentes.set(pend);
        this.assinados.set(ok);
        this.pendingItems.set(pending.data || []);
        this.shell.setDocCounts(pend, ok);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar o resumo.');
        this.loading.set(false);
      },
    });
  }

  iniciais(nome: string): string {
    const parts = (nome || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase();
  }

  pacienteNome(p: Protocolo): string {
    return p.person?.name || p.submitter_name || 'Paciente';
  }

  pad(n: number): string {
    return String(Math.max(0, n)).padStart(2, '0');
  }

  abrirDocumento(id: number): void {
    const hop = preparePainelHop(`/protocolos/${id}`, '/m');
    void this.router.navigate([hop.path], { queryParams: hop.queryParams });
  }
}
