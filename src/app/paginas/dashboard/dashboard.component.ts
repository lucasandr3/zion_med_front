import { Component, OnInit, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap, map, catchError, of } from 'rxjs';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexStroke,
  ApexFill,
  ApexGrid,
  ApexTooltip,
  ApexLegend,
  ApexStates,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';
import { isBillingBlockedError } from '../../core/utils/billing-blocked-error';
import { DashboardService } from '../../core/services/dashboard.service';
import { TemplatesService, Template } from '../../core/services/templates.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmAssinaturaBloqueadaCardComponent } from '../../shared/components/ui/zm-assinatura-bloqueada-card/zm-assinatura-bloqueada-card.component';
import { ZmSkeletonDashboardComponent } from '../../shared/components/skeletons';
import { ZmEmptyStateComponent } from '../../shared/components/ui';

/** Rótulos de categoria (alinhado a templates-listagem) */
const CATEGORY_LABELS: Record<string, string> = {
  personalizado: 'Personalizado',
  anamnese: 'Anamnese',
  acompanhamento: 'Acompanhamento',
  evolucao: 'Evolução',
  consentimento: 'Consentimento',
  triagem: 'Triagem',
  procedimento: 'Procedimento',
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
  respostas_count: number;
}

export interface UltimaSubmissaoRow {
  id: number;
  paciente: string;
  modelo: string;
  status: string;
  dataLabel: string;
}

export interface ModeloMaisUsadoRow {
  template_id: number;
  template_nome: string;
  total: number;
}

type AreaChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  colors: string[];
  legend: ApexLegend;
  markers: { size: number; strokeWidth: number; hover: { size: number } };
  states: ApexStates;
};

type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;
  responsive: ApexResponsive[];
  tooltip: ApexTooltip;
  states: ApexStates;
};

type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  colors: string[];
  legend: ApexLegend;
  states: ApexStates;
};

