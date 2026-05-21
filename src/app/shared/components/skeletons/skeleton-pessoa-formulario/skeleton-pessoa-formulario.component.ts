import { Component, ViewEncapsulation } from '@angular/core';

import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-pessoa-formulario',
  standalone: true,
  imports: [ZardCardComponent, ZardSkeletonComponent],
  template: `
    <div class="zm-content-enter" aria-hidden="true" aria-busy="true">
      <z-card class="gap-0 py-5 shadow-sm **:data-[slot=card-content]:px-5">
        <div class="flex flex-col gap-5">
          <div class="space-y-2">
            <z-skeleton class="h-3 w-32 rounded-md" />
            <z-skeleton class="h-9 w-full rounded-lg" />
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            @for (i of pairIndices; track i) {
              <div class="space-y-2">
                <z-skeleton class="h-3 w-28 rounded-md" />
                <z-skeleton class="h-9 w-full rounded-lg" />
              </div>
            }
          </div>
          <div class="grid gap-4 md:grid-cols-4">
            @for (i of quadIndices; track i) {
              <div class="space-y-2">
                <z-skeleton class="h-3 w-24 rounded-md" />
                <z-skeleton class="h-9 w-full rounded-lg" />
              </div>
            }
          </div>
          <div class="flex gap-3 border-t border-border pt-4">
            <z-skeleton class="h-9 w-32 rounded-lg" />
            <z-skeleton class="h-9 w-24 rounded-lg" />
          </div>
        </div>
      </z-card>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonPessoaFormularioComponent {
  readonly pairIndices = [1, 2, 3, 4];
  readonly quadIndices = [1, 2, 3, 4];
}
