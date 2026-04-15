import { environment } from '../../../environments/environment';

/** Hostname do app em produção (ex.: app.gestgo.com.br), ou null no dev. */
export function appPlataformaHostname(): string | null {
  const raw = environment.appPublicUrl?.trim();
  if (!raw) {
    return null;
  }
  try {
    return new URL(raw).hostname || null;
  } catch {
    return null;
  }
}

/** URL do login: absoluta em produção (landing em outro host) ou relativa no dev. */
export function loginPlataformaHref(): string {
  const base = environment.appPublicUrl?.trim().replace(/\/$/, '');
  return base ? `${base}/autenticacao` : '/autenticacao';
}
