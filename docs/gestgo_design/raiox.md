# GESTGO — RAIO-X TÉCNICO E FUNCIONAL

**Auditoria exclusivamente de leitura.** Nenhuma alteração foi feita nos repositórios.  
**Data da análise:** 19 de novembro de 2026.

---

## Escopo e aviso metodológico

| Item | Valor |
|------|--------|
| Workspace aberto | `zion_med_front` (SPA Angular) |
| Repositórios examinados | `zion_med_front`, `zion_med` (Laravel), `gestgo-site`, `gestgo_api` (Spring Boot — migração) |
| Front branch/commit | `develop` · `3c6d26c` — *ajustes telas* (2026-11-16) |
| API Laravel branch/commit | `main` · `1b5f7cd` — *fix: evita falha de login quando MinIO está indisponível* (2026-11-16) |
| API Java branch/commit | `main` · `f013b40` — *ajustes api migrate* (2026-11-17) |
| Runtime em produção | **Não verificado** (não houve acesso a VPS, banco vivo nem tráfego real) |

**Regra de evidência:** afirmações importantes citam caminhos. Onde só existe UI, documentação ou endpoint sem prova de runtime, o estado é **PARCIAL** ou **NÃO VERIFICADO**.

**Achado estrutural crítico:** o Gestgo tem **dois backends** com o mesmo contrato `/api/v1`:
1. **`zion_med`** — Laravel 12 (documentado como API canônica nos entregáveis).
2. **`gestgo_api`** — Spring Boot 3.5 em migração a partir do Laravel; inclui módulos (ex.: mobile tools) **ausentes** no PHP.

O front em produção aponta para `https://api.gestgo.com.br` (`environment.prod.ts`). **Qual stack atende esse host hoje não foi confirmado nesta auditoria.**

---

## 1. Visão geral do produto

### O que é o Gestgo atualmente

SaaS B2B de **fichas, consentimentos e documentação clínica digital** para clínicas e negócios de saúde/bem-estar. O paciente recebe um link, preenche e assina; a clínica recebe protocolo, PDF, evidências e fluxo de revisão.

Posicionamento explícito no PRD e no `index.html`:

> *“Organize e proteja os processos da sua clínica sem substituir seu sistema atual.”*  
> Não é prontuário completo, ERP médico nem form builder genérico.

Evidências: `docs/entregaveis/01_PRD.md`; `src/index.html` (title/description); login em `paginas/login/login.component.html`.

### Problema que resolve

- Documentos em papel, WhatsApp e planilhas dispersas  
- Falta de protocolo, PDF e trilha de evidências  
- Risco operacional/jurídico por ausência de registro rastreável  
- Lacuna entre sistemas clínicos (foco em prontuário/faturamento) e documentação operacional (anamneses, termos, checklists)

### Usuários e clientes

| Perfil | Quem | Uso típico |
|--------|------|------------|
| Decisor | Dono/gestor (`owner`) | Configuração, billing, usuários, integrações |
| Operacional | Recepção/staff | Pessoas, envios, protocolos (leitura) |
| Gestor clínico | Manager | Templates, aprovação, dossiê |
| Paciente/cliente | Externo | `/f/{token}`, `/l/{slug}`, `/a/{slug}`, `/verificar` |
| Platform admin | Equipe Gestgo | `/plataforma/*` |

### Tipos de negócio

Primário (PRD + landing): estética/harmonização, odontologia, fisioterapia, clínicas médicas PME, pediatria, multiprofissional, veterinária (templates/layouts). Nicho default de organização: `estetica`.

### Principais fluxos operacionais (resumo)

1. Criar/publicar modelo de ficha → gerar link ou enviar (e-mail/WhatsApp)  
2. Paciente identifica-se → preenche → consente → assina (+ OTP se reforçado)  
3. Sistema gera protocolo + snapshot + PDF → cópia clínica e paciente  
4. Clínica revisa, aprova/reprova, revoga ou solicita reconsentimento  
5. Presença pública via Link na Bio / Totem / Agenda pública  
6. Monetização: trial → checkout Asaas (PIX/boleto) → bloqueio soft se inadimplente  

### Módulos existentes (visão de produto)

Documentos (templates, envios, protocolos, links públicos), Pessoas, Agenda/Serviços, Link na Bio + Totem, Billing, Clínica/Integrações, Usuários/Papéis, Notificações/Novidades, Utilitários (parte), Mobile `/m` (flag desligada), Plataforma admin, Marketing SPA, Site `gestgo.com.br`, Go Assistant.

---

## 2. Inventário completo de funcionalidades

