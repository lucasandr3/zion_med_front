import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { filter, Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService, TrialNotice } from '../../core/services/auth.service';
import { NotificacoesService } from '../../core/services/notificacoes.service';
import { NovidadesService } from '../../core/services/novidades.service';
import { BillingBlockedStateService } from '../../core/services/billing-blocked-state.service';
import { OrganizationPresenceService } from '../../core/services/organization-presence.service';
import { PlataformaHeaderService } from '../../core/services/plataforma-header.service';
import { ScreenService } from '../../shared/services/screen.service';
import { GoAssistantHostComponent } from '../../go-assistant';
import { GoAssistantShellService } from '../../go-assistant/services/go-assistant-shell.service';
import {
  ZmAssinaturaBloqueadaCardComponent,
  ZmPageBackLinkComponent,
} from '../../shared/components/ui';
import {
  SHELL_NAV_PLATAFORMA_SECTIONS,
  SHELL_NAV_SIDEBAR,
  ShellNavItem,
  shellNavItemVisivel,
} from '../../componentes/layout/shell-nav.config';
import { BarraNavHorizontalComponent } from '../../componentes/layout/barra-nav-horizontal/barra-nav-horizontal.component';
import { ShellNavLayoutService } from '../../core/services/shell-nav-layout.service';
import { GestgoThemePanelComponent } from '../theme-panel/gestgo-theme-panel.component';

function matchesShellMobile(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 959.98px)').matches;
}

@Component({
  selector: 'app-gestgo-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    GoAssistantHostComponent,
    ZmAssinaturaBloqueadaCardComponent,
    ZmPageBackLinkComponent,
    GestgoThemePanelComponent,
    BarraNavHorizontalComponent,
  ],
  templateUrl: './gestgo-shell.component.html',
  styleUrl: './gestgo-shell.component.scss',
  host: {
    class: 'gestgo-app-shell',
  },
})
export class GestgoShellComponent implements OnInit, OnDestroy {
  @Input({ required: true }) context!: 'app' | 'plataforma';

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly screen = inject(ScreenService);
  private readonly notif = inject(NotificacoesService);
  private readonly novidades = inject(NovidadesService);
  private readonly billingBlockedState = inject(BillingBlockedStateService);
  private readonly organizationPresence = inject(OrganizationPresenceService);
  private readonly headerService = inject(PlataformaHeaderService);
  private readonly assistant = inject(GoAssistantShellService);
  private readonly shellNav = inject(ShellNavLayoutService);
  private readonly platformId = inject(PLATFORM_ID);

  private headerSub?: Subscription;

  readonly sidenavOpened = signal(!matchesShellMobile());
  readonly pageTitle = signal('Painel');
  readonly urlVoltar = signal<string | null>(null);
  readonly labelVoltar = signal<string | null>(null);
  readonly voltarIntegrado = signal(false);
  readonly unreadNotifications = signal(0);
  readonly novidadesNaoVistas = signal(0);
  readonly themePanelOpen = signal(false);
  trialNotice: TrialNotice | null = null;

  readonly isMobile = this.screen.isMobile;
  readonly sidenavMode = this.screen.sidenavMode;
  /** Menu horizontal no desktop (no mobile continua lateral em overlay). */
  readonly isHorizontalDesktop = computed(() => this.shellNav.isHorizontal() && !this.isMobile());
  readonly sidenavVisible = computed(() => (this.isHorizontalDesktop() ? false : this.sidenavOpened()));

  readonly brandLogoSrc = '/assets/logo/logo.png';
  readonly brandName = 'Gestgo';
  readonly brandSlogan = 'Fichas digitais';

  /** Header/faixa de marca com cor do tema — só no preset "Topo e marca". */
  readonly headerIsBrand = signal(false);

  private shellPresetObserver?: MutationObserver;

  readonly usuarioNome = computed(() => this.auth.getUser()?.name ?? 'Usuário');
  readonly usuarioEmail = computed(() => this.auth.getUser()?.email ?? '');
  readonly orgName = computed(() => {
    if (this.context === 'plataforma') {
      return 'Gestgo Plataforma';
    }
    return this.auth.getCurrentOrganization()?.name?.trim() || 'Gestgo';
  });

