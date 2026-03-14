import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingService, BillingState, Plano } from '../../core/services/billing.service';
import { LoadingOverlayComponent } from '../../componentes/ui/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-pagina-billing',
  standalone: true,
  imports: [CommonModule, LoadingOverlayComponent],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css',
})
export class BillingComponent implements OnInit {
  statusAssinatura = 'trial';
  trialAte = '';
  planos: Plano[] = [];
  carregando = false;
  erro = '';
  private billingService = inject(BillingService);

  ngOnInit(): void {
    this.carregando = true;
    this.billingService.get().subscribe({
      next: (data: BillingState) => {
        this.carregando = false;
        this.statusAssinatura = data.status ?? 'trial';
        this.trialAte = data.trial_ends_at ?? '';
        this.planos = data.plans ?? [];
      },
      error: () => {
        this.carregando = false;
        this.erro = 'Não foi possível carregar os dados da assinatura.';
      },
    });
  }

  checkout(planId: number): void {
    this.billingService.checkout(planId).subscribe({
      next: (res) => {
        const url = res.data?.url;
        if (url) window.location.href = url;
      },
    });
  }
}
