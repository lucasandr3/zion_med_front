import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleHelp, lucideTrash2 } from '@ng-icons/lucide';

import { Z_MODAL_DATA } from './dialog.service';

export type ConfirmDialogVariant = 'danger' | 'neutral';

export interface ConfirmDialogData {
  message?: string;
  messageBefore?: string;
  emphasis?: string;
  messageAfter?: string;
  variant: ConfirmDialogVariant;
}

@Component({
  selector: 'zm-confirm-dialog-content',
  imports: [NgIcon],
  template: `
    <div class="flex gap-4 sm:items-start">
      <div
        class="flex size-10 shrink-0 items-center justify-center rounded-lg"
        [class]="iconWrapClass()"
      >
        <ng-icon [name]="iconName()" class="size-5!" />
      </div>
      <p class="min-w-0 pt-0.5 text-sm leading-relaxed text-muted-foreground">
        @if (data.message) {
          {{ data.message }}
        } @else {
          {{ data.messageBefore ?? '' }}@if (data.emphasis) {
            <strong class="font-semibold text-foreground">{{ data.emphasis }}</strong>
          }{{ data.messageAfter ?? '' }}
        }
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ lucideTrash2, lucideCircleHelp })],
})
export class ZmConfirmDialogContentComponent {
  readonly data = inject<ConfirmDialogData>(Z_MODAL_DATA);

  readonly iconName = computed(() =>
    this.data.variant === 'danger' ? 'lucideTrash2' : 'lucideCircleHelp',
  );

  readonly iconWrapClass = computed(() =>
    this.data.variant === 'danger'
      ? 'bg-destructive/10 text-destructive'
      : 'bg-primary/10 text-primary',
  );
}
