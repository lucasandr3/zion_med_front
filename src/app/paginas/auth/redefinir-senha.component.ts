import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-redefinir-senha',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
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
  mostrarSenha = false;
  sucesso = false;
  carregando = false;
  erro = '';
  ano = new Date().getFullYear();

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '';
  }

  enviar(): void {
    this.erro = '';
    if (!this.token || !this.email) {
      this.erro = 'Link inválido. Use o link que enviamos por e-mail.';
      return;
    }
    if (this.senha.length < 8) {
      this.erro = 'A senha deve ter no mínimo 8 caracteres.';
      return;
    }
    if (this.senha !== this.senhaConfirmacao) {
      this.erro = 'As senhas não coincidem.';
      return;
    }
    this.carregando = true;
    this.auth
      .resetPassword({
        token: this.token,
        email: this.email,
        password: this.senha,
        password_confirmation: this.senhaConfirmacao,
      })
      .subscribe({
        next: () => {
          this.carregando = false;
          this.sucesso = true;
        },
        error: (err) => {
          this.carregando = false;
          const msg = err.error?.message ?? err.error?.errors?.email?.[0] ?? 'Link inválido ou expirado. Tente solicitar um novo.';
          this.erro = typeof msg === 'string' ? msg : 'Link inválido ou expirado.';
        },
      });
  }

  irParaLogin(): void {
    this.router.navigate(['/autenticacao']);
  }
}
