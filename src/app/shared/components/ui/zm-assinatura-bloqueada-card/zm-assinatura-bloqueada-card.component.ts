import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'zm-assinatura-bloqueada-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './zm-assinatura-bloqueada-card.component.html',
  styleUrl: './zm-assinatura-bloqueada-card.component.scss',
})
export class ZmAssinaturaBloqueadaCardComponent {
  private auth = inject(AuthService);

  /** Título principal do aviso. */
  @Input() titulo = 'Acesso limitado até regularizar a cobrança';

  /** Texto explicativo (assinatura pendente / conta bloqueada). */
  @Input() descricao =
    'Com assinatura pendente ou conta bloqueada por pagamento, este conteúdo não fica disponível. Após a confirmação do pagamento, o acesso é restabelecido.';

  /** `compact` para faixa no layout; `default` para bloco em página. */
  @Input() variant: 'default' | 'compact' = 'default';

  /** Se false, não mostra o botão “Ir para assinatura” (ex.: já estamos em /assinatura). */
  @Input() permitirIrAssinatura = true;

  temPermissaoAssinatura(): boolean {
    return this.auth.hasPermission('billing.manage');
  }
}
