import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ZardCheckboxComponent } from '@/shared/components/checkbox';
import { FormularioPublicoQuizQuestion } from '../../core/services/formulario-publico.service';

@Component({
  selector: 'zm-formulario-publico-consent',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ZardCheckboxComponent],
  templateUrl: './formulario-publico-consent.component.html',
})
export class FormularioPublicoConsentComponent {
  @Input() acceptTerms = false;
  @Input() comprehensionAck = false;
  @Input() requireComprehension = false;
  @Input() showActors = false;
  @Input() guardianName = '';
  @Input() guardianRelation = '';
  @Input() witnessName = '';
  @Input() assistedMode = false;
  @Input() professionalExplained = false;
  @Input() quizQuestions: FormularioPublicoQuizQuestion[] = [];
  @Input() quizAnswers: Record<string, number | null> = {};

  @Output() acceptTermsChange = new EventEmitter<boolean>();
  @Output() comprehensionAckChange = new EventEmitter<boolean>();
  @Output() guardianNameChange = new EventEmitter<string>();
  @Output() guardianRelationChange = new EventEmitter<string>();
  @Output() witnessNameChange = new EventEmitter<string>();
  @Output() professionalExplainedChange = new EventEmitter<boolean>();
  @Output() quizAnswerChange = new EventEmitter<{ id: string; index: number }>();
  @Output() toggleFromBlock = new EventEmitter<MouseEvent>();

  onToggleBlock(event: MouseEvent): void {
    this.toggleFromBlock.emit(event);
  }

  onQuizSelect(id: string, index: number): void {
    this.quizAnswerChange.emit({ id, index });
  }
}
