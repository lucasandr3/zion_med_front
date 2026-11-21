> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 19. DEPENDÊNCIAS E GATES

| Epic | Pré-requisito técnico | Pré-requisito comercial | Rollback |
|---|---|---|---|
| PDF-01A | Encontrar editor/schema atual | Baseline de tempo/erros | Voltar ao editor antigo/feature flag |
| PDF-01B/C | Validação coords + teste PDF | Evidência de fricção no mapeamento | Desligar sugestões, manter manual |
| DOC-02 | Fixtures/testes sintéticos | Não precisa de upsell | Reverter mudanças sem tocar histórico |
| MSG-03A | Auditoria envios/link | Uso de compartilhamento | Voltar a copy-link/e-mail |
| MSG-03B | Meta/identidade por organização, filas, webhooks | Pré-venda/uso/custos | Desligar envio automático, manter manual |
| UX-04 | Rotas e onboarding atuais | Conversão trial/ativação | Feature flag de UI |
| PAC-05 | Pessoa + prefill + histórico | Retorno recorrente demonstrado | Desligar prefill avançado |
| AUT-06 | Templates + envio + versionamento | Compromissos pagos | Execução manual preservada |
| AGD-07 | Agenda/serviço/vínculo atual | Adoção da agenda | Desligar gatilhos automáticos |
| MKT-08 | Site/analytics | Search Console + funil | Reverter páginas/mensagens |
| BIL-09 | Entitlements API + Asaas | Aceite de oferta premium | Manter grandfathering |
| INT-10 | API/contrato provedor | Cliente piloto | Desativar sync, manter manual |
| OPS-11 | Java canônico + paridade `/api/v1` + testes/monitoramento | Continuidade dos pagantes | Rollback de tráfego/deploy/flag, sem perder histórico |
| BI-12 | Eventos seguros | Baseline | Desativar eventos sem afetar fluxo |

---
