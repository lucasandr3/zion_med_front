import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { absoluteMediaUrl } from '../utils/absolute-media-url';
import { LinkBioService } from './link-bio.service';

const BASE = `${environment.apiUrl}/api/v1`;

/** String, caminho ou objeto com URL (Laravel / Spatie Media / MinIO). */
function extractLogoHref(v: unknown): string | null {
  if (v == null) return null;
  if (typeof v === 'string') {
    const s = v.trim();
    return s || null;
  }
  if (Array.isArray(v)) {
    for (const item of v) {
      const x = extractLogoHref(item);
      if (x) return x;
    }
    return null;
  }
  if (typeof v === 'object') {
    const o = v as Record<string, unknown>;
    for (const k of ['original_url', 'url', 'href', 'full_url', 'fullUrl', 'path', 'logo_url', 'logoUrl']) {
      const x = o[k];
      if (typeof x === 'string' && x.trim()) return x.trim();
    }
  }
  return null;
}

function nestRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
}

function pushClinicLogoCandidates(candidates: unknown[], obj: Record<string, unknown> | null): void {
  if (!obj) return;
  candidates.push(
    obj['logo_url'],
    obj['logo'],
    obj['logo_path'],
    obj['clinic_logo'],
    obj['clinic_logo_url'],
    obj['clinic_logo_path'],
    obj['logoUrl'],
    obj['clinicLogoUrl'],
    obj['brand_logo'],
    obj['brand_logo_url'],
  );
  const media = obj['media'];
  if (Array.isArray(media)) candidates.push(...media);
}

/** Extrai logo da resposta da API (vários formatos de recurso / aninhamento). */
function pickPublicFormLogoUrl(d: Record<string, unknown>): string | null {
  const candidates: unknown[] = [
    d['logo_url'],
    d['clinic_logo_url'],
    d['clinic_logo'],
    d['clinic_logo_path'],
    d['logo'],
    d['logoUrl'],
    d['clinicLogoUrl'],
  ];
  pushClinicLogoCandidates(candidates, nestRecord(d['clinic']));
  pushClinicLogoCandidates(candidates, nestRecord(d['clinica']));
  pushClinicLogoCandidates(candidates, nestRecord(d['company']));
  pushClinicLogoCandidates(candidates, nestRecord(d['empresa']));
  const template = nestRecord(d['template']);
  if (template) {
    candidates.push(template['clinic_logo_url'], template['logo_url'], template['logo']);
    pushClinicLogoCandidates(candidates, nestRecord(template['clinic']));
    pushClinicLogoCandidates(candidates, nestRecord(template['clinica']));
  }
  const attrs = nestRecord(d['attributes']);
  if (attrs) {
    pushClinicLogoCandidates(candidates, attrs);
  }
  for (const v of candidates) {
    const href = extractLogoHref(v);
    if (href) {
      return absoluteMediaUrl(href) ?? href;
    }
  }
  return null;
}

/**
 * Slug público do Link Bio (`/l/:slug`), mesma origem de `clinic.logo_url` na página pública.
 * Usado quando o show do formulário não traz logo mas expõe o slug.
 */
function extractPublicLinkBioSlug(d: Record<string, unknown>): string | null {
  const tryStr = (v: unknown): string | null =>
    typeof v === 'string' && v.trim() ? v.trim() : null;

  const fromClinicLike = (r: Record<string, unknown> | null): string | null => {
    if (!r) return null;
    return (
      tryStr(r['link_bio_slug']) ??
      tryStr(r['clinic_slug']) ??
      tryStr(r['public_slug']) ??
      tryStr(r['public_link_slug']) ??
      tryStr(r['bio_slug']) ??
      tryStr(r['slug'])
    );
  };

  const nested = [
    nestRecord(d['clinic']),
    nestRecord(d['clinica']),
    nestRecord(d['organization']),
    nestRecord(d['empresa']),
    nestRecord(d['attributes']),
    nestRecord(nestRecord(d['template'])?.['clinic'] as unknown),
    nestRecord(nestRecord(d['template'])?.['clinica'] as unknown),
  ];
  for (const r of nested) {
    const s = fromClinicLike(r);
    if (s) return s;
  }
  return (
    tryStr(d['link_bio_slug']) ??
    tryStr(d['clinic_slug']) ??
    tryStr(d['public_slug']) ??
    tryStr(d['public_link_slug']) ??
    tryStr(d['bio_slug']) ??
    tryStr(d['slug'])
  );
}

export interface FormularioPublicoField {
  id: number;
  name_key: string;
  label: string;
  type: string;
  required: boolean;
  options: unknown[];
  sort_order: number;
}

export interface FormularioPersonLink {
  enabled: boolean;
  /**
   * Como validar antes do formulário:
   * - omitido / `code`: código da pessoa + data de nascimento (padrão)
   * - `cpf`: apenas CPF (11 dígitos), validado no endpoint validate-person
   */
  mode?: string;
  title?: string;
  description?: string;
}

export interface FeegowSimpleOption {
  id?: number | string;
  [key: string]: unknown;
}

