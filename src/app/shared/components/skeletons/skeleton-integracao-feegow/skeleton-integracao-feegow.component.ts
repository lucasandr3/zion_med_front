import { Component, ViewEncapsulation } from '@angular/core';

import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { GestgoSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-integracao-feegow',
  standalone: true,
  imports: [GestgoCardComponent, GestgoSkeletonComponent],
  template: `
    <div
      class="feegow-skeleton zm-content-enter flex w-full flex-col gap-5 bg-background p-5 sm:px-6 lg:px-8"
      aria-hidden="true"
      aria-busy="true"
    >
      <g-card class="section-card gap-0 overflow-hidden border-border bg-card py-0 shadow-sm **:data-[slot=card-content]:p-0">
        <div class="section-header">
          <g-skeleton class="size-7 shrink-0 rounded-lg" />
          <g-skeleton class="h-3.5 w-36 rounded-md" />
          <g-skeleton class="ml-auto h-5 w-28 shrink-0 rounded-full" />
        </div>
        <div class="section-body space-y-3">
          <g-skeleton class="h-3.5 w-full max-w-md rounded-md" />
          <g-skeleton class="h-3 w-52 rounded-md" />
        </div>
      </g-card>

      <g-card class="section-card gap-0 overflow-hidden border-border bg-card py-0 shadow-sm **:data-[slot=card-content]:p-0">
        <div class="section-header">
          <g-skeleton class="size-7 shrink-0 rounded-lg" />
          <g-skeleton class="h-3.5 w-40 rounded-md" />
        </div>
        <div class="section-body space-y-4">
          <div class="flex items-center justify-between gap-3">
            <g-skeleton class="h-3.5 w-48 rounded-md" />
            <g-skeleton class="h-6 w-11 rounded-full" />
          </div>
          @for (field of fieldIndices; track field) {
            <div class="space-y-2">
              <g-skeleton class="h-3 w-24 rounded-md" />
              <g-skeleton class="h-9 w-full rounded-md" />
            </div>
          }
          <div class="flex flex-wrap gap-3 pt-1">
            <g-skeleton class="h-9 w-40 rounded-md" />
            <g-skeleton class="h-9 w-36 rounded-md" />
          </div>
        </div>
      </g-card>
    </div>
  `,
  styleUrl: './skeleton-integracao-feegow.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonIntegracaoFeegowComponent {
  readonly fieldIndices = [1, 2];
}
