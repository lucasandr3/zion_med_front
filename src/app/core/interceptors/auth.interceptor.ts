import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { BillingBlockedStateService } from '../services/billing-blocked-state.service';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const billingBlockedState = inject(BillingBlockedStateService);

  const token = auth.getToken();
  const organizationId = auth.getCurrentOrganizationId();

  let clone = req;
  const isPublicForm = req.url.includes('formulario-publico');
  if (token && req.url.includes('/api/') && !isPublicForm) {
    const isMultipart = req.body instanceof FormData;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };
    if (organizationId != null && organizationId !== '') {
      headers['X-Organization-Id'] = String(organizationId);
      headers['X-Clinic-Id'] = String(organizationId);
    }
    // FormData: não definir Content-Type — o browser envia multipart/form-data com boundary.
    // Forçar application/json aqui impede o Laravel de receber logo/capa e gravar no storage/bucket.
    if (!isMultipart) {
      headers['Content-Type'] = req.headers.get('Content-Type') ?? 'application/json';
    }
    clone = req.clone({ setHeaders: headers });
  }

  return next(clone).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        auth.clearSession();
        router.navigate(['/autenticacao']);
      } else if (err.status === 403 && token && req.url.includes('/api/v1/') && !req.url.includes('auth/send-verification-email')) {
        const code = (err.error as { code?: string } | null)?.code;
        if (code === 'billing_blocked') {
          const url = req.url;
          const skipGlobalBanner =
            url.includes('/clinica/logs') ||
            url.includes('/api/v1/dashboard') ||
            url.includes('/api/v1/billing');
          if (!skipGlobalBanner) {
            billingBlockedState.activate();
          }
          return throwError(() => err);
        } else {
          router.navigate(['/verificacao-pendente']);
        }
      }
      return throwError(() => err);
    })
  );
};
