# GESTGO — PLANO MESTRE DE EVOLUÇÃO DO PRODUTO

**Versão:** 1.1 — decisão arquitetural: Spring Boot (Java)  
**Data-base:** 19/11/2026  
**Natureza:** PRD + especificação funcional e técnica + roadmap + instruções de execução no Cursor  
**Status:** PROPOSTA PARA REVISÃO E IMPLEMENTAÇÃO GRADUAL — não representa funcionalidades já implementadas.  
**Fonte primária:** `raiox.md`, auditoria dos repositórios realizada em 19/11/2026.  
**Fonte de produto:** esclarecimentos do proprietário do Gestgo nesta conversa.  
**Decisão arquitetural confirmada em 19/11/2026:** `gestgo_api` (Spring Boot / Java 21) é o **backend canônico escolhido para as próximas evoluções**. A decisão não comprova que Java já esteja respondendo em produção.

> **REGRA MAIS IMPORTANTE PARA O CURSOR:** Este documento NÃO autoriza implementar tudo de uma vez. Ele documenta todo o escopo de evolução de uma vez, mas a execução deverá ser por etapas pequenas, com diagnóstico prévio do código, testes, feature flags e aprovação explícita para cada lote de alterações. O Gestgo é um SaaS em operação, não um MVP.

---

## 0. ÍNDICE

1. Resumo executivo e princípios de produto
2. Estado atual verificado e limites do diagnóstico
3. Personas, problema central, jornadas e métricas de negócio
4. Priorização e regras de decisão
5. EPIC PDF-01 — Mapeador Inteligente de PDF
6. EPIC DOC-02 — Qualidade, versionamento e confiabilidade documental
7. EPIC MSG-03 — Envio e automação pelo WhatsApp
8. EPIC UX-04 — Experiência do profissional solo e onboarding
9. EPIC PAC-05 — Pacientes recorrentes, reaproveitamento e revalidação
10. EPIC AUT-06 — Protocolos documentais e pendências por procedimento
11. EPIC AGD-07 — Agenda, serviços e gatilhos documentais
12. EPIC MKT-08 — Site, SEO, demonstrações e funil de aquisição
13. EPIC BIL-09 — Planos, cobrança e expansão de receita
14. EPIC INT-10 — Integrações com software clínico e webhooks
15. EPIC OPS-11 — Arquitetura, confiabilidade, LGPD e observabilidade
16. EPIC BI-12 — Telemetria de produto e métricas comerciais
17. EPIC FUT-13 — Multiempresa, mobile, utilitários e assistente
18. Roadmap executivo de 90 dias e horizonte posterior
19. Matriz de dependências e gates de lançamento
20. Critérios transversais de qualidade e testes
21. Checklist de discovery técnico para o Cursor
22. Instrução operacional / prompt para o Cursor
23. Pendências e decisões do proprietário
24. Referências e terminologia

---

# 1. RESUMO EXECUTIVO E PRINCÍPIOS

## 1.1. O que é o Gestgo

O Gestgo é um **SaaS B2B em operação comercial**, com **25 clientes pagantes**, sobretudo **profissionais solo de estética e odontologia**, adquiridos principalmente por **Google/SEO/site** e com **uso recorrente pela maioria** (informação do proprietário; métricas quantitativas ainda não extraídas).

Seu **core comercial real**, confirmado pelo proprietário, é:

> Uma clínica ou profissional pode usar a ficha que já possui em papel, disponibilizar o documento para mapeamento de campos e permitir que o paciente preencha e assine digitalmente; o Gestgo aplica os dados ao documento original, preservando seu layout.

É importante não reposicionar o produto como “criador genérico de formulários” ou “ERP de clínica”. O editor de formulários e outras ferramentas são **meios**; o benefício principal é **digitalizar, assinar e organizar o documento que a clínica já usa**, sem reinventar seu processo.

## 1.2. Objetivos da evolução

1. Tornar mais rápida e confiável a digitalização de PDFs já utilizados pelas clínicas.
2. Simplificar a jornada: importar → mapear → publicar → enviar → acompanhar → recuperar o documento assinado.
3. Reduzir trabalho manual de comunicação com pacientes, inicialmente com compartilhamento simples e depois com automações controladas.
4. Melhorar retorno de pacientes recorrentes, sem alterar documentos assinados.
5. Elevar aquisição e conversão orgânica, sobretudo em estética e odontologia solo.
6. Evoluir monetização com funcionalidades que entreguem ganho operacional verificável.
7. Proteger a confiabilidade, a privacidade e a continuidade de operação dos 25 clientes existentes.
8. Manter a complexidade de suporte compatível com uma operação solopreneur.

## 1.3. O que NÃO é objetivo

- Reescrever o Gestgo do zero.
- Criar uma nova plataforma de formulários desconectada do código existente.
- Substituir prontuário eletrônico ou criar ERP, financeiro completo, TISS ou telemedicina.
- Disponibilizar automações WhatsApp sem infraestrutura, opt-in e políticas oficiais verificadas.
- Fazer o corte de produção para Java sem verificar a paridade funcional, a consistência documental, a integridade dos dados e um rollback testado.
- Reprecificar automaticamente clientes existentes.
- Introduzir IA que publique ou assine documentos sem validação humana.
- Alterar snapshots, hashes ou provas de documentos históricos.

## 1.4. Regras de produto

- **Preservar o papel transformado em PDF:** layout original e posicionamento correto são prioridades.
- **Correção humana soberana:** toda sugestão automática é editável; nenhuma sugestão da IA deve ser considerada juridicamente ou clinicamente correta sem revisão.
- **Reutilizar o existente:** `form-imports`, `SourcePdfFillService` e demais recursos identificados no Laravel são **referências funcionais**; verificar se equivalentes já existem no `gestgo_api` antes de implementar no Java. Reutilizar templates, assinaturas, documentos, envios, pessoas, agenda, billing, webhooks e analytics quando compatíveis.
- **Backend canônico:** novas regras, endpoints, jobs e integrações de backend devem ser planejados para `gestgo_api` (Java/Spring Boot). `zion_med` (Laravel) permanece referência e possível contingência temporária, não destino de novas funcionalidades.
- **Produção ainda não certificada:** verificar qual serviço atende `api.gestgo.com.br` e só migrar tráfego com matriz de paridade, homologação e rollback comprovados.
- **Projetar por organização:** todo recurso persistente deve respeitar `Tenant → Organization`, RBAC e escopo de dados.
- **Progressive disclosure:** profissional solo vê primeiro apenas ações fundamentais.
- **Feature flags e rollout:** liberar por conta/grupo, com rollback e observabilidade.
- **Não expor dados clínicos em marketing, analytics ou mensagens genéricas.**
- **Negócio antes de expansão:** medir conversão, ativação, uso e custo de suporte.

---

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

# 3. PERSONAS, JORNADAS E MÉTRICAS

## 3.1. ICP primário

**Profissional solo de estética ou odontologia** que já possui fichas próprias em papel ou PDF, precisa coletar preenchimento e assinatura, deseja manter o layout e prefere operação sem equipe administrativa.

## 3.2. ICP secundário (expansão)

Clínicas pequenas com recepção, vários profissionais e eventualmente unidades. Só abordar funcionalidades mais complexas conforme evidências de demanda e maior disposição de pagamento.

## 3.3. Jornada central desejada

1. Visitante entende em segundos que pode **usar sua ficha atual**.
2. Cria conta e seleciona especialidade (opcional, sem bloquear).
3. Importa um PDF original, ou escolhe modelo pronto.
4. O sistema detecta campos existentes e/ou oferece edição manual; o profissional confirma os mapeamentos.
5. Testa o PDF com dados fictícios.
6. Publica uma versão de template, gera link ou seleciona pessoa.
7. Envia pelo canal disponível (link/manual e-mail; WhatsApp oficial quando conectado).
8. Paciente preenche e assina, com o nível de segurança vigente.
9. PDF original preenchido e trilha documental são produzidos.
10. Profissional encontra, confere e reutiliza o fluxo em atendimentos futuros.

