import { Component, OnInit, inject, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ClinicaService } from '../../../core/services/clinica.service';
import { absoluteMediaUrl } from '../../../core/utils/absolute-media-url';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';
import { TooltipDirective } from '../../../core/directives/tooltip.directive';

@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TooltipDirective],
  templateUrl: './barra-lateral.component.html',
  styleUrl: './barra-lateral.component.css',
})
export class BarraLateralComponent implements OnInit {
  nomeUsuario = 'Usuário';
  iniciaisUsuario = 'U';
  emailUsuario = '';
  nomeClinica: string | null = null;
  enderecoClinica: string | null = null;
  /** URL absoluta da logo da empresa (API pode devolver /storage/...). */
  logoUrlClinica: string | null = null;
  notificacoesNaoLidas = 0;
  menuUsuarioAberto = false;
  exibirTrocarEmpresa = false;
  ehAdminPlataforma = false;
  podeVerDashboard = false;
  podeVerNotificacoes = false;
  podeVerBilling = false;
  podeGerenciarClinica = false;
  podeGerenciarTemplates = false;
  podeVerSubmissoes = false;
  podeGerenciarUsuarios = false;
  /** Links públicos / envios: templates ou ao menos ver submissões. */
  podeAcessarLinksEEnvios = false;

  @ViewChild('userMenuContainer') userMenuContainer?: ElementRef<HTMLElement>;

  private auth = inject(AuthService);
  private router = inject(Router);
  private clinicaService = inject(ClinicaService);
  private sidebarMobile = inject(SidebarMobileService);

  sidebarOpenMobile = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: Event): void {
    if (!this.menuUsuarioAberto) return;
    const el = this.userMenuContainer?.nativeElement;
    if (el && el.contains(e.target as Node)) return;
    this.fecharMenuUsuario();
  }

  ngOnInit(): void {
    this.atualizarDados();
    this.clinicaService.clinicBrandingUpdated$.subscribe(() => this.atualizarDados());
    this.sidebarMobile.getOpen().subscribe((open) => {
      this.sidebarOpenMobile = open;
      // Igual ao backend: bloquear scroll do body quando sidebar aberta no mobile
      if (typeof document !== 'undefined') {
        document.body.style.overflow = open ? 'hidden' : '';
      }
    });
  }

  private atualizarDados(): void {
    const u = this.auth.getUser();
    if (u) {
      this.nomeUsuario = u.name || 'Usuário';
      this.emailUsuario = u.email || '';
      this.iniciaisUsuario = this.nomeUsuario.slice(0, 2).toUpperCase() || 'U';
      this.ehAdminPlataforma = u.role === 'platform_admin';
      this.podeVerDashboard = this.auth.hasPermission('dashboard.access');
      this.podeVerNotificacoes = this.auth.hasPermission('notifications.access');
      this.podeVerBilling = this.auth.hasPermission('billing.manage');
      this.podeGerenciarClinica = this.auth.hasPermission('organization.manage');
      this.podeGerenciarUsuarios = this.auth.hasPermission('users.manage');
      this.podeGerenciarTemplates = this.auth.hasPermission('templates.manage');
      this.podeVerSubmissoes = this.auth.hasPermission('submissions.view');
      this.podeAcessarLinksEEnvios =
        this.auth.hasPermission('templates.manage') || this.auth.hasPermission('submissions.view');
    } else {
      this.podeVerDashboard = false;
      this.podeVerNotificacoes = false;
      this.podeVerBilling = false;
      this.podeGerenciarClinica = false;
      this.podeGerenciarUsuarios = false;
      this.podeGerenciarTemplates = false;
      this.podeVerSubmissoes = false;
      this.podeAcessarLinksEEnvios = false;
    }
    this.exibirTrocarEmpresa = this.auth.canSwitchClinic();
    const clinic = this.auth.getCurrentClinic();
    this.logoUrlClinica = null;
    if (clinic) {
      this.nomeClinica = clinic.name ?? null;
      this.enderecoClinica = (clinic as { address?: string }).address ?? null;
    }
    // Nome, endereço e logo atualizados (storage pode ser path relativo à API)
    if (this.auth.getCurrentClinicId()) {
      this.clinicaService.getConfiguracoes().subscribe({
        next: (config) => {
          this.nomeClinica = config.name ?? this.nomeClinica;
          this.enderecoClinica = config.address ?? this.enderecoClinica ?? null;
          const raw = config.logo_url;
          if (raw != null && String(raw).trim() !== '') {
            const abs = absoluteMediaUrl(String(raw));
            this.logoUrlClinica = abs ?? String(raw);
          } else {
            this.logoUrlClinica = null;
          }
        },
        error: () => {}
      });
    }
  }

  alternarMenuUsuario(): void {
    this.menuUsuarioAberto = !this.menuUsuarioAberto;
  }

  fecharMenuUsuario(): void {
    this.menuUsuarioAberto = false;
  }

  fecharSidebarMobile(): void {
    this.sidebarMobile.setOpen(false);
  }

  sair(): void {
    this.menuUsuarioAberto = false;
    this.auth.logout().subscribe(() => this.router.navigate(['/autenticacao']));
  }
}
