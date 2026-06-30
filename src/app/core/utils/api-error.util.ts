export interface ApiErrorBody {
  code?: string;
  message?: string;
  details?: Record<string, string[] | string>;
  /** Legado Laravel — espelhado em `details` pela API v1. */
  errors?: Record<string, string[] | string>;
}

/** Extrai mensagem legível do envelope de erro da API (`code`, `message`, `details`). */
export function extractApiErrorMessage(body: unknown, fallback = 'Ocorreu um erro.'): string {
  if (typeof body === 'string' && body.trim()) {
    return body.trim();
  }
  if (!body || typeof body !== 'object') {
    return fallback;
  }
  const err = body as ApiErrorBody;
  if (typeof err.message === 'string' && err.message.trim()) {
    return err.message.trim();
  }
  const details = err.details ?? err.errors;
  if (details && typeof details === 'object') {
    const parts = Object.values(details)
      .flatMap((v) => (Array.isArray(v) ? v : [String(v)]))
      .map((s) => String(s).trim())
      .filter(Boolean);
    if (parts.length) {
      return parts.join(' ');
    }
  }
  return fallback;
}

export function extractApiErrorCode(body: unknown): string | undefined {
  if (!body || typeof body !== 'object') return undefined;
  const code = (body as ApiErrorBody).code;
  return typeof code === 'string' && code.trim() ? code.trim() : undefined;
}
