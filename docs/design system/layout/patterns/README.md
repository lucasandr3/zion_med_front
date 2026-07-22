# Padrões de tela (Gestgo)

Todos sincronizados do `src/` em **20/jul/2026** — fidelidade desktop **e** mobile. Ver também [`../../MOBILE.md`](../../MOBILE.md).

## Lista simples

| Arquivo | Origem |
|---------|--------|
| `lista.reference.html` | `features/reports/list/report-list.component.html` |
| `lista.reference.scss` | `features/reports/list/report-list.component.scss` |

Toolbar + search + tabela/empty. Mobile ≤767.98px: toolbar coluna.

## Lista com filtros + drawer criar

| Arquivo | Origem |
|---------|--------|
| `lista-com-filtros.reference.html` | `features/schedules/schedule-list.component.html` |
| `lista-com-filtros.reference.scss` | `features/schedules/schedule-list.component.scss` |

`list-sidenav` + `up-list-filters-panel` + create drawer end.  
Mobile: `isFilterMobile` → filtros `over` / full viewport.

## Auth

| Arquivo | Origem |
|---------|--------|
| `../auth/_auth-shell.scss` | `features/auth/_auth-shell.scss` |
| `../auth/login.reference.html` | `features/auth/login/login.component.html` |

## Wizard

| Arquivo | Origem |
|---------|--------|
| `../wizard/wizard.reference.scss` | `features/reports/wizard/report-wizard.component.scss` |

+ `styles/stepper-wizard.scss` global (exclui `.report-wizard-stepper` do padding legado).

### Anatomia atual

- `.wizard-page` / `.wizard-builder`: full height, `min-height: 0`
- Nav lateral por fases (`.wizard-nav`) nas etapas normais
- **Designer (layout):** `wizard-page--designer` + `wizard-builder--designer` — sem nav, painel full-bleed sem card
- Stepper Material: header oculto; só `.mat-horizontal-stepper-content-current` visível

## Legado (não usar em app novo)

`lista-operacoes-v2*.reference.html`, `form-operacao-toolbar.reference.html` — ERP antigo (ngx-ds).
