import { FormularioPublicoField } from '../../core/services/formulario-publico.service';
import { fieldType } from './formulario-publico-field.util';
import { hasFilledSignatures, signingSecurityReinforced, templateHasSignatureFields } from './formulario-publico-signing.util';

export interface FormularioPublicoSubmitContext {
  fields: FormularioPublicoField[];
  valores: Record<string, string | number | boolean | Date>;
  submitterName: string;
  submitterEmail: string;
  personCpfDigits: string;
  personCode?: string;
  personBirthDate?: string;
  signingSecurityLevel?: string;
  otpChannel: 'email' | 'whatsapp';
  otpPhone: string;
  acceptTerms?: boolean;
  comprehensionAck?: boolean;
  requireComprehension?: boolean;
  assistedMode?: boolean;
  professionalExplained?: boolean;
  quizAnswers?: Record<string, number>;
  actors?: {
    guardian_name?: string;
    guardian_relation?: string;
    witness_name?: string;
  };
}

export function buildFormularioPublicoSubmitPayload(ctx: FormularioPublicoSubmitContext): Record<string, unknown> {
  const normalized = Object.fromEntries(
    Object.entries(ctx.valores).map(([k, v]) => [k, v instanceof Date ? v.toISOString().slice(0, 10) : v]),
  );

  const signatures = ctx.fields
    .filter((f) => fieldType(f) === 'signature')
    .reduce<Record<string, string>>((acc, f) => {
      const value = normalized[f.name_key];
      if (typeof value === 'string' && value.trim().length > 0) {
        acc[f.name_key] = value;
      }
      return acc;
    }, {});

  const payload: Record<string, unknown> = {
    _submitter_name: ctx.submitterName || undefined,
    _submitter_email: ctx.submitterEmail || undefined,
    ...normalized,
  };

  if (Object.keys(signatures).length > 0) {
    payload['_signature'] = signatures;
  }

  const hasSignatures = templateHasSignatureFields(ctx.fields) && hasFilledSignatures(ctx.fields, ctx.valores);
  if (hasSignatures || ctx.acceptTerms) {
    payload['_accept_terms'] = true;
    payload['_accepted_text_at'] = new Date().toISOString();
  }

  if (ctx.requireComprehension || ctx.comprehensionAck) {
    payload['_comprehension_ack'] = !!ctx.comprehensionAck;
    if (ctx.comprehensionAck) {
      payload['_comprehension_ack_at'] = new Date().toISOString();
    }
  }

  if (ctx.assistedMode) {
    payload['_assisted_mode'] = true;
  }
  if (ctx.professionalExplained) {
    payload['_professional_explained'] = true;
  }
  if (ctx.quizAnswers && Object.keys(ctx.quizAnswers).length > 0) {
    payload['_comprehension_quiz'] = ctx.quizAnswers;
  }
  if (ctx.actors && (ctx.actors.guardian_name || ctx.actors.witness_name)) {
    payload['_actors'] = {
      guardian_name: ctx.actors.guardian_name || undefined,
      guardian_relation: ctx.actors.guardian_relation || undefined,
      witness_name: ctx.actors.witness_name || undefined,
    };
  }

  if (signingSecurityReinforced(ctx.signingSecurityLevel) && hasSignatures) {
    payload['_otp_channel'] = ctx.otpChannel;
    if (ctx.otpChannel === 'whatsapp') {
      payload['_otp_recipient'] = ctx.otpPhone.trim();
    }
  }

  if (ctx.personCpfDigits) {
    payload['_person_cpf'] = ctx.personCpfDigits;
  }
  if (ctx.personCode) {
    payload['_person_code'] = ctx.personCode;
  }
  if (ctx.personBirthDate) {
    payload['_person_birth_date'] = ctx.personBirthDate;
  }

  return payload;
}
