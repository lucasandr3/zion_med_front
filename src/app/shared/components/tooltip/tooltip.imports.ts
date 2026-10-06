import { OverlayModule } from '@angular/cdk/overlay';

import { GestgoTooltipComponent, GestgoTooltipDirective } from './tooltip';

export const GestgoTooltipImports = [GestgoTooltipComponent, GestgoTooltipDirective, OverlayModule] as const;