## 3.4. Métricas estratégicas

- **North Star sugerida:** organizações pagantes com pelo menos um protocolo concluído no período de 30 dias, acompanhada do volume de protocolos por organização (não é métrica existente confirmada).
- Tempo da importação até a **primeira ficha publicável**.
- Tempo e taxa de correção do mapeamento por tamanho/complexidade da ficha.
- Taxa de primeira ficha enviada e primeira ficha assinada no trial.
- Conversão visita → cadastro → primeira assinatura → pagante.
- Uso recorrente, churn por coorte, receita recorrente real, custo de suporte por cliente.
- WhatsApp: entregas confirmadas, erros, custo por envio, desativação/opt-out e impacto sobre conclusão.

**Guardrail:** nenhuma métrica analítica deve expor CPF, nome, respostas de saúde, imagens clínicas ou PDF em serviços externos de analytics.

---

# 4. PRIORIZAÇÃO

## 4.1. Critérios

Pontuar cada iniciativa de 1 a 5 em: impacto no core, redução de tempo, potencial de receita, efeito sobre aquisição/retenção, reutilização de código, custo técnico, custo operacional, suporte e risco regulatório. A priorização final depende de dados da base pagante, não apenas de opinião.

## 4.2. Ordem recomendada — proposta inicial

| Ordem | Iniciativa | Fase | Motivo | Status atual conhecido |
|---|---|---|---|---|
| 0 | Instrumentação de fluxo/erros e baseline | Agora | Não melhorar às cegas | Parcial/não verificado |
| 1 | Editor manual: precisão, atalhos, duplicação, preview | Agora | Valor imediato para fichas pequenas e grandes | Estender |
| 2 | Detecção assistida de posições e campos | Após baseline | Diferenciação e redução de configuração | Novo/parcial a confirmar |
| 3 | Experiência solo + onboarding com ficha própria | Agora | Mais trial → primeiro valor | Estender |
| 4 | WhatsApp manual e status de envio | Agora, se canal existente suportar | Baixo custo e pouca fricção | Estender |
| 5 | WhatsApp oficial por número da clínica | Condicional | Automação e possível upsell | Novo/integração não verificada |
| 6 | Pacientes recorrentes e packs de documentos | Após validar | Aumentar eficiência | Estender |
| 7 | Gatilhos de procedimento/agenda | Após validar | Menos trabalho recorrente | Estender |
| 8 | SEO e site por especialidade | Em paralelo | Escalar canal que já converte | Estender marketing |
| 9 | Business e plano de expansão | Após evidência de upgrade | Aumentar ARPA | Parcial |
| 10 | PMS/ERP específico, multiempresa | Depois | Expandir mercado e retenção | Parcial |
| 11 | Mobile `/m`, novos utilitários, LLM assistente | Aguardar uso | Fora da dor central | Parcial/desligado |

**Não confundir:** documentação consolidada ≠ escopo de sprint. Cada epic pode produzir vários PRs.

---

# 5. EPIC PDF-01 — MAPEADOR INTELIGENTE DE PDF

**Prioridade:** P0/P1 (manual primeiro, IA depois).  
**Status base:** mapeamento manual existe; importação IA de fichas e geração de PDF a partir de PDF original existem. Posicionamento automático não confirmado.  
**Persona:** profissional que dispõe de ficha em papel/PDF e quer digitalizá-la sem recriar o layout.  
**Resultado de negócio:** reduzir tempo até publicação, erros de posicionamento, abandono do onboarding e tickets de suporte.

## 5.1. Definição do problema

Atualmente, o profissional posiciona manualmente campos no documento. A ficha pode ter poucos ou muitos campos e várias páginas. Quanto mais extensa, maior o esforço e a chance de erro. É necessário elevar produtividade sem retirar controle do usuário.

## 5.2. Princípio de experiência

**Importar → Detectar (opcional) → Revisar → Pré-visualizar → Publicar.** A detecção não poderá impedir o mapeamento manual nem modificar o documento original armazenado.

## 5.3. Recursos — etapa A, produtividade manual

**PDF-01A.1 — Editor responsivo com zoom e pan**
- Zoom controlado (ex.: ajustar à página, largura, 100%, 150%, 200%), preservando coordenadas no PDF e na viewport.
- Navegação por páginas (miniaturas + página atual), indicadores de campos por página.
- Evitar perda de seleção/posição em resize, zoom e mudanças de orientação.

**PDF-01A.2 — Manipulação precisa de campos**
- Arrastar/soltar, redimensionar com alças, movimentar por teclas de seta, snap configurável, guias, alinhamento e distribuição.
- Duplicar campo mantendo tipo/estilo/regras; ao duplicar, gerar ID único e não referenciar indevidamente mesmo valor de negócio.
- Copiar/colar, selecionar múltiplos, mover em lote, exclusão com confirmação apropriada.
- Desfazer/refazer no editor sem depender de múltiplas chamadas HTTP por pixel movimentado.
- Lista lateral acessível com filtro por página, tipo, nome e estado de mapeamento.
- Comandos de teclado documentados e compatíveis com foco/accessibilidade.

**PDF-01A.3 — Validação e simulação**
- Prévia **do PDF final real** utilizando dados fictícios/sintéticos: nome, data, checkbox, assinatura simulada com indicação de prévia.
- Validar campo fora da página, valores sobrepostos, dimensões mínimas, mapeamento duplicado incoerente, font size/overflow e páginas sem mapeamento esperado.
- Indicar claramente warnings versus erros impeditivos; não bloquear publicação por detecções probabilísticas.

**PDF-01A.4 — Salvamento e resilência**
- Autosave de rascunho com debounce, sinalização de estado e recuperação após falha/reload.
- Controle de concorrência otimista para evitar overwrite quando duas abas editam mesmo modelo.
- Publicação atômica com snapshot; edição de modelo publicado cria nova versão conforme contrato atual.

## 5.4. Recursos — etapa B, detecção não-LLM

1. Inspecionar PDF: páginas, tamanho, rotação, caixas de página, texto, anotações e campos AcroForm existentes.
2. Priorizar extração **determinística** quando PDF for digital e possuir widgets ou estrutura aproveitável.
3. Gerar sugestões de caixas de entrada perto de labels, linhas em branco, checkboxes e assinaturas, identificando confidência/ambiguidade.
4. Manter suporte a PDFs escaneados: sem texto pesquisável, informar claramente que o modo automático pode requerer OCR/visão (etapa C).
5. Não inventar campos; manter sugestões distinguíveis de campos aprovados.

## 5.5. Recursos — etapa C, IA para posicionamento

### Input

PDF **em branco** fornecido pela organização; páginas rasterizadas para análise quando necessário; eventual texto extraído; metadados de dimensões/rotação; tipos suportados pelo editor. **Não usar documentos preenchidos com dados de pacientes como treinamento nem como input externo por padrão.**

### Output — contrato lógico proposto, adaptar ao schema existente

```json
{
  "document_id": "example",
  "version": 1,
  "pages": [
    {
      "page": 1,
      "page_width": 595,
      "page_height": 842,
      "rotation": 0,
      "suggestions": [
        {
          "temporary_id": "sug-001",
          "label": "Nome completo",
          "field_type": "text",
          "semantic_key": "person.full_name",
          "bounding_box_normalized": { "x": 0.13, "y": 0.19, "w": 0.70, "h": 0.035 },
          "confidence": 0.92,
          "source": "pdf_text_or_vision",
          "needs_review": true
        }
      ]
    }
  ]
}
```

**AVISO:** contrato acima é ilustrativo. **Não criar endpoints, tabelas ou nomes de campo antes de identificar os contratos usados no editor e na API atual.** Manter versão do schema e adaptadores para compatibilidade.

### Normalização de coordenadas

