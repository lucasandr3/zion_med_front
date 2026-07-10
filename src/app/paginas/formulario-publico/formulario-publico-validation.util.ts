import { FormularioPublicoField } from '../../core/services/formulario-publico.service';
import { isFieldFilled } from './formulario-publico-field.util';
import { buildFormFieldSteps, isStructuralFormField } from './formulario-publico-steps.util';

export function findPendingRequiredFields(
  fields: FormularioPublicoField[],
  valores: Record<string, string | number | boolean | Date>,
): FormularioPublicoField[] {
  return fields.filter((f) => !isStructuralFormField(f) && f.required && !isFieldFilled(f, valores));
}

export function findStepIndexForField(
  allFields: FormularioPublicoField[],
  nameKey: string,
): number {
  const steps = buildFormFieldSteps(allFields);
  return steps.findIndex((step) => step.some((f) => f.name_key === nameKey));
}
