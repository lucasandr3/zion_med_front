import { environment } from '../../../environments/environment';

export type GestgoExperience = 'painel' | 'mobile';

const PREFER_PAINEL_KEY = 'gestgo_prefer_painel';
const MOBILE_BRIDGE_KEY = 'gestgo_mobile_bridge';

type MobileBridge = {
  /** Path do painel permitido (sem query), ex.: /envios */
  allow: string;
  /** Para onde o voltar deve levar, ex.: /m/fichas */
  returnTo: string;
};

type ExperienceEnv = {
  painelUrl?: string;
  mobileAppUrl?: string;
  /** Hosts que devem abrir a experiência mobile por padrão (ex.: app. após migração). */
  mobileHosts?: string[];
  /** Hosts do painel completo (ex.: painel.). */
  painelHosts?: string[];
};

function envExperience(): ExperienceEnv {
  return environment as typeof environment & ExperienceEnv;
}

function currentHostname(): string {
  if (typeof window === 'undefined') return '';
  return window.location.hostname.toLowerCase();
}

function hostMatches(host: string, patterns: string[] | undefined): boolean {
  if (!patterns?.length || !host) return false;
  return patterns.some((p) => {
    const needle = p.toLowerCase().trim();
    if (!needle) return false;
    return host === needle || host.endsWith(`.${needle}`) || host.startsWith(needle);
  });
}

/** Viewport / UA típicos de celular (não tablet landscape grande). */
export function isMobileViewport(widthPx?: number): boolean {
  if (typeof window === 'undefined') return false;
  const w = widthPx ?? window.innerWidth;
  if (w < 768) return true;
  try {
    const ua = navigator.userAgent || '';
    const mobileUa = /Android|iPhone|iPod|Windows Phone|Mobile/i.test(ua);
    const tablet = /iPad|Tablet/i.test(ua);
    return mobileUa && !tablet && w < 1024;
  } catch {
    return w < 768;
  }
}

/** Experiência sugerida no CTA Entrar do site. */
export function suggestExperienceForViewport(widthPx?: number): GestgoExperience {
  return isMobileViewport(widthPx) ? 'mobile' : 'painel';
}

/** Usuário pediu explicitamente o painel completo neste dispositivo. */
export function prefersPainelExperience(): boolean {
  if (typeof localStorage === 'undefined') return false;
  try {
    return localStorage.getItem(PREFER_PAINEL_KEY) === '1';
  } catch {
    return false;
  }
}

export function setPreferPainelExperience(prefer: boolean): void {
  if (typeof localStorage === 'undefined') return;
  try {
    if (prefer) localStorage.setItem(PREFER_PAINEL_KEY, '1');
    else localStorage.removeItem(PREFER_PAINEL_KEY);
  } catch {
    // ignore
  }
}

