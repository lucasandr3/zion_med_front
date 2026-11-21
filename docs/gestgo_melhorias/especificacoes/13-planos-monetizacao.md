> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 13. EPIC BIL-09 — PLANOS, COBRANÇA E UPSELL

**Prioridade:** P1/P2, condicionada a evidência de demanda.

## 13.1. Estado documentado

O raio-X identifica `solo`/Gestgo Profissional R$ 97 mensal ativo, e `executive`/Gestgo Business R$ 247 mensal inativo no snapshot da auditoria; trial de 14 dias, boleto e PIX Asaas no fluxo encontrado, cobrança com webhook. O proprietário deseja reativar plano superior e multiempresa. Esses valores são **referências do repositório**, não confirmação de preços atuais de produção.

## 13.2. Política de evolução

- Manter para clientes atuais todos os direitos contratados; migração de preço/plano exige estratégia comunicada e consentimento quando aplicável.
- Definir **entitlements no backend**, não apenas esconder UI. Auditar limites existentes (`max_users`, `max_organizations_per_tenant`, `link_bio_enabled`), evitando divergência.
- Não atrelar core de importação de PDF a um paywall que destrua a promessa principal; upgrades devem adicionar conveniência/automação.
- Possíveis diferenciais de plano: WhatsApp oficial, automações, pacote documental, multiempresa, relatórios operacionais, integrações, limites de volume/custo (a testar).
- Custo variável de IA e WhatsApp deve ter franquias/cotas configuráveis e monitoramento.
- Avaliar suporte a cartão recorrente **após** medir abandono do checkout; não presumir que cartão resolve a conversão.

## 13.3. Fluxos de cobrança

- Upgrade, downgrade, cancelamento, inadimplência e grace period respeitam o estado atual do Asaas.
- Se usuário perder direito a novo recurso, documentos existentes continuam íntegros e acessíveis conforme contrato/política.
- Entitlements e configuração comercial editável pelo admin, com log de alterações e fallback.
- Billing nunca impede paciente de concluir um documento em andamento de forma incompatível com as regras já estabelecidas; preservar política atual de soft block salvo decisão explícita.

## 13.4. Validação de disposição a pagar

Entrevistar pagantes ativos e realizar pré-venda/compromisso de upgrade para uma automação específica, com pacote e preço definidos. Não criar plano Business com recursos fictícios ou ainda indisponíveis.

## 13.5. Critérios de aceite

- Mesmo entitlement é validado na UI e API; tentativa direta de acesso indevido falha com resposta consistente.
- Clientes de plano antigo não perdem acesso inesperadamente após deploy.
- Conta e organização corretas são cobradas, sem cross-tenant.
- Webhooks duplicados do Asaas não duplicam assinatura, fatura ou ativação.

---
