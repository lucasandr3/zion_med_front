import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { MobileToolsService, type MobileStockItem } from '../../core/services/mobile-tools.service';
import { ToastService } from '../../core/services/toast.service';
import { injectMobileToolContext } from './mobile-tool-context';

@Component({
  selector: 'app-mobile-tool-estoque',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    '[class.n-page]': '!isMobileShell',
    '[class.n-page--flush]': '!isMobileShell',
    '[class.gm-tool--desktop]': '!isMobileShell',
  },
  imports: [FormsModule, RouterLink, GestgoCardComponent, ZmPageBackLinkComponent, ...NORD_FORM_IMPORTS],
  templateUrl: './mobile-tool-estoque.component.html',
  styleUrls: ['../mobile-shared.css', './ferramentas-tool-desktop.css'],
})
export class MobileToolEstoqueComponent implements OnInit {
  private readonly toolCtx = injectMobileToolContext();
  readonly isMobileShell = this.toolCtx.isMobileShell;
  readonly backLink = this.toolCtx.backLink;

  private readonly tools = inject(MobileToolsService);
  private readonly toast = inject(ToastService);

  readonly loading = signal(true);
  readonly items = signal<MobileStockItem[]>([]);
  name = '';
  quantityLabel = '';
  quantity: number | null = null;
  expiresOn = '';

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.loading.set(true);
    this.tools.stock().subscribe({
      next: (list) => {
        this.items.set(list || []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Estoque', 'Não foi possível carregar.');
      },
    });
  }

  criar(): void {
    if (!this.name.trim()) {
      this.toast.error('Estoque', 'Informe o nome do item.');
      return;
    }
    this.tools
      .createStock({
        name: this.name.trim(),
        quantity_label: this.quantityLabel.trim() || undefined,
        quantity: this.quantity ?? undefined,
        expires_on: this.expiresOn || undefined,
      })
      .subscribe({
        next: (row) => {
          this.items.update((list) => [...list, row].sort((a, b) => a.name.localeCompare(b.name)));
          this.name = '';
          this.quantityLabel = '';
          this.quantity = null;
          this.expiresOn = '';
          this.toast.success('Estoque', 'Item adicionado.');
        },
        error: (err) => this.toast.error('Estoque', err?.error?.message || 'Falha.'),
      });
  }

  remover(id: number): void {
    this.tools.deleteStock(id).subscribe({
      next: () => this.items.update((list) => list.filter((i) => i.id !== id)),
      error: () => this.toast.error('Estoque', 'Falha ao remover.'),
    });
  }

  statusLabel(s: string): string {
    if (s === 'low') return 'Estoque baixo';
    if (s === 'expiring') return 'Conferir validade';
    if (s === 'expired') return 'Vencido';
    return 'Em dia';
  }
}
