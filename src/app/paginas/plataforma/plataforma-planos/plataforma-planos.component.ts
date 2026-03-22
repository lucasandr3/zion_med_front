import { Component, OnInit, OnDestroy, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlataformaService, PlatformPlan } from '../../../core/services/plataforma.service';
import { PlataformaHeaderService } from '../../../core/services/plataforma-header.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../../shared/components/skeletons';
import { ToastService } from '../../../core/services/toast.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';

@Component({
  selector: 'app-plataforma-planos',
  standalone: true,
  imports: [CommonModule, RouterLink, ZmSkeletonListComponent],
  templateUrl: './plataforma-planos.component.html',
  styleUrl: './plataforma-planos.component.css',
})
export class PlataformaPlanosComponent implements OnInit, OnDestroy {
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  estadoErro = false;
  planos: PlatformPlan[] = [];
  excluindoId: string | number | null = null;

  private plataformaService = inject(PlataformaService);
  private headerService = inject(PlataformaHeaderService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);

  ngOnInit(): void {
    this.carregar(true);
  }

  ngOnDestroy(): void {
    this.headerService.clearHeader();
  }

  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  btnExcluirHover(el: Event, enter: boolean): void {
    const target = el.target as HTMLElement;
    if (enter) {
      target.style.color = '#ef4444';
      target.style.borderColor = '#ef4444';
    } else {
      target.style.color = 'var(--c-muted)';
      target.style.borderColor = 'var(--c-border)';
    }
  }

  async excluir(p: PlatformPlan): Promise<void> {
    const nome = p.name?.trim() || String(p.key);
    const ok = await this.confirm.request({
      title: 'Remover plano?',
      messageBefore: 'O plano ',
      emphasis: nome,
      messageAfter: ' será removido permanentemente.',
      confirmLabel: 'Sim, remover',
      variant: 'danger',
    });
    if (!ok) return;
    this.excluindoId = p.id;
    this.plataformaService.deletePlan(p.id).subscribe({
      next: () => {
        this.excluindoId = null;
        this.carregar(false);
        this.toast.success('Plano removido', `${nome} foi excluído.`);
      },
      error: () => {
        this.excluindoId = null;
        this.estadoErro = true;
        this.toast.error('Erro', 'Não foi possível remover o plano.');
      },
    });
  }

  private carregar(setHeader: boolean): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getPlans());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.estadoErro = false;
        this.planos = res.data ?? [];
        if (setHeader) {
          const trialDays = res.trial_days ?? 14;
          this.headerService.setHeader(
            'Planos',
            'Planos disponíveis para assinatura. Trial padrão: ' + trialDays + ' dias.',
          );
        }
      },
      error: () => {
        this.listaPronta = true;
        this.estadoErro = true;
      },
    });
  }
}
