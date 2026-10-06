import { Component, Input } from '@angular/core';

import { GestgoSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-card',
  standalone: true,
  imports: [GestgoSkeletonComponent],
  template: `
    <g-skeleton
      class="w-full rounded-xl border border-border"
      [style.height.px]="height"
      aria-hidden="true"
    />
  `,
})
export class ZmSkeletonCardComponent {
  @Input() height = 120;
}
