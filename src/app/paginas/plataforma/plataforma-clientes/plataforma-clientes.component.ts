import { Component, OnInit, inject, Signal, ChangeDetectionStrategy, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlataformaService, PlatformTenant } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';
import { statusAssinaturaOuCobrancaPt } from '../../../core/utils/status-labels-pt';

@Component({
  selector: 'app-plataforma-clientes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterLink, ListSkeletonComponent],
  templateUrl: './plataforma-clientes.component.html',
  styleUrl: './plataforma-clientes.component.css',
})
export class PlataformaClientesComponent implements OnInit {
  protected readonly rotuloStatusAssinaturaCobranca = statusAssinaturaOuCobrancaPt;

  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly estadoErro = signal(false);
  readonly tenants = signal<PlatformTenant[]>([]);

  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getTenants());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.tenants.set(res.data ?? []);
      },
      error: () => {
        this.listaPronta.set(true);
        this.estadoErro.set(true);
      },
    });
  }

  planosRotulo(tenant: PlatformTenant): string {
    const plans = tenant.active_plans ?? [];
    if (plans.length === 0) return '—';
    return plans.join(', ');
  }

  badgeVariant(status?: string | null): 'success' | 'warning' | 'danger' | 'neutral' | 'info' {
    const k = (status ?? '').toLowerCase();
    if (['active', 'ok'].includes(k)) return 'success';
    if (['trial', 'attention', 'past_due'].includes(k)) return 'warning';
    if (['blocked', 'inactive'].includes(k)) return 'danger';
    return 'neutral';
  }
}