Legenda de estado: **IMPLEMENTADO** · **PARCIAL** · **PLANEJADO** · **LEGADO** · **NÃO VERIFICADO**

### 2.1 Autenticação e conta

| Funcionalidade | O que permite | Perfil | Estado | Onde | Dependências | Limitações | Evidência |
|----------------|---------------|--------|--------|------|--------------|------------|-----------|
| Login | Entrar no painel | Staff/admin | IMPLEMENTADO | Front: `/autenticacao`; API: `POST /api/v1/auth/login` | Sessão cookie + CSRF | Não usa JWT no `localStorage` (`getToken()` → null) | `auth.service.ts`, `AuthController` (Laravel) |
| Logout / CSRF | Encerrar sessão; obter CSRF | Autenticado | IMPLEMENTADO | `/auth/logout`, `/auth/csrf` | Sanctum stateful | — | `app.config.ts`, `auth.interceptor.ts` |
| Esqueci/redefinir senha | Recuperar acesso | Público | IMPLEMENTADO | Rotas SPA + API | E-mail (Resend) | Envio real **NÃO VERIFICADO** em prod | `paginas/auth/*` |
| Verificação de e-mail | Liberar rotas `verified` | Usuário novo | IMPLEMENTADO | `/verificar-email`, middleware `verified` | — | Interceptor redireciona 403 | `auth.interceptor.ts` |
| Preferências de aparência | Tema/dark/shell | Autenticado | IMPLEMENTADO | `/me/appearance` | — | Tema legado `zion-blue` → `gestgo-blue` | `user-appearance.service.ts` |
| Assinatura eletrônica do staff | Cosign / carimbo | Autenticado | IMPLEMENTADO | `PATCH /me/electronic-signature` | Storage MinIO | — | `conta-perfil.service.ts`, `MeElectronicSignatureController` |
| Exportar/excluir conta | LGPD básico | Autenticado | IMPLEMENTADO | `/me/data-export`, `DELETE /me/account` | — | Abrangência legal **NÃO VERIFICADA** | `conta-perfil.service.ts` |
| Cadastro trial `/comece` | Criar tenant+org+user | Lead | IMPLEMENTADO (fora do SPA) | `gestgo-site/comece` + `POST /api/v1/comece` | Asaas opcional | SPA só linka `gestgo.com.br/comece/` | `ComeceController.php`, `comece.js` |

### 2.2 Organização, usuários e permissões

| Funcionalidade | Estado | Evidência / notas |
|----------------|--------|-------------------|
| Dados da empresa, logo, nicho, tema público | IMPLEMENTADO | `clinica-configuracoes`, `ClinicSettingsController` |
| Nível de assinatura `basic` \| `reinforced` (default reforçado) | IMPLEMENTADO | `Organization::booted`, `ClinicSettingsRequest` |
| Troca de empresa | IMPLEMENTADO | `/clinica/escolher`, `can_switch_clinic` |
| Multi-empresa no tenant | PARCIAL | Só se `plan_key === multi_empresa_plan` (default `enterprise`); plano comercial ativo é `solo` |
| CRUD usuários | IMPLEMENTADO | `/usuarios`, `UserController` + limite `max_users` |
| Papéis org (`owner`/`manager`/`staff` + custom) | IMPLEMENTADO | `OrganizationRole::seedDefaultsForOrganization`, `/organization-roles` |
| Catálogo 9 permissões | IMPLEMENTADO | `app/Support/Permission.php` |
| Retenção / preview anonimização | IMPLEMENTADO (API) | Settings + comando `protocols:apply-retention` |

**Permissões canônicas:**  
`dashboard.access`, `notifications.access`, `billing.manage`, `organization.manage`, `users.manage`, `templates.manage`, `submissions.view`, `submissions.approve`, `people.deactivate`.

Defaults: Owner = todas; Manager = sem `organization.manage`/`users.manage`; Staff = dashboard + notifications + submissions.view.

### 2.3 Templates (modelos de fichas)

| Capacidade | Estado | Evidência |
|------------|--------|-----------|
| CRUD, biblioteca, duplicar, campos, ordenação | IMPLEMENTADO | `templates.service.ts`, `FormTemplate` |
| Tipos de campo (texto, select, arquivo, assinatura…) | IMPLEMENTADO | `form_fields` |
| Visibilidade condicional | IMPLEMENTADO | `field-visibility.util.ts` + rules no campo |
| Etapas clínicas / TCLE / quiz | IMPLEMENTADO | `clinical-step.util.ts`, `aplicarEstruturaTcle` |
| Versionamento no publish | IMPLEMENTADO (back) | `form_template_versions`, `TemplateVersionService` |
| Link público + expiração / person_link | IMPLEMENTADO | `POST /templates/{id}/link-publico` |
| Aparência PDF / PDF fonte (FPDI) | IMPLEMENTADO | `templates-aparencia-pdf`, `SourcePdfFillService` |
| Importação IA de fichas | IMPLEMENTADO | `/form-imports`, `ProcessFormImportJob`, OpenAI via platform settings |

