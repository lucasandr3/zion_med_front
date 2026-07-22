import { Component, input, ViewEncapsulation } from '@angular/core';

import { ZardSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-usuario-formulario',
  standalone: true,
  imports: [ZardSkeletonComponent],
  template: `
    <div class="usuario-formulario-skeleton zm-content-enter" aria-hidden="true" aria-busy="true">
      <div class="zion-form-panel">
        <div class="flex flex-col gap-5">
          <z-skeleton class="h-3.5 w-full max-w-xl rounded-md" />
          <z-skeleton class="h-3.5 w-[80%] max-w-lg rounded-md" />

          @for (field of singleFields; track field) {
            <div class="space-y-2">
              <z-skeleton class="h-3 w-28 rounded-md" />
              <z-skeleton class="h-10 w-full rounded-md" />
            </div>
          }

          <div class="grid gap-4 md:grid-cols-2">
            @for (i of pairIndices; track i) {
              <div class="space-y-2">
                <z-skeleton class="h-3 w-32 rounded-md" />
                <z-skeleton class="h-10 w-full rounded-md" />
              </div>
            }
          </div>

          @if (editMode()) {
            <div class="flex items-start gap-2">
              <z-skeleton class="size-4 shrink-0 rounded-sm" />
              <z-skeleton class="h-3.5 w-56 rounded-md" />
            </div>
          }

          <div class="space-y-2">
            <div class="flex items-start gap-2">
              <z-skeleton class="size-4 shrink-0 rounded-sm" />
              <z-skeleton class="h-3.5 w-64 max-w-full rounded-md" />
            </div>
            <z-skeleton class="h-3 w-72 max-w-full rounded-md" />
          </div>

          <div class="flex flex-wrap gap-3 pt-2">
            <z-skeleton class="h-10 w-40 rounded-md" />
            <z-skeleton class="h-10 w-24 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonUsuarioFormularioComponent {
  readonly editMode = input(false);

  readonly singleFields = [1, 2, 3];
  readonly pairIndices = [1, 2];
}
