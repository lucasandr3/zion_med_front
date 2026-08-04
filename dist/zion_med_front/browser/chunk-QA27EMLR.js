// src/app/core/utils/status-labels-pt.ts
function normalizarChaveStatus(raw) {
  return raw.trim().toLowerCase().replace(/\s+/g, "_").replace(/-/g, "_");
}
var ASSINATURA_OU_COBRANCA = {
  active: "Ativo",
  inactive: "Inativo",
  trialing: "Em per\xEDodo de teste",
  trial: "Per\xEDodo de teste",
  past_due: "Em atraso",
  canceled: "Cancelado",
  cancelled: "Cancelado",
  unpaid: "N\xE3o pago",
  paid: "Pago",
  pending: "Pendente",
  incomplete: "Incompleto",
  incomplete_expired: "Expirado (pagamento incompleto)",
  paused: "Pausado",
  expired: "Expirado",
  ativo: "Ativo",
  inativo: "Inativo",
  blocked: "Cobran\xE7a bloqueada"
};
var FATURA = {
  pending: "Pendente",
  received: "Recebido",
  confirmed: "Confirmado",
  overdue: "Vencida",
  refunded: "Reembolsada",
  received_in_cash: "Recebido em dinheiro",
  refund_requested: "Reembolso solicitado",
  refund_in_progress: "Reembolso em andamento",
  chargeback_requested: "Contesta\xE7\xE3o solicitada",
  chargeback_dispute: "Em contesta\xE7\xE3o",
  awaiting_chargeback_reversal: "Aguardando revers\xE3o da contesta\xE7\xE3o",
  dunning_requested: "Negativa\xE7\xE3o solicitada",
  dunning_received: "Negativa\xE7\xE3o registrada",
  awaiting_risk_analysis: "Em an\xE1lise de risco",
  deleted: "Exclu\xEDda",
  restore: "Restaurada",
  paid: "Pago",
  unpaid: "N\xE3o pago"
};
function statusAssinaturaOuCobrancaPt(raw) {
  if (raw == null || raw === "")
    return "\u2014";
  const k = normalizarChaveStatus(raw);
  return ASSINATURA_OU_COBRANCA[k] ?? raw;
}
function statusFaturaPt(raw) {
  if (raw == null || raw === "")
    return "\u2014";
  const k = normalizarChaveStatus(raw);
  return FATURA[k] ?? ASSINATURA_OU_COBRANCA[k] ?? raw;
}

export {
  statusAssinaturaOuCobrancaPt,
  statusFaturaPt
};
//# sourceMappingURL=chunk-QA27EMLR.js.map
