import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface FormImportField {
  type: string;
  label: string;
  name_key: string;
  required?: boolean;
  options?: string[];
  visibility_rules?: unknown;
  sort_order?: number;
  page?: number;
  source_text?: string | null;
}

export interface FormImportWarning {
  code?: string;
  level?: string;
  message: string;
}

export type FormImportSourceKind = 'image' | 'pdf' | 'text' | 'file';

export interface FormImportItem {
  id: number;
  status: string;
  provider?: string | null;
  model_version?: string | null;
  source_original_name?: string | null;
  source_mime?: string | null;
  source_size?: number | null;
  source_kind?: FormImportSourceKind | null;
  has_source?: boolean;
  extracted_schema?: { fields?: FormImportField[] } | null;
  reviewed_schema?: { fields?: FormImportField[] } | null;
  warnings?: FormImportWarning[] | null;
  error_code?: string | null;
  error_message?: string | null;
  template_id?: number | null;
  processed_at?: string | null;
  committed_at?: string | null;
  created_at?: string | null;
  retention_days?: number | null;
  source_purge_after?: string | null;
}

@Injectable({ providedIn: 'root' })
export class FormImportService {
  private api = inject(ApiService);

  create(file: File, idempotencyKey?: string, consentBlankAck = true): Observable<FormImportItem> {
    const fd = new FormData();
    fd.append('file', file);
    if (idempotencyKey) {
      fd.append('idempotency_key', idempotencyKey);
    }
    if (consentBlankAck) {
      fd.append('consent_blank_ack', '1');
    }
    return this.api.postFormData<{ data: FormImportItem }>('/form-imports', fd).pipe(map((r) => r.data));
  }

  get(id: number): Observable<FormImportItem> {
    return this.api.get<{ data: FormImportItem }>(`/form-imports/${id}`).pipe(map((r) => r.data));
  }

  getSourceBlob(id: number): Observable<Blob> {
    return this.api.getBlob(`/form-imports/${id}/source`);
  }

  saveDraft(id: number, fields: FormImportField[]): Observable<FormImportItem> {
    return this.api
      .patch<{ data: FormImportItem }>(`/form-imports/${id}/draft`, { fields })
      .pipe(map((r) => r.data));
  }

  commit(id: number, payload: { name?: string; fields?: FormImportField[] }): Observable<{
    form_import: FormImportItem;
    template: { id: number; name: string };
  }> {
    return this.api
      .post<{ data: { form_import: FormImportItem; template: { id: number; name: string } } }>(
        `/form-imports/${id}/commit`,
        payload,
      )
      .pipe(map((r) => r.data));
  }
}
