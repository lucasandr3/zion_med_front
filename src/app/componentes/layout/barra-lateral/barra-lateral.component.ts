import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService, TrialNotice } from '../../../core/services/auth.service';
import { resolveSidebarLogoSrc } from '../../../core/utils/sidebar-logo.util';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';
import { ZardTooltipImports } from '@/shared/components/tooltip';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardMenuLabelComponent } from '../../../shared/components/menu/menu-label.component';
import { ZardMenuImports } from '../../../shared/components/menu/menu.imports';
import { ZardAvatarComponent } from '@/shared/components/avatar/avatar.component';
import {
  SHELL_NAV_SIDEBAR,
  ShellNavItem,
  ShellNavSection,
  shellNavItemVisivel,
  shellNavSectionVisivel,
} from '../shell-nav.config';

@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ...ZardTooltipImports,
    ZardBadgeComponent,
    ZardButtonComponent,
    ZardMenuLabelComponent,
    ...ZardMenuImports,
    ZardAvatarComponent,
  ],
  templateUrl: './barra-lateral.component.html',
  styleUrl: './barra-lateral.component.css',
})
export class BarraLateralComponent implements OnInit, OnDestroy {
  /** Contador vindo do layout (fonte única com o cabeçalho). */
  @Input() notificacoesNaoLidas = 0;
  @Input() novidadesNaoVistas = 0;
  @Input() trialNotice: TrialNotice | null = null;

  readonly navSections = SHELL_NAV_SIDEBAR;

  nomeUsuario = 'Usuário';
  iniciaisUsuario = 'U';
  emailUsuario = '';
  exibirTrocarEmpresa = false;
  ehAdminPlataforma = false;
  podeGerenciarClinica = false;

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
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.atualizarDados();
    this.sincronizarEstadoSidebar();
    this.appearanceSub = this.auth.appearanceApplied$.subscribe(() => {
      this.refreshSidebarLogo();
      this.cdr.markForCheck();
    });
    this.sidebarMobile.getOpen().subscribe((open) => {
      this.sidebarOpenMobile = open;
      if (typeof document !== 'undefined') {
        document.body.style.overflow = open ? 'hidden' : '';
      }
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.sidebarObserver?.disconnect();
    this.appearanceSub?.unsubscribe();
  }

  itemVisivel(item: ShellNavItem): boolean {
    return shellNavItemVisivel(item, (p) => this.auth.hasPermission(p), 'app');
  }

  secaoVisivel(section: ShellNavSection): boolean {
    return shellNavSectionVisivel(section, (p) => this.auth.hasPermission(p), 'app');
  }

  badgeCount(item: ShellNavItem): number {
    if (item.badge === 'notifications') return this.notificacoesNaoLidas;
    if (item.badge === 'novidades') return this.novidadesNaoVistas;
    return 0;
  }

  badgeTrialLabel(item: ShellNavItem): string | null {
    if (item.badge !== 'trial' || !this.trialNotice?.visible) return null;
    const d = this.trialNotice.days_remaining;
    return d === 1 ? '1 dia' : `${d} dias`;
  }

  get podeVerBilling(): boolean {
    return this.auth.hasPermission('billing.manage');
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

  private atualizarDados(): void {
    const u = this.auth.getUser();
    if (u) {
      this.nomeUsuario = u.name || 'Usuário';
      this.emailUsuario = u.email || '';
      this.iniciaisUsuario = this.nomeUsuario.slice(0, 2).toUpperCase() || 'U';
      this.ehAdminPlataforma = u.role === 'platform_admin';
      this.podeGerenciarClinica = this.auth.hasPermission('organization.manage');
    } else {
      this.podeGerenciarClinica = false;
    }
    this.exibirTrocarEmpresa = this.auth.canSwitchClinic();
  }

  private refreshSidebarLogo(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.sidebarLogoSrc = resolveSidebarLogoSrc();
  }

  private sincronizarEstadoSidebar(): void {
    if (!isPlatformBrowser(this.platformId) || typeof document === 'undefined') return;

    const atualizar = (): void => {
      this.sidebarColapsada = document.body.classList.contains('sidebar-collapsed');
      this.refreshSidebarLogo();
      this.cdr.markForCheck();
    };

    atualizar();
    this.sidebarObserver = new MutationObserver(atualizar);
    this.sidebarObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }
}
