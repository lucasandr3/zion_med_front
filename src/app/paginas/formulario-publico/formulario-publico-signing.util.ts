import { FormularioPublicoField } from '../../core/services/formulario-publico.service';
import { fieldType } from './formulario-publico-field.util';
import { fpSignatureIsFilled } from './formulario-publico-a11y.util';

export function signingSecurityReinforced(signingSecurityLevel?: string): boolean {
  return (signingSecurityLevel ?? 'basic') === 'reinforced';
}

export function templateHasSignatureFields(fields: FormularioPublicoField[]): boolean {
  return fields.some((f) => fieldType(f) === 'signature');
}

export function hasFilledSignatures(
  fields: FormularioPublicoField[],
  valores: Record<string, string | number | boolean | Date>,
): boolean {
  return fields.some(
    (f) => fieldType(f) === 'signature' && fpSignatureIsFilled(valores[f.name_key]),
  );
}
