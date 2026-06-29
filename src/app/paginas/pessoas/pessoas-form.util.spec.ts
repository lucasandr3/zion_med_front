import { buildPessoaApiPayload, phoneDigitsForApi } from './pessoas-form.util';

describe('pessoas-form.util', () => {
  it('phoneDigitsForApi prefixes 55 for local numbers', () => {
    expect(phoneDigitsForApi('11987654321')).toBe('5511987654321');
    expect(phoneDigitsForApi('5511987654321')).toBe('5511987654321');
    expect(phoneDigitsForApi('')).toBeNull();
  });

  it('buildPessoaApiPayload trims and maps fields', () => {
    const payload = buildPessoaApiPayload(
      {
        name: '  Maria  ',
        email: 'maria@test.com',
        phoneDigits: '11987654321',
        phoneAltDigits: '',
        cpfDigits: '52998224725',
        profession: '',
        rg: '',
        age: 30,
        sex: 'F',
        marital_status: 'solteiro',
        referred_by: '',
        address: '',
        neighborhood: '',
        city: '',
        cep: '',
        lead_source_instagram: true,
        lead_source_google: false,
        lead_source_facebook: false,
        lead_source_indicacao_amigo: false,
        lead_source_indicacao_medica: false,
        lead_source_plano_saude: false,
        lead_source_outro: '',
        has_health_plan: 'nao',
        health_plan_operator: '',
        health_plan_card_number: '',
        lgpd_accept_comms: true,
        lgpd_accept_reminders: false,
        notes: '',
        status: 'active',
      },
      '1990-05-15',
    );

    expect(payload['name']).toBe('Maria');
    expect(payload['phone']).toBe('5511987654321');
    expect(payload['cpf']).toBe('52998224725');
    expect(payload['birth_date']).toBe('1990-05-15');
    expect(payload['lead_source_instagram']).toBe(true);
  });
});
