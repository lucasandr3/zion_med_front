import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastContainerComponent } from './componentes/ui/toast-container/toast-container.component';
import { ConfirmDialogComponent } from './componentes/ui/confirm-dialog/confirm-dialog.component';
import { ZmTopProgressBarComponent } from './shared/components/top-progress-bar/top-progress-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ZmTopProgressBarComponent, ToastContainerComponent, ConfirmDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zion_med_front';
}
