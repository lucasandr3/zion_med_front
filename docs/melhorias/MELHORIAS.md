# MELHORIAS — Gestgo

**Versão:** 1.0  
**Data:** 14/10/2026  
**Produto:** Gestgo — fichas, consentimentos e documentação clínica digital  
**Status:** proposta de evolução; **não** representa funcionalidades já entregues  
**Repositórios atuais:** `zion_med` (Laravel 12/API) e `zion_med_front` (Angular 21/SPA)

> **Decisão de produto:** manter o Gestgo como camada especializada de documentação clínica, melhorar radicalmente a ativação e a conversão e validar o **Importador Inteligente de Fichas** antes de desenvolver uma agenda própria. O Link na Bio será um canal de entrada para documentos e agendamentos, não o lugar onde a lógica da agenda fica implementada.

## 0. Fontes, limites e premissas

Esta especificação foi elaborada a partir de `01_PRD.md`, `02_TRD.md`, `03_FLUXOS.md`, `04_DESIGN_SYSTEM.md`, `05_BANCO_POSTGRES.md`, `06_PLANO.md`, `chat.txt`, três fotos de uma anamnese facial e da página pública `https://gestgo.com.br/`, consultada em 14/10/2026. Inclui pesquisa pública de preços ao final.

**O que os documentos atestam como existente no código:** modelos/campos dinâmicos, regras de visibilidade, biblioteca de templates, links públicos, e-mail/WhatsApp configurável, assinatura com evidências/OTP, protocolos/PDF/dossiê, pessoas, revisão, link na bio, integrações Feegow/Evolution, permissões, Asaas e trial. **O que não está atestado:** importação por IA pronta, agenda nativa, motor de limites de protocolos/importações por plano, cobrança anual operacional ou métricas de funil adequadamente instrumentadas. Esses itens devem ser tratados como novos requisitos, sujeitos a inspeção do código e teste em produção.

**Premissas comerciais a confirmar com o fundador antes de congelar o roadmap:** horas por semana realmente disponíveis para o Gestgo; orçamento de execução/aquisição; aceitação de contato ativo com leads (ainda que breve) versus exclusivamente self-service. Stack dominada: PHP/Laravel/Angular. Não presumir que disponibilidade ou capital mencionados para outros projetos se aplicam ao Gestgo.

**Critério de realidade:** o sistema documental é o núcleo; não prometer prontuário médico completo, conformidade jurídica universal, prevenção clínica de riscos, integração WhatsApp gratuita/ilimitada ou funcionalidades ainda não entregues.

---

## 1. Objetivos do próximo ciclo

1. **Operação que recebe dinheiro:** cadastro, trial, pagamento, webhook, liberação/bloqueio, cancelamento e suporte básico funcionando de ponta a ponta.
2. **Ativação autônoma:** o profissional conseguir publicar e enviar sua primeira ficha sem falar com o fundador.
3. **Primeira proposta de valor clara:** transformar fichas próprias em digitais, obter assinatura e encontrar o histórico depois.
4. **Diferenciação comprovável:** fidelidade na importação de uma ficha já existente, não simples geração genérica com IA.
5. **Comercial mensurável:** saber de onde vêm os leads, em que etapa param, que segmento usam e quem paga/permanece.

### Não objetivos agora

- ERP, caixa, financeiro clínico, prontuário completo, estoque, convênios ou faturamento médico.
- Agenda nativa com comissões, múltiplos recursos/salas, pagamentos antecipados, recorrência complexa e conciliação.
- Diagnóstico clínico por IA, prescrição, classificação automática de contraindicações ou geração autônoma de termos jurídicos.
- Refatoração geral da SPA antes de resolver abandono comercial, salvo bugs críticos.

## 2. Priorização executiva

| ID | Prioridade | Entrega | Tamanho relativo* | Dependência | Resultado esperado |
|---|---|---|---|---|---|
| M-01 | P0 | Auditoria de checkout/trial/Asaas e operação | M | Acesso a ambiente e logs | Novos clientes conseguem pagar e obter acesso |
| M-02 | P0 | Eventos do funil e alertas de novos cadastros | P–M | M-01 | Nenhum interessado some sem visibilidade |
| M-03 | P0 | Página pública com preço e posicionamento claros | M | Preços/regras aprovados | Escolha de plano sem contato obrigatório |
| M-04 | P1 | Onboarding até primeira ficha enviada | M | Instrumentação M-02 | Redução do tempo até primeiro protocolo |
| M-05 | P1 | Prova de conceito: importar ficha com IA e revisar | M–G | Fluxo atual de modelos | Validar interesse e qualidade, não publicar por IA |
| M-06 | P1 | Editor/revisor lado a lado e importação de modelo | G | M-05 validado | Fluxo self-service completo de migração de fichas |
| M-07 | P1 | Landing por segmento + modelos demonstráveis | M | M-03/M-04 | Conversão e aquisição mensuráveis por nicho |
| M-08 | P2 | Melhorar histórico de documentos por pessoa | M | Dados atuais | Aumentar uso recorrente após o primeiro envio |
| M-09 | P2 | Link na Bio: CTA para agenda externa/Feegow | P–M | Configuração org | Agendamento sem agenda nativa |
| M-10 | P3/condicional | Agenda própria mínima | G | Evidência de demanda pagante | Jornada agendamento → ficha → atendimento |
| M-11 | P1 transversal | Segurança, retenção, backup e UX LGPD | M–G | Auditoria técnica | Redução do risco de operar dados sensíveis |

