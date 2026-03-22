import { Component, Input } from '@angular/core';

@Component({
  selector: 'zm-skeleton-card',
  standalone: true,
  template: `
    <div
      class="zm-skeleton w-full rounded-xl"
      [style.height.px]="height"
      [style.border]="'1px solid var(--c-border)'"
    ></div>
  `,
})
export class ZmSkeletonCardComponent {
  @Input() height = 120;
}
