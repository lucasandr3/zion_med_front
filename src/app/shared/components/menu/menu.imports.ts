import { GestgoContextMenuDirective } from './context-menu.directive';
import { GestgoMenuContentDirective } from './menu-content.directive';
import { GestgoMenuItemDirective } from './menu-item.directive';
import { GestgoMenuLabelComponent } from './menu-label.component';
import { GestgoMenuShortcutComponent } from './menu-shortcut.component';
import { GestgoMenuDirective } from './menu.directive';

export {
  GestgoContextMenuDirective,
  GestgoMenuContentDirective,
  GestgoMenuItemDirective,
  GestgoMenuDirective,
  GestgoMenuLabelComponent,
  GestgoMenuShortcutComponent,
};

export const GestgoMenuImports = [
  GestgoContextMenuDirective,
  GestgoMenuContentDirective,
  GestgoMenuItemDirective,
  GestgoMenuDirective,
  GestgoMenuLabelComponent,
  GestgoMenuShortcutComponent] as const;
