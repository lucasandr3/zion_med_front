import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorHubService } from '../services/error-hub.service';

export const errorHubInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHub = inject(ErrorHubService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      errorHub.reportHttpError(err, req);
      return throwError(() => err);
    }),
  );
};
