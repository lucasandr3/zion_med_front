import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ZmTopProgressBarComponent } from './shared/components/top-progress-bar/top-progress-bar.component';
import { ZardToastComponent } from './shared/components/toast';
import { ZmAppUpdateBannerComponent } from './shared/components/ui/zm-app-update-banner.component';
import { AppUpdateService } from './core/services/app-update.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ZmTopProgressBarComponent, ZardToastComponent, ZmAppUpdateBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gestgo';

  constructor() {
    inject(AppUpdateService).init();
  }
}
