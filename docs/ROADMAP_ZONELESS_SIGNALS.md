# Roadmap — Zoneless + Signals (Angular 21)

Documento de análise e plano de modernização do SPA Gestgo após a migração para **Angular 21** com **change detection zoneless**.

**Repositório backend (contratos / regras alinhadas):** `../zion_med` → ver [`docs/ROADMAP_MODERNIZACAO_API.md`](../../zion_med/docs/ROADMAP_MODERNIZACAO_API.md).

**Gap-list do fluxo paciente (identificação → PDF → cópias):** [`GAP_FLUXO_PACIENTE_CONSENTIMENTO.md`](./GAP_FLUXO_PACIENTE_CONSENTIMENTO.md).

---

## 1. Estado atual (baseline)

| Item | Situação |
|------|----------|
| Angular | `^21.2.21` |
| Zoneless | **Ligado** — `provideZonelessChangeDetection()` em `src/app/app.config.ts` |
| `zone.js` nos polyfills | **Removido** — `polyfills: []` em `angular.json` (build e test) |
| `zone.js` em `dependencies` | **Removido** (pode existir só como peer opcional transitivo) |
| Bootstrap | `src/main.ts` → `bootstrapApplication(AppComponent, appConfig)` |

### O que já está “certo” no switch

- App não carrega ZoneJS no bundle (polyfills vazios; bundle inicial menor).
- Sidebars deixaram de usar `NgZone.run` e passam a notificar com `ChangeDetectorRef.markForCheck()` (ponte temporária).
- Partes do design system Zard e Go Assistant já usam **signals + OnPush**.

### O que ainda *não* é o “melhor do zoneless”

Zoneless só entrega o máximo quando a UI reage a **notificações explícitas**:

1. **Signals** lidos no template  
2. **Eventos de template** (`(click)`, forms, etc.)  
3. **AsyncPipe / `toSignal` / `resource` / `rxResource`**  
4. **`markForCheck` / `detectChanges`** (último recurso)  
5. HttpClient / Router (já agendam CD internamente)

Hoje a maior parte das páginas ainda faz `.subscribe()` e muta campos plain — isso **pode** atualizar a tela (porque o HttpClient notifica), mas é frágil fora de HTTP (timers, `MutationObserver`, `matchMedia`, Subjects manuais).

---

## 2. Diagnóstico detalhado

### 2.1 Change detection: Default vs OnPush

| Métrica | Contagem (aprox.) |
|---------|-------------------|
| Componentes `*.component.ts` | ~153 |
| Com `ChangeDetectionStrategy.OnPush` | ~27 (~18%) |
| Sem OnPush (Default) | ~126 (~82%) |

OnPush está concentrado em `src/app/shared/components/` (Zard).  
**Quase todas as páginas e o shell de layout estão em Default.**

Shell sem OnPush:

- `src/app/componentes/layout/barra-lateral/barra-lateral.component.ts`
- `src/app/componentes/layout/barra-lateral-plataforma/barra-lateral-plataforma.component.ts`
- `src/app/componentes/layout/cabecalho/cabecalho.component.ts`
- `src/app/componentes/layout/barra-nav-horizontal/barra-nav-horizontal.component.ts`
- `src/app/componentes/layout/layout-app/layout-app.component.ts`
- `src/app/componentes/layout/layout-plataforma/layout-plataforma.component.ts`

### 2.2 `.subscribe()` mutando estado (padrão dominante)

~80 arquivos com `.subscribe(`; dezenas mutam `this.*` no callback.

**Arquivos de maior densidade (prioridade):**

| Hits (ordem) | Arquivo |
|--------------|---------|
| alto | `paginas/clinica/clinica-configuracoes.component.ts` |
| alto | `paginas/protocolos/protocolos-detalhe.component.ts` |
| alto | `paginas/templates/templates-campos.component.ts` |
| alto | `componentes/layout/cabecalho/cabecalho.component.ts` |
| alto | `paginas/envios/envios.component.ts` |
| médio | `formulario-publico/formulario-publico-show.component.ts` |
| médio | `layout-app` / `layout-plataforma` |
| médio | listagens (`pessoas`, `templates-listagem`, `notificacoes`, `plataforma/*`) |

**Padrão de listagem atual:**

```text
LoadingService.loadWithThreshold(...) → data$.subscribe → this.lista = ...
```

- Skeleton: já em **signal** (bom)  
- Dados: ainda em **campo mutável** (a melhorar)

### 2.3 Timers / observers fora do grafo de signals

