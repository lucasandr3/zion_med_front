import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

/**
 * Voltar no toolbar — `nord-button` + Material Symbols.
 * Use `url`/`data.urlVoltar` para navegação, ou `clickable` + `(backClick)` para voltar na mesma tela.
 */
@Component({
  selector: 'zm-page-back-link',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterLink],
  template: `
    @if (backUrl) {
      <nord-button
        type="button"
        [routerLink]="backUrl"
        [attr.title]="backLabel"
        [attr.aria-label]="backLabel"
      >
        <span class="material-symbols-outlined gestgo-mi gestgo-mi--s" aria-hidden="true">arrow_back</span>
        {{ backLabel }}
      </nord-button>
    } @else if (clickable) {
      <nord-button
        type="button"
        [attr.title]="backLabel"
        [attr.aria-label]="backLabel"
        (click)="backClick.emit($event)"
      >
        <span class="material-symbols-outlined gestgo-mi gestgo-mi--s" aria-hidden="true">arrow_back</span>
        {{ backLabel }}
      </nord-button>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      min-width: 0;
    }

    :host nord-button {
      --n-button-box-shadow: none;
      --_n-button-box-shadow: none;
    }
  `,
})
export class ZmPageBackLinkComponent {
  @Input() url?: string | null;
  @Input() label?: string | null;
  /** Quando true e sem `url`, emite `backClick` em vez de navegar. */
  @Input() clickable = false;
  @Output() readonly backClick = new EventEmitter<MouseEvent>();

  private readonly route = inject(ActivatedRoute);

  get backUrl(): string | null {
    if (this.clickable) {
      return null;
    }
    const fromInput = this.url?.trim();
    if (fromInput) {
      return fromInput;
    }
    const fromRoute = this.route.snapshot.data['urlVoltar'];
    return typeof fromRoute === 'string' && fromRoute.trim() !== '' ? fromRoute : null;
  }

  get backLabel(): string {
    const fromInput = this.label?.trim();
    if (fromInput) {
      return fromInput;
    }
    const fromRoute = this.route.snapshot.data['labelVoltar'];
    return typeof fromRoute === 'string' && fromRoute.trim() !== '' ? fromRoute : 'Voltar';
  }
}
