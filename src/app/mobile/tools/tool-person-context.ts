import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export { whatsappShareUrl, openWhatsappShare, buildDocumentInviteMessage } from '../../core/utils/whatsapp-share.util';

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
