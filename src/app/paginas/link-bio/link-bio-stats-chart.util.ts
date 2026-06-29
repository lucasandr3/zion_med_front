import {
  LinkBioClickBreakdownRow,
  LinkBioMetrics,
  LinkBioStats,
} from '../../core/services/link-bio.service';

export type LinkBioStatsPeriodo = '7d' | '30d' | '90d';

export interface LinkBioChartBar {
  label: string;
  count: number;
  percent: number;
  ghost: boolean;
}

export interface LinkBioOriginRow {
  row: LinkBioClickBreakdownRow;
  percent: number;
  icon: string;
}

const CTR_MEDIA_SETOR_DEFAULT = 5;

export function parseStatsDate(date: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return new Date(`${date}T12:00:00`);
  }
  return new Date(date);
}

export function formatYmd(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function lastNDays(n: number): string[] {
  const today = new Date();
  return Array.from({ length: n }, (_, index) => formatYmd(addDays(today, index - (n - 1))));
}

function sortedDayEntries(data: Record<string, number>): [string, number][] {
  return Object.entries(data).sort(([a], [b]) => a.localeCompare(b));
}

function dayLabelShort(date: string): string {
  const dayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const d = parseStatsDate(date);
  return dayLabels[d.getDay()] ?? date;
}

function monthLabel(date: string): string {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const d = parseStatsDate(`${date.slice(0, 7)}-01`);
  return months[d.getMonth()] ?? date.slice(0, 7);
}

function barsFromCounts(items: { label: string; count: number }[]): LinkBioChartBar[] {
  if (!items.length) return [];
  const maxVal = Math.max(...items.map((item) => item.count), 0);
  const ghost = maxVal === 0;
  return items.map((item) => ({
    label: item.label,
    count: item.count,
    percent: ghost ? 18 : Math.round((item.count / maxVal) * 100),
    ghost,
  }));
}

function aggregateByWeek(data: Record<string, number>, days: number): { label: string; count: number }[] {
  const dates = lastNDays(days);
  const weeks: { label: string; count: number }[] = [];
  for (let i = 0; i < dates.length; i += 7) {
    const chunk = dates.slice(i, i + 7);
    const count = chunk.reduce((sum, date) => sum + (Number(data[date]) || 0), 0);
    weeks.push({ label: `Sem ${weeks.length + 1}`, count });
  }
  return weeks;
}

function aggregateByMonth(data: Record<string, number>, days: number): { label: string; count: number }[] {
  const dates = lastNDays(days);
  const buckets = new Map<string, number>();
  for (const date of dates) {
    const key = date.slice(0, 7);
    buckets.set(key, (buckets.get(key) ?? 0) + (Number(data[date]) || 0));
  }
  return Array.from(buckets.entries()).map(([key, count]) => ({
    label: monthLabel(key),
    count,
  }));
}

export function buildChartCliques(
  stats: LinkBioStats,
  periodo: LinkBioStatsPeriodo,
): LinkBioChartBar[] {
  const raw = stats.clicks_per_day ?? {};
  if (periodo === '7d') {
    const days = lastNDays(7);
    return barsFromCounts(
      days.map((date) => ({
        label: dayLabelShort(date),
        count: Number(raw[date]) || 0,
      })),
    );
  }
  if (periodo === '30d') {
    return barsFromCounts(aggregateByWeek(raw, 30));
  }
  return barsFromCounts(aggregateByMonth(raw, 90));
}

export function visitasOntem(stats: LinkBioStats): number {
  const ontem = formatYmd(addDays(new Date(), -1));
  return Number(stats.views_per_day?.[ontem]) || 0;
}

export function visitasTrendPercent(metrics: LinkBioMetrics | undefined, stats: LinkBioStats): number | null {
  const hoje = metrics?.visitas_hoje ?? 0;
  const ontem = visitasOntem(stats);
  if (hoje === 0 && ontem === 0) return null;
  if (ontem === 0) return hoje > 0 ? 100 : null;
  return Math.round(((hoje - ontem) / ontem) * 100);
}

export function cliquesTrendPercent(stats: LinkBioStats): number | null {
  const entries = sortedDayEntries(stats.clicks_per_day ?? {});
  if (entries.length < 14) return null;
  const recent = entries.slice(-7).reduce((sum, [, v]) => sum + (Number(v) || 0), 0);
  const previous = entries.slice(-14, -7).reduce((sum, [, v]) => sum + (Number(v) || 0), 0);
  if (recent === 0 && previous === 0) return null;
  if (previous === 0) return recent > 0 ? 100 : null;
  return Math.round(((recent - previous) / previous) * 100);
}

export function ctrBarPercent(metrics: LinkBioMetrics | undefined, ctrMediaSetor = CTR_MEDIA_SETOR_DEFAULT): number {
  const ctr = metrics?.taxa_clique ?? 0;
  return Math.min(100, Math.round((ctr / ctrMediaSetor) * 100));
}

export function ctrAbaixoDaMedia(
  metrics: LinkBioMetrics | undefined,
  ctrMediaSetor = CTR_MEDIA_SETOR_DEFAULT,
): boolean {
  return (metrics?.taxa_clique ?? 0) < ctrMediaSetor && (metrics?.total_views ?? 0) > 0;
}

export function insightBannerTexto(metrics: LinkBioMetrics | undefined): string {
  const visitas = metrics?.visitas_hoje ?? 0;
  const cliques = metrics?.total_clicks ?? 0;
  const cliqueLabel = cliques === 1 ? '1 clique' : `${cliques} cliques`;
  return `Seu CTR está abaixo da média. Com ${visitas} visitas e ${cliqueLabel}, considere adicionar um botão de agendamento online para converter mais visitantes.`;
}

export function iconeOrigemClique(row: LinkBioClickBreakdownRow): string {
  if (row.kind === 'bio_link') return 'link';
  const label = row.label.toLowerCase();
  const channel = (row.channel ?? '').toLowerCase();
  if (channel.includes('whatsapp') || label.includes('whatsapp')) return 'chat';
  if (channel.includes('maps') || label.includes('maps') || label.includes('chegar')) return 'location_on';
  if (channel.includes('email') || label.includes('e-mail') || label.includes('email')) return 'mail';
  if (channel.includes('instagram')) return 'photo_camera';
  if (channel.includes('phone') || label.includes('telefone')) return 'call';
  return 'touch_app';
}

export function buildOrigensClique(stats: LinkBioStats): LinkBioOriginRow[] {
  const rows = stats.click_breakdown ?? [];
  const max = Math.max(...rows.map((r) => r.total_last_30), 1);
  return rows.map((row) => ({
    row,
    percent: Math.round((row.total_last_30 / max) * 100),
    icon: iconeOrigemClique(row),
  }));
}

export function totalCliquesPeriodo(chart: LinkBioChartBar[]): number {
  return chart.reduce((sum, bar) => sum + bar.count, 0);
}

export const LINK_BIO_STATS_PERIODOS: readonly { id: LinkBioStatsPeriodo; label: string }[] = [
  { id: '7d', label: '7d' },
  { id: '30d', label: '30d' },
  { id: '90d', label: '90d' },
];

export { CTR_MEDIA_SETOR_DEFAULT };
