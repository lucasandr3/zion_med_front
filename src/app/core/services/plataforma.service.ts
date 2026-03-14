import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
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
  created_at?: string;
}

export interface PlatformTenantDetail {
  tenant: { id: number; name: string; slug: string; created_at?: string };
  clinics: {
    id: number;
    name: string;
    address?: string;
    plan_key?: string | null;
    subscription_status?: string | null;
    billing_status?: string | null;
    users_count: number;
  }[];
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

export interface PlatformSettingsData {
  product_name: string;
  base_url?: string | null;
  trial_days: number;
  grace_days: number;
  block_mode: string;
  multi_empresa_plan: string;
  api_configured: boolean;
  service_status: string;
  service_status_severity: string;
  service_status_message: string;
  service_status_components: Record<string, string>;
  component_options?: Record<string, string>;
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

@Injectable({ providedIn: 'root' })
export class PlataformaService {
  private api = inject(ApiService);

  getDashboard(): Observable<{ data: PlatformDashboardData }> {
    return this.api.get<{ data: PlatformDashboardData }>('/platform/dashboard');
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
    return this.api.get<{ data: PlatformSubscription[] }>('/platform/subscriptions');
  }

  getInvoices(): Observable<{ data: PlatformInvoice[] }> {
    return this.api.get<{ data: PlatformInvoice[] }>('/platform/invoices');
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
  }): Observable<unknown> {
    return this.api.put('/platform/settings', payload);
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
