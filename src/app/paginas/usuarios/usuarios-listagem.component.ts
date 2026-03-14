import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuariosService, Usuario } from '../../core/services/usuarios.service';
import { LoadingOverlayComponent } from '../../componentes/ui/loading-overlay/loading-overlay.component';
import { AuthService } from '../../core/services/auth.service';
import { TooltipDirective } from '../../core/directives/tooltip.directive';

@Component({
  selector: 'app-usuarios-listagem',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingOverlayComponent, TooltipDirective],
  templateUrl: './usuarios-listagem.component.html',
  styleUrl: './usuarios-listagem.component.css',
})
export class UsuariosListagemComponent implements OnInit {
  usuarios: Usuario[] = [];
  carregando = false;
  erro = '';

  private usuariosService = inject(UsuariosService);
  private auth = inject(AuthService);
  private currentUserId: number | null = this.auth.getUser()?.id ?? null;

  ngOnInit(): void {
    this.carregando = true;
    this.usuariosService.list().subscribe({
      next: (list) => {
        this.usuarios = list;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.erro = 'Não foi possível carregar os usuários.';
      },
    });
  }

  inicial(nome: string): string {
    if (!nome) return '';
    return nome.trim().charAt(0).toUpperCase();
  }

  podeDesativar(u: Usuario): boolean {
    return !!u.active && (!this.currentUserId || u.id !== this.currentUserId);
  }

  desativar(u: Usuario): void {
    if (!this.podeDesativar(u)) return;
    if (!confirm('Desativar este usuário?')) return;
    this.usuariosService.delete(u.id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter((x) => x.id !== u.id);
      },
      error: () => {
        this.erro = 'Não foi possível desativar o usuário.';
      },
    });
  }
}
