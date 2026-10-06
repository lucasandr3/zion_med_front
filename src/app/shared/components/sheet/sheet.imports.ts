import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { GestgoSheetComponent } from '@/shared/components/sheet/sheet.component';

export const GestgoSheetImports = [GestgoSheetComponent, OverlayModule, PortalModule] as const;