| Área | Arquivo | Risco |
|------|---------|--------|
| Sidebar collapse | `barra-lateral*.component.ts` | `MutationObserver` + `markForCheck` |
| Tema sistema | `cabecalho.component.ts`, `clinica-configuracoes.component.ts` | `matchMedia` listener |
| Progresso de rota | `top-progress-bar.component.ts` | timers → signals (já ok) |
| Loading threshold | `loading.service.ts` | timer → signal (já ok) |
| Copy feedback | `comece`, onboarding wizard, link-bio tabs | `setTimeout` em campo plain |
| Tooltip / menu | `tooltip.directive.ts`, `menu.directive.ts` | timers + listeners |

### 2.4 `ChangeDetectorRef` restante (gesso)

| Arquivo | Motivo |
|---------|--------|
| `barra-lateral.component.ts` | observer + subscriptions |
| `barra-lateral-plataforma.component.ts` | idem |
| `formulario-publico-show.component.ts` | scroll de termo / alteração de campo |

**Meta:** zerar `markForCheck` nesses arquivos migrando estado para signals.

### 2.5 Gaps de APIs modernas

| API Angular | Uso no projeto |
|-------------|----------------|
| `toSignal` | **0** |
| `AsyncPipe` / `\| async` | **0** |
| `resource` / `rxResource` / `httpResource` | **0** |
| `input()` / `output()` | parcial (~27 vs muitos `@Input`) |

### 2.6 Serviços ainda em Subject (candidatos a signal)

- `SidebarMobileService` — `BehaviorSubject`
- `PlataformaHeaderService` — `BehaviorSubject`
- `AuthService.appearanceApplied$` — `Subject`
- `ClinicaService.brandingUpdated` — `Subject`

### 2.7 Referências boas (espelhar)

- `shared/services/loading.service.ts`
- `core/services/shell-nav-layout.service.ts`
- `core/services/app-update.service.ts`
- `shared/components/top-progress-bar/top-progress-bar.component.ts`
- `go-assistant/**` (shell/tour/drawer)
- Zard: `button`, `tabs`, `command`, `combobox`, etc.
- `plataforma-integracoes-tab.component.ts` (loading/erro/salvando em signals)

### 2.8 Anti-exemplo crítico

`plataforma-emails.component.ts` — `computed()` lendo **campos plain** populados por subscribe. O `computed` **não invalida** sozinho → UI pode ficar stale. Corrigir na Fase 6 (ou P0 se a tela estiver em uso intenso).

---

## 3. Prioridades

### P0 — Correção / stale UI

1. Sidebars → signals; remover `ChangeDetectorRef`  
2. `layout-app` / `layout-plataforma` → badges, trial, título em signals  
3. `formulario-publico-show` → eliminar `markForCheck`  
4. `plataforma-emails` → estado reativo real  
5. `cabecalho` → appearance / `matchMedia` via signals

### P1 — Flicker / feedback atrasado

- Timers em campos (`comece`, onboarding, link-bio)  
- `clinica-configuracoes` / integrações  
- `protocolos-detalhe`, `templates-campos`, `envios`

### P2 — Performance / idiomático

- OnPush em páginas + `zm-*`  
- Padrão listagem: `toSignal` / `rxResource` + `LoadingService`  
- `@Input` → `input()` no shell  
- Subjects de shell → signals

### P3 — Nice-to-have

- `takeUntilDestroyed` em todo subscribe restante  
- Guardrails de PR / lint de padrões  
- Documentar contrato zoneless para diretivas Zard (menu/tooltip)

---

## 4. Fases de migração (front)

### Fase 0 — Guardrails (1–2 dias)

- [ ] Checklist de PR: preferir `signal`; novo `markForCheck` só com justificativa  
- [ ] Smoke Playwright nos fluxos P0  
- [ ] Validar Service Worker + `ApplicationRef.isStable` em build zoneless  

### Fase 1 — Shell (P0)

**Alvos:** `src/app/componentes/layout/**` + services de shell  

- [ ] `sidebar-mobile.service.ts` → `signal`  
- [ ] Sidebars: `sidebarColapsada` / logo / mobile open → signals; remover CDR  
- [ ] Preferir fonte de verdade Angular para collapse (evitar `MutationObserver` em `body` se possível)  
- [ ] `layout-app` / `layout-plataforma`: badges/trial/título → signals  
- [ ] `cabecalho` + `appearanceApplied$` → signal/evento tipado  
- [ ] OnPush no shell  

### Fase 2 — Auth + onboarding

- [ ] Login / forgot / reset / verificação de e-mail  
- [ ] `comece.component.ts` (timers → signals)  
- [ ] `clinica-escolher.component.ts`  

### Fase 3 — Dashboard + listagens tenant

Padrão alvo:

