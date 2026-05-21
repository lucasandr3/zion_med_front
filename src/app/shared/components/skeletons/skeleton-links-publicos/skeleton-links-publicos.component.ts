import { Component, Input, ViewEncapsulation } from '@angular/core';

import { ZardSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-links-publicos',
  standalone: true,
  imports: [ZardSkeletonComponent],
  template: `
    <div class="skel-links-publicos" aria-hidden="true">
      @for (i of indices; track i) {
        <div class="skel-links-publicos__card">
          <div class="skel-links-publicos__inner">
            <div class="skel-links-publicos__title">
              <z-skeleton class="skel-links-publicos__icon" />
              <z-skeleton class="skel-links-publicos__name" />
              <z-skeleton class="skel-links-publicos__badge" />
            </div>
            <div class="skel-links-publicos__actions">
              <z-skeleton class="skel-links-publicos__btn" />
              <z-skeleton class="skel-links-publicos__btn" />
              <z-skeleton class="skel-links-publicos__btn" />
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './skeleton-links-publicos.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonLinksPublicosComponent {
  @Input() rows = 3;

  get indices(): number[] {
    const n = Math.max(0, this.rows);
    return Array.from({ length: n }, (_, index) => index);
  }
}
