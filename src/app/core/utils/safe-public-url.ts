/** Allowlist de schemes para URLs públicas (Link Bio, downloads). */
const ALLOWED_SCHEMES = new Set(['https:', 'mailto:', 'tel:']);

export function isSafePublicUrl(raw: string | null | undefined): boolean {
  const value = (raw ?? '').trim();
  if (!value || value.length > 2000) return false;
  try {
    // mailto:/tel: precisam de base para URL()
    const url = value.includes(':') ? new URL(value) : new URL(value, 'https://invalid.local');
    if (!ALLOWED_SCHEMES.has(url.protocol)) return false;
    if (url.protocol === 'https:' || url.protocol === 'http:') {
      return Boolean(url.hostname);
    }
    return true;
  } catch {
    return false;
  }
}

/** Hosts permitidos para fallback de download de cópia do paciente. */
export function isAllowedPatientDownloadUrl(raw: string | null | undefined): boolean {
  const value = (raw ?? '').trim();
  if (!value) return false;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return false;
    const host = url.hostname.toLowerCase();
    const allowed = [
      'api.gestgo.com.br',
      'api-homolog.gestgo.com.br',
      'localhost',
      '127.0.0.1',
    ];
    return allowed.some((h) => host === h || host.endsWith('.' + h));
  } catch {
    return false;
  }
}
