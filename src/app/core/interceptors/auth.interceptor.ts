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

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const billingBlockedState = inject(BillingBlockedStateService);

  const isOwnApi = req.url.startsWith(environment.apiUrl);
  if (!isOwnApi) {
    return next(req);
  }

  const organizationId = auth.getCurrentOrganizationId();
  const isPublicForm = req.url.includes('formulario-publico');
  const headers: Record<string, string> = {
    Accept:
      req.responseType === 'blob'
        ? 'application/pdf, application/zip, application/octet-stream, application/json'
        : 'application/json',
  };

  if (!isPublicForm && organizationId != null && organizationId !== '') {
    headers['X-Organization-Id'] = String(organizationId);
    headers['X-Clinic-Id'] = String(organizationId);
  }

  if (MUTATING.has(req.method)) {
    const csrf = auth.getCsrfToken();
    if (csrf) headers['X-CSRF-TOKEN'] = csrf;
  }

  const isMultipart = req.body instanceof FormData;
  if (!isMultipart && !req.headers.has('Content-Type') && req.body != null && MUTATING.has(req.method)) {
    headers['Content-Type'] = 'application/json';
  }

  const clone = req.clone({ setHeaders: headers, withCredentials: true });

  return next(clone).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 419 && MUTATING.has(req.method) && !req.context.get(CSRF_RETRIED)) {
        auth.clearCsrfToken();
        return auth.ensureCsrf().pipe(
          switchMap((token) => {
            const retriedHeaders: Record<string, string> = { ...headers };
            if (token) retriedHeaders['X-CSRF-TOKEN'] = token;
            return next(req.clone({
              context: req.context.set(CSRF_RETRIED, true),
              withCredentials: true,
              setHeaders: retriedHeaders,
            }));
          }),
          catchError(() => throwError(() => err)),
        );
      }

      const skipAuthRedirect = isPublicForm
        || req.url.includes('/auth/login')
        || req.url.includes('/auth/csrf')
        || req.url.includes('/auth/forgot-password')
        || req.url.includes('/auth/reset-password')
        || req.url.includes('/auth/logout');

      if (err.status === 401 && !skipAuthRedirect) {
        auth.clearSession();
        router.navigate(['/autenticacao']);
      } else if (err.status === 403 && auth.isAuthenticated() && req.url.includes('/api/v1/') && !req.url.includes('auth/send-verification-email')) {
        const body = err.error;
        const code = extractApiErrorCode(body);
        const msg = (typeof body === 'object' && body && 'message' in body
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
          router.navigate(['/verificacao-pendente']);
          return throwError(() => err);
        }
      }
      return throwError(() => err);
    })
  );
};
