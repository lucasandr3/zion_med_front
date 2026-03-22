import { Component } from '@angular/core';

@Component({
  selector: 'zm-skeleton-dashboard',
  standalone: true,
  template: `
    <div class="skel-dash relative min-h-[300px]">
      <div class="skel-dash__metrics">
        @for (m of metricSlots; track m) {
          <div class="skel-dash__metric">
            <div class="zm-skeleton skel-dash__metric-line"></div>
            <div class="zm-skeleton skel-dash__metric-num"></div>
            <div class="zm-skeleton skel-dash__metric-sub"></div>
          </div>
        }
      </div>
      <div class="skel-dash__panel">
        <div class="skel-dash__panel-head">
          <div class="zm-skeleton skel-dash__panel-head-line"></div>
        </div>
        @for (r of rowSlots; track r) {
          <div class="skel-dash__row">
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <div class="zm-skeleton skel-dash__icon"></div>
              <div class="skel-dash__text">
                <div class="zm-skeleton skel-dash__title-line"></div>
                <div class="zm-skeleton skel-dash__meta-line"></div>
              </div>
            </div>
            <div class="zm-skeleton skel-dash__badge"></div>
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './skeleton-dashboard.component.scss',
})
export class ZmSkeletonDashboardComponent {
  readonly metricSlots = [0, 1, 2];
  readonly rowSlots = [0, 1, 2, 3];
}
