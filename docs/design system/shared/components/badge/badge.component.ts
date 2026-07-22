import { Component, computed, input } from '@angular/core';

export type BadgeVariant = 'type' | 'status';
export type StatusTone = 'draft' | 'published' | 'archived' | 'default';

@Component({
  selector: 'up-badge',
  template: `<span [class]="badgeClass()"><ng-content /></span>`,
  host: {
    style: 'display: inline-flex',
  },
})
export class BadgeComponent {
  readonly variant = input<BadgeVariant>('type');
  readonly tone = input<StatusTone>('default');

  readonly badgeClass = computed(() => {
    const classes = ['upx-badge'];

    if (this.variant() === 'type') {
      classes.push('upx-badge--type');
    } else {
      classes.push('upx-badge--status');
      const tone = this.tone();
      if (tone !== 'default') {
        classes.push(`upx-badge--${tone}`);
      }
    }

    return classes.join(' ');
  });
}
