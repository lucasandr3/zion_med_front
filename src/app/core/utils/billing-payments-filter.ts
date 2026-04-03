/** Forma mínima de assinatura para decidir se ainda há ciclo ativo. */
export interface SubscriptionLike {
  status?: string;
  asaas_subscription_id?: string | null;
}

export interface OrgBillingSignals {
  subscription_status?: string | null;
  billing_status?: string | null;
}

export interface PaymentLike {
  status: string;
}

function temAssinaturaAtivaGerenciada(subs: SubscriptionLike[]): boolean {
  return subs.some(
    (s) => String(s.status ?? '').toLowerCase() === 'active' && !!s.asaas_subscription_id
  );
}

function isStatusPagamentoPendente(status: string): boolean {
  const st = String(status)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/-/g, '_');
  return (
    st === 'pending' ||
    st === 'open' ||
    st === 'awaiting_payment' ||
    st === 'unpaid' ||
    st === 'payment_pending'
  );
}

function contaSemAssinaturaAtivaEncerrada(org: OrgBillingSignals): boolean {
  const bs = String(org.billing_status ?? '').toLowerCase();
  const ss = String(org.subscription_status ?? '').toLowerCase();
  return (
    bs === 'blocked' ||
    ss === 'inactive' ||
    ss === 'canceled' ||
    ss === 'cancelled'
  );
}

/**
 * Após cancelamento, o back pode manter um pagamento PENDING com boleto na lista.
 * Não exibimos esses pendentes quando não há assinatura ativa e a org está bloqueada/inativa,
 * exceto no fluxo explícito de “primeiro pagamento” (`show_pending_first_payment`).
 */
export function filterPaymentsWhenSubscriptionCanceled<T extends PaymentLike>(
  payments: T[],
  opts: {
    subscriptions: SubscriptionLike[];
    organization: OrgBillingSignals | null | undefined;
    showPendingFirstPayment: boolean;
  }
): T[] {
  if (opts.showPendingFirstPayment) return payments;
  if (temAssinaturaAtivaGerenciada(opts.subscriptions)) return payments;
  const org = opts.organization;
  if (!org || !contaSemAssinaturaAtivaEncerrada(org)) return payments;
  return payments.filter((p) => !isStatusPagamentoPendente(p.status));
}
