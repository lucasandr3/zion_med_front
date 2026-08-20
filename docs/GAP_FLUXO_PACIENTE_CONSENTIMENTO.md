# Gap-list — Fluxo ideal do paciente (consentimento / protocolo)

**Objetivo:** fechar a distância entre o fluxo desejado pelo produto e o que o sistema faz **hoje**.

**Repos relacionados:**
- Front: `docs/ROADMAP_ZONELESS_SIGNALS.md`
- Back: `docs/ROADMAP_MODERNIZACAO_API.md`
- Spec assinatura: `zion_med/docs/SPEC_CONCORRENCIA_ASSINATURA_DIGITAL.md`

---

## Fluxo desejado (fonte da verdade de produto)

1. Paciente se identifica informando **nome**, **data de nascimento** e **CPF**
2. Esses dados são **inseridos no formulário / PDF**
3. Paciente **confirma o entendimento**
4. Paciente **assina**
5. Sistema **gera o PDF** com o conjunto dos dados e **disponibiliza cópia para a clínica e para o paciente**

---

## Matriz gap × status

| # | Desejado | Hoje | Status | Severidade |
|---|----------|------|--------|------------|
| 1 | Nome + nascimento + CPF no gate | Gate: CPF+nascimento **ou** código+nascimento; **nome não é digitado** (vem do cadastro). Gate pode estar **desligado** | **GAP** | Alta |
| 2 | Dados vão para formulário e PDF | Prefill parcial (nome/nascimento); **CPF omitido do prefill (LGPD)**; PDF só com `submission_values` | **GAP** | Alta |
| 3 | Confirma entendimento | Existe para `document_kind=consentimento` (ack + scroll; quiz opcional) | **OK** (condicional) | — |
| 4 | Assina | Canvas se o template tiver campo `signature` | **OK** (condicional) | — |
| 5a | Gera PDF com dataset | PDF **on-demand** (DomPDF), não no submit | **PARCIAL** | Média |
| 5b | Cópia para clínica | E-mail aviso **sem PDF**; download autenticado em Protocolos | **PARCIAL** | Média |
| 5c | Cópia para paciente | Só nº do protocolo na tela de sucesso; **sem download/e-mail** | **GAP** | Alta |

---

## Fluxo atual (referência)

```text
GET  /api/v1/formulario-publico/{token}
 → (opcional) POST .../validate-person   [CPF|código + nascimento]
 → preenche campos (+ prefill Person sem CPF)
 → (se consentimento) ack / scroll / quiz
 → (se signature) canvas + (_accept_terms)
 → (se reinforced) OTP
 → POST .../submit
 → tela /f/sucesso  [apenas protocol_number]
 → clínica: e-mail protocol-new + notificação in-app
 → clínica baixa PDF depois: GET /api/v1/protocols/{id}/pdf
```

**Arquivos-chave**

| Camada | Caminho |
|--------|---------|
| Front gate | `formulario-publico-gate.*`, `formulario-publico-show.component.ts` |
| Front consent | `formulario-publico-consent.*` |
| Front sucesso | `formulario-publico-sucesso.*` |
| Front API | `core/services/formulario-publico.service.ts` |
| Back show/validate/submit | `PublicFormApiController` |
| Prefill | `buildPersonPrefillData` (omite CPF) |
| Persistência | `SubmissionService` |
| PDF | `PdfService` + `resources/views/pdf/submission.blade.php` |
| E-mail clínica | `emails/protocol-new` |
| Download clínica | `ProtocolController::pdf` / `dossie` |

---

## Gaps detalhados e propostas

### GAP-01 — Identificação: nome + nascimento + CPF

**Problema**  
O produto quer três dados digitados pelo paciente. Hoje:
- modo `cpf`: CPF + nascimento (nome só após match com `Person`);
- modo `code`: código + nascimento;
- `public_require_person_link` pode ser `false` → sem gate.

**Decisão de produto (escolher uma)**

| Opção | Descrição | Prós | Contras |
|-------|-----------|------|---------|
| **A — Gate unificado** | Sempre pedir nome + CPF + nascimento; validar contra `Person` (CPF+nascimento) e conferir nome (normalizado) | Alinha 100% ao texto comercial | Nome digitado pode divergir do cadastro |
| **B — Gate CPF + confirmação de nome** | Mantém CPF+nascimento; mostra nome cadastrado e exige “Confirmo que sou {nome}” | Menos atrito; menos erro de digitação | Nome não é “informado”, é confirmado |
| **C — Cadastro on-the-fly** | Se CPF não existe, cria/atualiza Person com nome+CPF+nascimento | Cobertura sem pré-cadastro | LGPD / duplicidade / quem “cria” o paciente |

