import { Component, input, ViewEncapsulation } from '@angular/core';

import { ZardSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-permissao-formulario',
  standalone: true,
  imports: [ZardSkeletonComponent],
  template: `
    <div class="permissao-formulario-skeleton zm-content-enter" aria-hidden="true" aria-busy="true">
      <div class="upx-form-panel">
        <div class="flex flex-col gap-5">
          @if (novo()) {
            <div class="space-y-2">
              <z-skeleton class="h-3 w-36 rounded-md" />
              <z-skeleton class="h-10 w-full rounded-md" />
              <z-skeleton class="h-3 w-full max-w-md rounded-md" />
            </div>
          } @else {
            <z-skeleton class="h-3.5 w-56 rounded-md" />
          }

          <div class="space-y-2">
            <z-skeleton class="h-3 w-28 rounded-md" />
            <z-skeleton class="h-10 w-full rounded-md" />
          </div>

          @for (group of groupIndices; track group) {
            <div class="space-y-3 border-t border-border pt-4">
              <z-skeleton class="h-3 w-32 rounded-md" />
              @for (item of itemIndices; track item) {
                <div class="flex items-start gap-2">
                  <z-skeleton class="size-4 shrink-0 rounded-sm" />
                  <div class="min-w-0 flex-1 space-y-1.5">
                    <z-skeleton class="h-3.5 w-40 rounded-md" />
                    <z-skeleton class="h-3 w-full max-w-sm rounded-md" />
                  </div>
                </div>
              }
            </div>
          }

          <div class="flex flex-wrap gap-3 pt-2">
            <z-skeleton class="h-10 w-28 rounded-md" />
            <z-skeleton class="h-10 w-24 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonPermissaoFormularioComponent {
  readonly novo = input(false);

  readonly groupIndices = [1, 2, 3];
  readonly itemIndices = [1, 2, 3];
}
