import { Component, OnInit, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingService, BillingState, PlanoComChave, Subscription } from '../../core/services/billing.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';

@Component({
  selector: 'app-pagina-billing',
  standalone: true,
  imports: [CommonModule, ZmSkeletonListComponent],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css',
})
export class BillingComponent implements OnInit {
  private billingService = inject(BillingService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);

  state: BillingState | null = null;
  planos: PlanoComChave[] = [];
  assinaturaAtiva: Subscription | null = null;
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';
  acaoEmAndamento = false;

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.erro = '';
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.billingService.get());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (data: BillingState) => {
        this.listaPronta = true;
        this.state = data;
        this.planos = Object.entries(data.plans ?? {}).map(([key, p]) => ({ ...p, key }));
        this.assinaturaAtiva =
          data.subscriptions?.find(
            (s) => String(s.status).toLowerCase() === 'active' && s.asaas_subscription_id
          ) ?? null;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Não foi possível carregar os dados da assinatura.';
      },
    });
  }

  get statusAssinatura(): string {
    return this.state?.clinic?.subscription_status ?? this.state?.clinic?.billing_status ?? 'trial';
  }

  get trialAte(): string {
    return '';
  }

  checkout(planKey: string): void {
    this.acaoEmAndamento = true;
    this.erro = '';
    this.billingService.checkout(planKey).subscribe({
      next: (res) => {
        this.acaoEmAndamento = false;
        this.toast.success('Assinatura', res.data?.message ?? 'Assinatura ativa.');
        this.carregar();
      },
      error: (err) => {
        this.acaoEmAndamento = false;
        this.erro = err.error?.message ?? 'Não foi possível assinar.';
        this.toast.error('Erro na assinatura', this.erro);
      },
    });
  }

  async cancelarAssinatura(sub: Subscription): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Cancelar assinatura?',
      message: 'Tem certeza que deseja cancelar esta assinatura? O acesso pode ser encerrado ao fim do período pago.',
      confirmLabel: 'Sim, cancelar',
      variant: 'danger',
    });
    if (!ok) return;
    this.acaoEmAndamento = true;
    this.erro = '';
    this.billingService.cancelSubscription(sub.id).subscribe({
      next: (res) => {
        this.acaoEmAndamento = false;
        this.toast.success('Assinatura cancelada', res.data?.message ?? 'Sua assinatura foi cancelada.');
        this.carregar();
      },
      error: (err) => {
        this.acaoEmAndamento = false;
        this.erro = err.error?.message ?? 'Não foi possível cancelar.';
        this.toast.error('Erro', this.erro);
      },
    });
  }

  async trocarPlano(planKey: string): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Trocar de plano?',
      message: 'A assinatura atual será cancelada e uma nova será criada para o plano selecionado.',
      confirmLabel: 'Sim, trocar plano',
      variant: 'neutral',
    });
    if (!ok) return;
    this.acaoEmAndamento = true;
    this.erro = '';
    this.billingService.changePlan(planKey).subscribe({
      next: (res) => {
        this.acaoEmAndamento = false;
        this.toast.success('Plano alterado', res.data?.message ?? 'O plano foi atualizado.');
        this.carregar();
      },
      error: (err) => {
        this.acaoEmAndamento = false;
        this.erro = err.error?.message ?? 'Não foi possível trocar o plano.';
        this.toast.error('Erro', this.erro);
      },
    });
  }
}
