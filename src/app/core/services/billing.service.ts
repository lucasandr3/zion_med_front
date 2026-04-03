import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { BillingUi, normalizeBillingUi } from '../utils/billing-ui';

export interface Plano {
  name: string;
  value: number;
  description?: string;
}

/** Plano com chave (plan_key) para envio à API. */
export interface PlanoComChave extends Plano {
  key: string;
}

export interface Subscription {
  id: number;
  asaas_subscription_id: string | null;
  plan_key: string;
  status: string;
  next_due_date: string | null;
  created_at?: string;
}

export interface BillingOrganization {
  id: number;
  plan_key: string | null;
  subscription_status: string | null;
  billing_status: string | null;
  trial_ends_at?: string | null;
  /** Trial em andamento (API pode enviar mesmo com subscription_status active após cadastro). */
  is_on_trial?: boolean;
}

/** @deprecated Use BillingOrganization */
export type BillingClinic = BillingOrganization;

export interface BillingPayment {
  id: number;
  status: string;
  due_date: string;
  paid_at?: string;
  value: number;
  bank_slip_url?: string | null;
}

export interface BillingState {
  organization: BillingOrganization | null;
  /** @deprecated Use organization */
  clinic?: BillingOrganization | null;
  billing_ui: BillingUi;
  /** Planos: objeto com chave = plan_key. Normalize para array com .key no componente. */
  plans: Record<string, Plano>;
  subscriptions: Subscription[];
  payments: BillingPayment[];
  asaas_configured: boolean;
}

interface ApiResponse {
  data: BillingState & { billing_ui?: BillingUi };
}

@Injectable({ providedIn: 'root' })
export class BillingService {
  private api = inject(ApiService);

  get(): Observable<BillingState> {
    return this.api.get<ApiResponse>('/billing').pipe(
      map((r) => {
        const d = r.data as BillingState & { clinic?: BillingOrganization | null; billing_ui?: BillingUi };
        const organization = d.organization ?? d.clinic ?? null;
        const subscriptions = d.subscriptions ?? [];
        const billing_ui = normalizeBillingUi(d.billing_ui, subscriptions);
        return {
          ...d,
          organization,
          subscriptions,
          payments: (d.payments ?? []) as BillingPayment[],
          billing_ui,
        };
      })
    );
  }

  /** Cria assinatura para o plano (plan_key). */
  checkout(planKey: string): Observable<{ data?: { message?: string; subscription_id?: number; plan_key?: string; next_due_date?: string } }> {
    return this.api.post<{ data?: { message?: string; subscription_id?: number; plan_key?: string; next_due_date?: string } }>(
      '/billing/checkout',
      { plan_key: planKey }
    );
  }

  /** Cancela a assinatura. */
  cancelSubscription(subscriptionId: number): Observable<{ data?: { message?: string } }> {
    return this.api.post<{ data?: { message?: string } }>(
      `/billing/subscriptions/${subscriptionId}/cancel`,
      {}
    );
  }

  /** Troca de plano (cancela atual e cria nova com plan_key). */
  changePlan(planKey: string): Observable<{ data?: { message?: string; subscription_id?: number; plan_key?: string; next_due_date?: string } }> {
    return this.api.post<{ data?: { message?: string; subscription_id?: number; plan_key?: string; next_due_date?: string } }>(
      '/billing/change-plan',
      { plan_key: planKey }
    );
  }
}
