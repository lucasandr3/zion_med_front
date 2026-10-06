import { Injectable, signal } from '@angular/core';

/**
 * Estado do drawer da sidebar no mobile (fonte de verdade reativa para zoneless).
 */
@Injectable({ providedIn: 'root' })
export class SidebarMobileService {
  private readonly openSignal = signal(false);

  /** Leitura reativa — use no template como `sidebarMobile.isOpen()`. */
  readonly isOpen = this.openSignal.asReadonly();

  setOpen(open: boolean): void {
    if (this.openSignal() === open) {
      return;
    }
    this.openSignal.set(open);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = open ? 'hidden' : '';
    }
  }

  toggle(): void {
    this.setOpen(!this.openSignal());
  }
}
