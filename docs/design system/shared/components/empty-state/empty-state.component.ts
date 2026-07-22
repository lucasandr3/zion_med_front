import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'up-empty-state',
  imports: [MatIconModule],
  template: `
    <div class="empty-state">
      <div class="empty-state__icon" aria-hidden="true">
        <mat-icon>{{ icon() }}</mat-icon>
      </div>

      <div class="empty-state__copy">
        <h2>{{ title() }}</h2>
        @if (description()) {
          <p>{{ description() }}</p>
        }
      </div>

      <div class="empty-state__actions">
        <ng-content />
      </div>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex: 1;
      min-height: 0;
      width: 100%;
    }

    .empty-state {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.25rem;
      width: 100%;
      min-height: 18rem;
      padding: 2.5rem 1.5rem;
      text-align: center;
      box-sizing: border-box;
    }

    .empty-state__icon {
      display: grid;
      place-items: center;
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 1rem;
      background: rgb(var(--theme-padrao) / 0.16);
      color: rgb(var(--theme-fg));

      mat-icon {
        font-size: 1.75rem;
        width: 1.75rem;
        height: 1.75rem;
        color: rgb(80 140 0);
      }
    }

    .empty-state__copy {
      max-width: 24rem;
    }

    .empty-state__copy h2 {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 700;
      letter-spacing: -0.01em;
      color: rgb(var(--theme-fg));
    }

    .empty-state__copy p {
      margin: 0.45rem 0 0;
      font-size: 0.9rem;
      line-height: 1.45;
      color: rgb(var(--theme-fg) / 0.58);
    }

    .empty-state__actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 0.55rem;
      min-height: 0.5rem;
    }

    .empty-state__actions:empty {
      display: none;
    }

    :host-context(html.dark) .empty-state__icon mat-icon {
      color: rgb(var(--theme-padrao));
    }
  `,
})
export class EmptyStateComponent {
  readonly icon = input('inbox');
  readonly title = input.required<string>();
  readonly description = input('');
}
