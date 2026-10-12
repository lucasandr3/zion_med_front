import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { GestgoSkeletonComponent } from '@/shared/components/skeleton/skeleton.component';

@Component({
  selector: 'zm-skeleton-links-publicos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [GestgoSkeletonComponent],
  template: `
    <div class="skel-links-publicos" aria-busy="true" aria-live="polite">
      <span class="sr-only">Carregando formulários públicos…</span>
      <div class="skel-links-publicos__grid" aria-hidden="true">
        @for (row of rowsArray; track row; let i = $index) {
          <article class="skel-links-publicos__card" [style.--skel-delay]="i * 70 + 'ms'">
            <div class="skel-links-publicos__head">
              <div class="skel-links-publicos__lead">
                <div class="skel-links-publicos__icon-wrap">
                  <g-skeleton class="skel-links-publicos__icon" />
                </div>
                <div class="skel-links-publicos__identity">
                  <g-skeleton
                    class="skel-links-publicos__name"
                    [style.width]="nameWidth(i)"
                  />
                  <g-skeleton class="skel-links-publicos__badge" />
                </div>
              </div>
              <g-skeleton class="skel-links-publicos__menu" />
            </div>

            <div class="skel-links-publicos__stats">
              <div class="skel-links-publicos__stat">
                <g-skeleton class="skel-links-publicos__stat-value" />
                <g-skeleton class="skel-links-publicos__stat-label" />
              </div>
              <div class="skel-links-publicos__stat">
                <g-skeleton class="skel-links-publicos__stat-value skel-links-publicos__stat-value--sm" />
                <g-skeleton class="skel-links-publicos__stat-label skel-links-publicos__stat-label--wide" />
              </div>
            </div>

            <div class="skel-links-publicos__share">
              <g-skeleton class="skel-links-publicos__hint" />
              <g-skeleton
                class="skel-links-publicos__url"
                [style.width]="urlWidth(i)"
              />
            </div>

            <div class="skel-links-publicos__actions">
              <g-skeleton class="skel-links-publicos__action" />
              <g-skeleton class="skel-links-publicos__action skel-links-publicos__action--primary" />
            </div>
          </article>
        }
      </div>

      <div class="skel-links-publicos__footer" aria-hidden="true">
        <g-skeleton class="skel-links-publicos__footer-count" />
        <div class="skel-links-publicos__footer-pages">
          <g-skeleton class="skel-links-publicos__page" />
          <g-skeleton class="skel-links-publicos__page" />
          <g-skeleton class="skel-links-publicos__page" />
        </div>
      </div>
    </div>
  `,
  styleUrl: './skeleton-links-publicos.component.scss',
})
export class ZmSkeletonLinksPublicosComponent {
  @Input() rows = 6;

  get rowsArray(): number[] {
    return Array.from({ length: Math.max(0, this.rows) }, (_, i) => i);
  }

  nameWidth(index: number): string {
    const widths = ['72%', '58%', '84%', '66%', '76%', '62%'];
    return widths[index % widths.length];
  }

  urlWidth(index: number): string {
    const widths = ['68%', '78%', '55%', '72%', '60%', '80%'];
    return widths[index % widths.length];
  }
}
