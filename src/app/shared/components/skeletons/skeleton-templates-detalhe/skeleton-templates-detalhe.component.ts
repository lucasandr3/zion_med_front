import { Component, Input, ViewEncapsulation } from '@angular/core';

import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { GestgoSkeletonComponent } from '@/shared/components/skeleton';

export type ZmSkeletonTemplatesDetalheVisual = 'cards' | 'tabela';

@Component({
  selector: 'zm-skeleton-templates-detalhe',
  standalone: true,
  imports: [GestgoCardComponent, GestgoSkeletonComponent],
  template: `
    <div class="flex flex-col gap-4" aria-hidden="true">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <g-skeleton class="h-8 w-[10.5rem] rounded-lg" />
        <div class="ml-auto flex flex-wrap items-center justify-end gap-2">
          <g-skeleton class="h-8 w-[5.5rem] rounded-lg" />
          <g-skeleton class="h-8 w-[10.5rem] rounded-lg" />
          <g-skeleton class="h-8 w-[7.5rem] rounded-lg" />
        </div>
      </div>

      @if (visual === 'tabela') {
        <g-card class="overflow-hidden rounded-[8px] border-border !gap-0 !py-0 shadow-sm **:data-[slot=card-content]:p-0">
          <g-skeleton class="h-10 w-full rounded-none" />
          @for (i of rowIndices; track i) {
            <div class="grid grid-cols-[1fr_minmax(5rem,8rem)_minmax(6rem,7.5rem)] items-center gap-4 border-t border-border px-5 py-3.5">
              <g-skeleton class="h-4 max-w-[14rem] rounded-md" />
              <g-skeleton class="h-5 rounded-full" />
              <div class="flex justify-end gap-1.5">
                <g-skeleton class="size-8 rounded-lg" />
                <g-skeleton class="size-8 rounded-lg" />
                <g-skeleton class="size-8 rounded-lg" />
              </div>
            </div>
          }
        </g-card>
      } @else {
        <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
          @for (i of cardIndices; track i) {
            <div class="flex min-h-[15.5rem] flex-col overflow-hidden rounded-xl border border-border bg-card px-5 py-[1.15rem] shadow-sm">
              <div class="mb-3.5 flex items-center justify-between gap-3">
                <g-skeleton class="h-5 w-12 rounded-full" />
                <g-skeleton class="size-8 rounded-lg" />
              </div>
              <div class="flex flex-1 flex-col gap-2">
                <g-skeleton class="h-3.5 w-[38%] rounded-md" />
                <g-skeleton class="h-4 w-[72%] rounded-md" />
                <g-skeleton class="h-3.5 w-full rounded-md" />
                <g-skeleton class="h-3.5 w-[88%] rounded-md" />
              </div>
              <div class="mt-4 border-t border-border pt-3.5">
                <g-skeleton class="h-3.5 w-[42%] rounded-md" />
              </div>
              <div class="mt-3.5 grid grid-cols-2 gap-2">
                <g-skeleton class="h-8 rounded-lg" />
                <g-skeleton class="h-8 rounded-lg opacity-90" />
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonTemplatesDetalheComponent {
  @Input() visual: ZmSkeletonTemplatesDetalheVisual = 'cards';
  @Input() cards = 6;

  get cardIndices(): number[] {
    const n = Math.max(0, this.cards);
    return Array.from({ length: n }, (_, index) => index);
  }

  get rowIndices(): number[] {
    return this.cardIndices;
  }
}
