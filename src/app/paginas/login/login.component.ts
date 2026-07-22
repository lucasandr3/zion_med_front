import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-pagina-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  mostrarSenha = false;
  estadoCarregando = false;
  estadoErro = false;
  mensagemErro = '';
  ano = new Date().getFullYear();

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false],
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('gestgo_login_email');
      if (saved) {
        this.form.patchValue({ email: saved, remember: true });
      }
    }
  }

  private salvarEmailLogin(email: string): void {
    if (!isPlatformBrowser(this.platformId) || !email) {
      return;
    }
    localStorage.setItem('gestgo_login_email', email);
  }

  enviar(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.estadoCarregando) {
      return;
    }

    this.estadoErro = false;
    this.mensagemErro = '';
    this.estadoCarregando = true;

    const { email, password } = this.form.getRawValue();

    this.auth.login(email, password).subscribe({
      next: (res) => {
        this.estadoCarregando = false;
        this.salvarEmailLogin(email);
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
        const msg =
          err.error?.message ?? err.error?.errors?.email?.[0] ?? 'Credenciais inválidas. Tente novamente.';
        this.mensagemErro = typeof msg === 'string' ? msg : 'Credenciais inválidas. Tente novamente.';
      },
    });
  }
}
