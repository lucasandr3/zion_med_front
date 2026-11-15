import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { PushNotificationsService } from '../core/services/push-notifications.service';
import { UserAppearanceService } from '../core/services/user-appearance.service';
import {
  normalizeThemeKey,
  syncThemeChrome,
} from '../core/services/user-appearance.sync';
import { setPreferPainelExperience } from '../core/utils/gestgo-experience.util';
import { temasOrdemGrade, TEMAS, type ShellTema } from '../componentes/layout/shell-theme.config';

@Component({
  selector: 'app-mobile-configuracoes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './mobile-configuracoes.component.html',
  styleUrls: ['./mobile-shared.css', './mobile-configuracoes.component.css'],
})
export class MobileConfiguracoesComponent implements OnInit {
  private readonly appearance = inject(UserAppearanceService);
  private readonly auth = inject(AuthService);
  private readonly push = inject(PushNotificationsService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly temas = temasOrdemGrade();
  readonly temaAtual = signal('ocean-blue');
  readonly modoEscuro = signal(false);
  readonly saindo = signal(false);
  readonly pushSupported = this.push.supported;
  readonly pushSubscribed = this.push.subscribed;
  readonly pushBusy = this.push.busy;
  readonly pushError = this.push.lastError;
  readonly pushPermission = this.push.permission;

  get nomeUsuario(): string {
    return this.auth.getUser()?.name || 'Conta Gestgo';
  }

  get emailUsuario(): string {
    return this.auth.getUser()?.email || '';
  }

  ngOnInit(): void {
    this.syncFromBrowser();
    this.push.refreshStatus().subscribe(() => this.cdr.markForCheck());
  }

  get temaMeta(): ShellTema | undefined {
    return TEMAS.find((t) => t.key === this.temaAtual());
  }

  aplicarTema(key: string): void {
    const canonical = normalizeThemeKey(key);
    Array.from(document.body.classList)
      .filter((c) => c.startsWith('theme-'))
      .forEach((c) => document.body.classList.remove(c));
    document.body.classList.add('theme-' + canonical);
    this.temaAtual.set(canonical);
    try {
      localStorage.setItem('gestgo_theme', canonical);
    } catch {
      /* ignore */
    }
    syncThemeChrome();
    if (this.auth.isAuthenticated()) {
      this.appearance.patchAppearance({ ui_theme: canonical }).subscribe({ error: () => {} });
    }
    this.auth.notifyAppearanceApplied();
    this.cdr.markForCheck();
  }

  aplicarModoEscuro(escuro: boolean): void {
    this.modoEscuro.set(escuro);
    document.body.classList.toggle('dark', escuro);
    try {
      localStorage.setItem('gestgo_dark_mode', escuro ? '1' : '0');
    } catch {
      /* ignore */
    }
    syncThemeChrome();
    if (this.auth.isAuthenticated()) {
      this.appearance.patchAppearance({ ui_dark_mode: escuro }).subscribe({ error: () => {} });
    }
    this.cdr.markForCheck();
  }

  togglePush(): void {
    const obs = this.pushSubscribed() ? this.push.disable() : this.push.enable();
    obs.subscribe(() => this.cdr.markForCheck());
  }

  sair(): void {
    this.saindo.set(true);
    setPreferPainelExperience(false);
    this.auth.logout().subscribe({
      next: () => void this.router.navigateByUrl('/m/login'),
      error: () => void this.router.navigateByUrl('/m/login'),
    });
  }

  private syncFromBrowser(): void {
    try {
      const saved = localStorage.getItem('gestgo_theme');
      if (saved) {
        this.temaAtual.set(normalizeThemeKey(saved));
      } else {
        const m = document.body.className.match(/theme-([a-z-]+)/);
        if (m?.[1]) this.temaAtual.set(normalizeThemeKey(m[1]));
      }
      this.modoEscuro.set(
        document.body.classList.contains('dark') || localStorage.getItem('gestgo_dark_mode') === '1',
      );
    } catch {
      /* ignore */
    }
  }
}
