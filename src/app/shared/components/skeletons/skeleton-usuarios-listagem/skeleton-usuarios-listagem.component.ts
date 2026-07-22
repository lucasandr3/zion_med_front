import { Component, ViewEncapsulation } from '@angular/core';
import { ZardSkeletonComponent } from '@/shared/components/skeleton';

/** Skeleton full-bleed (sem card) para listagem de usuários. */
@Component({
  selector: 'zm-skeleton-usuarios-listagem',
  standalone: true,
  imports: [ZardSkeletonComponent],
  template: `
    <div class="usuarios-listagem-skeleton" aria-hidden="true" aria-busy="true">
      <div class="usuarios-listagem-skeleton__head">
        <z-skeleton class="h-3 w-14 rounded-md" />
        <z-skeleton class="h-3 w-16 rounded-md" />
        <z-skeleton class="h-3 w-20 rounded-md" />
        <z-skeleton class="h-3 w-12 rounded-md" />
        <z-skeleton class="usuarios-listagem-skeleton__actions-head h-3 rounded-md" />
      </div>
      @for (row of rowIndices; track row) {
        <div class="usuarios-listagem-skeleton__row">
          <div class="usuarios-listagem-skeleton__name">
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
    </div>
  `,
  styleUrl: './skeleton-usuarios-listagem.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonUsuariosListagemComponent {
  readonly rowIndices = [1, 2, 3, 4, 5];
}
