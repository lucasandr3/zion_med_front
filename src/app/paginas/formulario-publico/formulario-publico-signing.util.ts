import { FormularioPublicoField } from '../../core/services/formulario-publico.service';
import { fieldType } from './formulario-publico-field.util';

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
    (f) =>
      fieldType(f) === 'signature' &&
      typeof valores[f.name_key] === 'string' &&
      String(valores[f.name_key]).length > 80,
  );
}
