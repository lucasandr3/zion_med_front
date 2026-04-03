import { Injectable, signal } from '@angular/core';

/**
 * Indica que houve 403 billing_blocked em alguma chamada à API.
 * O layout exibe o aviso global; limpa ao navegar para outra rota.
 */
@Injectable({ providedIn: 'root' })
export class BillingBlockedStateService {
  private readonly active = signal(false);

  readonly isActive = this.active.asReadonly();

  activate(): void {
    this.active.set(true);
  }

  clear(): void {
    this.active.set(false);
  }
}