  readonly headerLabel = computed(() => this.pageTitle() || this.brandName);

  readonly userInitials = computed(() => {
    const parts = this.usuarioNome().trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'U';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  });

  readonly navSections = computed(() => {
    const sections =
      this.context === 'plataforma' ? SHELL_NAV_PLATAFORMA_SECTIONS : SHELL_NAV_SIDEBAR;
    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => this.itemVisible(item)),
      }))
      .filter((section) => section.items.length > 0);
  });

  get notificacoesRoute(): string {
    return this.context === 'plataforma' ? '/plataforma/notificacoes' : '/notificacoes';
  }

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        if (this.isMobile()) {
          this.sidenavOpened.set(false);
        }
        if (this.context === 'app') {
          this.billingBlockedState.clear();
        }
        if (this.context === 'plataforma') {
          this.headerService.clearHeader();
        }
        this.updateFromRoute();
        this.refreshBadges();
      });

    effect(() => {
      if (this.isHorizontalDesktop()) {
        this.sidenavOpened.set(false);
      } else {
        this.sidenavOpened.set(!this.isMobile());
      }
    });
  }

  @HostListener('window:pagehide')
  onWindowPageHide(): void {
    if (!isPlatformBrowser(this.platformId) || this.context !== 'app') {
      return;
    }
    this.organizationPresence.sendLeaveBeaconIfTenantSession();
  }

  @HostListener('document:keydown', ['$event'])
  onGlobalKeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
      event.preventDefault();
      this.openAssistant();
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.syncHeaderBrandFromDom();
      this.shellPresetObserver = new MutationObserver(() => this.syncHeaderBrandFromDom());
      this.shellPresetObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
      });
    }

    if (this.auth.isAuthenticated()) {
      this.auth.me().subscribe({
        next: () => {
          if (this.context === 'app') {
            this.trialNotice = this.auth.getTrialNotice();
          }
        },
        error: () => {},
      });
    }

    if (this.context === 'plataforma') {
      this.headerSub = this.headerService.getOverride().subscribe((override) => {
        if (override) {
          this.pageTitle.set(override.titulo);
        } else {
          this.updateFromRoute();
        }
      });
    }

    this.updateFromRoute();
    this.refreshBadges();
  }

  ngOnDestroy(): void {
    this.headerSub?.unsubscribe();
    this.shellPresetObserver?.disconnect();
  }

  private syncHeaderBrandFromDom(): void {
    this.headerIsBrand.set(document.body.classList.contains('shell-preset-tinted'));
  }

  onNavClick(): void {
    if (this.isMobile()) {
      this.sidenavOpened.set(false);
    }
  }

  onSidenavOpenedChange(opened: boolean): void {
    if (this.isHorizontalDesktop()) {
      this.sidenavOpened.set(false);
      return;
    }
    this.sidenavOpened.set(opened);
  }

  openAssistant(): void {
    this.assistant.toggle();
  }

  toggleThemePanel(): void {
    this.themePanelOpen.set(!this.themePanelOpen());
  }

  closeThemePanel(): void {
    this.themePanelOpen.set(false);
  }

  openNovidades(trigger: MatMenuTrigger): void {
    trigger.closeMenu();
    void this.router.navigate(['/novidades']);
  }

  openMyAccount(trigger: MatMenuTrigger): void {
    trigger.closeMenu();
    void this.router.navigate(['/conta/perfil']);
  }

  openSettings(trigger: MatMenuTrigger): void {
    trigger.closeMenu();
    void this.router.navigate(['/clinica/configuracoes']);
  }

  openSwitchCompany(trigger: MatMenuTrigger): void {
    trigger.closeMenu();
    void this.router.navigate(['/clinica/escolher']);
  }

  openPlataforma(trigger: MatMenuTrigger): void {
    trigger.closeMenu();
    void this.router.navigate(['/plataforma']);
  }

  openAppHome(trigger: MatMenuTrigger): void {
    trigger.closeMenu();
    void this.router.navigate(['/dashboard']);
  }

  canSwitchCompany(): boolean {
    return this.auth.canSwitchClinic();
  }

  isPlatformAdmin(): boolean {
    return this.auth.isPlatformAdmin();
  }

  podeVerNotificacoes(): boolean {
    if (this.context === 'plataforma') {
      return true;
    }
    return this.auth.hasPermission('notifications.access');
  }

  mostrarAvisoCobrancaGlobal(): boolean {
    if (!this.billingBlockedState.isActive()) {
      return false;
    }
    const path = this.router.url.split('?')[0].replace(/\/$/, '') || '/';
    return path !== '/assinatura';
  }

  badgeLabel(item: ShellNavItem): string | null {
    if (item.badge === 'notifications') {
      const n = this.unreadNotifications();
      return n > 0 ? (n > 99 ? '99+' : String(n)) : null;
    }
    if (item.badge === 'novidades') {
      const n = this.novidadesNaoVistas();
      return n > 0 ? (n > 99 ? '99+' : String(n)) : null;
    }
    if (item.badge === 'trial' && this.trialNotice?.visible) {
      const d = this.trialNotice.days_remaining;
      return d === 1 ? '1 dia' : `${d} dias`;
    }
    return null;
  }

  logout(): void {
    this.auth.logout().subscribe({
      next: () => void this.router.navigate(['/autenticacao']),
      error: () => void this.router.navigate(['/autenticacao']),
    });
  }

  private itemVisible(item: ShellNavItem): boolean {
    return shellNavItemVisivel(item, (p) => this.auth.hasPermission(p), this.context);
  }

  private updateFromRoute(): void {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const data = (route.data ?? {}) as {
      titulo?: string;
      urlVoltar?: string;
      labelVoltar?: string;
      voltarIntegrado?: boolean;
    };
    const path = this.router.url.split('?')[0].replace(/\/$/, '') || '/';
    const categoriaAtual =
      typeof route.queryParams['categoria'] === 'string' ? route.queryParams['categoria'] : null;

    if (this.context === 'app' && path === '/templates' && categoriaAtual?.trim()) {
      this.pageTitle.set(this.formatCategoryLabel(categoriaAtual));
    } else {
      this.pageTitle.set(data.titulo ?? (this.context === 'plataforma' ? 'Plataforma' : 'Gestgo'));
    }

    this.urlVoltar.set(data.urlVoltar ?? null);
    this.labelVoltar.set(data.labelVoltar ?? null);
    this.voltarIntegrado.set(data.voltarIntegrado === true);
  }

  private formatCategoryLabel(raw: string): string {
    const categoria = raw.trim().toLowerCase();
    const labels: Record<string, string> = {
      personalizado: 'Personalizado',
      anamnese: 'Anamnese',
      anamneses: 'Anamneses',
      cadastro_documentacao: 'Cadastro e Documentação',
      acompanhamento_controle: 'Acompanhamento e Controle',
      acompanhamento: 'Acompanhamento',
      evolucao: 'Evolução',
      consentimento: 'Consentimento',
      triagem: 'Triagem',
      procedimento: 'Procedimento',
      geral: 'Geral (todos os tenants)',
      clinica_medica: 'Clínica Médica',
      odontologia: 'Odontologia',
      estetica: 'Estética / Harmonização',
      fisioterapia: 'Fisioterapia',
      psicologia: 'Psicologia / Psiquiatria',
      pediatria: 'Pediatria',
      ginecologia: 'Ginecologia / Obstetrícia',
      oftalmologia: 'Oftalmologia',
      dermatologia: 'Dermatologia',
      laboratorio: 'Laboratório / Coleta',
      veterinaria: 'Veterinária',
    };
    if (labels[categoria]) {
      return labels[categoria];
    }
    return categoria
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  private refreshBadges(): void {
    this.novidades.getNaoVistasCount().subscribe((n) => this.novidadesNaoVistas.set(n));
    if (!this.podeVerNotificacoes()) {
      this.unreadNotifications.set(0);
      return;
    }
    this.notif.getNaoLidasCount().subscribe((n) => this.unreadNotifications.set(n));
  }
}
