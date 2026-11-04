import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  signal,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AuthService, TrialNotice } from '../../../core/services/auth.service';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';
import { ShellSidebarCollapseService } from '../../../core/services/shell-sidebar-collapse.service';

import { GestgoBadgeComponent } from '@/shared/components/badge/badge.component';

import { GestgoAvatarComponent } from '@/shared/components/avatar/avatar.component';
import { GestgoBrandMarkComponent } from '@/shared/components/gestgo-brand-mark/gestgo-brand-mark.component';
import {
  SHELL_NAV_SIDEBAR,
  ShellNavItem,
  ShellNavSection,
  shellNavItemActive,
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
    GestgoBadgeComponent,
    GestgoAvatarComponent,
    GestgoBrandMarkComponent,
  ],
  templateUrl: './barra-lateral.component.html',
  styleUrl: './barra-lateral.component.css',
})
export class BarraLateralComponent implements OnInit, OnDestroy {
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

  readonly nomeUsuario = this.nomeUsuarioSignal.asReadonly();
  readonly iniciaisUsuario = this.iniciaisUsuarioSignal.asReadonly();
  readonly emailUsuario = this.emailUsuarioSignal.asReadonly();
  readonly exibirTrocarEmpresa = this.exibirTrocarEmpresaSignal.asReadonly();
  readonly ehAdminPlataforma = this.ehAdminPlataformaSignal.asReadonly();
  readonly podeGerenciarClinica = this.podeGerenciarClinicaSignal.asReadonly();

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly sidebarMobile = inject(SidebarMobileService);
  private readonly sidebarCollapse = inject(ShellSidebarCollapseService);
  private routerSub?: Subscription;

  readonly sidebarOpenMobile = this.sidebarMobile.isOpen;
  readonly sidebarColapsada = this.sidebarCollapse.collapsed;

  ngOnInit(): void {
    this.sidebarCollapse.ensureHydrated();
    this.atualizarDados();
    this.routerSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.cdr.markForCheck());
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  secaoVisivel(section: ShellNavSection): boolean {
    return shellNavSectionVisivel(section, (p) => this.auth.hasPermission(p), 'app', {
      canSwitchClinic: this.auth.canSwitchClinic(),
    });
  }

  itemVisivel(item: ShellNavItem): boolean {
    return shellNavItemVisivel(item, (p) => this.auth.hasPermission(p), 'app', {
      canSwitchClinic: this.auth.canSwitchClinic(),
    });
  }

  navItemAtivo(item: ShellNavItem): boolean {
    return shellNavItemActive(item, this.router.url);
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
}
