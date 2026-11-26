import { Component, HostListener, inject } from '@angular/core';
import { GoAssistantDrawerComponent } from './go-assistant-drawer.component';
import { GoAssistantTourOverlayComponent } from './go-assistant-tour-overlay.component';
import { GoAssistantShellService } from '../services/go-assistant-shell.service';

/** Host único do Go Assistant para os shells autenticados. */
@Component({
  selector: 'go-assistant-host',
  standalone: true,
  imports: [GoAssistantDrawerComponent, GoAssistantTourOverlayComponent],
  template: `
    <go-assistant-drawer />
    <go-assistant-tour-overlay />
  `,
})
export class GoAssistantHostComponent {
  private readonly shell = inject(GoAssistantShellService);

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    const isShortcut = (event.ctrlKey || event.metaKey) && event.key === '/';
    if (!isShortcut) return;
    event.preventDefault();
    this.shell.toggle();
  }
}
