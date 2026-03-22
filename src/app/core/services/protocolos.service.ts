import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

export interface Protocolo {
  id: number;
  protocol_number: string;
  status: string;
  template_id: number;
  template_name?: string;
  person_id?: number | null;
  person?: { id: number; code: string; name: string } | null;
  submitter_name?: string;
  submitter_email?: string;
  submitted_at?: string;
  approved_at?: string;
  approved_by_name?: string;
  review_comment?: string;
  created_at: string;
  updated_at: string;
}

interface ListResponse {
  data: Protocolo[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface ProtocoloEvent {
  type?: string;
  type_label?: string;
  body?: string;
  user?: { name?: string };
  created_at?: string;
}

export interface ProtocoloAttachment {
  original_name?: string;
  size?: number;
}

export interface ProtocoloField {
  name_key: string;
  label: string;
  type: string;
}

export type ProtocoloDetalheData = Protocolo & {
  template?: { name?: string; fields?: ProtocoloField[] };
  form_data?: Record<string, unknown>;
  values_keyed?: Record<string, { value_text?: string; value_json?: unknown }>;
  events?: ProtocoloEvent[];
  signatures?: unknown[];
  attachments?: ProtocoloAttachment[];
};

interface OneResponse {
  data: ProtocoloDetalheData;
}

@Injectable({ providedIn: 'root' })
export class ProtocolosService {
  private api = inject(ApiService);

  list(params?: {
    template_id?: number;
    status?: string;
    data_inicio?: string;
    data_fim?: string;
    busca?: string;
    per_page?: number;
    page?: number;
  }): Observable<{ data: Protocolo[]; meta: ListResponse['meta'] }> {
    const p: Record<string, string | number | undefined> = { ...params };
    if (params?.page) p['page'] = params.page;
    return this.api.get<ListResponse>('/protocols', p).pipe(
      map((r) => ({
        data: r.data,
        meta: r.meta,
      }))
    );
  }

  get(id: number): Observable<OneResponse['data']> {
    return this.api.get<OneResponse>(`/protocols/${id}`).pipe(map((r) => r.data));
  }

  pdf(id: number): Observable<Blob> {
    return this.api.getBlob(`/protocols/${id}/pdf`);
  }

  aprovar(id: number, aprovado: boolean, comentario?: string): Observable<unknown> {
    return this.api.post(`/protocols/${id}/revisao`, { approved: aprovado, comment: comentario });
  }

  comentario(id: number, comentario: string): Observable<unknown> {
    return this.api.post(`/protocols/${id}/comentario`, { comment: comentario });
  }

  exportarCsv(params?: { template_id?: number; status?: string; data_inicio?: string; data_fim?: string }): Observable<Blob> {
    return this.api.getBlob('/protocols/exportar', params as Record<string, string>);
  }

  /** Exportar PDF em lote (até 50). Backend pode expor GET /protocols/exportar-pdf?limit=50 */
  exportarPdf(params?: { template_id?: number; status?: string; data_inicio?: string; data_fim?: string; limit?: number }): Observable<Blob> {
    const p = { ...params, limit: params?.limit ?? 50 } as Record<string, string | number>;
    return this.api.getBlob('/protocols/exportar-pdf', p);
  }
}
