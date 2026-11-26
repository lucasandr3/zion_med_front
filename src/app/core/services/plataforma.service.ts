import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { SupportTicket } from './support.service';

export interface PlatformCannedReplyRow {
  id: number;
  title: string;
  body: string;
  category?: string | null;
  shortcut?: string | null;
  sort_order?: number;
  active?: boolean;
  updated_at?: string | null;
}

export interface PlatformSupportAgentRow {
  id: number;
  name: string;
  email?: string | null;
  role?: string | null;
}

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

export interface PlatformJobRow {
  id: number;
  queue?: string;
  job_type: string;
  attempts?: number;
  max_attempts?: number;
  available_at?: string | null;
  reserved_at?: string | null;
  created_at?: string | null;
  status?: 'pending' | 'reserved' | string;
  summary?: string | null;
}

export interface PlatformFailedJobRow {
  id: number;
  queue?: string;
  job_type: string;
  failed_at?: string | null;
  exception?: string | null;
  summary?: string | null;
}

export interface PlatformJobsOverview {
  queue_enabled: boolean;
  funnel_recovery_enabled: boolean;
  pending: number;
  reserved: number;
  failed: number;
  failed_last_24h: number;
  email_pending: number;
  email_failed: number;
  schedules_count?: number;
  schedules?: PlatformScheduleRow[];
  pending_jobs: PlatformJobRow[];
  failed_jobs: PlatformFailedJobRow[];
}

export interface PlatformScheduleRow {
  id: string;
  name: string;
  description?: string | null;
  cadence?: string | null;
  timezone?: string | null;
  enabled: boolean;
  last_status?: 'ok' | 'error' | 'unknown' | string | null;
  last_run_at?: string | null;
  last_message?: string | null;
  last_duration_ms?: number | null;
}

export interface PlatformAutomationConfig {
  wait_seconds?: number;
  conditions?: Array<{ field?: string; op?: string; value?: unknown }>;
  actions?: Array<Record<string, unknown>>;
}

export interface PlatformAutomationRow {
  id: number;
  name: string;
  description?: string | null;
  status: string;
  trigger_event: string;
  version?: number;
  updated_at?: string | null;
  config?: PlatformAutomationConfig;
}

export interface PlatformAutomationsOverview {
  active: number;
  failed_executions: number;
  items: PlatformAutomationRow[];
}

export interface PlatformAutomationExecutionRow {
  id: number;
  automation_id: number;
  trigger_event: string;
  status: string;
  result_message?: string | null;
  attempts?: number;
  created_at?: string | null;
  finished_at?: string | null;
}

export interface PlatformRelationshipOverview {
  tasks_open: number;
  automations_active: number;
  executions_failed: number;
  templates_active: number;
  journeys_active?: number;
  enrollments_active?: number;
  tickets_waiting?: number;
  articles_published?: number;
  leads_total: number;
  trials_ending_3d: number;
  exceptions?: Array<{
    id: string;
    label: string;
    count: number;
    route: string;
    needs_attention?: boolean;
  }>;
}

export interface PlatformJourneyStep {
  key: string;
  delay_days?: number;
  conditions?: Array<{ field?: string; op?: string; value?: unknown }>;
  actions?: Array<Record<string, unknown>>;
}

export interface PlatformJourneyConfig {
  exit_when?: string[];
  steps?: PlatformJourneyStep[];
}

export interface PlatformJourneyRow {
  id: number;
  name: string;
  description?: string | null;
  status: string;
  entry_event: string;
  version?: number;
  active_enrollments?: number;
  updated_at?: string | null;
  config?: PlatformJourneyConfig;
}

export interface PlatformJourneysOverview {
  active: number;
  enrollments_active: number;
  items: PlatformJourneyRow[];
}

export interface PlatformMessageTemplateRow {
  id: number;
  name: string;
  channel: string;
  category?: string | null;
  subject?: string | null;
  body?: string | null;
  variables_json?: string[];
  status: string;
  version?: number;
  updated_at?: string | null;
}

