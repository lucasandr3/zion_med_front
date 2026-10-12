import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  output,
  type TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import type { ClassValue } from 'clsx';

import { GestgoStringTemplateOutletDirective } from '@/shared/core';
import { mergeClasses } from '@/shared/utils/merge-classes';

/**
 * Compat `g-card` sobre `nord-card` (padrão pesquisa_app).
 * O host é só wrapper — o chrome visual fica só no `nord-card` (evita card dentro de card).
 */
@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'g-card',
  imports: [GestgoStringTemplateOutletDirective],
  template: `
    <nord-card padding="m" class="g-card__surface" [class]="surfaceClass()">
      @let title = zTitle();
      @if (title) {
        <h2 slot="header" class="g-card__title n-reset">
          <ng-container *zStringTemplateOutlet="title">{{ title }}</ng-container>
        </h2>
      }

      @let description = zDescription();
      @if (description) {
        <p slot="header" class="g-card__description n-reset n-muted">
          <ng-container *zStringTemplateOutlet="description">{{ description }}</ng-container>
        </p>
      }

      @let action = zAction();
      @if (action) {
        <nord-button
          slot="header-end"
          type="button"
          variant="plain"
          size="s"
          (click)="onClick()"
        >
          {{ action }}
        </nord-button>
      }

      <ng-content />

      <div slot="footer" class="g-card__footer">
        <ng-content select="[card-footer]" />
      </div>
    </nord-card>
  `,
  styles: `
    /*
     * Um único chrome visual: o de .n-card no shadow do nord-card.
     * Host Angular e o custom element nord-card ficam sem border/bg/shadow —
     * senão Tailwind (border/bg-card) ou CSS de página pintam por fora e
     * parece card dentro de card.
     */
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      visibility: visible !important;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0 !important;
      margin: 0;
      border-radius: 0 !important;
      gap: 0 !important;
    }

    :host .g-card__surface,
    :host nord-card {
      display: block;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0 !important;
      margin: 0;
      border-radius: 0 !important;
    }

    .g-card__title {
      margin: 0;
      font-size: var(--n-font-size-l, 1.125rem);
      font-weight: 600;
      line-height: 1.3;
    }

    .g-card__description {
      margin: 0.25rem 0 0;
      font-size: var(--n-font-size-s, 0.875rem);
    }

    .g-card__footer:empty {
      display: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'gCard',
})
export class GestgoCardComponent {
  readonly class = input<ClassValue>('');
  /** @deprecated Nord card usa dividers nativos; mantido por compat. */
  readonly zFooterBorder = input(false);
  /** @deprecated Nord card usa dividers nativos; mantido por compat. */
  readonly zHeaderBorder = input(false);
  readonly zAction = input('');
  readonly zDescription = input<string | TemplateRef<void>>();
  readonly zTitle = input<string | TemplateRef<void>>();

  readonly zActionClick = output<void>();

  protected readonly surfaceClass = computed(() => mergeClasses(this.class()));

  protected onClick(): void {
    this.zActionClick.emit();
  }
}
