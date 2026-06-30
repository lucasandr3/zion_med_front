import { LinkBioMetrics } from '../../core/services/link-bio.service';
import { environment } from '../../../environments/environment';

/** URL para abrir a página pública no navegador (ajusta origin em dev). */
export function resolvePublicUrlForBrowser(
  publicUrl: string,
  slug: string | undefined,
  isBrowser: boolean,
): string {
  if (!publicUrl || !slug) return publicUrl;
  if (environment.production || !isBrowser) return publicUrl;
  try {
    const spaOrigin = window.location.origin;
    const linkOrigin = new URL(publicUrl).origin;
    if (linkOrigin !== spaOrigin) {
      return `${spaOrigin}/l/${encodeURIComponent(slug)}`;
    }
  } catch {
    /* URL inválida */
  }
  return publicUrl;
}

/** Modo totem/recepção (`?kiosk=1`). */
export function buildRecepcaoKioskUrl(baseUrl: string): string {
  if (!baseUrl.trim()) return '';
  try {
    const u = new URL(baseUrl);
    u.searchParams.set('kiosk', '1');
    return u.toString();
  } catch {
    const sep = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${sep}kiosk=1`;
  }
}

export function buildHeaderMetaLinha(metrics: LinkBioMetrics | undefined): string | null {
  if (!metrics) return null;
  const partes: string[] = [];
  partes.push(`${metrics.visitas_hoje} ${metrics.visitas_hoje === 1 ? 'visita hoje' : 'visitas hoje'}`);
  partes.push(`${metrics.total_clicks_last_30} cliques`);
  return partes.join(' · ');
}
