> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 16. EPIC BI-12 — MÉTRICAS DE PRODUTO E FUNIL

**Prioridade:** P0.  
**Meta:** identificar se atrito principal está no onboarding, no mapeamento, no envio, na assinatura ou na cobrança.

## 16.1. Taxonomia sugerida (eventos anonimizados)

| Evento | Momento | Propriedades permitidas |
|---|---|---|
| `trial_started` | Criou conta trial | canal, campanha, especialidade declarada, timestamp |
| `pdf_import_started` | Iniciou upload | quantidade de páginas/faixa de tamanho, origem PDF |
| `pdf_import_finished` | PDF processado | sucesso/erro, duração, páginas |
| `mapping_first_edit` | Primeira ação de posicionar | tipo de campo, página, modo manual/assistido |
| `mapping_suggestions_shown` | Recebeu propostas IA | sugestões por tipo, duração, custo aproximado |
| `mapping_suggestions_reviewed` | Revisão | quantidade aceita/editada/rejeitada |
| `template_published` | Publicou modelo | quantidade de campos, páginas, nicho da organização |
| `document_share_initiated` | Clicou para compartilhar | canal, sem telefone |
| `document_send_provider_status` | Status de envio | canal, status, erro sem payload sensível |
| `first_protocol_completed` | Primeira conclusão da organização | dias desde cadastro, tipo de fluxo |
| `subscription_activated` | Pagamento confirmado | plano, ciclo, valor líquido/bruto conforme backend |
| `subscription_canceled` | Cancelamento | categoria de motivo, plano, coorte |

**Não coletar:** nome, CPF, telefone, e-mail, resposta clínica, texto da ficha, conteúdo da assinatura, token público, URL com token ou identificador do paciente em ferramentas de marketing.

## 16.2. Relatórios internos

1. Funil por canal e especialidade: visita → trial → PDF importado → template publicado → protocolo concluído → pagante.
2. Tempo para primeiro valor; distribuição p50/p75/p90.
3. Mapeamento por complexidade: até 10, 11–30, 31–60, mais de 60 campos.
4. Coortes mensais: uso e retenção, com números absolutos, não apenas percentuais.
5. Custos de suporte por organização; falhas de importação/PDF.
6. MRR, expansão, cancelamentos, descontos, inadimplência e margem por funcionalidades com custo variável.

## 16.3. Método de instrumentação

- Reutilizar dashboard plataforma e fontes existentes, se adequados.
- Eventos técnicos idempotentes para evitar dupla contagem em retries.
- Não contar edição de campo ou visita à tela como ativação efetiva.
- Associar eventos de marketing ao trial com identificadores de atribuição seguros, respeitando consentimento e configurações de privacidade.

## 16.4. Critérios de aceite

- Métricas batem com registros operacionais em amostras controladas.
- Sem dados sensíveis no analytics.
- Quedas de funil podem ser identificadas por especialidade e origem de aquisição sem expor pacientes.

---
