import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MobileToolsService, type MobileFollowup } from '../../core/services/mobile-tools.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-mobile-tool-retornos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink],
  templateUrl: './mobile-tool-retornos.component.html',
  styleUrls: ['../mobile-shared.css'],
})
export class MobileToolRetornosComponent implements OnInit {
  private readonly tools = inject(MobileToolsService);
  private readonly toast = inject(ToastService);

  readonly loading = signal(true);
  readonly items = signal<MobileFollowup[]>([]);
  clientName = '';
  detail = '';

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.loading.set(true);
    this.tools.followups().subscribe({
      next: (list) => {
        this.items.set(list || []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Retornos', 'Não foi possível carregar.');
      },
    });
  }

  criar(): void {
    if (!this.clientName.trim() || !this.detail.trim()) {
      this.toast.error('Retornos', 'Informe nome e detalhe.');
      return;
    }
    this.tools
      .createFollowup({ client_name: this.clientName.trim(), detail: this.detail.trim() })
      .subscribe({
        next: (row) => {
          this.items.update((list) => [row, ...list]);
          this.clientName = '';
          this.detail = '';
          this.toast.success('Retornos', 'Adicionado.');
        },
        error: (err) => this.toast.error('Retornos', err?.error?.message || 'Falha.'),
      });
  }

  toggle(id: number): void {
    this.tools.toggleFollowup(id).subscribe({
      next: (row) => this.items.update((list) => list.map((i) => (i.id === row.id ? row : i))),
      error: () => this.toast.error('Retornos', 'Falha ao atualizar.'),
    });
  }

  whatsapp(item: MobileFollowup): void {
    const text = `Olá, ${item.client_name}! ${item.detail}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }
}
