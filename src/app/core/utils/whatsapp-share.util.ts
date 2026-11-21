import { digitsOnlyPhone, phoneDigitsForApi } from '../../paginas/pessoas/pessoas-form.util';

/** Abre WhatsApp Web/App com texto; usa o telefone quando disponível. */
export function whatsappShareUrl(text: string, phone?: string | null): string {
  const digits = phone ? phoneDigitsForApi(digitsOnlyPhone(phone)) : null;
  const base = digits ? `https://wa.me/${digits}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(text)}`;
}

/**
 * Mensagem neutra para convite documental (MSG-03A).
 * Sem procedimento, diagnóstico ou dados clínicos.
 */
export function buildDocumentInviteMessage(opts: {
  organizationName?: string | null;
  templateName?: string | null;
  url: string;
}): string {
  const org = (opts.organizationName || '').trim() || 'a clínica';
  const doc = (opts.templateName || '').trim() || 'documento';
  return `Olá! Você tem um documento para preencher para ${org}: ${doc}. Acesse o link seguro: ${opts.url}`;
}

/** Abre a URL do WhatsApp em nova aba/janela. */
export function openWhatsappShare(text: string, phone?: string | null): void {
  const url = whatsappShareUrl(text, phone);
  window.open(url, '_blank', 'noopener,noreferrer');
}
