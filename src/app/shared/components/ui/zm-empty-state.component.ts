import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { provideIcons } from '@ng-icons/core';
import { lucideFolderOpen } from '@ng-icons/lucide';

import { GestgoEmptyComponent } from '../empty/empty.component';

/**
 * Wrapper compatível com a API legada; renderiza `g-empty` (Gestgo).
 * VIS-14: 1 CTA principal (+ opcional secundário/terciário) para empty states do arco Documentos.
 */
@Component({
  selector: 'zm-empty-state',
  standalone: true,
  imports: [GestgoEmptyComponent, RouterLink],
  viewProviders: [provideIcons({ lucideFolderOpen })],
  template: `
    <g-empty
      class="border-0 bg-transparent py-6"
      zIcon="lucideFolderOpen"
      [zTitle]="title"
      [zDescription]="descriptionForEmpty"
      [zActions]="actionTemplates"
      role="status"
    />
    <ng-template #actionTpl>
      @if (actionLabel) {
        @if (actionLink) {
          <a [routerLink]="actionLink" class="gap-2 no-underline inline-flex items-center">
            @if (actionIcon) {
              <span class="material-symbols-outlined text-base" aria-hidden="true">{{ actionIcon }}</span>
            }
            {{ actionLabel }}
          </a>
        } @else {
          <button type="button" class="gap-2 inline-flex items-center" (click)="actionClick.emit()">
            @if (actionIcon) {
              <span class="material-symbols-outlined text-base" aria-hidden="true">{{ actionIcon }}</span>
            }
            {{ actionLabel }}
          </button>
        }
      }
    </ng-template>
    <ng-template #secondaryTpl>
      @if (secondaryActionLabel && secondaryActionLink) {
        <a [routerLink]="secondaryActionLink" class="gap-2 no-underline inline-flex items-center text-sm">
          {{ secondaryActionLabel }}
        </a>
      }
    </ng-template>
    <ng-template #tertiaryTpl>
      @if (tertiaryActionLabel && tertiaryActionLink) {
        <a [routerLink]="tertiaryActionLink" class="gap-2 no-underline inline-flex items-center text-sm">
          {{ tertiaryActionLabel }}
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
  @Output() readonly actionClick = new EventEmitter<void>();

  @Input() secondaryActionLabel: string | null = null;
  @Input() secondaryActionLink: string | null = null;
  @Input() tertiaryActionLabel: string | null = null;
  @Input() tertiaryActionLink: string | null = null;

  @ViewChild('actionTpl', { static: true }) private actionTpl!: TemplateRef<void>;
  @ViewChild('secondaryTpl', { static: true }) private secondaryTpl!: TemplateRef<void>;
  @ViewChild('tertiaryTpl', { static: true }) private tertiaryTpl!: TemplateRef<void>;

  get descriptionForEmpty(): string | undefined {
    const d = this.description?.trim();
    return d || undefined;
  }

  get actionTemplates(): TemplateRef<void>[] {
    const out: TemplateRef<void>[] = [];
    if (this.actionLabel) out.push(this.actionTpl);
    if (this.secondaryActionLabel && this.secondaryActionLink) out.push(this.secondaryTpl);
    if (this.tertiaryActionLabel && this.tertiaryActionLink) out.push(this.tertiaryTpl);
    return out;
  }
}
