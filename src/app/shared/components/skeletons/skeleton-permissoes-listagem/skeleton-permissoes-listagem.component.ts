import { Component, ViewEncapsulation } from '@angular/core';
import { ZardSkeletonComponent } from '@/shared/components/skeleton';

/** Skeleton full-bleed (sem card) para listagem de permissões. */
@Component({
  selector: 'zm-skeleton-permissoes-listagem',
  standalone: true,
  imports: [ZardSkeletonComponent],
  template: `
    <div class="permissoes-listagem-skeleton" aria-hidden="true" aria-busy="true">
      <div class="permissoes-listagem-skeleton__head">
        <z-skeleton class="h-3 w-14 rounded-md" />
        <z-skeleton class="h-3 w-24 rounded-md" />
        <z-skeleton class="h-3 w-16 rounded-md" />
        <z-skeleton class="h-3 w-14 rounded-md" />
        <z-skeleton class="permissoes-listagem-skeleton__actions-head h-3 rounded-md" />
      </div>
      @for (row of rowIndices; track row) {
        <div class="permissoes-listagem-skeleton__row">
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
    </div>
  `,
  styleUrl: './skeleton-permissoes-listagem.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonPermissoesListagemComponent {
  readonly rowIndices = [1, 2, 3, 4, 5];
}
