/** Espelha o objeto `billing_ui` da API (GET /billing e configurações). */
export interface BillingUi {
  show_managed_subscription_card: boolean;
  show_pending_first_payment: boolean;
  show_plan_selection: boolean;
  pending_first_payment_message: string | null;
}

function legacyBillingUiFromSubscriptions(
  subscriptions: Array<{ status?: string; asaas_subscription_id?: string | null }>
): BillingUi {
  const active = subscriptions.some(
    (s) => String(s.status).toLowerCase() === 'active' && !!s.asaas_subscription_id
  );
  return {
    show_managed_subscription_card: active,
    show_pending_first_payment: false,
    show_plan_selection: !active,
    pending_first_payment_message: null,
  };
}

/** Garante `billing_ui` quando a API ainda não envia (deploy antigo do backend). */
export function normalizeBillingUi(
  fromApi: Partial<BillingUi> | null | undefined,
  subscriptions: Array<{ status?: string; asaas_subscription_id?: string | null }>
): BillingUi {
  if (
    fromApi &&
    typeof fromApi.show_managed_subscription_card === 'boolean' &&
    typeof fromApi.show_plan_selection === 'boolean'
  ) {
    return {
      show_managed_subscription_card: fromApi.show_managed_subscription_card,
      show_pending_first_payment: !!fromApi.show_pending_first_payment,
      show_plan_selection: fromApi.show_plan_selection,
      pending_first_payment_message: fromApi.pending_first_payment_message ?? null,
    };
  }
  return legacyBillingUiFromSubscriptions(subscriptions);
}
