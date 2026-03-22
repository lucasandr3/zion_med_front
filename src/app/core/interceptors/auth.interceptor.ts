import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getToken();
  const clinicId = auth.getCurrentClinicId();

  let clone = req;
  const isPublicForm = req.url.includes('formulario-publico');
  if (token && req.url.includes('/api/') && !isPublicForm) {
    const isMultipart = req.body instanceof FormData;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };
    if (clinicId != null && clinicId !== '') {
      headers['X-Clinic-Id'] = String(clinicId);
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
        router.navigate(['/verificacao-pendente']);
      }
      return throwError(() => err);
    })
  );
};
