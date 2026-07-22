import { Component, Input, ViewEncapsulation } from '@angular/core';

import { ZardSkeletonComponent } from '@/shared/components/skeleton';

export type ZmSkeletonTemplatesColecaoVisual = 'cards' | 'pastas';

@Component({
  selector: 'zm-skeleton-templates-colecao',
  standalone: true,
  imports: [ZardSkeletonComponent],
  template: `
    <div class="skel-templates-colecao" aria-hidden="true">
      <header class="skel-templates-colecao__header">
        <z-skeleton class="skel-templates-colecao__toolbar-btn skel-templates-colecao__toolbar-btn--wide" />
        <z-skeleton class="skel-templates-colecao__toolbar-btn" />
        <z-skeleton class="skel-templates-colecao__view-toggle" />
        <z-skeleton class="skel-templates-colecao__toolbar-btn skel-templates-colecao__toolbar-btn--novo" />
      </header>

      <div class="skel-templates-colecao__body">
      @if (visual === 'pastas') {
        <div class="skel-templates-colecao__pastas">
          @for (i of folderIndices; track i) {
            <div class="skel-templates-colecao__pasta">
              <z-skeleton class="skel-templates-colecao__pasta-icon" />
              <z-skeleton class="skel-templates-colecao__pasta-title" />
              <z-skeleton class="skel-templates-colecao__pasta-meta" />
            </div>
          }
          <div class="skel-templates-colecao__pasta skel-templates-colecao__pasta--novo">
            <z-skeleton class="skel-templates-colecao__pasta-icon" />
            <z-skeleton class="skel-templates-colecao__pasta-title" />
          </div>
        </div>
      } @else {
        <div class="skel-templates-colecao__grid">
          @for (i of cardIndices; track i) {
            <div class="skel-templates-colecao__card">
              <div class="skel-templates-colecao__card-top">
                <z-skeleton class="skel-templates-colecao__icon" />
                <z-skeleton class="skel-templates-colecao__title" />
                <z-skeleton class="skel-templates-colecao__count" />
              </div>
              <div class="skel-templates-colecao__card-foot">
                <z-skeleton class="skel-templates-colecao__updated" />
                <z-skeleton class="skel-templates-colecao__arrow" />
              </div>
            </div>
          }
          <div class="skel-templates-colecao__card skel-templates-colecao__card--novo">
            <z-skeleton class="skel-templates-colecao__novo-icon" />
            <z-skeleton class="skel-templates-colecao__novo-label" />
            <z-skeleton class="skel-templates-colecao__novo-hint" />
          </div>
        </div>
      }
      </div>
    </div>
  `,
  styleUrl: './skeleton-templates-colecao.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonTemplatesColecaoComponent {
  @Input() visual: ZmSkeletonTemplatesColecaoVisual = 'cards';
  @Input() cards = 3;

  get cardIndices(): number[] {
    const n = Math.max(0, this.cards);
    return Array.from({ length: n }, (_, index) => index);
  }

  get folderIndices(): number[] {
    return Array.from({ length: Math.max(0, this.cards) }, (_, index) => index);
  }
}
