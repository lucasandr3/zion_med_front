# 02 — TRD — Arquitetura e APIs

**Produto:** Gestgo  
**Escopo:** arquitetura técnica atual (front + back) e mapa da API REST `v1`  
**Repositórios:** `zion_med` · `zion_med_front`

---

## 1. Visão da arquitetura

```text
┌─────────────────────┐     HTTPS / JSON      ┌──────────────────────────┐
│  SPA Angular 21     │ ◄───────────────────► │  API Laravel 12          │
│  zion_med_front     │   Bearer Sanctum      │  zion_med                │
│  (Nginx / Vercel…)  │   X-Clinic-Id?        │  PHP 8.4+                │
└─────────────────────┘                       └────────────┬─────────────┘
                                                           │
                    ┌──────────────────────────────────────┼────────────────┐
                    ▼                      ▼               ▼                ▼
              PostgreSQL              MinIO/S3         Resend          Asaas
              (produção)           anexos/PDFs       e-mail           billing
                                                           │
                                              Supervisor: queue + schedule
                                              Evolution / n8n / Feegow (opc.)
```

- **UI principal:** SPA Angular (standalone, zoneless). Views Blade no backend são legado / admin pontual — o app do usuário é o front.
- **Contrato:** `APP_URL/api/v1/...`
- **Front env:** `environment.apiUrl` aponta para a base Laravel **sem** `/api/v1`.

---

## 2. Stack

### Frontend (`zion_med_front`)

| Camada | Tecnologia |
|--------|------------|
| Framework | Angular `^21.2`, standalone, `provideZonelessChangeDetection()` |
| Estilo | Tailwind CSS 4, tokens em `src/styles.css` |
| Design | Nord Health (web components) + componentes Zard/`zm-*` próprios |
| Ícones | Material Symbols Outlined + Nord icons + Lucide (Zard) |
| Charts | ApexCharts |
| PWA | Service Worker (`ngsw-config.json`) |
| Testes | Jasmine/Karma + Playwright |

### Backend (`zion_med`)

| Camada | Tecnologia |
|--------|------------|
| Framework | Laravel 12 |
| Auth API | Laravel Sanctum (token Bearer) |
| DB | PostgreSQL (produção); SQLite/MySQL ok em dev |
| PDF | barryvdh/laravel-dompdf |
| Filas | `sync` ou `database` (+ Supervisor em VPS) |
| Storage | MinIO (buckets: submissions, attachments, assets, invoices) |

---

## 3. Multi-tenant e autenticação

### Tenancy

- Entidade de negócio: **`organizations`** (renomeada de `clinics`).
- Tabelas operacionais usam `organization_id` + **Global Scope** (`ClinicScope`).
- Header opcional: `X-Clinic-Id` para contexto de empresa.
- Acima da organização: **`tenants`** (conta comercial / billing multi-org).

### Auth

| Item | Detalhe |
|------|---------|
| Login | `POST /api/v1/auth/login` → token + user + clinics |
| Guard | `auth:sanctum` |
| Ativo | middleware `active` |
| E-mail | middleware `verified` nas rotas de clínica |
| Billing | middleware `tenant.billing` (bloqueio soft/hard) |
| Plataforma | middleware `platform` em `/api/v1/platform/*` |
| Throttle | `throttle:auth` (5/min IP) em login/forgot; `throttle:api` geral |

---

## 4. Camadas no backend

```text
routes/api.php
  → Controllers (Api / Platform / Public / Connector)
      → Services (DocumentSend, Dossier, Otp, TemplateVersion, Billing, …)
          → Models + Jobs (PDF, e-mail, webhooks)
              → PostgreSQL / MinIO / Asaas / Resend / Feegow / Evolution
```

Jobs típicos: geração de PDF, e-mail transacional, entregas de webhook, lembretes de documento, retenção/anonimização.

---

## 5. Camadas no frontend

```text
app.routes.ts (lazy load)
  → páginas (paginas/*)
      → core/services/* (HTTP)
      → shared/components (Zard, Nord, zm-*)
      → go-assistant/*
```

Guards: `authGuard`, `permissionGuard`, `platformGuard`, `canSwitchOrganizationGuard`, billing blocked state.

---

## 6. Mapa da API (`/api/v1`)

Autenticação: `Authorization: Bearer {token}` salvo indicação **Público**.

