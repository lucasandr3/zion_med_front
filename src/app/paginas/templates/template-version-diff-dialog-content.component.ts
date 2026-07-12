import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGitCompare } from '@ng-icons/lucide';

import { Z_MODAL_DATA } from '@/shared/components/dialog/dialog.service';
import { TemplateVersionCompareResult } from '../../core/services/templates.service';
import { describeTemplateFieldChange, templateFieldTypeLabel } from '../../core/utils/template-version-diff.util';

export interface TemplateVersionDiffDialogData {
  diff: TemplateVersionCompareResult;
}

@Component({
  selector: 'zm-template-version-diff-dialog-content',
  imports: [NgIcon],
  template: `
    <div class="flex gap-4 sm:items-start">
      <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <ng-icon name="lucideGitCompare" class="size-5!" />
      </div>
      <div class="min-w-0 space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          A versão <strong class="font-semibold text-foreground">{{ data.diff.to?.version }}</strong>
          difere da versão
          <strong class="font-semibold text-foreground">{{ data.diff.from?.version }}</strong>.
          Revise as alterações antes de publicar o link.
        </p>

        @if (metaChanges().length) {
          <div>
            <p class="mb-1 font-medium text-foreground">Metadados</p>
            <ul class="list-disc space-y-1 pl-5">
              @for (item of metaChanges(); track item) {
                <li>{{ item }}</li>
              }
            </ul>
          </div>
        }

        @if (data.diff.fields.added.length) {
          <div>
            <p class="mb-1 font-medium text-foreground">Campos adicionados</p>
            <ul class="list-disc space-y-1 pl-5">
              @for (field of data.diff.fields.added; track field.name_key) {
                <li>{{ field.label || field.name_key }} ({{ fieldType(field.type) }})</li>
              }
            </ul>
          </div>
        }

        @if (data.diff.fields.removed.length) {
          <div>
            <p class="mb-1 font-medium text-foreground">Campos removidos</p>
            <ul class="list-disc space-y-1 pl-5">
              @for (field of data.diff.fields.removed; track field.name_key) {
                <li>{{ field.label || field.name_key }} ({{ fieldType(field.type) }})</li>
              }
            </ul>
          </div>
        }

        @if (data.diff.fields.changed.length) {
          <div>
            <p class="mb-1 font-medium text-foreground">Campos alterados</p>
            <ul class="list-disc space-y-1 pl-5">
              @for (field of data.diff.fields.changed; track field.name_key) {
                <li>
                  {{ field.label || field.name_key }}:
                  {{ describeChanges(field.changes) }}
                </li>
              }
            </ul>
          </div>
        }

        @if (hasReorder()) {
          <div>
            <p class="mb-1 font-medium text-foreground">Ordem dos campos</p>
            <p>A sequência dos campos foi alterada entre as versões.</p>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ lucideGitCompare })],
})
export class ZmTemplateVersionDiffDialogContentComponent {
  readonly data = inject<TemplateVersionDiffDialogData>(Z_MODAL_DATA);

  readonly metaChanges = computed(() => {
    const items: string[] = [];
    if (this.data.diff.meta.name_changed) {
      items.push('Nome do modelo alterado');
    }
    if (this.data.diff.meta.description_changed) {
      items.push('Descrição alterada');
    }
    return items;
  });

  hasReorder(): boolean {
    const reordered = this.data.diff.fields.reordered;
    return reordered !== null && reordered !== undefined && !Array.isArray(reordered) && reordered.from.length > 0;
  }

  fieldType(type: string): string {
    return templateFieldTypeLabel(type);
  }

  describeChanges(changes: string[]): string {
    return changes.map((change) => describeTemplateFieldChange(change)).join(', ');
  }
}
