import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

/**
 * Rodapé da sidebar Nord — botão “Sair”, igual ao pesquisa_app.
 * O menu da conta fica no `nord-top-bar` (avatar + dropdown).
 */
@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-shell-nav-user-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shell-nav-user-menu.component.html',
  styleUrl: './shell-nav-user-menu.component.css',
})
export class ShellNavUserMenuComponent {
  /** Mantido por compatibilidade com os layouts. */
  @Input() shellContext: 'app' | 'plataforma' = 'app';

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  sair(): void {
    this.auth.logout().subscribe(() => this.router.navigate(['/autenticacao']));
  }
}
