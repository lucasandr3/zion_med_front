import { humanizePublicFormSubmitError, publicFieldRequiredHint } from './formulario-publico-errors.util';

describe('formulario-publico-errors.util', () => {
  it('humaniza chave interna de compreensão', () => {
    const msg = humanizePublicFormSubmitError({
      error: { errors: { _comprehension_ack: ['The _comprehension_ack must be accepted.'] } },
    });
    expect(msg).toContain('Marque a caixa confirmando');
  });

  it('usa rótulo do campo obrigatório', () => {
    const msg = humanizePublicFormSubmitError(
      { error: { errors: { nome_completo: ['The nome_completo field is required.'] } } },
      [
        {
          id: 1,
          name_key: 'nome_completo',
          label: 'Nome completo',
          type: 'text',
          required: true,
          options: [],
          sort_order: 0,
        },
      ],
    );
    expect(msg).toContain('Nome completo');
  });

  it('monta dica sob o campo', () => {
    expect(publicFieldRequiredHint('Telefone')).toBe('Preencha «Telefone» para continuar.');
  });
});
