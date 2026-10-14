# 06 — Plano de desenvolvimento

**Produto:** Gestgo  
**Escopo:** plano alinhado ao estado **atual** do código (front + back), epics concluídos e backlog restante.  
**Fontes:** `zion_med/PLANO_DESENVOLVIMENTO.md`, `zion_med/docs/PLANO_EPICS.md`, `docs/ROADMAP_ZONELESS_SIGNALS.md`, `docs/GAP_FLUXO_PACIENTE_CONSENTIMENTO.md`.

---

## 1. Arquitetura de entrega

| Camada | Repositório | Responsabilidade |
|--------|-------------|------------------|
| API | `zion_med` | Laravel 12, regras, PDF, billing, integrações |
| SPA | `zion_med_front` | Angular 21 zoneless, UX, design system |
| Docs deste pacote | `zion_med_front/docs/entregaveis/` | PRD, TRD, fluxos, DS, banco, plano |

UI de produto **não** é Blade: o Angular consome `/api/v1`.

---

## 2. Status consolidado (epics)

### ✅ Concluído

| Epic | Entregas |
|------|----------|
| Segurança imediata | `.env.example` limpo; debug de checkout removido |
| Autenticação | Forgot/reset password; verify e-mail; middleware `verified` |
| E-mail | Resend + `TransactionalEmailService` + filas |
| CI | GitHub Actions (PHP 8.4 + testes + build front no back CI) |
| Assinatura / evidência | Versionamento, hashes, OTP, dossiê ZIP, timeline, `signing_security_level` |
| Envios | E-mail/WhatsApp, caixas, cancel, lembretes, vínculo submission↔send |
| Biblioteca templates | Listar / instalar / duplicar |
| Fluxo paciente P0 | Gate Opção B, identity no PDF, cópia paciente 72h, PDF sync + job |
| Pessoas + papéis | CRUD pessoas, organization_roles, permissões granulares |
| Link-bio + Feegow + Evolution | Produção no código atual |
| Plataforma admin | Clientes, planos, leads, settings, presence |
| Billing Asaas | Trial, grace, checkout, change-plan, PIX/boleto |
| Compliance base | Termos/privacidade SPA; relatório compliance; retenção |

### 🟡 Em andamento / parcial

| Item | Situação |
|------|----------|
| Design System Nord + Gestgo | Nord integrado; coexistência com Zard/`zm-*`; migração tela a tela |
| Angular zoneless + signals | Zoneless ligado; ~18% OnPush; páginas ainda majoritariamente Default + `.subscribe()` |
| LGPD avançado | Hash/retenção/export existem; DPA formal e playbook de incidentes em backlog |
| OpenAPI/Swagger | Ainda não publicado |

### ⬜ Backlog priorizado

1. **Modernização front (signals/OnPush)** — ver `ROADMAP_ZONELESS_SIGNALS.md` (shell → páginas críticas → formulário público).
2. **Consolidar UI no DS** — reduzir legado CSS; Nord ou Zard de forma consistente por módulo.
3. **OpenAPI** — contrato estável para front/parceiros/conector.
4. **Jurídico / copy** — revisão de alegações de validade; materiais comerciais.
5. **Retenção LGPD empacotada** — políticas documentadas + UX de retenção para o dono da clínica.
6. **Observabilidade** — ErrorHub ligado em prod; métricas de conclusão de assinatura.
7. **Qualidade** — ampliar cobertura Playwright nos fluxos D/E (consentimento + revisão).

---

## 3. Roadmap por fases

### Fase atual — Produto comercializável (baseline)

Já coberto pelo código:

- Trial → assinatura Asaas
- Modelos + envios + protocolos + dossiê
- Identidade paciente + OTP reforçado
- Multi-empresa + plataforma
- Integrações Feegow / WhatsApp / webhooks

**Critério de pronto operacional (VPS):** migrate, Supervisor queue+schedule, Resend, MinIO, webhook Asaas, smoke `/up` + login + `/f/{token}`.

### Fase próxima — DX e robustez de UI (1–2 ciclos)

| # | Entrega | Repo |
|---|---------|------|
| N1 | OnPush + signals no shell (sidebar, header, layout) | front |
| N2 | Formulário público 100% signals / menos subscribe | front |
| N3 | Checklist visual DS (Nord) nas telas de envios/protocolos | front |
| N4 | Documentar breaking changes de API no OpenAPI mínimo (auth + público + protocols) | back |

