import { Component, Input, ViewEncapsulation } from '@angular/core';

import { GestgoSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-list',
  standalone: true,
  imports: [GestgoSkeletonComponent],
  template: `
    <div class="zm-skeleton-list" aria-hidden="true">
      @for (i of indices; track i) {
        <div class="zm-skeleton-list__row">
          <g-skeleton class="zm-skeleton-list__icon" />
          <div class="zm-skeleton-list__text">
            <g-skeleton class="zm-skeleton-list__line zm-skeleton-list__line--lg" />
            <g-skeleton class="zm-skeleton-list__line zm-skeleton-list__line--sm" />
          </div>
          <g-skeleton class="zm-skeleton-list__badge" />
        </div>
      }
    </div>
  `,
  styleUrl: './skeleton-list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonListComponent {
  @Input() rows = 5;

  get indices(): number[] {
    const n = Math.max(0, this.rows);
    return Array.from({ length: n }, (_, i) => i);
  }
}
