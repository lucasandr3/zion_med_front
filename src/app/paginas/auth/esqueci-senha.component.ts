import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './esqueci-senha.component.html',
  styleUrl: './esqueci-senha.component.css',
})
export class EsqueciSenhaComponent {
  private readonly auth = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  enviado = false;
  carregando = false;
  erro = '';
  ano = new Date().getFullYear();

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  enviar(): void {
    this.form.markAllAsTouched();
    this.erro = '';
    if (this.form.invalid || this.carregando) {
      return;
    }

    this.carregando = true;
    const email = this.form.controls.email.value.trim();
    this.auth.forgotPassword(email).subscribe({
      next: () => {
        this.carregando = false;
        this.enviado = true;
      },
      error: (err) => {
        this.carregando = false;
        const msg = err.error?.message ?? err.error?.errors?.email?.[0] ?? 'Ocorreu um erro. Tente novamente.';
        this.erro = typeof msg === 'string' ? msg : 'Ocorreu um erro. Tente novamente.';
      },
    });
  }
}
