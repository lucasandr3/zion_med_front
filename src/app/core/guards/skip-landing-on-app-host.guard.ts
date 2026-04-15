import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { appPlataformaHostname } from '../util/plataforma-url';

/**
 * Evita exibir a landing na raiz quando o site é servido no host da aplicação
 * (ex.: app.gestgo.com.br). Não depende de headers do reverse proxy — resolve
 * casos em que o Nginx dentro do container não vê o host público.
 */
export const skipLandingOnAppHostGuard: CanActivateFn = (): boolean | UrlTree => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return true;
  }
  const expected = appPlataformaHostname();
  if (!expected || window.location.hostname !== expected) {
    return true;
  }
  return inject(Router).parseUrl('/autenticacao');
};
