import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { environment } from '../../../environments/environment';

/** Bloqueia rotas de desenvolvimento em builds de produção. */
export const devGuard: CanActivateFn = () => {
  if (!environment.production) {
    return true;
  }
  void inject(Router).navigate(['/404']);
  return false;
};
