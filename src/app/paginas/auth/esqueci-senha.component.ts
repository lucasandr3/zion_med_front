import {
  Component,
  Inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import {
  GESTGO_APPEARANCE_MODE_LS,
  GESTGO_DARK_LS,
  GESTGO_LOGIN_DARK_CHOICE_SS,
  syncThemeChrome,
} from '../../core/services/user-appearance.sync';
import { GestgoBrandMarkComponent } from '../../shared/components/gestgo-brand-mark/gestgo-brand-mark.component';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterLink, GestgoBrandMarkComponent],
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['../login/login.component.css', './esqueci-senha.component.css'],
})
export class EsqueciSenhaComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  readonly enviado = signal(false);
  readonly carregando = signal(false);
  readonly erro = signal('');
  readonly iconeTema = signal('dark_mode');
  ano = new Date().getFullYear();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.atualizarIconeTema();
    }
  }

  onEmailInput(ev: Event): void {
    const el = ev.target as HTMLElement & { value?: string };
    this.email = el.value ?? '';
  }

  alternarTema(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const dark = !document.body.classList.contains('dark');
    document.body.classList.toggle('dark', dark);
    try {
      localStorage.setItem(GESTGO_DARK_LS, dark ? '1' : '0');
      localStorage.removeItem(GESTGO_APPEARANCE_MODE_LS);
      sessionStorage.setItem(GESTGO_LOGIN_DARK_CHOICE_SS, dark ? '1' : '0');
    } catch {}
    syncThemeChrome();
    this.atualizarIconeTema();
  }

  private atualizarIconeTema(): void {
    this.iconeTema.set(
      document.body.classList.contains('dark') ? 'light_mode' : 'dark_mode',
    );
  }

  voltarAoLogin(): void {
    void this.router.navigate(['/autenticacao']);
  }

  enviar(): void {
    this.erro.set('');
    if (!this.email.trim()) return;
    this.carregando.set(true);
    this.auth.forgotPassword(this.email.trim()).subscribe({
      next: () => {
        this.carregando.set(false);
        this.enviado.set(true);
      },
      error: (err) => {
        this.carregando.set(false);
        const msg =
          err.error?.message ??
          err.error?.errors?.email?.[0] ??
          'Ocorreu um erro. Tente novamente.';
        this.erro.set(typeof msg === 'string' ? msg : 'Ocorreu um erro. Tente novamente.');
      },
    });
  }
}
