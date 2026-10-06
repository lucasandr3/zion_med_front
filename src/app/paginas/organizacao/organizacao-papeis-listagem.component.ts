import { Component, OnInit, inject, Signal, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrganizationRolesService, OrganizationRoleListItem } from '../../core/services/organization-roles.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonPermissoesListagemComponent } from '../../shared/components/skeletons';
import { ZmEmptyStateComponent, ZmPageBackLinkComponent } from '../../shared/components/ui';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { ZardTooltipImports } from '@/shared/components/tooltip';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardTableImports } from '@/shared/components/table';

@Component({
  selector: 'app-organizacao-papeis-listagem',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ...ZardTableImports,
    RouterLink,
    ZmSkeletonPermissoesListagemComponent,
    ZmEmptyStateComponent,
    ZmPageBackLinkComponent,
    ...ZardTooltipImports,
    ZardCardComponent,
    ZardButtonComponent,
    ZardBadgeComponent,
  ],
  templateUrl: './organizacao-papeis-listagem.component.html',
})
export class OrganizacaoPapeisListagemComponent implements OnInit {
  readonly papeis = signal<OrganizationRoleListItem[]>([]);
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly erro = signal('');
  readonly excluindoSlug = signal<string | null>(null);

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
        this.listaPronta.set(true);
        this.papeis.set(list);
      },
      error: () => {
        this.listaPronta.set(true);
        this.erro.set('Não foi possível carregar os perfis de permissões.');
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
    this.excluindoSlug.set(p.slug);
    this.service.delete(p.slug).subscribe({
      next: () => {
        this.excluindoSlug.set(null);
        this.toast.success('Permissões removidas', '');
        this.carregar();
      },
      error: (err) => {
        this.excluindoSlug.set(null);
        const msg = err.error?.message ?? 'Não foi possível excluir.';
        this.toast.error('Erro', typeof msg === 'string' ? msg : 'Tente novamente.');
      },
    });
  }
}
