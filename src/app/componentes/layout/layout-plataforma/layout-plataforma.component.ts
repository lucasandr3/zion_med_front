import { Component } from '@angular/core';
import { GestgoShellComponent } from '../../../layout/shell/gestgo-shell.component';

/**
 * Layout plataforma — shell Material canônico (paridade InspecFlow / DS).
 */
@Component({
  selector: 'app-layout-plataforma',
  standalone: true,
  imports: [GestgoShellComponent],
  template: `<app-gestgo-shell context="plataforma" />`,
})
export class LayoutPlataformaComponent {}
