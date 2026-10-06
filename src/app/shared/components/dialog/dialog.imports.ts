import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';


import { GestgoDialogComponent } from '@/shared/components/dialog/dialog.component';

export const GestgoDialogImports = [ GestgoDialogComponent, OverlayModule, PortalModule] as const;
