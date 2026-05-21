import { Component, ViewEncapsulation } from '@angular/core';

import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardSkeletonComponent } from '@/shared/components/skeleton';

@Component({
  selector: 'zm-skeleton-configuracoes',
  standalone: true,
  imports: [ZardCardComponent, ZardSkeletonComponent],
  template: `
    <div
      class="clinica-config-skeleton zm-content-enter flex w-full flex-col bg-background"
      aria-hidden="true"
      aria-busy="true">
      <div
        class="clinica-config-skeleton__tabs flex shrink-0 flex-nowrap items-center gap-2.5 overflow-x-auto border-b border-border bg-card px-4 pb-3 pt-2"
        role="presentation">
        @for (tab of tabSkeletons; track tab.label) {
          <div class="clinica-config-skeleton__tab-pill" [style.width]="tab.width">
            <z-skeleton class="block h-full w-full rounded-lg" />
          </div>
        }
      </div>

      <div class="flex flex-col gap-5 p-5 sm:px-6 lg:px-8">
        @for (card of cardIndices; track card) {
          <z-card class="section-card gap-0 overflow-hidden border-border bg-card py-0 shadow-sm **:data-[slot=card-content]:p-0">
            <div class="section-header">
              <z-skeleton class="size-7 shrink-0 rounded-lg" />
              <z-skeleton class="h-3.5 w-36 rounded-md" />
            </div>
            <div class="section-body grid gap-4 sm:grid-cols-2">
              @for (field of fieldIndices; track field) {
                <div class="space-y-2" [class.sm:col-span-2]="field === 1">
                  <z-skeleton class="h-3 w-28 rounded-md" />
                  <z-skeleton class="h-9 w-full rounded-md" />
                </div>
              }
            </div>
          </z-card>
        }
      </div>
    </div>
  `,
  styleUrl: './skeleton-configuracoes.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZmSkeletonConfiguracoesComponent {
  readonly tabSkeletons = [
    { label: 'Dados Gerais', width: '5.75rem' },
    { label: 'Identidade Visual', width: '6.75rem' },
    { label: 'Tema Visual', width: '5.5rem' },
    { label: 'WhatsApp', width: '5.25rem' },
    { label: 'Logs', width: '3.75rem' },
  ];

  readonly cardIndices = [1, 2];
  readonly fieldIndices = [1, 2, 3, 4];
}
