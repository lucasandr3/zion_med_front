import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { shouldAutoOpenMobile } from '../utils/gestgo-experience.util';

/**
 * Se for mobile e o usuário não pediu o painel, manda para `/m`.
 * Usado na home do painel (dashboard) para quem já está logado e abre o app no celular.
 */
export const mobileExperienceGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (!shouldAutoOpenMobile()) return true;
  return router.createUrlTree(['/m']);
};
