import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

export interface DocumentSendItem {
  id: number;
  form_template_id: number;
  template_name: string | null;
  person_id?: number | null;
  recipient_name?: string | null;
  person?: { id: number; code: string; name: string } | null;
  recipient_email: string | null;
  recipient_phone: string | null;
  channel: string;
  sent_at: string | null;
  expires_at: string | null;
  form_submission_id: number | null;
  protocol_number: string | null;
  status: 'pendente' | 'assinado' | 'expirado' | 'cancelado';
  cancelled_at: string | null;
  reminded_at: string | null;
}

interface ListResponse {
  data: DocumentSendItem[];
  meta: { current_page: number; last_page: number; per_page: number; total: number };
  links: { first: string; last: string; prev: string | null; next: string | null };
}

@Injectable({ providedIn: 'root' })
export class DocumentSendsService {
  private api = inject(ApiService);

  list(params: { caixa?: string; template_id?: number; channel?: string; per_page?: number; page?: number }): Observable<ListResponse> {
    const p: Record<string, string | number> = {};
    if (params.caixa) p['caixa'] = params.caixa;
    if (params.template_id != null) p['template_id'] = params.template_id;
    if (params.channel) p['channel'] = params.channel;
    if (params.per_page != null) p['per_page'] = params.per_page;
    if (params.page != null) p['page'] = params.page;
    return this.api.get<ListResponse>('/document-sends', p);
  }

  cancel(id: number): Observable<{ data: { message: string } }> {
    return this.api.post<{ data: { message: string } }>(`/document-sends/${id}/cancel`, {});
  }

  reenvio(id: number): Observable<{ data: { message: string; id: number; sent_at: string } }> {
    return this.api.post<{ data: { message: string; id: number; sent_at: string } }>(`/document-sends/${id}/reenvio`, {});
  }

  store(payload: {
    template_id: number;
    channel: 'email' | 'whatsapp';
    person_id?: number | null;
    recipient_email?: string | null;
    recipient_phone?: string | null;
    expires_at?: string;
  }): Observable<{ data: { message: string; id: number; sent_at: string } }> {
    const body: Record<string, unknown> = {
      template_id: payload.template_id,
      channel: payload.channel,
      ...(payload.person_id != null ? { person_id: payload.person_id } : {}),
      ...(payload.channel === 'email' && payload.recipient_email != null && String(payload.recipient_email).trim() !== ''
        ? { recipient_email: payload.recipient_email }
        : {}),
      ...(payload.channel === 'whatsapp' && payload.recipient_phone != null && String(payload.recipient_phone).trim() !== ''
        ? { recipient_phone: payload.recipient_phone }
        : {}),
      ...(payload.expires_at ? { expires_at: payload.expires_at } : {}),
    };
    return this.api.post<{ data: { message: string; id: number; sent_at: string } }>('/document-sends', body);
  }
}
