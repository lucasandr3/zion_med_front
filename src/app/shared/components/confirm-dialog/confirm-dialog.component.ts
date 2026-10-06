import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';

type NordModalElement = HTMLElement & {
  showModal: () => void;
  close: (returnValue?: string) => void;
  open: boolean;
  shadowRoot: ShadowRoot | null;
};

const CENTER_STYLE_ATTR = 'data-gestgo-modal-center';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  readonly dialog = inject(ConfirmDialogService);
  private readonly modalRef = viewChild<ElementRef<NordModalElement>>('modal');

  constructor() {
    effect(() => {
      const shouldOpen = this.dialog.open();
      const el = this.modalRef()?.nativeElement;
      if (!el) return;
      queueMicrotask(() => {
        this.ensureCentered(el);
        if (shouldOpen && !el.open) {
          el.showModal();
        } else if (!shouldOpen && el.open) {
          el.close();
        }
      });
    });
  }

  onCancel(): void {
    this.dialog.cancel();
    this.modalRef()?.nativeElement.close();
  }

  onConfirm(): void {
    this.dialog.confirm();
    this.modalRef()?.nativeElement.close();
  }

  /** Esc, backdrop ou botão fechar do Nord. */
  onClose(): void {
    this.dialog.cancel();
  }

  /** Nord modal ancora no topo; forçamos centro via shadow DOM (padrão pesquisa_app). */
  private ensureCentered(el: NordModalElement): void {
    const root = el.shadowRoot;
    if (!root || root.querySelector(`style[${CENTER_STYLE_ATTR}]`)) return;
    const style = document.createElement('style');
    style.setAttribute(CENTER_STYLE_ATTR, '');
    style.textContent = `
      .n-modal-backdrop {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-sizing: border-box !important;
        min-block-size: 100% !important;
        padding-block: var(--n-space-l) !important;
      }
      .n-modal {
        margin-block: 0 !important;
      }
    `;
    root.appendChild(style);
  }
}
