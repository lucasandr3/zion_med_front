import { FormularioPublicoField } from '../../core/services/formulario-publico.service';
import { fieldType } from './formulario-publico-field.util';
import { FEEGOW_VALUE_DEFAULTS } from './formulario-publico-feegow.util';

export function initFormularioPublicoValores(
  fields: FormularioPublicoField[],
  feegowEnabled: boolean,
): Record<string, string | number | boolean | Date> {
  const valores: Record<string, string | number | boolean | Date> = {};
  fields.forEach((f) => {
    const ft = fieldType(f);
    valores[f.name_key] = ft === 'checkbox' ? false : '';
  });
  if (feegowEnabled) {
    Object.entries(FEEGOW_VALUE_DEFAULTS).forEach(([key, value]) => {
      if (!(key in valores)) valores[key] = value;
    });
  }
  return valores;
}

export function resetFormularioPublicoValores(
  fields: FormularioPublicoField[],
  valores: Record<string, string | number | boolean | Date>,
): void {
  fields.forEach((f) => {
    const ft = fieldType(f);
    valores[f.name_key] = ft === 'checkbox' ? false : '';
  });
}
