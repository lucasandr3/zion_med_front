import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'up-list-filters-panel',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="filters-panel">
      <header class="filters-panel__header">
        <div class="filters-panel__heading">
          <mat-icon>filter_list</mat-icon>
          <span>Filtros e ordenação</span>
        </div>
        <button
          mat-icon-button
          type="button"
          aria-label="Fechar filtros"
          (click)="closed.emit()">
          <mat-icon>close</mat-icon>
        </button>
      </header>

      <div class="filters-panel__body">
        <ng-content />
      </div>

      <footer class="filters-panel__footer">
        <button mat-button type="button" class="filters-panel__clear" (click)="reset.emit()">
          <mat-icon>filter_alt_off</mat-icon>
          Limpar
        </button>
        <button mat-flat-button color="primary" type="button" (click)="apply.emit()">
          <mat-icon>check</mat-icon>
          Aplicar
        </button>
      </footer>
    </div>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }

    .filters-panel {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      background: rgb(var(--theme-floor-2));
      border-right: 1px solid var(--theme-line);
    }

    .filters-panel__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      flex-shrink: 0;
      min-height: 3.5rem;
      padding: 0 0.5rem 0 1rem;
      border-bottom: 1px solid var(--theme-line);
      background: rgb(var(--theme-floor-1));
    }

    .filters-panel__heading {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      font-size: 0.95rem;
      font-weight: 600;
      color: rgb(var(--theme-fg));

      mat-icon {
        color: rgb(var(--theme-fg) / 0.55);
      }
    }

    .filters-panel__body {
      flex: 1;
      min-height: 0;
      overflow: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .filters-panel__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      box-sizing: border-box;
      flex-shrink: 0;
      height: var(--layout-footer-height);
      min-height: var(--layout-footer-height);
      padding: 0.5rem 1rem;
      border-top: 1px solid var(--theme-line);
      background: rgb(var(--theme-floor-1));

      button mat-icon,
      button .mat-icon {
        margin-right: 0.2rem;
        font-size: 1.15rem;
        width: 1.15rem;
        height: 1.15rem;
      }
    }

    .filters-panel__clear.mat-mdc-button {
      --mdc-text-button-label-text-color: rgb(var(--theme-fg) / 0.72);
      --mat-text-button-state-layer-color: rgb(var(--theme-fg));
      color: rgb(var(--theme-fg) / 0.72);

      mat-icon,
      .mat-icon {
        color: rgb(var(--theme-fg) / 0.55);
      }

      &:hover {
        --mdc-text-button-label-text-color: rgb(var(--theme-fg));
        color: rgb(var(--theme-fg));

        mat-icon,
        .mat-icon {
          color: rgb(var(--theme-fg) / 0.72);
        }
      }
    }
  `,
})
export class ListFiltersPanelComponent {
  readonly closed = output<void>();
  readonly reset = output<void>();
  readonly apply = output<void>();
}
