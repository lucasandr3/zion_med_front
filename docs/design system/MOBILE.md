# Responsivo / Mobile — Design System Gestgo

Especificação **fidélissima** ao app atual (sync 20/jul/2026). Ao portar, respeitar estes breakpoints e comportamentos exatamente.

## Breakpoints canônicos

| Token / uso | Query | Comportamento |
|-------------|-------|---------------|
| `--bp-sm` | `640px` | Header user: só avatar; wizard ações compactas |
| Filtros / toolbar lista | `767.98px` (`ScreenService.isFilterMobile`) | Toolbar empilha; search 100%; filtros overlay full; footer tabela wrap |
| Shell | `959.98px` (`ScreenService.isMobile`) | Sidenav `mode="over"` + backdrop; botão fechar no logo |
| Auth split | `900px` | Some painel marca; brand mobile no form |
| Header user meta | `min-width: 900px` | Mostra nome/email ao lado do avatar |
| Auth estreito | `480px` | Form sem max-width |
| Wizard builder | `960px` | Grid 1 coluna; overflow auto |
| Drawers lista (algumas telas) | `720px` | Toolbar-start 100% |

## Shell (`layout/shell`)

- `< 960px`: `hasBackdrop`, `fixedInViewport`, sidenav fecha ao clicar nav
- Título `.header-title`: `font-size: 1.05rem`, `max-width: min(52vw, 14rem)`
- `< 640px`: botão conta só avatar (esconde chevron e meta)
- Logo bar: botão `close` visível só no mobile
- Body children: `min-height: 0` (flex) — necessário para wizard / páginas full-height

## Lista simples (`lista.reference.*`)

`@media (max-width: 767.98px)`:

- Toolbar coluna, padding `0.75rem`
- Start/end 100% + wrap
- Search box width 100%

Espelhado também em `styles/styles.scss` (regras globais `.upx-page-list__toolbar`).

## Lista com filtros (`lista-com-filtros.reference.*`)

- `mat-sidenav` filtros: `width: min(100vw, 22.5rem)`
- No mobile global (`styles.scss` ≤767.98px): filtros `max-width: 100vw`; create drawer `width: 100vw`
- `filterSidenavMode`: `over` se `isFilterMobile`, senão `side`
- Create drawer: sempre `mode="over"`, `width: min(100vw, 26rem)` (desktop) → full viewport no mobile

## Data table (`shared/components/data-table`)

`@media (max-width: 767.98px)` no footer:

- `flex-wrap`, `height: auto`, padding reduzido

Global (`styles.scss`):

- Tabela `font-size: 0.8125rem`
- `th`/`td` padding menor; `th` `0.65rem`

## Auth (`layout/auth`)

`@media (max-width: 900px)`:

- Grid 1 coluna; `.login-brand { display: none }`
- `.login-panel__brand-mobile { display: flex }`
- Form centralizado; links/back centralizados

`@media (max-width: 480px)`: inner sem max-width.

## Wizard (`layout/wizard/wizard.reference.scss`)

- `≤960px`: `.wizard-builder` vira 1 coluna + `overflow: auto`
- `≤640px`: toolbar empilha; ações full-width; painel padding `0.75rem`
- Modo designer (`--designer`): full-bleed também no mobile (sem nav, sem card)
- Stepper global: ícones `70px` → `30px` em ≤640px — **exceto** `.report-wizard-stepper`

## Dialogs / overlays

- Painéis dialog: `max-width: calc(100vw - 1.5rem)`
- Confirm: `max-width: calc(100vw - 2rem)`
- Menus conta/notif: `min/max-width: min(…, calc(100vw - 1.5rem))`

## Checklist mobile ao criar tela nova

1. Usar `ScreenService` — não inventar breakpoints
2. Lista: classes `upx-page-list__*` (já têm CSS global mobile)
3. Filtros: `list-sidenav` + `isFilterMobile` / `filterSidenavMode`
4. Full-height: `min-height: 0` nos flex children (não `min-height: 100%`)
5. Testar 375px, 768px e 960px
6. Não fixar larguras que estourem viewport (`min(100vw, …)` ou `100%`)
