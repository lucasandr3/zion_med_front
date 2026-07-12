import { FormularioPublicoField } from '../../core/services/formulario-publico.service';
import { filterVisibleFields } from '../../core/utils/field-visibility.util';
import { isFieldFilled } from './formulario-publico-field.util';
import { isStructuralFormField, findStepIndexForFieldInState } from './formulario-publico-steps.util';

export function findPendingRequiredFields(
  fields: FormularioPublicoField[],
  valores: Record<string, string | number | boolean | Date>,
): FormularioPublicoField[] {
  const visible = filterVisibleFields(fields, valores);
  return visible.filter((f) => !isStructuralFormField(f) && f.required && !isFieldFilled(f, valores));
}

export function findStepIndexForField(
  allFields: FormularioPublicoField[],
  nameKey: string,
  usesClinicalStepsFlag?: boolean,
): number {
  return findStepIndexForFieldInState(allFields, nameKey, usesClinicalStepsFlag);
}
