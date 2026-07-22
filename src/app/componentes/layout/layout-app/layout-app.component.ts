import { Component } from '@angular/core';
import { GestgoShellComponent } from '../../../layout/shell/gestgo-shell.component';

/**
 * Layout autenticado tenant — shell Material canônico (paridade InspecFlow / DS).
 */
@Component({
  selector: 'app-layout-app',
  standalone: true,
  imports: [GestgoShellComponent],
  template: `<app-gestgo-shell context="app" />`,
})
export class LayoutAppComponent {}
