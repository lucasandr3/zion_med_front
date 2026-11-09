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

export type IdentityCoverage = {
  name: boolean;
  email: boolean;
};

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

/** Chaves/labels estritos de nome do paciente (evita nome_mae, nome_pai, etc.). */
const PATIENT_NAME_KEYS = new Set([
  'nome',
  'name',
  'nome_completo',
  'nome_paciente',
  'nome_cliente',
  'nome_titular',
  'paciente',
  'cliente',
  'full_name',
  'fullname_completo',
]);

const PATIENT_NAME_LABELS = new Set([
  'nome',
  'seu nome',
  'nome completo',
  'nome do paciente',
  'nome do cliente',
  'nome do titular',
  'paciente',
  'cliente',
]);

const PATIENT_EMAIL_KEYS = new Set([
  'email',
  'e_mail',
  'mail',
  'email_paciente',
  'email_cliente',
  'email_titular',
]);

const PATIENT_EMAIL_LABELS = new Set([
  'email',
  'e mail',
  'seu email',
  'email do paciente',
  'email do cliente',
]);

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function normalizeKey(value: string): string {
  return normalizeText(value).replace(/\s+/g, '_');
}

/** Detecta e-mail/telefone/CPF mascarados vindos do backend (PiiMasker). */
export function isMaskedPiiValue(value: unknown): boolean {
  const s = String(value ?? '').trim();
  if (!s) return false;
  return s.includes('***') || /^\*{2,}/.test(s);
}

function resolvePersonPrefillValue(
  key: string,
  prefill: PersonPrefill,
): string | number | boolean | null {
  const normalizedKey = normalizeKey(key);
  const direct = (prefill as Record<string, unknown>)[normalizedKey];
  if (direct !== undefined && direct !== null && String(direct).trim() !== '') {
    return direct as string | number | boolean;
  }

  for (const [prefillKey, aliases] of Object.entries(PERSON_PREFILL_KEY_ALIASES)) {
    const matched = aliases.some((alias) => normalizedKey.includes(normalizeKey(alias)));
    if (!matched) continue;
    const value = (prefill as Record<string, unknown>)[prefillKey];
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      return value as string | number | boolean;
    }
  }

  return null;
}

function fieldLooksLikeExcludedRelative(haystack: string): boolean {
  return (
    haystack.includes('mae') ||
    haystack.includes('pai') ||
    haystack.includes('responsavel') ||
    haystack.includes('tutor') ||
    haystack.includes('conjuge') ||
    haystack.includes('testemunha') ||
    haystack.includes('profissional') ||
    haystack.includes('guardian') ||
    haystack.includes('witness')
  );
}

/** Campo de nome do paciente/titular (não de responsável/parente). */
export function isPatientNameIdentityField(field: FormularioPublicoField): boolean {
  const key = normalizeKey(field.name_key);
  const label = normalizeText(field.label);
  if (fieldLooksLikeExcludedRelative(`${key} ${label}`)) return false;
  if (PATIENT_NAME_KEYS.has(key)) return true;
  if (PATIENT_NAME_LABELS.has(label)) return true;
  return false;
}

/** Campo de e-mail do paciente/titular. */
export function isPatientEmailIdentityField(field: FormularioPublicoField): boolean {
  const key = normalizeKey(field.name_key);
  const label = normalizeText(field.label);
  if (fieldLooksLikeExcludedRelative(`${key} ${label}`)) return false;
  if (PATIENT_EMAIL_KEYS.has(key)) return true;
  if (PATIENT_EMAIL_LABELS.has(label)) return true;
  return false;
}

export function resolveIdentityCoverage(submitter: { name?: string; email?: string }): IdentityCoverage {
  const name = String(submitter.name ?? '').trim();
  const email = String(submitter.email ?? '').trim();
  return {
    name: name.length > 0,
    email: email.length > 0 && !isMaskedPiiValue(email),
  };
}

/**
 * Esconde campos de nome/e-mail do template quando a identidade já foi coletada
 * e o valor já está em `valores` (continua no payload/PDF).
 */