- Definir uma convenção canônica, por exemplo caixa normalizada de 0 a 1 no sistema de coordenadas da página visual já considerando rotação. **O Cursor deve verificar o sistema existente antes de escolher.**
- Conversões PDF ↔ viewport devem considerar origem superior/inferior, crop box, media box, rotação de 0/90/180/270°, fator de escala, densidade e margens.
- Persistir coordenadas compatíveis com `SourcePdfFillService`; nunca converter duas vezes.
- Campos precisam permanecer dentro do limite de suas páginas e manter estabilidade entre zooms.
- Testar PDFs A4, Carta, paisagem, rotacionados, páginas com dimensões variadas e documentos escaneados.

### Segurança/privacidade e custo

- Processamento assistido deve ser **opt-in**, configurável por organização/plano e com fallback manual.
- Antes de enviar um PDF a um provedor de IA, validar finalidade, tratamento contratual, retenção, transferências e base legal pertinente; registrar provedor e versão do modelo.
- Evitar conteúdo clínico identificável em prompts e logs; redigir ou bloquear entradas sensíveis que não sejam fichas em branco.
- Processamento assíncrono, limites por arquivo/página, tempo máximo, cancelamento, custo estimado/real por importação e rate limit por organização.
- Não armazenar imagens intermediárias além da retenção definida; não expor URLs MinIO a terceiros sem controle.

### UX de revisão

- Campos sugeridos com cor/estado distintos (`sugerido`, `aprovado`, `editado`, `rejeitado`).
- Aceitar/rejeitar individualmente e por página; oferecer revisão geral antes de publicar.
- Detectar sobreposição e campos duplicados; permitir renomear e mapear para um campo já existente do formulário.
- Preferir **detecção como ferramenta assistiva**, não um fluxo que altera o modelo sozinho.

## 5.6. Reutilização de mapeamento entre versões

- Quando clínica enviar revisão da própria ficha, propor reaproveitar mapeamento da versão anterior **somente** após verificar páginas/dimensões/layout e exibir comparação visual.
- Não mover silenciosamente campos se dimensões ou posições divergem.
- Criar nova versão do template; protocolos assinados continuam apontando ao snapshot histórico.
- Para alterações pequenas, sugerir quais campos permaneceram consistentes e quais precisam de inspeção.

## 5.7. Regras de negócio

- O PDF original não deve sofrer alteração destrutiva.
- A escolha final do campo, tipo, obrigatoriedade e localização é do profissional.
- Cada campo de formulário deve ter ID estável e posição por versão/documento.
- Alterações em documentos publicados não podem reprocessar PDFs/protocolos históricos.
- O motor de assinatura e OTP permanece inalterado; a prévia não cria assinatura válida.
- Quem não quiser IA pode configurar tudo manualmente e receber experiência equivalente.

## 5.8. Critérios de aceite (Gherkin simplificado)

- **CA01:** dado um PDF digital de duas páginas, quando importado, a interface permite navegação por página e mapeamento sem desalinhamento em zoom diferente.
- **CA02:** ao duplicar um campo, o sistema cria uma nova instância selecionável com identidade única.
- **CA03:** usuário consegue desfazer/refazer movimentação, tamanho e criação sem corromper o rascunho.
- **CA04:** prévia mostra o PDF com dados sintéticos e indica quando o valor será cortado.
- **CA05:** uma detecção parcial não bloqueia edição manual.
- **CA06:** sugestões de IA não são publicadas sem revisão explícita.
- **CA07:** PDFs anteriores assinados permanecem byte-a-byte ou semanticamente íntegros conforme a política existente de armazenamento e hash.
- **CA08:** testes cobrem rotação, páginas múltiplas e assinatura em página final.
- **CA09:** falha no job de detecção não causa perda do modelo ou do PDF original.
- **CA10:** um usuário não consegue consultar ou aprovar sugestões de outra organização.

## 5.9. Métricas e metas de experimento

- Tempo de configuração em fichas de 5, 20 e 50+ campos, comparando baseline versus evolução.
- Percentual de sugestões aceitas sem mover/redimensionar; correções por página; custo e latência por PDF.
- Incidentes de desalinhamento após publicação; tickets sobre importação; taxa de primeira ficha publicada.
- **Meta experimental (não garantia):** buscar queda de 50% no tempo mediano das fichas complexas, sem aumento da taxa de erro documental.

## 5.10. Sequência de entrega sugerida

`PDF-01A` melhorias manuais → testes de regressão → `PDF-01B` extração determinística → teste com PDFs sintéticos e consentidos → `PDF-01C` IA + revisão → rollout gradual → `PDF-01D` reaproveitamento de mapeamento.

---

# 6. EPIC DOC-02 — CONFIABILIDADE DO DOCUMENTO FINAL

**Prioridade:** P0; pré-requisito para prometer automação inteligente.

## 6.1. Objetivo

Garantir que o PDF produzido mantenha o documento de origem e apresente dados, seleções, imagens e assinaturas sem cortes, deslocamento ou perda de evidências.

## 6.2. Escopo funcional

- Catálogo de PDFs de regressão **sintéticos**, cobrindo A4/Carta, 1–10+ páginas, digital/escaneado, rotação, texto longo, caixa de seleção, assinatura, caracteres brasileiros e PDFs com fontes incomuns.
- Comparação visual automatizada do PDF preenchido em homologação; tolerâncias documentadas para variações de rasterização.
- Diagnóstico de overflow de texto, tamanho mínimo, linhas quebradas, assinatura cortada e campos extrapolados.
- Tratamento de erros assíncronos: `pending`, `completed`, `failed` existentes (usar estados reais), retry controlado e identificação do job.
- Comprovação de que metadados, snapshots, SHA-256, protocolo e dossiê seguem o contrato atual.
- Testes para garantir que publicação de nova versão NÃO altera protocolos históricos.

## 6.3. Critérios de aceite

- Mesma entrada e mesma versão geram saída visualmente estável (desconsideradas evidências variáveis esperadas, como timestamps), com tolerâncias definidas.
- PDF original permanece recuperável conforme política existente.
- Qualquer falha de geração é observável e não exibe documento incompleto como “finalizado”.
- Nenhum teste usa dados de pacientes reais.

---

# 7. EPIC MSG-03 — WHATSAPP E COMUNICAÇÃO DOCUMENTAL

**Prioridade:** P1 para envio manual; P2 para integração oficial.  
**Visão:** cada clínica usa preferencialmente **o seu próprio número**, enquanto o Gestgo orquestra o fluxo. O uso de número central do Gestgo não é recomendação padrão.

## 7.1. Separar três problemas

1. **Compartilhar:** profissional abre WhatsApp com mensagem pré-preenchida e envia manualmente.
2. **Automatizar:** Gestgo envia via canal oficial em nome da clínica, com conta/número conectados e permissão.
3. **Cobrar:** determinar quem paga mensagens e o plano SaaS; propriedade do número e faturamento são decisões independentes.

**Não confundir uma UI que diz “WhatsApp” com integração oficial ativa.** O raio-X identifica Evolution e funcionalidades ocultas, mas o proprietário afirma que ainda não possui integração nativa real no produto comercial.

## 7.2. Fase A — envio manual sem API de mensageria

- Ação “Enviar pelo WhatsApp” na pessoa, no template, no protocolo e/ou no envio existente, onde fizer sentido.
- Montar URL de compartilhamento com número do paciente formatado, texto neutro e link seguro, sem dados de saúde sensíveis.
- Abrir aplicativo/web WhatsApp; **não registrar “entregue” ou “lido”**: no máximo `share_intent_opened`/`awaiting_manual_confirmation` se houver confirmação explícita.
- Permitir copiar link como alternativa; não bloquear e-mail.
- Usar templates de texto adaptáveis por clínica com campos permitidos e prévia.
- Gerar link com expiração e revogação conforme políticas atuais do formulário/documento.

## 7.3. Fase B — canal oficial WhatsApp Cloud API

### Modelo de propriedade