**Trabalho técnico (assumindo Opção A ou B)**

- [ ] **Back:** estender `validatePerson` e regras de submit (`_person_name` / confirmação).
- [ ] **Back:** política clara quando Person não existe (rejeitar vs criar — Opção C).
- [ ] **Front:** UI do gate com os 3 campos (ou 2 + confirmação de nome).
- [ ] **Produto:** decidir se gate vira **obrigatório** para templates `consentimento` (recomendado: sim).
- [ ] **Admin templates:** default `public_require_person_link=true` + `public_person_link_mode=cpf` para biblioteca TCLE.

**Aceite**  
Paciente não avança sem identificar-se conforme a opção escolhida; mensagem de erro clara se não bater com a clínica.

---

### GAP-02 — Dados no formulário e no PDF

**Problema**  
- Prefill público **não inclui CPF** (comentário LGPD em `buildPersonPrefillData`).
- Campos do template podem não ter alias (`nome`, `nascimento`, `documento_paciente`).
- PDF renderiza só o que está em `submission_values` + assinaturas — não há “bloco identidade” garantido.

**Proposta**

1. **Bloco identidade estruturado** no submit (metadados, não só campos livres):
   ```json
   {
     "identity": {
       "full_name": "...",
       "cpf": "***1234 ou full com base legal",
       "birth_date": "YYYY-MM-DD",
       "person_id": 123,
       "verified_at": "ISO-8601"
     }
   }
   ```
2. **Prefill:** preencher campos do template por alias **e** garantir que o bloco `identity` vá para snapshot/PDF.
3. **PDF:** seção fixa “Identificação do paciente” no Blade (`submission.blade.php`), além da tabela de respostas.
4. **LGPD:** documentar base legal para persistir CPF no protocolo assinado (finalidade do consentimento/evidência). Mascarar CPF em listagens; exibir completo só no PDF/dossiê autenticado e na cópia do próprio paciente.

**Trabalho**

- [ ] **Back:** gravar `identity` no snapshot da submission.
- [ ] **Back:** `PdfService` / Blade — seção Identificação.
- [ ] **Back:** prefill opcional de CPF **apenas** nos campos do formulário público após gate bem-sucedido (sessão do link), ou só no snapshot (preferível se o campo CPF não existir no template).
- [ ] **Front:** após gate, refletir identidade na UI (resumo “Você está preenchendo como…”).
- [ ] **Templates biblioteca:** garantir campos/aliases de nome e nascimento nos TCLE padrão.

**Aceite**  
Todo PDF de protocolo com gate/assinatura contém nome, nascimento e CPF (ou máscara + dígitos finais, se política assim definir) de forma legível e auditável.

---

### GAP-03 — Confirmação de entendimento

**Status:** em grande parte **OK** para `document_kind=consentimento`.

**Gaps menores**

- [ ] Tornar obrigatório para **todos** os templates da categoria consentimento (já é).
- [ ] Garantir que fichas que *comercialmente* são consentimento não fiquem como `ficha` sem ack.
- [ ] Incluir no PDF o registro explícito: texto do ack, timestamp, quiz (se houver), `_term_scrolled_at`.
- [ ] Copy na UI alinhada a “confirmo que li e entendi” (revisar textos do `FormularioPublicoConsentComponent`).

**Aceite**  
PDF/dossiê mostram evidência do entendimento; submit bloqueado sem ack quando for consentimento.

---

### GAP-04 — Assinatura

**Status:** **OK** quando há campo `signature`.

**Gaps menores / endurecimento**

- [ ] Para templates `consentimento`, tornar **obrigatório** pelo menos um campo `signature` (validação de template no publish).
- [ ] Incluir no PDF: imagem, nome, IP, user-agent, hashes (já há evidência parcial — auditar Blade).
- [ ] Nível `reinforced` (OTP) como default recomendado para clínicas em produção (config org).

**Aceite**  
Consentimento publicado sem assinatura não sobe; protocolo assinado sempre traz bloco de assinatura no PDF.

---

### GAP-05 — PDF + cópias clínica e paciente

#### 5.1 Geração do PDF

**Hoje:** gerado sob demanda em `GET /protocols/{id}/pdf`.  
**Desejado:** existir um artefato do “documento concluído” no momento do submit (ou imediatamente após).

**Proposta**

