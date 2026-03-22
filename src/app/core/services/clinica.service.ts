import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { map, Observable, Subject, switchMap, tap } from 'rxjs';

export interface ClinicaOption {
  id: number;
  name: string;
  users_count?: number;
}

/** Horário por dia da semana (1=Seg … 7=Domingo). */
export interface BusinessHoursSlot {
  open: string;
  close: string;
}

export interface ClinicaConfig {
  id?: number;
  name: string;
  notification_email?: string;
  contact_email?: string;
  phone?: string;
  address?: string;
  /** E-mail (alias para notification_email no form antigo) */
  email?: string;
  theme?: string;
  dark_mode?: boolean;
  logo_url?: string | null;
  cover_image_url?: string | null;
  /** Dados para faturamento */
  billing_name?: string | null;
  billing_email?: string | null;
  billing_document?: string | null;
  /** Horário de atendimento: chave '1'..'7' */
  business_hours?: Record<string, BusinessHoursSlot> | null;
  whatsapp_notifications_enabled?: boolean;
  whatsapp_notify_cobranca?: boolean;
  whatsapp_notify_faturas_boleto?: boolean;
  whatsapp_notify_avisos?: boolean;
  plan_key?: string;
  subscription_status?: string;
  billing_status?: string;
  [key: string]: unknown;
}

export interface ThemeOption {
  label: string;
  primary?: string;
}

export interface ConfigPageData {
  clinic: ClinicaConfig;
  available_themes?: Record<string, ThemeOption>;
  billing_plans?: Record<string, { name?: string; value?: number }>;
  billing_subscriptions?: unknown[];
  billing_payments?: { id: number; status: string; due_date: string; paid_at?: string; value: number; bank_slip_url?: string }[];
  asaas_configured?: boolean;
  active_config_tab?: string;
  can_add_multi_empresa?: boolean;
  tenant_clinics?: ClinicaOption[];
}

export interface ClinicaAuditLog {
  id: number;
  action: string;
  entity_type?: string | null;
  entity_id?: number | null;
  meta_json?: Record<string, unknown> | null;
  user_id?: number | null;
  user_name?: string | null;
  organization_id?: number;
  created_at?: string;
}

interface LogsResponse {
  data: ClinicaAuditLog[];
  meta: { current_page: number; last_page: number; per_page: number; total: number };
  links: { first: string | null; last: string | null; prev: string | null; next: string | null };
}

interface EscolherListResponse {
  data: { clinics?: ClinicaOption[] } | ClinicaOption[];
}

interface ConfigResponse {
  data: { clinic?: ClinicaConfig } | ClinicaConfig;
}

interface ConfigPageResponse {
  data: ConfigPageData;
}

@Injectable({ providedIn: 'root' })
export class ClinicaService {
  private api = inject(ApiService);
  private auth = inject(AuthService);

  /** Emite após logo/capa/dados visuais da clínica mudarem (sidebar e outros ouvintes). */
  private readonly brandingUpdated = new Subject<void>();
  readonly clinicBrandingUpdated$ = this.brandingUpdated.asObservable();

  private emitBrandingUpdated(): void {
    this.brandingUpdated.next();
  }

  private mapConfigResponse(r: ConfigResponse): ClinicaConfig {
    const d = r.data as { clinic?: ClinicaConfig } | ClinicaConfig;
    return (typeof d === 'object' && d && 'clinic' in d ? d.clinic : d) as ClinicaConfig;
  }

  listParaEscolher(): Observable<ClinicaOption[]> {
    return this.api.get<EscolherListResponse>('/clinica/escolher').pipe(
      map((r) => {
        const d = r.data;
        if (Array.isArray(d)) return d as ClinicaOption[];
        return (d?.clinics ?? []) as ClinicaOption[];
      })
    );
  }

  escolher(clinicId: number): Observable<unknown> {
    return this.api.post('/clinica/escolher', { clinic_id: clinicId }).pipe(
      tap(() => {
        this.auth.setCurrentClinicId(clinicId);
        this.emitBrandingUpdated();
      })
    );
  }

  /**
   * Cria nova empresa/filial no mesmo tenant (plano multi-empresa).
   * Backend: POST /clinica/clinics — ajuste o path se a API usar outro endpoint.
   */
  createClinicInTenant(name: string): Observable<ConfigPageData> {
    return this.api.post<unknown>('/clinica/clinics', { name: name.trim() }).pipe(
      switchMap(() => this.getConfiguracoesPage())
    );
  }

  getConfiguracoes(): Observable<ClinicaConfig> {
    return this.api.get<ConfigResponse>('/clinica/configuracoes').pipe(
      map((r) => {
        const d = r.data as { clinic?: ClinicaConfig };
        return (d?.clinic ?? d) as ClinicaConfig;
      })
    );
  }

  /** Retorna a resposta completa da página de configurações (clinic + themes + billing + tenant_clinics). */
  getConfiguracoesPage(): Observable<ConfigPageData> {
    return this.api.get<ConfigPageResponse>('/clinica/configuracoes').pipe(
      map((r) => r.data)
    );
  }

  /** Logs de auditoria da clínica atual (paginados). */
  getClinicaLogs(page = 1, perPage = 50): Observable<LogsResponse> {
    return this.api.get<LogsResponse>('/clinica/logs', { page, per_page: perPage });
  }

  updateConfiguracoes(payload: Partial<ClinicaConfig>, logoFile?: File): Observable<ClinicaConfig> {
    if (logoFile) {
      const form = new FormData();
      const bh = payload.business_hours as Record<string, { open: string; close: string }> | undefined;
      Object.entries(payload).forEach(([k, v]) => {
        if (k === 'business_hours' || v === null || v === undefined) return;
        if (typeof v === 'boolean') {
          form.append(k, v ? '1' : '0');
        } else {
          form.append(k, String(v));
        }
      });
      if (bh && typeof bh === 'object') {
        Object.entries(bh).forEach(([day, slot]) => {
          if (slot?.open && slot?.close) {
            form.append(`business_hours[${day}][open]`, slot.open);
            form.append(`business_hours[${day}][close]`, slot.close);
          }
        });
      }
      form.append('logo', logoFile, logoFile.name);
      return this.api.putFormData<ConfigResponse>('/clinica/configuracoes', form).pipe(
        map((r) => this.mapConfigResponse(r)),
        tap(() => this.emitBrandingUpdated())
      );
    }
    return this.api.put<ConfigResponse>('/clinica/configuracoes', payload).pipe(map((r) => this.mapConfigResponse(r)));
  }

  uploadCoverImage(coverFile: File, clinicName: string): Observable<ClinicaConfig> {
    const form = new FormData();
    form.append('name', clinicName);
    form.append('cover_image', coverFile, coverFile.name);
    return this.api.putFormData<ConfigResponse>('/clinica/configuracoes', form).pipe(
      map((r) => this.mapConfigResponse(r)),
      tap(() => this.emitBrandingUpdated())
    );
  }
}
