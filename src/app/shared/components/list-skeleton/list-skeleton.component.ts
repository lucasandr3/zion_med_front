import { Component, CUSTOM_ELEMENTS_SCHEMA, computed, input } from '@angular/core';

@Component({
  selector: 'app-list-skeleton',
  templateUrl: './list-skeleton.component.html',
  styleUrl: './list-skeleton.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListSkeletonComponent {
  /** Quantidade de linhas placeholder. */
  readonly count = input(4);

  readonly rows = computed(() =>
    Array.from({ length: Math.max(1, this.count()) }, (_, i) => i),
  );
}
