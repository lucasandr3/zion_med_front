# Sync Design System — Gestgo

## 2026-07-22 — Material + DS fiel (runtime)

- `@angular/material` + `@angular/animations`
- Tema Gestgo em `src/custom-theme.scss` (não azure)
- Tokens / material-theme / data-table / gestgo-ds em `src/styles/`
- Componentes `up-*` em `src/app/shared/components/up/`
- Listagens Pessoas (canônica) e Protocolos (toolbar Material)

## 2026-07-22 — Aplicação no app Gestgo (runtime)

Integração visual do DS no app Zard + Tailwind v4 (sem Angular Material):

- Tokens `--theme-*` em `src/styles.css`
- Shell padrão: header/faixa `#0d2833`, floor `#f4faf7`
- Listagens: `zm-list-toolbar` / `zm-page-list` alinhados a `upx-page-list`
- Login: painel marca escuro (auth-shell)
- `ScreenService` em `src/app/shared/services/screen.service.ts`

## 2026-07-22 — Marca Gestgo + primária (`ocean-blue`)

Nome do produto: **Gestgo**. Alinhamento da identidade ao tema padrão do app (`src/styles.css` / `body.theme-ocean-blue`):

| Token | Antes (legado) | Agora (Gestgo) |
|-------|----------------|----------------|
| `--theme-padrao` (light) | `125 200 0` (`#7DC800`) | `22 168 116` (`#16a874`) |
| `--theme-padrao` (dark) | `125 200 0` | `52 211 153` (`#34d399`) |
| `--theme-floor-2` / sidebar | `245 247 249` | `244 250 247` (`#f4faf7`) |
| `--mat-sys-on-primary` (light) | `#0d2833` | `#ffffff` |

Fonte no app: `--c-primary: #16a874` (e dark `#34d399`).

## 2026-07-20 — Sync com layout em produção

Fonte: layout de referência (estado sincronizado do shell/listas).

### Re-sincronizado 1:1

| Destino | Fonte |
|---------|-------|
| `theme/tokens.scss` | `src/styles/tokens.scss` |
| `theme/tema.util.ts` | `src/app/shared/utils/tema.util.ts` |
| `styles/styles.scss` | `src/styles.scss` |
| `styles/material-theme.scss` | `src/styles/material-theme.scss` |
| `styles/data-table.scss` | `src/styles/data-table.scss` |
| `styles/navigation.scss` | `src/styles/navigation.scss` |
| `styles/stepper-wizard.scss` | `src/styles/stepper-wizard.scss` |
| `layout/shell/*` | `src/app/layout/shell/*` |
| `layout/auth/_auth-shell.scss` | `src/app/features/auth/_auth-shell.scss` |
| `layout/auth/login.reference.html` | login |
| `layout/wizard/wizard.reference.scss` | report-wizard |
| `layout/patterns/lista.reference.*` | report-list |
| `layout/patterns/lista-com-filtros.reference.*` | schedule-list |
| `shared/components/*` | `src/app/shared/components/*` |
| `shared/services/*` | screen + confirm |
| `tailwind.config.js` | raiz do app |

### Mudanças vs sync anterior (17/jul)

- **Shell body:** filhos do `__body` usam `min-height: 0` (não `100%`) — flex scroll correto em páginas full-height
- **Wizard full-bleed (designer):** `.wizard-page--designer` / `.wizard-builder--designer`; painel sem card (sem borda/radius/shadow); stepper Material só etapa atual (`.mat-horizontal-stepper-content-current`)
- **Stepper global:** `.mat-stepper-horizontal:not(.report-wizard-stepper)` — report-wizard sem padding do stepper legado
- **Lista:** `lista.reference.html` alinhada ao report-list (incl. queryParams de edição)

### Stack do app (referência)

- Angular **19** standalone + Angular Material 19
- Tailwind 3 + `darkMode: 'class'`
- Fonte: Roboto + Material Icons / Material Symbols Outlined


## 2026-07-17 — Layout canônico atualizado

Fonte: layout de referência (em produção).

### Atualizado

| Destino | Fonte |
|---------|-------|
| `theme/tokens.scss` | `src/styles/tokens.scss` |
| `theme/tema.util.ts` | `src/app/shared/utils/tema.util.ts` |
| `styles/styles.scss` | `src/styles.scss` |
| `styles/material-theme.scss` | `src/styles/material-theme.scss` |
| `styles/data-table.scss` | `src/styles/data-table.scss` |
| `styles/navigation.scss` | `src/styles/navigation.scss` |
| `styles/stepper-wizard.scss` | `src/styles/stepper-wizard.scss` |
| `layout/shell/*` | `src/app/layout/shell/*` |
| `layout/auth/_auth-shell.scss` | `src/app/features/auth/_auth-shell.scss` |
| `layout/patterns/lista.reference.*` | report-list |
| `shared/components/*` | `src/app/shared/components/*` |
| `shared/services/screen.service.ts` | idem |
| `tailwind.config.js` | raiz do app |

### Mudanças vs pacote antigo

- Tokens light: `floor-2` = `245 247 249` (não mais `248 249 250`)
- Dark: floors neutros `18/22/28` (não azulados)
- Shell moderno: menus `.uam` / `.notif`, sem projeção `shell-menu`
- Listas: `up-data-table` + `up-search-box` (não `upx-data-list`)
- Material: radius 10px, primary verde + texto branco

### Regras Cursor

- Projeto: `.cursor/rules/upgestao-design-system.mdc`
- Usuário (todos os projetos): `~/.cursor/rules/upgestao-design-system.mdc`


## 2026-07-17 (tarde) — Mobile + padrões completos

Adicionado com fidelidade ao `src/`:

| Destino | Fonte |
|---------|-------|
| `MOBILE.md` | especificação de breakpoints |
| `layout/patterns/lista-com-filtros.reference.*` | schedule-list |
| `layout/auth/login.reference.html` | login |
| `layout/wizard/wizard.reference.scss` | report-wizard |
| `shared/services/confirm-dialog.service.ts` | shared |

Revalidado `diff` 1:1: tokens, shell scss/html/ts, auth shell, data-table, styles globais.
