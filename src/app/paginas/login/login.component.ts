import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectionStrategy, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UserAppearanceService } from '../../core/services/user-appearance.service';
import {
  GESTGO_APPEARANCE_MODE_LS,
  GESTGO_DARK_LS,
  GESTGO_LOGIN_DARK_CHOICE_SS,
  applyUserAppearanceToBrowser,
  syncThemeChrome,
} from '../../core/services/user-appearance.sync';
import { GestgoBrandMarkComponent } from '../../shared/components/gestgo-brand-mark/gestgo-brand-mark.component';

@Component({
  selector: 'app-pagina-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterLink, FormsModule, GestgoBrandMarkComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email = '';
  senha = '';
  lembrar = false;
  readonly estadoCarregando = signal(false);
  readonly estadoErro = signal(false);
  readonly mensagemErro = signal('');
  ano = new Date().getFullYear();
  readonly iconeTema = signal('dark_mode');

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router,
    private auth: AuthService,
    private appearance: UserAppearanceService,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('gestgo_login_email');
      if (saved) this.email = saved;
      this.atualizarIconeTema();
    }
  }

  onEmailInput(ev: Event): void {
    const el = ev.target as HTMLElement & { value?: string };
    this.email = el.value ?? '';
  }

  onSenhaInput(ev: Event): void {
    const el = ev.target as HTMLElement & { value?: string };
    this.senha = el.value ?? '';
  }

  onLembrarChange(ev: Event): void {
    const el = ev.target as HTMLElement & { checked?: boolean };
    this.lembrar = !!el.checked;
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

  /** Persiste na conta o modo escolhido no login (a flag em session impede /me de reverter). */
  private sincronizarModoLoginComConta(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    let choice: string | null = null;
    try {
      choice = sessionStorage.getItem(GESTGO_LOGIN_DARK_CHOICE_SS);
    } catch {
      return;
    }
    if (choice !== '0' && choice !== '1') return;

    const dark = choice === '1';
    applyUserAppearanceToBrowser({ ui_dark_mode: dark });
    this.auth.notifyAppearanceApplied();
    this.appearance.patchAppearance({ ui_dark_mode: dark }).subscribe({
      next: () => {
        try {
          sessionStorage.removeItem(GESTGO_LOGIN_DARK_CHOICE_SS);
        } catch {}
      },
      error: () => {},
    });
  }

  enviar(): void {
    this.estadoErro.set(false);
    this.mensagemErro.set('');
    this.estadoCarregando.set(true);
    if (isPlatformBrowser(this.platformId) && this.email) {
      localStorage.setItem('gestgo_login_email', this.email);
    }
    this.auth.login(this.email, this.senha).subscribe({
      next: (res) => {
        this.estadoCarregando.set(false);
        this.sincronizarModoLoginComConta();
        const isPlatformAdmin = res.data.user?.role === 'platform_admin';
        if (isPlatformAdmin) {
          this.router.navigate(['/plataforma']);
          return;
        }
        const hasOrg = res.data.current_organization_id != null || res.data.current_clinic_id != null;
        if (hasOrg) {
          void this.router.navigateByUrl(this.auth.getDefaultTenantPath());
        } else {
          this.router.navigate(['/clinica/escolher']);
        }
      },
      error: (err) => {
        this.estadoCarregando.set(false);
        this.estadoErro.set(true);
        const msg = err.error?.message ?? err.error?.errors?.email?.[0] ?? 'Credenciais inválidas. Tente novamente.';
        this.mensagemErro.set(typeof msg === 'string' ? msg : 'Credenciais inválidas. Tente novamente.');
      },
    });
  }
}
