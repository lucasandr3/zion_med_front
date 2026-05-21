import { Component, Input, ViewEncapsulation } from '@angular/core';

import { ZardSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-list',
  standalone: true,
  imports: [ZardSkeletonComponent],
  template: `
    <div class="zm-skeleton-list" aria-hidden="true">
      @for (i of indices; track i) {
        <div class="zm-skeleton-list__row">
          <z-skeleton class="zm-skeleton-list__icon" />
          <div class="zm-skeleton-list__text">
            <z-skeleton class="zm-skeleton-list__line zm-skeleton-list__line--lg" />
            <z-skeleton class="zm-skeleton-list__line zm-skeleton-list__line--sm" />
          </div>
          <z-skeleton class="zm-skeleton-list__badge" />
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
