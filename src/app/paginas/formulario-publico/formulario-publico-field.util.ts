import { FormularioPublicoField } from '../../core/services/formulario-publico.service';

export function fieldType(f: FormularioPublicoField): string {
  const t = (f.type ?? '').toLowerCase();
  if (t === 'anexo' || t === 'attachment') return 'file';
  return t;
}

/** Par de valor + rótulo para select/radio. */
export function getFieldOptions(f: FormularioPublicoField): { value: string; label: string }[] {
  let raw: unknown = f.options;
  if (!raw) return [];

  if (raw && typeof raw === 'object' && !Array.isArray(raw) && 'options' in raw) {
    raw = (raw as Record<string, unknown>)['options'];
  }

  if (typeof raw === 'string') {
    const str = raw.trim();
    if (str.startsWith('[') || str.startsWith('{')) {
      try {
        raw = JSON.parse(raw) as unknown;
      } catch {
        /* ignora */
      }
    }
    if (typeof raw === 'string') {
      raw = str.split(/\n|,/).map((s: string) => s.trim()).filter(Boolean);
    }
  }

  if (Array.isArray(raw)) {
    return raw.map((o: unknown) => {
      if (typeof o === 'string') return { value: o, label: o };
      if (o && typeof o === 'object') {
        const obj = o as Record<string, unknown>;
        const label = String(obj['label'] ?? obj['name'] ?? obj['value'] ?? obj['text'] ?? '');
        const value = String(obj['value'] ?? obj['id'] ?? obj['label'] ?? obj['name'] ?? label);
        return { value, label: label || value };
      }
      return { value: String(o), label: String(o) };
    });
  }

  return [];
}

export function fieldPlaceholder(f: FormularioPublicoField): string {
  const t = fieldType(f);
  const label = (f.label ?? '').trim();
  const l = label.toLowerCase();

  if (t === 'number') return 'Ex.: 0';
  if (t === 'textarea') return label ? `Escreva aqui sobre "${label.toLowerCase()}"...` : 'Escreva aqui...';

  if (l.includes('e-mail') || l.includes('email')) return 'email@exemplo.com';
  if (l.includes('cpf')) return '000.000.000-00';
  if (l.includes('cnpj')) return '00.000.000/0000-00';
  if (l.includes('telefone') || l.includes('celular') || l.includes('whatsapp') || l.includes('fone')) {
    return '(00) 00000-0000';
  }
  if (l.includes('cep')) return '00000-000';
  if (l.includes('nome')) return 'Digite seu nome completo';
  if (l.includes('idade')) return 'Ex.: 30';
  if (l.includes('peso')) return 'Ex.: 70';
  if (l.includes('altura')) return 'Ex.: 1.70';
  if (l.includes('endere')) return 'Rua, número, complemento';
  if (l.includes('cidade')) return 'Sua cidade';
  if (l.includes('estado')) return 'UF';
  if (l.includes('profiss')) return 'Sua profissão';
  if (l.includes('observa') || l.includes('coment')) return 'Escreva aqui...';

  return label ? `Informe ${label.toLowerCase()}` : 'Digite aqui';
}

export function isFieldFilled(
  f: FormularioPublicoField,
  valores: Record<string, string | number | boolean | Date>,
): boolean {
  const v = valores[f.name_key];
  const t = fieldType(f);
  switch (t) {
    case 'checkbox':
      return v === true;
    case 'number':
      if (v === '' || v === null || v === undefined) return false;
      return !Number.isNaN(Number(v));
    case 'date':
      return v instanceof Date || (typeof v === 'string' && v.trim().length > 0);
    case 'signature':
      return typeof v === 'string' && v.length > 80;
    case 'file':
      return typeof v === 'string' && v.startsWith('data:') && v.length > 64;
    case 'select':
    case 'radio':
      return typeof v === 'string' && v.trim().length > 0;
    default:
      return String(v ?? '').trim().length > 0;
  }
}
