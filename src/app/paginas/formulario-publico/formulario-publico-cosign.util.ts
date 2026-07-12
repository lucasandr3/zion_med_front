import { FormularioPublicoField } from '../../core/services/formulario-publico.service';
import { fieldType } from './formulario-publico-field.util';
import { fpSignatureIsFilled } from './formulario-publico-a11y.util';

export const ASSISTED_COSIGN_FIELD_KEY = 'assinatura_profissional';

const POSITIVE_TERMS = [
  'profissional',
  'responsável',
  'responsavel',
  'clínica',
  'clinica',
  'equipe',
  'médico',
  'medico',
  'dr.',
  'dra.',
  'doctor',
  'prestador',
  'cirurgião',
  'cirurgiao',
];

const NEGATIVE_TERMS = [
  'paciente',
  'cliente',
  'titular',
  'genitor',
  'genitora',
  'acompanhante',
  'assistido',
  'responsável legal',
  'responsavel legal',
];

export function pickProfessionalSignatureField(fields: FormularioPublicoField[]): FormularioPublicoField | null {
  const slots = fields.filter((f) => fieldType(f) === 'signature');
  if (slots.length === 0) return null;

  let best: FormularioPublicoField | null = null;
  let bestScore = Number.MIN_SAFE_INTEGER;

  for (const field of slots) {
    const haystack = `${field.name_key} ${field.label ?? ''}`.toLowerCase();
    let score = 0;
    for (const word of POSITIVE_TERMS) {
      if (haystack.includes(word)) score += 3;
    }
    for (const word of NEGATIVE_TERMS) {
      if (haystack.includes(word)) score -= 5;
    }
    if (score > bestScore) {
      bestScore = score;
      best = field;
    }
  }

  return bestScore > 0 ? best : null;
}

export function resolveProfessionalCosignFieldKey(fields: FormularioPublicoField[]): string {
  return pickProfessionalSignatureField(fields)?.name_key ?? ASSISTED_COSIGN_FIELD_KEY;
}

export function shouldShowAssistedCosignBlock(fields: FormularioPublicoField[], assistedMode: boolean): boolean {
  return assistedMode && pickProfessionalSignatureField(fields) === null;
}

export function hasProfessionalCosignFilled(
  fields: FormularioPublicoField[],
  valores: Record<string, string | number | boolean | Date>,
  assistedMode: boolean,
): boolean {
  if (!assistedMode) return true;
  const key = resolveProfessionalCosignFieldKey(fields);
  const value = valores[key];
  return fpSignatureIsFilled(value);
}
