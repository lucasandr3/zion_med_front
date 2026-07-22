import { Component, ViewEncapsulation } from '@angular/core';

import { ZardSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-pessoa-formulario',
  standalone: true,
  imports: [ZardSkeletonComponent],
  template: `
    <div class="zm-content-enter" aria-hidden="true" aria-busy="true">
      <div class="upx-form-panel">
        <div class="flex flex-col gap-5">
          <div class="space-y-2">
            <z-skeleton class="h-3 w-32 rounded-md" />
            <z-skeleton class="h-10 w-full rounded-lg" />
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            @for (i of pairIndices; track i) {
              <div class="space-y-2">
                <z-skeleton class="h-3 w-28 rounded-md" />
                <z-skeleton class="h-10 w-full rounded-lg" />
              </div>
            }
          </div>
          <div class="grid gap-4 md:grid-cols-4">
            @for (i of quadIndices; track i) {
              <div class="space-y-2">
                <z-skeleton class="h-3 w-24 rounded-md" />
                <z-skeleton class="h-10 w-full rounded-lg" />
              </div>
            }
          </div>
          <div class="flex gap-3 border-t border-border pt-4">
            <z-skeleton class="h-10 w-32 rounded-lg" />
            <z-skeleton class="h-10 w-24 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonPessoaFormularioComponent {
  readonly pairIndices = [1, 2, 3, 4];
  readonly quadIndices = [1, 2, 3, 4];
}
