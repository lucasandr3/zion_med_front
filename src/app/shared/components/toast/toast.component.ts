import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

/**
 * Host global de toasts Nord (`nord-toast-group`), padrão pesquisa_app.
 * Substituí ngx-sonner / gestgo-toaster.
 */
@Component({
  selector: 'gestgo-toaster',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nord-toast-group>
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
    }
  `,
  exportAs: 'gestgoToaster',
})
export class GestgoToasterComponent {
  readonly toast = inject(ToastService);
}

/** @deprecated Use GestgoToasterComponent */
export { GestgoToasterComponent as GestgoToastComponent };
