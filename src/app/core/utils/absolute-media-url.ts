import { environment } from '../../../environments/environment';

/**
 * Garante URL absoluta para imagens vindas da API (ex.: /storage/... em Laravel).
 * Necessário quando o front roda em outro host/porta que o backend.
 */
export function absoluteMediaUrl(href: string | null | undefined): string | null {
  if (href == null) return null;
  const u = String(href).trim();
  if (!u) return null;
  if (/^(https?:|blob:|data:)/i.test(u)) return u;
  const base = environment.apiUrl.replace(/\/$/, '');
  return u.startsWith('/') ? `${base}${u}` : `${base}/${u}`;
}