- **Padrão proposto:** número/identidade da própria organização, ativado em fluxo oficial com Meta/operador autorizado, quando elegível.
- Suportar conexão/desconexão, estado da integração, número mascarado, template/status, webhook e reautorização.
- **Embedded Signup** e possibilidades de **coexistência com o app WhatsApp Business** devem ser verificados nas regras e elegibilidade atuais antes do desenvolvimento; não prometer que todo número existente pode coexistir.
- O proprietário do número e responsável pelo faturamento da mensageria deve ser explicitado nas telas e termos de contratação. Preferir faturamento da mensageria diretamente à clínica, quando suportado; se centralizado pelo Gestgo, incluir limites, cotas, previsão de custos e margem.

### Arquitetura lógica (nomes exemplificativos, sem criar duplicatas)

`DocumentSend / Event` → `CommunicationOrchestrator` → `ChannelAdapter` (`email`, `manual_whatsapp`, `official_whatsapp`) → `ProviderClient` → webhook → `DeliveryStatus` → timeline/auditoria.

- Um conector por `Organization` (ou a granularidade existente após auditoria).
- Segredos criptografados e rotacionáveis; nunca retornar tokens em payloads de frontend.
- Fila com retries exponenciais e **idempotency key** por envio/tentativa; deduplicação de webhooks.
- Estados distintos: solicitado, enfileirado, aceito pelo provedor, enviado, entregue, lido (se disponibilizado), falhou, cancelado; nenhum estado deve ser inventado sem callback.
- Armazenar erro legível, código do provedor, timestamps e consumo/custo estimado sem dados de saúde.
- Rate limit por organização, limites de segurança para evitar spam e reputação prejudicada.
- Templates aprovados para mensagens iniciadas pela empresa conforme regras oficiais vigentes.
- Registrar e respeitar opt-in, opt-out e permissões por finalidade; criar caminho para retirada de consentimento de comunicação.
- Configurar horário de silêncio e regras de lembrete, evitando spam e mensagens repetidas.

### Eventos candidatos

- Ficha criada para envio.
- Link de ficha disponibilizado.
- Documento ainda pendente após intervalo configurado.
- Documento concluído (notificação **à clínica**, ou mensagem ao paciente quando apropriada e autorizada).
- Reenvio solicitado, expiração, cancelamento.

### Conteúdo de mensagem

Preferir “Você tem um documento para preencher para [nome comercial da clínica]. Acesse o link seguro...” sem informar procedimento, diagnóstico, resultado clínico ou anexar PDF preenchido. Token deve ter proteção adequada; dados sensíveis só são vistos após controles já implementados.

## 7.4. Monetização do canal

- Envio manual incluído quando adequado à oferta vigente.
- Automação oficial como diferencial de plano Business ou adicional **a testar**, nunca tarifar ilimitado sem análise de volume.
- Não fixar preço de template/mensagem em código ou documento: a Meta/provedores alteram regras; registrar uma camada de precificação parametrizada e links de referência atuais.
- Separar “assinatura do Gestgo” e “tarifa de mensageria” em faturas e interface quando aplicável.

## 7.5. Critérios de aceite

- Compartilhamento manual não marca mensagem como entregue.
- Número da clínica A nunca pode ser usado para mensagem da clínica B.
- Falhas, webhook duplicado e retries não geram envios repetidos indevidos.
- Mensagens automáticas respeitam consentimento, templates e limites de envio.
- Disconectar canal impede novos envios automáticos sem afetar os documentos.
- E-mail e link manual continuam funcionando sem WhatsApp conectado.
- O histórico de envio não registra conteúdo clínico desnecessário.

## 7.6. Dependências

Auditoria do `DocumentSendsService`, `DocumentSend`, scheduler de lembretes, Evolution, contracts da API Java/Laravel; estudo da Cloud API e fluxo de autorização atual; regras comerciais de quem paga e atende suporte.

---

# 8. EPIC UX-04 — EXPERIÊNCIA SOLO E ONBOARDING

**Prioridade:** P0/P1.  
**Objetivo:** permitir que alguém que nunca utilizou software de documentos digitalize a própria ficha e chegue à primeira assinatura sem depender de atendimento humano.

## 8.1. Entrada simples

- Página inicial contextual para usuário solo: **Minhas fichas → Enviar ficha → Acompanhar → Documentos assinados**.
- Outros módulos (agenda, serviços, link-bio, utilitários) continuam disponíveis, mas com baixa saliência para quem não os utiliza.
- Atalhos baseados no estado: sem fichas → importar; com ficha sem publicação → revisar; ficha publicada sem envio → compartilhar; envio pendente → acompanhar.
- Não refazer shell/rotas; estudar `layout-app`, `navigation-hubs.config.ts` e onboarding atual.

## 8.2. Onboarding por especialidade

- Selecionar Estética, Odontologia ou Outra; **não obrigatório** e reversível.
- Ação principal: **“Usar minha ficha atual”** (PDF do próprio profissional). Alternativa: “Começar com modelo”.
- Guiar primeira criação com checklist discreto: importar → mapear → revisar → publicar → compartilhar.
- Modelos específicos por nicho só podem ser anunciados se existirem e forem revisados adequadamente; conteúdo técnico-clínico exige validação do profissional.
- Permitir sair e retomar; não manter progresso apenas no `localStorage` se a experiência multi-dispositivo exigir persistência — auditar antes.
- Ajuda contextual e links curtos para vídeo/demonstração, evitando onboarding com muitas telas.

## 8.3. Primeiro sucesso

Definir evento de ativação como **primeiro protocolo realmente concluído/assinado** (indicador primário), com milestones: PDF importado, campos confirmados, modelo publicado, primeiro link enviado.

## 8.4. Experimentos

- Comparar CTA “Criar ficha digital” versus “Digitalizar minha ficha atual”, sem assumir vencedor.
- Testar tutorial contextual no editor versus tutorial longo.
- Medir tempo até publicação e proporção de clientes que chegam ao primeiro documento assinado.

## 8.5. Critérios de aceite

- Usuário solo consegue acessar o fluxo principal em até dois passos de navegação após login.
- É possível completar primeiro fluxo sem usar agenda, link-bio, integrações ou ferramentas extras.
- Opções especializadas não escondem funcionalidades para outras especialidades.
- Acessibilidade por teclado, leitores de tela e dispositivos móveis é validada.

---

# 9. EPIC PAC-05 — PACIENTES RECORRENTES, PREFILL E REVALIDAÇÃO

**Prioridade:** P1/P2.  
**Base existente:** Pessoas, histórico, `Prefill Person`, reconsentimento e versões já existem.

## 9.1. Caso de uso

O paciente retorna para outra sessão ou procedimento. A clínica precisa preencher menos campos, mas confirmar que dados relevantes continuam corretos e colher novo consentimento quando o documento, procedimento ou política da clínica exigir.

## 9.2. Especificação

- Ação “Novo documento para paciente existente” com seleção do modelo e opção de recuperar dados permitidos.
- Mostrar campos com dados pré-existentes, origem e data da última confirmação quando disponíveis.
- Permitir que paciente revise/atualize informações; preservar histórico e autoria da alteração.
- Reusar somente campos compatíveis; campos específicos do procedimento não devem ser presumidos.
- A clínica escolhe política configurável de atualização por modelo/procedimento; não alegar validade jurídica universal (ex.: “todos os consentimentos vencem em 12 meses”).
- Reconsentimento **novo registro e nova versão**; nunca editar o PDF assinado.
- Respeitar revogação e consentimentos específicos de autorização de imagens.

## 9.3. Critérios de aceite

- Novo atendimento não altera protocolo anterior.
- Dados de uma organização nunca aparecem em outra.
- O paciente pode corrigir dados previamente preenchidos, com trilha adequada.
- Preferências de prefill/retenção são configuráveis e revisadas sob LGPD.
- Mudança de template não reusa dado incompatível silenciosamente.

---

# 10. EPIC AUT-06 — PROTOCOLOS DOCUMENTAIS POR PROCEDIMENTO

