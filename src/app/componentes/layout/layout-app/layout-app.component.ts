import { Component, OnInit, inject, HostListener, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { CommonModule } from '@angular/common';
import { NotificacoesService } from '../../../core/services/notificacoes.service';
import { NovidadesService } from '../../../core/services/novidades.service';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';
import { BillingBlockedStateService } from '../../../core/services/billing-blocked-state.service';
import { AuthService, TrialNotice } from '../../../core/services/auth.service';
import { OrganizationPresenceService } from '../../../core/services/organization-presence.service';
import { ZmAssinaturaBloqueadaCardComponent, ZmPageBackLinkComponent } from '../../../shared/components/ui';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { GoAssistantHostComponent } from '../../../go-assistant';
@Component({
  selector: 'app-layout-app',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    BarraLateralComponent,
    CabecalhoComponent,
    ZmAssinaturaBloqueadaCardComponent,
    ZmPageBackLinkComponent,
    ZardButtonComponent,
    GoAssistantHostComponent,
  ],
  templateUrl: './layout-app.component.html',
  styleUrl: './layout-app.component.css',
})
export class LayoutAppComponent implements OnInit {
  tituloPagina = 'Painel';
  urlVoltar: string | null = null;
  labelVoltar: string | null = null;
  voltarIntegrado = false;
  notificacoesNaoLidas = 0;
  novidadesNaoVistas = 0;
  trialNotice: TrialNotice | null = null;
  private router = inject(Router);
  private notif = inject(NotificacoesService);
  private novidades = inject(NovidadesService);
  private sidebarMobile = inject(SidebarMobileService);
  private auth = inject(AuthService);
  private billingBlockedState = inject(BillingBlockedStateService);
  private organizationPresence = inject(OrganizationPresenceService);
  private platformId = inject(PLATFORM_ID);

  @HostListener('window:pagehide')
  onWindowPageHide(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.organizationPresence.sendLeaveBeaconIfTenantSession();
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
    const path = this.router.url.split('?')[0].replace(/\/$/, '') || '/';
    const categoriaAtual = typeof route.queryParams['categoria'] === 'string' ? route.queryParams['categoria'] : null;
    this.tituloPagina = this.resolvePageTitle(path, categoriaAtual, data.titulo);
    this.urlVoltar = data.urlVoltar ?? null;
    this.labelVoltar = data.labelVoltar ?? null;
    this.voltarIntegrado = data.voltarIntegrado === true;
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

  /** Aviso global de cobrança (exceto na própria página de assinatura). */
  mostrarAvisoCobrancaGlobal(): boolean {
    if (!this.billingBlockedState.isActive()) return false;
    const path = this.router.url.split('?')[0].replace(/\/$/, '') || '/';
    return path !== '/assinatura';
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.auth.me().subscribe({
        next: () => {
          this.trialNotice = this.auth.getTrialNotice();
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

  private atualizarBadgeNovidades(): void {
    this.novidades.getNaoVistasCount().subscribe((n) => (this.novidadesNaoVistas = n));
  }

  private atualizarBadgeNotificacoes(): void {
    if (!this.auth.hasPermission('notifications.access')) {
      this.notificacoesNaoLidas = 0;
      return;
    }
    this.notif.getNaoLidasCount().subscribe((n) => (this.notificacoesNaoLidas = n));
  }
}
