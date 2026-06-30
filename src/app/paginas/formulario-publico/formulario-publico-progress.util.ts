import { FormularioPublicoField } from '../../core/services/formulario-publico.service';
import { isFieldFilled } from './formulario-publico-field.util';
import { isTrackableFormField } from './formulario-publico-steps.util';

export interface FormularioPublicoProgressInput {
  fields: FormularioPublicoField[];
  valores: Record<string, string | number | boolean | Date>;
  usesFormSteps: boolean;
  currentStepNumber: number;
  totalFormSteps: number;
}

export function computeFormularioPublicoProgress(input: FormularioPublicoProgressInput): {
  percent: number;
  countLabel: string;
} {
  const trackable = input.fields.filter((f) => isTrackableFormField(f));
  const filled = trackable.filter((f) => isFieldFilled(f, input.valores)).length;
  const total = trackable.length;
  const required = input.fields.filter((f) => f.required);
  const requiredFilled = required.filter((f) => isFieldFilled(f, input.valores)).length;

  const percent = total <= 0 ? 0 : Math.round((filled / total) * 100);

  let countLabel: string;
  if (input.usesFormSteps) {
    countLabel = `Etapa ${input.currentStepNumber} de ${input.totalFormSteps} · ${filled} de ${total}`;
  } else if (required.length > 0) {
    countLabel = `${requiredFilled} de ${required.length} obrigatórios · ${filled} de ${total}`;
  } else {
    countLabel = `${filled} de ${total} preenchidos`;
  }

  return { percent, countLabel };
}
