import { Component, ViewEncapsulation } from '@angular/core';

import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-link-bio',
  standalone: true,
  imports: [ZardCardComponent, ZardSkeletonComponent],
  template: `
    <div
      class="link-bio-skeleton link-bio-shell zm-content-enter flex w-full flex-col bg-background"
      aria-hidden="true"
      aria-busy="true"
    >
      <div
        class="link-bio-skeleton__tabs flex shrink-0 flex-nowrap items-center gap-2.5 overflow-x-auto border-b border-border bg-card"
        role="presentation"
      >
        @for (tab of mainTabSkeletons; track tab.width) {
          <div class="link-bio-skeleton__tab-pill" [style.width]="tab.width">
            <z-skeleton class="block h-full w-full rounded-lg" />
          </div>
        }
      </div>

      <div class="link-bio-tab-panel flex flex-col gap-5">
        <z-card
          class="section-card link-bio-header-card gap-0 overflow-hidden rounded-[0.875rem] border-border bg-card py-0 shadow-sm **:data-[slot=card-content]:p-0"
        >
          <div class="section-header">
            <z-skeleton class="mb-3 h-3 w-14 rounded-md" />
            <div class="flex flex-wrap items-center gap-3">
              <z-skeleton class="h-7 w-52 max-w-full rounded-md" />
              <z-skeleton class="h-6 w-[5.5rem] shrink-0 rounded-full" />
            </div>
          </div>
          <div class="section-body">
            <div class="flex flex-wrap items-center gap-2">
              <z-skeleton class="link-bio-skeleton__url h-[length:var(--control-height)] min-h-[length:var(--control-height)] min-w-0 flex-1 basis-full rounded-lg sm:max-w-md" />
              <z-skeleton class="h-[length:var(--button-height)] w-[4.75rem] shrink-0 rounded-lg" />
              <z-skeleton class="h-[length:var(--button-height)] w-[6.25rem] shrink-0 rounded-lg" />
              <z-skeleton class="h-[length:var(--button-height)] w-[8.5rem] shrink-0 rounded-lg" />
            </div>
          </div>
        </z-card>

        <div class="link-bio-skeleton__metrics link-bio-metrics-grid">
          @for (metric of metricIndices; track metric) {
            <z-card
              class="link-bio-metric-card gap-0 rounded-lg border-border bg-card py-0 shadow-none **:data-[slot=card-content]:p-4"
            >
              <z-skeleton class="mb-2 h-3 w-20 rounded-md" />
              <z-skeleton class="mb-1.5 h-8 w-14 rounded-md" />
              <z-skeleton class="h-3 w-24 rounded-md" />
            </z-card>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './skeleton-link-bio.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonLinkBioComponent {
  readonly mainTabSkeletons = [
    { width: '6.5rem' },
    { width: '5.75rem' },
  ];

  readonly metricIndices = [1, 2, 3, 4];
}
