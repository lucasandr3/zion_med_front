import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

/**
 * Voltar no toolbar — `nord-button` + `nord-icon` (pesquisa_app).
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
        <nord-icon name="arrow-left" size="s" aria-hidden="true"></nord-icon>
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

  private readonly route = inject(ActivatedRoute);

  get backUrl(): string | null {
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
