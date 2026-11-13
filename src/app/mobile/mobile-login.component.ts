import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { setPreferPainelExperience } from '../core/utils/gestgo-experience.util';
import { GestgoBrandMarkComponent } from '../shared/components/gestgo-brand-mark/gestgo-brand-mark.component';

const REMEMBER_EMAIL_KEY = 'gestgo_login_email';
const KEEP_CONNECTED_KEY = 'gestgo_mobile_keep_connected';

@Component({
  selector: 'app-mobile-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink, GestgoBrandMarkComponent],
  templateUrl: './mobile-login.component.html',
  styleUrls: ['./mobile-shared.css', './mobile-login.component.css'],
})
export class MobileLoginComponent implements OnInit {
  email = '';
  senha = '';
  manterConectado = true;
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly bootDone = signal(false);
  readonly mostrarSenha = signal(false);

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    setPreferPainelExperience(false);
    if (isPlatformBrowser(this.platformId)) {
      const keep = localStorage.getItem(KEEP_CONNECTED_KEY);
      this.manterConectado = keep !== '0';
      const saved = localStorage.getItem(REMEMBER_EMAIL_KEY);
      if (saved && this.manterConectado) this.email = saved;
    }
    setTimeout(() => this.bootDone.set(true), 700);

    if (this.auth.isAuthenticated() && this.auth.getUser()) {
      void this.router.navigateByUrl('/m');
    }
  }

  toggleSenha(): void {
    this.mostrarSenha.update((v) => !v);
  }

  entrarBiometria(): void {
    this.error.set(
      'Biometria estará disponível neste dispositivo após o primeiro acesso e ativação nas configurações.',
    );
  }

  enviar(): void {
    this.error.set(null);
    this.loading.set(true);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(KEEP_CONNECTED_KEY, this.manterConectado ? '1' : '0');
      if (this.manterConectado && this.email) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, this.email);
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }
    }
    this.auth.login(this.email, this.senha).subscribe({
      next: (res) => {
        this.loading.set(false);
        setPreferPainelExperience(false);
        const isPlatformAdmin = res.data.user?.role === 'platform_admin';
        if (isPlatformAdmin) {
          void this.router.navigateByUrl('/plataforma');
          return;
        }
        const hasOrg =
          res.data.current_organization_id != null || res.data.current_clinic_id != null;
        if (!hasOrg) {
          void this.router.navigateByUrl('/clinica/escolher');
          return;
        }
        void this.router.navigateByUrl('/m');
      },
      error: (err) => {
        this.loading.set(false);
        const msg =
          err.error?.message ??
          err.error?.errors?.email?.[0] ??
          'Credenciais inválidas. Tente novamente.';
        this.error.set(typeof msg === 'string' ? msg : 'Credenciais inválidas. Tente novamente.');
      },
    });
  }
}