export interface PlatformOperationalTaskRow {
  id: number;
  title: string;
  description?: string | null;
  status: string;
  priority?: string | null;
  origin?: string | null;
  related_type?: string | null;
  related_id?: string | null;
  due_at?: string | null;
  created_at?: string | null;
  completed_at?: string | null;
}

export interface PlatformOperationalTasksOverview {
  open: number;
  done: number;
  items: PlatformOperationalTaskRow[];
}

export interface PlatformFeedback {
  id: number;
  type: 'suggestion' | 'bug' | string;
  title: string;
  message: string;
  source?: string | null;
  page_url?: string | null;
  user_name?: string | null;
  user_email?: string | null;
  organization_name?: string | null;
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
  value_yearly?: number | null;
  value_semiannual?: number | null;
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

export interface PlatformFormImportSettings {
  provider?: 'openai' | 'heuristic';
  model?: string;
  base_url?: string;
  configured?: boolean;
  api_key_preview?: string | null;
  retention_days?: number;
}

export interface PlatformWebPushSettings {
  subject?: string;
  public_key?: string | null;
  private_key_preview?: string | null;
  configured?: boolean;
  package_ready?: boolean;
}

export interface PlatformAsaasSettings {
  base_url?: string | null;
  api_key_configured?: boolean;
  api_key_preview?: string | null;
  api_key_needs_reentry?: boolean;
  webhook_secret_configured?: boolean;
  webhook_secret_preview?: string | null;
  webhook_secret_needs_reentry?: boolean;
  configured?: boolean;
}

export interface PlatformSettingsData {
  product_name: string;
  asaas?: PlatformAsaasSettings;
  /** Campos legados, anteriores ao agrupamento em `asaas`. */
  base_url?: string | null;
  trial_days: number;
  grace_days: number;
  block_mode: string;
  multi_empresa_plan: string;
  api_configured?: boolean;
  api_key_preview?: string | null;
  webhook_secret_preview?: string | null;
  minio?: PlatformMinioSettings;
  resend?: PlatformResendSettings;
  form_import?: PlatformFormImportSettings;
  webpush?: PlatformWebPushSettings;
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

  deleteTenant(
    id: number,
    confirmName: string,
  ): Observable<{ data: { message: string; deleted: Record<string, unknown> } }> {
    return this.api.delete(`/platform/tenants/${id}`, { confirm_name: confirmName });
  }

  getLeads(): Observable<{ data: PlatformLead[] }> {
    return this.api.get<{ data: PlatformLead[] }>('/platform/leads');
  }

  getFeedback(): Observable<{ data: PlatformFeedback[] }> {
    return this.api.get<{ data: PlatformFeedback[] }>('/platform/feedback');
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

  createPlan(payload: {
    key: string;
    name: string;
    value: number;
    value_yearly?: number | null;
    value_semiannual?: number | null;
    description?: string | null;
    sort_order?: number;
    is_active?: boolean;
  }): Observable<{ data: PlatformPlan }> {
    return this.api.post<{ data: PlatformPlan }>('/platform/plans', payload);
  }

  updatePlan(
    id: number | string,
    payload: {
      name: string;
      value: number;
      value_yearly?: number | null;
      value_semiannual?: number | null;
      description?: string | null;
      sort_order?: number;
      is_active?: boolean;
    }
  ): Observable<{ data: PlatformPlan }> {
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
    form_import_provider?: 'openai' | 'heuristic' | null;
    openai_api_key?: string | null;
    form_import_openai_model?: string | null;
    openai_base_url?: string | null;
    form_import_retention_days?: number | null;
    vapid_subject?: string | null;
  }): Observable<{ data?: PlatformSettingsData; message?: string }> {
    return this.api.put<{ data?: PlatformSettingsData; message?: string }>('/platform/settings', payload);
  }

