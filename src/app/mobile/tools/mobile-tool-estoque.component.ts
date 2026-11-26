import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GestgoComboboxComponent, type GestgoComboboxOption } from '@/shared/components/combobox';
import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { MobileToolsService, type MobileStockItem } from '../../core/services/mobile-tools.service';
import { ToastService } from '../../core/services/toast.service';
import { injectMobileToolContext } from './mobile-tool-context';

type StockFilter = 'all' | 'attention' | 'ok';

const STATUS_RANK: Record<string, number> = {
  expired: 0,
  expiring: 1,
  low: 2,
  ok: 3,
};

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
  imports: [
    FormsModule,
    RouterLink,
    GestgoCardComponent,
    GestgoComboboxComponent,
    ZmPageBackLinkComponent,
    ...NORD_FORM_IMPORTS,
  ],
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
  readonly saving = signal(false);
  readonly showForm = signal(false);
  readonly items = signal<MobileStockItem[]>([]);
  readonly filter = signal<StockFilter>('all');

  name = '';
  quantityLabel = '';
  quantity: number | null = null;
  expiresOn = '';

  readonly filterOptions: GestgoComboboxOption[] = [
    { value: 'all', label: 'Todos' },
    { value: 'attention', label: 'Precisam atenção' },
    { value: 'ok', label: 'Em dia' },
  ];

  readonly attentionCount = computed(
    () => this.items().filter((i) => i.status !== 'ok').length,
  );

  readonly filtered = computed(() => {
    const f = this.filter();
    let list = [...this.items()];
    if (f === 'attention') list = list.filter((i) => i.status !== 'ok');
    if (f === 'ok') list = list.filter((i) => i.status === 'ok');
    return list.sort((a, b) => {
      const ra = STATUS_RANK[a.status] ?? 9;
      const rb = STATUS_RANK[b.status] ?? 9;
      if (ra !== rb) return ra - rb;
      return a.name.localeCompare(b.name, 'pt-BR');
    });
  });

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

  setFilter(value: string | null): void {
    if (value === 'attention' || value === 'ok' || value === 'all') {
      this.filter.set(value);
    }
  }

  abrirForm(): void {
    this.showForm.set(true);
  }

  fecharForm(): void {
    this.showForm.set(false);
    this.resetForm();
  }

  criar(): void {
    if (!this.name.trim()) {
      this.toast.error('Estoque', 'Informe o nome do item.');
      return;
    }
    this.saving.set(true);
    this.tools
      .createStock({
        name: this.name.trim(),
        quantity_label: this.quantityLabel.trim() || undefined,
        quantity: this.quantity ?? undefined,
        expires_on: this.expiresOn || undefined,
      })
      .subscribe({
        next: (row) => {
          this.items.update((list) => [...list, row]);
          this.saving.set(false);
          this.showForm.set(false);
          this.resetForm();
          this.toast.success('Estoque', 'Item adicionado.');
        },
        error: (err) => {
          this.saving.set(false);
          this.toast.error('Estoque', err?.error?.message || 'Falha.');
        },
      });
  }

  remover(item: MobileStockItem): void {
    if (!window.confirm(`Remover "${item.name}" do estoque?`)) return;
    this.tools.deleteStock(item.id).subscribe({
      next: () => {
        this.items.update((list) => list.filter((i) => i.id !== item.id));
        this.toast.success('Estoque', 'Item removido.');
      },
      error: () => this.toast.error('Estoque', 'Falha ao remover.'),
    });
  }

  statusLabel(s: string): string {
    if (s === 'low') return 'Estoque baixo';
    if (s === 'expiring') return 'Validade próxima';
    if (s === 'expired') return 'Vencido';
    return 'Em dia';
  }

  statusTone(s: string): 'ok' | 'warn' | '' {
    if (s === 'ok') return 'ok';
    if (s === 'low' || s === 'expiring' || s === 'expired') return 'warn';
    return '';
  }

  formatDate(iso?: string | null): string {
    if (!iso) return '';
    const d = new Date(iso.length <= 10 ? `${iso}T12:00:00` : iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  qtyText(item: MobileStockItem): string {
    if (item.quantity_label?.trim()) return item.quantity_label.trim();
    if (item.quantity != null) return String(item.quantity);
    return 'Qtd. não informada';
  }

  onNordInput(ev: Event): string {
    return String((ev.target as HTMLInputElement & { value?: string }).value ?? '');
  }

  onNordNumber(ev: Event): number | null {
    const raw = this.onNordInput(ev).trim();
    if (raw === '') return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }

  private resetForm(): void {
    this.name = '';
    this.quantityLabel = '';
    this.quantity = null;
    this.expiresOn = '';
  }
}
