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
  selector: 'app-mobile-tool-orcamento',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    '[class.n-page]': '!isMobileShell',
    '[class.n-page--flush]': '!isMobileShell',
    '[class.gm-tool--desktop]': '!isMobileShell',
  },
  imports: [FormsModule, RouterLink, GestgoCardComponent, ZmPageBackLinkComponent],
  templateUrl: './mobile-tool-orcamento.component.html',
  styleUrls: ['../mobile-shared.css', './ferramentas-tool-desktop.css'],
})
export class MobileToolOrcamentoComponent {
  private readonly toolCtx = injectMobileToolContext();
  readonly isMobileShell = this.toolCtx.isMobileShell;
  readonly backLink = this.toolCtx.backLink;

  private readonly tools = inject(MobileToolsService);
  private readonly toast = inject(ToastService);

  nome = '';
  procedimento = '';
  valorSessao = 180;
  sessoes = 3;
  desconto = 0;
  salvar = false;

  readonly loading = signal(false);
  readonly quote = signal<{ total: number; sessions: number; message: string } | null>(null);

  gerar(): void {
    this.loading.set(true);
    this.tools
      .previewQuote({
        client_name: this.nome,
        procedure: this.procedimento,
        sessions: Math.floor(Number(this.sessoes)),
        unit_price: Number(this.valorSessao),
        discount: Number(this.desconto),
        save: this.salvar,
      })
      .subscribe({
        next: (q) => {
          this.quote.set(q);
          this.loading.set(false);
          if (this.salvar) this.toast.success('Orçamento', 'Proposta salva.');
        },
        error: (err) => {
          this.loading.set(false);
          this.toast.error('Orçamento', err?.error?.message || 'Confira os valores.');
        },
      });
  }

  async copiar(): Promise<void> {
    const text = this.quote()?.message;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      this.toast.success('Orçamento', 'Mensagem copiada.');
    } catch {
      this.toast.error('Orçamento', 'Não foi possível copiar.');
    }
  }

  whatsapp(): void {
    const text = this.quote()?.message;
    if (!text) return;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }

  money(n: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n || 0);
  }
}
