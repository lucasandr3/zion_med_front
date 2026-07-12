import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { FieldVisibilityRules } from '../utils/field-visibility.util';

export type TemplateReviewStatus = 'draft' | 'pending' | 'approved';

export interface TemplateLibraryItem {
  library_key: string;
  name: string;
  description?: string;
  category?: string;
  category_label?: string;
  specialty?: string;
  specialty_label?: string;
  document_kind?: string;
  field_count?: number;
  legal_review_status?: TemplateReviewStatus;
  clinical_review_status?: TemplateReviewStatus;
  content_version?: number;
  reviewed_at?: string | null;
  installed_template_id?: number | null;
  fields?: TemplateCampo[];
}

export interface TemplateLibraryMeta {
  total: number;
  niche: string;
  approved_count: number;
  content_version: number;
}

export interface TemplateLibraryResponse {
  meta: TemplateLibraryMeta;
  specialties: Array<{
    key: string;
    label: string;
    templates: TemplateLibraryItem[];
  }>;
}

export interface Template {
  id: number;
  name: string;
  description?: string;
  category?: string;
  /** Tipo documental: ficha | consentimento | ciencia_lgpd */
  document_kind?: 'ficha' | 'consentimento' | 'ciencia_lgpd' | string;
  library_key?: string | null;
  library_content_version?: number | null;
  legal_review_status?: TemplateReviewStatus | null;
  clinical_review_status?: TemplateReviewStatus | null;
  library_reviewed_at?: string | null;
  /** Validade do consentimento em dias (só para document_kind=consentimento). */
  consent_validity_days?: number | null;
  /** Quiz de compreensão (gabarito só na API autenticada). */
  comprehension_quiz?: TemplateComprehensionQuestion[] | null;
  /** Regras para exibir/obrigar bloco responsável legal no formulário público. */
  actors_visibility_rules?: FieldVisibilityRules | null;
  /** Ativa wizard por etapas clínicas no formulário público. */
  uses_clinical_steps?: boolean;
  is_active?: boolean;
  public_enabled?: boolean;
  /** Exige código + data de nascimento no link público (acompanhamento). */
  public_require_person_link?: boolean;
  /** Quando `public_require_person_link`: `code` (código + nascimento) ou `cpf`. */
  public_person_link_mode?: 'code' | 'cpf' | string;
  /** URL do formulário público quando o link está ativo (API pode retornar no GET template) */
  public_url?: string;
  created_at: string;
  updated_at: string;
}

export interface TemplateComprehensionQuestion {
  id?: string;
  prompt: string;
  options: string[];
  correct_index: number;
}

export interface TemplateVersionSummary {
  id: number;
  version: number;
  name?: string;
  created_at?: string | null;
}

export interface TemplateVersionFieldSummary {
  name_key: string;
  label: string;
  type: string;
}

export interface TemplateVersionFieldChange {
  name_key: string;
  label: string;
  type: string;
  changes: string[];
}

export interface TemplateVersionReorderDiff {
  from: TemplateVersionFieldSummary[];
  to: TemplateVersionFieldSummary[];
}

export interface TemplateVersionCompareResult {
  from: TemplateVersionSummary | null;
  to: TemplateVersionSummary | null;
  meta: {
    name_changed: boolean;
    description_changed: boolean;
  };
  fields: {
    added: TemplateVersionFieldSummary[];
    removed: TemplateVersionFieldSummary[];
    changed: TemplateVersionFieldChange[];
    reordered: TemplateVersionReorderDiff | [];
  };
  has_changes: boolean;
}

export interface TemplateCategory {
  key: string;
  name: string;
}

export interface ClinicalValidationIssue {
  level: 'warning' | 'error';
  code: string;
  message: string;
}

export interface TemplateCampo {
  id: number;
  name_key: string;
  label: string;
  type: string;
  sort_order: number;
  required?: boolean;
  options?: string[] | unknown;
  visibility_rules?: FieldVisibilityRules | null;
  clinical_step_kind?: string | null;
}

interface ListResponse {
  data: Template[];
}

interface CategoriesResponse {
  data: TemplateCategory[];
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

  biblioteca(params?: { category?: string; niche?: string }): Observable<TemplateLibraryResponse> {
    return this.api.get<{ data: TemplateLibraryResponse }>('/templates/biblioteca', params).pipe(map((r) => r.data));
  }

  getBibliotecaItem(libraryKey: string): Observable<TemplateLibraryItem> {
    return this.api
      .get<{ data: TemplateLibraryItem }>(`/templates/biblioteca/${encodeURIComponent(libraryKey)}`)
      .pipe(map((r) => r.data));
  }

  installFromLibrary(libraryKey: string): Observable<Template & { fields?: TemplateCampo[] }> {
    return this.api
      .post<OneResponse & { data: Template & { fields?: TemplateCampo[] } }>(
        `/templates/biblioteca/${encodeURIComponent(libraryKey)}/instalar`,
        {},
      )
      .pipe(map((r) => r.data));
  }

  get(id: number): Observable<Template & { fields?: TemplateCampo[] }> {
    return this.api.get<OneResponse>(`/templates/${id}`).pipe(map((r) => r.data));
  }

