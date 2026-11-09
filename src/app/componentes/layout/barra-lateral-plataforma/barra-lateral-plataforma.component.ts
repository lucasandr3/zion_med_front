import {
  Component,
  Input,
  OnInit,
  inject,
  ChangeDetectionStrategy,
  signal,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';
import { ShellSidebarCollapseService } from '../../../core/services/shell-sidebar-collapse.service';

import { GestgoBadgeComponent } from '@/shared/components/badge/badge.component';

import { GestgoAvatarComponent } from '@/shared/components/avatar/avatar.component';
import { GestgoBrandMarkComponent } from '@/shared/components/gestgo-brand-mark/gestgo-brand-mark.component';
import {
  SHELL_NAV_PLATAFORMA_SIDEBAR,
  ShellNavItem,
  shellNavItemActive,
} from '../shell-nav.config';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-barra-lateral-plataforma',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    GestgoBadgeComponent,
    GestgoAvatarComponent,
    GestgoBrandMarkComponent,
  ],
  templateUrl: './barra-lateral-plataforma.component.html',
  styleUrl: './barra-lateral-plataforma.component.css',
})
export class BarraLateralPlataformaComponent implements OnInit {
  @Input() notificacoesNaoLidas = 0;

  readonly navSections = SHELL_NAV_PLATAFORMA_SIDEBAR;

  private readonly nomeUsuarioSignal = signal('Usuário');
  private readonly iniciaisUsuarioSignal = signal('U');
  private readonly emailUsuarioSignal = signal('');

  readonly nomeUsuario = this.nomeUsuarioSignal.asReadonly();
  readonly iniciaisUsuario = this.iniciaisUsuarioSignal.asReadonly();
  readonly emailUsuario = this.emailUsuarioSignal.asReadonly();

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly sidebarMobile = inject(SidebarMobileService);
  private readonly sidebarCollapse = inject(ShellSidebarCollapseService);

  readonly sidebarOpenMobile = this.sidebarMobile.isOpen;
  readonly sidebarColapsada = this.sidebarCollapse.collapsed;

  ngOnInit(): void {
    this.sidebarCollapse.ensureHydrated();
    this.atualizarDados();
  }

  fecharSidebarMobile(): void {
    this.sidebarMobile.setOpen(false);
  }

  sair(): void {
    this.auth.logout().subscribe(() => this.router.navigate(['/autenticacao']));
  }

  tooltipQuandoColapsada(texto: string): string {
    return this.sidebarColapsada() ? texto : '';
  }

  navItemAtivo(item: ShellNavItem): boolean {
    return shellNavItemActive(item, this.router.url);
  }

  private atualizarDados(): void {
    const u = this.auth.getUser();
    if (u) {
      const nome = u.name || 'Usuário';
      this.nomeUsuarioSignal.set(nome);
      this.emailUsuarioSignal.set(u.email || '');
      this.iniciaisUsuarioSignal.set(nome.slice(0, 2).toUpperCase() || 'U');
    }
  }
}
