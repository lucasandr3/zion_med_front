import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  OnDestroy,
} from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

/**
 * Host global de toasts Nord (`nord-toast-group`).
 * Posição: centro inferior da viewport.
 */
@Component({
  selector: 'gestgo-toaster',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nord-toast-group #group>
      @if (toast.visible()) {
        <nord-toast
          [variant]="toast.variant()"
          [autoDismiss]="toast.durationMs()"
          (dismiss)="toast.hide()"
        >
          {{ toast.message() }}
        </nord-toast>
      }
    </nord-toast-group>
  `,
  styles: `
    :host {
      visibility: visible !important;
      display: contents;
    }
  `,
  exportAs: 'gestgoToaster',
})
export class GestgoToasterComponent implements AfterViewInit, OnDestroy {
  readonly toast = inject(ToastService);
  private readonly host = inject(ElementRef<HTMLElement>);
  private injectedStyle: HTMLStyleElement | null = null;

  ngAfterViewInit(): void {
    void this.positionToastGroupBottomCenter();
  }

  ngOnDestroy(): void {
    this.injectedStyle?.remove();
    this.injectedStyle = null;
  }

  private async positionToastGroupBottomCenter(): Promise<void> {
    await customElements.whenDefined('nord-toast-group');
    const group = this.host.nativeElement.querySelector('nord-toast-group');
    if (!(group instanceof HTMLElement) || !group.shadowRoot) return;

    const style = document.createElement('style');
    style.textContent = `
      .n-toast-group {
        inset-inline: 0 !important;
        inset-inline-end: 0 !important;
        inset-block-end: 0 !important;
        inset-block-start: auto !important;
        align-items: center !important;
        margin: 0 auto 1.25rem !important;
        width: 100% !important;
        max-inline-size: none !important;
        box-sizing: border-box;
        padding-inline: 1rem;
      }
      ::slotted(nord-toast) {
        margin-inline: auto;
      }
    `;
    group.shadowRoot.appendChild(style);
    this.injectedStyle = style;
  }
}

/** @deprecated Use GestgoToasterComponent */
export { GestgoToasterComponent as GestgoToastComponent };
