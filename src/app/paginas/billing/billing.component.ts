import { Component, OnInit, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BillingPayment,
  BillingService,
  BillingState,
  BillingType,
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
  formaPagamento: BillingType = 'PIX';
  pixExpandidoId: number | null = null;

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
        const pendentePix = this.pagamentos.find((p) => this.pagamentoPendente(p) && this.temPix(p));
        this.pixExpandidoId = pendentePix?.id ?? null;
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

  get pagamentosPendentes(): BillingPayment[] {
    return this.pagamentos.filter((p) => this.pagamentoPendente(p));
  }

  get temCobrancaPendente(): boolean {
    return this.pagamentosPendentes.length > 0;
  }

  get orientacaoTitulo(): string {
    if (this.mostrarPendenciaPrimeiroPagamento && this.temCobrancaPendente) {
      return 'Conclua o pagamento para ativar sua assinatura';
    }
    if (this.mostrarPendenciaPrimeiroPagamento) {
      return 'Escolha um plano para continuar';
    }
    if (this.mostrarCartaoGerenciado && this.assinaturaAtiva) {
      return 'Sua assinatura está em dia';
    }
    if (this.trialAte) {
      return 'Período de teste em andamento';
    }
    if (this.mostrarSelecaoPlano && !this.assinaturaAtiva) {
      return 'Ative sua assinatura';
    }
    return 'Gerencie sua assinatura';
  }

  get orientacaoDescricao(): string {
    if (this.mostrarPendenciaPrimeiroPagamento && this.temCobrancaPendente) {
      return 'Já existe uma cobrança gerada. Pague com PIX ou boleto na seção abaixo — não é necessário assinar novamente o mesmo plano.';
    }
    if (this.mostrarPendenciaPrimeiroPagamento) {
      return 'Selecione o plano e a forma de pagamento. Depois de confirmar, siga as instruções de PIX ou boleto que aparecerão nesta tela.';
    }
    if (this.mostrarCartaoGerenciado && this.assinaturaAtiva) {
      return 'Acompanhe cobranças, veja a próxima data de cobrança e cancele a assinatura quando precisar.';
    }
    if (this.trialAte) {
      return `Seu teste termina em ${this.trialAte}. Antes dessa data, escolha um plano para não interromper o acesso.`;
    }
    if (this.mostrarSelecaoPlano && !this.assinaturaAtiva) {
      return 'Escolha o plano ideal e defina PIX ou boleto como forma de pagamento recorrente.';
    }
    return 'Acompanhe status, cobranças e planos disponíveis para sua conta.';
  }

  get rotuloSecaoPagamentos(): string {
    return this.temCobrancaPendente ? 'Pagar agora' : 'Cobranças recentes';
  }

  get descricaoSecaoPagamentos(): string {
    if (this.temCobrancaPendente) {
      return 'Use PIX ou boleto para quitar a cobrança pendente abaixo.';
    }
    return 'Histórico das últimas cobranças da sua assinatura.';
  }

  get descricaoSecaoPlanos(): string {
    if (this.mostrarPendenciaPrimeiroPagamento && this.temCobrancaPendente) {
      return 'Para trocar de plano, escolha outra opção. Se o plano desejado já foi assinado, basta pagar a cobrança acima.';
    }
    if (this.mostrarPendenciaPrimeiroPagamento) {
      return 'Escolha como pagar ao confirmar o plano. A cobrança será gerada nesta mesma tela.';
    }
    return 'Defina PIX ou boleto antes de assinar ou trocar de plano.';
  }

  get nomePlanoAtual(): string {
    const key = this.assinaturaAtiva?.plan_key ?? this.state?.organization?.plan_key ?? null;
    if (!key) {
      return '';
    }
    return this.planos.find((p) => p.key === key)?.name ?? key;
  }

  planoAguardandoPagamento(plano: PlanoComChave): boolean {
    return (
      this.mostrarPendenciaPrimeiroPagamento &&
      !!this.assinaturaAtiva &&
      this.assinaturaAtiva.plan_key === plano.key &&
      this.temCobrancaPendente
    );
  }

  rotuloPeriodicidade(plano: PlanoComChave): string {
    const text = `${plano.name} ${plano.description ?? ''}`.toLowerCase();
    if (/anual|\/ano|\bano\b|year|12\s*meses/.test(text)) {
      return '/ano';
    }
    if (/mensal|\/mês|\/mes|\bmês\b|\bmes\b|month/.test(text)) {
      return '/mês';
    }
    return '/mês';
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

  selecionarFormaPagamento(tipo: BillingType): void {
    this.formaPagamento = tipo;
  }

  pagamentoPendente(p: BillingPayment): boolean {
    const st = String(p.status ?? '').toUpperCase();
    return ['PENDING', 'OVERDUE', 'AWAITING_RISK_ANALYSIS'].includes(st);
  }

  temPix(p: BillingPayment): boolean {
    return !!(p.pix_qr_encoded_image || p.pix_copy_paste);
  }

  alternarPix(p: BillingPayment): void {
    this.pixExpandidoId = this.pixExpandidoId === p.id ? null : p.id;
  }

  async copiarPix(codigo: string): Promise<void> {
    const texto = (codigo || '').trim();
    if (!texto) return;
    try {
      await navigator.clipboard.writeText(texto);
      this.toast.success('PIX copiado', 'Cole o código no app do seu banco.');
    } catch {
      this.toast.error('Não foi possível copiar', 'Copie o código manualmente.');
    }
  }

  checkout(planKey: string): void {
    this.acaoEmAndamento = true;
    this.erro = '';
    this.billingService.checkout(planKey, this.formaPagamento).subscribe({
      next: (res) => {
        this.acaoEmAndamento = false;
        this.toast.success(
          'Assinatura criada',
          res.data?.message ?? 'Plano selecionado. Pague a cobrança gerada abaixo para ativar o acesso.'
        );
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
    this.billingService.changePlan(planKey, this.formaPagamento).subscribe({
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
