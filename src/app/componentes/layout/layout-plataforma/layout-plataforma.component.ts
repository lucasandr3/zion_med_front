import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { BarraLateralPlataformaComponent } from '../barra-lateral-plataforma/barra-lateral-plataforma.component';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { NotificacoesService } from '../../../core/services/notificacoes.service';
import { NovidadesService } from '../../../core/services/novidades.service';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';
import { PlataformaHeaderService } from '../../../core/services/plataforma-header.service';
import { AuthService } from '../../../core/services/auth.service';
import { ZmPageBackLinkComponent } from '../../../shared/components/ui';
import { GoAssistantHostComponent } from '../../../go-assistant';

@Component({
  selector: 'app-layout-plataforma',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    BarraLateralPlataformaComponent,
    CabecalhoComponent,
    ZmPageBackLinkComponent,
    GoAssistantHostComponent,
  ],
  templateUrl: './layout-plataforma.component.html',
  styleUrl: './layout-plataforma.component.css',
})
export class LayoutPlataformaComponent implements OnInit, OnDestroy {
  private readonly routeTituloSignal = signal('Plataforma');
  private readonly routeSubtituloSignal = signal<string | null>(null);
  private readonly urlVoltarSignal = signal<string | null>(null);
  private readonly labelVoltarSignal = signal('Voltar');
  private readonly voltarIntegradoSignal = signal(false);
  private readonly notificacoesNaoLidasSignal = signal(0);
  private readonly novidadesNaoVistasSignal = signal(0);

  readonly urlVoltar = this.urlVoltarSignal.asReadonly();
  readonly labelVoltar = this.labelVoltarSignal.asReadonly();
  readonly voltarIntegrado = this.voltarIntegradoSignal.asReadonly();
  readonly notificacoesNaoLidas = this.notificacoesNaoLidasSignal.asReadonly();
  readonly novidadesNaoVistas = this.novidadesNaoVistasSignal.asReadonly();

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
  private routerSub?: Subscription;

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
    this.routeTituloSignal.set(data.titulo ?? 'Plataforma');
    this.routeSubtituloSignal.set(data.subtitulo ?? null);
    this.urlVoltarSignal.set(data.urlVoltar ?? null);
    this.labelVoltarSignal.set(data.labelVoltar ?? 'Voltar');
    this.voltarIntegradoSignal.set(data.voltarIntegrado === true);
  }

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }
}
