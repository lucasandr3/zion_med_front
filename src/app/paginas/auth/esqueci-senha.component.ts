import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './esqueci-senha.component.html',
  styleUrl: './esqueci-senha.component.css',
})
export class EsqueciSenhaComponent {
  private auth = inject(AuthService);

  email = '';
  enviado = false;
  carregando = false;
  erro = '';
  ano = new Date().getFullYear();

  enviar(): void {
    this.erro = '';
    if (!this.email.trim()) return;
    this.carregando = true;
    this.auth.forgotPassword(this.email.trim()).subscribe({
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
