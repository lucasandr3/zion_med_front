import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

function normalizePath(url: string): string {
  const path = url.split('?')[0] ?? url;
  return path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
}

export const permissionGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const perm = route.data['permission'] as string | undefined;
  const perms = route.data['permissions'] as string[] | undefined;
  const anyOf = route.data['permissionAny'] as string[] | undefined;

  let allowed = true;
  if (perm) allowed = auth.hasPermission(perm);
  if (allowed && perms?.length) allowed = perms.every((p) => auth.hasPermission(p));
  if (allowed && anyOf?.length) allowed = anyOf.some((p) => auth.hasPermission(p));

  if (allowed) return true;

  const fallback = auth.getDefaultTenantPath();
  const current = normalizePath(state.url);
  const next = normalizePath(fallback);
  if (current === next) {
    void router.navigateByUrl('/404');
    return false;
  }
  void router.navigateByUrl(fallback);
  return false;
};
