import {
  Component,
  Input,
  OnInit,
  inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  effect,
  signal,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { resolveSidebarLogoSrc } from '../../../core/utils/sidebar-logo.util';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';
import { ShellSidebarCollapseService } from '../../../core/services/shell-sidebar-collapse.service';

import { GestgoBadgeComponent } from '@/shared/components/badge/badge.component';

import { GestgoAvatarComponent } from '@/shared/components/avatar/avatar.component';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-barra-lateral-plataforma',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    GestgoBadgeComponent,
    GestgoAvatarComponent],
  templateUrl: './barra-lateral-plataforma.component.html',
  styleUrl: './barra-lateral-plataforma.component.css',
})
export class BarraLateralPlataformaComponent implements OnInit {
  @Input() notificacoesNaoLidas = 0;

  private readonly nomeUsuarioSignal = signal('Usuário');
  private readonly iniciaisUsuarioSignal = signal('U');
  private readonly emailUsuarioSignal = signal('');
  private readonly sidebarLogoSrcSignal = signal('/assets/logo/logo.png');

  readonly nomeUsuario = this.nomeUsuarioSignal.asReadonly();
  readonly iniciaisUsuario = this.iniciaisUsuarioSignal.asReadonly();
  readonly emailUsuario = this.emailUsuarioSignal.asReadonly();
  readonly sidebarLogoSrc = this.sidebarLogoSrcSignal.asReadonly();

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly sidebarMobile = inject(SidebarMobileService);
  private readonly sidebarCollapse = inject(ShellSidebarCollapseService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly sidebarOpenMobile = this.sidebarMobile.isOpen;
  readonly sidebarColapsada = this.sidebarCollapse.collapsed;

  constructor() {
    effect(() => {
      this.auth.appearanceVersion();
      this.refreshSidebarLogo();
    });
  }

  ngOnInit(): void {
    this.sidebarCollapse.ensureHydrated();
    this.atualizarDados();
    this.refreshSidebarLogo();
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

  private atualizarDados(): void {
    const u = this.auth.getUser();
    if (u) {
      const nome = u.name || 'Usuário';
      this.nomeUsuarioSignal.set(nome);
      this.emailUsuarioSignal.set(u.email || '');
      this.iniciaisUsuarioSignal.set(nome.slice(0, 2).toUpperCase() || 'U');
    }
  }

  private refreshSidebarLogo(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.sidebarLogoSrcSignal.set(resolveSidebarLogoSrc());
  }
}