  generateWebPushVapid(payload?: { subject?: string | null }): Observable<{
    message?: string;
    data?: {
      webpush?: PlatformWebPushSettings;
      public_key?: string;
      private_key?: string;
    };
  }> {
    return this.api.post('/platform/settings/webpush/generate-vapid', payload ?? {});
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

  getJobsOverview(): Observable<{ data: PlatformJobsOverview }> {
    return this.api.get<{ data: PlatformJobsOverview }>('/platform/jobs');
  }

  getRelationshipOverview(): Observable<{ data: PlatformRelationshipOverview }> {
    return this.api.get<{ data: PlatformRelationshipOverview }>('/platform/relationship/overview');
  }

  getPlatformCannedReplies(activeOnly = true): Observable<{ data: PlatformCannedReplyRow[] }> {
    return this.api.get<{ data: PlatformCannedReplyRow[] }>('/platform/support/canned-replies', {
      active: activeOnly ? 'true' : 'false',
    });
  }

  createPlatformCannedReply(payload: {
    title: string;
    body: string;
    category?: string;
    shortcut?: string;
    sort_order?: number;
    active?: boolean;
  }): Observable<{ data: PlatformCannedReplyRow }> {
    return this.api.post<{ data: PlatformCannedReplyRow }>('/platform/support/canned-replies', payload);
  }

  updatePlatformCannedReply(
    id: number,
    payload: Partial<{
      title: string;
      body: string;
      category: string;
      shortcut: string;
      sort_order: number;
      active: boolean;
    }>,
  ): Observable<{ data: PlatformCannedReplyRow }> {
    return this.api.put<{ data: PlatformCannedReplyRow }>(`/platform/support/canned-replies/${id}`, payload);
  }

  activatePlatformCannedReply(id: number): Observable<{ data: PlatformCannedReplyRow }> {
    return this.api.post<{ data: PlatformCannedReplyRow }>(`/platform/support/canned-replies/${id}/activate`, {});
  }

  deactivatePlatformCannedReply(id: number): Observable<{ data: PlatformCannedReplyRow }> {
    return this.api.post<{ data: PlatformCannedReplyRow }>(`/platform/support/canned-replies/${id}/deactivate`, {});
  }

  getPlatformSupportAgents(): Observable<{ data: PlatformSupportAgentRow[] }> {
    return this.api.get<{ data: PlatformSupportAgentRow[] }>('/platform/support/agents');
  }

  getPlatformSupportInbox(params?: {
    status?: string;
    category?: string;
    priority?: string;
    assignee_user_id?: number | string;
    q?: string;
  }): Observable<{ data: { waiting_response: number; open: number; items: SupportTicket[] } }> {
    return this.api.get<{ data: { waiting_response: number; open: number; items: SupportTicket[] } }>(
      '/platform/support/tickets',
      params,
    );
  }

  getPlatformSupportTicket(id: number): Observable<{ data: SupportTicket }> {
    return this.api.get<{ data: SupportTicket }>(`/platform/support/tickets/${id}`);
  }

  replyPlatformSupportTicket(id: number, message: string, files?: File[]): Observable<{ data: SupportTicket }> {
    const list = files?.filter(Boolean) ?? [];
    if (list.length === 0) {
      return this.api.post<{ data: SupportTicket }>(`/platform/support/tickets/${id}/messages`, { message });
    }
    const form = new FormData();
    if (message.trim()) form.append('message', message);
    for (const file of list.slice(0, 3)) {
      form.append('files', file, file.name);
    }
    return this.api.postFormData<{ data: SupportTicket }>(`/platform/support/tickets/${id}/messages`, form);
  }

  downloadPlatformSupportAttachment(ticketId: number, attachmentId: number): Observable<Blob> {
    return this.api.getBlob(`/platform/support/tickets/${ticketId}/attachments/${attachmentId}`);
  }

  notePlatformSupportTicket(id: number, message: string): Observable<{ data: SupportTicket }> {
    return this.api.post<{ data: SupportTicket }>(`/platform/support/tickets/${id}/notes`, { message });
  }

  updatePlatformSupportTicket(
    id: number,
    payload: {
      status?: string;
      priority?: string;
      category?: string;
      assignee_user_id?: number | null;
    },
  ): Observable<{ data: SupportTicket }> {
    return this.api.post<{ data: SupportTicket }>(`/platform/support/tickets/${id}`, payload);
  }

  getRelationshipJourneys(): Observable<{ data: PlatformJourneysOverview }> {
    return this.api.get<{ data: PlatformJourneysOverview }>('/platform/relationship/journeys');
  }

  getRelationshipJourney(id: number): Observable<{ data: PlatformJourneyRow }> {
    return this.api.get<{ data: PlatformJourneyRow }>(`/platform/relationship/journeys/${id}`);
  }

  createRelationshipJourney(payload: {
    name: string;
    description?: string;
    entry_event: string;
    status?: string;
    config: PlatformJourneyConfig;
  }): Observable<{ data: PlatformJourneyRow }> {
    return this.api.post<{ data: PlatformJourneyRow }>('/platform/relationship/journeys', payload);
  }

  updateRelationshipJourney(
    id: number,
    payload: Partial<{
      name: string;
      description: string;
      entry_event: string;
      status: string;
      config: PlatformJourneyConfig;
    }>,
  ): Observable<{ data: PlatformJourneyRow }> {
    return this.api.put<{ data: PlatformJourneyRow }>(`/platform/relationship/journeys/${id}`, payload);
  }

  pauseRelationshipJourney(id: number): Observable<{ data: { id?: number; status?: string } }> {
    return this.api.post<{ data: { id?: number; status?: string } }>(
      `/platform/relationship/journeys/${id}/pause`,
      {},
    );
  }

  activateRelationshipJourney(id: number): Observable<{ data: { id?: number; status?: string } }> {
    return this.api.post<{ data: { id?: number; status?: string } }>(
      `/platform/relationship/journeys/${id}/activate`,
      {},
    );
  }

  getRelationshipTemplates(): Observable<{ data: PlatformMessageTemplateRow[] }> {
    return this.api.get<{ data: PlatformMessageTemplateRow[] }>('/platform/relationship/templates');
  }

  getRelationshipTemplate(id: number): Observable<{ data: PlatformMessageTemplateRow }> {
    return this.api.get<{ data: PlatformMessageTemplateRow }>(`/platform/relationship/templates/${id}`);
  }

  createRelationshipTemplate(payload: {
    name: string;
    channel?: string;
    category?: string;
    subject?: string;
    body: string;
    variables_json?: string[];
    status?: string;
  }): Observable<{ data: PlatformMessageTemplateRow }> {
    return this.api.post<{ data: PlatformMessageTemplateRow }>('/platform/relationship/templates', payload);
  }

  updateRelationshipTemplate(
    id: number,
    payload: Partial<{
      name: string;
      channel: string;
      category: string;
      subject: string;
      body: string;
      variables_json: string[];
      status: string;
    }>,
  ): Observable<{ data: PlatformMessageTemplateRow }> {
    return this.api.put<{ data: PlatformMessageTemplateRow }>(`/platform/relationship/templates/${id}`, payload);
  }

  pauseRelationshipTemplate(id: number): Observable<{ data: { id?: number; status?: string } }> {
    return this.api.post<{ data: { id?: number; status?: string } }>(
      `/platform/relationship/templates/${id}/pause`,
      {},
    );
  }

  activateRelationshipTemplate(id: number): Observable<{ data: { id?: number; status?: string } }> {
    return this.api.post<{ data: { id?: number; status?: string } }>(
      `/platform/relationship/templates/${id}/activate`,
      {},
    );
  }

  getRelationshipTasks(status?: string): Observable<{ data: PlatformOperationalTasksOverview }> {
    const params = status ? { status } : undefined;
    return this.api.get<{ data: PlatformOperationalTasksOverview }>('/platform/relationship/tasks', params);
  }

  createRelationshipTask(payload: {
    title: string;
    description?: string;
    priority?: string;
  }): Observable<{ data: { id?: number; status?: string; message?: string } }> {
    return this.api.post<{ data: { id?: number; status?: string; message?: string } }>(
      '/platform/relationship/tasks',
      payload,
    );
  }

  completeRelationshipTask(id: number): Observable<{ data: { id?: number; status?: string } }> {
    return this.api.post<{ data: { id?: number; status?: string } }>(
      `/platform/relationship/tasks/${id}/complete`,
      {},
    );
  }

  reopenRelationshipTask(id: number): Observable<{ data: { id?: number; status?: string } }> {
    return this.api.post<{ data: { id?: number; status?: string } }>(
      `/platform/relationship/tasks/${id}/reopen`,
      {},
    );
  }

  getPlatformAutomations(): Observable<{ data: PlatformAutomationsOverview }> {
    return this.api.get<{ data: PlatformAutomationsOverview }>('/platform/automations');
  }

  getPlatformAutomation(id: number): Observable<{ data: PlatformAutomationRow }> {
    return this.api.get<{ data: PlatformAutomationRow }>(`/platform/automations/${id}`);
  }

  createPlatformAutomation(payload: {
    name: string;
    description?: string;
    trigger_event: string;
    status?: string;
    config: PlatformAutomationConfig;
  }): Observable<{ data: PlatformAutomationRow }> {
    return this.api.post<{ data: PlatformAutomationRow }>('/platform/automations', payload);
  }

  updatePlatformAutomation(
    id: number,
    payload: Partial<{
      name: string;
      description: string;
      trigger_event: string;
      status: string;
      config: PlatformAutomationConfig;
    }>,
  ): Observable<{ data: PlatformAutomationRow }> {
    return this.api.put<{ data: PlatformAutomationRow }>(`/platform/automations/${id}`, payload);
  }

  getPlatformAutomationExecutions(): Observable<{ data: PlatformAutomationExecutionRow[] }> {
    return this.api.get<{ data: PlatformAutomationExecutionRow[] }>('/platform/automations/executions');
  }

  pausePlatformAutomation(id: number): Observable<{ data: { message?: string; id?: number; status?: string } }> {
    return this.api.post<{ data: { message?: string; id?: number; status?: string } }>(
      `/platform/automations/${id}/pause`,
      {},
    );
  }

  activatePlatformAutomation(id: number): Observable<{ data: { message?: string; id?: number; status?: string } }> {
    return this.api.post<{ data: { message?: string; id?: number; status?: string } }>(
      `/platform/automations/${id}/activate`,
      {},
    );
  }

  getJobSchedules(): Observable<{ data: PlatformScheduleRow[] }> {
    return this.getJobsOverview().pipe(
      map((res) => {
        const fromApi = res.data?.schedules;
        if (Array.isArray(fromApi) && fromApi.length > 0) {
          return { data: fromApi };
        }
        return { data: this.defaultJobSchedules(res.data) };
      }),
      catchError(() => of({ data: this.defaultJobSchedules(null) })),
    );
  }

  getJobSchedule(id: string): Observable<{ data: PlatformScheduleRow }> {
    return this.getJobSchedules().pipe(
      map((res) => {
        const found = (res.data ?? []).find((item) => item.id === id);
        if (!found) {
          throw new Error('Schedule não encontrado.');
        }
        return { data: found };
      }),
      catchError((err) => throwError(() => err)),
    );
  }

  /** Catálogo local — usado se a API ainda não devolver `schedules` no overview. */
  private defaultJobSchedules(overview?: PlatformJobsOverview | null): PlatformScheduleRow[] {
    const queueOn = overview?.queue_enabled !== false;
    const funnelOn = overview?.funnel_recovery_enabled !== false;
    const base = (row: Omit<PlatformScheduleRow, 'last_status'>): PlatformScheduleRow => ({
      ...row,
      last_status: 'unknown',
      last_run_at: null,
      last_message: null,
      last_duration_ms: null,
    });
    return [
      base({
        id: 'job-worker-poll',
        name: 'Worker da fila',
        description: 'Processa jobs pendentes (e-mails, PDF, webhooks).',
        cadence: 'a cada poucos segundos',
        timezone: 'America/Sao_Paulo',
        enabled: queueOn,
      }),
      base({
        id: 'automation-outbox-poll',
        name: 'Automation Engine (outbox)',
        description: 'Consome eventos de domínio e agenda ações de automações.',
        cadence: 'a cada poucos segundos',
        timezone: 'America/Sao_Paulo',
        enabled: true,
      }),
      base({
        id: 'journey-step-poll',
        name: 'Jornadas (passos agendados)',
        description: 'Executa passos de jornadas quando vencem.',
        cadence: 'a cada poucos segundos',
        timezone: 'America/Sao_Paulo',
        enabled: true,
      }),
      base({
        id: 'prune-organization-presence',
        name: 'Limpar presença online',
        description: 'Remove sessões online antigas das empresas.',
        cadence: 'todos os dias às 03:00',
        timezone: 'America/Sao_Paulo',
        enabled: true,
      }),
      base({
        id: 'notify-platform-billing',
        name: 'Avisos de cobrança',
        description: 'Notifica admins sobre assinaturas pendentes e faturas vencidas.',
        cadence: 'todos os dias às 08:00',
        timezone: 'America/Sao_Paulo',
        enabled: true,
      }),
      base({
        id: 'send-document-reminders',
        name: 'Lembretes de documento',
        description: 'Envia lembretes de envios de documento pendentes.',
        cadence: 'todos os dias às 09:00',
        timezone: 'America/Sao_Paulo',
        enabled: true,
      }),
      base({
        id: 'purge-inactive-people',
        name: 'Limpar pessoas inativas',
        description: 'Remove cadastros de pessoas inativos conforme retenção.',
        cadence: 'todos os dias às 04:15',
        timezone: 'America/Sao_Paulo',
        enabled: true,
      }),
      base({
        id: 'apply-protocol-retention',
        name: 'Retenção de protocolos',
        description: 'Aplica política de retenção/expurgo de protocolos.',
        cadence: 'todos os dias às 04:30',
        timezone: 'America/Sao_Paulo',
        enabled: true,
      }),
      base({
        id: 'purge-expired-form-imports',
        name: 'Limpar importações expiradas',
        description: 'Remove importações de fichas não concluídas após a janela de retenção.',
        cadence: 'todos os dias às 04:45',
        timezone: 'America/Sao_Paulo',
        enabled: true,
      }),
      base({
        id: 'sync-expired-trials',
        name: 'Sincronizar trials expirados',
        description: 'Atualiza status de organizações com período de teste vencido.',
        cadence: 'a cada hora',
        timezone: 'America/Sao_Paulo',
        enabled: true,
      }),
      base({
        id: 'recover-leads-funnel',
        name: 'Recuperação de funil',
        description: 'E-mails de onboarding parado, trial acabando e checkout abandonado.',
        cadence: 'todos os dias às 10:00',
        timezone: 'America/Sao_Paulo',
        enabled: funnelOn,
      }),
      base({
        id: 'platform-health-check',
        name: 'Health check da plataforma',
        description: 'Verifica saúde dos serviços e registra falhas.',
        cadence: 'a cada hora (minuto 5)',
        timezone: 'America/Sao_Paulo',
        enabled: true,
      }),
    ];
  }

  retryFailedJob(id: number): Observable<{ data?: { message?: string; job_id?: number }; message?: string }> {
    return this.api.post(`/platform/jobs/failed/${id}/retry`, {});
  }

  retryAllFailedJobs(jobType?: string | null): Observable<{ data?: { message?: string; retried?: number }; message?: string }> {
    return this.api.post('/platform/jobs/failed/retry-all', jobType ? { job_type: jobType } : {});
  }

  discardFailedJob(id: number): Observable<{ data?: { message?: string }; message?: string }> {
    return this.api.delete(`/platform/jobs/failed/${id}`);
  }

  discardPendingJob(id: number): Observable<{ data?: { message?: string }; message?: string }> {
    return this.api.delete(`/platform/jobs/pending/${id}`);
  }

  purgeEmailJobs(subjectFragment?: string | null): Observable<{ data?: { message?: string; removed?: number }; message?: string }> {
    return this.api.post('/platform/jobs/purge-emails', subjectFragment ? { subject_fragment: subjectFragment } : {});
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
