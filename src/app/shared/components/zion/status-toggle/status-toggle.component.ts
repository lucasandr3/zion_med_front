import { Component, input, output } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'zion-status-toggle',
  imports: [MatTooltipModule],
  templateUrl: './status-toggle.component.html',
  styleUrl: './status-toggle.component.scss',
})
export class StatusToggleComponent {
  readonly checked = input(false);
  readonly disabled = input(false);
  readonly ariaLabel = input('Alternar situação');

  readonly toggleRequest = output<void>();

  onClick(event: Event): void {
    event.stopPropagation();

    if (this.disabled()) {
      return;
    }

    this.toggleRequest.emit();
  }
}
