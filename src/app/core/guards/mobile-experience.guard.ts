import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isMobileExperienceEnabled, shouldAutoOpenMobile } from '../utils/gestgo-experience.util';

/**
 * Se for mobile e o usuário não pediu o painel, manda para `/m`.
 * Usado na home do painel (dashboard) para quem já está logado e abre o app no celular.
 */
export const mobileExperienceGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (!shouldAutoOpenMobile()) return true;
  return router.createUrlTree(['/m']);
};

/**
 * Bloqueia `/m` enquanto a experiência mobile estiver desligada no environment.
 */
export const mobileRoutesEnabledGuard: CanActivateFn = () => {
  if (isMobileExperienceEnabled()) return true;
  return inject(Router).createUrlTree(['/dashboard']);
};

/** Login mobile → login do painel quando `/m` está desligado. */
export const mobileLoginEnabledGuard: CanActivateFn = () => {
  if (isMobileExperienceEnabled()) return true;
  return inject(Router).createUrlTree(['/autenticacao']);
};
