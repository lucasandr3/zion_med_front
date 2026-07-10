import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

export interface Protocolo {
  id: number;
  protocol_number: string;
  document_hash?: string | null;
  document_snapshot_hash?: string | null;
  template_version_id?: number | null;
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
  consent_valid_until?: string | null;
  consent_expired?: boolean;
  review_comment?: string;
  revoked_at?: string | null;
  revoke_reason?: string | null;
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
  id?: number;
  field_key?: string;
  original_name?: string;
  mime?: string;
  size?: number;
  url?: string;
}

export interface ProtocoloField {
  name_key: string;
  label: string;
  type: string;
  sort_order?: number;
  required?: boolean;
  options?: string[];
}

export interface ProtocoloSignature {
  id?: number;
  field_key?: string;
  url?: string;
  signed_name?: string;
  signed_ip?: string;
  signed_user_agent?: string;
  signed_hash?: string;
  document_hash?: string;
  evidence_hash?: string;
  channel?: string;
  status?: string;
  locale?: string;
  timezone?: string;
  accepted_text_at?: string;
  signed_at?: string;
}

export type ProtocoloDetalheData = Protocolo & {
  template?: { name?: string; fields?: ProtocoloField[]; document_kind?: string; category?: string };
  template_version?: {
    id?: number;
    version?: number;
    name?: string;
    description?: string;
    fields_snapshot?: Array<{
      id?: number;
      type?: string;
      label?: string;
      name_key?: string;
      required?: boolean;
      sort_order?: number;
      options_json?: unknown;
    }>;
  };
  document_snapshot?: {
    protocol_number?: string;
    template_version_id?: number;
    template_version?: number;
    template_name?: string;
    document_kind?: string;
    fields_snapshot?: ProtocoloField[];
    values?: Record<string, unknown>;
    submitted_at?: string;
  } | null;
  /** Valores agregados (chave do campo → valor exibido). Inclui respostas do paciente e do registro da equipe. */
  values?: Record<string, unknown>;
  form_data?: Record<string, unknown>;
  values_keyed?: Record<string, { value_text?: string; value_json?: unknown }>;
  /** Definição dos campos preenchidos só pela equipe (modelos Estética). */
  staff_fields?: ProtocoloField[];
  events?: ProtocoloEvent[];
  signatures?: ProtocoloSignature[];
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

  /** ZIP com PDF do protocolo + JSON de evidências (dossiê). */
  dossie(id: number): Observable<Blob> {
    return this.api.getBlob(`/protocols/${id}/dossie`);
  }

  aprovar(
    id: number,
    aprovado: boolean,
    comentario?: string,
    professionalExplained?: boolean,
  ): Observable<unknown> {
    const status = aprovado ? 'approved' : 'rejected';
    const body: { status: string; review_comment?: string; professional_explained?: boolean } = { status };
    if (comentario?.trim()) body.review_comment = comentario.trim();
    if (professionalExplained) body.professional_explained = true;
    return this.api.post(`/protocols/${id}/revisao`, body);
  }

  /** Revoga consentimento/protocolo (ciclo de vida clínico). */
  revogar(id: number, reason: string): Observable<ProtocoloDetalheData> {
    return this.api
      .post<OneResponse>(`/protocols/${id}/revogar`, { reason: reason.trim() })
      .pipe(map((r) => r.data));
  }

  comentario(id: number, comentario: string): Observable<unknown> {
    return this.api.post(`/protocols/${id}/comentario`, { body: comentario });
  }

  /** Salva campos internos da equipe (definidos no backend para modelos Estética). */
  saveStaffValues(id: number, values: Record<string, unknown>): Observable<ProtocoloDetalheData> {
    return this.api
      .patch<OneResponse>(`/protocols/${id}/staff-values`, { values })
      .pipe(map((r) => r.data));
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
