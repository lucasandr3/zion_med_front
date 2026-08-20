import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormularioPublicoData } from '../../core/services/formulario-publico.service';
import { ClinicalFormStepMeta } from '../../core/utils/clinical-step.util';

@Component({
  selector: 'zm-formulario-publico-header',
  standalone: true,
  imports: [],
  templateUrl: './formulario-publico-header.component.html',
})
export class FormularioPublicoHeaderComponent {
  @Input({ required: true }) data!: FormularioPublicoData;
  @Input() dark = false;
  @Input() hidePlatformBranding = false;
  @Input() personFormUnlocked = false;
  @Input() progressPercent = 0;
  @Input() progressCountLabel = '';
  @Input() logoUrl: string | null = null;
  @Input() clinicInitial = 'Z';
  @Input() usesFormSteps = false;
  @Input() currentStepNumber = 1;
  @Input() totalFormSteps = 1;
  @Input() currentStepTitle = '';
  @Input() clinicalSteps: ClinicalFormStepMeta[] = [];
  @Input() largeTextMode = false;

  @Output() toggleDark = new EventEmitter<void>();
  @Output() toggleLargeText = new EventEmitter<void>();
  @Output() logoError = new EventEmitter<void>();
}
