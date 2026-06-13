import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

export interface PlatformDashboardData {
  tenants_count: number;
  clinics_count: number;
  users_count: number;
  leads_count: number;
}

export interface PlatformTenant {
  id: number;
  name: string;
  slug: string;
  clinics_count: number;
  users_count?: number;
  created_at?: string;
  updated_at?: string;
  subscription_status?: string | null;
  billing_status?: string | null;
  active_plans?: string[];
}

export interface PlatformTenantClinicSubscription {
  id: number;
  asaas_subscription_id?: string | null;
  plan_key?: string | null;
  status?: string | null;
  current_period_end?: string | null;
  next_due_date?: string | null;
  created_at?: string | null;
}

export interface PlatformTenantClinic {
  id: number;
  name: string;
  slug?: string;
  niche?: string | null;
  address?: string | null;
  phone?: string | null;
  contact_email?: string | null;
  notification_email?: string | null;
  billing_name?: string | null;
  billing_email?: string | null;
  billing_document?: string | null;
  asaas_customer_id?: string | null;
  plan_key?: string | null;
  plan_name?: string | null;
  plan_value?: number | null;
  subscription_status?: string | null;
  billing_status?: string | null;
  trial_ends_at?: string | null;
  grace_ends_at?: string | null;
  can_access_app?: boolean;
  is_on_trial?: boolean;
  users_count: number;
  people_count?: number;
  form_submissions_count?: number;
  max_users?: number | null;
  max_organizations_per_tenant?: number | null;
  whatsapp_notifications_enabled?: boolean;
  feegow_enabled?: boolean;
  feegow_last_status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  latest_subscription?: PlatformTenantClinicSubscription | null;
}

export interface PlatformTenantSummary {
  clinics_count: number;
  users_count: number;
  people_count: number;
  form_submissions_count: number;
}

export interface PlatformTenantDetail {
  tenant: {
    id: number;
    name: string;
    slug: string;
    created_at?: string;
    updated_at?: string;
  };
  summary?: PlatformTenantSummary;
  clinics: PlatformTenantClinic[];
}

export interface PlatformLead {
  id: number;
  name: string;
  clinic: string | null;
  email: string;
  phone: string | null;
  message: string | null;
  created_at?: string;
}

export interface PlatformSubscription {
  id?: number;
  tenant_id: number;
  tenant_name: string;
  clinic_id: number;
  clinic_name: string;
  plan_key: string | null;
  subscription_status: string | null;
  billing_status?: string | null;
  current_period_end?: string | null;
}

export interface PlatformInvoice {
  id: number | string;
  tenant_id?: number;
  tenant_name: string;
  clinic_id?: number;
  clinic_name: string;
  reference?: string | null;
  amount?: number | null;
  currency?: string | null;
  status: string | null;
  due_date?: string | null;
  paid_at?: string | null;
  created_at?: string | null;
}

export interface PlatformPlan {
  id: number | string;
  name: string;
  key: string;
  value: number;
  description?: string | null;
  sort_order?: number;
  is_active: boolean;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface PlatformMinioSettings {
  endpoint?: string | null;
  access_key?: string | null;
  region?: string;
  submissions_bucket?: string;
  attachments_bucket?: string;
  assets_bucket?: string;
  invoices_bucket?: string;
  configured?: boolean;
  secret_key_preview?: string | null;
}

export interface PlatformResendSettings {
  mailer?: 'resend' | 'log';
  from_address?: string;
  from_name?: string;
  support_email?: string | null;
  logo_url?: string | null;
  logo_path?: string | null;
  logo_preview_url?: string | null;
  signature_photo_path?: string | null;
  signature_photo_preview_url?: string | null;
  sender_name?: string | null;
  sender_role?: string | null;
  whatsapp_number?: string | null;
  primary_color?: string;
  product_name?: string | null;
  configured?: boolean;
  api_key_preview?: string | null;
}

export interface PlatformSettingsData {
  product_name: string;
  base_url?: string | null;
  trial_days: number;
  grace_days: number;
  block_mode: string;
  multi_empresa_plan: string;
  api_configured: boolean;
  api_key_preview?: string | null;
  webhook_secret_preview?: string | null;
  minio?: PlatformMinioSettings;
  resend?: PlatformResendSettings;
  service_status: string;
  service_status_severity: string;
  service_status_message: string;
  service_status_components: Record<string, string>;
  component_options?: Record<string, string>;
}

export interface PlatformOrganizationPresence {
  organization_id: number;
  organization_name: string;
  active_sessions: number;
  last_seen_at: string | null;
}

export interface PlatformAuditLog {
  id: number;
  action: string;
  entity_type?: string | null;
  entity_id?: number | string | null;
  meta_json?: Record<string, unknown> | null;
  created_at: string;
  organization_id?: number | null;
  organization_name?: string | null;
}

export interface PlatformLogsResponse {
  data: PlatformAuditLog[];
  meta: { current_page: number; last_page: number; per_page: number; total: number };
  links: { first: string; last: string; prev: string | null; next: string | null };
}

export type PlatformManualEmailCategory = 'contact' | 'billing' | 'general' | 'support';

export interface PlatformManualEmailCategoryOption {
  value: PlatformManualEmailCategory;
  label: string;
}

export interface PlatformManualEmailRecipient {
  id: string;
  type: 'organization' | 'lead';
  email: string;
  name?: string | null;
  label: string;
  group?: string;
  tenant_id?: number;
  tenant_name?: string;
  organization_id?: number;
  organization_name?: string;
  email_type?: string;
  email_type_label?: string;
  lead_id?: number;
}

export interface PlatformManualEmailRecipientsData {
  categories: PlatformManualEmailCategoryOption[];
  recipients: PlatformManualEmailRecipient[];
  mail_configured: boolean;
  mailer: 'resend' | 'log';
  from_address: string;
  from_name: string;
  whatsapp_number?: string | null;
}

export interface PlatformManualEmail {
  id: number;
  category: PlatformManualEmailCategory;
  category_label: string;
  recipient_email: string;
  recipient_name?: string | null;
  subject: string;
  body_preview?: string;
  tenant_id?: number | null;
  tenant_name?: string | null;
  organization_id?: number | null;
  organization_name?: string | null;
  lead_id?: number | null;
  lead_name?: string | null;
  sent_at?: string | null;
  created_at?: string | null;
}

export interface PlatformManualEmailsResponse {
  data: PlatformManualEmail[];
  meta: { current_page: number; last_page: number; per_page: number; total: number };
}

@Injectable({ providedIn: 'root' })
export class PlataformaService {
  private api = inject(ApiService);

