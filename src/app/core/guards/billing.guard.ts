import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

function normalizePath(url: string): string {
  const path = url.split('?')[0] ?? url;
  return path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
}

const ALLOWED_WHEN_BLOCKED = [
  '/assinatura',
  '/conta/perfil',
  '/clinica/configuracoes',
  '/clinica/escolher',
  '/dashboard',
];

/**
 * Redireciona quando a organização não pode usar o app (trial expirado / cobrança pendente).
 */
export const billingGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isPlatformAdmin()) {
    return true;
  }

  const path = normalizePath(state.url);
  if (ALLOWED_WHEN_BLOCKED.some((p) => path === p || path.startsWith(`${p}/`))) {
    return true;
  }

  return auth.me().pipe(
    map((res) => {
      const org = res.data.organization ?? res.data.clinic;
      const canAccess = org?.can_access_app !== false;
      if (canAccess) {
        return true;
      }
      const destino = auth.hasPermission('billing.manage') ? '/assinatura' : '/dashboard';
      void router.navigateByUrl(destino);
      return false;
    }),
    catchError(() => {
      const destino = auth.hasPermission('billing.manage') ? '/assinatura' : '/dashboard';
      void router.navigateByUrl(destino);
      return of(false);
    }),
  );
};
