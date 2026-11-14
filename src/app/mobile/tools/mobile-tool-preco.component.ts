import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MobileToolsService } from '../../core/services/mobile-tools.service';

@Component({
  selector: 'app-mobile-tool-preco',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink],
  templateUrl: './mobile-tool-preco.component.html',
  styleUrls: ['../mobile-shared.css'],
})
export class MobileToolPrecoComponent {
  private readonly tools = inject(MobileToolsService);

  materiais = 80;
  minutos = 60;
  valorHora = 50;
  taxa = 4;
  margem = 25;

  readonly loading = signal(false);
  readonly result = signal<{ price: number; cost: number; fee: number; profit: number } | null>(null);
  readonly error = signal<string | null>(null);

  calcular(): void {
    this.error.set(null);
    this.result.set(null);
    this.loading.set(true);
    this.tools
      .calculatePrice({
        materials: Number(this.materiais),
        minutes: Number(this.minutos),
        hourly_rate: Number(this.valorHora),
        fee_percent: Number(this.taxa),
        margin_percent: Number(this.margem),
      })
      .subscribe({
        next: (r) => {
          this.result.set(r);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err?.error?.message || 'Não foi possível calcular.');
          this.loading.set(false);
        },
      });
  }

  money(n: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n || 0);
  }
}
