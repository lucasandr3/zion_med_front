import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const platformGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    router.navigate(['/autenticacao']);
    return false;
  }

  const user = auth.getUser();
  if (user?.role !== 'platform_admin') {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
