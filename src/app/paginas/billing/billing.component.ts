import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingService, BillingState, PlanoComChave, Subscription } from '../../core/services/billing.service';
import { LoadingOverlayComponent } from '../../componentes/ui/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-pagina-billing',
  standalone: true,
  imports: [CommonModule, LoadingOverlayComponent],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css',
})
export class BillingComponent implements OnInit {
  private billingService = inject(BillingService);

  state: BillingState | null = null;
  planos: PlanoComChave[] = [];
  assinaturaAtiva: Subscription | null = null;
  carregando = false;
  erro = '';
  acaoEmAndamento = false;
  mensagemSucesso = '';

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.erro = '';
    this.billingService.get().subscribe({
      next: (data: BillingState) => {
        this.state = data;
        this.planos = Object.entries(data.plans ?? {}).map(([key, p]) => ({ ...p, key }));
        this.assinaturaAtiva =
          data.subscriptions?.find(
            (s) => String(s.status).toLowerCase() === 'active' && s.asaas_subscription_id
          ) ?? null;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
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
    this.mensagemSucesso = '';
    this.billingService.checkout(planKey).subscribe({
      next: (res) => {
        this.acaoEmAndamento = false;
        this.mensagemSucesso = res.data?.message ?? 'Assinatura ativa.';
        this.carregar();
      },
      error: (err) => {
        this.acaoEmAndamento = false;
        this.erro = err.error?.message ?? 'Não foi possível assinar.';
      },
    });
  }

  cancelarAssinatura(sub: Subscription): void {
    if (!confirm('Tem certeza que deseja cancelar esta assinatura?')) return;
    this.acaoEmAndamento = true;
    this.mensagemSucesso = '';
    this.erro = '';
    this.billingService.cancelSubscription(sub.id).subscribe({
      next: (res) => {
        this.acaoEmAndamento = false;
        this.mensagemSucesso = res.data?.message ?? 'Assinatura cancelada.';
        this.carregar();
      },
      error: (err) => {
        this.acaoEmAndamento = false;
        this.erro = err.error?.message ?? 'Não foi possível cancelar.';
      },
    });
  }

  trocarPlano(planKey: string): void {
    if (!confirm('Deseja trocar para este plano? A assinatura atual será cancelada e uma nova será criada.')) return;
    this.acaoEmAndamento = true;
    this.mensagemSucesso = '';
    this.erro = '';
    this.billingService.changePlan(planKey).subscribe({
      next: (res) => {
        this.acaoEmAndamento = false;
        this.mensagemSucesso = res.data?.message ?? 'Plano alterado.';
        this.carregar();
      },
      error: (err) => {
        this.acaoEmAndamento = false;
        this.erro = err.error?.message ?? 'Não foi possível trocar o plano.';
      },
    });
  }
}
