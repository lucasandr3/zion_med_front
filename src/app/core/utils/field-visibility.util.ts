export type FieldVisibilityOperator = 'equals' | 'not_equals' | 'filled' | 'empty';

export interface FieldVisibilityCondition {
  field: string;
  operator: FieldVisibilityOperator;
  value?: string;
}

export interface FieldVisibilityRules {
  show_when?: FieldVisibilityCondition[];
  require_guardian?: boolean;
}

export interface FieldWithVisibility {
  name_key: string;
  visibility_rules?: FieldVisibilityRules | null;
}

export const FIELD_VISIBILITY_OPERATORS: { value: FieldVisibilityOperator; label: string }[] = [
  { value: 'equals', label: 'é igual a' },
  { value: 'not_equals', label: 'é diferente de' },
  { value: 'filled', label: 'está preenchido' },
  { value: 'empty', label: 'está vazio' },
];

export function normalizeVisibilityValue(value: unknown): string {
  if (value === true || value === 1 || value === '1') return 'true';
  if (value === false || value === 0 || value === '0') return 'false';
  if (value == null) return '';
  return String(value).trim().toLowerCase();
}

export function isVisibilityValueFilled(value: unknown): boolean {
  if (value === true || value === 1 || value === '1') return true;
  if (value === false || value === 0 || value === '0' || value == null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return value != null;
}

export function matchesVisibilityCondition(
  condition: FieldVisibilityCondition,
  values: Record<string, unknown>,
): boolean {
  const field = (condition.field ?? '').trim();
  if (!field) return true;

  const operator = condition.operator ?? 'equals';
  const actual = values[field];
  const expected = condition.value ?? '';

  switch (operator) {
    case 'equals':
      return normalizeVisibilityValue(actual) === normalizeVisibilityValue(expected);
    case 'not_equals':
      return normalizeVisibilityValue(actual) !== normalizeVisibilityValue(expected);
    case 'filled':
      return isVisibilityValueFilled(actual);
    case 'empty':
      return !isVisibilityValueFilled(actual);
    default:
      return normalizeVisibilityValue(actual) === normalizeVisibilityValue(expected);
  }
}

export function isFieldVisible(
  field: FieldWithVisibility,
  values: Record<string, unknown>,
): boolean {
  const rules = field.visibility_rules;
  const conditions = rules?.show_when;
  if (!conditions?.length) return true;
  return conditions.every((c) => matchesVisibilityCondition(c, values));
}

export function filterVisibleFields<T extends FieldWithVisibility>(
  fields: T[],
  values: Record<string, unknown>,
): T[] {
  return fields.filter((f) => isFieldVisible(f, values));
}

export function isConsentimentoDocument(documentKind?: string, category?: string): boolean {
  const kind = (documentKind ?? '').toLowerCase();
  const cat = (category ?? '').toLowerCase();
  return kind === 'consentimento' || cat === 'consentimento';
}

export function shouldShowActorsBlock(
  documentKind: string | undefined,
  category: string | undefined,
  rules: FieldVisibilityRules | null | undefined,
  values: Record<string, unknown>,
): boolean {
  if (!isConsentimentoDocument(documentKind, category)) return false;
  if (!rules?.show_when?.length) return true;
  return isFieldVisible({ name_key: '_actors', visibility_rules: rules }, values);
}

export function requiresGuardianName(
  documentKind: string | undefined,
  category: string | undefined,
  rules: FieldVisibilityRules | null | undefined,
  values: Record<string, unknown>,
): boolean {
  if (!rules?.require_guardian) return false;
  return shouldShowActorsBlock(documentKind, category, rules, values);
}

export function buildVisibilityRulesPayload(
  enabled: boolean,
  field: string,
  operator: FieldVisibilityOperator,
  value: string,
): FieldVisibilityRules | null {
  if (!enabled || !field.trim()) return null;
  const condition: FieldVisibilityCondition = {
    field: field.trim(),
    operator,
  };
  if (operator === 'equals' || operator === 'not_equals') {
    condition.value = value.trim();
  }
  return { show_when: [condition] };
}

export function parseVisibilityRules(rules?: FieldVisibilityRules | null): {
  enabled: boolean;
  field: string;
  operator: FieldVisibilityOperator;
  value: string;
} {
  const first = rules?.show_when?.[0];
  if (!first?.field) {
    return { enabled: false, field: '', operator: 'equals', value: '' };
  }
  return {
    enabled: true,
    field: first.field,
    operator: first.operator ?? 'equals',
    value: first.value ?? '',
  };
}