\* P/M/G = pequeno/médio/grande em termos relativos, **não** estimativa de horas; recalcular conforme capacidade semanal.

**Ordem de execução:** M-01 → M-02 → M-03 → M-04 → M-05; M-11 acompanha o ciclo. M-06 só após resultado de validação. M-07 pode ser preparado em paralelo e publicado quando o fluxo comercial estiver estável.

---

## 3. Requisitos de produto e critérios de aceite

### M-01 — Cadastro, trial, pagamento, acesso e recuperação

**Problema:** a base comercial não pode depender de conferir manualmente se a pessoa assinou ou se a cobrança estava corretamente configurada.

**Checklist de engenharia/QA:**

- [ ] Criar conta nova, confirmar e-mail, acessar período de teste, visualizar data de término e plano disponível.
- [ ] Escolher plano e iniciar checkout Asaas; testar ambiente de homologação e fluxo de pagamento efetivo em produção com valor controlado.
- [ ] Persistir `subscriptions`, `payments` e status real com idempotência de webhook.
- [ ] Processar pagamento confirmado, atrasado, cancelado e estornado sem duplicar liberação/bloqueio.
- [ ] Mostrar mensagem compreensível em `past_due`, grace period e bloqueio; permitir correção do pagamento sem perder documentos.
- [ ] Verificar envio por e-mail, processamento das filas Supervisor, PDFs, storage MinIO, backups/restauração e alertas de falha.
- [ ] Testar cancelamento, mudança de plano, reativação, recibos e suporte.
- [ ] Configurar alertas internos de erro no checkout/webhook e cadastro sem ativação.
- [ ] **Antes de ofertar anual:** implementar e testar o contrato/ciclo anual, renovação, mudança de plano e política de cancelamento/estorno no Asaas; a documentação existente não demonstra isso.

**Aceite:** tester consegue contratar um plano e utilizar uma ficha real, do cadastro ao PDF concluído, sem intervenção de administrador; pagamentos duplicados não geram dupla assinatura.

### M-02 — Eventos de produto + recuperação de leads

**Eventos mínimos** (sem CPF, dados clínicos ou texto do formulário no payload analítico):

- `signup_started`, `signup_completed`, `email_verified`, `trial_started`
- `onboarding_segment_selected`, `template_selected`, `template_import_started`
- `template_created`, `template_published`, `first_form_shared`, `first_protocol_completed`
- `checkout_started`, `checkout_failed`, `payment_confirmed`, `subscription_cancelled`

Persistir `organization_id`, instante, canal/UTM e propriedades não sensíveis. Distinguir lead, organização, pessoa e evento; evitar duplicação por retries.

**Funil no admin da plataforma:** visitante → cadastro → e-mail validado → primeiro modelo → link compartilhado → primeiro protocolo → checkout → pagamento. Filtros por nicho, origem e coorte.

**Comunicação operacional:** e-mail automático após cadastro; orientação se o modelo não foi criado; alerta interno para lead com tentativa de checkout falha; lembrete útil durante trial. WhatsApp ativo apenas com base legal adequada, opt-in quando aplicável e cadência respeitosa. Não prometer atendimento humano imediato se não haverá capacidade.

**Aceite:** a plataforma identifica em qual etapa cada organização abandonou e alerta falhas importantes sem expor saúde/PII em analytics.

### M-03 — Nova proposta comercial e planos claros

**Hero recomendado hoje (sem anunciar IA antes de liberar):**

> **Suas fichas e consentimentos, agora digitais.**  
> Escolha um modelo, envie pelo celular ou use no tablet da recepção. O paciente preenche e assina; você recebe o PDF e o histórico organizado.  
> **CTA:** Testar grátis por 14 dias  
> **CTA secundário:** Ver uma ficha funcionando

**Hero após o importador comprovadamente liberado:**

> **A ficha que você já usa, sem papel e sem precisar recriar do zero.**  
> Envie um PDF ou foto, confira os campos identificados e publique sua ficha digital para o paciente preencher e assinar.  
> **CTA:** Digitalizar minha ficha

**Site atual observado:** apresenta benefícios de documentação verificável, Modo Totem, biblioteca, Link na Bio, demos e trial; **não publica preço definido**, usando “Sob consulta” no pós-trial. Não atribuir à landing recursos inexistentes.

**Mudanças:**

1. Mostrar **preços mensais e anuais transparentes**, limites e comportamento do teste.
2. Demonstração de **modelo original → ficha digital → assinatura → protocolo**.
3. Mostrar o **Link na Bio** como canal público; não fingir que equivale a agenda completa.
4. Página por segmento e seção “Para quem não é”: não substitui ERP/prontuário.
5. Exibir modalidades reais de assinatura e canais; compartilhar link via WhatsApp não é igual a envio automático via Evolution.
6. Evidências e mecanismos de assinatura descritos factualmente, sem afirmar validade jurídica em todos os cenários.
7. Revisar numerais de “quantidade de templates” entre landing, blog e biblioteca real. Preferir dado automático confirmado.
8. Provas sociais somente com consentimento e testemunhos reais; nunca inventar números de clínicas, conversão ou resultados.
9. FAQ com preço, cancelamento, propriedade dos documentos, exportação, WhatsApp, segurança e diferença para software de gestão.

