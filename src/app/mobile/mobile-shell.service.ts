import { Injectable, computed, signal } from '@angular/core';

export type MobileSheet = 'menu' | 'notifications' | null;

@Injectable({ providedIn: 'root' })
export class MobileShellService {
  readonly sheet = signal<MobileSheet>(null);

  readonly menuOpen = computed(() => this.sheet() === 'menu');
  readonly notificationsOpen = computed(() => this.sheet() === 'notifications');

  /** Contagens exibidas no sheet de pendências (atualizadas pela home). */
  readonly pendingCount = signal(0);
  readonly signedCount = signal(0);

  /** Última categoria aberta em Ferramentas (drill-down). */
  readonly lastToolCategory = signal<string | null>(null);

  /** Splash/preload de abertura do shell autenticado. */
  readonly booting = signal(true);

  finishBoot(delayMs = 450): void {
    if (typeof window === 'undefined') {
      this.booting.set(false);
      return;
    }
    window.setTimeout(() => this.booting.set(false), delayMs);
  }

  openMenu(): void {
    this.sheet.set('menu');
  }

  openNotifications(): void {
    this.sheet.set('notifications');
  }

  closeMenu(): void {
    this.sheet.set(null);
  }

  close(): void {
    this.sheet.set(null);
  }

  setDocCounts(pending: number, signed: number): void {
    this.pendingCount.set(pending);
    this.signedCount.set(signed);
  }
}
