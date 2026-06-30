import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  NgZone,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { resolveSidebarLogoSrc } from '../../../core/utils/sidebar-logo.util';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';
import { ZardTooltipImports } from '@/shared/components/tooltip';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardMenuLabelComponent } from '../../../shared/components/menu/menu-label.component';
import { ZardMenuImports } from '../../../shared/components/menu/menu.imports';
import { ZardAvatarComponent } from '@/shared/components/avatar/avatar.component';

@Component({
  selector: 'app-barra-lateral-plataforma',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ...ZardTooltipImports,
    ZardBadgeComponent,
    ZardButtonComponent,
    ZardMenuLabelComponent,
    ...ZardMenuImports,
    ZardAvatarComponent,
  ],
  templateUrl: './barra-lateral-plataforma.component.html',
  styleUrl: './barra-lateral-plataforma.component.css',
})
export class BarraLateralPlataformaComponent implements OnInit, OnDestroy {
  /** Contador vindo do layout (mesmo valor do cabeçalho). */
  @Input() notificacoesNaoLidas = 0;
  nomeUsuario = 'Usuário';
  iniciaisUsuario = 'U';
  emailUsuario = '';

  /** Com Topo e marca, variante do logo em `assets/logo` conforme o tema. */
  sidebarLogoSrc = '/assets/logo/logo.png';

  private auth = inject(AuthService);
  private router = inject(Router);
  private sidebarMobile = inject(SidebarMobileService);

  sidebarOpenMobile = false;
  sidebarColapsada = false;
  private sidebarObserver: MutationObserver | null = null;
  private appearanceSub?: Subscription;
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  ngOnInit(): void {
    this.atualizarDados();
    this.sincronizarEstadoSidebar();
    this.appearanceSub = this.auth.appearanceApplied$.subscribe(() => {
      this.ngZone.run(() => this.refreshSidebarLogo());
    });
    this.sidebarMobile.getOpen().subscribe((open) => {
      this.sidebarOpenMobile = open;
      if (typeof document !== 'undefined') {
        document.body.style.overflow = open ? 'hidden' : '';
      }
    });
  }

  ngOnDestroy(): void {
    this.sidebarObserver?.disconnect();
    this.appearanceSub?.unsubscribe();
  }

  private atualizarDados(): void {
    const u = this.auth.getUser();
    if (u) {
      this.nomeUsuario = u.name || 'Usuário';
      this.emailUsuario = u.email || '';
      this.iniciaisUsuario = this.nomeUsuario.slice(0, 2).toUpperCase() || 'U';
    }
  }

  fecharSidebarMobile(): void {
    this.sidebarMobile.setOpen(false);
  }

  sair(): void {
    this.auth.logout().subscribe(() => this.router.navigate(['/autenticacao']));
  }

  tooltipQuandoColapsada(texto: string): string {
    return this.sidebarColapsada ? texto : '';
  }

  private refreshSidebarLogo(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.sidebarLogoSrc = resolveSidebarLogoSrc();
  }

  private sincronizarEstadoSidebar(): void {
    if (!isPlatformBrowser(this.platformId) || typeof document === 'undefined') return;

    const atualizar = (): void => {
      this.ngZone.run(() => {
        this.sidebarColapsada = document.body.classList.contains('sidebar-collapsed');
        this.refreshSidebarLogo();
      });
    };

    atualizar();
    this.sidebarObserver = new MutationObserver(atualizar);
    this.sidebarObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }
}
