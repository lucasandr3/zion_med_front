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
  podeGerenciarClinica = true;
  podeGerenciarTemplates = true;
  podeVerSubmissoes = true;
  podeGerenciarUsuarios = false;

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
      this.podeGerenciarClinica = ['owner', 'admin'].includes(u.role);
      this.podeGerenciarUsuarios = ['owner', 'admin'].includes(u.role);
      this.podeGerenciarTemplates = true;
      this.podeVerSubmissoes = true;
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
