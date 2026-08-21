# Gap-list — Fluxo ideal do paciente (consentimento / protocolo)

**Objetivo:** acompanhar o fluxo desejado pelo produto vs. o que o sistema faz **hoje**.

**Repos relacionados:**
- Front: `docs/ROADMAP_ZONELESS_SIGNALS.md` (track separado: signals/OnPush)
- Back: `docs/ROADMAP_MODERNIZACAO_API.md`
- Spec assinatura: `zion_med/docs/SPEC_CONCORRENCIA_ASSINATURA_DIGITAL.md`

---

## Fluxo desejado (fonte da verdade de produto)

1. Paciente se identifica (CPF + nascimento + **confirmação do nome** cadastrado — **Opção B**)
2. Esses dados entram no **formulário / PDF** (bloco `identity`)
3. Paciente **confirma o entendimento** (consentimento)
4. Paciente **assina**
5. Sistema **gera o PDF** e **disponibiliza cópia** para clínica e paciente

---

## Matriz gap × status (atualizado 2026-08-21)

| # | Desejado | Hoje | Status |
|---|----------|------|--------|
| 1 | Identificação com nome + nascimento + CPF | Gate **Opção B**: CPF\|código + nascimento → “Confirmo que sou {Nome}”. Consentimentos exigem `person_link` no publish | **FEITO** |
| 2 | Dados no formulário / PDF | Prefill nome/nascimento; snapshot `identity` (nome, CPF, nascimento, confirmação); seção no PDF | **FEITO** |
| 3 | Confirma entendimento | Ack + scroll (+ quiz) para `consentimento`; seção “Confirmações” no PDF | **FEITO** |
| 4 | Assina | Campo `signature` obrigatório no publish de consentimento; bloco no PDF | **FEITO** |
| 5a | Gera PDF com dataset | On-demand **e** `GenerateSubmissionPdfJob` (path + sha256 no storage) | **FEITO** |
| 5b | Cópia clínica | E-mail `protocol-new` **com PDF anexado** + download autenticado preferindo `pdf_disk_path` | **FEITO** |
| 5c | Cópia paciente | Token 72h + botão em `/f/sucesso` + e-mail `protocol-patient-copy` | **FEITO** |

---

## Fluxo atual (referência pós-P0)

```text
GET  /api/v1/formulario-publico/{token}
 → POST .../validate-person   [CPF|código + nascimento]
 → UI: “Confirmo que sou {Nome}”  (_person_name_confirmed)
 → preenche campos (+ prefill Person; CPF só no snapshot/PDF)
 → (consentimento) ack / scroll / quiz
 → (signature) canvas + (_accept_terms)
 → (reinforced) OTP
 → POST .../submit
     → identity + clinical no document_snapshot
     → persiste PDF (MinIO) + e-mail clínica com anexo
     → patient_download_token (72h) + eventos dossiê
     → e-mail paciente (se houver e-mail)
     → (fallback) GenerateSubmissionPdfJob se persist sync falhar
 → /f/sucesso  [protocolo + Baixar minha cópia]
 → GET /api/v1/formulario-publico/copia/{copyToken}
 → clínica: e-mail protocol-new (anexo) + Protocolos PDF/dossiê
```

**Ops obrigatório**

```bash
# no repo zion_med
php artisan migrate
# fila para o job de PDF
php artisan queue:work
```

Migration: `2026_08_21_100000_add_patient_copy_and_pdf_to_form_submissions.php`

---

## Arquivos-chave (implementação)

| Camada | Caminho |
|--------|---------|
| Front gate B | `formulario-publico-gate.*`, `formulario-publico-show.component.ts` |
| Front sucesso / download | `formulario-publico-sucesso.*`, `formulario-publico.service.ts` |
| Front submit | `formulario-publico-submit.util.ts` (`_person_name_confirmed`) |
| Back submit / cópia | `PublicFormApiController` (`submit`, `downloadPatientCopy`) |
| Back cópia | `PatientCopyService`, `emails/protocol-patient-copy.blade.php` |
| Back identity / clinical | `SubmissionService::attachClinicalDefensibilityMeta` |
| Back PDF job | `GenerateSubmissionPdfJob` |
| PDF Blade | `resources/views/pdf/submission.blade.php` |
| Publish consent | `ClinicalStepValidationService` (`consent_requires_person_link`) |
| Biblioteca TCLE | `TemplateLibraryCatalog` (`public_require_person_link` default) |

---

## Decisão de produto (GAP-01) — fechada

> **Opção B** (2026-08-21)  
> Gate = **CPF + data de nascimento** → mostra nome do cadastro → **“Confirmo que sou {Nome}”**.  
> Não adotar A nem C neste ciclo.

---

## Backlog restante (pós-P0)

### P1 — Polimento clínico / e-mail

| ID | Item | Status |
|----|------|--------|
| R1 | Anexar PDF no e-mail `protocol-new` da clínica | **FEITO** (`finalizePublicCopyAndPdf` → anexo) |
| R2 | Servir PDF persistido no download clínica (se `pdf_disk_path` existir) | **FEITO** (`PdfService::readStoredPdf`) |
| R3 | Eventos dossiê: `patient_copy_*` + identity/pdf no ZIP | **FEITO** |
| R4 | Feature tests: gate B + cópia paciente + identity | **FEITO** (`PublicFormPatientCopyAndGateBTest`) |

### P2 — Endurecimento produto

| ID | Item | Notas |
|----|------|-------|
| R5 | OTP `reinforced` como default recomendado na org | Config + UX clínica |
| R6 | Métrica: % protocolos com cópia baixada pelo paciente | Dashboard / analytics |
| R7 | Captura de e-mail na tela de sucesso se Person sem e-mail | Hoje só envia se já houver e-mail |
| R8 | Prefill de CPF em campo do template (opcional, pós-gate) | Hoje CPF só no snapshot/PDF (LGPD) |
| R9 | Alinhar copy marketing ↔ Opção B | “confirma o nome” em vez de “informa o nome” |

### Fora de escopo (SPEC longa)

- ICP-Brasil / A3  
- Assinatura só por WhatsApp  
- Zoneless/signals (roadmap separado)  
- Trocar DomPDF  

---

## Checklist de aceite ponta a ponta

- [x] Paciente identifica-se (CPF\|código + nascimento) e confirma o nome  
- [x] Identidade no PDF (nome, CPF, nascimento, confirmed_at)  
- [x] Confirma entendimento (consentimento) refletido no PDF  
- [x] Assina (obrigatório no publish de consentimento)  
- [x] Baixa PDF na conclusão / recebe e-mail com link  
- [x] Clínica recebe aviso e baixa PDF autenticado  
- [x] Clínica recebe PDF no e-mail (R1)  
- [ ] Migration + queue validados em staging/prod  
- [x] Dossiê ZIP continua disponível  

---

## Histórico

| Data | Evento |
|------|--------|
| 2026-08-20 | Análise fluxo atual vs desejado; gap-list criado |
| 2026-08-21 | Decisão gate **Opção B** |
| 2026-08-21 | Implementação P0 + job PDF (front/back) |
| 2026-08-21 | R1–R4: anexo clínica, PDF persistido no stream, eventos dossiê, feature tests |
| 2026-08-21 | Roadmap/gap ajustados ao estado pós-implementação |
