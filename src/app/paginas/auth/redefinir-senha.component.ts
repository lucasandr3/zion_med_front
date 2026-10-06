import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-redefinir-senha',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FormsModule],
  templateUrl: './redefinir-senha.component.html',
  styleUrl: './redefinir-senha.component.css',
})
export class RedefinirSenhaComponent implements OnInit {
  private auth = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  token = '';
  email = '';
  senha = '';
  senhaConfirmacao = '';
  readonly mostrarSenha = signal(false);
  readonly sucesso = signal(false);
  readonly carregando = signal(false);
  readonly erro = signal('');
  ano = new Date().getFullYear();

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      let meta = document.querySelector('meta[name="referrer"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'referrer');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', 'no-referrer');
    }
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '';
  }

  enviar(): void {
    this.erro.set('');
    if (!this.token || !this.email) {
      this.erro.set('Link inválido. Use o link que enviamos por e-mail.');
      return;
    }
    if (this.senha.length < 8) {
      this.erro.set('A senha deve ter no mínimo 8 caracteres.');
      return;
    }
    if (this.senha !== this.senhaConfirmacao) {
      this.erro.set('As senhas não coincidem.');
      return;
    }
    this.carregando.set(true);
    this.auth
      .resetPassword({
        token: this.token,
        email: this.email,
        password: this.senha,
        password_confirmation: this.senhaConfirmacao,
      })
      .subscribe({
        next: () => {
          this.carregando.set(false);
          this.sucesso.set(true);
        },
        error: (err) => {
          this.carregando.set(false);
          const msg = err.error?.message ?? err.error?.errors?.email?.[0] ?? 'Link inválido ou expirado. Tente solicitar um novo.';
          this.erro.set(typeof msg === 'string' ? msg : 'Link inválido ou expirado.');
        },
      });
  }

  irParaLogin(): void {
    this.router.navigate(['/autenticacao']);
  }
}
