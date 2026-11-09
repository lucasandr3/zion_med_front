import { FormularioPublicoField } from '../../core/services/formulario-publico.service';
import {
  applyPersonPrefillToFields,
  applySubmitterIdentityToFields,
  filterIdentityCoveredFields,
  isMaskedPiiValue,
  isPatientEmailIdentityField,
  isPatientNameIdentityField,
  resolveIdentityCoverage,
  resolveSubmitterFromPrefill,
  shouldHideIdentityCoveredField,
} from './formulario-publico-person-prefill.util';

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

describe('formulario-publico-person-prefill.util identity dedupe', () => {
  it('detecta PII mascarada', () => {
    expect(isMaskedPiiValue('j***@clinica.com')).toBeTrue();
    expect(isMaskedPiiValue('***@***')).toBeTrue();
    expect(isMaskedPiiValue('***.***.***-12')).toBeTrue();
    expect(isMaskedPiiValue('ana@clinica.com')).toBeFalse();
  });

  it('reconhece campos de nome/e-mail do paciente e ignora parentes', () => {
    expect(isPatientNameIdentityField(field({ name_key: 'nome_completo', label: 'Nome completo' }))).toBeTrue();
    expect(isPatientNameIdentityField(field({ name_key: 'nome_mae', label: 'Nome da mãe' }))).toBeFalse();
    expect(isPatientEmailIdentityField(field({ name_key: 'email', label: 'E-mail' }))).toBeTrue();
    expect(isPatientEmailIdentityField(field({ name_key: 'email_responsavel', label: 'E-mail do responsável' }))).toBeFalse();
  });

  it('propaga identidade do submitter para campos vazios', () => {
    const fields = [
      field({ name_key: 'nome_completo', label: 'Nome completo' }),
      field({ name_key: 'email', label: 'E-mail' }),
      field({ name_key: 'nome_mae', label: 'Nome da mãe' }),
    ];
    const valores: Record<string, string | number | boolean | Date> = {};
    applySubmitterIdentityToFields(fields, valores, {
      name: 'Ana Silva',
      email: 'ana@clinica.com',
    });
    expect(valores['nome_completo']).toBe('Ana Silva');
    expect(valores['email']).toBe('ana@clinica.com');
    expect(valores['nome_mae']).toBeUndefined();
  });

  it('não usa e-mail mascarado no submitter nem no prefill', () => {
    const submitter = resolveSubmitterFromPrefill({ name: 'Ana', email: 'a***@x.com' }, 'Ana');
    expect(submitter.email).toBe('');

    const fields = [field({ name_key: 'email', label: 'E-mail' })];
    const valores: Record<string, string | number | boolean | Date> = {};
    applyPersonPrefillToFields(fields, valores, { email: 'a***@x.com' });
    expect(valores['email']).toBeUndefined();
  });

  it('esconde campos cobertos quando já preenchidos', () => {
    const fields = [
      field({ name_key: 'nome_completo', label: 'Nome completo' }),
      field({ name_key: 'email', label: 'E-mail' }),
      field({ name_key: 'queixa', label: 'Queixa' }),
    ];
    const valores = {
      nome_completo: 'Ana Silva',
      email: 'ana@clinica.com',
      queixa: 'Dor',
    };
    const covered = resolveIdentityCoverage({ name: 'Ana Silva', email: 'ana@clinica.com' });
    expect(shouldHideIdentityCoveredField(fields[0]!, covered, valores)).toBeTrue();
    expect(shouldHideIdentityCoveredField(fields[1]!, covered, valores)).toBeTrue();
    expect(shouldHideIdentityCoveredField(fields[2]!, covered, valores)).toBeFalse();

    const filtered = filterIdentityCoveredFields(fields, covered, valores);
    expect(filtered.map((f) => f.name_key)).toEqual(['queixa']);
  });
});
