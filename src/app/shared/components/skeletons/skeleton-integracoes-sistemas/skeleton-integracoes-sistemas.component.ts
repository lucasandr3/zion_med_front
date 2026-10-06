import { Component, ViewEncapsulation } from '@angular/core';

import { GestgoSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-integracoes-sistemas',
  standalone: true,
  imports: [GestgoSkeletonComponent],
  template: `
    <div class="integracoes-sistemas-skeleton grid gap-3" aria-hidden="true" aria-busy="true" role="presentation">
      @for (card of cardIndices; track card) {
        <div class="integracoes-sistemas-skeleton__card rounded-lg border border-border bg-card p-3.5">
          <div class="flex items-start justify-between gap-2">
            <div class="flex min-w-0 items-center gap-2.5">
              <g-skeleton class="size-11 shrink-0 rounded-lg" />
              <div class="min-w-0 flex-1 space-y-2">
                <g-skeleton class="h-3.5 w-24 rounded-md" />
                <g-skeleton class="h-3 w-36 max-w-full rounded-md" />
              </div>
            </div>
            <g-skeleton class="h-5 w-24 shrink-0 rounded-full" />
          </div>
          <g-skeleton class="mt-2.5 h-3 w-40 rounded-md" />
        </div>
      }
    </div>
  `,
  styleUrl: './skeleton-integracoes-sistemas.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonIntegracoesSistemasComponent {
  readonly cardIndices = [1, 2, 3];
}
