import { Component, input, ViewEncapsulation } from '@angular/core';

import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { GestgoSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-template-formulario',
  standalone: true,
  imports: [GestgoCardComponent, GestgoSkeletonComponent],
  template: `
    <div class="template-formulario-skeleton zm-content-enter" aria-hidden="true" aria-busy="true">
      <g-card class="gap-0 border-border bg-card py-5 shadow-sm **:data-[slot=card-content]:px-5">
        <div class="flex flex-col gap-5">
          <g-skeleton class="h-3.5 w-full max-w-xl rounded-md" />

          @for (field of fieldIndices; track field) {
            <div class="space-y-2">
              <g-skeleton class="h-3 w-24 rounded-md" />
              @if (field === 2) {
                <g-skeleton class="h-20 w-full rounded-md" />
              } @else {
                <g-skeleton class="h-9 w-full rounded-md" />
              }
            </div>
          }

          <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
            @for (check of checkboxIndices; track check) {
              <div class="flex items-start gap-2">
                <g-skeleton class="size-4 shrink-0 rounded-sm" />
                <g-skeleton class="h-3.5 rounded-md" [class]="check === 3 ? 'w-56' : 'w-28'" />
              </div>
            }
          </div>

          @if (editMode()) {
            <div class="space-y-2">
              <g-skeleton class="h-3 w-44 rounded-md" />
              @for (radio of radioIndices; track radio) {
                <div class="flex items-center gap-2">
                  <g-skeleton class="size-4 shrink-0 rounded-full" />
                  <g-skeleton class="h-3.5 w-52 max-w-full rounded-md" />
                </div>
              }
              <g-skeleton class="h-3 w-full max-w-lg rounded-md" />
            </div>
          }

          <div class="flex flex-wrap gap-3 pt-2">
            <g-skeleton class="h-9 w-36 rounded-md" />
            <g-skeleton class="h-9 w-24 rounded-md" />
          </div>
        </div>
      </g-card>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonTemplateFormularioComponent {
  readonly editMode = input(false);

  readonly fieldIndices = [1, 2, 3];
  readonly checkboxIndices = [1, 2, 3];
  readonly radioIndices = [1, 2];
}
