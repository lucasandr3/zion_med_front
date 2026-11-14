import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';
import { NotificacoesService, type Notificacao } from '../core/services/notificacoes.service';
import {
  clearMobileBridge,
  preparePainelHop,
  setPreferPainelExperience,
} from '../core/utils/gestgo-experience.util';
import { MobileShellService } from './mobile-shell.service';

@Component({
  selector: 'app-layout-mobile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout-mobile.component.html',
  styleUrl: './layout-mobile.component.css',
})
export class LayoutMobileComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly shell = inject(MobileShellService);
  private readonly notifs = inject(NotificacoesService);

  readonly sheet = this.shell.sheet;
  readonly menuOpen = this.shell.menuOpen;
  readonly notificationsOpen = this.shell.notificationsOpen;
  readonly pendingCount = this.shell.pendingCount;
  readonly signedCount = this.shell.signedCount;
  readonly recentNotifs = signal<Notificacao[]>([]);
  readonly unreadNotifs = signal(0);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  readonly hideTabBar = computed(() => {
    const u = this.url();
    return (
      /\/m\/ferramentas\/.+/.test(u) ||
      /\/m\/documentos/.test(u) ||
      /\/m\/configuracoes/.test(u) ||
      /\/m\/pacientes\/\d+/.test(u)
    );
  });

  readonly tabs = [
    { path: '/m', label: 'Início', icon: 'home', exact: true },
    { path: '/m/pacientes', label: 'Pacientes', icon: 'group', exact: false },
    { path: '/m/fichas', label: 'Fichas', icon: 'description', exact: false },
    { path: '/m/ferramentas', label: 'Ferramentas', icon: 'handyman', exact: false },
  ] as const;

  readonly booting = this.shell.booting;

  ngOnInit(): void {
    setPreferPainelExperience(false);
    clearMobileBridge();
    this.shell.booting.set(true);
    this.shell.finishBoot(520);
    this.carregarNotificacoes();
  }

  get nomeUsuario(): string {
    return this.auth.getUser()?.name?.split(' ')[0] || 'Olá';
  }

  sair(): void {
    this.shell.closeMenu();
    setPreferPainelExperience(false);
    this.auth.logout().subscribe({
      next: () => void this.router.navigateByUrl('/m/login'),
      error: () => void this.router.navigateByUrl('/m/login'),
    });
  }

  fecharMenu(): void {
    this.shell.closeMenu();
  }

  notifTitle(n: Notificacao): string {
    const d = (n.data ?? {}) as Record<string, unknown>;
    return String(d['title'] ?? 'Notificação');
  }

  notifBody(n: Notificacao): string {
    const d = (n.data ?? {}) as Record<string, unknown>;
    return String(d['body'] ?? d['message'] ?? '');
  }

  abrirNotificacao(n: Notificacao): void {
    this.fecharMenu();
    if (!n.read_at) {
      this.notifs.marcarComoLida(n.id).subscribe({
        next: () => this.carregarNotificacoes(),
        error: () => {},
      });
    }
    const d = (n.data ?? {}) as Record<string, unknown>;
    if (d['submission_id']) {
      const hop = preparePainelHop(`/protocolos/${d['submission_id']}`, '/m');
      void this.router.navigate([hop.path], { queryParams: hop.queryParams });
      return;
    }
    void this.router.navigate(['/m/documentos']);
  }

  private carregarNotificacoes(): void {
    this.notifs.list().subscribe({
      next: (list) => {
        const items = list || [];
        this.recentNotifs.set(items.slice(0, 5));
        this.unreadNotifs.set(items.filter((n) => !n.read_at).length);
      },
      error: () => {
        this.recentNotifs.set([]);
        this.unreadNotifs.set(0);
      },
    });
  }
}
