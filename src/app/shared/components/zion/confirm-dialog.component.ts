import { Component, computed, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type ConfirmDialogTone = 'warning' | 'danger' | 'info' | 'neutral';

export interface ConfirmDialogData {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmIcon?: string;
  cancelIcon?: string;
  icon?: string;
  tone?: ConfirmDialogTone;
}

@Component({
  selector: 'zion-confirm-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="confirm-dialog">
      <div class="confirm-dialog__header">
        <span class="confirm-dialog__icon" [attr.data-tone]="tone()">
          <mat-icon>{{ icon() }}</mat-icon>
        </span>
        <h2 class="confirm-dialog__title">{{ data.title || 'Aviso' }}</h2>
      </div>
      <p class="confirm-dialog__message">{{ data.message }}</p>
      <div class="confirm-dialog__actions">
        <button mat-stroked-button type="button" class="btn-cancel" (click)="close(false)">
          <mat-icon>{{ cancelIcon() }}</mat-icon>
          {{ data.cancelLabel || 'Cancelar' }}
        </button>
        <button mat-flat-button color="primary" type="button" class="confirm-dialog__confirm" (click)="close(true)">
          <mat-icon>{{ confirmIcon() }}</mat-icon>
          {{ data.confirmLabel || 'Confirmar' }}
        </button>
      </div>
    </div>
  `,
  styles: `
    .confirm-dialog {
      width: 100%;
      min-width: 0;
      max-width: 26rem;
      padding: 1.35rem 1.35rem 1.15rem;
      box-sizing: border-box;
    }

    .confirm-dialog__header {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 0.85rem;
    }

    .confirm-dialog__icon {
      display: inline-grid;
      place-items: center;
      flex-shrink: 0;
      width: 2.35rem;
      height: 2.35rem;
      border-radius: 0.65rem;
      background: rgb(var(--theme-fg) / 0.08);
      color: rgb(var(--theme-fg) / 0.75);

      mat-icon {
        font-size: 1.25rem;
        width: 1.25rem;
        height: 1.25rem;
      }

      &[data-tone='warning'] {
        background: rgb(234 179 8 / 0.16);
        color: rgb(202 138 4);
      }

      &[data-tone='danger'] {
        background: rgb(var(--theme-danger) / 0.14);
        color: rgb(var(--theme-danger));
      }

      &[data-tone='info'] {
        background: rgb(var(--theme-padrao) / 0.14);
        color: rgb(var(--theme-padrao));
      }
    }

    .confirm-dialog__title {
      margin: 0.2rem 0 0;
      font-size: 1.125rem;
      font-weight: 500;
      line-height: 1.3;
      color: rgb(var(--theme-fg));
    }

    .confirm-dialog__message {
      margin: 0;
      font-size: 0.95rem;
      line-height: 1.5;
      color: rgb(var(--theme-fg) / 0.78);
    }

    .confirm-dialog__actions {
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
      gap: 0.65rem;
      margin: 1.25rem -1.35rem -1.15rem;
      padding: 0.85rem 1.35rem 1.15rem;
      border-top: 1px solid var(--theme-line);

      button mat-icon,
      button .mat-icon {
        margin-right: 0.2rem;
        font-size: 1.15rem;
        width: 1.15rem;
        height: 1.15rem;
      }
    }

    .confirm-dialog__confirm {
      border-radius: 10px !important;
      background: rgb(var(--theme-padrao)) !important;
      color: #fff !important;
      font-weight: 600;
      box-shadow: none !important;
    }

    :host-context(html.dark) .confirm-dialog__icon {
      &[data-tone='warning'] {
        background: rgb(234 179 8 / 0.18);
        color: rgb(250 204 21);
      }
    }
  `,
})
export class ConfirmDialogComponent {
  readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent, boolean>);

  readonly icon = computed(() => this.data.icon || 'help_outline');
  readonly tone = computed(() => this.data.tone || 'neutral');
  readonly cancelIcon = computed(() => this.data.cancelIcon || 'close');
  readonly confirmIcon = computed(() => {
    if (this.data.confirmIcon) {
      return this.data.confirmIcon;
    }
    switch (this.tone()) {
      case 'danger':
        return 'delete';
      case 'warning':
        return 'check';
      case 'info':
        return 'check';
      default:
        return 'check';
    }
  });

  close(confirmed: boolean): void {
    this.dialogRef.close(confirmed);
  }
}
