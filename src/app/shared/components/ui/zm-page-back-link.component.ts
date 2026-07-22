import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'zm-page-back-link',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    @if (backUrl) {
      <a
        [routerLink]="backUrl"
        mat-stroked-button
        class="zm-page-back-link btn-cancel shrink-0"
        [attr.title]="backLabel"
        [attr.aria-label]="backLabel"
      >
        <mat-icon>arrow_back</mat-icon>
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