### 6.1 Público / semi-público

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/login` | Login |
| POST | `/auth/forgot-password` | Esqueci senha |
| POST | `/auth/reset-password` | Redefinir senha |
| GET | `/auth/verify-email` | Verificar e-mail (assinado) |
| GET | `/landing` | Copy + planos + trial |
| GET/POST | `/landing/analytics/*` | Views e CTAs da landing |
| GET | `/status` | Status público do serviço |
| POST | `/comece` | Onboarding / signup |
| POST | `/demonstracao` | Lead de demonstração |
| GET | `/link-bio/public/{slug}` | Página link-bio |
| GET | `/link-bio/public/{slug}/go/{linkId}` | Redirect com analytics |
| GET | `/verificar/{code}` | Verificação de documento |
| GET | `/formulario-publico/{token}` | Carrega formulário |
| POST | `/formulario-publico/{token}/validate-person` | Gate identidade |
| POST | `/formulario-publico/{token}/submit` | Envia submissão |
| POST | `/formulario-publico/{token}/otp/send\|verify` | OTP |
| GET | `/formulario-publico/{token}/feegow/disponibilidade` | Agenda Feegow |
| GET/POST | `/formulario-publico/copia/{copyToken}` | Cópia do paciente |

### 6.2 Autenticado (qualquer usuário)

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/logout` | Revoga token |
| POST | `/auth/send-verification-email` | Reenvia verificação |
| GET | `/me` | Sessão atual |
| PATCH | `/me/appearance` | Tema / dark / shell |
| PATCH | `/me/electronic-signature` | Assinatura do staff |
| DELETE | `/me/account` | Excluir conta |
| GET | `/me/data-export` | Export LGPD |
| GET/PATCH/DELETE | `/notificacoes…` | Inbox |
| GET | `/release-notes` | Novidades |
| * | `/assistant/*` | Go Assistant |

### 6.3 Plataforma (`platform` middleware)

Dashboard, tenants, leads, plans, subscriptions/payments/invoices, settings, integrations (Business Hub, Asaas, MinIO, Resend), release notes, e-mails manuais, presença online, etc. Prefixo: `/platform/...`.

### 6.4 Tenant (verified + billing)

| Área | Endpoints principais |
|------|----------------------|
| Dashboard | `GET /dashboard`, `GET /compliance/relatorio` |
| Roles | `/organization-roles`, `/permissions/catalog` |
| Usuários | `apiResource /usuarios` |
| Templates | CRUD, campos, reorder, versões, biblioteca, link público, enviar, duplicar, etapas clínicas TCLE |
| Pessoas | `apiResource /pessoas`, reconsentimento |
| Envios | `/document-sends` (+ reenvio, cancel) |
| Protocolos | listagem, show, timeline, pdf, dossie, revisão, revogar, reconsentimento, staff-values, CSV |
| Links públicos | `GET /links-publicos` |
| Link-bio | CRUD links, aparência, foto |
| Clínica | escolher, configurações, retenção, logs, integrações, Feegow, WhatsApp Evolution |
| Billing | `GET /billing`, checkout, cancel, change-plan |
| Onboarding | templates + gerar link (grupo sem billing full) |

### 6.5 Conector externo

Prefixo `/api/v1/conector` com middleware `business_hub.connector`: empresas, clientes, contatos, leads, assinaturas, faturas (leitura).

### 6.6 Webhooks

- `POST /webhooks/asaas` (fora do CSRF) — billing.

---

## 7. Contratos de evidência (assinatura digital)

Alinhado à SPEC de concorrência:

| Conceito | Onde |
|----------|------|
| Versão do template | `form_template_versions.fields_snapshot` |
| Snapshot do documento | `form_submissions.document_snapshot` (+ hashes) |
| Assinatura | `submission_signatures` (IP, UA, channel, evidence_hash, …) |
| Timeline | `submission_events` (+ `meta_json`) |
| OTP | `otp_challenges` |
| Dossiê | `GET /protocols/{id}/dossie` → ZIP PDF + JSON |
| Nível de segurança | `organizations.signing_security_level` |

---

## 8. Integrações externas

| Sistema | Uso |
|---------|-----|
| **Asaas** | Clientes, assinaturas, cobranças, PIX/boleto, webhooks |
| **Resend** | E-mail transacional |
| **MinIO** | Objetos (PDFs, anexos, logos, faturas) |
| **Feegow** | Disponibilidade e agendamento no fluxo público |
| **Evolution API** | WhatsApp da clínica |
| **n8n** (opc.) | Webhook WhatsApp legado / erros de pagamento |
| **Business Hub** | Conector de dados + token regenerável na plataforma |
| **ErrorHub** (opc.) | Telemetria de erros no SPA |

---

## 9. Deploy e runtime

| Componente | Produção típica |
|------------|-----------------|
| API | VPS PHP-FPM + Nginx |
| Filas | Supervisor `queue:work` |
| Scheduler | Supervisor `schedule:work` |
| Front | Build `ng build --configuration production` → Nginx/CDN |
| CORS | `config/cors.php` + `CORS_ALLOWED_ORIGINS` |
| Health | `GET /up`, `GET /api/v1/status` |

Schema dump SQLite existe para acelerar testes (`database/schema/sqlite-schema.sql`). Em PostgreSQL novo: `php artisan migrate --force`.

---

## 10. Ambientes do front

| Arquivo | Uso |
|---------|-----|
| `environment.ts` | Dev (`apiUrl` local) |
| `environment.prod.ts` | Produção |
| Homolog | `npm run build:homolog` |

`apiUrl` exemplo: `https://api.gestgo.com.br` (sem `/api/v1`).

---

## 11. Segurança (checklist técnico)

- Segregação por organização em queries e route binding
- Throttle em auth, OTP e links públicos
- Tokens públicos com expiração; cancelamento de envios
- PII: hashes de CPF/e-mail; comando `people:encrypt-pii`
- Billing bloqueia mutações sensíveis mantendo formulário público
- CSP no `index.html` do SPA

---

## 12. Referências

- `zion_med/routes/api.php`
- `zion_med/PLANO_DESENVOLVIMENTO.md`
- `zion_med/docs/SPEC_CONCORRENCIA_ASSINATURA_DIGITAL.md`
- `zion_med/docs/SUPERVISOR_VPS.md`
- Front: `src/app/app.routes.ts`, `src/environments/*`
