import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ZmTopProgressBarComponent } from './shared/components/top-progress-bar/top-progress-bar.component';
import { ZardToastComponent } from './shared/components/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ZmTopProgressBarComponent, ZardToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gestgo';
}
