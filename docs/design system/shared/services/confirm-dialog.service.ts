import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent, ConfirmDialogData } from '../components/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private readonly dialog = inject(MatDialog);

  open(data: ConfirmDialogData): Observable<boolean | undefined> {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data,
      autoFocus: 'dialog',
      restoreFocus: true,
      panelClass: 'up-confirm-dialog-panel',
      backdropClass: 'up-confirm-dialog-backdrop',
      width: '26rem',
      maxWidth: 'calc(100vw - 2rem)',
    });

    return ref.afterClosed();
  }

  confirmDelete(itemName: string): Observable<boolean | undefined> {
    return this.open({
      title: 'Excluir item?',
      message: `Você está prestes a excluir "${itemName}". Esta ação não pode ser desfeita. Deseja continuar?`,
      cancelLabel: 'Cancelar',
      confirmLabel: 'Excluir',
      icon: 'delete',
      tone: 'danger',
    });
  }

  confirmStatusChange(
    itemName: string,
    activating: boolean,
    itemLabel = 'item',
    deactivateHint = 'Integrações que usam essa chave deixarão de funcionar.',
  ): Observable<boolean | undefined> {
    const message = activating
      ? `Deseja ativar ${itemLabel} "${itemName}"?`
      : `Deseja desativar ${itemLabel} "${itemName}"? ${deactivateHint}`;

    return this.open({
      title: 'Alterar situação',
      message,
      cancelLabel: 'Cancelar',
      confirmLabel: activating ? 'Ativar' : 'Desativar',
      confirmIcon: activating ? 'toggle_on' : 'toggle_off',
      icon: activating ? 'toggle_on' : 'toggle_off',
      tone: activating ? 'info' : 'warning',
    });
  }
}
