import { suggestFromKnownFields, type KnownTemplateField } from './detect-print-layout.util';

describe('detect-print-layout.util field match (PDF-01C)', () => {
  it('propõe caixa quando o rótulo do campo aparece no texto do PDF', async () => {
    const pdfDoc = {
      numPages: 1,
      getPage: async () => ({
        getViewport: () => ({ width: 600, height: 800 }),
        getTextContent: async () => ({
          items: [
            { str: 'Nome completo:', transform: [1, 0, 0, 12, 40, 700], width: 90, height: 12 },
            { str: 'Outro texto', transform: [1, 0, 0, 12, 40, 650], width: 60, height: 12 },
          ],
        }),
        getAnnotations: async () => [],
      }),
    };

    const fields: KnownTemplateField[] = [
      { name_key: 'nome_completo', label: 'Nome completo', type: 'text' },
      { name_key: 'queixa', label: 'Queixa principal', type: 'textarea' },
    ];

    const suggestions = await suggestFromKnownFields(pdfDoc, fields);
    expect(suggestions.length).toBe(1);
    expect(suggestions[0]!.name_key).toBe('nome_completo');
    expect(suggestions[0]!.source).toBe('pdf_field_match');
    expect(suggestions[0]!.needs_review).toBeTrue();
  });
});
