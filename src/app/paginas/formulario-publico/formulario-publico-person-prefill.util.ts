import { FormularioPublicoField } from '../../core/services/formulario-publico.service';
import { fieldType } from './formulario-publico-field.util';

export interface PersonPrefill {
  name?: string;
  cpf?: string | null;
  rg?: string | null;
  email?: string | null;
  phone?: string | null;
  phone_alt?: string | null;
  birth_date?: string | null;
  age?: number | null;
  sex?: string | null;
  marital_status?: string | null;
  profession?: string | null;
  address?: string | null;
  neighborhood?: string | null;
  city?: string | null;
  cep?: string | null;
  referred_by?: string | null;
  notes?: string | null;
  has_health_plan?: string | null;
  health_plan_operator?: string | null;
  health_plan_card_number?: string | null;
}

const PERSON_PREFILL_KEY_ALIASES: Record<string, string[]> = {
  name: ['nome', 'name', 'paciente', 'cliente'],
  cpf: ['cpf'],
  rg: ['rg'],
  email: ['email', 'e-mail', 'mail'],
  phone: ['telefone', 'celular', 'whatsapp', 'fone', 'phone', 'contato'],
  birth_date: ['nascimento', 'birth', 'data_nascimento'],
  age: ['idade', 'age'],
  sex: ['sexo', 'genero', 'gênero', 'sex'],
  marital_status: ['estado_civil', 'marital'],
  profession: ['profissao', 'profissão', 'profession'],
  address: ['endereco', 'endereço', 'logradouro', 'rua', 'address'],
  neighborhood: ['bairro', 'neighborhood'],
  city: ['cidade', 'city'],
  cep: ['cep'],
  referred_by: ['indicacao', 'indicação', 'referencia', 'referência', 'referred'],
  notes: ['observacao', 'observação', 'anotacao', 'anotação', 'notas', 'notes'],
  has_health_plan: ['plano_saude', 'plano de saude', 'plano de saúde', 'convenio', 'convênio'],
  health_plan_operator: ['operadora', 'health_plan_operator'],
  health_plan_card_number: ['carteirinha', 'numero_carteirinha', 'nro_carteirinha', 'health_plan_card_number'],
};

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function resolvePersonPrefillValue(
  key: string,
  prefill: PersonPrefill,
): string | number | boolean | null {
  const normalizedKey = normalizeText(key).replace(/\s+/g, '_');
  const direct = (prefill as Record<string, unknown>)[normalizedKey];
  if (direct !== undefined && direct !== null && String(direct).trim() !== '') {
    return direct as string | number | boolean;
  }

  for (const [prefillKey, aliases] of Object.entries(PERSON_PREFILL_KEY_ALIASES)) {
    const matched = aliases.some((alias) => normalizedKey.includes(normalizeText(alias).replace(/\s+/g, '_')));
    if (!matched) continue;
    const value = (prefill as Record<string, unknown>)[prefillKey];
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      return value as string | number | boolean;
    }
  }

  return null;
}

/** Preenche campos vazios com dados da ficha (pós-validação CPF). */
export function applyPersonPrefillToFields(
  fields: FormularioPublicoField[],
  valores: Record<string, string | number | boolean | Date>,
  prefill: PersonPrefill | undefined,
): void {
  fields.forEach((field) => {
    const fieldKey = field.name_key;
    const currentValue = valores[fieldKey];
    if (String(currentValue ?? '').trim() !== '') return;

    const byNameKey = prefill ? resolvePersonPrefillValue(fieldKey, prefill) : null;
    const byLabel = prefill ? resolvePersonPrefillValue(field.label, prefill) : null;
    const nextValue = byNameKey ?? byLabel;
    if (nextValue === null || nextValue === undefined) return;

    if (fieldType(field) === 'number') {
      const n = Number(nextValue);
      if (!Number.isNaN(n)) valores[fieldKey] = n;
      return;
    }

    valores[fieldKey] = String(nextValue);
  });
}

export function resolveSubmitterFromPrefill(
  prefill: PersonPrefill | undefined,
  validatedName?: string,
): { name: string; email: string } {
  const backendName = prefill?.name && String(prefill.name).trim() ? String(prefill.name).trim() : '';
  const backendEmail = prefill?.email && String(prefill.email).trim() ? String(prefill.email).trim() : '';
  const fallbackValidatedName = validatedName && String(validatedName).trim() ? String(validatedName).trim() : '';
  return {
    name: backendName || fallbackValidatedName,
    email: backendEmail,
  };
}