export interface FormularioPublicoFeegowMeta {
  enabled: boolean;
  requires_fields?: string[];
  professionals?: FeegowSimpleOption[];
  procedures?: FeegowSimpleOption[];
  specialties?: FeegowSimpleOption[];
  insurances?: FeegowSimpleOption[];
  units?: FeegowSimpleOption[];
  locals?: FeegowSimpleOption[];
  channels?: FeegowSimpleOption[];
  warning?: string;
}

export interface FormularioPublicoData {
  template: { id: number; name: string; description?: string };
  clinic_name?: string;
  /** URL absoluta da logo (preenchida pelo service a partir da API). */
  logo_url?: string | null;
  /** `basic` ou `reinforced` (OTP antes de assinar). */
  signing_security_level?: string;
  /** Evolution configurado para OTP por WhatsApp. */
  otp_whatsapp_available?: boolean;
  /** Quando ativo, exige identificação antes do preenchimento (ver `person_link.mode`). */
  person_link?: FormularioPersonLink;
  /** Algumas APIs enviam o modo de identificação neste campo (ex.: `cpf`). */
  public_person_link_mode?: string;
  /** Integração Feegow para este formulário/empresa. */
  feegow?: FormularioPublicoFeegowMeta;
  fields: FormularioPublicoField[];
}

interface ShowResponse {
  data: FormularioPublicoData;
}

interface SubmitResponse {
  data: { message: string; protocol_number: string };
}

interface ValidatePersonResponse {
  data: { person_id: number; code: string; name: string };
}

interface FeegowDisponibilidadeResponse {
  data: { schedule: unknown; raw: unknown };
}

interface OtpSendResponse {
  data: { message: string; expires_in_minutes: number };
}

interface OtpVerifyResponse {
  data: { message: string };
}

@Injectable({ providedIn: 'root' })
export class FormularioPublicoService {
  private http = inject(HttpClient);
  private linkBio = inject(LinkBioService);

  getByToken(token: string): Observable<FormularioPublicoData> {
    return this.http.get<ShowResponse>(`${BASE}/formulario-publico/${encodeURIComponent(token)}`).pipe(
      switchMap((r) => {
        const raw = r.data as FormularioPublicoData & Record<string, unknown>;
        const rec = raw as Record<string, unknown>;
        const picked = pickPublicFormLogoUrl(rec);
        const slug = extractPublicLinkBioSlug(rec);
        if (picked) {
          return of({ ...raw, logo_url: picked } as FormularioPublicoData);
        }
        if (!slug) {
          return of({ ...raw, logo_url: null } as FormularioPublicoData);
        }
        return this.linkBio.getPublicBySlug(slug).pipe(
          map((pub) => {
            const lu = pub.clinic?.logo_url;
            const resolved =
              lu != null && String(lu).trim() !== ''
                ? absoluteMediaUrl(String(lu).trim()) ?? String(lu).trim()
                : null;
            return { ...raw, logo_url: resolved } as FormularioPublicoData;
          }),
          catchError(() => of({ ...raw, logo_url: null } as FormularioPublicoData))
        );
      })
    );
  }

  submit(token: string, payload: Record<string, unknown>): Observable<SubmitResponse['data']> {
    return this.http
      .post<SubmitResponse>(`${BASE}/formulario-publico/${encodeURIComponent(token)}/submit`, payload)
      .pipe(map((r) => r.data));
  }

  validatePerson(
    token: string,
    body: { code?: string; birth_date?: string; cpf?: string }
  ): Observable<ValidatePersonResponse['data']> {
    return this.http
      .post<ValidatePersonResponse>(`${BASE}/formulario-publico/${encodeURIComponent(token)}/validate-person`, body)
      .pipe(map((r) => r.data));
  }

  sendOtp(
    token: string,
    body: { channel: 'email' | 'whatsapp'; email?: string; phone?: string }
  ): Observable<OtpSendResponse['data']> {
    return this.http
      .post<OtpSendResponse>(`${BASE}/formulario-publico/${encodeURIComponent(token)}/otp/send`, body)
      .pipe(map((r) => r.data));
  }

  verifyOtp(
    token: string,
    body: { channel: 'email' | 'whatsapp'; email?: string; phone?: string; code: string }
  ): Observable<OtpVerifyResponse['data']> {
    return this.http
      .post<OtpVerifyResponse>(`${BASE}/formulario-publico/${encodeURIComponent(token)}/otp/verify`, body)
      .pipe(map((r) => r.data));
  }

  getFeegowDisponibilidade(
    token: string,
    params: {
      tipo: 'E' | 'P';
      data_start: string;
      data_end: string;
      especialidade_id?: number;
      procedimento_id?: number;
      unidade_id?: number;
      profissional_id?: number;
      convenio_id?: number;
    }
  ): Observable<FeegowDisponibilidadeResponse['data']> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v) !== '') query.set(k, String(v));
    });
    return this.http
      .get<FeegowDisponibilidadeResponse>(`${BASE}/formulario-publico/${encodeURIComponent(token)}/feegow/disponibilidade?${query.toString()}`)
      .pipe(map((r) => r.data));
  }
}