### 2.4 Formulário público (`/f/:token`)

| Capacidade | Estado | Evidência |
|------------|--------|-----------|
| Gate identidade Opção B (CPF\|código + nasc. + confirmação do nome) | IMPLEMENTADO | `formulario-publico-gate`, `validate-person` |
| Prefill Person | IMPLEMENTADO | Show + submit utils |
| Ack / scroll / quiz | IMPLEMENTADO | `formulario-publico-consent` |
| Assinatura canvas + aceite | IMPLEMENTADO | signing utils |
| OTP se `reinforced` | IMPLEMENTADO | `sendOtp`/`verifyOtp`, `otp_challenges` |
| Modo totem / assistido / cosign | IMPLEMENTADO | query `totem=1`, `assistido=1` |
| Feegow no fluxo público | IMPLEMENTADO | disponibilidade + submit |
| Submit → protocolo + snapshot + PDF + e-mails | IMPLEMENTADO (código) | `PublicFormApiController`, `SubmissionService`, `GenerateSubmissionPdfJob` |
| Cópia paciente 72h | IMPLEMENTADO | `PatientCopyService::TOKEN_TTL_HOURS = 72` |
| Sucesso `/f/sucesso` | IMPLEMENTADO | `formulario-publico-sucesso` |

Disponível ao cliente final (paciente): **sim**, via link público (não depende de login). Runtime prod: **Não verificado**.

### 2.5 Envios de documento

| Capacidade | Estado | Observação |
|------------|--------|------------|
| Criar envio e-mail/WhatsApp | IMPLEMENTADO | `DocumentSendsService`, `DocumentSend` |
| Caixas pendentes/assinados/expirados/cancelados | IMPLEMENTADO | UI `/envios` |
| Reenvio / cancelamento | IMPLEMENTADO | API |
| Lembretes agendados | IMPLEMENTADO (schedule) | `documents:send-reminders` 09:00 |
| Descoberta no hub Documentos | PARCIAL | Cards de envios **comentados/ocultos** em `navigation-hubs.config.ts`; rota existe |

### 2.6 Protocolos (submissões)

| Capacidade | Estado | Evidência |
|------------|--------|-----------|
| Listagem/filtros/detalhe/timeline | IMPLEMENTADO | `protocolos-*`, `FormSubmission` |
| PDF / dossiê ZIP | IMPLEMENTADO | `PdfService`, `DossierService` |
| Aprovar/reprovar/comentar/staff values | IMPLEMENTADO | permissão `submissions.approve` |
| Revogar / reconsentimento | IMPLEMENTADO | endpoints no `ProtocolosService` |
| Export CSV/PDF | IMPLEMENTADO | service front |
| Verificação pública `/verificar/{code}` | IMPLEMENTADO | hash SHA-256 / protocolo |

### 2.7 Pessoas

| Capacidade | Estado | Evidência |
|------------|--------|-----------|
| CRUD + ficha + histórico | IMPLEMENTADO | `/pessoas`, `Person` |
| PII + hashes | IMPLEMENTADO | `cpf_hash`/`email_hash`; comando `people:encrypt-pii` |
| Reconsentimento a partir da pessoa | IMPLEMENTADO | endpoint no service |
| Inativar | IMPLEMENTADO | `people.deactivate` |
| Purge LGPD agendado | IMPLEMENTADO (job) | `people:purge-inactive` 04:15 |

### 2.8 Link na Bio e Totem

| Capacidade | Estado | Evidência |
|------------|--------|-----------|
| Admin `/link-bio` (links, aparência, forms, métricas) | IMPLEMENTADO | `link-bio.service.ts` |
| Público `/l/:slug` (layouts 1–8) | IMPLEMENTADO | `link-bio-public` |
| Totem `?totem=1` | IMPLEMENTADO | `LinkBioPublicTotemComponent` |
| Analytics views/cliques/CTA | IMPLEMENTADO | redirects `/go`, `/cta` |
| Google Reviews | IMPLEMENTADO (UI) | componente dedicado |
| Flag `link_bio_enabled` por plano | PARCIAL | existe em config; **sem enforcement** claro em `LinkBioController` |

### 2.9 Agenda e serviços

