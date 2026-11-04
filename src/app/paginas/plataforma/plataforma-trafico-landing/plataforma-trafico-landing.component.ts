import { Component, OnInit, inject, Signal, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GestgoCardComponent } from '@/shared/components/card/card.component';
import {
  LandingAnalyticsData,
  LandingAnalyticsService,
  ProductFunnelData,
} from '../../../core/services/landing-analytics.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../../shared/components/skeletons';
import { catchError, forkJoin, of } from 'rxjs';

const FUNNEL_LABELS: Record<string, string> = {
  signup_completed: 'Cadastros',
  email_verified: 'E-mail verificado',
  trial_started: 'Trial iniciado',
  template_created: 'Modelo criado',
  template_published: 'Modelo publicado',
  first_form_shared: 'Primeiro envio',
  first_protocol_completed: 'Primeiro protocolo',
  checkout_started: 'Checkout iniciado',
  checkout_failed: 'Checkout falhou',
  payment_confirmed: 'Pagamento confirmado',
  subscription_cancelled: 'Cancelamentos',
};

const FUNNEL_ORDER = [
  'signup_completed',
  'email_verified',
  'trial_started',
  'template_created',
  'template_published',
  'first_form_shared',
  'first_protocol_completed',
  'checkout_started',
  'payment_confirmed',
  'checkout_failed',
  'subscription_cancelled',
];

@Component({
  selector: 'app-plataforma-trafico-landing',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, GestgoCardComponent, ZmSkeletonListComponent],
  templateUrl: './plataforma-trafico-landing.component.html',
  styleUrl: './plataforma-trafico-landing.component.css',
})
export class PlataformaTraficoLandingComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly estadoErro = signal(false);
  readonly atualizando = signal(false);
  readonly stats = signal<LandingAnalyticsData | null>(null);
  readonly funnel = signal<ProductFunnelData | null>(null);

  private landingAnalytics = inject(LandingAnalyticsService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
      forkJoin({
        landing: this.landingAnalytics.getStats(),
        funnel: this.landingAnalytics.getProductFunnel(30).pipe(
          catchError(() => of({ data: null as ProductFunnelData | null })),
        ),
      }),
    );
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.stats.set(res.landing.data);
        this.funnel.set(res.funnel.data ?? null);
      },
      error: () => {
        this.listaPronta.set(true);
        this.estadoErro.set(true);
      },
    });
  }

  atualizar(): void {
    if (this.atualizando()) return;
    this.atualizando.set(true);
    forkJoin({
      landing: this.landingAnalytics.getStats(),
      funnel: this.landingAnalytics.getProductFunnel(30).pipe(
        catchError(() => of({ data: null as ProductFunnelData | null })),
      ),
    }).subscribe({
      next: (res) => {
        this.atualizando.set(false);
        this.stats.set(res.landing.data);
        this.funnel.set(res.funnel.data ?? null);
      },
      error: () => {
        this.atualizando.set(false);
        this.estadoErro.set(true);
      },
    });
  }

  get funilEtapas(): { key: string; label: string; count: number }[] {
    const totals = this.funnel()?.totals ?? {};
    return FUNNEL_ORDER.map((key) => ({
      key,
      label: FUNNEL_LABELS[key] ?? key,
      count: Number(totals[key] ?? 0),
    }));
  }

  get abandonoRecente(): { organization_id: number; last_event: string; label: string; niche: string; when: string }[] {
    const rows = this.funnel()?.abandonment ?? [];
    return rows.slice(0, 12).map((r) => ({
      organization_id: r.organization_id,
      last_event: r.last_event,
      label: FUNNEL_LABELS[r.last_event] ?? r.last_event,
      niche: r.niche || '—',
      when: r.occurred_at ? new Date(r.occurred_at).toLocaleString('pt-BR') : '—',
    }));
  }

  get diasVisitas(): { date: string; label: string; count: number; percent: number; ghost: boolean }[] {
    return this.buildChartDays(this.stats()?.views_per_day);
  }

  get diasCliques(): { date: string; label: string; count: number; percent: number; ghost: boolean }[] {
    return this.buildChartDays(this.stats()?.clicks_per_day);
  }

  private buildChartDays(source?: Record<string, number>): {
    date: string;
    label: string;
    count: number;
    percent: number;
    ghost: boolean;
  }[] {
    if (!source) return [];
    const entries = Object.entries(source);
    if (!entries.length) return [];
    entries.sort(([a], [b]) => a.localeCompare(b));
    const counts = entries.map(([ v]) => Number(v) || 0);
    const maxVal = Math.max(...counts);
    const dayLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    return entries.map(([date, countVal]) => {
      const c = Number(countVal) || 0;
      const d = this.parseStatsDate(date);
      const dow = d.getDay() === 0 ? 7 : d.getDay();
      const label = dayLabels[dow - 1] ?? date;
      const ghost = maxVal === 0;
      const percent = ghost ? 18 : Math.round((c / maxVal) * 100);
      return { date, label, count: c, percent, ghost };
    });
  }

  private parseStatsDate(date: string): Date {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return new Date(`${date}T12:00:00`);
    }
    return new Date(date);
  }
}
