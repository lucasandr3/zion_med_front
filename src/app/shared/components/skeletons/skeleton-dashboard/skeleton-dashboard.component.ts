import { Component, ViewEncapsulation } from '@angular/core';

import { ZardSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-dashboard',
  standalone: true,
  imports: [ZardSkeletonComponent],
  template: `
    <div class="skel-dash relative min-h-[300px]" aria-hidden="true">
      <div class="skel-dash__metrics">
        @for (m of metricSlots; track m) {
          <div class="skel-dash__metric">
            <z-skeleton class="skel-dash__metric-line" />
            <z-skeleton class="skel-dash__metric-num" />
            <z-skeleton class="skel-dash__metric-sub" />
          </div>
        }
      </div>
      <div class="skel-dash__panel">
        <div class="skel-dash__panel-head">
          <z-skeleton class="skel-dash__panel-head-line" />
        </div>
        @for (r of rowSlots; track r) {
          <div class="skel-dash__row">
            <div class="flex min-w-0 flex-1 items-center gap-3">
              <z-skeleton class="skel-dash__icon" />
              <div class="skel-dash__text">
                <z-skeleton class="skel-dash__title-line" />
                <z-skeleton class="skel-dash__meta-line" />
              </div>
            </div>
            <z-skeleton class="skel-dash__badge" />
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './skeleton-dashboard.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonDashboardComponent {
  readonly metricSlots = [0, 1, 2];
  readonly rowSlots = [0, 1, 2, 3];
}
