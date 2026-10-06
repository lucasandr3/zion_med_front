import { GestgoCommandDividerComponent } from '@/shared/components/command/command-divider.component';
import { GestgoCommandEmptyComponent } from '@/shared/components/command/command-empty.component';
import { GestgoCommandInputComponent } from '@/shared/components/command/command-input.component';
import { GestgoCommandListComponent } from '@/shared/components/command/command-list.component';
import { GestgoCommandOptionGroupComponent } from '@/shared/components/command/command-option-group.component';
import { GestgoCommandOptionComponent } from '@/shared/components/command/command-option.component';
import { GestgoCommandComponent } from '@/shared/components/command/command.component';

export const GestgoCommandImports = [
  GestgoCommandComponent,
  GestgoCommandInputComponent,
  GestgoCommandListComponent,
  GestgoCommandEmptyComponent,
  GestgoCommandOptionComponent,
  GestgoCommandOptionGroupComponent,
  GestgoCommandDividerComponent] as const;
