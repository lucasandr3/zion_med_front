import { Component, OnInit, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrganizationRolesService, OrganizationRoleListItem } from '../../core/services/organization-roles.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { TooltipDirective } from '../../core/directives/tooltip.directive';

@Component({
  selector: 'app-organizacao-papeis-listagem',
  standalone: true,
  imports: [CommonModule, RouterLink, ZmSkeletonListComponent, TooltipDirective],
  templateUrl: './organizacao-papeis-listagem.component.html',
})
export class OrganizacaoPapeisListagemComponent implements OnInit {
  papeis: OrganizationRoleListItem[] = [];
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';
  excluindoSlug: string | null = null;

  private service = inject(OrganizationRolesService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);

  ngOnInit(): void {
    this.carregar();
  }

  private carregar(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.service.list());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (list) => {
        this.listaPronta = true;
        this.papeis = list;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Não foi possível carregar os perfis de permissões.';
      },
    });
  }

  async excluir(p: OrganizationRoleListItem): Promise<void> {
    if (p.is_system) return;
    const ok = await this.confirm.request({
      title: 'Excluir permissões?',
      messageBefore: 'Remover o perfil de permissões ',
      emphasis: p.label,
      messageAfter: '? Só é permitido se nenhum usuário estiver usando.',
      confirmLabel: 'Excluir',
      variant: 'danger',
    });
    if (!ok) return;
    this.excluindoSlug = p.slug;
    this.service.delete(p.slug).subscribe({
      next: () => {
        this.excluindoSlug = null;
        this.toast.success('Permissões removidas', '');
        this.carregar();
      },
      error: (err) => {
        this.excluindoSlug = null;
        const msg = err.error?.message ?? 'Não foi possível excluir.';
        this.toast.error('Erro', typeof msg === 'string' ? msg : 'Tente novamente.');
      },
    });
  }
}