**Aceite:** plano, preço, limites e CTA estão visíveis sem cadastro; visitante entende em até um olhar o produto e o que não faz.

### M-04 — Onboarding orientado a valor

**Primeiro acesso:** perguntar especialidade → sugerir 3 modelos relevantes → três caminhos: **Usar modelo**, **Importar minha ficha** (quando pronto), **Criar do zero** → prévia → publicar → compartilhar link → visualizar primeiro protocolo.

- Não exigir integrações com outros serviços para o primeiro sucesso.
- Permitir “enviar para mim mesmo” com dados fictícios de teste ou ambiente sandbox claramente identificado.
- Mostrar checklist de 3 passos e progresso persistente.
- Mostrar tempo de trial e CTA de assinatura em local previsível, sem bloquear tarefas essenciais de demonstração de forma inesperada.
- Para fichas clínicas que exigem identificação do paciente, explicar CPF/código + nascimento e eventuais etapas OTP antes da demonstração.

**Aceite:** novo usuário encontra e publica uma ficha sem depender do suporte, e o tempo até a primeira conclusão é mensurável.

### M-05/M-06 — Importador Inteligente de Fichas (IA)

**Proposta:** `Enviar PDF/fotos → extrair estrutura → validar → comparar com original → revisar → salvar como modelo → publicar`. Não processar ficha preenchida como histórico clínico nesta primeira versão.

**Entradas da V1:** PDF digital ou digitalizado; JPG/PNG; múltiplas páginas; escolha/ajuste da sequência. Imagens ruins devem gerar alerta e pedido de nova foto.

**Campos de saída:** seção/grupo, pergunta, `type` (`text`, `textarea`, `date`, `number`, `radio`, `checkbox`, `select`, `signature`, etc.), `required`, alternativas, ordem, visibilidade condicional e referência da página/trecho original. Tipos devem ser mapeados para o schema **real** suportado por `form_fields`.

**Exemplo da ficha enviada:**

- Pergunta “Pressão”: `radio` com opções hipotensão, hipertensão, pressão normal.
- “Renal? Sim/Não; Qual?”: `radio` seguido de texto exibido somente quando “Sim”.
- Seções separadas: dados pessoais, emergência, avaliação/hábitos, histórico e distúrbios.
- Páginas numeradas 1, 2 e 3 recebidas fora de sequência → ordenação manual e heurística opcional.
- Não considerar campo clínico como “aprovado” só porque a IA reconheceu texto corretamente.

**UI do revisor:**

- [ ] Etapa 1: upload/ordenação, orientação de qualidade e confidencialidade.
- [ ] Etapa 2: processamento assíncrono com estado real da tarefa (`queued`, `processing`, `completed`, `failed`).
- [ ] Etapa 3: layout lado a lado (imagem/PDF original × estrutura de campos), destaque do campo relacionado e navegação por página.
- [ ] Etapa 4: reordenar, editar, excluir, acrescentar campo, opções, obrigatoriedade e regras condicionais.
- [ ] Alertas de trecho ilegível, opção inconsistente, campo possivelmente omitido e dúvidas de classificação.
- [ ] Prévia mobile e simulação com respostas fictícias.
- [ ] Botões **Salvar rascunho**, **Voltar à revisão**, **Publicar**; somente a ação humana explícita publica.
- [ ] Conteúdo original não é modificado e fica acessível enquanto a revisão estiver ativa, sob política de retenção.
- [ ] Bloquear publicação se erro crítico de schema; mostrar warnings não críticos.

**Arquitetura proposta:**

- Laravel: `FormImportController`, `FormImportService`, `FormImportJob`, `FormSchemaValidator`, `DocumentExtractionProvider` (abstração de IA), `FormImportMapper`.
- API **nova, a definir**: `POST /api/v1/form-imports`, `GET /api/v1/form-imports/{id}`, `PATCH /api/v1/form-imports/{id}/draft`, `POST /api/v1/form-imports/{id}/commit`, `DELETE /api/v1/form-imports/{id}`.
- Banco **novo, a definir**: `form_imports` (`id`, `organization_id`, `created_by`, `source_path`, `status`, `provider`, `model_version`, `extracted_schema_json`, `warnings_json`, `reviewed_schema_json`, `template_id`, timestamps, `error_code`). Avaliar tabela adicional `form_import_pages` para páginas/áreas referenciadas.
- Jobs: fila, timeout, retries limitados, dead-letter/log, idempotency key, rate limit por tenant, cancelamento e limpeza.
- Storage privado MinIO/S3 com expiração da fonte; sem expor URLs públicas permanentes dos arquivos.
- Ao confirmar, salvar nas tabelas existentes `form_templates`, `form_fields` e versões usando o serviço atual de versionamento; não criar motor paralelo de formulários.
- Contrato de provedor multimodal intercambiável, com controle de custo, retenção do fornecedor e proteção de dados; não atrelar o domínio a um único modelo externo.

**Segurança e compliance:** minimizar dados enviados ao provedor, preferir fichas em branco, obter compromisso contratual adequado para dados sensíveis se necessário, consentimento/base legal quando aplicável e não enviar dados clínicos a logs, analytics ou sistema de suporte. Política documentada de retenção, exclusão, auditoria e incidentes.

**Portão de validação antes de produção:** testar 10 documentos vazios de formatos diferentes (incluindo as 3 páginas enviadas); classificar campos corretos/omitidos; medir minutos de revisão; observar 5 profissionais usando e solicitar compromisso de pagamento de pelo menos 3. Esses números são **critérios internos sugeridos**, não dados de mercado. Liberar gradualmente com revisão humana obrigatória.

