import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** Troca de empresa: apenas quem pode alternar contexto entre organizações. */
export const canSwitchOrganizationGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.canSwitchClinic()) return true;

  const fallback = auth.getDefaultTenantPath();
  const current = (state.url.split('?')[0] ?? state.url).replace(/\/$/, '') || '/';
  const next = fallback.replace(/\/$/, '') || '/';
  if (current === next) {
    void router.navigateByUrl('/404');
    return false;
  }
  void router.navigateByUrl(fallback);
  return false;
};