  create(payload: {
    name: string;
    description?: string;
    category?: string;
    new_category?: string;
    is_active?: boolean;
    public_enabled?: boolean;
    public_require_person_link?: boolean;
    fields?: unknown[];
  }): Observable<Template> {
    return this.api.post<OneResponse>('/templates', payload).pipe(map((r) => r.data));
  }

  categories(): Observable<TemplateCategory[]> {
    return this.api.get<CategoriesResponse>('/templates/categories').pipe(map((r) => r.data ?? []));
  }

  /** Cria um template a partir de outro (cópia do modelo). */
  createFromTemplate(templateId: number): Observable<Template & { fields?: TemplateCampo[] }> {
    return this.api
      .post<OneResponse & { data: Template & { fields?: TemplateCampo[] } }>(`/templates/a-partir-de/${templateId}`, {})
      .pipe(map((r) => r.data));
  }

  update(
    id: number,
    payload: Partial<Template & { public_require_person_link?: boolean; public_person_link_mode?: string; document_kind?: string; consent_validity_days?: number | null; comprehension_quiz?: TemplateComprehensionQuestion[] | null; actors_visibility_rules?: FieldVisibilityRules | null; new_category?: string }>
  ): Observable<Template> {
    return this.api.put<OneResponse>(`/templates/${id}`, payload).pipe(map((r) => r.data));
  }

  delete(id: number): Observable<void> {
    return this.api.delete<unknown>(`/templates/${id}`).pipe(map(() => undefined));
  }

  getCampos(templateId: number): Observable<TemplateCampo[]> {
    return this.api.get<CamposResponse>(`/templates/${templateId}/campos`).pipe(map((r) => (r.data as TemplateCampo[]) ?? []));
  }

  storeCampo(
    templateId: number,
    payload: {
      type: string;
      label: string;
      name_key?: string;
      required?: boolean;
      sort_order?: number;
      options?: string[];
      visibility_rules?: FieldVisibilityRules | null;
      clinical_step_kind?: string | null;
    },
  ): Observable<unknown> {
    return this.api.post(`/templates/${templateId}/campos`, payload);
  }

  updateCampo(templateId: number, campoId: number, payload: Partial<TemplateCampo>): Observable<unknown> {
    return this.api.put(`/templates/${templateId}/campos/${campoId}`, payload);
  }

  destroyCampo(templateId: number, campoId: number): Observable<void> {
    return this.api.delete(`/templates/${templateId}/campos/${campoId}`).pipe(map(() => undefined));
  }

  reorderCampos(templateId: number, ids: number[]): Observable<void> {
    return this.api.post(`/templates/${templateId}/campos/reorder`, { ids }).pipe(map(() => undefined));
  }

  /** Duplica um modelo do tenant (cópia local). */
  duplicar(templateId: number, name?: string): Observable<Template & { fields?: TemplateCampo[] }> {
    return this.api
      .post<OneResponse>(`/templates/${templateId}/duplicar`, name ? { name } : {})
      .pipe(map((r) => r.data));
  }

  gerarLink(templateId: number): Observable<{ data?: { public_url?: string; token?: string } }> {
    return this.api.post(`/templates/${templateId}/link-publico`, {});
  }

  listVersoes(templateId: number): Observable<TemplateVersionSummary[]> {
    return this.api
      .get<{ data: TemplateVersionSummary[] }>(`/templates/${templateId}/versoes`)
      .pipe(map((r) => r.data ?? []));
  }

  compararVersoes(templateId: number, fromId?: number, toId?: number): Observable<TemplateVersionCompareResult> {
    const params = new URLSearchParams();
    if (fromId) params.set('from', String(fromId));
    if (toId) params.set('to', String(toId));
    const query = params.toString();

    return this.api
      .get<{ data: TemplateVersionCompareResult }>(
        `/templates/${templateId}/versoes/comparar${query ? `?${query}` : ''}`,
      )
      .pipe(map((r) => r.data));
  }

  desativarLink(templateId: number): Observable<void> {
    return this.api.delete(`/templates/${templateId}/link-publico`).pipe(map(() => undefined));
  }

  validarEtapasClinicas(templateId: number): Observable<{ issues: ClinicalValidationIssue[]; has_blocking: boolean }> {
    return this.api
      .get<{ data: { issues: ClinicalValidationIssue[]; has_blocking: boolean } }>(
        `/templates/${templateId}/etapas-clinicas/validar`,
      )
      .pipe(map((r) => r.data));
  }

  aplicarEstruturaTcle(templateId: number): Observable<Template & { fields?: TemplateCampo[] }> {
    return this.api
      .post<OneResponse>(`/templates/${templateId}/etapas-clinicas/aplicar-tcle`, {})
      .pipe(map((r) => r.data));
  }

  /** Envia link do documento por e-mail ou WhatsApp (body: channel?, recipient_email ou recipient_phone, expires_at?). */
  enviarDocumento(
    templateId: number,
    payload: { channel?: 'email' | 'whatsapp'; recipient_email?: string; recipient_phone?: string; expires_at?: string }
  ): Observable<{ data: { message: string; id: number; sent_at: string } }> {
    return this.api.post<{ data: { message: string; id: number; sent_at: string } }>(`/templates/${templateId}/enviar`, payload);
  }
}
