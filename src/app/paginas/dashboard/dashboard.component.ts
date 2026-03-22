import { Component, OnInit, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap, map, catchError, of } from 'rxjs';
import { DashboardService } from '../../core/services/dashboard.service';
import { TemplatesService, Template } from '../../core/services/templates.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonDashboardComponent } from '../../shared/components/skeletons';

/** Rótulos de categoria (alinhado a templates-listagem) */
const CATEGORY_LABELS: Record<string, string> = {
  personalizado: 'Personalizado',
  geral: 'Geral',
  clinica_medica: 'Clínica médica',
  odontologia: 'Odontologia',
  estetica: 'Estética / Harmonização',
  fisioterapia: 'Fisioterapia',
  psicologia: 'Psicologia / Psiquiatria',
  pediatria: 'Pediatria',
  ginecologia: 'Ginecologia / Obstetrícia',
  oftalmologia: 'Oftalmologia',
  dermatologia: 'Dermatologia',
  laboratorio: 'Laboratório / Coleta',
};

export interface UltimoTemplateRow {
  id: number;
  name: string;
  created_at: string;
  created_label: string;
  is_active: boolean;
}

@Component({
  selector: 'app-pagina-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, ZmSkeletonDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  dashReady = false;
  estadoErro = false;
  mensagemErro = '';
  semClinica = false;
  pendentesHoje = 0;
  totalTemplates = 0;
  ultimos7Dias = 0;
  ultimos30Dias = 0;
  linksPublicosCount = 0;
  porStatus: { pending: number; approved: number; rejected: number } = { pending: 0, approved: 0, rejected: 0 };
  ultimosTemplates: UltimoTemplateRow[] = [];
  /** Ordenado por quantidade (maior primeiro) */
  categoriasResumo: { key: string; label: string; count: number }[] = [];

  private dashboardService = inject(DashboardService);
  private templatesService = inject(TemplatesService);
  private loadingService = inject(LoadingService);

  get totalStatus(): number {
    return this.porStatus.pending + this.porStatus.approved + this.porStatus.rejected;
  }

  ngOnInit(): void {
    const dashboard$ = this.dashboardService.getDashboard().pipe(
      switchMap((dash) => {
        if (dash.sem_clinica) {
          return of({ dash, templates: [] as Template[] });
        }
        return this.templatesService.list().pipe(
          map((templates) => ({ dash, templates })),
          catchError(() => of({ dash, templates: [] as Template[] })),
        );
      }),
    );

    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(dashboard$);
    this.showSkeleton = showSkeleton;

    data$.subscribe({
      next: ({ dash, templates }) => {
        this.dashReady = true;
        this.estadoErro = false;
        this.semClinica = dash.sem_clinica;
        this.pendentesHoje = dash.pendentes_hoje ?? 0;
        this.ultimos7Dias = dash.ultimos_7_dias ?? 0;
        this.ultimos30Dias = dash.ultimos_30_dias ?? 0;
        this.linksPublicosCount = dash.links_publicos_count ?? 0;

        const byId = new Map(templates.map((t) => [t.id, t]));
        this.totalTemplates = templates.length;
        this.ultimosTemplates = (dash.ultimos_templates ?? []).map((t) => {
          const full = byId.get(t.id);
          return {
            id: t.id,
            name: t.name,
            created_at: t.created_at ?? '',
            created_label: this.formatarDataTemplate(t.created_at),
            is_active: full?.is_active !== false,
          };
        });
        this.categoriasResumo = this.aggregateCategories(templates);

        const ps = dash.por_status ?? {};
        this.porStatus = {
          pending: Number(ps['pending'] ?? ps['Pending'] ?? 0),
          approved: Number(ps['approved'] ?? ps['Approved'] ?? 0),
          rejected: Number(ps['rejected'] ?? ps['Rejected'] ?? 0),
        };
      },
      error: () => {
        this.dashReady = true;
        this.estadoErro = true;
        this.mensagemErro = 'Não foi possível carregar o dashboard.';
      },
    });
  }

  private formatarDataTemplate(s?: string): string {
    if (!s) return '—';
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return s;
    const data = d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
    const hora = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${data} · ${hora}`;
  }

  private aggregateCategories(templates: Template[]): { key: string; label: string; count: number }[] {
    const map = new Map<string, number>();
    for (const t of templates) {
      const key = (t.category ?? '').trim() || 'personalizado';
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return Array.from(map.entries())
      .map(([key, count]) => ({
        key,
        label: CATEGORY_LABELS[key] ?? (key === 'personalizado' ? 'Personalizado' : key),
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }
}