export function shouldHideIdentityCoveredField(
  field: FormularioPublicoField,
  covered: IdentityCoverage,
  valores: Record<string, string | number | boolean | Date>,
): boolean {
  const current = String(valores[field.name_key] ?? '').trim();
  if (!current || isMaskedPiiValue(current)) return false;

  if (covered.name && isPatientNameIdentityField(field)) return true;
  if (covered.email && isPatientEmailIdentityField(field)) return true;
  return false;
}

export function filterIdentityCoveredFields(
  fields: FormularioPublicoField[],
  covered: IdentityCoverage,
  valores: Record<string, string | number | boolean | Date>,
): FormularioPublicoField[] {
  if (!covered.name && !covered.email) return fields;
  return fields.filter((field) => !shouldHideIdentityCoveredField(field, covered, valores));
}

/** Copia nome/e-mail da fase Identificação (ou gate) para campos vazios do modelo. */
export function applySubmitterIdentityToFields(
  fields: FormularioPublicoField[],
  valores: Record<string, string | number | boolean | Date>,
  submitter: { name?: string; email?: string },
): void {
  const name = String(submitter.name ?? '').trim();
  const email = String(submitter.email ?? '').trim();
  const usableEmail = email && !isMaskedPiiValue(email) ? email : '';

  fields.forEach((field) => {
    const fieldKey = field.name_key;
    const current = String(valores[fieldKey] ?? '').trim();
    if (current && !isMaskedPiiValue(current)) return;

    if (name && isPatientNameIdentityField(field)) {
      valores[fieldKey] = name;
      return;
    }
    if (usableEmail && isPatientEmailIdentityField(field)) {
      valores[fieldKey] = usableEmail;
    }
  });
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
    const currentText = String(currentValue ?? '').trim();
    if (currentText !== '' && !isMaskedPiiValue(currentText)) return;

    const byNameKey = prefill ? resolvePersonPrefillValue(fieldKey, prefill) : null;
    const byLabel = prefill ? resolvePersonPrefillValue(field.label, prefill) : null;
    const nextValue = byNameKey ?? byLabel;
    if (nextValue === null || nextValue === undefined) return;
    if (isMaskedPiiValue(nextValue)) return;

    if (fieldType(field) === 'number') {
      const n = Number(nextValue);
      if (!Number.isNaN(n)) valores[fieldKey] = n;
      return;
    }

    valores[fieldKey] = String(nextValue);
  });
}

/**
 * R8: após o gate por CPF, preenche campos de CPF vazios com os dígitos já informados
 * (não vem do banco — o paciente acabou de digitar no gate).
 */
export function applyGateCpfToFields(
  fields: FormularioPublicoField[],
  valores: Record<string, string | number | boolean | Date>,
  cpfDigits: string | undefined | null,
): void {
  const digits = String(cpfDigits ?? '').replace(/\D+/g, '');
  if (digits.length !== 11) return;

  const formatted = digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

  fields.forEach((field) => {
    const fieldKey = field.name_key;
    if (String(valores[fieldKey] ?? '').trim() !== '') return;

    const haystack = `${normalizeText(fieldKey)} ${normalizeText(field.label)}`;
    if (!haystack.includes('cpf')) return;

    valores[fieldKey] = formatted;
  });
}

export function resolveSubmitterFromPrefill(
  prefill: PersonPrefill | undefined,
  validatedName?: string,
): { name: string; email: string } {
  const backendName = prefill?.name && String(prefill.name).trim() ? String(prefill.name).trim() : '';
  const rawEmail = prefill?.email && String(prefill.email).trim() ? String(prefill.email).trim() : '';
  const backendEmail = rawEmail && !isMaskedPiiValue(rawEmail) ? rawEmail : '';
  const fallbackValidatedName = validatedName && String(validatedName).trim() ? String(validatedName).trim() : '';
  return {
    name: backendName || fallbackValidatedName,
    email: backendEmail,
  };
}
