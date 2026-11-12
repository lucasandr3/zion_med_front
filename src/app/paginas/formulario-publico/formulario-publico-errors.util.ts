import type { FormularioPublicoField } from '../../core/services/formulario-publico.service';

/** Mensagens amigáveis para chaves internas da API. */
const INTERNAL_KEY_HINTS: Record<string, string> = {
  _comprehension_ack: 'Marque a caixa confirmando que leu e compreendeu o termo.',
  _accept_terms: 'Marque a caixa da política de privacidade.',
  _term_scrolled_at: 'Role até o final de todas as seções do termo antes de continuar.',
  _person_cpf: 'Informe um CPF válido.',
  _person_code: 'Informe o código de identificação.',
  _person_birth_date: 'Informe a data de nascimento.',
  _person_name_confirmed: 'Confirme o seu nome antes de continuar.',
  '_actors.guardian_name': 'Informe o nome do responsável legal.',
  _comprehension_quiz: 'Responda às perguntas de compreensão antes de enviar.',
  _professional_name: 'Informe o nome do profissional.',
  _professional_explained: 'O profissional precisa confirmar que explicou o termo.',
};

function firstMessage(value: unknown): string {
  if (Array.isArray(value) && value.length) return String(value[0] ?? '').trim();
  if (typeof value === 'string') return value.trim();
  return '';
}

function softenLaravelWording(raw: string, label?: string): string {
  let text = raw.trim();
  if (!text) return '';

  // "The xxx field is required." / "O campo xxx é obrigatório."
  const requiredEn = text.match(/^The (.+?) field is required\.?$/i);
  if (requiredEn) {
    return label
      ? `Preencha o campo «${label}».`
      : `Preencha o campo pendente (${requiredEn[1]}).`;
  }
  const requiredPt = text.match(/^O campo (.+?) é obrigatório\.?$/i);
  if (requiredPt) {
    return label ? `Preencha o campo «${label}».` : `Preencha o campo «${requiredPt[1]}».`;
  }

  // "The xxx must be accepted."
  if (/must be accepted/i.test(text) || /deve ser aceito/i.test(text)) {
    return label
      ? `Marque a confirmação «${label}».`
      : 'Marque a caixa de confirmação pendente.';
  }

  if (label && /:attribute|campo :attribute/i.test(text)) {
    text = text.replace(/:attribute/gi, label);
  }

  // Remove jargão técnico residual
  text = text
    .replace(/\bOTP\b/g, 'código de verificação')
    .replace(/\bFeegow\b/gi, 'agenda')
    .replace(/\bvalidation\b/gi, 'verificação')
    .replace(/\bnullable\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return text;
}

/**
 * Converte erro HTTP do envio do formulário público em texto claro para o paciente.
 */
export function humanizePublicFormSubmitError(
  err: { error?: { message?: string; errors?: Record<string, unknown> } } | null | undefined,
  fields: FormularioPublicoField[] = [],
): string {
  const bag = err?.error?.errors;
  if (bag && typeof bag === 'object') {
    const parts: string[] = [];
    for (const [key, msgs] of Object.entries(bag)) {
      const hint = INTERNAL_KEY_HINTS[key];
      if (hint) {
        parts.push(hint);
        continue;
      }
      const label = fields.find((f) => f.name_key === key)?.label;
      const softened = softenLaravelWording(firstMessage(msgs), label);
      if (softened) parts.push(softened);
    }
    if (parts.length) {
      // Evita parede de texto: no máximo 3 avisos
      return parts.slice(0, 3).join(' ');
    }
  }

  const message = err?.error?.message?.trim();
  if (message) {
    const known = INTERNAL_KEY_HINTS[message];
    if (known) return known;
    return softenLaravelWording(message) || 'Não foi possível enviar. Revise os campos e tente de novo.';
  }

  return 'Não foi possível enviar. Revise os campos e tente de novo.';
}

/** Texto curto sob o campo inválido. */
export function publicFieldRequiredHint(label: string): string {
  const clean = (label ?? '').trim();
  return clean ? `Preencha «${clean}» para continuar.` : 'Preencha este campo para continuar.';
}
