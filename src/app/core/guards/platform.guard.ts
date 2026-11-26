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

  if (!auth.canAccessPlatform()) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
