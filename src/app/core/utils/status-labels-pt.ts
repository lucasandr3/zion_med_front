/** Normaliza chave vinda da API para lookup (ex.: "Past Due" → "past_due"). */
function normalizarChaveStatus(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/-/g, '_');
}

/** Assinatura / cobrança — valores comuns (gateways, Stripe, Asaas, etc.). */
const ASSINATURA_OU_COBRANCA: Record<string, string> = {
  active: 'Ativo',
  inactive: 'Inativo',
  trialing: 'Em período de teste',
  trial: 'Período de teste',
  past_due: 'Em atraso',
  canceled: 'Cancelado',
  cancelled: 'Cancelado',
  unpaid: 'Não pago',
  paid: 'Pago',
  pending: 'Pendente',
  incomplete: 'Incompleto',
  incomplete_expired: 'Expirado (pagamento incompleto)',
  paused: 'Pausado',
  expired: 'Expirado',
  ativo: 'Ativo',
  inativo: 'Inativo',
  blocked: 'Cobrança bloqueada',
};

/** Fatura / pagamento — comuns em Asaas e similares. */
const FATURA: Record<string, string> = {
  pending: 'Pendente',
  received: 'Recebido',
  confirmed: 'Confirmado',
  overdue: 'Vencida',
  refunded: 'Reembolsada',
  received_in_cash: 'Recebido em dinheiro',
  refund_requested: 'Reembolso solicitado',
  refund_in_progress: 'Reembolso em andamento',
  chargeback_requested: 'Contestação solicitada',
  chargeback_dispute: 'Em contestação',
  awaiting_chargeback_reversal: 'Aguardando reversão da contestação',
  dunning_requested: 'Negativação solicitada',
  dunning_received: 'Negativação registrada',
  awaiting_risk_analysis: 'Em análise de risco',
  deleted: 'Excluída',
  restore: 'Restaurada',
  paid: 'Pago',
  unpaid: 'Não pago',
};

/**
 * Exibe rótulo em português para status de assinatura ou cobrança vindos da API.
 * Valores não mapeados são devolvidos como recebidos (para não ocultar dados).
 */
export function statusAssinaturaOuCobrancaPt(raw: string | null | undefined): string {
  if (raw == null || raw === '') return '—';
  const k = normalizarChaveStatus(raw);
  return ASSINATURA_OU_COBRANCA[k] ?? raw;
}

/** Rótulo em português para status de fatura na listagem da plataforma. */
export function statusFaturaPt(raw: string | null | undefined): string {
  if (raw == null || raw === '') return '—';
  const k = normalizarChaveStatus(raw);
  return FATURA[k] ?? ASSINATURA_OU_COBRANCA[k] ?? raw;
}
