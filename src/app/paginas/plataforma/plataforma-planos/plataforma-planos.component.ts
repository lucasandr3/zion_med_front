import { Component, OnInit, OnDestroy, inject, Signal, ChangeDetectionStrategy, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GestgoCardComponent } from '@/shared/components/card/card.component';

import { GestgoBadgeComponent } from '@/shared/components/badge/badge.component';
import { PlataformaService, PlatformPlan } from '../../../core/services/plataforma.service';
import { PlataformaHeaderService } from '../../../core/services/plataforma-header.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';
import { ToastService } from '../../../core/services/toast.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-plataforma-planos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page' },
  imports: [RouterLink, GestgoCardComponent, GestgoBadgeComponent, ListSkeletonComponent],
  templateUrl: './plataforma-planos.component.html',
  styleUrl: './plataforma-planos.component.css',
})
export class PlataformaPlanosComponent implements OnInit, OnDestroy {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly estadoErro = signal(false);
  readonly planos = signal<PlatformPlan[]>([]);
  readonly excluindoId = signal<string | number | null>(null);

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
    this.excluindoId.set(p.id);
    this.plataformaService.deletePlan(p.id).subscribe({
      next: () => {
        this.excluindoId.set(null);
        this.carregar(false);
        this.toast.success('Plano removido', `${nome} foi excluído.`);
      },
      error: () => {
        this.excluindoId.set(null);
        this.estadoErro.set(true);
        this.toast.error('Erro', 'Não foi possível remover o plano.');
      },
    });
  }

  private carregar(setHeader: boolean): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getPlans());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.estadoErro.set(false);
        this.planos.set(res.data ?? []);
        if (setHeader) {
          const trialDays = res.trial_days ?? 14;
          this.headerService.setHeader(
            'Planos',
            'Planos disponíveis para assinatura. Trial padrão: ' + trialDays + ' dias.',
          );
        }
      },
      error: () => {
        this.listaPronta.set(true);
        this.estadoErro.set(true);
      },
    });
  }
}