| Capacidade | Estado | Evidência |
|------------|--------|-----------|
| Catálogo de serviços | IMPLEMENTADO | `/servicos` |
| Agenda interna | IMPLEMENTADO | `/agenda` |
| Agenda pública `/a/:slug` | IMPLEMENTADO | `agenda-publica` + API public |
| Vínculo reserva → formulário (`?a=`) | IMPLEMENTADO | tokens no form público |
| CTA Feegow no link-bio | IMPLEMENTADO (config) | `appointment_cta_mode` |

### 2.10 Billing e planos

| Capacidade | Estado | Evidência |
|------------|--------|-----------|
| Trial, checkout, change-plan, cancel | IMPLEMENTADO | `BillingController`, `/assinatura` |
| PIX e boleto Asaas | IMPLEMENTADO | sem cartão no fluxo de assinatura |
| Soft block `can_access_app` | IMPLEMENTADO | `billingGuard`, `EnsureTenantBillingActive` |
| Webhook Asaas | IMPLEMENTADO | `POST /webhooks/asaas` |
| Planos admin plataforma | IMPLEMENTADO | CRUD `/plataforma/planos` |
| Limites `max_users` | IMPLEMENTADO (enforcement users) | `BillingStateService` |
| Multi-empresa / `link_bio_enabled` | PARCIAL | ver seção monetização |

### 2.11 Integrações

| Integração | Estado | Evidência |
|------------|--------|-----------|
| Feegow | IMPLEMENTADO | clients + UI dedicada + testes |
| Trinks / Clinicorp / NinSaúde | PARCIAL | API no `IntegrationsController`; aba “Sistemas” **oculta** no front (`mostrarAbaSistemas = false`); Feegow acessível por URL |
| WhatsApp Evolution | IMPLEMENTADO (código) | `WhatsappEvolutionController`; UI WhatsApp empresa parcialmente oculta |
| Webhooks outbound + tokens API clínica | IMPLEMENTADO | `integracoes.service.ts` |
| Business Hub / conector | IMPLEMENTADO | `/api/v1/conector/*` |
| Resend (e-mail) | IMPLEMENTADO | jobs + platform settings |
| MinIO/S3 | IMPLEMENTADO | disks `minio_*`, `PdfService` |
| OpenAI (import) | IMPLEMENTADO | platform settings |
| ViaCEP | IMPLEMENTADO | front |
| n8n webhooks | PARCIAL | jobs/demo; config ops **NÃO VERIFICADA** |

### 2.12 Notificações, push, novidades

| Capacidade | Estado | Evidência |
|------------|--------|-----------|
| Notificações in-app | IMPLEMENTADO | `/notificacoes`, tabela Laravel `notifications` |
| Web Push / VAPID | PARCIAL | UI front + settings plataforma; **sem** rotas `/me/push` no Laravel; existe no `gestgo_api` |
| Release notes | IMPLEMENTADO | tenant + platform |

### 2.13 Utilitários / Mobile tools

Orçamento, mensagens, retornos, preço, cartão, checklist, pacotes, estoque:

| Camada | Estado |
|--------|--------|
| UI Angular (desktop `/utilitarios/*` e `/m/ferramentas/*`) | IMPLEMENTADO |
| Hub comercial (só 3 cards) | PARCIAL (descoberta limitada) |
| API Laravel `zion_med` | **NÃO ENCONTRADO** (sem rotas `/mobile/tools`) |
| API Java `gestgo_api` módulo mobile | IMPLEMENTADO (JDBC + Flyway) |

**Conclusão:** utilitários só são operacionais se a API apontada for a Java (ou se o PHP for portado). Com Laravel puro → fluxo quebrado.

### 2.14 Experiência Mobile `/m`

| Item | Estado |
|------|--------|
| Rotas e shell mobile | IMPLEMENTADO no código |
| Flag `mobileExperienceEnabled` | **false** em `environment.ts` e `environment.prod.ts` |
| Disponível ao cliente | **Não** (desligado por config) — ou **Não verificado** se homolog sobrescrever |

### 2.15 Plataforma (admin SaaS)

Dashboard, tenants/clientes, leads, tráfego, assinaturas, faturas, planos, e-mails manuais, feedback, novidades, logs, organizações online, configurações de infra (Asaas, MinIO, Resend, OpenAI, WebPush, status): **IMPLEMENTADO** sob `platformGuard` (`role === 'platform_admin'`).

### 2.16 Go Assistant

| Item | Estado |
|------|--------|
| Busca offline, intents, tours, navegação, histórico | IMPLEMENTADO |
| LLM / OpenAI no assistente | PARCIAL / PLANEJADO (`GoAssistantLlmAdapter.enabled = false`) |

