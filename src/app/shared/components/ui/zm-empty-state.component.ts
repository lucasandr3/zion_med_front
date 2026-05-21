import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { provideIcons } from '@ng-icons/core';
import { lucideFolderOpen } from '@ng-icons/lucide';

import { ZardButtonComponent } from '../button/button.component';
import { ZardEmptyComponent } from '../empty/empty.component';

/**
 * Wrapper compatível com a API legada; renderiza `z-empty` (Zard).
 */
@Component({
  selector: 'zm-empty-state',
  standalone: true,
  imports: [ZardEmptyComponent, ZardButtonComponent, RouterLink],
  viewProviders: [provideIcons({ lucideFolderOpen })],
  template: `
    <z-empty
      class="border-0 bg-transparent py-6"
      zIcon="lucideFolderOpen"
      [zTitle]="title"
      [zDescription]="descriptionForEmpty"
      [zActions]="actionTemplates"
      role="status"
    />
    <ng-template #actionTpl>
      @if (actionLabel && actionLink) {
        <a z-button [routerLink]="actionLink" class="gap-2 no-underline">
          @if (actionIcon) {
            <span class="material-symbols-outlined text-base">{{ actionIcon }}</span>
          }
          {{ actionLabel }}
        </a>
      }
    </ng-template>
  `,
  host: { class: 'block' },
})
export class ZmEmptyStateComponent {
  @Input({ required: true }) title!: string;
  @Input() description: string | null = null;
  @Input() actionLabel: string | null = null;
  @Input() actionLink: string | null = null;
  @Input() actionIcon: string | null = 'add_circle';

  @ViewChild('actionTpl', { static: true }) private actionTpl!: TemplateRef<void>;

  get descriptionForEmpty(): string | undefined {
    const d = this.description?.trim();
    return d || undefined;
  }

  get actionTemplates(): TemplateRef<void>[] {
    return this.actionLabel && this.actionLink ? [this.actionTpl] : [];
  }
}
