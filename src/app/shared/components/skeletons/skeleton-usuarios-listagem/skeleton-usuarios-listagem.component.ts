import { Component, ViewEncapsulation } from '@angular/core';

import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { GestgoSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-usuarios-listagem',
  standalone: true,
  imports: [GestgoCardComponent, GestgoSkeletonComponent],
  template: `
    <div class="usuarios-listagem-skeleton zm-content-enter" aria-hidden="true" aria-busy="true">
      <g-card class="gap-0 overflow-hidden rounded-lg py-0 shadow-sm **:data-[slot=card-content]:p-0">
        <div class="usuarios-listagem-skeleton__head flex items-center gap-4 border-b border-border px-4 py-3">
          <g-skeleton class="h-3 w-14 rounded-md" />
          <g-skeleton class="h-3 w-16 rounded-md" />
          <g-skeleton class="h-3 w-20 rounded-md" />
          <g-skeleton class="h-3 w-12 rounded-md" />
          <g-skeleton class="usuarios-listagem-skeleton__actions-head h-3 rounded-md" />
        </div>
        @for (row of rowIndices; track row) {
          <div class="usuarios-listagem-skeleton__row flex items-center gap-4 border-b border-border px-4 py-3 last:border-b-0">
            <div class="usuarios-listagem-skeleton__name flex min-w-0 flex-1 items-center gap-2.5">
              <g-skeleton class="size-[30px] shrink-0 rounded-full" />
              <g-skeleton class="h-3.5 w-32 rounded-md" />
            </div>
            <g-skeleton class="usuarios-listagem-skeleton__email h-3.5 rounded-md" />
            <g-skeleton class="h-5 w-20 shrink-0 rounded-full" />
            <g-skeleton class="h-3.5 w-14 shrink-0 rounded-md" />
            <div class="flex shrink-0 gap-1">
              <g-skeleton class="size-8 rounded-md" />
              <g-skeleton class="size-8 rounded-md" />
            </div>
          </div>
        }
      </g-card>
    </div>
  `,
  styleUrl: './skeleton-usuarios-listagem.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonUsuariosListagemComponent {
  readonly rowIndices = [1, 2, 3, 4, 5];
}
