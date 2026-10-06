import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  HostListener,
  OnInit,
  PLATFORM_ID,
  effect,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NotificacoesService } from '../../../core/services/notificacoes.service';
import { NovidadesService } from '../../../core/services/novidades.service';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';
import { BillingBlockedStateService } from '../../../core/services/billing-blocked-state.service';
import { AuthService, TrialNotice } from '../../../core/services/auth.service';
import { OrganizationPresenceService } from '../../../core/services/organization-presence.service';
import { disableHorizontalNavInDom } from '../../../core/services/user-appearance.sync';
import { resolveSidebarLogoSrc } from '../../../core/utils/sidebar-logo.util';
import {
  ZmAssinaturaBloqueadaCardComponent,
  ZmPageBackLinkComponent,
} from '../../../shared/components/ui';
import { GoAssistantHostComponent } from '../../../go-assistant';
import {
  SHELL_NAV_SIDEBAR,
  ShellNavItem,
  ShellNavSection,
  shellNavItemVisivel,
  shellNavSectionVisivel,
} from '../shell-nav.config';
import { ShellAccountMenuComponent } from '../shell-account-menu/shell-account-menu.component';
import { ShellTopBarActionsComponent } from '../shell-top-bar-actions/shell-top-bar-actions.component';

@Component({
  selector: 'app-layout-app',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    RouterLink,
    RouterOutlet,
    ZmAssinaturaBloqueadaCardComponent,
    ZmPageBackLinkComponent,
    GoAssistantHostComponent,
    ShellTopBarActionsComponent,
    ShellAccountMenuComponent,
  ],
  templateUrl: './layout-app.component.html',
  styleUrls: ['../shell-nord.css', './layout-app.component.css'],
})
export class LayoutAppComponent implements OnInit {
  readonly navSections = SHELL_NAV_SIDEBAR;

  private readonly tituloPaginaSignal = signal('Painel');
  private readonly urlVoltarSignal = signal<string | null>(null);
  private readonly labelVoltarSignal = signal<string | null>(null);
  private readonly voltarIntegradoSignal = signal(false);
  private readonly notificacoesNaoLidasSignal = signal(0);
  private readonly novidadesNaoVistasSignal = signal(0);
  private readonly trialNoticeSignal = signal<TrialNotice | null>(null);
  private readonly urlAtualSignal = signal('/');
  private readonly sidebarLogoSrcSignal = signal('/assets/logo/logo.png');

  readonly tituloPagina = this.tituloPaginaSignal.asReadonly();
  readonly urlVoltar = this.urlVoltarSignal.asReadonly();
  readonly labelVoltar = this.labelVoltarSignal.asReadonly();
  readonly voltarIntegrado = this.voltarIntegradoSignal.asReadonly();
  readonly notificacoesNaoLidas = this.notificacoesNaoLidasSignal.asReadonly();
  readonly novidadesNaoVistas = this.novidadesNaoVistasSignal.asReadonly();
  readonly trialNotice = this.trialNoticeSignal.asReadonly();
  readonly sidebarLogoSrc = this.sidebarLogoSrcSignal.asReadonly();

  private readonly router = inject(Router);
  private readonly notif = inject(NotificacoesService);
  private readonly novidades = inject(NovidadesService);
  private readonly sidebarMobile = inject(SidebarMobileService);
  private readonly auth = inject(AuthService);
  private readonly billingBlockedState = inject(BillingBlockedStateService);
  private readonly organizationPresence = inject(OrganizationPresenceService);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      this.auth.appearanceVersion();
      this.refreshSidebarLogo();
    });
  }

  @HostListener('window:pagehide')
  onWindowPageHide(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.organizationPresence.sendLeaveBeaconIfTenantSession();
  }

  secaoVisivel(section: ShellNavSection): boolean {
    return shellNavSectionVisivel(section, (p) => this.auth.hasPermission(p), 'app');
  }

  itemVisivel(item: ShellNavItem): boolean {
    return shellNavItemVisivel(item, (p) => this.auth.hasPermission(p), 'app');
  }

  /** Texto do badge do `nord-nav-item` (contador ou dias restantes do trial). */
  badgeTexto(item: ShellNavItem): string | null {
    if (item.badge === 'trial') {
      const trial = this.trialNotice();
      if (!trial?.visible) return null;
      return trial.days_remaining === 1 ? '1 dia' : `${trial.days_remaining} dias`;
    }
    const total =
      item.badge === 'notifications'
        ? this.notificacoesNaoLidas()
        : item.badge === 'novidades'
          ? this.novidadesNaoVistas()
          : 0;
    if (total <= 0) return null;
    return total > 99 ? '99+' : String(total);
  }

  isActive(item: ShellNavItem): boolean {
    const url = this.urlAtualSignal();
    if (item.exact) {
      return url === item.route;
    }
    return url === item.route || url.startsWith(item.route + '/');
  }

  go(event: Event, path: string): void {
    event.preventDefault();
    void this.router.navigateByUrl(path);
  }

  sair(): void {
    this.auth.logout().subscribe(() => void this.router.navigate(['/autenticacao']));
  }

  /** Aviso global de cobrança (exceto na própria página de assinatura). */
  mostrarAvisoCobrancaGlobal(): boolean {
    if (!this.billingBlockedState.isActive()) return false;
    return this.caminhoAtual() !== '/assinatura';
  }

  ngOnInit(): void {
    disableHorizontalNavInDom();
    this.refreshSidebarLogo();
    if (this.auth.isAuthenticated()) {
      this.auth.me().subscribe({
        next: () => {
          this.trialNoticeSignal.set(this.auth.getTrialNotice());
        },
        error: () => {},
      });
    }
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => {
      this.sidebarMobile.setOpen(false);
      this.billingBlockedState.clear();
      this.updateFromActivatedRoute();
      this.atualizarBadgeNotificacoes();
      this.atualizarBadgeNovidades();
    });
    this.updateFromActivatedRoute();
    this.atualizarBadgeNotificacoes();
    this.atualizarBadgeNovidades();
  }

  private caminhoAtual(): string {
    return this.router.url.split('?')[0].replace(/\/$/, '') || '/';
  }

  private refreshSidebarLogo(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.sidebarLogoSrcSignal.set(resolveSidebarLogoSrc());
  }

  private updateFromActivatedRoute(): void {
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
    const path = this.caminhoAtual();
    const categoriaAtual =
      typeof route.queryParams['categoria'] === 'string' ? route.queryParams['categoria'] : null;
    this.urlAtualSignal.set(path);
    this.tituloPaginaSignal.set(this.resolvePageTitle(path, categoriaAtual, data.titulo));
    this.urlVoltarSignal.set(data.urlVoltar ?? null);
    this.labelVoltarSignal.set(data.labelVoltar ?? null);
    this.voltarIntegradoSignal.set(data.voltarIntegrado === true);
  }

  private resolvePageTitle(path: string, categoria: string | null, fallbackTitle?: string): string {
    if (path === '/templates' && categoria && categoria.trim() !== '') {
      return this.formatCategoryLabel(categoria);
    }
    return fallbackTitle ?? 'Gestgo';
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

  private atualizarBadgeNovidades(): void {
    this.novidades.getNaoVistasCount().subscribe((n) => this.novidadesNaoVistasSignal.set(n));
  }

  private atualizarBadgeNotificacoes(): void {
    if (!this.auth.hasPermission('notifications.access')) {
      this.notificacoesNaoLidasSignal.set(0);
      return;
    }
    this.notif.getNaoLidasCount().subscribe((n) => this.notificacoesNaoLidasSignal.set(n));
  }
}