**Prioridade:** P2 após confirmar demanda paga.  
**Atenção:** há vínculo agenda → formulário e recursos de TCLE/reconsentimento; **não está comprovado** um orquestrador completo de múltiplos documentos condicionais por procedimento.

## 10.1. Proposta

Permitir criar um **pacote/documental por serviço** com modelos exigidos, ordem opcional, regras de revalidação, momentos de envio e responsáveis.

### Exemplo conceitual — procedimento estético

- Anamnese atualizada antes do procedimento.
- Consentimento específico do procedimento.
- Autorização de imagem **se pertinente**, com escolha independente.
- Orientações pós-atendimento, no momento definido.

A configuração deve ser feita pela clínica/profissional; o Gestgo não decide quais documentos são clinicamente obrigatórios ou legalmente suficientes.

## 10.2. Modelo lógico proposto

`ProcedureWorkflow` → `WorkflowVersion` → `DocumentRequirement[]` → `DocumentRequest/Send[]` → `Submission[]` → `WorkflowRun`.

**Nomes são descritivos**, não instrução para adicionar tabelas novas antes de verificar estruturas de `templates`, `services`, `appointments`, `document_sends` e `form_submissions`.

## 10.3. Regras

- Cada pacote é versionado e associado à organização.
- Instância de atendimento usa versão imutável das regras, preservando auditoria.
- Regra simples inicialmente: obrigatório/opcional; antes/depois; intervalo relativo; ordem; paciente/staff/responsável.
- Se já houver documento atual válido segundo política definida pela clínica, sugerir reaproveitamento ou revisão, nunca presumir automaticamente.
- Cancelar ou reagendar atendimento atualiza disparos futuros sem apagar documentos concluídos.
- Exibir progresso: “2 de 3 documentos exigidos concluídos”; não confundir conclusão documental com autorização clínica para procedimento.
- Definir fallback manual para clínica sem agenda/integrações.

## 10.4. Interface

- Configuração de pacote em Serviços ou Documentos (decidir após pesquisa de navegação).
- Visão de pendências por atendimento/pessoa com filtros e lembrete manual/automático.
- Linha do tempo da instância, com tentativas e estado de cada documento.

## 10.5. Critérios de aceite

- Mesma pessoa pode ter atendimentos diferentes com conjuntos diferentes de documentos.
- Alterar workflow não muda execuções históricas.
- Documentos obrigatórios e opcionais ficam distinguíveis.
- Não ocorre disparo duplicado por retry de eventos de agenda.
- Pode operar sem integração WhatsApp, via e-mail e link manual.

---

# 11. EPIC AGD-07 — AGENDA E SERVIÇOS COMO GATILHOS

**Prioridade:** P2; usar o que já existe.

## 11.1. Escopo

- Inspecionar API e UI atuais de `/agenda`, `/a/:slug`, `/servicos` e vínculo `?a=`.
- Permitir associar pacote documental a um serviço agendável.
- Ao criar reserva, preparar pendências sem enviar dados indevidos antes da confirmação de disponibilidade/agendamento.
- Reagendamento/cancelamento precisa ajustar lembretes futuros de forma idempotente.
- Não substituir agenda clínica de terceiros; preferir integração quando disponível.
- Tratar fuso horário da organização e horário de envio de lembrete.

## 11.2. Fora de escopo

Otimização de agenda, repasse financeiro, prontuário, estoque, gestão de convênio e motor completo de calendário.

## 11.3. Critérios de aceite

- Agendamento criado gera vínculo documental quando configurado.
- Sem pacote, agenda continua como funciona hoje.
- Reagendamento não cria segundo pacote inadvertidamente.
- Alterar serviços não altera versões históricas dos fluxos documentais.

---

# 12. EPIC MKT-08 — SITE, SEO E FUNIL COMERCIAL

**Prioridade:** P0/P1, em paralelo ao produto.  
**Dado comercial:** os 25 clientes foram adquiridos predominantemente por Google/SEO/site.  
**Princípio:** vender o que já existe e é comprovado; não anunciar mapeamento automático até estar implantado.

## 12.1. Posicionamento central

Mensagem-mãe candidata:

> **“Sua ficha atual, agora digital. Preserve o documento da clínica e receba as informações preenchidas e assinadas.”**

Submensagem: “Importe seu PDF, mapeie os campos, compartilhe com o paciente e organize os documentos assinados.”

Evitar claims do tipo “100% seguro juridicamente”, “validade jurídica garantida”, “documentação obrigatória resolvida automaticamente” ou “não precisa de consentimento”, pois dependem do contexto jurídico e operacional.

## 12.2. Páginas e conteúdos prioritários

- Landing principal centrada em **ficha própria** e demonstração de antes/depois.
- Página específica para **Estética**.
- Página específica para **Odontologia**.
- Páginas de problemas específicos com intenção comercial, definidas por consultas reais do Search Console (ex.: digitalizar ficha de anamnese, consentimento digital, converter PDF em ficha preenchível).
- Casos de uso com informações sintéticas ou depoimentos **autorizados**; sem expor dados de pacientes.
- FAQ real sobre assinatura, mapeamento manual, PDF final, reutilização de fichas e necessidade de integração.
- Conteúdo informativo revisado quando envolver deveres profissionais, legislação ou clínica.

## 12.3. SEO técnico e conversão

- Analisar Search Console: marca versus não-marca, consultas, páginas de entrada, impressões, CTR e posição média.
- Conferir indexação, canonical, sitemap, robots, titles, descrições e performance em mobile.
- Garantir que preços/CTA relevantes sejam utilizáveis mesmo quando API `/landing` falha, **sem forçar unificação do site com SPA** (decisão explícita do proprietário).
- Garantir que demonstração em página não dependa de ter acesso a documentos reais.
- Medir cliques em teste grátis, início de cadastro, criação de conta e conversão, com atribuição UTM/gclid quando disponível e política de retenção adequada.
- Não criar páginas duplicadas em massa ou conteúdo SEO automatizado sem valor original.

## 12.4. Testes de posicionamento

A/B ou testes sequenciais de mensagens, quando o volume de tráfego permitir:

1. “Digitalize a ficha que já usa” versus “Formulários e assinaturas digitais”.
2. Demonstração interativa curta versus screenshot estático.
3. Landing nichada versus genérica.

**Cuidado estatístico:** com base pequena, evitar concluir que uma variação vence por poucas conversões. Registrar intervalo, amostra, origem e coortes.

## 12.5. Critérios de aceite

- Páginas explicam claramente uso do PDF original.
- Alegações de produto correspondem à versão em produção.
- Principais conversões são rastreáveis sem vazamento de dados clínicos.
- Site e SPA podem manter jornadas/CTAs distintos conforme decisão do proprietário.
- SEO não compromete velocidade de carregamento nem acessibilidade.

---

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

# 14. EPIC INT-10 — INTEGRAÇÕES E API DE PARCEIROS

**Prioridade:** P2/P3.  
**Estado:** Feegow com implementação encontrada; outros PMS parciais e ocultos; outbound webhooks e tokens de API existentes.

## 14.1. Estratégia

O Gestgo não deve exigir que a clínica troque seu software atual. Sua função é orquestrar documentação e devolver status e documentos de forma segura para a ferramenta já usada.

## 14.2. Integração incremental

- Selecionar **um** parceiro a partir dos sistemas efetivamente usados pelos clientes pagantes.
- Definir caso de uso mínimo: criar/vincular pessoa, vincular agendamento, disparar/recuperar link documental, receber status concluído.
- Definir fonte de verdade por campo: paciente, agendamento, serviço, situação documental.
- Segurança: OAuth/API key conforme provedor, criptografia, RBAC, escopo e consentimento; sem expor campos clínicos indiscriminadamente.
- Deduplicação de pessoas/agendamentos, tratamento de conflito, reconciliação e retries.
- Webhooks assinados/verificáveis, idempotentes, versionados e com logs mínimos.
- Uma “integração real” precisa ter fluxo E2E validado em homologação e piloto antes de ficar visível a todos.

