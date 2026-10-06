import { Component, input, ViewEncapsulation } from '@angular/core';

import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { GestgoSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-permissao-formulario',
  standalone: true,
  imports: [GestgoCardComponent, GestgoSkeletonComponent],
  template: `
    <div class="permissao-formulario-skeleton zm-content-enter" aria-hidden="true" aria-busy="true">
      <g-card class="gap-0 py-5 shadow-sm **:data-[slot=card-content]:px-5">
        <div class="flex flex-col gap-5">
          @if (novo()) {
            <div class="space-y-2">
              <g-skeleton class="h-3 w-36 rounded-md" />
              <g-skeleton class="h-9 w-full rounded-md" />
              <g-skeleton class="h-3 w-full max-w-md rounded-md" />
            </div>
          } @else {
            <g-skeleton class="h-3.5 w-56 rounded-md" />
          }

          <div class="space-y-2">
            <g-skeleton class="h-3 w-28 rounded-md" />
            <g-skeleton class="h-9 w-full rounded-md" />
          </div>

          @for (group of groupIndices; track group) {
            <div class="space-y-3 rounded-lg border border-border p-4">
              <g-skeleton class="h-3 w-32 rounded-md" />
              @for (item of itemIndices; track item) {
                <div class="flex items-start gap-2">
                  <g-skeleton class="size-4 shrink-0 rounded-sm" />
                  <div class="min-w-0 flex-1 space-y-1.5">
                    <g-skeleton class="h-3.5 w-40 rounded-md" />
                    <g-skeleton class="h-3 w-full max-w-sm rounded-md" />
                  </div>
                </div>
              }
            </div>
          }

          <div class="flex flex-wrap gap-3 pt-2">
            <g-skeleton class="h-9 w-28 rounded-md" />
            <g-skeleton class="h-9 w-24 rounded-md" />
          </div>
        </div>
      </g-card>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonPermissaoFormularioComponent {
  readonly novo = input(false);

  readonly groupIndices = [1, 2, 3];
  readonly itemIndices = [1, 2, 3];
}
