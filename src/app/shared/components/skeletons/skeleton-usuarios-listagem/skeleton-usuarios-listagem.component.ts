import { Component, ViewEncapsulation } from '@angular/core';

import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-usuarios-listagem',
  standalone: true,
  imports: [ZardCardComponent, ZardSkeletonComponent],
  template: `
    <div class="usuarios-listagem-skeleton zm-content-enter" aria-hidden="true" aria-busy="true">
      <z-card class="gap-0 overflow-hidden rounded-lg py-0 shadow-sm **:data-[slot=card-content]:p-0">
        <div class="usuarios-listagem-skeleton__head flex items-center gap-4 border-b border-border px-4 py-3">
          <z-skeleton class="h-3 w-14 rounded-md" />
          <z-skeleton class="h-3 w-16 rounded-md" />
          <z-skeleton class="h-3 w-20 rounded-md" />
          <z-skeleton class="h-3 w-12 rounded-md" />
          <z-skeleton class="usuarios-listagem-skeleton__actions-head h-3 rounded-md" />
        </div>
        @for (row of rowIndices; track row) {
          <div class="usuarios-listagem-skeleton__row flex items-center gap-4 border-b border-border px-4 py-3 last:border-b-0">
            <div class="usuarios-listagem-skeleton__name flex min-w-0 flex-1 items-center gap-2.5">
              <z-skeleton class="size-[30px] shrink-0 rounded-full" />
              <z-skeleton class="h-3.5 w-32 rounded-md" />
            </div>
            <z-skeleton class="usuarios-listagem-skeleton__email h-3.5 rounded-md" />
            <z-skeleton class="h-5 w-20 shrink-0 rounded-full" />
            <z-skeleton class="h-3.5 w-14 shrink-0 rounded-md" />
            <div class="flex shrink-0 gap-1">
              <z-skeleton class="size-8 rounded-md" />
              <z-skeleton class="size-8 rounded-md" />
            </div>
          </div>
        }
      </z-card>
    </div>
  `,
  styleUrl: './skeleton-usuarios-listagem.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonUsuariosListagemComponent {
  readonly rowIndices = [1, 2, 3, 4, 5];
}
