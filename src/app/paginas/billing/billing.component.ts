import { Component, OnInit, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BillingPayment,
  BillingService,
  BillingState,
  PlanoComChave,
  Subscription,
} from '../../core/services/billing.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmAssinaturaBloqueadaCardComponent } from '../../shared/components/ui/zm-assinatura-bloqueada-card/zm-assinatura-bloqueada-card.component';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { isBillingBlockedError } from '../../core/utils/billing-blocked-error';
import { filterPaymentsWhenSubscriptionCanceled } from '../../core/utils/billing-payments-filter';
import { statusAssinaturaOuCobrancaPt, statusFaturaPt } from '../../core/utils/status-labels-pt';

@Component({
  selector: 'app-pagina-billing',
  standalone: true,
  imports: [CommonModule, ZmSkeletonListComponent, ZmAssinaturaBloqueadaCardComponent],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css',
})
export class BillingComponent implements OnInit {
  protected readonly rotuloStatusFatura = statusFaturaPt;

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
  erroCobrancaBloqueada = false;
  acaoEmAndamento = false;

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.erro = '';
    this.erroCobrancaBloqueada = false;
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.billingService.get());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (data: BillingState) => {
        this.listaPronta = true;
        this.erroCobrancaBloqueada = false;
        this.state = data;
        this.planos = Object.entries(data.plans ?? {}).map(([key, p]) => ({ ...p, key }));
        this.assinaturaAtiva =
          data.subscriptions.find(
            (s) => String(s.status).toLowerCase() === 'active' && s.asaas_subscription_id
          ) ?? null;
      },
      error: (err: unknown) => {
        this.listaPronta = true;
        if (isBillingBlockedError(err)) {
          this.erroCobrancaBloqueada = true;
          this.erro = '';
          return;
        }
        this.erroCobrancaBloqueada = false;
        this.erro = 'Não foi possível carregar os dados da assinatura.';
      },
    });
  }

  get statusAssinatura(): string {
    const o = this.state?.organization ?? this.state?.clinic;
    const raw = o?.subscription_status ?? o?.billing_status ?? 'trial';
    return statusAssinaturaOuCobrancaPt(raw);
  }

  /** Cartão “Assinatura ativa” + cancelar — só quando a API indica gestão normal. */
  get mostrarCartaoGerenciado(): boolean {
    return !!this.state?.billing_ui?.show_managed_subscription_card;
  }

  get mostrarPendenciaPrimeiroPagamento(): boolean {
    return !!this.state?.billing_ui?.show_pending_first_payment;
  }

  get mensagemPendenciaPrimeiroPagamento(): string {
    return this.state?.billing_ui?.pending_first_payment_message ?? '';
  }

  get mostrarSelecaoPlano(): boolean {
    return this.state?.billing_ui?.show_plan_selection !== false;
  }

  get pagamentos(): BillingPayment[] {
    const all = this.state?.payments ?? [];
    return filterPaymentsWhenSubscriptionCanceled(all, {
      subscriptions: this.state?.subscriptions ?? [],
      organization: this.state?.organization ?? this.state?.clinic,
      showPendingFirstPayment: this.mostrarPendenciaPrimeiroPagamento,
    });
  }

  get trialAte(): string {
    const o = this.state?.organization;
    if (!o?.is_on_trial || !o?.trial_ends_at) {
      return '';
    }
    try {
      return new Date(o.trial_ends_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  }

  /** Só “Plano atual” sem botão quando a assinatura está em modo gerenciado (não pendência pós-trial). */
  somenteRotuloPlanoAtual(plano: PlanoComChave): boolean {
    return (
      !!this.assinaturaAtiva &&
      this.assinaturaAtiva.plan_key === plano.key &&
      this.mostrarCartaoGerenciado
    );
  }

  rotuloBotaoPlano(plano: PlanoComChave): string {
    if (!this.assinaturaAtiva) {
      return 'Assinar';
    }
    if (this.mostrarPendenciaPrimeiroPagamento) {
      return this.assinaturaAtiva.plan_key === plano.key ? 'Assinar novamente' : 'Assinar com este plano';
    }
    if (this.assinaturaAtiva.plan_key === plano.key) {
      return 'Assinar';
    }
    return 'Trocar para este plano';
  }

  acaoPlano(plano: PlanoComChave): void {
    if (!this.assinaturaAtiva || this.mostrarPendenciaPrimeiroPagamento) {
      this.checkout(plano.key);
      return;
    }
    this.trocarPlano(plano.key);
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
