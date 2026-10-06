import { Component, ViewEncapsulation } from '@angular/core';

import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { GestgoSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-pessoa-detalhe',
  standalone: true,
  imports: [GestgoCardComponent, GestgoSkeletonComponent],
  template: `
    <div class="zm-content-enter space-y-6" aria-hidden="true" aria-busy="true">
      <g-card class="gap-0 py-5 shadow-sm **:data-[slot=card-content]:px-5">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div class="flex min-w-0 items-start gap-3">
            <g-skeleton class="size-10 shrink-0 rounded-lg" />
            <div class="min-w-0 flex-1 space-y-2">
              <g-skeleton class="h-5 max-w-xs w-[75%] rounded-md" />
              <div class="flex flex-wrap items-center gap-2">
                <g-skeleton class="h-3.5 w-20 rounded-md" />
                <g-skeleton class="h-5 w-14 rounded-full" />
              </div>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <g-skeleton class="h-8 w-[5.5rem] rounded-lg" />
            <g-skeleton class="h-8 w-[6.5rem] rounded-lg" />
          </div>
        </div>
      </g-card>

      <g-card class="gap-0 overflow-hidden py-0 shadow-sm **:data-[slot=card-content]:p-0">
        <div class="flex gap-1 overflow-x-auto border-b border-border px-3 py-2.5">
          @for (tab of tabWidths; track tab) {
            <g-skeleton class="h-9 shrink-0 rounded-lg" [class]="tab" />
          }
        </div>
        <div class="p-6">
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            @for (field of fieldIndices; track field) {
              <div class="space-y-2">
                <g-skeleton class="h-3 w-28 rounded-md" />
                <g-skeleton class="h-4 w-[72%] rounded-md" />
              </div>
            }
          </div>
        </div>
      </g-card>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonPessoaDetalheComponent {
  readonly tabWidths = ['w-[4.5rem]', 'w-[6.5rem]', 'w-[7.5rem]'];
  readonly fieldIndices = [1, 2, 3, 4, 5, 6];
}
