import { FormularioPublicoField } from '../../core/services/formulario-publico.service';
import { fieldType } from './formulario-publico-field.util';

const GUARDIAN_NAME_KEYS = new Set([
  'nome_responsavel',
  'nome_responsavel_legal',
  'responsavel_legal',
  'nome_e_parentesco_responsavel',
  'parentesco_responsavel',
  'grau_parentesco_responsavel',
]);

const GUARDIAN_NAME_LABEL_SNIPPETS = [
  'nome do responsavel legal',
  'nome e parentesco do responsavel',
  'nome e parentesco do responsavel legal',
  'responsavel legal (se',
  'parentesco do responsavel',
  'parentesco / relacao',
];

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

function isExcludedGuardianLookalike(haystack: string): boolean {
  return (
    haystack.includes('profissional') ||
    haystack.includes('cirurgiao') ||
    haystack.includes('medico') ||
    haystack.includes('veterinar') ||
    haystack.includes('comercial') ||
    haystack.includes('mv_') ||
    haystack.includes('registro')
  );
}

/**
 * Campos de texto do modelo que repetem o bloco fixo de responsável legal (`_actors`).
 * Não inclui assinatura nem “é menor” (gate condicional).
 */
export function isGuardianLegalTextField(field: FormularioPublicoField): boolean {
  const type = fieldType(field);
  if (type === 'signature' || type === 'file' || type === 'notice' || type === 'heading') {
    return false;
  }

  const key = normalizeKey(field.name_key);
  const label = normalizeText(field.label);
  const haystack = `${key} ${label}`;

  if (isExcludedGuardianLookalike(haystack)) return false;
  if (key === 'eh_menor' || label === 'e menor de idade' || label.includes('menor de idade')) {
    return false;
  }

  if (GUARDIAN_NAME_KEYS.has(key)) return true;

  if (type === 'text' || type === 'textarea') {
    return GUARDIAN_NAME_LABEL_SNIPPETS.some((snippet) => label.includes(snippet));
  }

  return false;
}

/** Oculta campos de nome/parentesco do responsável quando o bloco de atores está visível. */
export function filterGuardianCoveredFields(
  fields: FormularioPublicoField[],
  actorsBlockVisible: boolean,
): FormularioPublicoField[] {
  if (!actorsBlockVisible) return fields;
  return fields.filter((field) => !isGuardianLegalTextField(field));
}

/**
 * Copia dados do bloco `_actors` para campos legados do modelo (PDF/histórico).
 */
export function applyGuardianActorsToFields(
  fields: FormularioPublicoField[],
  valores: Record<string, string | number | boolean | Date>,
  actors: { guardianName?: string; guardianRelation?: string },
): void {
  const name = String(actors.guardianName ?? '').trim();
  if (!name) return;
  const relation = String(actors.guardianRelation ?? '').trim();
  const combined = relation ? `${name} (${relation})` : name;

  fields.forEach((field) => {
    if (!isGuardianLegalTextField(field)) return;
    const current = String(valores[field.name_key] ?? '').trim();
    if (current) return;

    const key = normalizeKey(field.name_key);
    const label = normalizeText(field.label);
    if (key.includes('parentesco') || label.includes('parentesco') || label.includes('relacao')) {
      valores[field.name_key] = relation || name;
      return;
    }
    valores[field.name_key] = combined;
  });
}
