import { Component, Input } from '@angular/core';
import { ZardSkeletonComponent } from '@/shared/components/skeleton/skeleton.component';

@Component({
  selector: 'zm-skeleton-links-publicos',
  standalone: true,
  imports: [ZardSkeletonComponent],
  template: `
    <div class="skel-links-publicos" aria-hidden="true">
      @for (row of rowsArray; track row) {
        <div class="skel-links-publicos__card">
          <div class="skel-links-publicos__head">
            <div class="skel-links-publicos__lead">
              <z-skeleton class="skel-links-publicos__icon" />
              <div class="skel-links-publicos__identity">
                <z-skeleton class="skel-links-publicos__name" />
                <z-skeleton class="skel-links-publicos__badge" />
              </div>
            </div>
            <div class="skel-links-publicos__aside">
              <z-skeleton class="skel-links-publicos__sub" />
              <z-skeleton class="skel-links-publicos__menu" />
            </div>
          </div>
          <div class="skel-links-publicos__actions">
            <z-skeleton class="skel-links-publicos__action" />
            <z-skeleton class="skel-links-publicos__action" />
            <z-skeleton class="skel-links-publicos__action" />
            <z-skeleton class="skel-links-publicos__action" />
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './skeleton-links-publicos.component.scss',
})
export class ZmSkeletonLinksPublicosComponent {
  @Input() rows = 3;

  get rowsArray(): number[] {
    return Array.from({ length: this.rows }, (_, i) => i);
  }
}