**Aceite:** modelo final corresponde ao documento que o profissional aprovou; perguntas com “Sim/Não + Qual?” funcionam condicionalmente; nenhum resultado de IA é publicado automaticamente.

### M-08 — Histórico por pessoa

Mostrar em `Pessoas → Detalhes` uma linha do tempo documental com: modelo, versão, data, situação, profissional, PDF, status de revisão e solicitação de novo consentimento. Reaproveitar `form_submissions`, `document_sends` e `submission_events`; não inventar prontuário médico longitudinal.

**Aceite:** recepção localiza em poucos cliques um documento assinado de uma pessoa e verifica quando foi criado/assinado/revogado.

### M-09 — Link na Bio e agendamento sem agenda própria

O `Link na Bio` é **vitrine/canal**, não motor de reservas. Acrescentar item configurável “Agendar atendimento”, com destino:

- URL externa validada (Calendly/agenda escolhida pelo profissional, sem endosso exclusivo);
- integração Feegow já configurada, onde fluxo suportado;
- futura URL da agenda Gestgo, somente quando lançada.

Regras: não prometer disponibilidade em tempo real para URL externa; validar URL/HTTPS e impedir redirecionamentos abusivos; registrar cliques já compatíveis com analytics de Link na Bio, sem incluir dados de saúde.

**Aceite:** profissional cadastra CTA de agenda e o paciente abre destino correto; link público continua funcionando sem módulo nativo.

### M-10 — Agenda nativa (somente após portão comercial)

**Condição para entrar no roadmap:** entrevistar pelo menos 10 leads do segmento foco e identificar 5 para quem agenda é impedimento concreto de contratação, incluindo ao menos 3 compromissos comerciais. Limiares internos sugeridos, não benchmarks.

MVP, se aprovado: serviços/duração, expediente, exceções/folgas, 1 profissional, reservas públicas, horários disponíveis, reagendamento/cancelamento com política simples, vínculo com `people`, e a possibilidade de disparar o **formulário correto após confirmação**. Notificação inicial por e-mail; WhatsApp automático só com integração confiável, controle de opt-in e custo explicitado.

**Dados propostos:** `appointment_services`, `availability_rules`, `availability_exceptions`, `appointments`, `appointment_events`, sempre com `organization_id`. Prevenir conflito de reservas atomicamente (transação/constraint adequada) e não só via validação no frontend. Modelar consentimento e histórico sem fundi-los no cadastro de reserva.

**Não no MVP:** pagamentos de sessões, salas/equipamentos, estoque, comissões, grupos, faturamento, teleconsulta, financeiro.

---

## 4. Preços recomendados para testar

### 4.1 Política comercial inicial

| Plano | Mensal proposto | Anual à vista proposto | Perfil |
|---|---:|---:|---|
| **Essencial** | **R$ 39/mês** | **R$ 390/ano** | Profissional sozinho com documentação recorrente |
| **Profissional** | **R$ 79/mês** | **R$ 790/ano** | Profissional de alto volume ou equipe pequena |
| **Clínica** | **R$ 149/mês** | **R$ 1.490/ano** | Equipe com recepção, protocolos e maior volume |

**Cálculo:** cobrança anual = 10 × valor mensal (12 meses de acesso pelo preço de 10; desconto de 16,67% sobre 12 mensalidades). **Não são preços validados**; testar antes de torná-los definitivos.

**Trial:** manter 14 dias, sem cartão, se o operacional já estiver comprovadamente funcional. Após trial, deixar o usuário exportar dados conforme política/legal e contratar com transparência, sem prometer uso ilimitado sem pagamento.

### 4.2 Proposta de limites para modelagem (hipóteses, NÃO existentes)

| Recurso | Essencial | Profissional | Clínica |
|---|---:|---:|---:|
| Usuários internos | 1 | 3 | 10 |
| Organizações incluídas | 1 | 1 | 1 |
| Modelos ativos | 10 | 30 | 100 |
| Protocolos/documentos concluídos por mês | 100 | 500 | 2.000 |
| Importações com IA por mês | 2 | 5 | 15 |
| Link na Bio | 1 página | 1 página | 1 página |
| PDF e assinatura | Sim | Sim | Sim |
| Versão/histórico | Sim | Sim | Sim |
| Modo Totem | Sim | Sim | Sim |
| Dossiê/auditoria | Sim | Sim | Sim |
| API/webhooks avançados | Opcional pago ou não | A avaliar | Incluídos após revisão de custos |
| Agenda própria | **Não inclusa/prometida** | **Não inclusa/prometida** | **Não inclusa/prometida** |

**Observações essenciais:**

- A documentação atual comprova alguns limites de usuário/organização, **não** essas cotas de protocolo, modelo ou IA. Implementar medição, avisos e política de excedente antes de comunicar limites como existentes.
- Não oferecer WhatsApp automático ilimitado: Evolution, mensagens oficiais, integração externa e suporte têm custos/restrições distintos; compartilhamento manual de link não é envio automatizado.
- Não contar reprocessamentos internos por falha como importação cobrável.
- Definir o que acontece ao atingir limite: avisar com antecedência, permitir upgrade e não apagar/bloquear leitura do histórico existente.
- Para clientes antigos, aplicar regra explícita de grandfathering/migração de contrato.
- O plano Essencial só é sustentável se **onboarding e suporte forem predominantemente self-service**; medir CAC, tickets de suporte, custo de IA, storage, e-mail e impostos.

