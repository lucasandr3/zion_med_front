import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

/** OPS-11 — header espelhado pelo gestgo_api (`CorrelationId.HEADER`). */
export const CORRELATION_HEADER = 'X-Request-Id';

const STORAGE_KEY = 'gestgo.lastRequestId';

/** Último X-Request-Id visto (sucesso ou erro) — útil no ErrorHub. */
export function lastCorrelationId(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function remember(id: string | null | undefined): void {
  if (!id) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* private mode */
  }
}

function newClientId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `gg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Envia X-Request-Id e guarda o valor ecoado pelo backend (OPS-11).
 */
export const correlationIdInterceptor: HttpInterceptorFn = (req, next) => {
  const outgoing = req.headers.get(CORRELATION_HEADER) || newClientId();
  const withId = req.clone({ setHeaders: { [CORRELATION_HEADER]: outgoing } });
  remember(outgoing);

  return next(withId).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          remember(event.headers.get(CORRELATION_HEADER) || outgoing);
        }
      },
      error: (err) => {
        const fromResponse =
          err && typeof err === 'object' && 'headers' in err
            ? (err as { headers?: { get?: (n: string) => string | null } }).headers?.get?.(CORRELATION_HEADER)
            : null;
        remember(fromResponse || outgoing);
      },
    }),
  );
};
