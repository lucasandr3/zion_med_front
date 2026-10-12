import { Component, OnInit, inject, Signal, ChangeDetectionStrategy, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlataformaService, PlatformInvoice } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';
import { statusFaturaPt } from '../../../core/utils/status-labels-pt';

@Component({
  selector: 'app-plataforma-faturas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ListSkeletonComponent],
  templateUrl: './plataforma-faturas.component.html',
  styleUrl: './plataforma-faturas.component.css',
})
export class PlataformaFaturasComponent implements OnInit {
  protected readonly rotuloStatusFatura = statusFaturaPt;

  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly estadoErro = signal(false);
  readonly faturas = signal<PlatformInvoice[]>([]);

  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getInvoices());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.faturas.set(res.data ?? []);
      },
      error: () => {
        this.listaPronta.set(true);
        this.estadoErro.set(true);
      },
    });
  }

  formatarData(iso?: string | null): string {
    if (!iso) return '—';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return iso;
    }
  }

  formatarValor(valor: number | null | undefined, moeda?: string | null): string {
    if (valor == null) return '—';
    const symbol = moeda === 'BRL' || !moeda ? 'R$' : moeda;
    return symbol + ' ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  badgeVariant(status?: string | null): 'success' | 'warning' | 'danger' | 'neutral' | 'info' {
    const k = (status ?? '').toLowerCase();
    if (['received', 'confirmed', 'paid', 'received_in_cash'].includes(k)) return 'success';
    if (['pending', 'awaiting_risk_analysis'].includes(k)) return 'warning';
    if (['overdue', 'deleted', 'unpaid'].includes(k)) return 'danger';
    return 'neutral';
  }
}
