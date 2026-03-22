import { Component, Input } from '@angular/core';

@Component({
  selector: 'zm-skeleton-list',
  standalone: true,
  template: `
    <div class="zm-skeleton-list">
      @for (i of indices; track i) {
        <div class="zm-skeleton-list__row">
          <div class="zm-skeleton zm-skeleton-list__icon"></div>
          <div class="zm-skeleton-list__text">
            <div class="zm-skeleton zm-skeleton-list__line zm-skeleton-list__line--lg"></div>
            <div class="zm-skeleton zm-skeleton-list__line zm-skeleton-list__line--sm"></div>
          </div>
          <div class="zm-skeleton zm-skeleton-list__badge"></div>
        </div>
      }
    </div>
  `,
  styleUrl: './skeleton-list.component.scss',
})
export class ZmSkeletonListComponent {
  @Input() rows = 5;

  get indices(): number[] {
    const n = Math.max(0, this.rows);
    return Array.from({ length: n }, (_, i) => i);
  }
}
