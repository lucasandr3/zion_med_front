import { Injectable, inject } from '@angular/core';
import { GestgoDialogOptions, GestgoDialogService } from '@/shared/components/dialog';
import {
  FeedbackDialogComponent,
  type FeedbackDialogData,
} from '../../componentes/feedback/feedback-dialog.component';
import type { FeedbackSource } from './feedback.service';

@Injectable({ providedIn: 'root' })
export class FeedbackDialogService {
  private readonly dialog = inject(GestgoDialogService);

  open(source: FeedbackSource): void {
    const config = new GestgoDialogOptions<FeedbackDialogComponent, FeedbackDialogData>();
    config.zTitle = 'Enviar feedback';
    config.zContent = FeedbackDialogComponent;
    config.zData = { source };
    config.zHideFooter = true;
    config.zWidth = 'min(100vw - 2rem, 28rem)';
    config.zMaskClosable = true;
    this.dialog.create(config);
  }
}
