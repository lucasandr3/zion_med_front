import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated() || !auth.getUser()) {
    void router.navigate(['/autenticacao']);
    return false;
  }

  return auth.validateSession().pipe(
    map((valid) => {
      if (!valid) {
        void router.navigate(['/autenticacao']);
      }
      return valid;
    }),
  );
};
