import { Injectable, computed, inject, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { readNavLayoutFromDom, type NavLayout } from './user-appearance.sync';

@Injectable({ providedIn: 'root' })
export class ShellNavLayoutService {
  private readonly auth = inject(AuthService);
  private readonly layoutSignal = signal<NavLayout>(readNavLayoutFromDom());

  readonly layout = this.layoutSignal.asReadonly();
  readonly isHorizontal = computed(() => this.layoutSignal() === 'horizontal');

  constructor() {
    this.auth.appearanceApplied$.subscribe(() => {
      this.layoutSignal.set(readNavLayoutFromDom());
    });
  }

  refresh(): void {
    this.layoutSignal.set(readNavLayoutFromDom());
  }
}
