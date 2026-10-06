import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FormsModule],
  templateUrl: './esqueci-senha.component.html',
  styleUrl: './esqueci-senha.component.css',
})
export class EsqueciSenhaComponent {
  private auth = inject(AuthService);

  email = '';
  readonly enviado = signal(false);
  readonly carregando = signal(false);
  readonly erro = signal('');
  ano = new Date().getFullYear();

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
        const msg = err.error?.message ?? err.error?.errors?.email?.[0] ?? 'Ocorreu um erro. Tente novamente.';
        this.erro.set(typeof msg === 'string' ? msg : 'Ocorreu um erro. Tente novamente.');
      },
    });
  }
}
