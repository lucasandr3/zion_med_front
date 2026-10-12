import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ZmTopProgressBarComponent } from './shared/components/top-progress-bar/top-progress-bar.component';
import { GestgoToasterComponent } from './shared/components/toast';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { ZmAppUpdateBannerComponent } from './shared/components/ui/zm-app-update-banner.component';
import { AppUpdateService } from './core/services/app-update.service';

@Component({
  selector: 'app-root',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    RouterOutlet,
    ZmTopProgressBarComponent,
    GestgoToasterComponent,
    ConfirmDialogComponent,
    ZmAppUpdateBannerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Gestgo';

  constructor() {
    inject(AppUpdateService).init();
  }
}
