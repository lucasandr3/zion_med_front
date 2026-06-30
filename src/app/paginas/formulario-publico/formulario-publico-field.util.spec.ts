import { fieldType, getFieldOptions, isFieldFilled } from './formulario-publico-field.util';
import { FormularioPublicoField } from '../../core/services/formulario-publico.service';

describe('formulario-publico-field.util', () => {
  const baseField = (overrides: Partial<FormularioPublicoField>): FormularioPublicoField => ({
    name_key: 'campo',
    label: 'Campo',
    type: 'text',
    required: false,
    sort_order: 0,
    options: null,
    ...overrides,
  });

  it('normaliza tipo anexo para file', () => {
    expect(fieldType(baseField({ type: 'anexo' }))).toBe('file');
  });

  it('parseia opções em string separada por vírgula', () => {
    const opts = getFieldOptions(baseField({ type: 'select', options: 'Sim,Não' }));
    expect(opts).toEqual([
      { value: 'Sim', label: 'Sim' },
      { value: 'Não', label: 'Não' },
    ]);
  });

  it('detecta checkbox preenchido', () => {
    const f = baseField({ type: 'checkbox', name_key: 'aceite' });
    expect(isFieldFilled(f, { aceite: true })).toBeTrue();
    expect(isFieldFilled(f, { aceite: false })).toBeFalse();
  });
});
