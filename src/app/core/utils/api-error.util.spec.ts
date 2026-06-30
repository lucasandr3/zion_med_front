import { extractApiErrorCode, extractApiErrorMessage } from './api-error.util';

describe('api-error.util', () => {
  it('extrai message do envelope', () => {
    expect(
      extractApiErrorMessage({ code: 'billing_blocked', message: 'Trial expirado.' }),
    ).toBe('Trial expirado.');
  });

  it('extrai mensagem de details quando message ausente', () => {
    expect(
      extractApiErrorMessage({
        code: 'validation_failed',
        details: { email: ['O e-mail é obrigatório.'] },
      }),
    ).toBe('O e-mail é obrigatório.');
  });

  it('extrai code', () => {
    expect(extractApiErrorCode({ code: 'email_unverified' })).toBe('email_unverified');
  });
});
