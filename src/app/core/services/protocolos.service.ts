import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

export interface Protocolo {
  id: number;
  protocol_number: string;
  status: string;
  template_id: number;
  template_name?: string;
  submitter_name?: string;
  submitter_email?: string;
  submitted_at?: string;
  approved_at?: string;
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

interface OneResponse {
  data: Protocolo & { template?: unknown; form_data?: unknown };
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

  get(id: number): Observable<Protocolo & { template?: unknown; form_data?: unknown }> {
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
}
