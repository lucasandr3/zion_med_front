import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MobileToolsService, type MobileStockItem } from '../../core/services/mobile-tools.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-mobile-tool-estoque',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink],
  templateUrl: './mobile-tool-estoque.component.html',
  styleUrls: ['../mobile-shared.css'],
})
export class MobileToolEstoqueComponent implements OnInit {
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
