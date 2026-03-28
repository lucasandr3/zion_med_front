import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { CommonModule } from '@angular/common';
import { NotificacoesService } from '../../../core/services/notificacoes.service';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';

@Component({
  selector: 'app-layout-app',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BarraLateralComponent, CabecalhoComponent],
  templateUrl: './layout-app.component.html',
  styleUrl: './layout-app.component.css',
})
export class LayoutAppComponent implements OnInit {
  tituloPagina = 'Dashboard';
  urlVoltar: string | null = null;
  labelVoltar: string | null = null;
  notificacoesNaoLidas = 0;
  private router = inject(Router);
  private notif = inject(NotificacoesService);
  private sidebarMobile = inject(SidebarMobileService);

  ngOnInit(): void {
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe((e) => {
      this.sidebarMobile.setOpen(false);
      const child = e.urlAfterRedirects.split('?')[0];
      const route = this.router.config.flatMap((c) => (c.children ?? [])).find((r) => r.path && child.includes(r.path));
      const data = (route?.data ?? {}) as { titulo?: string; urlVoltar?: string; labelVoltar?: string };
      this.tituloPagina = data.titulo ?? 'Gestgo';
      this.urlVoltar = data.urlVoltar ?? null;
      this.labelVoltar = data.labelVoltar ?? null;
    });
    const firstChild = this.router.routerState.snapshot.root.firstChild;
    if (firstChild?.data?.['titulo']) {
      this.tituloPagina = firstChild.data['titulo'];
      this.urlVoltar = firstChild.data['urlVoltar'] ?? null;
      this.labelVoltar = firstChild.data['labelVoltar'] ?? null;
    }
    this.notif.getNaoLidasCount().subscribe((n) => (this.notificacoesNaoLidas = n));
  }
}
