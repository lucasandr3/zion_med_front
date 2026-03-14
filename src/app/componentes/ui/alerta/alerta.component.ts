import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TipoAlerta = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'app-alerta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.css',
})
export class AlertaComponent {
  @Input() tipo: TipoAlerta = 'info';
  @Input() classe = '';
}
