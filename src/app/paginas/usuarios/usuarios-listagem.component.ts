import { Component, OnInit, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuariosService, Usuario } from '../../core/services/usuarios.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ZmEmptyStateComponent } from '../../shared/components/ui';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { TooltipDirective } from '../../core/directives/tooltip.directive';

@Component({
  selector: 'app-usuarios-listagem',
  standalone: true,
  imports: [CommonModule, RouterLink, ZmSkeletonListComponent, ZmEmptyStateComponent, TooltipDirective],
  templateUrl: './usuarios-listagem.component.html',
  styleUrl: './usuarios-listagem.component.css',
})
export class UsuariosListagemComponent implements OnInit {
  usuarios: Usuario[] = [];
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';
  desativandoId: number | null = null;

  private usuariosService = inject(UsuariosService);
  private loadingService = inject(LoadingService);
  private auth = inject(AuthService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);
  private currentUserId: number | null = this.auth.getUser()?.id ?? null;

  ngOnInit(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.usuariosService.list());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (list) => {
        this.listaPronta = true;
        this.usuarios = list;
      },
      error: () => {
        this.listaPronta = true;
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

  async desativar(u: Usuario): Promise<void> {
    if (!this.podeDesativar(u)) return;
    const ok = await this.confirm.request({
      title: 'Desativar usuário?',
      messageBefore: 'O usuário ',
      emphasis: u.name ?? u.email ?? String(u.id),
      messageAfter: ' será desativado e perderá o acesso.',
      confirmLabel: 'Sim, desativar',
      variant: 'danger',
    });
    if (!ok) return;
    this.desativandoId = u.id;
    this.usuariosService.delete(u.id).subscribe({
      next: () => {
        this.desativandoId = null;
        this.usuarios = this.usuarios.filter((x) => x.id !== u.id);
        this.toast.success('Usuário desativado', 'O acesso foi revogado.');
      },
      error: () => {
        this.desativandoId = null;
        this.erro = 'Não foi possível desativar o usuário.';
        this.toast.error('Erro', this.erro);
      },
    });
  }
}
