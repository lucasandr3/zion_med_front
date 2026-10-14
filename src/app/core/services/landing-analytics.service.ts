import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface LandingAnalyticsPathRow {
  path: string;
  unique_visitors: number;
}

export interface LandingAnalyticsClickRow {
  kind: 'cta';
  channel: string;
  label: string;
  total_clicks: number;
  total_last_30: number;
}

export interface LandingAnalyticsData {
  visitas_hoje: number;
  total_views: number;
  unique_visitors_last_30: number;
  total_clicks: number;
  total_clicks_last_30: number;
  taxa_clique: number;
  clicks_per_day: Record<string, number>;
  views_per_day: Record<string, number>;
  path_breakdown: LandingAnalyticsPathRow[];
  peak_day_label: string | null;
  click_breakdown: LandingAnalyticsClickRow[];
}

export interface ProductFunnelAbandonmentRow {
  organization_id: number;
  last_event: string;
  occurred_at: string;
  niche?: string | null;
}

export interface ProductFunnelData {
  days: number;
  totals: Record<string, number>;
  by_day: { date: string; counts: Record<string, number> }[];
  abandonment?: ProductFunnelAbandonmentRow[];
}

@Injectable({ providedIn: 'root' })
export class LandingAnalyticsService {
  private api = inject(ApiService);

  getStats(): Observable<{ data: LandingAnalyticsData }> {
    return this.api.get<{ data: LandingAnalyticsData }>('/platform/landing-analytics');
  }

  getProductFunnel(days = 30): Observable<{ data: ProductFunnelData }> {
    return this.api.get<{ data: ProductFunnelData }>(`/platform/product-funnel?days=${days}`);
  }
}
