import {
  filterVisibleFields,
  isFieldVisible,
  requiresGuardianName,
  shouldShowActorsBlock,
} from './field-visibility.util';

describe('field-visibility.util', () => {
  const fields = [
    { name_key: 'eh_menor', visibility_rules: null },
    {
      name_key: 'nome_responsavel',
      required: true,
      visibility_rules: {
        show_when: [{ field: 'eh_menor', operator: 'equals' as const, value: 'Sim' }],
      },
    },
  ];

  it('mostra campo sem regras sempre', () => {
    expect(isFieldVisible(fields[0], {})).toBe(true);
  });

  it('oculta campo condicional quando condição não bate', () => {
    expect(isFieldVisible(fields[1], { eh_menor: 'Não' })).toBe(false);
  });

  it('exibe campo condicional quando condição bate', () => {
    expect(isFieldVisible(fields[1], { eh_menor: 'Sim' })).toBe(true);
    expect(filterVisibleFields(fields, { eh_menor: 'Sim' })).toHaveLength(2);
    expect(filterVisibleFields(fields, { eh_menor: 'Não' })).toHaveLength(1);
  });

  it('avalia bloco de atores condicional', () => {
    const rules = {
      show_when: [{ field: 'eh_menor', operator: 'equals' as const, value: 'Sim' }],
      require_guardian: true,
    };
    expect(shouldShowActorsBlock('consentimento', 'consentimento', rules, { eh_menor: 'Não' })).toBe(false);
    expect(shouldShowActorsBlock('consentimento', 'consentimento', rules, { eh_menor: 'Sim' })).toBe(true);
    expect(requiresGuardianName('consentimento', 'consentimento', rules, { eh_menor: 'Sim' })).toBe(true);
    expect(requiresGuardianName('consentimento', 'consentimento', rules, { eh_menor: 'Não' })).toBe(false);
  });
});
