import { environment } from '../../../environments/environment';

/** URL do login: absoluta em produção (landing em outro host) ou relativa no dev. */
export function loginPlataformaHref(): string {
  const base = environment.appPublicUrl?.trim().replace(/\/$/, '');
  return base ? `${base}/autenticacao` : '/autenticacao';
}
