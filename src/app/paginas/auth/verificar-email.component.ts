import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-verificar-email',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './verificar-email.component.html',
  styleUrl: './verificar-email.component.css',
})
export class VerificarEmailComponent implements OnInit {
  private auth = inject(AuthService);
  private route = inject(ActivatedRoute);

  sucesso = false;
  carregando = true;
  mensagem = '';
  ano = new Date().getFullYear();

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    const hash = this.route.snapshot.queryParamMap.get('hash');
    const expires = this.route.snapshot.queryParamMap.get('expires');
    const signature = this.route.snapshot.queryParamMap.get('signature');

    if (!id || !hash || !expires || !signature) {
      this.carregando = false;
      this.mensagem = 'Link inválido. Parâmetros ausentes.';
      return;
    }

    // Usar a query string exata da URL para preservar a ordem dos params (assinatura do Laravel exige a mesma ordem).
    const queryString = typeof window !== 'undefined' ? window.location.search : '';
    const call = queryString ? this.auth.verifyEmailWithQueryString(queryString) : this.auth.verifyEmail({ id, hash, expires, signature });

    call.subscribe({
      next: (res) => {
        this.carregando = false;
        this.sucesso = true;
        this.mensagem = res.data?.message ?? 'E-mail verificado com sucesso.';
      },
      error: (err) => {
        this.carregando = false;
        this.mensagem = err.error?.message ?? 'Link inválido ou expirado.';
      },
    });
  }
}
