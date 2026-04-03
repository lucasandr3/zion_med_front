import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { BarraLateralPlataformaComponent } from '../barra-lateral-plataforma/barra-lateral-plataforma.component';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { CommonModule } from '@angular/common';
import { NotificacoesService } from '../../../core/services/notificacoes.service';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';
import { PlataformaHeaderService } from '../../../core/services/plataforma-header.service';
import { AuthService } from '../../../core/services/auth.service';
import type { AppBreadcrumb } from '../cabecalho/cabecalho.component';

@Component({
  selector: 'app-layout-plataforma',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BarraLateralPlataformaComponent, CabecalhoComponent],
  templateUrl: './layout-plataforma.component.html',
  styleUrl: './layout-plataforma.component.css',
})
export class LayoutPlataformaComponent implements OnInit, OnDestroy {
  tituloPagina = 'Plataforma';
  subtituloPagina: string | null = null;
  breadcrumbs: AppBreadcrumb[] = [];
  urlVoltar: string | null = null;
  labelVoltar = 'Voltar';
  notificacoesNaoLidas = 0;
  private router = inject(Router);
  private notif = inject(NotificacoesService);
  private sidebarMobile = inject(SidebarMobileService);
  private headerService = inject(PlataformaHeaderService);
  private auth = inject(AuthService);
  private headerSub?: Subscription;

  private updateFromActivatedRoute(): void {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const data = (route.data ?? {}) as { titulo?: string; subtitulo?: string; urlVoltar?: string; labelVoltar?: string };
    this.tituloPagina = data.titulo ?? 'Plataforma';
    this.subtituloPagina = data.subtitulo ?? null;
    this.urlVoltar = data.urlVoltar ?? null;
    this.labelVoltar = data.labelVoltar ?? this.labelVoltar;
    this.recomputeBreadcrumbs();
  }

  private recomputeBreadcrumbs(): void {
    const path = this.router.url.split('?')[0].replace(/\/$/, '') || '/plataforma';
    if (path === '/plataforma') {
      this.breadcrumbs = [{ label: this.tituloPagina, url: null }];
    } else {
      this.breadcrumbs = [
        { label: 'Plataforma', url: '/plataforma' },
        { label: this.tituloPagina, url: null },
      ];
    }
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.auth.me().subscribe({ error: () => {} });
    }
    this.headerSub = this.headerService.getOverride().subscribe((override) => {
      if (override) {
        this.tituloPagina = override.titulo;
        this.subtituloPagina = override.subtitulo;
        this.recomputeBreadcrumbs();
      } else {
        this.updateFromActivatedRoute();
      }
    });

    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => {
      this.sidebarMobile.setOpen(false);
      this.headerService.clearHeader();
      this.updateFromActivatedRoute();
    });

    this.updateFromActivatedRoute();
    this.notif.getNaoLidasCount().subscribe((n) => (this.notificacoesNaoLidas = n));
  }

  ngOnDestroy(): void {
    this.headerSub?.unsubscribe();
  }
}