## 14.3. Webhooks e API pública do Gestgo

- Auditar contratos já existentes de webhooks/tokens/conector antes de mexer.
- Definir eventos de domínio estáveis (`document.requested`, `document.completed`, `document.expired`, `document.revoked`) apenas se compatíveis com contratos reais e necessários.
- Payload mínimo: IDs, timestamps, status, versão de schema e URL segura para consultar detalhes autorizados; evitar incluir respostas sensíveis por default.
- Rotação de secrets, replay protection, assinatura, tentativas e dead-letter.
- OpenAPI, exemplos e sandbox de testes para parceiros — após validação do primeiro caso real.

## 14.4. Critérios de aceite

- Indisponibilidade do parceiro não impede a clínica de usar o fluxo documental manual.
- Sincronização é observável e pode ser reprocessada sem duplicar eventos.
- Respeita organização, autorização e LGPD.
- Habilitação comercial acontece por parceiro validado, não por existência de endpoints.

---

# 15. EPIC OPS-11 — ARQUITETURA, PERFORMANCE, SEGURANÇA E OPERAÇÃO

**Prioridade:** P0 transversal.

## 15.1. Decisão arquitetural: Spring Boot como backend canônico

**Decisão do proprietário (19/11/2026):** o backend canônico do Gestgo será **`gestgo_api` (Java 21 / Spring Boot 3.5)**. Esta é uma decisão de arquitetura e roadmap, **não uma afirmação de que Java já está em produção**. O relatório original não identificou com certeza a stack por trás de `api.gestgo.com.br`.

### Regra para todo novo desenvolvimento

- Implementar novas regras, serviços, endpoints, jobs, webhooks, integrações e controles de plano **somente em `gestgo_api`**, após verificar se já existem. Não abrir desenvolvimento funcional paralelo em `zion_med`.
- Manter `zion_med` (Laravel) **como referência de comportamento, mapeamento de regras e contingência enquanto necessário**. Não desativar o Laravel nem modificar deploy automaticamente.
- Preservar o **contrato `/api/v1` já consumido pelo Angular**: rotas, métodos, payloads, paginação, erros, códigos HTTP, upload/download, cookies/CSRF e `X-Organization-Id`. Mudanças incompatíveis exigem versionamento ou adaptação consciente e testes.
- Não copiar diretamente `SourcePdfFillService`/FPDI, jobs Laravel ou o esquema de banco para Java: identificar sua implementação equivalente e testar a fidelidade do PDF; usar o PHP como *oráculo de comportamento*, não como biblioteca invocada implicitamente.
- Mudanças puramente no editor Angular podem avançar isoladas, desde que persistam o schema/JSON de coordenadas compatível e não alterem PDFs históricos.

### Checklist de migração e paridade antes do cutover de produção

1. **Inventário de ambiente**: confirmar qual backend serve prod/homolog, versionamento, rotas, bancos, storage, workers e schedulers em cada ambiente.
2. **Matriz de contratos**: documentar para cada fluxo crítico endpoint Laravel, equivalente Java, estado, resposta, autorização, side effects e teste correspondente. Classificar como PARIDADE / DIFERENÇA INTENCIONAL / AUSENTE / NÃO VERIFICADO.
3. **Fluxos críticos**: cobrir login/sessão/CSRF, tenant/RBAC, trials e Asaas, templates e versões, `/f/:token`, gate/OTP, assinatura, snapshot, preenchimento de PDF de origem, arquivo MinIO, hash, dossiê, verificação pública, cópia do paciente e reconsentimento.
4. **Jobs e idempotência**: comparar envio de e-mails, lembretes, geração de PDF, webhooks e tarefas LGPD; não deixar workers PHP e Java consumirem o mesmo evento sem coordenação.
5. **Persistência**: conferir compatibilidade PostgreSQL, migrations Flyway, colunas, constraints, relacionamentos, histórico e chaves; proibir migração destrutiva em produção sem plano separado e backup/restauração verificados.
6. **Contrato de documento**: criar conjunto de PDFs sintéticos (múltiplas páginas, acentos, fontes, checkbox, assinatura, campos longos) e comparar saída/posições com tolerâncias explícitas, preservando snapshots e hashes existentes.
7. **Autenticação e escopo**: testar cookies HttpOnly, CSRF, CORS, `X-Organization-Id`, permissões e isolamento entre organizações.
8. **Carga e confiabilidade**: testar com dados equivalentes em homologação; observar p95, erros, fila, RAM/CPU, pool de conexões, MinIO e custos. Performance valida capacidade, **não reabre a decisão de tecnologia**.
9. **Cutover controlado**: checklist de go/no-go, implantação gradual quando suportado, alarmes, rollback de tráfego, versão de dados compatível e responsável de aprovação. Não presumir que alternar o proxy é suficiente para reverter migrations.
10. **Desativação do Laravel**: somente após Java operar com paridade e estabilidade comprovadas, com decisão explícita de retirada e garantia de acesso aos históricos.

**Princípio de execução:** escolher Java como alvo não torna obrigatória uma migração completa antes de melhorar a interface Angular. Evitar implementação duplicada e liberar features gradualmente na API Java quando estiver pronta para o tráfego correspondente.

## 15.2. LGPD e segurança

- Dados de saúde são sensíveis; aplicar minimização, segregação, controles de acesso, retenção e base legal adequada.
- O editor e o detector de campos trabalham preferencialmente com PDF **em branco**, não dados de pacientes.
- Não enviar documentos clínicos reais a provedores de IA sem validação jurídica/contratual, controles adequados e necessidade comprovada.
- Tokens públicos de formulário devem permanecer difíceis de adivinhar, revogáveis quando aplicável e protegidos por fluxos existentes de identidade.
- Reforçar auditoria sobre acesso a PDF, compartilhamentos, credenciais de integração e administração de planos.
- Manter hash/snapshot/evidências sem reescrita histórica.
- Verificar exportação/exclusão e retenção de dados, inclusive backups, eventos e arquivos temporários.
- Preparar documentação contratual/comercial (DPA etc.) com revisão jurídica especializada, já mencionada como backlog.

## 15.3. Observabilidade

- Verificar monitoramento real informado pelo proprietário; não presumir que não exista apenas porque ErrorHub está desabilitado no commit.
- Monitorar falhas do PDF, filas, MinIO, imports IA, envio de mensagens, OTP, Asaas e API ativa.
- Correlation ID por fluxo e organização, sem gravar dados de saúde em logs.
- Alarmes de taxa de erro, fila parada, PDF não gerado, webhook com falhas e custos fora de faixa.
- Dashboard interno operacional para intervenção rápida sem suporte manual extensivo.

## 15.4. CI/CD e rollback

- Testes automáticos para core documental obrigatórios.
- Feature flags por ambiente/organização; migrações compatíveis com versões antiga/nova onde possível.
- Deploy gradual; rollback de frontend/backend e desativação de detecção IA/WhatsApp sem quebrar editor manual.
- Backups e restore testados, com retenção e controle de acesso documentados.

## 15.5. Critérios de aceite

- Nenhuma mudança em edição/mapeamento compromete protocolos existentes.
- Todo incidente crítico pode ser diagnosticado com métricas, logs sanitizados e IDs técnicos.
- Há procedimento testado de rollback de feature e restauração, sem dependência de acesso casual a produção.

---

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

# 17. EPIC FUT-13 — EXPANSÕES CONDICIONAIS

Essas frentes foram mencionadas nas conversas, mas **não devem ultrapassar o core sem evidência de adoção e receita**.

## 17.1. Multiempresa e redes

- Estrutura de tenant/organization já existe, mas habilitação comercial está parcial.
- Finalizar limites, isolamento, faturamento, seleção de organização e papéis antes de lançar.
- Testar cobrança de ticket maior com clientes que efetivamente gerenciem mais de uma unidade.

## 17.2. Mobile `/m`

