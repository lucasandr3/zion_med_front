import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NavigationHubCard,
  NavigationHubConfig,
  NavigationHubKpi,
} from '../../../../core/config/navigation-hubs.config';
import { AuthService } from '../../../../core/services/auth.service';

export type NavigationHubKpiValues = Record<string, number | null | undefined>;

@Component({
  selector: 'zm-navigation-hub',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './zm-navigation-hub.component.html',
  styleUrl: './zm-navigation-hub.component.css',
})
export class ZmNavigationHubComponent {
  @Input({ required: true }) config!: NavigationHubConfig;
  /** Valores numéricos dos KPIs, indexados pelo `id` definido na config. */
  @Input() kpiValues: NavigationHubKpiValues | null = null;
  @Input() kpisLoading = false;

  private auth = inject(AuthService);

  get visibleCards(): NavigationHubCard[] {
    return (this.config?.cards ?? []).filter((card) => this.cardAllowed(card));
  }

  get visibleKpis(): NavigationHubKpi[] {
    return (this.config?.kpis ?? []).filter((kpi) => this.cardAllowed(kpi));
  }

  private cardAllowed(card: Pick<NavigationHubCard, 'permission' | 'permissionsAny'>): boolean {
    if (card.permission) return this.auth.hasPermission(card.permission);
    if (card.permissionsAny?.length) {
      return card.permissionsAny.some((p) => this.auth.hasPermission(p));
    }
    return true;
  }

  kpiDisplayValue(kpi: NavigationHubKpi): string {
    if (this.kpisLoading) return '—';
    const raw = this.kpiValues?.[kpi.id];
    if (raw == null || Number.isNaN(Number(raw))) return '—';
    return String(Math.max(0, Math.trunc(Number(raw)))).padStart(2, '0');
  }

  routePath(route: string): string {
    return route.split('?')[0] || route;
  }

  routeQueryParams(route: string): Record<string, string> | null {
    const q = route.split('?')[1];
    if (!q) return null;
    const params: Record<string, string> = {};
    for (const part of q.split('&')) {
      const [k, v] = part.split('=');
      if (k) params[decodeURIComponent(k)] = decodeURIComponent(v ?? '');
    }
    return params;
  }
}