### 2.17 Compliance

Relatório `GET /compliance/relatorio` + widget dashboard: **IMPLEMENTADO**. DPA formal: backlog (PRD).

### 2.18 Marketing

| Item | Estado |
|------|--------|
| Site `gestgo-site` (landing + `/comece`) | IMPLEMENTADO |
| SPA `/planos`, `/para/:slug`, `/como-funciona/:slug`, `/link-na-bio` | IMPLEMENTADO |
| Alinhamento chaves plano `profissional`/`essencial` vs `solo` | PARCIAL (legado no markup SPA) |

---

## 3. Fluxos reais do sistema

### Fluxo A — Cadastro e autenticação

1. Lead acessa `https://gestgo.com.br/comece/` (não o SPA).  
2. `GET /landing` carrega planos/trial → `POST /comece` cria Tenant + Organization + User + trial (+ Asaas se CPF/CNPJ).  
3. Redirect para `app.gestgo.com.br/autenticacao`.  
4. Login → CSRF + sessão cookie → `GET /me`.  
5. Se e-mail não verificado → `/verificacao-pendente`.  
6. Se billing bloqueado → soft block (libera assinatura/perfil).  
7. Sem org → `/clinica/escolher`; `platform_admin` → `/plataforma`.  
8. Com org → dashboard + onboarding wizard (6 passos, progresso em `localStorage`).

### Fluxo B — Publicar modelo e link

Criar/editar template → campos + regras → (opcional) TCLE/quiz → publicar/gerar link → version snapshot → `public_token` → URL `/f/{token}`.

### Fluxo C — Envio dirigido

Staff escolhe template + pessoa + canal e-mail|WhatsApp → `DocumentSend` → paciente abre link → ao assinar, vincula submission → caixas atualizam; lembretes via schedule.

### Fluxo D — Paciente no formulário (consentimento)

Gate B → confirma nome → preenche → ack/quiz → assina → OTP se `reinforced` → submit → protocolo + snapshot + PDF MinIO → e-mail clínica → token cópia 72h → `/f/sucesso`. Em totem: reset local sem ir à tela de sucesso.

### Fluxo E — Revisão clínica

Lista protocolos → detalhe (timeline, PDF, dossiê) → aprovar/reprovar/comentar/staff → revogar ou reconsentimento.

### Fluxo F — Link na Bio / Totem

Owner configura `/link-bio` → público `/l/{slug}` → analytics. Totem lista forms/links publicados para tablet na recepção.

### Fluxo G — Agenda

Serviços + regras → agenda interna; público `/a/{slug}` reserva → pode abrir ficha vinculada. Alternativa Feegow no form/link-bio.

### Fluxo H — Billing

Trial 14d → aviso 3d antes → checkout PIX/boleto → Assinatura Asaas → webhooks atualizam status → past_due + grace 7d → block soft. Primeira cobrança: `trial_ends_at + grace_days` (`AsaasService`).

### Fluxo I — Administração SaaS

`platform_admin` gerencia tenants, planos, faturas, leads, settings de infra e saúde do sistema.

---

## 4. Arquitetura técnica

### Repositórios e papéis

```text
gestgo-site          → marketing + /comece
zion_med_front       → SPA Angular 21 (app.gestgo.com.br)
zion_med             → API Laravel 12 (legado/canônico nos docs)
gestgo_api           → API Spring Boot 3.5 (migração; módulos extras)
```

### Frontend

- Angular 21 standalone, zoneless (`provideZonelessChangeDetection`)  
- UI: Nord Health + Tailwind 4 + design tokens Gestgo  
- PWA (service worker em prod/homolog)  
- PDF client: pdf-lib, pdfjs, html2pdf  
- Interceptors: auth (cookie/CSRF/`X-Organization-Id`) + ErrorHub (desligado)  
- Dois shells: tenant (`layout-app`) e plataforma (`layout-plataforma`); mobile shell opcional  

### Backend Laravel (`zion_med`)

- PHP 8.4+, Laravel 12, Sanctum stateful  
- Controllers `Api/V1`, Services, Jobs, Models  
- ~133 migrations; ~47 models; 52 testes PHPUnit  
- PostgreSQL em produção (doc); SQLite em testes  
- Filas: `database`/`sync`; Supervisor documentado  
- OpenAPI Scramble  

### Backend Java (`gestgo_api`)

- Spring Boot multi-módulo Maven, Java 21  
- Flyway + JPA + PostgreSQL  
- Mesmo contrato de sessão/CSRF  
- Módulos: auth, templates, protocols, public-form, billing, mobile, platform, etc.  
- Relação com produção: **NÃO VERIFICADA**

