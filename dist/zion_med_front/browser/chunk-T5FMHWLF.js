// src/app/core/utils/billing-ui.ts
function legacyBillingUiFromSubscriptions(subscriptions) {
  const active = subscriptions.some((s) => String(s.status).toLowerCase() === "active" && !!s.asaas_subscription_id);
  return {
    show_managed_subscription_card: active,
    show_pending_first_payment: false,
    show_plan_selection: !active,
    pending_first_payment_message: null
  };
}
function normalizeBillingUi(fromApi, subscriptions) {
  if (fromApi && typeof fromApi.show_managed_subscription_card === "boolean" && typeof fromApi.show_plan_selection === "boolean") {
    return {
      show_managed_subscription_card: fromApi.show_managed_subscription_card,
      show_pending_first_payment: !!fromApi.show_pending_first_payment,
      show_plan_selection: fromApi.show_plan_selection,
      pending_first_payment_message: fromApi.pending_first_payment_message ?? null
    };
  }
  return legacyBillingUiFromSubscriptions(subscriptions);
}

export {
  normalizeBillingUi
};
//# sourceMappingURL=chunk-T5FMHWLF.js.map
