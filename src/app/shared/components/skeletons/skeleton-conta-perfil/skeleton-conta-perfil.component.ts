import { Component, ViewEncapsulation } from '@angular/core';

import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { GestgoSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-conta-perfil',
  standalone: true,
  imports: [GestgoCardComponent, GestgoSkeletonComponent],
  template: `
    <div
      class="conta-perfil-skeleton zm-content-enter flex w-full flex-col bg-background"
      aria-hidden="true"
      aria-busy="true"
    >
      <div
        class="conta-perfil-skeleton__tabs flex shrink-0 flex-nowrap items-center gap-2.5 overflow-x-auto border-b border-border bg-card px-4 pb-3 pt-2"
        role="presentation"
      >
        @for (tab of pageTabSkeletons; track tab.width) {
          <div class="conta-perfil-skeleton__tab-pill" [style.width]="tab.width">
            <g-skeleton class="block h-full w-full rounded-lg" />
          </div>
        }
      </div>

      <div class="flex flex-col gap-5 p-5 sm:px-6 lg:px-8">
        <g-card class="section-card gap-0 overflow-hidden border-border bg-card py-0 shadow-sm **:data-[slot=card-content]:p-0">
          <div class="section-header">
            <g-skeleton class="size-7 shrink-0 rounded-lg" />
            <g-skeleton class="h-3.5 w-28 rounded-md" />
          </div>
          <div class="section-body space-y-4">
            <div class="conta-perfil-skeleton__dados">
              @for (i of dadoIndices; track i) {
                <div class="space-y-2">
                  <g-skeleton class="h-3 w-14 rounded-md" />
                  <g-skeleton class="h-4 w-full max-w-48 rounded-md" />
                </div>
              }
            </div>
            <g-skeleton class="h-3 w-full max-w-xl rounded-md" />
          </div>
        </g-card>
      </div>
    </div>
  `,
  styleUrl: './skeleton-conta-perfil.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonContaPerfilComponent {
  readonly dadoIndices = [1, 2, 3];
  readonly pageTabSkeletons = [
    { width: '4.5rem' },
    { width: '6.5rem' },
    { width: '9.5rem' }];
}
