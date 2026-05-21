import { Component, ViewEncapsulation } from '@angular/core';

import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-protocolo-detalhe',
  standalone: true,
  imports: [ZardCardComponent, ZardSkeletonComponent],
  template: `
    <div
      class="protocolo-detalhe-shell zm-content-enter flex w-full min-h-[min(24rem,50dvh)] flex-col overflow-hidden border-t border-border bg-card"
      aria-hidden="true"
      aria-busy="true">
        <div class="shrink-0 bg-card">
          <div class="flex flex-wrap items-start justify-between gap-3 px-5 py-3.5">
            <div class="min-w-0 flex-1 space-y-2">
              <div class="flex flex-wrap items-center gap-2">
                <z-skeleton class="h-3.5 w-24 rounded-md" />
                <z-skeleton class="h-5 w-20 rounded-full" />
              </div>
              <z-skeleton class="h-5 max-w-md w-[85%] rounded-md" />
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <z-skeleton class="h-8 w-[7.5rem] rounded-lg" />
              <z-skeleton class="h-8 w-[6.5rem] rounded-lg" />
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-4 border-y border-border bg-card px-5 py-2.5">
          @for (tab of tabWidths; track tab) {
            <z-skeleton class="h-8 rounded-lg" [class]="tab" />
          }
        </div>

        <div class="protocolo-tab-panel flex flex-col gap-4 p-5">
          @for (card of cardIndices; track card) {
            <z-card class="section-card gap-0 overflow-hidden border-border py-0 shadow-sm **:data-[slot=card-content]:p-0">
              <div class="section-header">
                <z-skeleton class="size-7 shrink-0 rounded-lg" />
                <z-skeleton class="h-3.5 w-36 rounded-md" />
              </div>
              <div class="section-body grid gap-4 sm:grid-cols-2">
                @for (field of fieldIndices; track field) {
                  <div class="space-y-2">
                    <z-skeleton class="h-3 w-28 rounded-md" />
                    <z-skeleton class="h-4 w-[72%] rounded-md" />
                  </div>
                }
              </div>
            </z-card>
          }
        </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonProtocoloDetalheComponent {
  readonly tabWidths = [
    'w-[4.5rem]',
    'w-[8.5rem]',
    'w-[6.5rem]',
    'w-[9.5rem]',
    'w-[7.5rem]',
    'w-[6.5rem]',
  ];

  readonly cardIndices = [1, 2];
  readonly fieldIndices = [1, 2, 3, 4];
}
