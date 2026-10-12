import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '@/shared/utils/merge-classes';

import { badgeVariants, type GestgoBadgeShapeVariants, type GestgoBadgeTypeVariants } from './badge.variants';

@Component({
  selector: 'g-badge',
  template: `
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
  },
  exportAs: 'gBadge',
})
export class GestgoBadgeComponent {
  readonly zType = input<GestgoBadgeTypeVariants>('default');
  readonly zShape = input<GestgoBadgeShapeVariants>('default');

  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    mergeClasses(badgeVariants({ zType: this.zType(), zShape: this.zShape() }), this.class()),
  );
}