| Abordagem | Descrição |
|-----------|-----------|
| **Recomendada** | Job após submit: gera PDF, grava hash + path no storage, e-mail com link/anexo |
| Alternativa | Gerar síncrono no submit (risco de timeout em anexos grandes) |

- [ ] **Back:** `GenerateSubmissionPdfJob` (ou chamada em `SubmissionService` + fila).
- [ ] **Back:** persistir `pdf_path`, `pdf_sha256`, `pdf_generated_at`.
- [ ] **Back:** endpoint público autenticado por token de download de curta duração (paciente).

#### 5.2 Cópia para a clínica

**Hoje:** e-mail `protocol-new` sem anexo; download na área logada.

**Proposta**

- [ ] Anexar PDF **ou** link assinado (expira) no e-mail `protocol-new`.
- [ ] Manter download em Protocolos + dossiê ZIP.
- [ ] (Opcional) anexar só link para não estourar limite de e-mail.

#### 5.3 Cópia para o paciente — **maior gap**

**Hoje:** `/f/sucesso` só mostra `protocol_number`.

**Proposta (mínimo viável)**

1. Após submit, API devolve também:
   - `protocol_number`
   - `patient_download_token` (TTL curto, ex. 72h) **ou**
   - `patient_pdf_url` assinada
2. Tela de sucesso:
   - botão **Baixar minha cópia (PDF)**
   - opcional: campo e-mail para “enviar cópia”
3. E-mail ao paciente (se `_submitter_email` ou e-mail do Person existir):
   - assunto com protocolo
   - link de download ou anexo
4. Página pública de verificação (`/verificar/{code}`) permanece sem PII clínico; download completo só com token da sessão de sucesso / e-mail.

**Trabalho**

- [ ] **Back:** token de download paciente + rate limit.
- [ ] **Back:** mailable `protocol-patient-copy`.
- [ ] **Front:** `formulario-publico-sucesso` — download + opcional captura de e-mail.
- [ ] **Front:** service `downloadPatientCopy(token)`.
- [ ] **LGPD:** registrar no dossiê que a cópia foi disponibilizada/enviada (timestamp, canal).

**Aceite**  
Ao concluir, paciente consegue baixar o PDF na hora e/ou recebe por e-mail; clínica continua com aviso + download interno; hashes do PDF batem com o dossiê.

---

## Ordem de implementação sugerida

### Fase P0 — “Fluxo comercial honesto” (1–2 sprints)

1. **GAP-05.3** — cópia do paciente (sucesso + token/e-mail)  
2. **GAP-01** — decisão A/B/C + gate alinhado  
3. **GAP-02** — bloco `identity` no snapshot + seção no PDF  
4. Defaults de template consentimento (gate + signature obrigatórios)

### Fase P1 — Evidência e clínica (1 sprint)

5. **GAP-05.1/5.2** — PDF persistido no submit (job) + e-mail clínica com link/anexo  
6. **GAP-03/04** — ack e assinatura explícitos no PDF; validação no publish  

### Fase P2 — Endurecimento

7. OTP `reinforced` como recomendado  
8. Métricas: % protocolos com cópia baixada pelo paciente  
9. Alinhar copy marketing ↔ comportamento real  

---

## Fora de escopo deste gap-list

- Assinatura ICP-Brasil / certificado A3  
- WhatsApp como canal único de assinatura (já na SPEC longa)  
- Migração zoneless/signals (roadmap separado)  
- Troca do motor DomPDF por outro renderer (só se qualidade do PDF exigir)

---

## Checklist de aceite ponta a ponta (quando P0+P1 fecharem)

- [ ] Paciente identifica-se conforme regra escolhida (nome/CPF/nascimento).  
- [ ] Resumo de identidade visível antes de assinar.  
- [ ] Confirma entendimento (consentimento).  
- [ ] Assina.  
- [ ] Recebe/baixa PDF na conclusão.  
- [ ] Clínica recebe aviso e acessa o mesmo conteúdo (hash idêntico).  
- [ ] PDF contém identificação + respostas + entendimento + assinatura.  
- [ ] Dossiê ZIP continua exportável pela clínica.

---

## Decisão pendente (bloqueia GAP-01)

> **Produto precisa escolher:** Opção **A**, **B** ou **C** para o gate de identificação.

Até essa decisão, o restante do P0 (cópia do paciente + identity no PDF) pode avançar em paralelo com a Opção B como default técnico recomendado (CPF + nascimento + confirmação explícita do nome cadastrado).

---

## Histórico

| Data | Evento |
|------|--------|
| 2026-08-20 | Análise do fluxo atual vs desejado; gap-list criado |
