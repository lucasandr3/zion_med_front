import { Injectable, effect, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ScreenService } from '../../shared/services/screen.service';

/**
 * Estado do drawer lateral no shell Gestgo.
 * Em mobile (&lt; 960px): overlay controlado por `open` + `body.sidebar-mobile-open`.
 * Em desktop: sidebar sempre visível via CSS; `open` fica true por padrão.
 */
@Injectable({ providedIn: 'root' })
export class SidebarMobileService {
  private readonly screen = inject(ScreenService);
  private readonly open$ = new BehaviorSubject<boolean>(false);

  constructor() {
    effect(() => {
      const mobile = this.screen.isMobile();
      // Entrando em mobile → fechado; saindo → aberto (paridade com up-app-shell).
      this.applyOpen(!mobile);
    });
  }

  setOpen(open: boolean): void {
    this.applyOpen(open);
  }

  getOpen(): Observable<boolean> {
    return this.open$.asObservable();
  }

  get isOpen(): boolean {
    return this.open$.value;
  }

  private applyOpen(open: boolean): void {
    if (this.open$.value !== open) {
      this.open$.next(open);
    }
    this.syncBody(open);
  }

  private syncBody(open: boolean): void {
    if (typeof document === 'undefined') {
      return;
    }
    const overlay = this.screen.isMobile() && open;
    document.body.classList.toggle('sidebar-mobile-open', overlay);
    document.body.style.overflow = overlay ? 'hidden' : '';
  }
}
