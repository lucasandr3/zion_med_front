import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { resolveSidebarLogoSrc } from '../../core/utils/sidebar-logo.util';

@Component({
  selector: 'app-verificacao-pendente',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './verificacao-pendente.component.html',
  styleUrl: './verificacao-pendente.component.css',
})
export class VerificacaoPendenteComponent {
  private auth = inject(AuthService);

  readonly enviado = signal(false);
  readonly carregando = signal(false);
  readonly erro = signal('');
  ano = new Date().getFullYear();
  readonly logoSrc = resolveSidebarLogoSrc();

  reenviar(): void {
    this.erro.set('');
    this.carregando.set(true);
    this.auth.sendVerificationEmail().subscribe({
      next: () => {
        this.carregando.set(false);
        this.enviado.set(true);
      },
      error: (err) => {
        this.carregando.set(false);
        this.erro.set(err.error?.message ?? 'Não foi possível reenviar. Tente novamente.');
      },
    });
  }
}
