import { Component, Input } from '@angular/core';
import { GestgoSkeletonComponent } from '@/shared/components/skeleton/skeleton.component';

@Component({
  selector: 'zm-skeleton-links-publicos',
  standalone: true,
  imports: [GestgoSkeletonComponent],
  template: `
    <div class="skel-links-publicos" aria-hidden="true">
      @for (row of rowsArray; track row) {
        <div class="skel-links-publicos__card">
          <div class="skel-links-publicos__head">
            <div class="skel-links-publicos__lead">
              <g-skeleton class="skel-links-publicos__icon" />
              <div class="skel-links-publicos__identity">
                <g-skeleton class="skel-links-publicos__name" />
                <g-skeleton class="skel-links-publicos__badge" />
              </div>
            </div>
            <g-skeleton class="skel-links-publicos__menu" />
          </div>
          <g-skeleton class="skel-links-publicos__stat" />
          <div class="skel-links-publicos__share">
            <g-skeleton class="skel-links-publicos__hint" />
            <g-skeleton class="skel-links-publicos__url" />
          </div>
          <div class="skel-links-publicos__actions">
            <g-skeleton class="skel-links-publicos__action" />
            <g-skeleton class="skel-links-publicos__action" />
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './skeleton-links-publicos.component.scss',
})
export class ZmSkeletonLinksPublicosComponent {
  @Input() rows = 6;

  get rowsArray(): number[] {
    return Array.from({ length: this.rows }, (_, i) => i);
  }
}
