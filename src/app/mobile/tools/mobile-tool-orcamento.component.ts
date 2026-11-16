import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { MobileToolsService, type MobileQuote } from '../../core/services/mobile-tools.service';
import { ToastService } from '../../core/services/toast.service';
import { injectMobileToolContext } from './mobile-tool-context';
import { injectToolPersonContext, whatsappShareUrl } from './tool-person-context';
import { ToolPersonBannerComponent } from './tool-person-banner.component';

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
  imports: [
    FormsModule,
    RouterLink,
    GestgoCardComponent,
    ZmPageBackLinkComponent,
    ToolPersonBannerComponent,
  ],
  templateUrl: './mobile-tool-orcamento.component.html',
  styleUrls: ['../mobile-shared.css', './ferramentas-tool-desktop.css'],
})
export class MobileToolOrcamentoComponent implements OnInit {
  private readonly toolCtx = injectMobileToolContext();
  private readonly personCtx = injectToolPersonContext();
  private readonly router = inject(Router);
  private readonly tools = inject(MobileToolsService);
  private readonly toast = inject(ToastService);

  readonly isMobileShell = this.toolCtx.isMobileShell;
  readonly mode = this.toolCtx.mode;
  readonly backLink = this.toolCtx.backLink;
  readonly listLink = this.toolCtx.listLink;
  readonly formLink = this.toolCtx.formLink;

  nome = '';
  phone = '';
  procedimento = '';
  valorSessao = 180;
  sessoes = 3;
  desconto = 0;
  salvar = true;
  linkedNome = '';
  linkedPhone = '';
  personId: number | null = null;

  readonly loading = signal(false);
  readonly historyLoading = signal(true);
  readonly quote = signal<{ total: number; sessions: number; message: string; id?: number | null } | null>(
    null,
  );
  readonly history = signal<MobileQuote[]>([]);

  ngOnInit(): void {
    this.personId = this.personCtx.personId;
    if (this.personCtx.nome) {
      this.nome = this.personCtx.nome;
      this.linkedNome = this.personCtx.nome;
    }
    if (this.personCtx.phone) {
      this.phone = this.personCtx.phone;
      this.linkedPhone = this.personCtx.phone;
    }

    const nav = this.router.getCurrentNavigation()?.extras?.state as { quote?: MobileQuote } | undefined;
    const quoteFromState = nav?.quote || (history.state as { quote?: MobileQuote } | null)?.quote;
    if (quoteFromState && this.mode === 'form') {
      this.applyQuote(quoteFromState);
    }

    if (this.mode === 'list') {
      this.loadHistory();
    }
  }

  personQuery(): Record<string, string> {
    const q: Record<string, string> = {};
    if (this.personId) q['person_id'] = String(this.personId);
    if (this.linkedNome) q['nome'] = this.linkedNome;
    if (this.linkedPhone) q['phone'] = this.linkedPhone;
    return q;
  }

  previewTotal(): number {
    const unit = Number(this.valorSessao) || 0;
    const sessions = Math.max(1, Math.floor(Number(this.sessoes) || 1));
    const discount = Math.max(0, Number(this.desconto) || 0);
    return Math.max(0, unit * sessions - discount);
  }

  loadHistory(): void {
    this.historyLoading.set(true);
    this.tools.quotes().subscribe({
      next: (list) => {
        const all = list || [];
        const filtered = this.personId
          ? all.filter(
              (q) =>
                q.person_id === this.personId ||
                (q.client_name || '').trim().toLowerCase() === this.nome.trim().toLowerCase(),
            )
          : all;
        this.history.set(filtered.slice(0, 30));
        this.historyLoading.set(false);
      },
      error: () => {
        this.history.set([]);
        this.historyLoading.set(false);
      },
    });
  }

  gerar(): void {
    if (!this.nome.trim()) {
      this.toast.error('Orçamento', 'Informe o nome da pessoa.');
      return;
    }
    if (!this.procedimento.trim()) {
      this.toast.error('Orçamento', 'Informe o serviço ou procedimento.');
      return;
    }
    this.loading.set(true);
    this.tools
      .previewQuote({
        client_name: this.nome.trim(),
        procedure: this.procedimento.trim(),
        sessions: Math.max(1, Math.floor(Number(this.sessoes) || 1)),
        unit_price: Number(this.valorSessao) || 0,
        discount: Math.max(0, Number(this.desconto) || 0),
        save: this.salvar,
        person_id: this.personId,
        phone: this.phone.trim() || null,
      })
      .subscribe({
        next: (q) => {
          this.quote.set(q);
          this.loading.set(false);
          if (this.salvar) this.toast.success('Orçamento', 'Proposta salva na clínica.');
        },
        error: (err) => {
          this.loading.set(false);
          this.toast.error('Orçamento', err?.error?.message || 'Confira os valores.');
        },
      });
  }

  reabrir(item: MobileQuote): void {
    void this.router.navigate([this.formLink], {
      queryParams: this.personQuery(),
      state: { quote: item },
    });
  }

  applyQuote(item: MobileQuote): void {
    this.nome = item.client_name || this.nome;
    this.phone = item.phone || this.phone;
    this.procedimento = item.procedure || '';
    this.sessoes = item.sessions || 1;
    this.valorSessao = Number(item.unit_price) || 0;
    this.desconto = Number(item.discount) || 0;
    this.quote.set({
      total: Number(item.total) || 0,
      sessions: item.sessions,
      message: item.message,
      id: item.id,
    });
  }

  async copiar(text?: string): Promise<void> {
    const value = text || this.quote()?.message;
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      this.toast.success('Orçamento', 'Proposta copiada.');
    } catch {
      this.toast.error('Orçamento', 'Não foi possível copiar.');
    }
  }

  whatsapp(item?: MobileQuote): void {
    const text = item?.message || this.quote()?.message;
    if (!text) return;
    const phone = item?.phone || this.phone;
    window.open(whatsappShareUrl(text, phone), '_blank', 'noopener,noreferrer');
  }

  money(n: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n || 0);
  }

  formatDate(raw?: string | null): string {
    if (!raw) return '';
    try {
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(raw));
    } catch {
      return '';
    }
  }
}
