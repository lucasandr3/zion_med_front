import { Component, OnInit, inject, ChangeDetectionStrategy, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { OrganizationRolesService, OrganizationRoleListItem } from '../../core/services/organization-roles.service';
import { ListSkeletonComponent } from '../../shared/components/list-skeleton/list-skeleton.component';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';

@Component({
  selector: 'app-organizacao-papeis-listagem',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { class: 'n-page-list' },
  imports: [
    RouterLink,
    ListSkeletonComponent,
    ZmPageBackLinkComponent,
  ],
  templateUrl: './organizacao-papeis-listagem.component.html',
})
export class OrganizacaoPapeisListagemComponent implements OnInit {
  readonly papeis = signal<OrganizationRoleListItem[]>([]);
  readonly carregando = signal(true);
  readonly erro = signal('');
  readonly excluindoSlug = signal<string | null>(null);

  private service = inject(OrganizationRolesService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);

  ngOnInit(): void {
    this.carregar();
  }

  private carregar(): void {
    this.carregando.set(true);
    this.erro.set('');
    this.service
      .list()
      .pipe(finalize(() => this.carregando.set(false)))
      .subscribe({
        next: (list) => this.papeis.set(list ?? []),
        error: () => this.erro.set('Não foi possível carregar os perfis de permissões.'),
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
