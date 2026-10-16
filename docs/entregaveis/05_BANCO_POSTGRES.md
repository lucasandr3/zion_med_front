# 05 — Banco de dados PostgreSQL

**Produto:** Gestgo  
**ORM / migrations:** Laravel (`zion_med/database/migrations` — ~116 arquivos)  
**Produção:** PostgreSQL  
**Dev/testes:** SQLite (dump `database/schema/sqlite-schema.sql`) ou MySQL compatível

> Nomes históricos: várias tabelas/índices ainda mencionam `clinic_*`; a entidade canônica é **`organizations`**.

---

## 1. Convenções

| Tema | Regra |
|------|-------|
| Tenant comercial | `tenants` |
| Empresa operacional | `organizations` (`organization_id` nas filhas) |
| Escopo app | Global Scope + bindings por organização |
| Soft deletes | Uso pontual; maioria hard delete com cascade |
| PII | `people.cpf` / `email` + colunas `*_hash`; criptografia legado via artisan |
| Evidência | hashes SHA-256 em submissions/signatures; snapshots JSON |

Comando produção (novo ambiente):

```bash
php artisan migrate --force
```

Não usar `schema:dump --prune` em produção: migrations fazem backfills que não entram no SQL estrutural.

---

## 2. Diagrama lógico (núcleo)

```text
tenants
  └── organizations
        ├── users
        ├── organization_roles
        ├── organization_addresses
        ├── organization_slug_aliases
        ├── organization_presences
        ├── form_templates ── form_fields
        │                 └── form_template_versions
        ├── people
        ├── document_sends
        ├── form_submissions
        │     ├── submission_values
        │     ├── submission_attachments
        │     ├── submission_signatures
        │     └── submission_events
        ├── protocol_sequences
        ├── clinic_links / clinic_webhooks / webhook_deliveries
        ├── subscriptions / payments
        ├── link_bio_* analytics
        ├── feegow_appointments
        └── audit_logs
```

Tabelas de plataforma / marketing (sem org obrigatória): `plans`, `platform_settings`, `demonstration_requests`, `landing_*`, `release_notes`, `platform_manual_emails`, `go_assistant_events`.

Infra Laravel: `users` (auth), `password_reset_tokens`, `sessions`, `cache`, `jobs`, `failed_jobs`, `personal_access_tokens`, `notifications`.

---

## 3. Tabelas principais

### 3.1 `tenants`

Conta comercial acima da organização (limites de plano multi-org).

### 3.2 `organizations`

| Grupo | Campos relevantes |
|-------|-------------------|
| Identidade | `name`, `slug`, `niche` (default `estetica`), `logo_path`, `notification_email` |
| Público / link-bio | `short_description`, `cover_*`, `link_bio_model`, `link_bio_extra`, `accent_hex`, `google_*` |
| Assinatura | `signing_security_level` (`basic`\|`reinforced`, default reforçado em creates) |
| Billing | `asaas_customer_id`, `trial_ends_at`, `grace_ends_at`, `subscription_status`, `billing_status`, `plan_key`, … |
| Integrações | `feegow_*`, `evolution_go_*`, WhatsApp notify flags |
| Compliance | `data_retention_years` / retenção de protocolos |
| UI | `theme`, `dark_mode`, `public_theme` |

FK: `tenant_id → tenants`.

### 3.3 `users`

| Campo | Nota |
|-------|------|
| `organization_id` | Empresa atual |
| `role` | Legado (`owner`/`manager`/`staff`) — permissões finas em `organization_roles` |
| `active`, `can_switch_clinic` | Acesso e troca de empresa |
| `email_verified_at` | MustVerifyEmail |
| `ui_theme`, `ui_dark_mode`, `ui_shell_preset` | Aparência |
| `electronic_signature_path` | Cosign staff |

Unique: `(organization_id, email)`.

### 3.4 `organization_roles`

Papéis customizáveis por organização + JSON/array de permissões (seed default no `created` da org).

### 3.5 `form_templates` / `form_fields` / `form_template_versions`

| Tabela | Papel |
|--------|-------|
| `form_templates` | Modelo: nome, categoria, `public_token`, `public_enabled`, `public_require_person_link`, validade/consentimento, quiz, library metadata, `document_kind`, … |
| `form_fields` | Campos dinâmicos (`label` text), ordem, opções, `visibility_rules`, `clinical_step_kind` |
| `form_template_versions` | Snapshot imutável (`fields_snapshot`) por `version` |

Categorias: tabela `template_categories` (+ strings legadas em `category`).

### 3.6 `people`

Cadastro de pacientes/clientes da org: dados demográficos, endereço, `code`, PII (`cpf`, `email`, …) + `cpf_hash` / `email_hash`, campos de retenção.

### 3.7 `document_sends`

