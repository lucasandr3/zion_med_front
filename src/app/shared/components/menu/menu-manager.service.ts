import { Injectable } from '@angular/core';

import type { GestgoMenuDirective } from './menu.directive';

@Injectable({
  providedIn: 'root',
})
export class GestgoMenuManagerService {
  private activeHoverMenu: GestgoMenuDirective | null = null;

  registerHoverMenu(menu: GestgoMenuDirective): void {
    if (this.activeHoverMenu && this.activeHoverMenu !== menu) {
      this.activeHoverMenu.close();
    }
    this.activeHoverMenu = menu;
  }

  unregisterHoverMenu(menu: GestgoMenuDirective): void {
    if (this.activeHoverMenu === menu) {
      this.activeHoverMenu = null;
    }
  }

  closeActiveMenu(): void {
    if (this.activeHoverMenu) {
      this.activeHoverMenu.close();
      this.activeHoverMenu = null;
    }
  }
}
