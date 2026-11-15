import { inject } from '@angular/core';
import { Router } from '@angular/router';

/** Contexto das tools — por enquanto só no mobile (`/m/ferramentas`). */
export function injectMobileToolContext(): { isMobileShell: boolean; backLink: string } {
  const path = (inject(Router).url.split('?')[0] || '/').replace(/\/$/, '') || '/';
  const isMobileShell = path === '/m' || path.startsWith('/m/');
  return {
    isMobileShell,
    backLink: '/m/ferramentas',
  };
}
