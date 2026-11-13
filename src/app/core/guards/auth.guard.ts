import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

function loginPathFor(url: string): string {
  return url === '/m' || url.startsWith('/m/') ? '/m/login' : '/autenticacao';
}

export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const loginPath = loginPathFor(state.url);

  if (!auth.isAuthenticated() || !auth.getUser()) {
    void router.navigateByUrl(loginPath);
    return false;
  }

  return auth.validateSession().pipe(
    map((valid) => {
      if (!valid) {
        void router.navigateByUrl(loginPath);
      }
      return valid;
    }),
  );
};
