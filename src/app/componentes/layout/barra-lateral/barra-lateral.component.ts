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
import { AuthService, TrialNotice } from '../../../core/services/auth.service';
import { resolveSidebarLogoSrc } from '../../../core/utils/sidebar-logo.util';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';
import { ShellSidebarCollapseService } from '../../../core/services/shell-sidebar-collapse.service';

import { GestgoBadgeComponent } from '@/shared/components/badge/badge.component';

import { GestgoAvatarComponent } from '@/shared/components/avatar/avatar.component';
import {
  SHELL_NAV_SIDEBAR,
  ShellNavItem,
  ShellNavSection,
  shellNavItemVisivel,
  shellNavSectionVisivel,
} from '../shell-nav.config';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-barra-lateral',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    GestgoBadgeComponent,
    GestgoAvatarComponent],
  templateUrl: './barra-lateral.component.html',
  styleUrl: './barra-lateral.component.css',
})
export class BarraLateralComponent implements OnInit {
  @Input() notificacoesNaoLidas = 0;
  @Input() novidadesNaoVistas = 0;
  @Input() trialNotice: TrialNotice | null = null;

  readonly navSections = SHELL_NAV_SIDEBAR;

  private readonly nomeUsuarioSignal = signal('Usuário');
  private readonly iniciaisUsuarioSignal = signal('U');
  private readonly emailUsuarioSignal = signal('');
  private readonly exibirTrocarEmpresaSignal = signal(false);
  private readonly ehAdminPlataformaSignal = signal(false);
  private readonly podeGerenciarClinicaSignal = signal(false);
  private readonly sidebarLogoSrcSignal = signal('/assets/logo/logo.png');

  readonly nomeUsuario = this.nomeUsuarioSignal.asReadonly();
  readonly iniciaisUsuario = this.iniciaisUsuarioSignal.asReadonly();
  readonly emailUsuario = this.emailUsuarioSignal.asReadonly();
  readonly exibirTrocarEmpresa = this.exibirTrocarEmpresaSignal.asReadonly();
  readonly ehAdminPlataforma = this.ehAdminPlataformaSignal.asReadonly();
  readonly podeGerenciarClinica = this.podeGerenciarClinicaSignal.asReadonly();
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

  secaoVisivel(section: ShellNavSection): boolean {
    return shellNavSectionVisivel(section, (p) => this.auth.hasPermission(p), 'app');
  }

  itemVisivel(item: ShellNavItem): boolean {
    return shellNavItemVisivel(item, (p) => this.auth.hasPermission(p), 'app');
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
    return this.sidebarColapsada() ? texto : '';
  }

  private atualizarDados(): void {
    const u = this.auth.getUser();
    if (u) {
      const nome = u.name || 'Usuário';
      this.nomeUsuarioSignal.set(nome);
      this.emailUsuarioSignal.set(u.email || '');
      this.iniciaisUsuarioSignal.set(nome.slice(0, 2).toUpperCase() || 'U');
      this.ehAdminPlataformaSignal.set(u.role === 'platform_admin');
      this.podeGerenciarClinicaSignal.set(this.auth.hasPermission('organization.manage'));
    } else {
      this.podeGerenciarClinicaSignal.set(false);
    }
    this.exibirTrocarEmpresaSignal.set(this.auth.canSwitchClinic());
  }

  private refreshSidebarLogo(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.sidebarLogoSrcSignal.set(resolveSidebarLogoSrc());
  }
}
