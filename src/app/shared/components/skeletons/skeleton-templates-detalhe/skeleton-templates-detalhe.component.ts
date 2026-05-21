import { Component, Input, ViewEncapsulation } from '@angular/core';

import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardSkeletonComponent } from '@/shared/components/skeleton';

export type ZmSkeletonTemplatesDetalheVisual = 'cards' | 'tabela';

@Component({
  selector: 'zm-skeleton-templates-detalhe',
  standalone: true,
  imports: [ZardCardComponent, ZardSkeletonComponent],
  template: `
    <div class="flex flex-col gap-4" aria-hidden="true">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <z-skeleton class="h-8 w-[10.5rem] rounded-lg" />
        <div class="ml-auto flex flex-wrap items-center justify-end gap-2">
          <z-skeleton class="h-8 w-[5.5rem] rounded-lg" />
          <z-skeleton class="h-8 w-[10.5rem] rounded-lg" />
          <z-skeleton class="h-8 w-[7.5rem] rounded-lg" />
        </div>
      </div>

      @if (visual === 'tabela') {
        <z-card class="overflow-hidden rounded-[8px] border-border !gap-0 !py-0 shadow-sm **:data-[slot=card-content]:p-0">
          <z-skeleton class="h-10 w-full rounded-none" />
          @for (i of rowIndices; track i) {
            <div class="grid grid-cols-[1fr_minmax(5rem,8rem)_minmax(6rem,7.5rem)] items-center gap-4 border-t border-border px-5 py-3.5">
              <z-skeleton class="h-4 max-w-[14rem] rounded-md" />
              <z-skeleton class="h-5 rounded-full" />
              <div class="flex justify-end gap-1.5">
                <z-skeleton class="size-8 rounded-lg" />
                <z-skeleton class="size-8 rounded-lg" />
                <z-skeleton class="size-8 rounded-lg" />
              </div>
            </div>
          }
        </z-card>
      } @else {
        <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
          @for (i of cardIndices; track i) {
            <div class="flex min-h-[13.5rem] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div class="flex items-center justify-between gap-3 border-b border-border px-5 pb-3.5 pt-5">
                <div class="flex gap-1.5">
                  <z-skeleton class="h-5 w-12 rounded-full" />
                  <z-skeleton class="h-5 w-16 rounded-full" />
                </div>
                <div class="flex gap-1">
                  <z-skeleton class="size-7 rounded-lg" />
                  <z-skeleton class="size-7 rounded-lg" />
                  <z-skeleton class="size-7 rounded-lg" />
                </div>
              </div>
              <div class="flex flex-1 flex-col items-center justify-center gap-2 px-5 py-5">
                <z-skeleton class="h-4 w-[62%] rounded-md" />
                <z-skeleton class="h-3.5 w-[78%] rounded-md" />
                <z-skeleton class="h-3 w-[52%] rounded-md" />
              </div>
              <div class="flex gap-2 border-t border-border px-5 pb-5 pt-3.5">
                <z-skeleton class="h-8 flex-1 rounded-lg" />
                <z-skeleton class="h-8 flex-1 rounded-lg opacity-90" />
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
