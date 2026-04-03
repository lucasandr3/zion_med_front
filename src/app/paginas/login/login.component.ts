import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { TooltipDirective } from '../../core/directives/tooltip.directive';

@Component({
  selector: 'app-pagina-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TooltipDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email = '';
  senha = '';
  lembrar = false;
  mostrarSenha = false;
  estadoCarregando = false;
  estadoErro = false;
  mensagemErro = '';
  ano = new Date().getFullYear();
  iconeTema = 'dark_mode';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('gestgo_login_email');
      if (saved) this.email = saved;
      this.atualizarIconeTema();
    }
  }

  alternarTema(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle('dark');
      localStorage.setItem('gestgo_dark_mode', document.body.classList.contains('dark') ? '1' : '0');
      this.atualizarIconeTema();
    }
  }

  private atualizarIconeTema(): void {
    this.iconeTema = document.body.classList.contains('dark') ? 'light_mode' : 'dark_mode';
  }

  enviar(): void {
    this.estadoErro = false;
    this.mensagemErro = '';
    this.estadoCarregando = true;
    if (isPlatformBrowser(this.platformId) && this.email) {
      localStorage.setItem('gestgo_login_email', this.email);
    }
    this.auth.login(this.email, this.senha).subscribe({
      next: (res) => {
        this.estadoCarregando = false;
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
        this.estadoCarregando = false;
        this.estadoErro = true;
        const msg = err.error?.message ?? err.error?.errors?.email?.[0] ?? 'Credenciais inválidas. Tente novamente.';
        this.mensagemErro = typeof msg === 'string' ? msg : 'Credenciais inválidas. Tente novamente.';
      },
    });
  }
}
