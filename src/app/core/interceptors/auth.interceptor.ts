import { HttpInterceptorFn, HttpErrorResponse, HttpContextToken } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { BillingBlockedStateService } from '../services/billing-blocked-state.service';
import { AuthService } from '../services/auth.service';
import { extractApiErrorCode } from '../utils/api-error.util';
import { environment } from '../../../environments/environment';

const CSRF_RETRIED = new HttpContextToken<boolean>(() => false);
const MUTATING = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

/**
 * Opt-in: enviar cookie de sessão do painel em API pública normalmente anônima.
 * Usado só no submit do formulário público em modo assistido (`?assistido=1`).
 */
export const SEND_SESSION_CREDENTIALS = new HttpContextToken<boolean>(() => false);

/** APIs públicas (paciente/visitante) — nunca redirecionar para login em 401. */
const PUBLIC_API_MARKERS = [
  '/formulario-publico',
  '/link-bio/public',
  '/agenda/public',
  '/auth/login',
  '/auth/csrf',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/logout',
  '/auth/verify-email',
  '/landing',
  '/comece',
  '/demonstracao',
  '/verificar/',
  '/status',
  '/product-events',
] as const;

/**
 * APIs de visitante/paciente: não enviar cookie da sessão do painel.
 * Evita misturar clínica logada com formulário público / link-bio / agenda pública.
 * Auth (login/csrf/logout) continua com credentials.
 */
const STATELESS_PUBLIC_API_MARKERS = [
  '/formulario-publico',
  '/link-bio/public',
  '/agenda/public',
  '/landing',
  '/comece',
  '/demonstracao',
  '/verificar/',
  '/status',
  '/product-events',
] as const;

/** Rotas SPA abertas ao cliente — 401 de qualquer API não deve forçar /autenticacao. */
const PUBLIC_SPA_PREFIXES = ['/f/', '/l/', '/a/', '/verificar', '/planos', '/para/', '/como-funciona/', '/link-na-bio', '/autenticacao', '/m/login', '/esqueci-a-senha', '/redefinir-senha', '/verificar-email', '/termos-de-uso', '/privacidade', '/f/sucesso'] as const;

function isPublicApiUrl(url: string): boolean {
  return PUBLIC_API_MARKERS.some((marker) => url.includes(marker));
}

function isStatelessPublicApiUrl(url: string): boolean {
  return STATELESS_PUBLIC_API_MARKERS.some((marker) => url.includes(marker));
}

function isPublicSpaRoute(url: string): boolean {
  const path = (url || '').split('?')[0] || '';
  if (path === '/f/sucesso' || path.startsWith('/f/sucesso')) return true;
  if (path === '/verificar' || path.startsWith('/verificar/')) return true;
  if (path === '/planos') return true;
  return PUBLIC_SPA_PREFIXES.some((prefix) => path === prefix.replace(/\/$/, '') || path.startsWith(prefix));
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const billingBlockedState = inject(BillingBlockedStateService);

  const isOwnApi = req.url.startsWith(environment.apiUrl);
  if (!isOwnApi) {
    return next(req);
  }

  const organizationId = auth.getCurrentOrganizationId();
  const isPublicApi = isPublicApiUrl(req.url);
  const withCredentials =
    !isStatelessPublicApiUrl(req.url) || req.context.get(SEND_SESSION_CREDENTIALS);
  const headers: Record<string, string> = {
    Accept:
      req.responseType === 'blob'
        ? 'application/pdf, application/zip, application/octet-stream, application/json'
        : 'application/json',
  };

  // Em APIs públicas não envia contexto de clínica da sessão do painel.
  if (!isPublicApi && organizationId != null && organizationId !== '') {
    headers['X-Organization-Id'] = String(organizationId);
    headers['X-Clinic-Id'] = String(organizationId);
  }

  // CSRF só quando a request leva sessão (APIs do painel / modo assistido).
  if (withCredentials && MUTATING.has(req.method)) {
    const csrf = auth.getCsrfToken();
    if (csrf) headers['X-CSRF-TOKEN'] = csrf;
  }

  const isMultipart = req.body instanceof FormData;
  if (!isMultipart && !req.headers.has('Content-Type') && req.body != null && MUTATING.has(req.method)) {
    headers['Content-Type'] = 'application/json';
  }

  const clone = req.clone({ setHeaders: headers, withCredentials });

  return next(clone).pipe(
    catchError((err: HttpErrorResponse) => {
      if (
        withCredentials &&
        err.status === 419 &&
        MUTATING.has(req.method) &&
        !req.context.get(CSRF_RETRIED)
      ) {
        auth.clearCsrfToken();
        return auth.ensureCsrf().pipe(
          switchMap((token) => {
            const retriedHeaders: Record<string, string> = { ...headers };
            if (token) retriedHeaders['X-CSRF-TOKEN'] = token;
            return next(
              req.clone({
                context: req.context.set(CSRF_RETRIED, true),
                withCredentials: true,
                setHeaders: retriedHeaders,
              }),
            );
          }),
          catchError(() => throwError(() => err)),
        );
      }

      const onPublicPage = isPublicSpaRoute(router.url);
      const skipAuthRedirect = isPublicApi || onPublicPage;

      if (err.status === 401 && !skipAuthRedirect) {
        auth.clearSession();
        const path = (router.url || '').split('?')[0] || '';
        const login =
          path === '/m' || path.startsWith('/m/') ? '/m/login' : '/autenticacao';
        void router.navigateByUrl(login);
      } else if (
        err.status === 403 &&
        auth.isAuthenticated() &&
        req.url.includes('/api/v1/') &&
        !req.url.includes('auth/send-verification-email') &&
        !onPublicPage
      ) {
        const body = err.error;
        const code = extractApiErrorCode(body);
        const msg = (
          typeof body === 'object' && body && 'message' in body
            ? String((body as { message?: string }).message ?? '')
            : ''
        ).toLowerCase();
        if (code === 'billing_blocked') {
          const url = req.url;
          const skipGlobalBanner = url.includes('/api/v1/billing');
          if (!skipGlobalBanner) {
            billingBlockedState.activate();
          }
          return throwError(() => err);
        }
        if (code === 'email_unverified' || msg.includes('verif')) {
          void router.navigate(['/verificacao-pendente']);
          return throwError(() => err);
        }
      }
      return throwError(() => err);
    }),
  );
};
