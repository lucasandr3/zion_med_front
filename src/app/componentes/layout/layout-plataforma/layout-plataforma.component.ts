import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { NotificacoesService } from '../../../core/services/notificacoes.service';
import { NovidadesService } from '../../../core/services/novidades.service';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';
import { PlataformaHeaderService } from '../../../core/services/plataforma-header.service';
import { AuthService } from '../../../core/services/auth.service';
import { disableHorizontalNavInDom } from '../../../core/services/user-appearance.sync';
import { resolveSidebarLogoSrc } from '../../../core/utils/sidebar-logo.util';
import { ZmPageBackLinkComponent } from '../../../shared/components/ui';
import { GoAssistantHostComponent } from '../../../go-assistant';
import { SHELL_NAV_PLATAFORMA_SIDEBAR, ShellNavItem } from '../shell-nav.config';
import { ShellAccountMenuComponent } from '../shell-account-menu/shell-account-menu.component';
import { ShellTopBarActionsComponent } from '../shell-top-bar-actions/shell-top-bar-actions.component';

@Component({
  selector: 'app-layout-plataforma',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    RouterOutlet,
    ZmPageBackLinkComponent,
    GoAssistantHostComponent,
    ShellTopBarActionsComponent,
    ShellAccountMenuComponent,
  ],
  templateUrl: './layout-plataforma.component.html',
  styleUrls: ['../shell-nord.css', './layout-plataforma.component.css'],
})
export class LayoutPlataformaComponent implements OnInit, OnDestroy {
  readonly navSections = SHELL_NAV_PLATAFORMA_SIDEBAR;

  private readonly routeTituloSignal = signal('Plataforma');
  private readonly routeSubtituloSignal = signal<string | null>(null);
  private readonly urlVoltarSignal = signal<string | null>(null);
  private readonly labelVoltarSignal = signal('Voltar');
  private readonly voltarIntegradoSignal = signal(false);
  private readonly notificacoesNaoLidasSignal = signal(0);
  private readonly novidadesNaoVistasSignal = signal(0);
  private readonly urlAtualSignal = signal('/plataforma');
  private readonly sidebarLogoSrcSignal = signal('/assets/logo/logo.png');

  readonly urlVoltar = this.urlVoltarSignal.asReadonly();
  readonly labelVoltar = this.labelVoltarSignal.asReadonly();
  readonly voltarIntegrado = this.voltarIntegradoSignal.asReadonly();
  readonly notificacoesNaoLidas = this.notificacoesNaoLidasSignal.asReadonly();
  readonly novidadesNaoVistas = this.novidadesNaoVistasSignal.asReadonly();
  readonly sidebarLogoSrc = this.sidebarLogoSrcSignal.asReadonly();

  readonly tituloPagina = computed(
    () => this.headerService.override()?.titulo ?? this.routeTituloSignal(),
  );
  readonly subtituloPagina = computed(() => {
    const override = this.headerService.override();
    return override ? override.subtitulo : this.routeSubtituloSignal();
  });

  private readonly router = inject(Router);
  private readonly notif = inject(NotificacoesService);
  private readonly novidades = inject(NovidadesService);
  private readonly sidebarMobile = inject(SidebarMobileService);
  private readonly headerService = inject(PlataformaHeaderService);
  private readonly auth = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);
  private routerSub?: Subscription;

  constructor() {
    effect(() => {
      this.auth.appearanceVersion();
      this.refreshSidebarLogo();
    });
  }

  badgeTexto(item: ShellNavItem): string | null {
    if (item.badge !== 'notifications') return null;
    const total = this.notificacoesNaoLidas();
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

  ngOnInit(): void {
    disableHorizontalNavInDom();
    this.refreshSidebarLogo();
    if (this.auth.isAuthenticated()) {
      this.auth.me().subscribe({ error: () => {} });
    }

    this.routerSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        this.sidebarMobile.setOpen(false);
        this.headerService.clearHeader();
        this.updateFromActivatedRoute();
        this.atualizarBadgeNotificacoes();
        this.atualizarBadgeNovidades();
      });

    this.updateFromActivatedRoute();
    this.atualizarBadgeNotificacoes();
    this.atualizarBadgeNovidades();
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
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
      subtitulo?: string;
      urlVoltar?: string;
      labelVoltar?: string;
      voltarIntegrado?: boolean;
    };
    this.urlAtualSignal.set(this.router.url.split('?')[0].replace(/\/$/, '') || '/');
    this.routeTituloSignal.set(data.titulo ?? 'Plataforma');
    this.routeSubtituloSignal.set(data.subtitulo ?? null);
    this.urlVoltarSignal.set(data.urlVoltar ?? null);
    this.labelVoltarSignal.set(data.labelVoltar ?? 'Voltar');
    this.voltarIntegradoSignal.set(data.voltarIntegrado === true);
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
