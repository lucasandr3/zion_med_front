import { Component, Input, ViewEncapsulation } from '@angular/core';

import { GestgoSkeletonComponent } from '@/shared/components/skeleton';

export type ZmSkeletonTemplatesColecaoVisual = 'cards' | 'pastas';

@Component({
  selector: 'zm-skeleton-templates-colecao',
  standalone: true,
  imports: [GestgoSkeletonComponent],
  template: `
    <div class="skel-templates-colecao" aria-hidden="true">
      <header class="skel-templates-colecao__header">
        <g-skeleton class="skel-templates-colecao__toolbar-btn skel-templates-colecao__toolbar-btn--wide" />
        <g-skeleton class="skel-templates-colecao__toolbar-btn" />
        <g-skeleton class="skel-templates-colecao__view-toggle" />
        <g-skeleton class="skel-templates-colecao__toolbar-btn skel-templates-colecao__toolbar-btn--novo" />
      </header>

      @if (visual === 'pastas') {
        <div class="skel-templates-colecao__pastas">
          @for (i of folderIndices; track i) {
            <div class="skel-templates-colecao__pasta">
              <g-skeleton class="skel-templates-colecao__pasta-icon" />
              <g-skeleton class="skel-templates-colecao__pasta-title" />
              <g-skeleton class="skel-templates-colecao__pasta-meta" />
            </div>
          }
          <div class="skel-templates-colecao__pasta skel-templates-colecao__pasta--novo">
            <g-skeleton class="skel-templates-colecao__pasta-icon" />
            <g-skeleton class="skel-templates-colecao__pasta-title" />
          </div>
        </div>
      } @else {
        <div class="skel-templates-colecao__grid">
          @for (i of cardIndices; track i) {
            <div class="skel-templates-colecao__card">
              <div class="skel-templates-colecao__card-top">
                <g-skeleton class="skel-templates-colecao__icon" />
                <g-skeleton class="skel-templates-colecao__title" />
                <g-skeleton class="skel-templates-colecao__count" />
              </div>
              <div class="skel-templates-colecao__card-foot">
                <g-skeleton class="skel-templates-colecao__updated" />
                <g-skeleton class="skel-templates-colecao__arrow" />
              </div>
            </div>
          }
          <div class="skel-templates-colecao__card skel-templates-colecao__card--novo">
            <g-skeleton class="skel-templates-colecao__novo-icon" />
            <g-skeleton class="skel-templates-colecao__novo-label" />
            <g-skeleton class="skel-templates-colecao__novo-hint" />
          </div>
        </div>
      }
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
