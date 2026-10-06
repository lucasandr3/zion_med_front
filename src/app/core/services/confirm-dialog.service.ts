import { Injectable, signal } from '@angular/core';

export type ConfirmDialogVariant = 'danger' | 'neutral';

export interface ConfirmDialogOptions {
  title: string;
  /** Texto único (sem trecho em negrito). */
  message?: string;
  /** Partes opcionais: antes + negrito + depois (ex.: nome do item). */
  messageBefore?: string;
  emphasis?: string;
  messageAfter?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmDialogVariant;
}

export interface ConfirmDialogState {
  title: string;
  message: string;
  messageBefore: string;
  emphasis: string;
  messageAfter: string;
  confirmLabel: string;
  cancelLabel: string;
  variant: ConfirmDialogVariant;
  /** true quando há partes (before/emphasis/after) em vez de message simples. */
  hasParts: boolean;
}

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  readonly open = signal(false);
  readonly state = signal<ConfirmDialogState | null>(null);

  private resolveFn: ((confirmed: boolean) => void) | null = null;

  /** Abre o modal e retorna uma Promise: `true` se confirmou, `false` se cancelou. */
  request(opts: ConfirmDialogOptions): Promise<boolean> {
    this.resolveFn?.(false);

    const hasParts = !!(opts.messageBefore || opts.emphasis || opts.messageAfter);
    this.state.set({
      title: opts.title,
      message: opts.message ?? '',
      messageBefore: opts.messageBefore ?? '',
      emphasis: opts.emphasis ?? '',
      messageAfter: opts.messageAfter ?? '',
      confirmLabel: opts.confirmLabel ?? 'Confirmar',
      cancelLabel: opts.cancelLabel ?? 'Cancelar',
      variant: opts.variant ?? 'neutral',
      hasParts,
    });
    this.open.set(true);

    return new Promise((resolve) => {
      this.resolveFn = resolve;
    });
  }

  confirm(): void {
    this.finish(true);
  }

  cancel(): void {
    this.finish(false);
  }

  private finish(confirmed: boolean): void {
    if (!this.resolveFn) return;
    const resolve = this.resolveFn;
    this.resolveFn = null;
    this.open.set(false);
    resolve(confirmed);
  }
}