@Component({
  selector: 'app-pagina-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ChartComponent,
    ZmSkeletonDashboardComponent,
    ZmAssinaturaBloqueadaCardComponent,
    ZmEmptyStateComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  dashReady = false;
  estadoErro = false;
  mensagemErro = '';
  painelBloqueadoCobranca = false;
  semClinica = false;
  pendentesHoje = 0;
  totalTemplates = 0;
  ultimos7Dias = 0;
  ultimos30Dias = 0;
  linksPublicosCount = 0;
  mediaSemanal30Dias = 0;
  variacaoRespostasAbsoluta = 0;
  variacaoRespostasPercentual = 0;
  variacaoRespostasPositiva = true;
  taxaAprovacaoResumo = 0;
  porStatus: { pending: number; approved: number; rejected: number } = { pending: 0, approved: 0, rejected: 0 };
  ultimosTemplates: UltimoTemplateRow[] = [];
  ultimasSubmissoes: UltimaSubmissaoRow[] = [];
  modelosMaisUsados: ModeloMaisUsadoRow[] = [];
  categoriasResumo: { key: string; label: string; count: number }[] = [];
  periodoSelecionado = 7;
  readonly periodOptions = [
    { days: 7, label: '7 dias' },
    { days: 30, label: '30 dias' },
    { days: 90, label: '90 dias' },
  ];

  areaChart: AreaChartOptions = this.buildAreaChart([]);
  donutChart: DonutChartOptions = this.buildDonutChart(0, 0, 0);
  barChart: BarChartOptions = this.buildBarChart([]);

  private dashboardService = inject(DashboardService);
  private templatesService = inject(TemplatesService);
  private loadingService = inject(LoadingService);

  get totalStatus(): number {
    return this.porStatus.pending + this.porStatus.approved + this.porStatus.rejected;
  }

  get percentualPendente(): number { return this.getPercentual(this.porStatus.pending); }
  get percentualAprovado(): number { return this.getPercentual(this.porStatus.approved); }
  get percentualReprovado(): number { return this.getPercentual(this.porStatus.rejected); }

  get taxaAprovacao(): number {
    if (this.taxaAprovacaoResumo > 0) return this.taxaAprovacaoResumo;
    return this.getPercentual(this.porStatus.approved);
  }

  get mediaSemanalUltimos30Dias(): number {
    if (this.mediaSemanal30Dias > 0) return this.mediaSemanal30Dias;
    if (!this.ultimos30Dias) return 0;
    return Math.round(this.ultimos30Dias / (30 / 7));
  }

  get variacaoRespostas7DiasPercentual(): number { return this.variacaoRespostasPercentual; }

  get respostasPeriodoSelecionado(): number {
    if (this.periodoSelecionado === 30) return this.ultimos30Dias;
    if (this.periodoSelecionado === 90) return this.ultimos30Dias * 3;
    return this.ultimos7Dias;
  }

  get labelPeriodoSelecionado(): string {
    if (this.periodoSelecionado === 30) return 'Últimos 30 dias';
    if (this.periodoSelecionado === 90) return 'Últimos 90 dias (estimativa)';
    return 'Últimos 7 dias';
  }

  periodRangeLabel(): string {
    if (this.periodoSelecionado <= 7) return 'Últimos 7 dias';
    if (this.periodoSelecionado <= 30) return 'Últimos 30 dias';
    return 'Últimos 90 dias';
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
        this.painelBloqueadoCobranca = false;
        this.semClinica = dash.sem_clinica;
        this.pendentesHoje = dash.pendentes_hoje ?? 0;
        this.ultimos7Dias = dash.ultimos_7_dias ?? 0;
        this.ultimos30Dias = dash.ultimos_30_dias ?? 0;
        this.mediaSemanal30Dias = dash.media_semanal_ultimos_30_dias ?? 0;
        const comparativo = dash.comparativo_semana_anterior;
        this.variacaoRespostasAbsoluta =
          comparativo?.delta_absoluto ?? (this.ultimos7Dias - this.mediaSemanalUltimos30Dias);
        this.variacaoRespostasPercentual = comparativo?.delta_percentual ?? this.calcularVariacaoPercentualFallback();
        this.variacaoRespostasPositiva = comparativo?.positiva ?? this.variacaoRespostasAbsoluta >= 0;
        this.taxaAprovacaoResumo = dash.taxa_aprovacao ?? 0;
        this.linksPublicosCount = dash.links_publicos_count ?? 0;
        const respostasPorTemplate = dash.respostas_por_template ?? {};
        this.ultimasSubmissoes = (dash.ultimas_submissoes ?? []).map((s) => ({
          id: s.id,
          paciente: s.paciente,
          modelo: s.modelo,
          status: this.mapStatusLabel(s.status),
          dataLabel: this.formatarDataSubmissao(s.data),
        }));
        this.modelosMaisUsados = (dash.modelos_mais_usados ?? []).slice(0, 5);

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
            respostas_count: Number(respostasPorTemplate[t.id] ?? 0),
          };
        });
        this.categoriasResumo = this.aggregateCategories(templates);

        const ps = dash.por_status ?? {};
        this.porStatus = {
          pending: Number(ps['pending'] ?? ps['Pending'] ?? 0),
          approved: Number(ps['approved'] ?? ps['Approved'] ?? 0),
          rejected: Number(ps['rejected'] ?? ps['Rejected'] ?? 0),
        };

        this.reconstruirGraficos();
      },
      error: (err: unknown) => {
        this.dashReady = true;
        if (isBillingBlockedError(err)) {
          this.painelBloqueadoCobranca = true;
          this.estadoErro = false;
          return;
        }
        this.painelBloqueadoCobranca = false;
        this.estadoErro = true;
        this.mensagemErro = 'Não foi possível carregar o painel.';
      },
    });
  }

  selecionarPeriodo(days: number): void {
    this.periodoSelecionado = days;
    this.reconstruirGraficos();
  }

  // ============ GRÁFICOS ============

  private reconstruirGraficos(): void {
    this.areaChart = this.buildAreaChart(this.serieEvolucao());
    this.donutChart = this.buildDonutChart(
      this.porStatus.pending,
      this.porStatus.approved,
      this.porStatus.rejected,
    );
    this.barChart = this.buildBarChart(this.modelosMaisUsados);
  }

  /** Série sintética para o gráfico de área a partir de dados agregados. */
  private serieEvolucao(): { label: string; valor: number }[] {
    const semanaAnterior = Math.max(0, this.ultimos7Dias - this.variacaoRespostasAbsoluta);
    const media30 = this.mediaSemanalUltimos30Dias;

    if (this.periodoSelecionado === 30) {
      // 4 semanas aproximadas
      const perWeek = this.ultimos30Dias / 4;
      return [
        { label: 'Sem 1', valor: Math.round(perWeek * 0.85) },
        { label: 'Sem 2', valor: Math.round(perWeek * 1.05) },
        { label: 'Sem 3', valor: Math.round(perWeek * 0.95) },
        { label: 'Sem atual', valor: this.ultimos7Dias },
      ];
    }
    if (this.periodoSelecionado === 90) {
      return [
        { label: '30d', valor: this.ultimos30Dias },
        { label: '60d', valor: this.ultimos30Dias * 2 },
        { label: '90d', valor: this.ultimos30Dias * 3 },
      ];
    }
    return [
      { label: 'Sem. anterior', valor: semanaAnterior },
      { label: 'Sem. atual', valor: this.ultimos7Dias },
      { label: 'Média 30d', valor: media30 },
    ];
  }

  private buildAreaChart(serie: { label: string; valor: number }[]): AreaChartOptions {
    const categorias = serie.length ? serie.map((s) => s.label) : ['—'];
    const valores = serie.length ? serie.map((s) => s.valor) : [0];
    return {
      series: [{ name: 'Respostas', data: valores }],
      chart: {
        type: 'area',
        height: 280,
        fontFamily: 'inherit',
        foreColor: 'var(--c-muted)',
        toolbar: { show: false },
        zoom: { enabled: false },
        animations: { enabled: true, speed: 450 },
        sparkline: { enabled: false },
      },
      colors: ['#0d9488'],
      stroke: { curve: 'smooth', width: 3 },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.42,
          opacityTo: 0.05,
          stops: [0, 100],
        },
      },
      dataLabels: { enabled: false },
      grid: {
        borderColor: 'var(--c-border)',
        strokeDashArray: 4,
        padding: { left: 8, right: 8, top: 0, bottom: 0 },
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
      },
      xaxis: {
        categories: categorias,
        labels: { style: { fontSize: '11px', fontWeight: 500, colors: 'var(--c-muted)' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          style: { fontSize: '11px', colors: 'var(--c-muted)' },
          formatter: (v) => Math.round(Number(v)).toString(),
        },
      },
      tooltip: {
        theme: 'light',
        style: { fontSize: '12px' },
        y: { formatter: (v) => `${v} respostas` },
      },
      legend: { show: false },
      markers: { size: 4, strokeWidth: 2, hover: { size: 7 } },
      states: {
        hover: { filter: { type: 'lighten' } },
        active: { filter: { type: 'darken' } },
      },
    };
  }

  private buildDonutChart(pending: number, approved: number, rejected: number): DonutChartOptions {
    const total = pending + approved + rejected;
    const series = total > 0 ? [pending, approved, rejected] : [1];
    const labels = total > 0 ? ['Pendente', 'Aprovado', 'Reprovado'] : ['Sem dados'];
    const colors = total > 0 ? ['#d97706', '#15803d', '#dc2626'] : ['#e2e8f0'];

    return {
      series,
      labels,
      colors,
      chart: {
        type: 'donut',
        height: 280,
        fontFamily: 'inherit',
        foreColor: 'var(--c-muted)',
        animations: { enabled: true, speed: 450 },
      },
      legend: {
        position: 'bottom',
        fontSize: '12px',
        fontWeight: 500,
        labels: { colors: 'var(--c-text)' },
        itemMargin: { horizontal: 8, vertical: 4 },
        markers: { size: 6, strokeWidth: 0, shape: 'circle' },
      },
      dataLabels: {
        enabled: true,
        style: { fontSize: '11px', fontWeight: 600, colors: ['#fff'] },
        formatter: (val) => `${Math.round(Number(val))}%`,
        dropShadow: { enabled: false },
      },
      stroke: { width: 2, colors: ['var(--c-surface)'] },
      plotOptions: {
        pie: {
          donut: {
            size: '68%',
            labels: {
              show: true,
              name: { show: true, fontSize: '12px', color: 'var(--c-muted)', offsetY: -2 },
              value: {
                show: true,
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--c-text)',
                offsetY: 6,
                formatter: (v) => String(v),
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Total',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--c-muted)',
                formatter: () => String(total),
              },
            },
          },
          expandOnClick: false,
        },
      },
      tooltip: {
        theme: 'light',
        y: { formatter: (v) => `${v} protocolo${v === 1 ? '' : 's'}` },
      },
      states: {
        hover: { filter: { type: 'lighten' } },
        active: { filter: { type: 'darken' } },
      },
      responsive: [
        {
          breakpoint: 480,
          options: { chart: { height: 240 }, legend: { position: 'bottom' } },
        },
      ],
    };
  }

  private buildBarChart(modelos: ModeloMaisUsadoRow[]): BarChartOptions {
    const items = modelos.length > 0 ? modelos : [{ template_id: 0, template_nome: 'Sem dados', total: 0 }];
    const categorias = items.map((m) =>
      m.template_nome.length > 28 ? m.template_nome.slice(0, 27) + '…' : m.template_nome,
    );
    const valores = items.map((m) => m.total);

    return {
      series: [{ name: 'Respostas', data: valores }],
      chart: {
        type: 'bar',
        height: 280,
        fontFamily: 'inherit',
        foreColor: 'var(--c-muted)',
        toolbar: { show: false },
        animations: { enabled: true, speed: 450 },
      },
      colors: ['#1d4ed8'],
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 6,
          borderRadiusApplication: 'end',
          barHeight: '65%',
          distributed: false,
          dataLabels: { position: 'center' },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 0,
        style: { fontSize: '11px', fontWeight: 600, colors: ['#fff'] },
        formatter: (v) => (Number(v) > 0 ? String(v) : ''),
      },
      grid: {
        borderColor: 'var(--c-border)',
        strokeDashArray: 4,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: false } },
        padding: { left: 8, right: 16, top: 0, bottom: 0 },
      },
      xaxis: {
        categories: categorias,
        labels: { style: { fontSize: '11px', colors: 'var(--c-muted)' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          style: { fontSize: '11.5px', fontWeight: 500, colors: 'var(--c-text)' },
        },
      },
      tooltip: {
        theme: 'light',
        y: { formatter: (v) => `${v} resposta${v === 1 ? '' : 's'}` },
      },
      legend: { show: false },
      states: {
        hover: { filter: { type: 'lighten' } },
        active: { filter: { type: 'darken' } },
      },
    };
  }

  // ============ HELPERS ============

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

  private getPercentual(valor: number): number {
    const total = this.totalStatus;
    if (!total) return 0;
    return Math.round((valor / total) * 100);
  }

  private calcularVariacaoPercentualFallback(): number {
    const base = this.mediaSemanalUltimos30Dias;
    if (base <= 0) {
      return this.ultimos7Dias > 0 ? 100 : 0;
    }
    return Math.round((this.variacaoRespostasAbsoluta / base) * 100);
  }

  private formatarDataSubmissao(s: string | null): string {
    if (!s) return '—';
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return s;
    const data = d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
    const hora = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${data} · ${hora}`;
  }

  private mapStatusLabel(status: string): string {
    const normalized = status.toLowerCase();
    if (normalized === 'pending') return 'Pendente';
    if (normalized === 'approved') return 'Aprovado';
    if (normalized === 'rejected') return 'Reprovado';
    return status;
  }
}