Envios de link: `template_id`, canal, destinatário, expiração, `cancelled_at`, `reminded_at`, vínculo com submissão quando concluído.

### 3.8 `form_submissions` (protocolos)

| Grupo | Campos |
|-------|--------|
| Vínculos | `organization_id`, `template_id`, `template_version_id`, `person_id` |
| Status | `status`, aprovação, `review_comment`, `revoked_*` |
| Protocolo | `protocol_number` (+ tabela `protocol_sequences` por ano) |
| Evidência | `document_hash`, `document_snapshot`, `document_snapshot_hash`, `signing_*`, `locale`, `timezone`, `accepted_text_at` |
| PDF / cópia | `pdf_disk_path`, `pdf_sha256`, `patient_download_token*`, `patient_copy_*` |
| Consentimento | `consent_valid_until`, `retention_anonymized_at` |

Filhas:

- `submission_values` — respostas
- `submission_attachments` — arquivos
- `submission_signatures` — imagem + IP/UA/hashes/canal/status
- `submission_events` — timeline (`meta_json`)

### 3.9 `otp_challenges`

Desafios OTP do formulário público (sem unique rígido por token após migration 2026-04-22).

### 3.10 Billing

| Tabela | Papel |
|--------|-------|
| `plans` | Catálogo (`key`, `value`, `max_users`, `max_organizations_per_tenant`) |
| `subscriptions` | Assinatura Asaas por org (`billing_type` BOLETO/PIX…) |
| `payments` | Cobranças (`bank_slip_url`, PIX QR / copy-paste) |

### 3.11 Integrações e presença

| Tabela | Papel |
|--------|-------|
| `clinic_webhooks` / `webhook_deliveries` | Webhooks da clínica |
| `clinic_links` | Itens do link-bio |
| `link_bio_page_views` / `link_bio_link_clicks` / `link_bio_cta_clicks` | Analytics |
| `feegow_appointments` | Agendamentos Feegow |
| `organization_presences` | Online na plataforma |
| `organization_addresses` | Endereços estruturados |
| `organization_slug_aliases` | Slugs antigos / redirects |
| `audit_logs` | Auditoria |

### 3.12 Plataforma / marketing

`platform_settings` (key/value), `demonstration_requests`, `landing_site_visits`, `landing_cta_clicks`, `release_notes`, `platform_manual_emails`, `go_assistant_events`.

---

## 4. Índices e performance

Migrations dedicadas (`add_performance_indexes`, hashes de CPF, etc.):

- `organization_id` + datas em templates, audit, submissions
- Unique `public_token` em templates
- Unique protocolo por sequência anual
- Unique Asaas IDs em subscriptions/payments
- Índice `people.cpf_hash`

Em PostgreSQL, preferir tipos nativos (`jsonb` quando aplicável via casts Eloquent; dump SQLite usa `text`).

---

## 5. Relação com storage externo

O banco guarda **paths e hashes**; binários ficam no MinIO/S3:

| Bucket (env) | Conteúdo |
|--------------|----------|
| submissions | PDFs / dossiês |
| attachments | Anexos de formulário |
| assets | Logos, capas, fotos |
| invoices | Artefatos de cobrança |

---

## 6. Retenção e LGPD (dados)

| Mecanismo | Descrição |
|-----------|-----------|
| Hashes PII | Busca sem expor CPF/e-mail em claro |
| `people:encrypt-pii` | Migração de legado |
| Retenção org | Preview + jobs de anonimização de protocolos |
| `retention_anonymized_at` | Marca submissões anonimizadas |
| Export / delete conta | Endpoints `/me/data-export`, `/me/account` |

---

## 7. Seed e ambientes

Após migrate:

```bash
php artisan migrate --seed
```

Usuários típicos (README):

- `qa-owner@gestgo.test` / `senha123` (Owner)
- `admin@gestgo.com` / `senha123` (Platform admin)

Templates seed por nicho (estética, veterinária, …) atualizados por migrations de refresh.

---

## 8. Operação PostgreSQL

| Item | Recomendação |
|------|--------------|
| Charset | UTF-8 |
| Timezone app | Config Laravel (`APP_TIMEZONE`) alinhada à clínica (`timezone` na evidência) |
| Backup | Dump lógico periódico + retenção alinhada ao DPA |
| Migrações | Sempre `--force` em produção no deploy |
| Conexão | `DB_CONNECTION=pgsql` + `DB_HOST/PORT/DATABASE/USERNAME/PASSWORD` |

Variáveis em `zion_med/.env.example`.

---

## 9. Referências

- `zion_med/database/migrations/*`
- `zion_med/database/schema/sqlite-schema.sql`
- `zion_med/app/Models/*`
- `zion_med/README.md` (seção schema dump / deploy)
