import { ErrorHandler, Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHubService } from '../services/error-hub.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private errorHub = inject(ErrorHubService);

  handleError(error: unknown): void {
    console.error(error);

    if (error instanceof HttpErrorResponse) return;

    this.errorHub.reportRuntimeError(error);
  }
}
