import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

const SHELL_MOBILE = '(max-width: 959.98px)';
const FILTER_MOBILE = '(max-width: 767.98px)';

function matches(query: string): boolean {
  return typeof window !== 'undefined' ? window.matchMedia(query).matches : false;
}

/**
 * Breakpoints compartilhados para shell, filtros e layouts responsivos (DS Gestgo).
 * Shell: &lt; 960px → sidenav overlay
 * Filtros: &lt; 768px → painel overlay / toolbar empilhada
 */
@Injectable({ providedIn: 'root' })
export class ScreenService {
  private readonly bp = inject(BreakpointObserver);

  readonly isMobile = toSignal(
    this.bp.observe(SHELL_MOBILE).pipe(map((r) => r.matches)),
    { initialValue: matches(SHELL_MOBILE) },
  );

  readonly isFilterMobile = toSignal(
    this.bp.observe(FILTER_MOBILE).pipe(map((r) => r.matches)),
    { initialValue: matches(FILTER_MOBILE) },
  );

  readonly sidenavMode = computed<'over' | 'side'>(() => (this.isMobile() ? 'over' : 'side'));

  readonly filterSidenavMode = computed<'over' | 'side'>(() =>
    this.isFilterMobile() ? 'over' : 'side',
  );
}
