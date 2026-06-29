/** Formata dígitos para exibição: +55 (11) 98765-4321 ou (11) 98765-4321 */
export function formatPhoneBrDisplay(digits: string): string {
  if (!digits) return '';
  if (digits.startsWith('55') && digits.length > 2) {
    const r = digits.slice(2);
    if (r.length <= 2) return `+55 (${r}`;
    if (r.length <= 6) return `+55 (${r.slice(0, 2)}) ${r.slice(2)}`;
    if (r.length <= 10) return `+55 (${r.slice(0, 2)}) ${r.slice(2, 6)}-${r.slice(6)}`;
    return `+55 (${r.slice(0, 2)}) ${r.slice(2, 7)}-${r.slice(7, 11)}`;
  }
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export function digitsOnlyPhone(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, 13);
}

export function digitsOnlyCpf(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, 11);
}

/** CPF: 000.000.000-00 */
export function formatCpfDisplay(digits: string): string {
  if (!digits) return '';
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
}

export function phoneDigitsForApi(digits: string): string | null {
  if (!digits) return null;
  let d = digits;
  if (d.length >= 10 && d.length <= 11 && !d.startsWith('55')) {
    d = '55' + d;
  }
  return d;
}

export function serializeBirthDateValue(v: string | Date | null | undefined): string | null {
  if (v == null || v === '') return null;
  if (v instanceof Date) {
    if (isNaN(v.getTime())) return null;
    const y = v.getFullYear();
    const m = String(v.getMonth() + 1).padStart(2, '0');
    const d = String(v.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  const s = String(v).trim();
  return s || null;
}

export interface PessoaFormValue {
  name: string;
  email: string;
  phoneDigits: string;
  phoneAltDigits: string;
  cpfDigits: string;
  profession: string;
  rg: string;
  age: number | null;
  sex: 'F' | 'M' | 'O' | '';
  marital_status: string;
  referred_by: string;
  address: string;
  neighborhood: string;
  city: string;
  cep: string;
  lead_source_instagram: boolean;
  lead_source_google: boolean;
  lead_source_facebook: boolean;
  lead_source_indicacao_amigo: boolean;
  lead_source_indicacao_medica: boolean;
  lead_source_plano_saude: boolean;
  lead_source_outro: string;
  has_health_plan: 'sim' | 'nao' | '';
  health_plan_operator: string;
  health_plan_card_number: string;
  lgpd_accept_comms: boolean;
  lgpd_accept_reminders: boolean;
  notes: string;
  status: 'active' | 'inactive';
}

export function buildPessoaApiPayload(
  form: PessoaFormValue,
  birthDate: string | Date | null | undefined,
): {
  name: string;
  phone: string | null;
  phone_alt: string | null;
  email: string | null;
  birth_date: string | null;
  age: number | null;
  sex: 'F' | 'M' | 'O' | null;
  cpf: string | null;
  rg: string | null;
  marital_status: string | null;
  profession: string | null;
  referred_by: string | null;
  address: string | null;
  neighborhood: string | null;
  city: string | null;
  cep: string | null;
  lead_source_instagram: boolean;
  lead_source_google: boolean;
  lead_source_facebook: boolean;
  lead_source_indicacao_amigo: boolean;
  lead_source_indicacao_medica: boolean;
  lead_source_plano_saude: boolean;
  lead_source_outro: string | null;
  has_health_plan: 'sim' | 'nao' | null;
  health_plan_operator: string | null;
  health_plan_card_number: string | null;
  lgpd_accept_comms: boolean;
  lgpd_accept_reminders: boolean;
  notes: string | null;
  status: 'active' | 'inactive';
} {
  return {
    name: form.name.trim(),
    phone: phoneDigitsForApi(form.phoneDigits),
    phone_alt: phoneDigitsForApi(form.phoneAltDigits),
    email: form.email.trim() || null,
    birth_date: serializeBirthDateValue(birthDate),
    age: form.age,
    sex: form.sex || null,
    cpf: form.cpfDigits ? form.cpfDigits : null,
    rg: form.rg.trim() || null,
    marital_status: form.marital_status || null,
    profession: form.profession.trim() || null,
    referred_by: form.referred_by.trim() || null,
    address: form.address.trim() || null,
    neighborhood: form.neighborhood.trim() || null,
    city: form.city.trim() || null,
    cep: form.cep.trim() || null,
    lead_source_instagram: form.lead_source_instagram,
    lead_source_google: form.lead_source_google,
    lead_source_facebook: form.lead_source_facebook,
    lead_source_indicacao_amigo: form.lead_source_indicacao_amigo,
    lead_source_indicacao_medica: form.lead_source_indicacao_medica,
    lead_source_plano_saude: form.lead_source_plano_saude,
    lead_source_outro: form.lead_source_outro.trim() || null,
    has_health_plan: form.has_health_plan || null,
    health_plan_operator: form.health_plan_operator.trim() || null,
    health_plan_card_number: form.health_plan_card_number.trim() || null,
    lgpd_accept_comms: form.lgpd_accept_comms,
    lgpd_accept_reminders: form.lgpd_accept_reminders,
    notes: form.notes.trim() || null,
    status: form.status,
  };
}