### Multi-tenancy

```text
Tenant (conta comercial)
  └── Organization (empresa operacional)  ← escopo de dados
        └── Users, Templates, People, Submissions, …
```

Header: `X-Organization-Id` (alias legado `X-Clinic-Id`). Escopo: `ClinicScope` + route binding.

### Autenticação / autorização

- Sessão regenerada no login + CSRF  
- Middleware: `auth:sanctum`, `verified`, `tenant`, `tenant.billing`, `platform`, `reject.spa_bearer`  
- RBAC: `organization_roles.permissions[]` + Gates  

### Storage e async

- MinIO buckets: submissions, attachments, assets, invoices  
- Jobs: PDF, form import, e-mail, webhooks, demo n8n  
- Schedule: billing notify, presence prune, document reminders, LGPD purge, retention, trial sync, leads recover, health-check  

### Deploy (documentado)

- Front: Docker Node→Nginx; `app.gestgo.com.br`  
- API: VPS `/var/www/gestgo-api`, Nginx, Supervisor  
- Domínios: `gestgo.com.br`, `app.`, `api.`, `api-homolog.`  

---

## 5. Regras de negócio e diferenciais

| Regra | Comportamento | Complexidade |
|-------|---------------|--------------|
| Gate identidade Opção B | CPF\|código + nascimento → confirmação explícita do nome | Alta (compliance) |
| Snapshot imutável + versionamento | Submit amarra `template_version` + `document_snapshot` | Alta |
| Assinatura `basic` vs `reinforced` | OTP obrigatório no reforçado; default org = reinforced | Alta |
| Evidências de assinatura | IP, UA, hashes, canal OTP, timeline `submission_events` | Alta |
| PDF com integridade SHA-256 | Persistência MinIO + job fallback + 409 em falha | Alta |
| Cópia paciente 72h | Token dedicado + download público limitado | Média-alta |
| Dossiê ZIP | PDF + JSON de evidências | Média-alta |
| Visibilidade condicional de campos | equals/not_equals/filled/empty | Média |
| Atores / responsável legal | `actors_visibility_rules` | Média |
| Ciclo de revisão/revogação/reconsentimento | Estados + novos envios | Alta |
| Soft billing block | App bloqueado; público e billing liberados | Média |
| Isolamento tenant | Scope + testes de isolation | Alta |
| Verificação pública de documento | Hash/protocolo sem vazar PII | Média |
| Import IA de fichas | Upload → draft → commit | Alta |
| Papéis customizáveis | Catálogo + CRUD roles | Média |
| Link bio + Totem | Presença comercial + operação recepção | Média (diferencial de go-to-market) |

Estas capacidades — especialmente o **ciclo documental com evidência + PDF + OTP + dossiê** — são o núcleo competitivo observável no código, não um CRUD genérico.

---

## 6. Monetização atual

### Planos (fallback `config/asaas.php` + tabela `plans`)

| Key | Nome | Mensal | Semestral | Anual | Ativo (migrations) |
|-----|------|--------|-----------|-------|---------------------|
| `solo` | Gestgo Profissional | R$ 97 | R$ 485 | R$ 970 | Sim |
| `executive` | Gestgo Business | R$ 247 | — | — | **Não** (`is_active: false`) — legado |

Limites do `solo`: `max_users = null` (ilimitado), `max_organizations_per_tenant = 1`, `link_bio_enabled = true` (só no config arquivo).

Multi-empresa: chave de config `enterprise` — **não** é o plano vendido no catálogo atual.

### Trial / cobrança

| Parâmetro | Default |
|-----------|---------|
| Trial | 14 dias |
| Aviso trial | 3 dias antes |
| Grace | 7 dias |
| Block mode | soft |
| Pagamentos | PIX, BOLETO |
| Cartão | **Não encontrado** no fluxo Asaas de assinatura |

### O que é aplicado vs intenção

| Regra | Aplicada no código? |
|-------|---------------------|
| Checkout/cancel/change-plan | Sim |
| Webhook Asaas | Sim |
| Bloqueio por `can_access_app` | Sim |
| Limite usuários | Sim (quando `max_users` definido) |
| `link_bio_enabled` | Parcial (exposto; enforcement fraco) |
| Preços editáveis admin | Sim (tabela `plans`); limites `max_*` pouco editáveis na UI admin |
| Preços site | Via API `/landing` (não hardcoded permanentes) |

---

## 7. Maturidade e limitações

### Completas (código full-stack Laravel + front)

