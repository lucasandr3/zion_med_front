import { Component, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'up-page-loading',
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="up-page-loading__panel" role="status" [attr.aria-label]="text()">
      <mat-spinner diameter="48" />
      <span class="up-page-loading__text">{{ text() }}</span>
    </div>
  `,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: grid;
      place-items: center;
      background: rgb(var(--theme-floor-2) / 0.45);
      backdrop-filter: blur(1.5px);
      -webkit-backdrop-filter: blur(1.5px);
    }

    .up-page-loading__panel {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .up-page-loading__text {
      font-size: 0.95rem;
      font-weight: 500;
      letter-spacing: 0.01em;
      color: rgb(var(--theme-fg) / 0.8);
    }

    :host ::ng-deep .mat-mdc-progress-spinner {
      --mdc-circular-progress-active-indicator-color: rgb(var(--theme-padrao));
    }
  `,
  host: {
    class: 'up-page-loading',
  },
})
export class PageLoadingComponent implements OnInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly text = input('Carregando...');

  ngOnInit(): void {
    // Sai do stacking context do mat-sidenav-content para cobrir a sidebar também
    document.body.appendChild(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.host.nativeElement.remove();
  }
}
