import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlataformaService, PlatformPlan } from '../../../core/services/plataforma.service';
import { PlataformaHeaderService } from '../../../core/services/plataforma-header.service';
import { LoadingOverlayComponent } from '../../../componentes/ui/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-plataforma-planos',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingOverlayComponent],
  templateUrl: './plataforma-planos.component.html',
  styleUrl: './plataforma-planos.component.css',
})
export class PlataformaPlanosComponent implements OnInit, OnDestroy {
  estadoCarregando = false;
  estadoErro = false;
  planos: PlatformPlan[] = [];

  private plataformaService = inject(PlataformaService);
  private headerService = inject(PlataformaHeaderService);

  ngOnInit(): void {
    this.estadoCarregando = true;
    this.plataformaService.getPlans().subscribe({
      next: (res) => {
        this.estadoCarregando = false;
        this.planos = res.data ?? [];
        const trialDays = res.trial_days ?? 14;
        this.headerService.setHeader(
          'Planos',
          'Planos disponíveis para assinatura. Trial padrão: ' + trialDays + ' dias.'
        );
      },
      error: () => {
        this.estadoCarregando = false;
        this.estadoErro = true;
      },
    });
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

  excluir(p: PlatformPlan): void {
    if (!confirm('Remover este plano?')) return;
    this.plataformaService.deletePlan(p.id).subscribe({
      next: () => this.carregar(),
      error: () => this.estadoErro = true,
    });
  }

  private carregar(): void {
    this.estadoCarregando = true;
    this.plataformaService.getPlans().subscribe({
      next: (res) => {
        this.estadoCarregando = false;
        this.planos = res.data ?? [];
      },
      error: () => {
        this.estadoCarregando = false;
        this.estadoErro = true;
      },
    });
  }
}