- Shell/rotas existem; feature flag produção está desligada no snapshot.
- Só lançar após verificar experiência do público solo e custos de manutenção; priorizar responsividade das telas centrais antes de um novo conjunto de interfaces.

## 17.3. Utilitários

- Orçamentos, mensagens, retornos, preços, cartões, checklists, pacotes e estoque possuem UI e módulo Java, com homolog habilitada segundo proprietário.
- Não chamar de “novos módulos”; primeiro medir utilização, identificar lacunas de backend produtivo e evitar confundir o posicionamento principal.

## 17.4. Go Assistant com LLM

- Assistente sem LLM existe; adapter LLM está desligado.
- Testar casos com valor claro: ajuda contextual em mapeamento, explicação de erro e navegação. Não usar IA para dar orientação clínica ou validar suficiência jurídica de documentos.

## 17.5. Planos e white-label

- Multiempresa, permissões e templates podem apoiar oferta para redes e parceiros, mas isso exigirá ativação, suporte, segurança e preço diferentes do público solo.
- White-label não deve ser prioridade sem contrato piloto e cálculo de custo operacional.

---

# 18. ROADMAP EXECUTIVO

## 18.1. Primeiro ciclo: diagnóstico e proteção do core (semanas 1–2)

- Auditar mapeamento atual e import IA; decidir estado-alvo de API para as mudanças.
- Reproduzir 8–12 PDFs sintéticos de complexidades distintas e medir tempo/error rate.
- Implementar/validar telemetria segura do fluxo documental.
- Identificar bugs/falhas de PDF e corrigir regressões críticas.
- Entrevistar alguns clientes pagantes de estética/odontologia sobre configuração de fichas, envio e recorrência.

**Gate:** baseline documentado; testes do pipeline PDF; lista de ajustes priorizada.

## 18.2. Dias 15–30: produtividade do mapeador e onboarding

- Zoom, navegação multipágina, duplicação/alinhamento/atalhos e preview sintético, conforme gaps verificados.
- Melhorar entrada “Usar minha ficha atual” no onboarding.
- Instrumentar conversão até primeiro documento assinado.
- Ajustes no site para explicar “sua ficha original, agora digital”, sem prometer detecção automática ainda.

**Gate:** melhora mensurável no tempo de configuração, sem piorar qualidade de PDF.

## 18.3. Dias 31–60: mapeamento assistido e compartilhamento

- Detectar campos estruturados e propor coordenadas em PDFs digitais.
- Avaliar IA/visão para casos restantes em piloto com PDFs sintéticos/em branco e consentimento.
- Melhorar compartilhamento manual pelo WhatsApp e estados verdadeiros de envio.
- Lançar/otimizar páginas comerciais de estética e odontologia com atribuição de tráfego.

**Gate:** detecção confiável ou fallback manual; uso do editor comprovadamente melhor; tráfego mensurado.

## 18.4. Dias 61–90: rollout de IA e monetização validada

- Testar sugestões IA com subconjunto de clientes, revisão obrigatória e limites de custo.
- Implementar reaproveitamento de mapeamentos de versões semelhantes quando seguro.
- Realizar entrevistas/pré-venda para automação WhatsApp oficial e protocolos documentais.
- Definir, sem ativar cegamente, entitlements de planos futuros.

**Gate:** decisão de expandir ou não WhatsApp oficial/protocolos com base em compromisso comercial e custo unitário.

## 18.5. Horizonte 3–6 meses (condicional)

- WhatsApp oficial por clínica, após aprovação técnica/comercial, política de mensagens e elegibilidade.
- Pacientes recorrentes melhorados e pacotes documentais por procedimento.
- Integração real com um PMS demandado pelos clientes.
- Plano Business com automações efetivamente disponíveis.

## 18.6. Horizonte 6–12 meses (somente se sustentado por dados)

- Ampliação multiempresa/integrações; auditoria avançada e relatórios; mobile e utilitários conforme adoção.
- Estratégias de parceiros e expansão de ticket para clínicas com equipe.
- Não executar várias grandes migrações ao mesmo tempo.

---

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

# 20. CRITÉRIOS TRANSVERSAIS DE QUALIDADE

Todas as implementações devem cumprir:

1. **Não regressão:** criar testes antes de alterar fluxo de documento assinado; cobrir import → mapear → publicar → preencher → assinar → gerar PDF → dossiê.
2. **Multi-tenancy:** negar acesso cross-organization em todas as consultas/escritas.
3. **Auth e RBAC:** respeitar sessão/cookie/CSRF e permissões atuais; não introduzir JWT local sem necessidade explícita.
4. **Versionamento:** alteração de template/documento nunca reescreve histórico já assinado.
5. **Dados sensíveis:** não inserir dados clínicos em logs, analytics, mensagens ou prompts.
6. **Acessibilidade:** editor por teclado, estados anunciados, contraste e feedback de erro.
7. **Performance:** processar PDFs grandes assincronamente quando necessário, com feedback e limites claros.
8. **Resiliência:** falha de IA, WhatsApp ou integração externa não impede workflow manual do core.
9. **Observabilidade:** registrar correlation IDs, duração, falhas e custos externos sem vazar PII.
10. **Deploy seguro:** feature flag, testes em homologação, rollback e migrações compatíveis.
11. **Qualidade documental:** fixtures multiformato e comparação visual.
12. **Eficiência de suporte:** texto de erro acionável, self-service e documentação simples.
13. **Comunicação verdadeira:** não anunciar recurso ao usuário final antes de estar operável no seu ambiente.

### Matriz mínima de testes integrados

| Cenário | Resultado esperado |
|---|---|
| PDF simples 5 campos | Mapeamento, preview e PDF final corretos |
| PDF 50+ campos/10 páginas | Edição estável e sem perda de campo |
| PDF rotacionado | Coordenadas corretas em todos os zooms |
| Texto longo | Overflow visível na prévia e tratamento definido |
| Assinatura OTP reforçada | Eventos/evidências preservados |
| Template v1 assinado e v2 editado | v1 histórica permanece íntegra |
| AI timeout/erro | Fallback manual, sem perda de edição |
| WhatsApp desconectado | Link/e-mail continuam disponíveis |
| Webhook duplicado | Estado idempotente, sem envio duplicado |
| Mesma pessoa em duas organizações | Sem vazamento cross-tenant |
| Inadimplência | Respeita soft-block e fluxos públicos atuais |
| Falha MinIO | Erro rastreável, sem marcar PDF incompleto como concluído |

---

# 21. CHECKLIST DE DISCOVERY TÉCNICO NO CURSOR

Antes de qualquer PR, o Cursor deve produzir `DISCOVERY-<EPIC>.md` (se o proprietário autorizar criar documentação) contendo:

1. Branches/commits atuais e quais repositórios serão alterados; o backend-alvo para features é `gestgo_api` (Java).
2. Paths **reais** do editor PDF, services, entidades, endpoints, jobs e testes.
3. O que já existe no repositório hoje versus o que falta para a especificação.
4. Arquitetura de dados e coordenadas atual, sem adivinhar campos nem nomes de tabela.
5. Regras de template version/snapshot/assinatura e dependências do PDF generator.
6. Confirmar qual backend atende o ambiente alvo; desenhar nova lógica no `gestgo_api` (Java) e usar `zion_med` apenas para paridade e contingência enquanto necessário.
7. Riscos de regressão, migrações, segurança e custo de provedores.
8. Proposta de menor PR possível que entregue valor e critérios de aceite verificáveis.
9. Plano de teste unitário, integração, visual e E2E.
10. Checklist de deploy/rollback; o que necessita de aprovação humana.

O Cursor pode produzir documentação antes de modificar código; não deve executar migrações de produção, modificar segredos, ativar features globalmente ou publicar dados reais sem autorização.

---

# 22. PROMPT OPERACIONAL PARA COLAR NO CURSOR

> Este prompt foi escrito para ser usado com o arquivo **`GESTGO-PLANO-MESTRE-EVOLUCAO.md` anexado ou copiado para o workspace**, junto ao **`raiox.md`**. Iniciar por **discovery**, não por implementação indiscriminada.