function readMobileBridge(): MobileBridge | null {
  if (typeof sessionStorage === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(MOBILE_BRIDGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as MobileBridge;
    if (!parsed?.allow || !parsed?.returnTo) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Abre uma rota do painel a partir do app mobile, com voltar garantido para o `/m`. */
export function armMobileBridge(allowPath: string, returnTo = '/m'): void {
  if (typeof sessionStorage === 'undefined') return;
  const allow = (allowPath.split('?')[0] || '/').replace(/\/$/, '') || '/';
  const back = returnTo.startsWith('/') ? returnTo : `/${returnTo}`;
  try {
    sessionStorage.setItem(MOBILE_BRIDGE_KEY, JSON.stringify({ allow, returnTo: back } satisfies MobileBridge));
  } catch {
    // ignore
  }
}

export function clearMobileBridge(): void {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.removeItem(MOBILE_BRIDGE_KEY);
  } catch {
    // ignore
  }
}

/** Path atual está na ponte temporária mobile → painel? */
export function isMobileBridgePath(pathname?: string): boolean {
  const bridge = readMobileBridge();
  if (!bridge) return false;
  const path = (pathname ?? (typeof window !== 'undefined' ? window.location.pathname : ''))
    .split('?')[0]
    .replace(/\/$/, '') || '/';
  const allow = bridge.allow.replace(/\/$/, '') || '/';
  return path === allow || path.startsWith(`${allow}/`);
}

/** URL de voltar forçada pelo app mobile (se houver ponte ativa). */
export function peekMobileReturnTo(pathname?: string): string | null {
  if (!isMobileBridgePath(pathname)) return null;
  return readMobileBridge()?.returnTo ?? null;
}

/** Consome a ponte e devolve o returnTo (chamar ao voltar). */
export function consumeMobileReturnTo(): string | null {
  const bridge = readMobileBridge();
  clearMobileBridge();
  return bridge?.returnTo ?? null;
}

/**
 * Deve abrir `/m` por padrão?
 * - Mobile (viewport/UA) → sim, salvo preferência de painel
 * - Host em `mobileHosts` → sim
 * - Ponte temporária (envio/detalhe) → não redireciona
 */
export function shouldAutoOpenMobile(): boolean {
  const host = currentHostname();
  const cfg = envExperience();
  if (hostMatches(host, cfg.painelHosts)) return false;
  if (isMobileBridgePath()) return false;
  if (hostMatches(host, cfg.mobileHosts)) return true;
  if (prefersPainelExperience()) return false;
  return isMobileViewport();
}

/**
 * True quando o usuário está (ou deveria estar) na experiência app:
 * path /m, host mobile, ou viewport mobile sem preferência de painel.
 */
export function shouldStayInMobileApp(pathname?: string): boolean {
  const path = pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '');
  if (path === '/m' || path.startsWith('/m/')) return true;
  if (isMobileBridgePath(path)) return true;
  return shouldAutoOpenMobile();
}

/**
 * Resolve a experiência atual.
 * Path `/m` sempre é mobile.
 */
export function resolveGestgoExperience(pathname?: string): GestgoExperience {
  const path = pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '');
  if (path === '/m' || path.startsWith('/m/')) return 'mobile';

  const host = currentHostname();
  const cfg = envExperience();
  if (hostMatches(host, cfg.mobileHosts)) return 'mobile';
  if (hostMatches(host, cfg.painelHosts)) return 'painel';
  return 'painel';
}

export function isMobileExperience(pathname?: string): boolean {
  return resolveGestgoExperience(pathname) === 'mobile';
}

/** URL do painel completo (mesmo origin se não configurado). */
export function painelBaseUrl(): string {
  const cfg = envExperience();
  if (cfg.painelUrl) return cfg.painelUrl.replace(/\/$/, '');
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
}

/** URL/base da experiência mobile. */
export function mobileBaseUrl(): string {
  const cfg = envExperience();
  if (cfg.mobileAppUrl) return cfg.mobileAppUrl.replace(/\/$/, '');
  if (typeof window !== 'undefined') return `${window.location.origin}/m`;
  return '/m';
}

export function painelPath(path: string): string {
  const base = painelBaseUrl();
  const p = path.startsWith('/') ? path : `/${path}`;
  if (!base || base === (typeof window !== 'undefined' ? window.location.origin : '')) return p;
  return `${base}${p}`;
}

/** Path + query para navegar no painel a partir do mobile (arma a ponte de retorno). */
export function preparePainelHop(
  pathWithQuery: string,
  returnTo = '/m',
): { path: string; queryParams: Record<string, string> } {
  const [pathPart, query = ''] = pathWithQuery.split('?');
  const path = pathPart?.startsWith('/') ? pathPart : `/${pathPart || ''}`;
  armMobileBridge(path, returnTo);
  const queryParams: Record<string, string> = {};
  if (query) {
    for (const pair of query.split('&')) {
      const [k, v = ''] = pair.split('=');
      if (k) queryParams[decodeURIComponent(k)] = decodeURIComponent(v);
    }
  }
  return { path, queryParams };
}
