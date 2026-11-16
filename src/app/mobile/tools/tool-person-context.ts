import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { digitsOnlyPhone, phoneDigitsForApi } from '../../paginas/pessoas/pessoas-form.util';

export interface ToolPersonContext {
  personId: number | null;
  nome: string;
  phone: string;
}

/** Lê contexto de pessoa vindo de deep-link (`?person_id&nome&phone`). */
export function injectToolPersonContext(): ToolPersonContext {
  const qp = inject(ActivatedRoute).snapshot.queryParamMap;
  const personIdRaw = Number(qp.get('person_id') || '');
  return {
    personId: Number.isFinite(personIdRaw) && personIdRaw > 0 ? personIdRaw : null,
    nome: (qp.get('nome') || '').trim(),
    phone: (qp.get('phone') || '').trim(),
  };
}

/** Query params para abrir um utilitário já contextualizado na pessoa. */
export function toolPersonQueryParams(pessoa: {
  id: number;
  name: string;
  phone?: string | null;
}): Record<string, string> {
  const params: Record<string, string> = {
    person_id: String(pessoa.id),
    nome: pessoa.name || '',
  };
  if (pessoa.phone) params['phone'] = pessoa.phone;
  return params;
}

/** Abre WhatsApp com texto; usa o telefone quando disponível. */
export function whatsappShareUrl(text: string, phone?: string | null): string {
  const digits = phone ? phoneDigitsForApi(digitsOnlyPhone(phone)) : null;
  const base = digits ? `https://wa.me/${digits}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(text)}`;
}
