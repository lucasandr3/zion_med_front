import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { STUDIO_BLOCK_LABELS, type StudioTemplatePreset } from './studio-catalog';
import type { StudioBlock, StudioMode, StudioSharedContent } from './studio.models';

@Component({
  selector: 'app-studio-preview',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './studio-preview.component.html',
  styleUrl: './studio-preview.component.css',
})
export class StudioPreviewComponent {
  readonly mode = input.required<StudioMode>();
  readonly template = input.required<StudioTemplatePreset>();
  readonly shared = input.required<StudioSharedContent>();
  readonly blocks = input.required<StudioBlock[]>();
  readonly specialtyName = input('');

  readonly blockLabels = STUDIO_BLOCK_LABELS;

  enabledBlocks(): StudioBlock[] {
    return this.blocks()
      .filter((b) => b.enabled)
      .sort((a, b) => a.order - b.order);
  }

  labelFor(type: string): string {
    return this.blockLabels[type] ?? type;
  }
}
