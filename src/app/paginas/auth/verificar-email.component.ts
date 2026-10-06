import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-verificar-email',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './verificar-email.component.html',
  styleUrl: './verificar-email.component.css',
})
export class VerificarEmailComponent implements OnInit {
  private auth = inject(AuthService);
  private route = inject(ActivatedRoute);

  readonly sucesso = signal(false);
  readonly carregando = signal(true);
  readonly mensagem = signal('');
  ano = new Date().getFullYear();

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    const hash = this.route.snapshot.queryParamMap.get('hash');
    const expires = this.route.snapshot.queryParamMap.get('expires');
    const signature = this.route.snapshot.queryParamMap.get('signature');

    if (!id || !hash || !expires || !signature) {
      this.carregando.set(false);
      this.mensagem.set('Link inválido. Parâmetros ausentes.');
      return;
    }

    // Usar a query string exata da URL para preservar a ordem dos params (assinatura do Laravel exige a mesma ordem).
    const queryString = typeof window !== 'undefined' ? window.location.search : '';
    const call = queryString ? this.auth.verifyEmailWithQueryString(queryString) : this.auth.verifyEmail({ id, hash, expires, signature });

    call.subscribe({
      next: (res) => {
        this.carregando.set(false);
        this.sucesso.set(true);
        this.mensagem.set(res.data?.message ?? 'E-mail verificado com sucesso.');
      },
      error: (err) => {
        this.carregando.set(false);
        this.mensagem.set(err.error?.message ?? 'Link inválido ou expirado.');
      },
    });
  }
}