### Fase seguinte — Compliance e crescimento

| # | Entrega |
|---|---------|
| C1 | Pacote LGPD (DPA, retenção, incidentes) |
| C2 | Materiais de nicho (estética/odo) + biblioteca |
| C3 | Métricas de produto no dashboard plataforma |
| C4 | Endurecer conector Business Hub (versionamento) |

---

## 4. Plano de sprints sugerido (exemplo 6 semanas)

| Semana | Foco | Saída |
|--------|------|-------|
| 1 | Shell OnPush + bugs de CD zoneless | Sidebar/header estáveis sem `markForCheck` espalhado |
| 2 | Formulário público (signals) + regressão Playwright gate/submit | Menos flakiness no fluxo paciente |
| 3 | Envios + protocolos alinhados ao DS | UI consistente |
| 4 | OpenAPI auth + public form + protocols | Spec publicada no back |
| 5 | Retenção: UX preview + docs runbook | Owner consegue operar retenção |
| 6 | Hardening go-live (CSP, ErrorHub, smoke checklist) | Checklist fechado |

Ajuste conforme capacidade; o backlog de produto de negócio (novos nichos/templates) pode entrar em paralelo sem bloquear N1–N3.

---

## 5. Dependências e riscos

| Risco | Mitigação |
|-------|-----------|
| Coexistência Nord + Zard + CSS legado | Decuir módulo “fonte da verdade” por tela; não misturar três botões |
| Zoneless com Default CD | Priorizar signals; HttpClient mascara problemas até timers/observers |
| Alegações jurídicas de assinatura | Manter copy conservador até revisão legal (Epic 8) |
| Filas paradas em VPS | Supervisor obrigatório; PDF/e-mail dependem disso |
| PII legado | Rodar `people:encrypt-pii` uma vez por ambiente |

---

## 6. Checklist de go-live (atualizado)

- [ ] Nenhuma credencial real no git
- [ ] `APP_DEBUG=false`, `APP_ENV=production`
- [ ] `FRONTEND_URL` e CORS corretos
- [ ] PostgreSQL migrado; backups definidos
- [ ] MinIO buckets criados
- [ ] Resend + domínio (SPF/DKIM)
- [ ] Asaas produção + webhook testado
- [ ] Supervisor: queue + scheduler RUNNING
- [ ] Smoke: login, `/me`, `/f/{token}`, dossiê, billing
- [ ] Termos/privacidade revisados
- [ ] ErrorHub (se usado) com `environment: production`

---

## 7. Variáveis críticas (produção)

| Variável | Uso |
|----------|-----|
| `APP_URL` / `FRONTEND_URL` | Links e CORS |
| `DB_*` | PostgreSQL |
| `QUEUE_CONNECTION` / `CACHE_STORE` | Preferência `database` sem Redis |
| `MAIL_MAILER=resend` + `RESEND_API_KEY` | E-mail |
| `ASAAS_*` | Billing |
| `MINIO_*` / `AWS_*` | Storage |
| `N8N_WHATSAPP_WEBHOOK_URL` | Opcional |
| `DOCUMENT_REMINDER_DAYS` | Lembretes (default 2) |
| Evolution / Feegow | Via settings org ou env conforme implementação |

Lista completa: `zion_med/PLANO_DESENVOLVIMENTO.md` e `.env.example`.

---

## 8. Métricas para acompanhar o plano

- % componentes OnPush no front
- Tempo médio gate → submit no formulário público
- Taxa envio → assinado
- Falhas de job (PDF/e-mail) por dia
- Trials que convertem em `active` em 14–30 dias

---

## 9. Ordem de leitura deste pacote

1. `01_PRD.md` — o que o produto é  
2. `02_TRD.md` — como é construído e quais APIs  
3. `03_FLUXOS.md` — como opera no dia a dia  
4. `04_DESIGN_SYSTEM.md` — como deve parecer  
5. `05_BANCO_POSTGRES.md` — onde os dados vivem  
6. **Este arquivo** — o que falta e em que ordem

---

*Documento vivo: atualizar status das tabelas acima a cada marco de release / merge relevante.*
