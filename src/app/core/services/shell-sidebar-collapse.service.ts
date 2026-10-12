import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const LS_KEY = 'gestgo_sidebar_collapsed';
const BODY_CLASS = 'sidebar-collapsed';

/**
 * Collapse desktop da sidebar — signal como fonte de verdade (evita MutationObserver).
 * Mantém a classe no `body` para CSS legado.
 */
@Injectable({ providedIn: 'root' })
export class ShellSidebarCollapseService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly collapsedSignal = signal(false);
  private hydrated = false;

  readonly collapsed = this.collapsedSignal.asReadonly();

  /** Hidrata de localStorage/body na primeira leitura em browser. */
  ensureHydrated(): void {
    if (this.hydrated || !isPlatformBrowser(this.platformId)) {
      return;
    }
    this.hydrated = true;
    let fromLs = false;
    try {
      fromLs = localStorage.getItem(LS_KEY) === '1';
    } catch {
      /* ignore */
    }
    const fromBody = document.body.classList.contains(BODY_CLASS);
    this.apply(fromLs || fromBody, false);
  }

  setCollapsed(collapsed: boolean): void {
    this.ensureHydrated();
    this.apply(collapsed, true);
  }

  toggle(): void {
    this.ensureHydrated();
    this.apply(!this.collapsedSignal(), true);
  }

  private apply(collapsed: boolean, persist: boolean): void {
    this.collapsedSignal.set(collapsed);
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    document.body.classList.toggle(BODY_CLASS, collapsed);
    if (!persist) {
      return;
    }
    try {
      localStorage.setItem(LS_KEY, collapsed ? '1' : '0');
    } catch {
      /* ignore */
    }
  }
}
