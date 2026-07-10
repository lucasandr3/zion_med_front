import { Component, HostListener, inject } from '@angular/core';
import { GoAssistantShellService } from '../services/go-assistant-shell.service';

@Component({
  selector: 'go-assistant-fab',
  standalone: true,
  template: `
    <button
      type="button"
      class="go-assistant-fab"
      (click)="shell.toggle()"
      [attr.aria-expanded]="shell.open()"
      aria-controls="go-assistant-drawer"
      title="Go Assistant (Ctrl+/)"
    >
      <span class="material-symbols-outlined" aria-hidden="true">smart_toy</span>
      <span class="sr-only">Abrir Go Assistant</span>
    </button>
  `,
  styles: [
    `
      .go-assistant-fab {
        position: fixed;
        right: 1.25rem;
        bottom: 1.25rem;
        z-index: 40;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        border-radius: 9999px;
        border: 1px solid var(--border);
        background: var(--card, var(--background));
        color: var(--primary);
        box-shadow:
          0 10px 25px -12px rgb(0 0 0 / 0.35),
          0 0 0 1px rgb(0 0 0 / 0.03);
        cursor: pointer;
        transition:
          transform 0.15s ease,
          box-shadow 0.15s ease,
          background 0.15s ease;
      }
      .go-assistant-fab:hover {
        transform: translateY(-1px);
        box-shadow:
          0 14px 28px -12px rgb(0 0 0 / 0.4),
          0 0 0 1px rgb(0 0 0 / 0.04);
      }
      .go-assistant-fab:focus-visible {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
      }
      .go-assistant-fab .material-symbols-outlined {
        font-size: 1.35rem;
      }
      @media (max-width: 640px) {
        .go-assistant-fab {
          right: 1rem;
          bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
        }
      }
    `,
  ],
})
export class GoAssistantFabComponent {
  readonly shell = inject(GoAssistantShellService);

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    const isShortcut = (event.ctrlKey || event.metaKey) && event.key === '/';
    if (!isShortcut) return;
    event.preventDefault();
    this.shell.toggle();
  }
}