Núcleo documental (templates → público → protocolo → PDF → revisão), pessoas, envios, link-bio/totem, agenda, billing Asaas, plataforma admin, auth/RBAC, Feegow, verificação de documento, onboarding wizard, `/comece` no site.

### Interrompidas / parcialmente descobertas

- Envios ocultos no hub Documentos  
- Aba Sistemas de integrações oculta  
- Utilitários: UI sem API no Laravel  
- Web Push: UI sem backend PHP  
- Mobile `/m` desligado por flag  
- SPA `/planos` com chaves legadas  

### Legado relevante

- Pastas/repos `zion_med*` e tema `zion-blue`  
- Model `Clinic` alias de `Organization`  
- `SHELL_NAV_APP` marcado legado  
- Plano `executive` inativo  
- Documentação TRD ainda cita Bearer em pontos; código usa sessão+CSRF  
- `MIGRACAO-DIAGNOSTICO.md` desatualizado (fala em Angular “vazio”)  

### Dependências críticas

Asaas, MinIO, Resend, PostgreSQL, Evolution Go, Feegow, (opcional) OpenAI, Supervisor/filas.

### Testes

- Laravel: 52 PHPUnit (cobertura ampla de domínio)  
- Front: ~12 specs Karma (utils) + Playwright smoke  
- Runtime E2E completo / % cobertura: **Não verificado**  

### Gargalos arquiteturais observáveis

1. **Dupla API (Laravel vs Java)** — risco de divergência de contrato e de features (mobile/push).  
2. Feature discovery UI < rotas existentes (envios, utilitários).  
3. Enforcement comercial incompleto (`link_bio_enabled`, multi-empresa).  
4. Observabilidade ErrorHub desligada nos environments commitados.  

---

## 8. Mapa de capacidades

| Módulo | Funcionalidade | Estado | Disponível ao cliente? | Evidências | Observações |
|--------|----------------|--------|------------------------|------------|-------------|
| Auth | Login/sessão/CSRF | IMPLEMENTADO | Sim (staff) | `auth.service.ts`, Sanctum | Cookie, não JWT local |
| Auth | Cadastro trial | IMPLEMENTADO | Sim (via site) | `gestgo-site/comece`, `ComeceController` | Fora do SPA |
| Org | Configurações empresa | IMPLEMENTADO | Sim | `clinica-configuracoes` | |
| Org | Multi-empresa | PARCIAL | Não verificado | `multi_empresa_plan=enterprise` | Plano ativo é `solo` |
| Usuários | CRUD + papéis | IMPLEMENTADO | Sim | `Permission.php`, roles seed | 9 permissões |
| Templates | Editor + campos + PDF | IMPLEMENTADO | Sim | `templates/*`, `FormTemplate` | |
| Templates | Import IA | IMPLEMENTADO | Sim (se OpenAI config) | `form-imports` | Depende settings |
| Público | Formulário `/f` | IMPLEMENTADO | Sim (paciente) | `PublicFormApiController` | OTP + 72h |
| Envios | Caixa e canais | IMPLEMENTADO | Parcial | `/envios` | Hub oculta |
| Protocolos | Ciclo completo | IMPLEMENTADO | Sim | `protocolos-*`, PDF/dossiê | |
| Pessoas | CRM leve | IMPLEMENTADO | Sim | `/pessoas` | |
| Link Bio | Página + admin | IMPLEMENTADO | Sim | `/l/:slug`, `/link-bio` | |
| Totem | Modo recepção | IMPLEMENTADO | Sim (link) | `?totem=1` | |
| Agenda | Interna + pública | IMPLEMENTADO | Sim | `/agenda`, `/a/:slug` | |
| Serviços | Catálogo | IMPLEMENTADO | Sim | `/servicos` | |
| Billing | Trial/Asaas | IMPLEMENTADO | Sim | `BillingController` | PIX/boleto |
| Integrações | Feegow | IMPLEMENTADO | Sim | UI + API | |
| Integrações | Outros PMS | PARCIAL | Não verificado | aba oculta | |
| WhatsApp | Evolution | IMPLEMENTADO | Não verificado | API + UI parcial | |
| Notificações | In-app | IMPLEMENTADO | Sim | `/notificacoes` | |
| Push | Web Push | PARCIAL | Não | Front sim / PHP não | Java tem módulo |
| Utilitários | Tools clínicas | PARCIAL | Não verificado | Front + `gestgo_api` | Ausente no Laravel |
| Mobile | App `/m` | PARCIAL | Não | Flag `false` | |
| Plataforma | Admin SaaS | IMPLEMENTADO | Só Gestgo | `/plataforma` | |
| Assistant | Go Assistant | IMPLEMENTADO | Sim | sem LLM | |
| Compliance | Relatório | IMPLEMENTADO | Sim | dashboard widget | |
| Verify | `/verificar` | IMPLEMENTADO | Sim (público) | hash/protocolo | |
| Marketing | Site + SPA | IMPLEMENTADO | Sim | `gestgo-site`, `/planos` | |

