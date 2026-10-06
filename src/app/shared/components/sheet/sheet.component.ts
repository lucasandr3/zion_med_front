import { OverlayModule } from '@angular/cdk/overlay';
import {
  BasePortalOutlet,
  CdkPortalOutlet,
  type ComponentPortal,
  PortalModule,
  type TemplatePortal,
} from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  type ComponentRef,
  computed,
  ElementRef,
  type EmbeddedViewRef,
  type EventEmitter,
  inject,
  output,
  signal,
  type TemplateRef,
  type Type,
  viewChild,
  type ViewContainerRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideX } from '@ng-icons/lucide';


import { mergeClasses, noopFn } from '@/shared/utils/merge-classes';

import type { GestgoSheetRef } from './sheet-ref';
import { sheetVariants, type GestgoSheetVariants } from './sheet.variants';

export type OnClickCallback<T> = (instance: T) => false | void | object;
export class GestgoSheetOptions<T, U> {
  zCancelIcon?: string;
  zCancelText?: string | null;
  zClosable?: boolean;
  zContent?: string | TemplateRef<T> | Type<T>;
  zCustomClasses?: string;
  zData?: U;
  zDescription?: string;
  zHeight?: string;
  zHideFooter?: boolean;
  zMaskClosable?: boolean;
  zOkDestructive?: boolean;
  zOkDisabled?: boolean;
  zOkIcon?: string;
  zOkText?: string | null;
  zOnCancel?: EventEmitter<T> | OnClickCallback<T> = noopFn;
  zOnOk?: EventEmitter<T> | OnClickCallback<T> = noopFn;
  zSide?: GestgoSheetVariants['zSide'] = 'left';
  zSize?: GestgoSheetVariants['zSize'] = 'default';
  zTitle?: string | TemplateRef<T>;
  zViewContainerRef?: ViewContainerRef;
  zWidth?: string;
  /** Chamado quando o overlay termina de fechar (qualquer causa: ESC, backdrop, botão X, etc.). */
  zAfterClose?: () => void;
}

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'z-sheet',
  imports: [OverlayModule, PortalModule, NgIcon],
  template: `
    @if (config.zClosable || config.zClosable === undefined) {
      <nord-button type="button" data-testid="z-close-header-button" variant="plain" size="s" class="absolute cursor-pointer" (click)="onCloseClick()">
        <ng-icon name="lucideX" />
      </nord-button>
    }

    @if (config.zTitle || config.zDescription) {
      <header data-slot="sheet-header">
        @if (config.zTitle) {
          <div class="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
            <h4 data-testid="z-title" data-slot="sheet-title" class="m-0 truncate">
              {{ config.zTitle }}
            </h4>

            @if (config.zDescription) {
              <p data-testid="z-description" data-slot="sheet-description" class="m-0 truncate text-xs text-muted-foreground">
                {{ config.zDescription }}
              </p>
            }
          </div>
        }
      </header>
    }

    <main class="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
      <ng-template cdkPortalOutlet />

      @if (isStringContent) {
        <div data-testid="z-content" data-slot="sheet-content" [innerHTML]="config.zContent"></div>
      }
    </main>

    @if (!config.zHideFooter) {
      <footer data-slot="sheet-footer" class="mt-auto flex flex-col gap-2 p-4">
        @if (config.zOkText !== null) {
          <nord-button type="button" data-testid="z-ok-button" class="cursor-pointer" [attr.variant]="config.zOkDestructive ? 'danger' : 'primary'" [attr.disabled]="config.zOkDisabled" (click)="onOkClick()">
            @if (config.zOkIcon) {
              <ng-icon [svg]="config.zOkIcon" />
            }

            {{ config.zOkText ?? 'OK' }}
          </nord-button>
        }

        @if (config.zCancelText !== null) {
          <nord-button type="button" data-testid="z-cancel-button" class="cursor-pointer" variant="default" (click)="onCloseClick()">
            @if (config.zCancelIcon) {
              <ng-icon [svg]="config.zCancelIcon" />
            }

            {{ config.zCancelText ?? 'Cancel' }}
          </nord-button>
        }
      </footer>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ lucideX })],
  host: {
    'data-slot': 'sheet',
    '[class]': 'classes()',
    '[attr.data-state]': 'state()',
    '[style.width]': 'config.zWidth || null',
    '[style.height]': 'config.zHeight || null',
    '[style.maxWidth]': 'config.zWidth || null',
  },
  exportAs: 'zSheet',
})
export class GestgoSheetComponent<T, U> extends BasePortalOutlet {
  private readonly host = inject(ElementRef<HTMLElement>);
  protected readonly config = inject(GestgoSheetOptions<T, U>);

  protected readonly classes = computed(() => {
    const zSize = this.config.zWidth || this.config.zHeight ? 'custom' : this.config.zSize;

    return mergeClasses(
      sheetVariants({
        zSide: this.config.zSide,
        zSize,
      }),
      this.config.zCustomClasses,
    );
  });

  sheetRef?: GestgoSheetRef<T>;

  protected readonly isStringContent = typeof this.config.zContent === 'string';

  readonly portalOutlet = viewChild.required(CdkPortalOutlet);

  readonly okTriggered = output<void>();
  readonly cancelTriggered = output<void>();
  readonly state = signal<'closed' | 'open'>('closed');

  constructor() {
    super();
  }

  getNativeElement(): HTMLElement {
    return this.host.nativeElement;
  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this.portalOutlet()?.hasAttached()) {
      throw new Error('Attempting to attach modal content after content is already attached');
    }
    return this.portalOutlet()?.attachComponentPortal(portal);
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this.portalOutlet()?.hasAttached()) {
      throw new Error('Attempting to attach modal content after content is already attached');
    }

    return this.portalOutlet()?.attachTemplatePortal(portal);
  }

  onOkClick() {
    this.okTriggered.emit();
  }

  onCloseClick() {
    this.cancelTriggered.emit();
  }
}
