import { Component, ViewEncapsulation } from '@angular/core';

import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-integracoes',
  standalone: true,
  imports: [ZardCardComponent, ZardSkeletonComponent],
  template: `
    <div
      class="integracoes-skeleton zm-content-enter flex w-full flex-col bg-background"
      aria-hidden="true"
      aria-busy="true"
    >
      <div
        class="integracoes-skeleton__tabs flex shrink-0 flex-nowrap items-center gap-2.5 overflow-x-auto border-b border-border bg-card px-4 pb-3 pt-2"
        role="presentation"
      >
        @for (tab of tabSkeletons; track tab.label) {
          <div class="integracoes-skeleton__tab-pill" [style.width]="tab.width">
            <z-skeleton class="block h-full w-full rounded-lg" />
          </div>
        }
      </div>

      <div class="flex flex-col gap-5 p-5 sm:px-6 lg:px-8">
        <z-card class="section-card gap-0 overflow-hidden border-border bg-card py-0 shadow-sm **:data-[slot=card-content]:p-0">
          <div class="section-header">
            <z-skeleton class="size-7 shrink-0 rounded-lg" />
            <z-skeleton class="h-3.5 w-40 rounded-md" />
          </div>
          <div class="section-body space-y-4">
            <z-skeleton class="h-3.5 w-full max-w-md rounded-md" />
            <z-skeleton class="h-3.5 w-[80%] max-w-sm rounded-md" />
            <div class="flex flex-wrap gap-3">
              <z-skeleton class="h-9 w-44 rounded-md" />
              <z-skeleton class="h-9 w-36 rounded-md" />
            </div>
          </div>
        </z-card>

        <z-card class="section-card gap-0 overflow-hidden border-border bg-card py-0 shadow-sm **:data-[slot=card-content]:p-0">
          <div class="section-header">
            <z-skeleton class="size-7 shrink-0 rounded-lg" />
            <z-skeleton class="h-3.5 w-28 rounded-md" />
          </div>
          <div class="section-body space-y-4">
            <z-skeleton class="h-3.5 w-full max-w-lg rounded-md" />
            <z-skeleton class="h-3 w-72 max-w-full rounded-md" />
            <div class="space-y-2">
              <z-skeleton class="h-3 w-28 rounded-md" />
              <div class="flex flex-wrap items-center gap-3">
                <z-skeleton class="h-9 min-w-[200px] flex-1 rounded-md" />
                <z-skeleton class="h-9 w-32 rounded-md" />
              </div>
            </div>
            <div class="space-y-2 pt-2">
              @for (row of tableRows; track row) {
                <div class="flex items-center gap-4 border-t border-border pt-3 first:border-t-0 first:pt-0">
                  <z-skeleton class="h-3.5 flex-1 rounded-md" />
                  <z-skeleton class="h-3.5 w-28 rounded-md" />
                  <z-skeleton class="h-3.5 w-16 rounded-md" />
                </div>
              }
            </div>
          </div>
        </z-card>
      </div>
    </div>
  `,
  styleUrl: './skeleton-integracoes.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonIntegracoesComponent {
  readonly tabSkeletons = [
    { label: 'API e tokens', width: '6.25rem' },
    { label: 'Webhooks', width: '5.5rem' },
    { label: 'Entregas', width: '5.25rem' },
    { label: 'Sistemas', width: '5.25rem' },
  ];

  readonly tableRows = [1, 2, 3];
}
