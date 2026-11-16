import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export type MobileToolMode = 'list' | 'form';

/** Contexto das tools — mobile (`/m/ferramentas`) ou desktop (`/utilitarios`). */
export function injectMobileToolContext(): {
  isMobileShell: boolean;
  hubLink: string;
  listLink: string;
  formLink: string;
  backLink: string;
  mode: MobileToolMode;
} {
  const router = inject(Router);
  const route = inject(ActivatedRoute);
  const path = (router.url.split('?')[0] || '/').replace(/\/$/, '') || '/';
  const isMobileShell = path === '/m' || path.startsWith('/m/');
  const hubLink = isMobileShell ? '/m/ferramentas' : '/utilitarios';
  const mode = (route.snapshot.data['toolMode'] as MobileToolMode) || 'list';

  const toolKey = (() => {
    const m = path.match(/\/(?:ferramentas|utilitarios)\/([^/?]+)/);
    return m?.[1] || '';
  })();

  const listLink = toolKey ? `${hubLink}/${toolKey}` : hubLink;
  const formLink = toolKey ? `${listLink}/novo` : hubLink;

  return {
    isMobileShell,
    hubLink,
    listLink,
    formLink,
    backLink: mode === 'form' ? listLink : hubLink,
    mode,
  };
}
