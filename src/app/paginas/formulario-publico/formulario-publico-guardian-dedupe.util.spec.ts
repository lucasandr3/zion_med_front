import { FormularioPublicoField } from '../../core/services/formulario-publico.service';
import {
  applyGuardianActorsToFields,
  filterGuardianCoveredFields,
  isGuardianLegalTextField,
} from './formulario-publico-guardian-dedupe.util';

function field(overrides: Partial<FormularioPublicoField>): FormularioPublicoField {
  return {
    id: 1,
    name_key: 'campo',
    label: 'Campo',
    type: 'text',
    required: false,
    sort_order: 0,
    options: [],
    ...overrides,
  };
}

describe('formulario-publico-guardian-dedupe.util', () => {
  it('reconhece texto de responsável legal e ignora assinatura/profissional/menor', () => {
    expect(
      isGuardianLegalTextField(
        field({ name_key: 'nome_responsavel', label: 'Nome e parentesco do responsável legal (se aplicável)' }),
      ),
    ).toBeTrue();
    expect(
      isGuardianLegalTextField(
        field({ name_key: 'assinatura_responsavel', label: 'Assinatura do responsável legal', type: 'signature' }),
      ),
    ).toBeFalse();
    expect(
      isGuardianLegalTextField(
        field({ name_key: 'eh_menor', label: 'É menor de idade?', type: 'select' }),
      ),
    ).toBeFalse();
    expect(
      isGuardianLegalTextField(
        field({ name_key: 'profissional_responsavel', label: 'Profissional responsável' }),
      ),
    ).toBeFalse();
  });

  it('oculta campos cobertos quando o bloco de atores está visível', () => {
    const fields = [
      field({ name_key: 'nome_responsavel', label: 'Nome do responsável legal' }),
      field({ name_key: 'assinatura_responsavel', label: 'Assinatura', type: 'signature' }),
      field({ name_key: 'queixa', label: 'Queixa' }),
    ];
    const filtered = filterGuardianCoveredFields(fields, true);
    expect(filtered.map((f) => f.name_key)).toEqual(['assinatura_responsavel', 'queixa']);
    expect(filterGuardianCoveredFields(fields, false)).toEqual(fields);
  });

  it('copia actors para campos legados vazios', () => {
    const fields = [
      field({ name_key: 'nome_responsavel', label: 'Nome e parentesco do responsável legal' }),
    ];
    const valores: Record<string, string | number | boolean | Date> = {};
    applyGuardianActorsToFields(fields, valores, {
      guardianName: 'Maria Silva',
      guardianRelation: 'mãe',
    });
    expect(valores['nome_responsavel']).toBe('Maria Silva (mãe)');
  });
});
