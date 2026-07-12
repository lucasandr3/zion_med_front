const FIELD_TYPE_LABELS: Record<string, string> = {
  text: 'Texto curto',
  textarea: 'Texto longo',
  number: 'Número',
  date: 'Data',
  select: 'Lista de opções',
  radio: 'Escolha única',
  checkbox: 'Caixa de seleção',
  file: 'Anexo',
  signature: 'Assinatura',
  heading: 'Título de seção',
  notice: 'Texto informativo',
  section_break: 'Quebra de etapa',
};

const FIELD_CHANGE_LABELS: Record<string, string> = {
  type: 'tipo',
  label: 'rótulo',
  required: 'obrigatoriedade',
  options_json: 'opções',
  visibility_rules: 'condições de exibição',
};

export function templateFieldTypeLabel(type: string): string {
  return FIELD_TYPE_LABELS[type] ?? type;
}

export function describeTemplateFieldChange(change: string): string {
  return FIELD_CHANGE_LABELS[change] ?? change;
}
