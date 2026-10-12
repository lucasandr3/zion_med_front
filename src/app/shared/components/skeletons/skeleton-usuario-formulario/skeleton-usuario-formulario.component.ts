import { Component, input, ViewEncapsulation } from '@angular/core';

import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { GestgoSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-usuario-formulario',
  standalone: true,
  imports: [GestgoCardComponent, GestgoSkeletonComponent],
  template: `
    <div class="usuario-formulario-skeleton zm-content-enter" aria-hidden="true" aria-busy="true">
      <g-card class="gap-0 py-5 shadow-sm **:data-[slot=card-content]:px-5">
        <div class="flex flex-col gap-5">
          <g-skeleton class="h-3.5 w-full max-w-xl rounded-md" />
          <g-skeleton class="h-3.5 w-[80%] max-w-lg rounded-md" />

          @for (field of singleFields; track field) {
            <div class="space-y-2">
              <g-skeleton class="h-3 w-28 rounded-md" />
              <g-skeleton class="h-9 w-full rounded-md" />
            </div>
          }

          <div class="grid gap-4 md:grid-cols-2">
            @for (i of pairIndices; track i) {
              <div class="space-y-2">
                <g-skeleton class="h-3 w-32 rounded-md" />
                <g-skeleton class="h-9 w-full rounded-md" />
              </div>
            }
          </div>

          @if (editMode()) {
            <div class="flex items-start gap-2">
              <g-skeleton class="size-4 shrink-0 rounded-sm" />
              <g-skeleton class="h-3.5 w-56 rounded-md" />
            </div>
          }

          <div class="space-y-2">
            <div class="flex items-start gap-2">
              <g-skeleton class="size-4 shrink-0 rounded-sm" />
              <g-skeleton class="h-3.5 w-64 max-w-full rounded-md" />
            </div>
            <g-skeleton class="h-3 w-72 max-w-full rounded-md" />
          </div>

          <div class="flex flex-wrap gap-3 pt-2">
            <g-skeleton class="h-9 w-40 rounded-md" />
            <g-skeleton class="h-9 w-24 rounded-md" />
          </div>
        </div>
      </g-card>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonUsuarioFormularioComponent {
  readonly editMode = input(false);

  readonly singleFields = [1, 2, 3];
  readonly pairIndices = [1, 2];
}