### 4.3 Por que não começar em R$ 97 para todos?

FisioManage Pro anuncia R$ 39,99/mês e Agendiva Solo R$ 39,90/mês, ambos com funcionalidades amplas além de fichas. Prenote apresenta planos promocionais e formulários com IA até no plano grátis. ZenFisio Profissional anuncia R$ 79/mês e cobra assinatura eletrônica como adicional. Assim, **R$ 97 como único plano de entrada exige prova de valor especializado que ainda não foi demonstrada**. Não resolver isso construindo um ERP.

**Pesquisa de preço recomendada:** apresentar solução em uso a pelo menos 10 prospects qualificados de um único nicho; testar percepção de R$ 39/79 e separar objeção de **preço** de objeção de **falta de agenda/prontuário**. Não afirmar elasticidade estatística com amostra tão pequena.

---

## 5. Quais nichos atacar — ordem e limites

A seleção abaixo combina: aderência ao núcleo documental, observações da cliente entrevistada, potencial de aquisição por busca e pressão competitiva. Não há dados confiáveis de TAM/CAC para o Gestgo; notas são hipóteses de prioridade.

### N1 — Fisioterapia dermatofuncional (prioridade: validar imediatamente)

**Problema:** a profissional tem ficha própria, precisa de anamnese ajustada à especialidade, quer agenda/lembretes e trabalha sozinha. A única entrevista real fornecida é deste perfil; **ela escolheu um concorrente**, portanto não conta como venda validada.

| Critério (1–5, maior = melhor) | Nota | Justificativa em uma frase |
|---|---:|---|
| Dor + moat técnico | 3 | Ficha própria e histórico têm dor real, mas importação genérica por IA é clonável. |
| Disposição de pagar | 2 | FisioManage Pro por R$ 39,99/mês oferece agenda, anamnese e WhatsApp, pressionando ticket. |
| Distribuição | 3 | Páginas específicas de anamnese e busca por especialidade são possíveis, mas canais do Gestgo ainda não foram medidos. |
| Operação solo | 3 | Modelos especializados reduzem suporte, porém pedidos de agenda/prontuário podem criar frustração. |
| Baixa saturação | 2 | Gestão de fisioterapia já tem concorrentes diretos e completos. |
| MVP enxuto que cobra | 4 | Demonstrar a ficha real digitalizada, enviá-la e fechar protocolos testa valor sem novo ERP. |

**Veredito N1:** **PIVOTAR** para documentação e importação de fichas próprias; não entrar com promessa de gestão completa da fisioterapia.

### N2 — Estética facial/procedimentos avançados (prioridade comercial alta)

**Problema:** anamnese, consentimento por procedimento, revisões e registros de assinatura. A documentação atual e a ficha facial fotografada são fortemente compatíveis com esse uso; a disposição de pagar pelo Gestgo ainda não foi validada.

| Critério | Nota | Justificativa em uma frase |
|---|---:|---|
| Dor + moat técnico | 4 | Versionamento, evidências e revisão por procedimento formam uma jornada mais defensável do que formulário isolado. |
| Disposição de pagar | 3 | Agendiva Solo custa R$ 39,90/mês e Pro R$ 49,90/mês, então preço superior depende de valor documental demonstrado. |
| Distribuição | 4 | Busca por modelo de anamnese facial e termo de microagulhamento tem exemplos reais de páginas concorrentes. |
| Operação solo | 2 | Documentos de risco e questionamentos jurídicos podem exigir suporte e revisão especializada. |
| Baixa saturação | 2 | Existem sistemas e bibliotecas gratuitas de documentos bem posicionados no segmento. |
| MVP enxuto que cobra | 4 | Pacote de modelos revisáveis + importação de documento próprio + protocolo pode ser vendido sem agenda nativa. |

**Veredito N2:** **GO controlado**, com uma landing por procedimento e forte cuidado com alegações legais; pode superar N1 em conversão, mas depende de evidência.

### N3 — Micropigmentação (experimento adjacente)

**Problema:** anamnese, histórico de cicatrização/alergias, consentimento, autorização de imagem e acompanhamento de retoque; todos exigem validação com profissionais reais.

| Critério | Nota | Justificativa em uma frase |
|---|---:|---|
| Dor + moat técnico | 3 | Há documentação recorrente, mas a complexidade técnica e o moat são menores que em clínicas com fluxos de aprovação. |
| Disposição de pagar | 2 | Há materiais e produtos concorrentes, mas não há entrevista ou preço de referência confiável específico neste recorte. |
| Distribuição | 3 | Buscas por “ficha de anamnese micropigmentação” já atraem conteúdo gratuito de concorrentes. |
| Operação solo | 4 | Fluxo simples por profissional reduz multiusuário e integração, embora suporte documental continue necessário. |
| Baixa saturação | 2 | Páginas de ficha gratuita com conversão para produto digital já existem. |
| MVP enxuto que cobra | 4 | Uma ficha e um termo editáveis, com assinatura por link, bastam para o primeiro teste. |

**Veredito N3:** **VALIDAR/GO somente após entrevistas**; não investir em página e biblioteca extensa antes de obter interesse explícito.

### Nichos adiados

