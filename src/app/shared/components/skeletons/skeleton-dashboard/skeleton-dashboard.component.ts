import { Component, ViewEncapsulation } from '@angular/core';

import { GestgoSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-dashboard',
  standalone: true,
  imports: [GestgoSkeletonComponent],
  template: `
    <div class="skel-dash" aria-hidden="true">
      <header class="skel-dash__hero">
        <div class="skel-dash__hero-text">
          <g-skeleton class="skel-dash__eyebrow" />
          <g-skeleton class="skel-dash__title" />
          <g-skeleton class="skel-dash__sub" />
        </div>
        <div class="skel-dash__period">
          @for (p of periodSlots; track p) {
            <g-skeleton class="skel-dash__period-btn" />
          }
        </div>
      </header>

      <div class="skel-dash__kpis">
        @for (k of kpiSlots; track k) {
          <div class="skel-dash__kpi">
            <g-skeleton class="skel-dash__kpi-label" />
            <g-skeleton class="skel-dash__kpi-num" />
            <g-skeleton class="skel-dash__kpi-sub" />
          </div>
        }
      </div>

      <div class="skel-dash__split skel-dash__split--charts">
        <div class="skel-dash__panel">
          <div class="skel-dash__panel-head">
            <g-skeleton class="skel-dash__panel-title" />
            <div class="skel-dash__evo">
              @for (e of evoSlots; track e) {
                <div class="skel-dash__evo-item">
                  <g-skeleton class="skel-dash__evo-label" />
                  <g-skeleton class="skel-dash__evo-num" />
                </div>
              }
            </div>
          </div>
          <g-skeleton class="skel-dash__chart" />
        </div>
        <div class="skel-dash__panel">
          <div class="skel-dash__panel-head">
            <g-skeleton class="skel-dash__panel-title" />
            <g-skeleton class="skel-dash__panel-sub" />
          </div>
          <g-skeleton class="skel-dash__chart skel-dash__chart--donut" />
        </div>
      </div>

      <div class="skel-dash__split">
        @for (p of panelSlots; track p) {
          <div class="skel-dash__panel">
            <div class="skel-dash__panel-head skel-dash__panel-head--row">
              <g-skeleton class="skel-dash__panel-title" />
            </div>
            @for (r of rowSlots; track r) {
              <div class="skel-dash__row">
                <div class="skel-dash__row-text">
                  <g-skeleton class="skel-dash__row-title" />
                  <g-skeleton class="skel-dash__row-meta" />
                </div>
                <g-skeleton class="skel-dash__badge" />
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './skeleton-dashboard.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonDashboardComponent {
  readonly periodSlots = [0, 1, 2];
  readonly kpiSlots = [0, 1, 2, 3];
  readonly evoSlots = [0, 1, 2];
  readonly panelSlots = [0, 1];
  readonly rowSlots = [0, 1, 2];
}
