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
    clone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        ...(clinicId != null && clinicId !== '' ? { 'X-Clinic-Id': String(clinicId) } : {}),
        Accept: 'application/json',
        'Content-Type': req.headers.get('Content-Type') ?? 'application/json',
      },
    });
  }

  return next(clone).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        auth.clearSession();
        router.navigate(['/autenticacao']);
      }
      return throwError(() => err);
    })
  );
};