```text
Você é o Tech Lead do Gestgo. Leia integralmente:
1. GESTGO-PLANO-MESTRE-EVOLUCAO.md
2. raiox.md
3. Os arquivos relevantes do código atual nos repositórios zion_med_front, zion_med, gestgo_api e gestgo-site.

Contexto de negócio confirmado:
- Gestgo já é um SaaS em produção com 25 clientes pagantes.
- Nichos principais: estética e odontologia, sobretudo profissionais solo.
- Aquisição predominante: Google/SEO/site; maioria usa recorrentemente.
- Core comercial: importar a ficha de papel/PDF da clínica, mapear manualmente os campos, permitir preenchimento e assinatura e gerar o PDF preenchido preservando layout original.
- DECISÃO CONFIRMADA: `gestgo_api` (Spring Boot / Java) é o backend canônico escolhido para evoluções futuras; `zion_med` (Laravel) é referência/paridade/contingência temporária, não alvo para novas features.
- A API ativa em produção ainda deve ser identificada; não presumir que a escolha de Java já corresponde a um cutover realizado.
- Alguns menus e integrações estão intencionalmente ocultos por não estarem prontos para operação comercial.
- Mobile /m está desligado em produção no snapshot; utilitários e push estão habilitados em homologação segundo o proprietário.
- O proprietário NÃO deseja unificar automaticamente site e SPA quanto a CTA/plan keys.

Tarefa NESTA EXECUÇÃO:
A) Auditar o HEAD atual e reconciliar o que o plano pede com o que já existe.
B) Entregar relatório objetivo por epic: existente, parcial, novo, duplicado ou dependente de decisão.
C) Priorizar a primeira implementação pequena com base em risco/impacto, começando preferencialmente pelo PDF-01A (produtividade manual) e DOC-02 (qualidade de PDF), após verificar lacunas reais.
D) Apresentar arquivos impactados, modelo de dados atual, implementação-alvo em Java, compatibilidade Angular `/api/v1`, riscos, testes, feature flags, esforço relativo e rollback.
E) Propor divisão em PRs independentes e uma checklist de aceite para cada PR.

Regras obrigatórias:
- NÃO implemente tudo de uma vez.
- NÃO altere produção, banco real, arquivos de segredos ou contas de terceiros.
- NÃO reescreva recursos existentes nem invente endpoints antes de conferir o contrato real.
- NÃO modifique PDFs assinados, snapshots, hashes ou dossiês históricos.
- NÃO envie dados pessoais de pacientes a provedores de IA, testes ou logs.
- NÃO exponha como disponível uma integração ainda oculta/incompleta.
- A decisão por Java já foi tomada pelo proprietário. NÃO reabra essa escolha nem implemente features novas em Laravel. Audite paridade e identifique o backend que atende cada ambiente antes de propor cutover.
- NÃO faça alterações de código nesta primeira execução. O objetivo agora é discovery e plano técnico para aprovação.

Formato da resposta:
1. Resumo do repositório atual e diferenças versus raiox.md.
2. Tabela de status dos EPICs.
3. Diagnóstico detalhado do editor/mapeador de PDF atual.
4. Proposta dos três primeiros PRs, cada um com escopo fechado.
5. Arquivos/funções/classes impactados com evidência de caminhos.
6. Matriz Laravel × Java dos contratos atuais e compatibilidade com Angular `/api/v1`; lacunas para cutover.
7. Testes, riscos, esforço relativo e rollback.
8. Perguntas objetivas que só o proprietário pode responder.

Aguarde aprovação explícita antes de modificar código.
```

### Modo de execução recomendado após discovery aprovado

Para cada PR: 1) confirmar escopo, 2) criar branch, 3) testes de comportamento atual, 4) implementar mudança mínima, 5) testes e evidências visuais, 6) revisar diff, 7) homologação com PDF sintético, 8) aprovação para deploy, 9) monitorar, 10) expandir rollout. Não fazer “big bang”.

---

# 23. DECISÕES AINDA PENDENTES

| Decisão | Estado | Quem decide |
|---|---|---|
| Backend canônico futuro | **RESOLVIDO: `gestgo_api` (Spring Boot / Java)** | Proprietário, 19/11/2026 |
| Data e método de cutover da produção para Java | **PENDENTE**, após paridade, E2E, observabilidade e rollback | Proprietário + engenharia |
| Critério de sucesso de tempo de mapeamento | Baseline não medido | Produto + dados |
| Processamento IA com provedor externo | Condicional a risco/custo/privacidade | Proprietário + revisão jurídica |
| Plano de cobrança da mensageria | Não definido | Proprietário |
| Qual WhatsApp será suportado para cada cliente | Preferir número próprio, sujeito a elegibilidade da Meta | Proprietário/integração |
| Política de retenção de artefatos intermediários de IA | Não definida | Segurança/jurídico |
| Nicho comercial principal entre estética/odonto | Dados atuais insuficientes para decisão definitiva | Produto/comercial |
| Funcionalidades que entram no Business | Ainda a validar com clientes pagantes | Proprietário |
| Primeiro PMS além do Feegow | A decidir por demanda real | Produto/comercial |
| Uso comercial dos utilitários/mobile | A avaliar por dados | Produto |
| Preços efetivos de produção e MRR real | Não verificados pela auditoria | Dados operacionais |
| Necessidade de alteração do site frente à SPA | Não unificar automaticamente, decisão explícita | Proprietário |
| Aprovação de cada PR e rollout | Obrigatória | Proprietário |

---

# 24. REFERÊNCIAS E TERMINOLOGIA

## 24.1. Fonte interna

- `raiox.md`: “GESTGO — RAIO-X TÉCNICO E FUNCIONAL”, auditoria de leitura de 19/11/2026. Repositórios e commits auditados conforme seção de metadados do documento.
- Informações comerciais e operacionais fornecidas pelo proprietário nesta conversa: 25 clientes pagantes; estética/odontologia solo; origem Google/SEO/site; uso recorrente; mapeamento manual atual; todas as clínicas usam o core da ficha própria; homologação de utilitários/push; plano de reativar planos superiores; ausência de integração nativa WhatsApp concluída; preferência por não unificar site/SPA; **escolha explícita de Java/Spring Boot como backend canônico para a evolução**.

## 24.2. Fontes externas para revisão pontual antes de implementação

- Meta — Embedded Signup (coleção oficial): https://www.postman.com/meta/whatsapp-business-platform/documentation/du6gzjv/embedded-signup
- Meta — coleção WhatsApp Business Platform: https://www.postman.com/meta/whatsapp-business-platform/overview
- Google Search Central — SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide

**Nota:** disponibilidade de coexistência, requisitos de aprovação, política de mensagens e tarifação da Meta são dinâmicos. Confirmar documentação oficial na data de implementação; não confiar em preços ou elegibilidade históricos.

## 24.3. Terminologia

- **Ficha original:** PDF ou representação do documento que a clínica já utiliza.
- **Mapeamento:** ligação entre campo lógico do formulário e região do PDF original.
- **Campo sugerido:** proposta automatizada ainda não aprovada pelo profissional.
- **Template publicado:** versão aprovada e disponibilizada para preenchimento.
- **Protocolo:** submissão documental acompanhada de evidências, conforme domínio atual.
- **Pacote documental:** conjunto versionado de documentos associados a uma rotina/procedimento (proposto).
- **Cliente pagante:** conta com pagamento, conforme informado pelo proprietário; não confundir com pessoa/paciente registrada.
- **Feature flag:** mecanismo para habilitar/desabilitar mudança sem prejudicar a operação existente.

---

**FIM DO PLANO MESTRE.**

> **Orientação final:** antes de começar a implementação, o Cursor deve confrontar cada item com o código atual. Preservar tudo que já funciona, evitar duplicidade e produzir a melhoria incremental de maior valor primeiro.