  getDashboard(): Observable<{ data: PlatformDashboardData }> {
    return this.api.get<{ data: PlatformDashboardData }>('/platform/dashboard');
  }

  getOrganizationPresences(): Observable<{ data: PlatformOrganizationPresence[] }> {
    return this.api.get<{ data: PlatformOrganizationPresence[] }>('/platform/organization-presences');
  }

  getTenants(): Observable<{ data: PlatformTenant[] }> {
    return this.api.get<{ data: PlatformTenant[] }>('/platform/tenants');
  }

  getTenant(id: number): Observable<{ data: PlatformTenantDetail }> {
    return this.api.get<{ data: PlatformTenantDetail }>(`/platform/tenants/${id}`);
  }

  getLeads(): Observable<{ data: PlatformLead[] }> {
    return this.api.get<{ data: PlatformLead[] }>('/platform/leads');
  }

  getSubscriptions(): Observable<{ data: PlatformSubscription[] }> {
    return this.api.get<{ data: Record<string, unknown>[] }>('/platform/subscriptions').pipe(
      map((res) => ({
        data: (res.data ?? []).map((row) => {
          const org = (row['organization'] ?? row['clinic']) as
            | {
                id?: number;
                name?: string;
                tenant_id?: number;
                plan_key?: string | null;
                subscription_status?: string | null;
                billing_status?: string | null;
              }
            | null
            | undefined;
          return {
            id: row['id'] as number | undefined,
            tenant_id: org?.tenant_id ?? 0,
            tenant_name: '',
            clinic_id: org?.id ?? 0,
            clinic_name: org?.name ?? '—',
            plan_key: (row['plan_key'] as string | null | undefined) ?? org?.plan_key ?? null,
            subscription_status: org?.subscription_status ?? null,
            billing_status: org?.billing_status ?? null,
            current_period_end: row['current_period_end'] as string | null | undefined,
          };
        }),
      }))
    );
  }

  getInvoices(): Observable<{ data: PlatformInvoice[] }> {
    return this.api.get<{ data: Record<string, unknown>[] }>('/platform/invoices').pipe(
      map((res) => ({
        data: (res.data ?? []).map((row) => {
          const org = (row['organization'] ?? row['clinic']) as { id?: number; name?: string; tenant_id?: number } | null | undefined;
          return {
            id: row['id'] as number | string,
            tenant_id: org?.tenant_id,
            tenant_name: '',
            clinic_id: org?.id,
            clinic_name: org?.name ?? '—',
            reference: row['asaas_payment_id'] as string | null | undefined,
            amount: row['value'] as number | null | undefined,
            currency: 'BRL',
            status: row['status'] as string | null,
            due_date: row['due_date'] as string | null | undefined,
            paid_at: row['paid_at'] as string | null | undefined,
            created_at: row['created_at'] as string | null | undefined,
          };
        }),
      }))
    );
  }

  getPlans(): Observable<{ data: PlatformPlan[]; trial_days?: number }> {
    return this.api.get<{ data: PlatformPlan[]; trial_days?: number }>('/platform/plans');
  }

  getPlan(id: number | string): Observable<{ data: PlatformPlan }> {
    return this.api.get<{ data: PlatformPlan }>('/platform/plans/' + id);
  }

