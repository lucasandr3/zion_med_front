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

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  private readonly _options = signal<ConfirmDialogOptions | null>(null);
  /** Opções do modal aberto (somente leitura para o template). */
  readonly options = this._options.asReadonly();
  private resolve?: (value: boolean) => void;

  /** Abre o modal e retorna uma Promise: `true` se confirmou, `false` se cancelou. */
  request(opts: ConfirmDialogOptions): Promise<boolean> {
    return new Promise((resolve) => {
      this.resolve = resolve;
      this._options.set({
        cancelLabel: 'Cancelar',
        confirmLabel: 'Confirmar',
        variant: 'neutral',
        ...opts,
      });
    });
  }

  respond(confirmed: boolean): void {
    if (!this._options()) return;
    this._options.set(null);
    const r = this.resolve;
    this.resolve = undefined;
    r?.(confirmed);
  }
}
