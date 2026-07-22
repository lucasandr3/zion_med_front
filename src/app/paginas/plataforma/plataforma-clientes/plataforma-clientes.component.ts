import { Component, OnInit, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PlataformaService, PlatformTenant } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../../shared/components/skeletons';
import { DataTableComponent, BadgeComponent, ZionEmptyStateComponent, type StatusTone } from '../../../shared/components/zion';
import { statusAssinaturaOuCobrancaPt } from '../../../core/utils/status-labels-pt';

@Component({
  selector: 'app-plataforma-clientes',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    ZmSkeletonListComponent,
    DataTableComponent,
    BadgeComponent,
    ZionEmptyStateComponent,
  ],
  templateUrl: './plataforma-clientes.component.html',
  styleUrl: './plataforma-clientes.component.css',
})
export class PlataformaClientesComponent implements OnInit {
  protected readonly rotuloStatusAssinaturaCobranca = statusAssinaturaOuCobrancaPt;

  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  estadoErro = false;
  tenants: PlatformTenant[] = [];

  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getTenants());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.tenants = res.data ?? [];
      },
      error: () => {
        this.listaPronta = true;
        this.estadoErro = true;
      },
    });
  }

  iniciais(nome: string): string {
    const partes = (nome || '').trim().split(/\s+/).filter(Boolean);
    if (partes.length === 0) return '?';
    if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
    return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
  }

  planosRotulo(tenant: PlatformTenant): string {
    const plans = tenant.active_plans ?? [];
    if (plans.length === 0) return '—';
    return plans.join(', ');
  }

  badgeTone(status?: string | null): StatusTone {
    const k = (status ?? '').toLowerCase();
    if (['active', 'ok'].includes(k)) return 'published';
    if (['trial', 'attention', 'past_due'].includes(k)) return 'draft';
    if (['blocked', 'inactive'].includes(k)) return 'archived';
    return 'default';
  }
}