---

## 9. Resumo para análise estratégica

### A. O que o Gestgo já faz hoje

Opera como plataforma de **documentação clínica digital com evidência**: modelos versionados, envio/link, identificação do paciente, consentimento, assinatura (com OTP reforçado), protocolo, PDF íntegro, dossiê, revisão, pessoas, link na bio/totem, agenda, billing Asaas com trial, admin SaaS e integrações (Feegow/Evolution/webhooks). Front Angular maduro + API Laravel completa no núcleo; site próprio para aquisição.

### B. O que está parcialmente implementado

Utilitários mobile (UI sem API PHP), Web Push, descoberta de Envios/Integrações na UI, multi-empresa comercial, enforcement de `link_bio_enabled`, SPA de planos desalinhada do catálogo `solo`, experiência mobile desligada, dualidade Laravel/Java.

### C. O que está apenas planejado

LLM no Go Assistant; ErrorHub ligado; DPA/OpenAPI parceiros (backlog PRD); endurecimento adicional de sessão (doc `07-sessao-httponly-futuro.md`); partes do roadmap de modernização API; subdomínio painel dedicado (`painelUrl` vazio).

### D. Principais diferenciais técnicos

1. Ciclo completo de consentimento com gate B + OTP + snapshot + PDF SHA-256 + cópia 72h + dossiê.  
2. Versionamento de templates e trilha de eventos.  
3. Multi-tenant Organization com RBAC customizável.  
4. Link na Bio + Totem acoplados ao mesmo motor de fichas.  
5. Billing com soft-block e webhook Asaas.  
6. Importação assistida de fichas (IA) e fill de PDF fonte.

### E. Limites atuais do produto

- Não é PEP/prontuário, TISS, telemedicina ou BI avançado (explícito no PRD).  
- Qual API está em `api.gestgo.com.br` **não confirmado**.  
- Utilitários e push podem falhar no stack Laravel.  
- Mobile app flag off.  
- Cadastro não vive no SPA.  
- Produção, métricas de uso e qualidade operacional **não verificadas**.

### F. Capacidades prontas para expansão (sem recomendar agora)

Motor de campos/visibilidade/versionamento; pipeline PDF/evidência; papéis/permissões; presença pública (link-bio); conector/webhooks; plataforma admin; shell mobile já roteado; módulo Java de tools; catálogo de intents do Go Assistant; schedule de retenção/LGPD.

---

## Metadados da auditoria

| Campo | Conteúdo |
|-------|----------|
| Data | 19/11/2026 |
| Escopo | `zion_med_front` (workspace), `zion_med`, `gestgo-site`, `gestgo_api` (irmãos em `Downloads/teste`) |
| Front | branch `develop` · commit `3c6d26c` |
| API Laravel | branch `main` · commit `1b5f7cd` |
| API Java | branch `main` · commit `f013b40` |
| Método | Leitura de código, docs, rotas, services, migrations, configs; **sem** executar app, migrate, seeds ou acessar produção |
| Limitações | Sem runtime; sem query em banco vivo; secrets não lidos; disponibilidade real ao cliente final marcada “Não verificado” quando depende de deploy/flags |

### Questões para o proprietário do Gestgo confirmar

1. Em produção, `api.gestgo.com.br` responde com **Laravel (`zion_med`) ou Spring (`gestgo_api`)**?  
- estou analisando qual tem melhor performance
2. Utilitários (orçamento/estoque/etc.) e Web Push estão habilitados em algum ambiente?  
- sim na homologação estao habilitados
3. O plano `executive` e multi-empresa `enterprise` serão reativados comercialmente?  
- sim 
4. Mobile `/m` tem previsão de ligar a flag em produção?
- ainda nao estou pensando se isso e relevante  
5. Envios e aba Sistemas estão ocultos de propósito (produto) ou por WIP?
- sim porque ainda nao tenho integração nativa com whatsapp e nao tenho integrações reais ainda  
6. Há CI/CD e monitoramento ativos além do documentado?
- sim há  
7. O site `gestgo.com.br` e o SPA `/planos` devem ser unificados quanto a CTAs e chaves de plano?
- nao

---

*Documento gerado para consumo por outro analista sem acesso ao código. Não inventar capacidades além das listadas; tratar itens “Não verificado” / “Parcial” como hipóteses a validar com o proprietário ou com runtime.*