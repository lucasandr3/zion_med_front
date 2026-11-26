import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AgendaAppointment, AgendaService } from '../core/services/agenda.service';
import { AuthService } from '../core/services/auth.service';
import { DashboardService } from '../core/services/dashboard.service';
import { ProtocolosService, type Protocolo } from '../core/services/protocolos.service';
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
  private readonly agenda = inject(AgendaService);
  private readonly shell = inject(MobileShellService);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly total = signal(0);
  readonly pendentes = signal(0);
  readonly assinados = signal(0);
  readonly pendingItems = signal<Protocolo[]>([]);
  readonly hojeCompromissos = signal<AgendaAppointment[]>([]);

  readonly hojeCount = computed(
    () => this.hojeCompromissos().filter((a) => a.status !== 'cancelled').length,
  );

  readonly proximoHoje = computed(() => {
    const ativos = this.hojeCompromissos()
      .filter((a) => a.status !== 'cancelled')
      .sort((a, b) => a.starts_at.localeCompare(b.starts_at));
    return ativos[0] ?? null;
  });

  get nome(): string {
    const first = this.auth.getUser()?.name?.split(/\s+/)[0]?.trim();
    if (!first) return 'olá';
    return first.charAt(0).toUpperCase() + first.slice(1);
  }

  get iniciaisUsuario(): string {
    return this.iniciais(this.auth.getUser()?.name || this.nome);
  }

  get saudacao(): string {
    const h = new Date().getHours();
    if (h < 6) return 'Boa madrugada';
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  get dataHoje(): string {
    const now = new Date();
    const weekday = now
      .toLocaleDateString('pt-BR', { weekday: 'long' })
      .replace(/^\w/, (c) => c.toUpperCase());
    const day = now.getDate();
    const month = now
      .toLocaleDateString('pt-BR', { month: 'short' })
      .replace('.', '')
      .replace(/^\w/, (c) => c.toUpperCase());
    return `${weekday}, ${day} de ${month}.`.toUpperCase();
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
    const hoje = this.dateKey(new Date());
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
      agenda: this.agenda.listAppointments(hoje, hoje).pipe(catchError(() => of([] as AgendaAppointment[]))),
    }).subscribe({
      next: ({ dash, pending, approved, agenda }) => {
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
        this.hojeCompromissos.set(agenda || []);
        this.shell.setDocCounts(pend, ok);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar o resumo.');
        this.loading.set(false);
      },
    });
  }

  horaCurta(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  private dateKey(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
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
    void this.router.navigate(['/m/documentos', id]);
  }
}