  createPlan(payload: { key: string; name: string; value: number; description?: string | null; sort_order?: number; is_active?: boolean }): Observable<{ data: PlatformPlan }> {
    return this.api.post<{ data: PlatformPlan }>('/platform/plans', payload);
  }

  updatePlan(id: number | string, payload: { name: string; value: number; description?: string | null; sort_order?: number; is_active?: boolean }): Observable<{ data: PlatformPlan }> {
    return this.api.put<{ data: PlatformPlan }>('/platform/plans/' + id, payload);
  }

  deletePlan(id: number | string): Observable<unknown> {
    return this.api.delete('/platform/plans/' + id);
  }

  getSettings(): Observable<{ data: PlatformSettingsData }> {
    return this.api.get<{ data: PlatformSettingsData }>('/platform/settings');
  }

  updateSettings(payload: {
    product_name: string;
    trial_days: number;
    grace_days: number;
    block_mode: string;
    multi_empresa_plan: string;
    asaas_base_url: string;
    asaas_api_key?: string | null;
    asaas_webhook_secret?: string | null;
    minio_endpoint: string;
    minio_access_key: string;
    minio_secret_key?: string | null;
    minio_region: string;
    minio_submissions_bucket: string;
    minio_attachments_bucket: string;
    minio_assets_bucket: string;
    minio_invoices_bucket: string;
    mail_mailer: 'resend' | 'log';
    resend_api_key?: string | null;
    mail_from_address: string;
    mail_from_name: string;
    mail_support_email?: string | null;
    mail_logo_url?: string | null;
    mail_sender_name?: string | null;
    mail_sender_role?: string | null;
    mail_whatsapp_number?: string | null;
    mail_primary_color?: string | null;
    mail_product_name?: string | null;
  }): Observable<{ data?: PlatformSettingsData; message?: string }> {
    return this.api.put<{ data?: PlatformSettingsData; message?: string }>('/platform/settings', payload);
  }

  uploadEmailBranding(
    type: 'logo' | 'signature',
    file: File
  ): Observable<{ message?: string; data?: { type: string; path: string; url?: string | null; resend?: PlatformResendSettings } }> {
    const form = new FormData();
    form.append('type', type);
    form.append('file', file);
    return this.api.postFormData('/platform/settings/email-branding/upload', form);
  }

  updateStatus(payload: {
    status: string;
    severity: string;
    message?: string | null;
    components?: Record<string, string>;
  }): Observable<unknown> {
    return this.api.put('/platform/status', payload);
  }

  getPlatformLogs(page = 1): Observable<PlatformLogsResponse> {
    return this.api.get<PlatformLogsResponse>('/platform/logs', { page });
  }

  getManualEmailRecipients(): Observable<{ data: PlatformManualEmailRecipientsData }> {
    return this.api.get<{ data: PlatformManualEmailRecipientsData }>('/platform/emails/recipients');
  }

  getManualEmails(page = 1): Observable<PlatformManualEmailsResponse> {
    return this.api.get<PlatformManualEmailsResponse>('/platform/emails', { page });
  }

  sendManualEmail(payload: {
    category: PlatformManualEmailCategory;
    to_email: string;
    to_name?: string | null;
    subject: string;
    body: string;
    tenant_id?: number | null;
    organization_id?: number | null;
    lead_id?: number | null;
  }): Observable<{ data: PlatformManualEmail; message?: string }> {
    return this.api.post<{ data: PlatformManualEmail; message?: string }>('/platform/emails/send', payload);
  }

  /**
   * Monta a lista de assinaturas a partir dos tenants (fallback quando não existe GET /platform/subscriptions).
   */
  getSubscriptionsFromTenants(): Observable<{ data: PlatformSubscription[] }> {
    return new Observable((observer) => {
      this.getTenants().subscribe({
        next: (tenantsRes) => {
          const tenants = tenantsRes.data ?? [];
          if (tenants.length === 0) {
            observer.next({ data: [] });
            observer.complete();
            return;
          }
          let pending = tenants.length;
          const items: PlatformSubscription[] = [];
          tenants.forEach((t) => {
            this.getTenant(t.id).subscribe({
              next: (detailRes) => {
                const tenant = detailRes.data?.tenant;
                const clinics = detailRes.data?.clinics ?? [];
                clinics.forEach((c) => {
                  items.push({
                    tenant_id: t.id,
                    tenant_name: tenant?.name ?? t.name,
                    clinic_id: c.id,
                    clinic_name: c.name,
                    plan_key: c.plan_key ?? null,
                    subscription_status: c.subscription_status ?? null,
                    billing_status: c.billing_status ?? null,
                    current_period_end: null,
                  });
                });
                pending--;
                if (pending === 0) {
                  observer.next({ data: items });
                  observer.complete();
                }
              },
              error: () => {
                pending--;
                if (pending === 0) {
                  observer.next({ data: items });
                  observer.complete();
                }
              },
            });
          });
        },
        error: (err) => observer.error(err),
      });
    });
  }
}
