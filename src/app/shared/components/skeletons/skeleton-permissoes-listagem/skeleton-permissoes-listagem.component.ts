import { Component, ViewEncapsulation } from '@angular/core';

import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-permissoes-listagem',
  standalone: true,
  imports: [ZardCardComponent, ZardSkeletonComponent],
  template: `
    <div class="permissoes-listagem-skeleton zm-content-enter" aria-hidden="true" aria-busy="true">
      <z-card class="gap-0 overflow-hidden rounded-lg py-0 shadow-sm **:data-[slot=card-content]:p-0">
        <div class="permissoes-listagem-skeleton__head flex items-center gap-4 border-b border-border px-4 py-3">
          <z-skeleton class="h-3 w-14 rounded-md" />
          <z-skeleton class="h-3 w-24 rounded-md" />
          <z-skeleton class="h-3 w-16 rounded-md" />
          <z-skeleton class="h-3 w-14 rounded-md" />
          <z-skeleton class="permissoes-listagem-skeleton__actions-head h-3 rounded-md" />
        </div>
        @for (row of rowIndices; track row) {
          <div class="permissoes-listagem-skeleton__row flex items-center gap-4 border-b border-border px-4 py-3 last:border-b-0">
            <z-skeleton class="h-3.5 w-36 flex-1 rounded-md" />
            <z-skeleton class="h-3.5 w-24 shrink-0 rounded-md" />
            <z-skeleton class="h-3.5 w-10 shrink-0 rounded-md" />
            <z-skeleton class="h-5 w-24 shrink-0 rounded-full" />
            <div class="flex shrink-0 gap-1">
              <z-skeleton class="size-8 rounded-md" />
              <z-skeleton class="size-8 rounded-md" />
            </div>
          </div>
        }
      </z-card>
    </div>
  `,
  styleUrl: './skeleton-permissoes-listagem.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonPermissoesListagemComponent {
  readonly rowIndices = [1, 2, 3, 4, 5];
}
