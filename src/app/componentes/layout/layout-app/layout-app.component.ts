import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { CommonModule } from '@angular/common';
import { NotificacoesService } from '../../../core/services/notificacoes.service';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';
import { AuthService } from '../../../core/services/auth.service';
import type { AppBreadcrumb } from '../cabecalho/cabecalho.component';

@Component({
  selector: 'app-layout-app',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BarraLateralComponent, CabecalhoComponent],
  templateUrl: './layout-app.component.html',
  styleUrl: './layout-app.component.css',
})
export class LayoutAppComponent implements OnInit {
  tituloPagina = 'Dashboard';
  breadcrumbs: AppBreadcrumb[] = [];
  urlVoltar: string | null = null;
  labelVoltar: string | null = null;
  notificacoesNaoLidas = 0;
  private router = inject(Router);
  private notif = inject(NotificacoesService);
  private sidebarMobile = inject(SidebarMobileService);
  private auth = inject(AuthService);

  private updateFromActivatedRoute(): void {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const data = (route.data ?? {}) as { titulo?: string; urlVoltar?: string; labelVoltar?: string };
    this.tituloPagina = data.titulo ?? 'Gestgo';
    this.urlVoltar = data.urlVoltar ?? null;
    this.labelVoltar = data.labelVoltar ?? null;
    const path = this.router.url.split('?')[0].replace(/\/$/, '') || '/';
    if (path === '/dashboard') {
      this.breadcrumbs = [{ label: this.tituloPagina, url: null }];
    } else {
      this.breadcrumbs = [
        { label: 'Início', url: '/dashboard' },
        { label: this.tituloPagina, url: null },
      ];
    }
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.auth.me().subscribe({ error: () => {} });
    }
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => {
      this.sidebarMobile.setOpen(false);
      this.updateFromActivatedRoute();
    });
    this.updateFromActivatedRoute();
    this.notif.getNaoLidasCount().subscribe((n) => (this.notificacoesNaoLidas = n));
  }
}
