> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 2. ESTADO ATUAL VERIFICADO E LIMITES

O diagnóstico abaixo é derivado da auditoria de repositórios, não de confirmação de produção. Toda nova implementação exige rechecagem no HEAD atual.

| Área | O que a auditoria encontrou | Implicação para a evolução |
|---|---|---|
| Frontend | Angular 21, SPA `zion_med_front`, UI Nord Health/Tailwind, `pdf-lib`, `pdfjs`, `html2pdf` | Evoluir o editor dentro da SPA existente |
| Backends | `zion_med` Laravel 12 e `gestgo_api` Spring Boot 3.5, ambos contrato `/api/v1` | **Decisão tomada:** Java (`gestgo_api`) é o alvo de novas implementações. Laravel é referência de comportamento e fonte de paridade/contingência na transição |
| Templates | CRUD, campos, ordenação, condições, TCLE, publicação, versionamento | Reutilizar schema e motor de templates |
| PDF original | `templates-aparencia-pdf`, `SourcePdfFillService`, FPDI | Preservar geração existente; inspecionar formato de coordenadas |
| IA de importação | `/form-imports`, `ProcessFormImportJob`, OpenAI configurável | Não assumir que detecta coordenadas; auditar antes de propor modelo novo |
| Público | `/f/:token`, identidade, assinatura canvas, OTP reforçado, PDF e cópia 72h | Não reimplementar; manter compatibilidade |
| Protocolos | PDF, dossiê ZIP, SHA-256, eventos, revisão, reconsentimento | Manter snapshots e evidências imutáveis |
| Pessoas | CRUD, histórico, prefill e reconsentimento | Expandir experiência de reutilização, não duplicar cadastro |
| Envios | E-mail/WhatsApp no código, status, reenvio, lembretes schedule | Investigar o que é real e o que está oculto; evitar divulgar integração inexistente |
| WhatsApp | Evolution controller no código, fluxo comercial nativo não confirmado | Projetar canal oficial futuro como integração independente |
| Agenda | Interna/pública, serviços, vínculo reserva → ficha | Acrescentar gatilhos sem construir novo calendário |
| Billing | Trial 14 dias; Asaas PIX/boleto; `solo` R$ 97; `executive` R$ 247 inativo | Melhorar entitlements sem quebrar clientes existentes |
| Integrações | Feegow existente; Trinks/Clinicorp/NinSaúde parciais; outbound webhooks/tokens | Uma integração real por vez, com testes de ponta a ponta |
| Utilitários | UI; Java tem ferramentas; Laravel não encontrado; homolog habilitada segundo proprietário | Avaliar uso, sem elevar isso acima do core |
| Mobile `/m` | UI/rotas, flag prod desligada | Não ativar automaticamente |
| Plataforma | Tenants, planos, leads, tráfego, cobrança, logs, feedback, settings | Reaproveitar para telemetria e operação |
| Go Assistant | Assistente não-LLM, adapter LLM desligado | Não colocar LLM em produção sem caso de uso definido |
| Monitoramento | Documentação de CI/CD/monitoramento; ErrorHub desligado nos environments commitados | Verificar ambiente real e completar sinalização de erros críticos |

### Lacunas de conhecimento que não podem ser presumidas

1. Qual backend serve atualmente `api.gestgo.com.br` não foi comprovado na auditoria. **A escolha de Java como backend canônico futuro foi confirmada pelo proprietário; produção e data de cutover continuam não verificadas.**
2. Não foram verificados tempos de configuração, taxas de erro, uso por tela, custos da IA, incidentes, churn ou MRR real.
3. A importação IA de fichas existe, mas não há comprovação no raio-X de detecção automática de **posição** no PDF.
4. Os campos do PDF são posicionados manualmente hoje, conforme o proprietário. O número de campos varia bastante entre fichas.
5. Envios e integrações estão parcialmente ocultos **deliberadamente** porque ainda não há integração nativa WhatsApp e integrações reais suficientes, conforme o proprietário.
6. O proprietário pretende reativar comercialmente planos superiores/multiempresa, mas não há escopo comercial final aprovado.
7. O proprietário **não quer** unificação automática dos CTAs e chaves do site com as páginas internas do SPA.
8. Há CI/CD e monitoramento adicionais em operação, segundo o proprietário; o escopo exato ainda precisa ser auditado.

**Diretriz técnica vinculante:** para mudanças de backend, mirar exclusivamente `gestgo_api` (Java); validar o comportamento Laravel, a paridade dos contratos Angular e o backend ativo no ambiente antes de cada PR.

**Etiqueta obrigatória nos tickets:** EXISTENTE / ESTENDER / NOVO / PARCIAL / NÃO VERIFICADO. Antes de criar arquivos, o Cursor deve localizar a implementação correspondente e justificar o delta.

---
