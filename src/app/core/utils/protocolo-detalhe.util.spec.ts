import {
  normalizeProtocoloDetalhe,
  protocoloEventoLabel,
  resolveValuesMap,
  synthesizeSignaturesFromValues,
} from './protocolo-detalhe.util';
import type { ProtocoloDetalheData } from '../services/protocolos.service';

describe('protocolo-detalhe.util', () => {
  it('traduz patient_copy_token_issued', () => {
    expect(protocoloEventoLabel({ type: 'patient_copy_token_issued' })).toBe(
      'Token de cópia do paciente emitido',
    );
    expect(
      protocoloEventoLabel({
        type: 'patient_copy_token_issued',
        type_label: 'patient_copy_token_issued',
      }),
    ).toBe('Token de cópia do paciente emitido');
  });

  it('lê values como array (Java) e values_keyed', () => {
    const p = {
      id: 1,
      protocol_number: 'P1',
      status: 'pending',
      template_id: 1,
      created_at: '',
      updated_at: '',
      values: [
        { key: 'nome', value_text: 'Ana' },
        { key: 'idade', value_json: 30 },
      ],
      values_keyed: { cidade: 'SP' },
    } as ProtocoloDetalheData;
    expect(resolveValuesMap(p)).toEqual({
      cidade: 'SP',
      nome: 'Ana',
      idade: 30,
    });
  });

  it('sintetiza assinaturas a partir de data URL nos values', () => {
    const dataUrl = 'data:image/png;base64,aaa';
    const p = normalizeProtocoloDetalhe({
      id: 1,
      protocol_number: 'P1',
      status: 'pending',
      template_id: 1,
      created_at: '',
      updated_at: '',
      signatures: [],
      values_keyed: {
        assinatura: dataUrl,
        nome: 'Ana',
      },
      template: {
        fields: [
          { name_key: 'assinatura', label: 'Assinatura', type: 'signature' },
          { name_key: 'nome', label: 'Nome', type: 'text' },
        ],
      },
    } as ProtocoloDetalheData);

    expect(synthesizeSignaturesFromValues(p).length).toBe(1);
    expect(p.signatures?.[0]?.url).toBe(dataUrl);
    expect(p.signatures?.[0]?.field_key).toBe('assinatura');
  });
});
