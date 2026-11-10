import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GestgoDialogRef } from '@/shared/components/dialog/dialog-ref';
import { Z_MODAL_DATA } from '@/shared/components/dialog/dialog.service';
import {
  FeedbackService,
  type FeedbackSource,
  type FeedbackType,
} from '../../core/services/feedback.service';
import { ToastService } from '../../core/services/toast.service';
import { extractApiErrorMessage } from '../../core/utils/clinical-validation.util';

export interface FeedbackDialogData {
  source: FeedbackSource;
}

@Component({
  selector: 'zm-feedback-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsModule],
  templateUrl: './feedback-dialog.component.html',
  styleUrl: './feedback-dialog.component.css',
})
export class FeedbackDialogComponent {
  private readonly data = inject<FeedbackDialogData>(Z_MODAL_DATA);
  private readonly dialogRef = inject(GestgoDialogRef);
  private readonly feedback = inject(FeedbackService);
  private readonly toast = inject(ToastService);
  private readonly cdr = inject(ChangeDetectorRef);

  type: FeedbackType = 'suggestion';
  title = '';
  message = '';
  enviando = false;

  selecionarTipo(tipo: FeedbackType): void {
    this.type = tipo;
    this.cdr.markForCheck();
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  enviar(): void {
    const title = this.title.trim();
    const message = this.message.trim();
    if (!title || !message || this.enviando) return;

    this.enviando = true;
    this.cdr.markForCheck();

    this.feedback
      .enviar({
        type: this.type,
        title,
        message,
        source: this.data.source,
      })
      .subscribe({
        next: (res) => {
          this.toast.success(res.message || 'Obrigado! Recebemos seu feedback.');
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.enviando = false;
          this.toast.error(
            'Não foi possível enviar',
            extractApiErrorMessage(err, 'Tente novamente em instantes.'),
          );
          this.cdr.markForCheck();
        },
      });
  }
}
