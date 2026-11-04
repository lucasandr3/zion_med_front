import { environment } from '../../../environments/environment';

/**
 * Origem canônica do SPA para links públicos (/f/:token, /l/:slug).
 * Em produção/homolog usa `environment.appUrl`; em dev, a origem atual do browser.
 */
export function publicAppOrigin(): string {
  const configured = String((environment as { appUrl?: string }).appUrl ?? '').replace(/\/+$/, '');
  if (configured) return configured;
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return '';
}

function isLoopbackHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || host === '::1';
}

/**
 * Corrige `public_url` da API quando veio com localhost:4200 (FRONTEND_URL default)
 * em vez da origem real do SPA (app.gestgo.com.br ou porta dinâmica do ng serve).
 */
export function normalizePublicAppUrl(url: string | null | undefined): string {
  const raw = String(url ?? '').trim();
  if (!raw) return '';

  const origin = publicAppOrigin();
  if (!origin) return raw;

  try {
    const parsed = new URL(raw);
    const target = new URL(origin);
    if (parsed.origin === target.origin) {
      return `${target.origin}${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
    if (isLoopbackHost(parsed.hostname)) {
      return `${target.origin}${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
  } catch {
    if (raw.startsWith('/')) {
      return `${origin}${raw}`;
    }
  }

  return raw;
}

/** Monta URL do formulário público a partir do token. */
export function buildPublicFormUrl(token: string | null | undefined): string {
  const t = String(token ?? '').trim();
  if (!t) return '';
  return `${publicAppOrigin()}/f/${encodeURIComponent(t)}`;
}
