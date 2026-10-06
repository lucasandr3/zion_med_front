import { Component, ViewEncapsulation } from '@angular/core';

import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { GestgoSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-template-campos',
  standalone: true,
  imports: [GestgoCardComponent, GestgoSkeletonComponent],
  template: `
    <div class="template-campos-skeleton" aria-hidden="true" aria-busy="true">
      <div class="template-campos-skeleton__toolbar mb-6 flex flex-wrap items-center gap-2.5">
        <g-skeleton class="h-9 w-32 rounded-md" />
        <g-skeleton class="h-9 w-36 rounded-md" />
        <g-skeleton class="template-campos-skeleton__toolbar-action ml-auto h-9 w-32 rounded-md" />
      </div>

      <g-card class="mb-4 gap-0 overflow-hidden border-border bg-card py-0 shadow-sm">
        <div class="flex items-center gap-2 border-b border-border px-5 py-4 sm:px-6">
          <g-skeleton class="size-5 shrink-0 rounded-md" />
          <g-skeleton class="h-3.5 w-32 rounded-md" />
          <g-skeleton class="h-5 w-12 rounded-full" />
        </div>
        <div class="px-5 py-5 sm:px-6">
          <div class="template-campos-skeleton__form-grid mb-4">
            <div class="space-y-2">
              <g-skeleton class="h-3 w-36 rounded-md" />
              <g-skeleton class="h-9 w-full rounded-md" />
            </div>
            <div class="space-y-2">
              <g-skeleton class="h-3 w-20 rounded-md" />
              <g-skeleton class="h-9 w-full rounded-md" />
              <div class="flex flex-wrap items-center justify-between gap-2">
                <g-skeleton class="h-3 w-48 max-w-full rounded-md" />
                <g-skeleton class="h-3 w-36 rounded-md" />
              </div>
            </div>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-start gap-2">
              <g-skeleton class="size-4 shrink-0 rounded-sm" />
              <g-skeleton class="h-3.5 w-32 rounded-md" />
            </div>
            <g-skeleton class="h-9 w-36 rounded-md" />
          </div>
        </div>
      </g-card>

      <g-card class="gap-0 overflow-hidden border-border bg-card py-0 shadow-sm **:data-[slot=card-content]:p-0">
        <div class="flex items-center gap-2 border-b border-border px-5 py-4 sm:px-6">
          <g-skeleton class="h-3.5 w-40 rounded-md" />
          <g-skeleton class="h-5 w-8 rounded-full" />
        </div>
        <div class="template-campos-skeleton__table-head flex items-center gap-3 border-b border-border px-4 py-3">
          <g-skeleton class="h-3 w-6 rounded-md" />
          <g-skeleton class="h-3 w-12 rounded-md" />
          <g-skeleton class="h-3 w-16 rounded-md" />
          <g-skeleton class="h-3 w-20 rounded-md" />
          <g-skeleton class="h-3 w-24 rounded-md" />
          <g-skeleton class="h-3 w-10 rounded-md" />
          <g-skeleton class="template-campos-skeleton__actions-head h-3 rounded-md" />
        </div>
        @for (row of rowIndices; track row) {
          <div class="template-campos-skeleton__table-row flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0">
            <g-skeleton class="h-3 w-4 shrink-0 rounded-md" />
            <g-skeleton class="h-3.5 w-8 shrink-0 rounded-md" />
            <g-skeleton class="h-6 w-20 shrink-0 rounded-full" />
            <g-skeleton class="h-3.5 min-w-0 flex-1 rounded-md" />
            <g-skeleton class="h-6 w-24 shrink-0 rounded-md" />
            <g-skeleton class="size-2 shrink-0 rounded-full" />
            <div class="flex shrink-0 gap-1">
              <g-skeleton class="size-8 rounded-md" />
              <g-skeleton class="size-8 rounded-md" />
            </div>
          </div>
        }
      </g-card>
    </div>
  `,
  styleUrl: './skeleton-template-campos.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonTemplateCamposComponent {
  readonly rowIndices = [1, 2, 3, 4, 5, 6];
}
