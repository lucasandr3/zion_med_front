import { Component, Input } from '@angular/core';

import { ZardSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-card',
  standalone: true,
  imports: [ZardSkeletonComponent],
  template: `
    <z-skeleton
      class="w-full rounded-xl border border-border"
      [style.height.px]="height"
      aria-hidden="true"
    />
  `,
})
export class ZmSkeletonCardComponent {
  @Input() height = 120;
}