```ts
readonly skeleton = /* signal do LoadingService */;
readonly data = toSignal(this.data$, { initialValue: null });
```

ou `rxResource` / `httpResource` quando couber.

- [ ] `dashboard.component.ts`  
- [ ] `pessoas-*`, `usuarios-*`, `organizacao-*`  
- [ ] `templates-listagem`, `envios`, `notificacoes`, `novidades`, `links-publicos`, `billing`  
- [ ] Onboarding wizard  

### Fase 4 — Formulários / protocolos / templates

- [ ] `formulario-publico-*` (começar por `show`)  
- [ ] `protocolos-detalhe` / listagem  
- [ ] `templates-campos` / editar / criar  
- [ ] Zerar `markForCheck` do show  

### Fase 5 — Link Bio

- [ ] `link-bio.component.ts` + tabs  
- [ ] `link-bio-public*` (toast imperativo → signal/componente)  

### Fase 6 — Plataforma admin

- [ ] Listagens `plataforma/*` → `toSignal` / resource  
- [ ] Corrigir `plataforma-emails`  
- [ ] `clinica-configuracoes` / Feegow / Evolution (poll consciente; ver roadmap back)  

### Fase 7 — Shared UI restante

- [ ] Skeletons + `zm-*` → OnPush  
- [ ] Revisar menu/tooltip/context-menu  
- [ ] Remover pontes CDR restantes  

---

## 5. Regras de engenharia (front)

Ao tocar em componente/página:

1. Estado de UI → `signal` / `computed` / `linkedSignal`  
2. HTTP de leitura → preferir `toSignal`, `resource` ou `rxResource`  
3. Não criar `computed(() => this.campoPlain)`  
4. `setTimeout` que altera UI → atualizar **signal**, não campo  
5. Listeners DOM (`matchMedia`, `MutationObserver`) → sempre terminar em signal ou `markForCheck` (só se inevitável)  
6. Novos componentes de página → `ChangeDetectionStrategy.OnPush`  
7. Evitar `NgZone` (não deve voltar)

---

## 6. Checklist de regressão zoneless

### Shell

- [ ] Colapsar sidebar atualiza tooltips/logo sem refresh  
- [ ] Menu mobile abre/fecha e trava scroll  
- [ ] Tema / dark system no cabeçalho e configurações  
- [ ] Badges de notificações/novidades após navegação  
- [ ] Trial notice após `auth.me()`  
- [ ] Top progress bar entre rotas  
- [ ] Banner de update do SW  

### Dados / formulários

- [ ] Dashboard: skeleton → dados  
- [ ] Listagens: paginação e busca  
- [ ] Formulário público: OTP, scroll de termos, submit  
- [ ] Protocolos / templates editor  
- [ ] Link bio preview + página pública  

### Qualidade

- [ ] Sem “só atualiza no próximo clique”  
- [ ] Sem `ExpressionChangedAfterItHasBeenChecked` recorrente  
- [ ] SW não trava em `isStable`  

---

## 7. Dependências do backend

Zoneless **não exige** breaking change de API. Itens que **melhoram** a adoção de signals/`resource`:

| Front | Pedido ao back | Doc |
|-------|----------------|-----|
| Badge de notificações no layout | Usar `meta.unread_count` (já existe) ou endpoint leve | Roadmap API |
| WhatsApp QR / status Evolution | Status estável + ETag/poll documentado (SSE opcional depois) | Roadmap API |
| PDF/dossiê pesado | Job + status (evita UI “travada”) | Roadmap API |
| Envelope de erro | Manter flat `{ code, message, details? }` alinhado às rules Cursor | Roadmap API |

Detalhes e fases do Laravel: **`zion_med/docs/ROADMAP_MODERNIZACAO_API.md`**.

---

## 8. Critério de “feito” (Definition of Done)

A modernização zoneless/signals do front está **concluída** quando:

1. Nenhum `markForCheck`/`detectChanges` em páginas de produto (exceto casos documentados).  
2. Shell (layout + header + sidebars) 100% signals + OnPush.  
3. Listagens tenant/plataforma usam um padrão único (`LoadingService` + signal/resource).  
4. `toSignal` / `resource` adotados nas telas P0–P1.  
5. Checklist da secção 6 passando em staging.  
6. Docs de design system atualizadas para Angular 21 + zoneless (versão mínima).

---

## 9. Histórico

| Data | Evento |
|------|--------|
| 2026-08-20 | Upgrade Angular 20 → 21; CDK 21; ngx-mask 21; ng-apexcharts 3 |
| 2026-08-20 | `provideZonelessChangeDetection`; remoção de Zone dos polyfills |
| 2026-08-20 | Este roadmap criado |