- **Odontologia:** documentação tem importância, mas necessidades clínicas especializadas e concorrentes de prontuário aumentam integração e suporte; retornar após prova no fluxo documental.
- **Veterinária:** há templates no produto, porém nenhuma evidência de demanda pagante foi fornecida; não criar campanha dedicada ainda.
- **Clínicas gerais/médicas:** categoria ampla demais para adquirir clientes com proposta de valor específica e maior complexidade regulatória.

**Alocação inicial recomendada:** focar as primeiras entrevistas em N1 e N2; N3 fica como teste leve, não um terceiro roadmap completo.

---

## 6. Páginas de vendas específicas por público

### 6.1 Arquitetura de informação proposta

```
/
/planos
/para/fisioterapia-dermatofuncional
/para/estetica-facial
/para/micropigmentacao              # lançar só após sinais concretos
/modelos/anamnese-fisioterapia-dermatofuncional
/modelos/ficha-anamnese-facial
/modelos/termo-consentimento-microagulhamento
/como-funciona/importar-ficha       # após IA pronta
```

**Padrão de página:** título de dor específica; o que a ferramenta faz; exemplo visual daquele nicho; como importar/editar/enviar (apenas recursos realmente disponíveis); exemplos de documentos; preço claro; FAQ específico; CTA de teste; segundo CTA para ver uma demonstração. Não duplicar uma página genérica trocando apenas o título — isso prejudica utilidade e SEO.

### 6.2 Landing: fisioterapia dermatofuncional

**URL:** `/para/fisioterapia-dermatofuncional`  
**SEO title proposto:** `Anamnese digital para fisioterapia dermatofuncional | Gestgo`  
**H1:** `Sua ficha de anamnese dermatofuncional, pronta para preencher pelo celular.`  
**Subtítulo:** `Use um modelo adaptável, envie antes do atendimento e organize respostas e documentos assinados em um só lugar.`  
**CTA:** `Testar ficha digital grátis`  
**Exemplo visual:** ficha de anamnese facial com histórico de tratamentos, hábitos e distúrbios, comparando papel e formulário digital.  
**FAQ-chave:** serve para dermatofuncional? Posso adicionar minhas perguntas? Substitui agenda/prontuário? Como o paciente assina?  
**Oferta a testar:** Essencial R$ 39/mês e Profissional R$ 79/mês.

### 6.3 Landing: estética facial e procedimentos

**URL:** `/para/estetica-facial`  
**SEO title proposto:** `Ficha de anamnese e consentimento para estética facial | Gestgo`  
**H1:** `Anamneses e consentimentos digitais para os procedimentos da sua clínica.`  
**Subtítulo:** `Organize as perguntas por procedimento, colete assinatura e mantenha versões e protocolos disponíveis para consulta.`  
**CTA:** `Ver uma anamnese digital`  
**Exemplo visual:** fluxo anamnese → termo → assinatura → protocolo, com amostra de campos configuráveis.  
**FAQ-chave:** posso usar meus termos? Como funciona o histórico? É preciso tablet? Como ficam as evidências?  
**Cuidado:** não prometer termo “aprovado pela Anvisa”, cobertura legal automática ou redução de risco jurídico quantificada.

### 6.4 Landing: micropigmentação (condicional)

**URL:** `/para/micropigmentacao`  
**H1:** `Sua anamnese e consentimento de micropigmentação, sem papel.`  
**Subtítulo:** `Personalize perguntas, envie antes do procedimento e arquive o documento assinado.`  
**Exemplo visual:** alergias, cicatrização, procedimento, autorização de uso de imagem separada da finalidade clínica.  
**CTA:** `Experimentar ficha digital`  
**Condição:** publicar depois de 5 entrevistas e no mínimo 2 usuários dispostos a testar um modelo específico.

### 6.5 Estratégia de distribuição: conteúdo útil, não blog genérico

**Modelo de aquisição:** uma página de material gratuito por dor real → demonstração da **mesma ficha** em formato digital → opção de duplicar para conta Gestgo. Exemplos reais de páginas que já fazem aquisição via ficha/modelo: Iter Clinic (anamnese estética e termo de microagulhamento), Stech (micropigmentação), Agendiva (gerador de anamnese). Isso demonstra que o canal **é utilizado por concorrentes**, não que dará tráfego garantido ao Gestgo.

**Sequência de conteúdo:**

1. `Ficha de anamnese facial em PDF: modelo e versão digital`.
2. `Anamnese para fisioterapia dermatofuncional: perguntas editáveis`.
3. `Termo de consentimento para microagulhamento: como organizar e coletar assinatura`.
4. `Como transformar sua ficha impressa em formulário digital` — publicar como demonstração de IA **após** disponibilizar.

**Não fazer:** copiar textos/modelos jurídicos de terceiros sem licença e revisão; publicar conteúdo raso para dezenas de especialidades; prometer “100% válido juridicamente”; usar SEO como substituto de validação comercial.

**Medição por página:** impressões/cliques orgânicos (Search Console), visitas, `template_preview_opened`, início de trial, primeiro protocolo, pagamento e churn por segmento. Não decidir com base apenas em visitas.

---

## 7. Experimentos comerciais: validar antes de ampliar o produto

### Experimento E1 — A origem dos 25 cadastros

