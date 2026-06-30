import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioPublicoData } from '../../core/services/formulario-publico.service';

@Component({
  selector: 'zm-formulario-publico-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formulario-publico-header.component.html',
})
export class FormularioPublicoHeaderComponent {
  @Input({ required: true }) data!: FormularioPublicoData;
  @Input() dark = false;
  @Input() personFormUnlocked = false;
  @Input() progressPercent = 0;
  @Input() progressCountLabel = '';
  @Input() logoUrl: string | null = null;
  @Input() clinicInitial = 'Z';

  @Output() toggleDark = new EventEmitter<void>();
  @Output() logoError = new EventEmitter<void>();
}
