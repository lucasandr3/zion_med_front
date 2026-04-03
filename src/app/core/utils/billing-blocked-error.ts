import { HttpErrorResponse } from '@angular/common/http';

/** Resposta 403 com `code: billing_blocked` (assinatura / cobrança pendente). */
export function isBillingBlockedError(err: unknown): boolean {
  const http = err instanceof HttpErrorResponse ? err : null;
  if (http?.status !== 403) return false;
  const code = (http.error as { code?: string } | null)?.code;
  return code === 'billing_blocked';
}