Recuperar no admin os contatos e datas, organizar status de cada conta: não ativou, criou modelo, compartilhou link, concluiu protocolo, checkout falhou, pagou, churn, desconhecido. Enviar comunicação individualizada e breve dentro da base legal aplicável; perguntar qual necessidade os trouxe, qual etapa travou e qual alternativa escolheram. Não considerar cadastro como venda validada.

**Resultado a registrar:** número contatado, respostas, objeções, uso documentado, tentativas de pagamento, conversões efetivas. Sem antecipar porcentagens.

### Experimento E2 — Concierge de migração de ficha

Convidar 5–10 profissionais a enviar **modelo em branco**, converter de forma assistida no protótipo/processo experimental, pedir que revisem as perguntas e publiquem. Registrar número de correções, tempo investido, dúvidas e se usaram a ficha com um paciente real depois.

**Pergunta de pagamento:** “Você contrataria este fluxo por R$ 39 ou R$ 79/mês para seu volume real de atendimentos?” Registrar **comportamento** (checkout/compromisso) e não apenas elogios.

### Experimento E3 — Comparação por segmento

Mesma proposta funcional com exemplos diferentes para N1 e N2. Acompanhar origem, ativação, primeiro documento e conversão por cohort; amostras pequenas não justificam A/B test estatístico complexo.

### Experimento E4 — Agenda como objeção

Nas entrevistas, registrar se a falta de agenda é impeditiva, desejável ou irrelevante. Primeiro oferecer CTA de agendamento externo no Link na Bio. Somente depois testar pagamento por agenda nativa integrada; não basta o lead afirmar que “seria legal”.

---

## 8. Plano de entrega, por portões de decisão

### Ciclo A — Operação comercial confiável (primeiro)

- Executar checklist M-01 e correções de produção.
- Medir funil mínimo M-02 e revisar todos os 25 cadastros.
- Publicar novos preços apenas quando ciclo mensal/anual correspondente estiver funcional.
- Ajustar hero, demonstração e FAQ M-03.

**Portão A:** cadastro → primeiro uso → checkout → pagamento → protocolo íntegro, demonstrados em produção.

### Ciclo B — Ativação e páginas focadas

- Implementar onboarding M-04.
- Publicar duas landings de nicho (N1/N2), com exemplos e CTAs distintos.
- Instrumentar conversão por origem/página, sem PII clínica.
- Implementar M-09 como CTA externo simples no Link na Bio.

**Portão B:** usuários do nicho conseguem publicar a primeira ficha sem o fundador; principais pontos de abandono ficam visíveis.

### Ciclo C — IA validada, depois produto

- PoC com 10 fichas em branco de diferentes qualidades.
- Revisão de fidelidade, schema e segurança.
- Piloto assistido com 5 profissionais e teste de disposição real de pagamento.
- Se aprovado: implementar M-06 com filas, editor e rollout gradual.

**Portão C:** ao menos 3 compromissos reais de pagamento, custo por importação aceitável e ausência de erros críticos não revisáveis; revisar limiar conforme budget.

### Ciclo D — Expansão controlada

- Melhorar histórico por pessoa M-08.
- Otimizar conversão e onboarding por nicho com dados coletados.
- Decidir M-10 (agenda própria) com base na objeção pagante, não por paridade com concorrentes.

**Calendário:** nenhum prazo fixo é prometido sem horas/semana e orçamento; trabalhar por ciclos com portões de aceite, não por lista de funcionalidades interminável.

---

## 9. Regras transversais de engenharia

**Arquitetura:** manter Angular 21 como UI principal, Laravel 12 API `/api/v1`, PostgreSQL, MinIO/S3 privado, filas com Supervisor e versionamento existente. Angular deve acompanhar tokens do Gestgo/Nord: marca `#14B87A`, Inter, bordas discretas em vez de sombras pesadas, suporte a dark mode; não introduzir um quarto framework de componentes.

**Multi-tenant:** toda entidade nova operacional usa `organization_id`, escopos e testes de isolamento entre empresas. Nunca aceitar `organization_id` livre no request sem validar autorização/contexto.

**Documentação/evidências:** alterações de modelo importado geram versão/snapshot conforme serviço atual. Histórico e dossiês de protocolos antigos não mudam ao editar o modelo.

**Conformidade:** documento com dado de saúde exige proteção apropriada; não tratar foto preenchida como arquivo inofensivo. Definir retenção e descarte de fontes de importação, política de subprocessadores IA, acordos contratuais e plano de incidentes. Não afirmar que OTP ou canvas dão automaticamente a mesma qualificação jurídica de assinatura digital ICP-Brasil.

**Observabilidade:** erros de geração PDF, fila, importação, envio e pagamento precisam de alerta e correlação (`request_id`/job id), com redaction de dados pessoais.

**Resiliência:** retries idempotentes e testados para webhooks/job; medidas de quotas/limites não devem bloquear leitura/exportação de documentos anteriores.

**Testes de ponta a ponta:** onboarding, upload de 3 fotos fora de ordem, falha de extração, editar condição “Sim → Qual?”, criar versão, preencher em mobile, assinatura/OTP, download, billing/trial e permissão entre duas organizações.

---

## 10. Métricas que realmente importam

