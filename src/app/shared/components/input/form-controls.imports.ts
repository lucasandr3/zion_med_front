import { ZardCheckboxComponent } from '@/shared/components/checkbox';
import { ZardSwitchComponent } from '@/shared/components/switch';

import { ZardInputDirective } from './input.directive';

/** Imports compartilhados para formulários (`z-input`, `z-checkbox`, `z-switch`). */
export const ZARD_FORM_CONTROL_IMPORTS = [ZardInputDirective, ZardCheckboxComponent, ZardSwitchComponent];
