import { Component, ViewEncapsulation } from '@angular/core';

import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { GestgoSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-pessoa-formulario',
  standalone: true,
  imports: [GestgoCardComponent, GestgoSkeletonComponent],
  template: `
    <div class="zm-content-enter" aria-hidden="true" aria-busy="true">
      <g-card class="gap-0 py-5 shadow-sm **:data-[slot=card-content]:px-5">
        <div class="flex flex-col gap-5">
          <div class="space-y-2">
            <g-skeleton class="h-3 w-32 rounded-md" />
            <g-skeleton class="h-9 w-full rounded-lg" />
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            @for (i of pairIndices; track i) {
              <div class="space-y-2">
                <g-skeleton class="h-3 w-28 rounded-md" />
                <g-skeleton class="h-9 w-full rounded-lg" />
              </div>
            }
          </div>
          <div class="grid gap-4 md:grid-cols-4">
            @for (i of quadIndices; track i) {
              <div class="space-y-2">
                <g-skeleton class="h-3 w-24 rounded-md" />
                <g-skeleton class="h-9 w-full rounded-lg" />
              </div>
            }
          </div>
          <div class="flex gap-3 border-t border-border pt-4">
            <g-skeleton class="h-9 w-32 rounded-lg" />
            <g-skeleton class="h-9 w-24 rounded-lg" />
          </div>
        </div>
      </g-card>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonPessoaFormularioComponent {
  readonly pairIndices = [1, 2, 3, 4];
  readonly quadIndices = [1, 2, 3, 4];
}