| Métrica | Definição | Decisão que influencia |
|---|---|---|
| Ativação | % de contas novas que publicam primeiro modelo e concluem primeiro protocolo | Qualidade do onboarding |
| Tempo até valor | Tempo entre signup e primeiro protocolo concluído | Atrito inicial |
| Conversão paga | Organizações pagantes ÷ trials iniciados, pela mesma coorte | Preço/proposta |
| Retenção | Organizações pagantes ainda ativas após 30/60/90 dias | Utilidade recorrente |
| Frequência documental | Protocolos concluídos por organização ativa/mês | Necessidade real |
| Uso do importador | Importações iniciadas, revisadas, publicadas; minutos de correção | Economia de esforço real |
| Erros críticos | Jobs PDF/importação/envio/pagamento que falham e exigem ação | Confiabilidade/custo de suporte |
| Custo por cliente | AI + storage + mensagens + suporte + billing por organização pagante | Sustentabilidade do preço |
| Conversão por nicho | Trial → primeiro protocolo → pagamento por página/UTM | Onde concentrar aquisição |

**Não existe baseline confiável nos arquivos para essas taxas.** Instrumentar primeiro, coletar dados e só então fixar metas quantitativas de crescimento.

---

## 11. Riscos que podem matar a iniciativa

1. **Construir agenda/ERP antes de conseguir cobrança e ativação estáveis:** grande esforço, sem provar vantagem competitiva.
2. **Assumir que 25 cadastros validaram preço e nicho:** sinal de curiosidade/interesse, não de retenção e pagamento.
3. **Comprometer-se com R$ 39 e suporte manual ilimitado:** preço baixo com operação cara destrói margem.
4. **Prometer IA perfeita:** erros de documento sensível criam responsabilidade e suporte; exigir revisão humana.
5. **Marketing excessivamente jurídico:** risco ao afirmar validade universal de assinatura, conformidade regulatória ou segurança clínica.
6. **Dependência de integração externa sem contingência:** WhatsApp/Feegow/fornecedor IA podem falhar; o produto básico precisa continuar útil.
7. **SEO genérico saturado:** concorrentes já oferecem PDFs gratuitos por procedimento; páginas precisam demonstrar ganho do fluxo digital, não apenas oferecer arquivo.

---

## 12. Checklist de definição de pronto (Definition of Done)

Para qualquer melhoria lançada:

- [ ] Necessidade e resultado esperado documentados.
- [ ] Contrato de API/schema versionado e migrations testadas.
- [ ] Permissões por organização e tratamento de PII verificados.
- [ ] Teste automatizado das rotas críticas e fluxo mobile.
- [ ] Estados de loading, vazio, falha, retry e sucesso tratados.
- [ ] Instrumentação do funil/erro implantada.
- [ ] Custos variáveis e limites comercialmente conhecidos.
- [ ] Mensagens comerciais fiéis ao funcionamento publicado.
- [ ] Suporte/FAQ e possibilidade de recuperação em falhas.
- [ ] Deploy reversível, backup/restauração e monitoramento.

---

## 13. Referências públicas de preço e canal

Consultadas em 14/10/2026. Valores são ofertas divulgadas por terceiros, sujeitos a mudança e promoções; verificar antes de publicar comparativos externos.

- **FisioManage:** https://app.fisiomanage.com.br/ — Pro R$ 39,99/mês; agenda, anamnese, WhatsApp e recursos adicionais.
- **Agendiva:** https://agendiva.com.br/precos — Solo R$ 39,90/mês e R$ 399/ano; Pro R$ 49,90/mês; agenda/anamnese e outros recursos.
- **ZenFisio:** https://www.zenfisio.com/planos-precos — Profissional R$ 79/mês e módulo de assinatura eletrônica adicional de R$ 19/mês.
- **Prenote:** https://prenote.app/precos — plano grátis e ofertas promocionais para planos pagos; verificar valor vigente antes de comparar e notar limites de IA.
- **Iter Clinic (exemplo de aquisição orgânica por modelos):** https://www.iterclinic.com/modelos/ficha-de-anamnese e https://www.iterclinic.com/modelos/termo-de-consentimento/microagulhamento.
- **Stech (exemplo de aquisição por subnicho):** https://stech.app.br/blog/modelos/ficha-de-anamnese-micropigmentacao.
- **Agendiva (exemplo de ferramenta gratuita para atrair público):** https://agendiva.com.br/gerador-de-ficha-de-anamnese-estetica.
- **Página pública atual Gestgo:** https://gestgo.com.br/.

Fontes internas: `01_PRD.md`, `02_TRD.md`, `03_FLUXOS.md`, `04_DESIGN_SYSTEM.md`, `05_BANCO_POSTGRES.md`, `06_PLANO.md`, `chat.txt` e imagens da ficha facial (3 páginas).

---

## 14. Questões em aberto para congelar o escopo

1. Quantas **horas por semana** podem ser dedicadas ao Gestgo (sem contar outras atividades)?
2. Qual o **capital disponível** para desenvolvimento, infraestrutura, aquisição e fornecedores de IA?
3. Aceita **conversar ativamente** com os 25 cadastrados e 5–10 prospects ou quer estritamente self-service?
4. Qual é o **estado real da produção**: houve cobranças efetivadas, clientes pagantes, uso de protocolos e tickets de suporte? (Documentos não demonstram estas métricas.)
5. O plano **anual** já tem fluxo e política contratual implementados? (Não consta do TRD/PRD fornecido.)

**Veredito geral: PIVOTAR o foco comercial e a ativação, não reconstruir o produto.** A prioridade é transformar interesse em uso e cobrança; importação de fichas próprias é a aposta diferenciadora a validar, enquanto agenda completa permanece bloqueada por evidência de disposição de pagar.
