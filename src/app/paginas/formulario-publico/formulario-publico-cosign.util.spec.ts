import { FormularioPublicoField } from '../../core/services/formulario-publico.service';
import {
  ASSISTED_COSIGN_FIELD_KEY,
  hasProfessionalCosignFilled,
  pickProfessionalSignatureField,
  resolveProfessionalCosignFieldKey,
  shouldShowAssistedCosignBlock,
} from './formulario-publico-cosign.util';

describe('formulario-publico-cosign.util', () => {
  const field = (
    overrides: Partial<FormularioPublicoField> & Pick<FormularioPublicoField, 'name_key' | 'label'>,
  ): FormularioPublicoField => ({
    id: 1,
    type: 'signature',
    required: false,
    options: [],
    sort_order: 0,
    ...overrides,
  });

  const fields = [
    field({
      id: 1,
      name_key: 'assinatura_paciente',
      label: 'Assinatura do paciente',
      required: true,
      sort_order: 0,
    }),
    field({
      id: 2,
      name_key: 'assinatura_responsavel',
      label: 'Responsável / cirurgião',
      required: false,
      sort_order: 1,
    }),
  ];

  it('identifica slot profissional pelo rótulo', () => {
    expect(pickProfessionalSignatureField(fields)?.name_key).toBe('assinatura_responsavel');
    expect(resolveProfessionalCosignFieldKey(fields)).toBe('assinatura_responsavel');
  });

  it('usa chave virtual quando não há slot profissional', () => {
    const patientOnly = [field({ name_key: 'assinatura', label: 'Assinatura do paciente', required: true })];
    expect(resolveProfessionalCosignFieldKey(patientOnly)).toBe(ASSISTED_COSIGN_FIELD_KEY);
    expect(shouldShowAssistedCosignBlock(patientOnly, true)).toBe(true);
  });

  it('valida assinatura profissional preenchida no modo assistido', () => {
    const dataUrl = `data:image/png;base64,${'x'.repeat(90)}`;
    expect(hasProfessionalCosignFilled(fields, { assinatura_responsavel: dataUrl }, true)).toBe(true);
    expect(hasProfessionalCosignFilled(fields, {}, true)).toBe(false);
  });
});
