import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

export interface Template {
  id: number;
  name: string;
  description?: string;
  category?: string;
  is_active?: boolean;
  public_enabled?: boolean;
  /** URL do formulário público quando o link está ativo (API pode retornar no GET template) */
  public_url?: string;
  created_at: string;
  updated_at: string;
}

export interface TemplateCampo {
  id: number;
  name_key: string;
  label: string;
  type: string;
  sort_order: number;
  required?: boolean;
  options?: string[] | unknown;
}

interface ListResponse {
  data: Template[];
}

interface OneResponse {
  data: Template & { fields?: TemplateCampo[] };
}

interface CamposResponse {
  data: unknown[];
}

@Injectable({ providedIn: 'root' })
export class TemplatesService {
  private api = inject(ApiService);

  list(params?: { is_active?: boolean; category?: string }): Observable<Template[]> {
    return this.api.get<ListResponse>('/templates', params).pipe(map((r) => r.data));
  }

  get(id: number): Observable<Template & { fields?: TemplateCampo[] }> {
    return this.api.get<OneResponse>(`/templates/${id}`).pipe(map((r) => r.data));
  }

  create(payload: { name: string; description?: string; category?: string; is_active?: boolean; public_enabled?: boolean; fields?: unknown[] }): Observable<Template> {
    return this.api.post<OneResponse>('/templates', payload).pipe(map((r) => r.data));
  }

  /** Cria um template a partir de outro (cópia do modelo). */
  createFromTemplate(templateId: number): Observable<Template & { fields?: TemplateCampo[] }> {
    return this.api
      .post<OneResponse & { data: Template & { fields?: TemplateCampo[] } }>(`/templates/a-partir-de/${templateId}`, {})
      .pipe(map((r) => r.data));
  }

  update(id: number, payload: Partial<Template>): Observable<Template> {
    return this.api.put<OneResponse>(`/templates/${id}`, payload).pipe(map((r) => r.data));
  }

  delete(id: number): Observable<void> {
    return this.api.delete<unknown>(`/templates/${id}`).pipe(map(() => undefined));
  }

  getCampos(templateId: number): Observable<TemplateCampo[]> {
    return this.api.get<CamposResponse>(`/templates/${templateId}/campos`).pipe(map((r) => (r.data as TemplateCampo[]) ?? []));
  }

  storeCampo(templateId: number, payload: { type: string; label: string; name_key?: string; required?: boolean; sort_order?: number; options?: string[] }): Observable<unknown> {
    return this.api.post(`/templates/${templateId}/campos`, payload);
  }

  updateCampo(templateId: number, campoId: number, payload: Partial<TemplateCampo>): Observable<unknown> {
    return this.api.put(`/templates/${templateId}/campos/${campoId}`, payload);
  }

  destroyCampo(templateId: number, campoId: number): Observable<void> {
    return this.api.delete(`/templates/${templateId}/campos/${campoId}`).pipe(map(() => undefined));
  }

  gerarLink(templateId: number): Observable<{ data?: { public_url?: string; token?: string } }> {
    return this.api.post(`/templates/${templateId}/link-publico`, {});
  }

  desativarLink(templateId: number): Observable<void> {
    return this.api.delete(`/templates/${templateId}/link-publico`).pipe(map(() => undefined));
  }

  /** Envia link do documento por e-mail ou WhatsApp (body: channel?, recipient_email ou recipient_phone, expires_at?). */
  enviarDocumento(
    templateId: number,
    payload: { channel?: 'email' | 'whatsapp'; recipient_email?: string; recipient_phone?: string; expires_at?: string }
  ): Observable<{ data: { message: string; id: number; sent_at: string } }> {
    return this.api.post<{ data: { message: string; id: number; sent_at: string } }>(`/templates/${templateId}/enviar`, payload);
  }
}
