import { Component, OnInit, inject, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';
import { NotificacoesService } from '../../../core/services/notificacoes.service';
import { TooltipDirective } from '../../../core/directives/tooltip.directive';

@Component({
  selector: 'app-barra-lateral-plataforma',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TooltipDirective],
  templateUrl: './barra-lateral-plataforma.component.html',
  styleUrl: './barra-lateral-plataforma.component.css',
})
export class BarraLateralPlataformaComponent implements OnInit {
  nomeUsuario = 'Usuário';
  iniciaisUsuario = 'U';
  emailUsuario = '';
  notificacoesNaoLidas = 0;
  menuUsuarioAberto = false;

  @ViewChild('userMenuContainer') userMenuContainer?: ElementRef<HTMLElement>;

  private auth = inject(AuthService);
  private router = inject(Router);
  private sidebarMobile = inject(SidebarMobileService);
  private notif = inject(NotificacoesService);

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
    this.sidebarMobile.getOpen().subscribe((open) => {
      this.sidebarOpenMobile = open;
      if (typeof document !== 'undefined') {
        document.body.style.overflow = open ? 'hidden' : '';
      }
    });
    this.notif.getNaoLidasCount().subscribe((n) => (this.notificacoesNaoLidas = n));
  }

  private atualizarDados(): void {
    const u = this.auth.getUser();
    if (u) {
      this.nomeUsuario = u.name || 'Usuário';
      this.emailUsuario = u.email || '';
      this.iniciaisUsuario = this.nomeUsuario.slice(0, 2).toUpperCase() || 'U';
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
