import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'zion-list-filters-panel',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="filters-panel__backdrop" aria-hidden="true" (click)="closed.emit()"></div>
    <aside class="filters-panel" role="dialog" aria-modal="true" aria-label="Filtros">
      <header class="filters-panel__header">
        <div class="filters-panel__heading">
          <mat-icon>filter_list</mat-icon>
          <span>Filtros</span>
        </div>
        <button
          mat-icon-button
          type="button"
          class="filters-panel__close"
          aria-label="Fechar filtros"
          (click)="closed.emit()"
        >
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
    </aside>
  `,
  styles: `
    :host {
      display: block;
    }

    .filters-panel__backdrop {
      position: fixed;
      inset: 0;
      z-index: 70;
      margin: 0;
      background: rgb(0 0 0 / 35%);
      cursor: pointer;
    }

    .filters-panel {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 80;
      display: flex;
      flex-direction: column;
      width: min(100vw, 22.5rem);
      margin: 0;
      padding: 0;
      border: none;
      background: rgb(var(--theme-floor-1));
      color: rgb(var(--theme-fg));
      box-shadow: -8px 0 32px rgb(0 0 0 / 18%);
      overflow: hidden;
      animation: filters-panel-slide-in 0.22s ease-out;
    }

    @keyframes filters-panel-slide-in {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }

    .filters-panel__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      flex-shrink: 0;
      box-sizing: border-box;
      height: var(--shell-header-height, 3.5rem);
      min-height: var(--shell-header-height, 3.5rem);
      margin: 0;
      padding: 0 0.5rem 0 1rem;
      border: none;
      background: rgb(var(--theme-padrao-2));
      color: #fff;
    }

    .filters-panel__heading {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      font-size: 0.95rem;
      font-weight: 600;
      color: #fff;

      mat-icon {
        color: rgb(255 255 255 / 0.85);
      }
    }

    .filters-panel__close {
      color: #fff !important;
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
export class ListFiltersPanelComponent implements OnInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly closed = output<void>();
  readonly reset = output<void>();
  readonly apply = output<void>();

  ngOnInit(): void {
    // Sai do mat-sidenav (transform) para o overlay cobrir sidebar + header.
    document.body.appendChild(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.host.nativeElement.remove();
  }
}
