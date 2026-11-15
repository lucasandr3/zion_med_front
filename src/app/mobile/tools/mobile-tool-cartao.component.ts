import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { MobileToolsService } from '../../core/services/mobile-tools.service';
import { ToastService } from '../../core/services/toast.service';
import { injectMobileToolContext } from './mobile-tool-context';

@Component({
  selector: 'app-mobile-tool-cartao',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    '[class.n-page]': '!isMobileShell',
    '[class.n-page--flush]': '!isMobileShell',
    '[class.gm-tool--desktop]': '!isMobileShell',
  },
  imports: [FormsModule, RouterLink, GestgoCardComponent, ZmPageBackLinkComponent],
  templateUrl: './mobile-tool-cartao.component.html',
  styleUrls: ['../mobile-shared.css', './ferramentas-tool-desktop.css'],
})
export class MobileToolCartaoComponent {
  private readonly toolCtx = injectMobileToolContext();
  readonly isMobileShell = this.toolCtx.isMobileShell;
  readonly backLink = this.toolCtx.backLink;

  private readonly tools = inject(MobileToolsService);
  private readonly toast = inject(ToastService);

  amount = 600;
  fee = 6.1;
  installments = 3;
  readonly loading = signal(false);
  readonly result = signal<{ net: number; fee: number; installments: number } | null>(null);

  setInstallments(n: number): void {
    this.installments = n;
    this.fee = ({ 1: 3.2, 3: 6.1, 6: 9.5, 12: 15 } as Record<number, number>)[n] ?? this.fee;
    this.result.set(null);
  }

  calcular(): void {
    this.loading.set(true);
    this.tools
      .calculateCard({
        amount: Number(this.amount),
        fee_percent: Number(this.fee),
        installments: this.installments,
      })
      .subscribe({
        next: (r) => {
          this.result.set(r);
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          this.toast.error('Taxas', err?.error?.message || 'Verifique os valores.');
        },
      });
  }

  money(n: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n || 0);
  }
}
