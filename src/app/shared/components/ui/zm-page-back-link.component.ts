import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ZardButtonComponent } from '@/shared/components/button/button.component';

@Component({
  selector: 'zm-page-back-link',
  standalone: true,
  imports: [RouterLink, ZardButtonComponent],
  template: `
    @if (backUrl) {
      <a
        [routerLink]="backUrl"
        z-button
        zType="outline"
        zSize="sm"
        class="zm-page-back-link shrink-0 gap-1.5 no-underline"
        [attr.title]="backLabel"
        [attr.aria-label]="backLabel"
      >
        <span class="material-symbols-outlined text-base" aria-hidden="true">arrow_back</span>
        {{ backLabel }}
      </a>
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
