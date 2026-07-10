import { Component } from '@angular/core';
import { GoAssistantFabComponent } from './go-assistant-fab.component';
import { GoAssistantDrawerComponent } from './go-assistant-drawer.component';
import { GoAssistantTourOverlayComponent } from './go-assistant-tour-overlay.component';

/** Host único do Go Assistant para os shells autenticados. */
@Component({
  selector: 'go-assistant-host',
  standalone: true,
  imports: [GoAssistantFabComponent, GoAssistantDrawerComponent, GoAssistantTourOverlayComponent],
  template: `
    <go-assistant-fab />
    <go-assistant-drawer />
    <go-assistant-tour-overlay />
  `,
})
export class GoAssistantHostComponent {}
