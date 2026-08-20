import { Component, OnInit, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import {
  LandingAnalyticsData,
  LandingAnalyticsService,
} from '../../../core/services/landing-analytics.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../../shared/components/skeletons';

@Component({
  selector: 'app-plataforma-trafico-landing',
  standalone: true,
  imports: [RouterLink, ZardCardComponent, ZmSkeletonListComponent],
  templateUrl: './plataforma-trafico-landing.component.html',
  styleUrl: './plataforma-trafico-landing.component.css',
})
export class PlataformaTraficoLandingComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  estadoErro = false;
  atualizando = false;
  stats: LandingAnalyticsData | null = null;

  private landingAnalytics = inject(LandingAnalyticsService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.landingAnalytics.getStats());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.stats = res.data;
      },
      error: () => {
        this.listaPronta = true;
        this.estadoErro = true;
      },
    });
  }

  atualizar(): void {
    if (this.atualizando) return;
    this.atualizando = true;
    this.landingAnalytics.getStats().subscribe({
      next: (res) => {
        this.atualizando = false;
        this.stats = res.data;
      },
      error: () => {
        this.atualizando = false;
        this.estadoErro = true;
      },
    });
  }

  get diasVisitas(): { date: string; label: string; count: number; percent: number; ghost: boolean }[] {
    return this.buildChartDays(this.stats?.views_per_day);
  }

  get diasCliques(): { date: string; label: string; count: number; percent: number; ghost: boolean }[] {
    return this.buildChartDays(this.stats?.clicks_per_day);
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
    const counts = entries.map(([, v]) => Number(v) || 0);
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
