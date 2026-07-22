import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-verificacao-pendente',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './verificacao-pendente.component.html',
  styleUrl: './verificacao-pendente.component.css',
})
export class VerificacaoPendenteComponent {
  private auth = inject(AuthService);

  enviado = false;
  carregando = false;
  erro = '';
  ano = new Date().getFullYear();

  reenviar(): void {
    this.erro = '';
    this.carregando = true;
    this.auth.sendVerificationEmail().subscribe({
      next: () => {
        this.carregando = false;
        this.enviado = true;
      },
      error: (err) => {
        this.carregando = false;
        this.erro = err.error?.message ?? 'Não foi possível reenviar. Tente novamente.';
      },
    });
  }
}
