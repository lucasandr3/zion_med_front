import { inject, Injectable } from '@angular/core';

import {
  ZardDialogOptions,
  ZardDialogService,
} from '../../shared/components/dialog';
import {
  type ConfirmDialogData,
  type ConfirmDialogVariant,
  ZmConfirmDialogContentComponent,
} from '../../shared/components/dialog/confirm-dialog-content.component';

export type { ConfirmDialogVariant };

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
  private readonly zardDialog = inject(ZardDialogService);

  /** Abre o modal e retorna uma Promise: `true` se confirmou, `false` se cancelou. */
  request(opts: ConfirmDialogOptions): Promise<boolean> {
    return new Promise((resolve) => {
      let settled = false;
      const settle = (value: boolean): void => {
        if (settled) return;
        settled = true;
        resolve(value);
      };

      const variant = opts.variant ?? 'neutral';
      const config = new ZardDialogOptions<
        ZmConfirmDialogContentComponent,
        ConfirmDialogData
      >();
      config.zTitle = opts.title;
      config.zContent = ZmConfirmDialogContentComponent;
      config.zData = {
        message: opts.message,
        messageBefore: opts.messageBefore,
        emphasis: opts.emphasis,
        messageAfter: opts.messageAfter,
        variant,
      };
      config.zOkText = opts.confirmLabel ?? 'Confirmar';
      config.zCancelText = opts.cancelLabel ?? 'Cancelar';
      config.zOkDestructive = variant === 'danger';
      config.zClosable = false;
      config.zMaskClosable = true;
      config.zWidth = '28rem';
      config.zCustomClasses = 'sm:max-w-md';
      config.zOnOk = () => settle(true);
      config.zOnCancel = () => settle(false);

      const dialogRef = this.zardDialog.create(config);
      const originalClose = dialogRef.close.bind(dialogRef);
      dialogRef.close = (result?: boolean): void => {
        if (!settled) {
          settle(result === true);
        }
        originalClose(result);
      };
    });
  }
}
