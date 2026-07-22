# Gestgo Design System — canônico

**Fonte da verdade:** layout e estilos do **Gestgo** (`src/styles.css`, tema `ocean-blue`), atualizado em **22/jul/2026**.

Use este pacote para telas Angular do Gestgo ficarem alinhadas ao visual — **incluindo mobile**.

> `ngx-ds/` (legado) permanece como referência histórica. O layout atual **não** depende de `upx-*` do ngx-ds — usa Angular Material + classes `upx-*` + componentes `up-*` em `shared/`.

**Mobile:** ver [`MOBILE.md`](MOBILE.md) — breakpoints, shell overlay, lista, filtros, auth e tabela.  
**Histórico de sync:** [`EXTRACAO.md`](EXTRACAO.md).

---

## Stack obrigatória

| Peça | Escolha |
|------|---------|
| Framework | Angular 19+ standalone |
| UI | Angular Material (botões, sidenav, form-field outlined, menu, dialog, snackbar) |
| Utilitários | Tailwind 3 + `darkMode: 'class'` |
| Fonte | Roboto + Material Icons / Material Symbols Outlined |
| Tema | CSS variables RGB + `html.dark` + `color-theme="padrao"` |

---

## Identidade visual (não alterar)

Alinhada ao tema padrão do app: `body.theme-ocean-blue` → `--c-primary: #16a874`.

| Token | RGB light | Hex approx | Uso |
|-------|-----------|------------|-----|
| `--theme-padrao` | `22 168 116` | `#16a874` | Primária (CTAs, ativo, focus) |
| `--theme-padrao-2` | `13 40 51` | `#0d2833` | Header / logo bar / snackbar |
| `--theme-floor-1` | `255 255 255` | branco | Cards, inputs, menus |
| `--theme-floor-2` | `244 250 247` | `#f4faf7` | Fundo do conteúdo |
| `--theme-sidebar` | `244 250 247` | = floor-2 light | Sidebar |
| `--theme-fg` | `13 20 16` | `#0d1410` | Tipografia |
| `--theme-line` | `rgb(13 20 16 / 0.1)` | divisórias | Bordas sutis |

**Dark:** floors pretos neutros (`18/22/28`), fg branco, sidebar `#121212`. Primária dark = `#34d399` (`52 211 153`).

**Raio de botões Material:** sempre `10px`.  
**Primário filled:** fundo verde marca + texto **branco** (`mat-flat-button color="primary"`).  
**Soft / Voltar:** `mat-flat-button` + classe `upx-btn-soft` (verde translúcido, sem `color="primary"`).  
**Cancelar:** `mat-stroked-button` + `btn-cancel`.

---

## Estrutura deste pacote

```
design system/
├── README.md                    ← este arquivo
├── EXTRACAO.md                  ← histórico de sync
├── MOBILE.md                    ← breakpoints e comportamentos mobile
├── tailwind.config.js
├── theme/
│   ├── tokens.scss              ← CSS variables (copiar 1:1)
│   └── tema.util.ts             ← light/dark + localStorage
├── styles/
│   ├── styles.scss              ← global (imports + utilitários upx-*)
│   ├── material-theme.scss      ← overrides Material
│   ├── navigation.scss          ← .upx-navigation
│   ├── data-table.scss          ← tabela + badges
│   └── stepper-wizard.scss      ← stepper legado (exclui .report-wizard-stepper)
├── layout/
│   ├── shell/                   ← up-app-shell (sidebar + header)
│   ├── auth/                    ← login + _auth-shell.scss
│   ├── wizard/                  ← SCSS do wizard (full-bleed + designer)
│   └── patterns/                ← lista simples + lista com filtros
├── shared/
│   ├── components/              ← up-data-table, up-badge, up-search-box…
│   └── services/                ← ScreenService (+ confirm)
└── ngx-ds/                      ← legado (opcional)
```

---

## Integração em projeto novo (checklist)

### 1. Copiar arquivos

| Origem neste pacote | Destino no app |
|---------------------|----------------|
| `theme/tokens.scss` | `src/styles/tokens.scss` |
| `styles/*.scss` | `src/styles/` (+ `styles.scss` na raiz `src/`) |
| `theme/tema.util.ts` | `src/app/shared/utils/tema.util.ts` |
| `shared/services/screen.service.ts` | `src/app/shared/services/` |
| `shared/components/*` | `src/app/shared/components/` |
| `layout/shell/*` | `src/app/layout/shell/` |
| `layout/auth/_auth-shell.scss` | importar nas telas de auth |
| `tailwind.config.js` | raiz |

### 2. `index.html`

```html
<html lang="pt-BR" color-theme="padrao" style="color-scheme: light dark">
```

Fonts: Roboto + Material Icons (ver `fonts/index.reference.html` ou `src/styles.scss`).

### 3. Bootstrap do tema

Injete `TemaUtil` no app (constructor/`APP_INITIALIZER`) para aplicar `html.dark` e `color-theme`.

### 4. Shell autenticado

```html
<up-app-shell pageTitle="Título da página" empresaNome="Nome do produto">
  <!-- conteúdo da rota -->
</up-app-shell>
```

- Sidebar `15rem`, fundo `--theme-sidebar`
- Header e logo bar: `--theme-padrao-2` + texto branco
- Corpo: `--theme-floor-2`, full bleed (sem max-width no shell)
- Filhos do body: `min-height: 0` + flex stretch (páginas full-height / wizard)
- Mobile `< 960px`: sidenav `mode="over"`
- Header: ajuda | notificações (`.notif`) | conta (`.uam`) — opcional por produto

### 5. Página de lista (padrão canônico)

```html
<div class="upx-page-list">
  <div class="upx-page-list__toolbar">
    <div class="upx-page-list__toolbar-start">
      <up-search-box ... />
    </div>
    <div class="upx-page-list__toolbar-end">
      <button mat-flat-button color="primary">
        <mat-icon>add</mat-icon> Adicionar
      </button>
    </div>
  </div>
  <div class="upx-page-list__content">
    <up-empty-state ... />  <!-- ou -->
    <up-data-table>
      <thead>...</thead>
      <tbody>...</tbody>
    </up-data-table>
  </div>
</div>
```

- Lista simples: `layout/patterns/lista.reference.html` + `.scss`
- Lista + filtros + drawer: `layout/patterns/lista-com-filtros.reference.*`

### 6. Auth (login / forgot / reset)

Layout split: painel marca `#0d2833` | formulário floor-1.  
SCSS: `layout/auth/_auth-shell.scss` · HTML: `layout/auth/login.reference.html`.  
Mobile ≤900px: some a marca, mostra `.login-panel__brand-mobile`.

### 7. Wizard / assistente multi-step

SCSS: `layout/wizard/wizard.reference.scss` + `styles/stepper-wizard.scss`.

```
.wizard-page
├── .wizard-toolbar          (Voltar soft + Continuar primary + Salvar)
└── .wizard-builder
    ├── .wizard-nav          (fases/etapas — oculto no designer)
    └── .wizard-main
        └── mat-stepper.report-wizard-stepper
            └── .wizard-panel [--builder no designer]
```

- Página e builder: `height: 100%`, `min-height: 0`, `overflow: hidden`
- **Modo designer (full-bleed):** classes `wizard-page--designer` + `wizard-builder--designer` — sem nav lateral, painel sem card (borda/radius/shadow), padding zero
- Header Material do stepper: oculto; só `.mat-horizontal-stepper-content-current` ocupa espaço
- Stepper global **não** aplica padding em `.report-wizard-stepper`

### 8. Mobile (obrigatório)

Copiar `ScreenService` e seguir [`MOBILE.md`](MOBILE.md):

| Breakpoint | Efeito |
|------------|--------|
| `< 960px` | Shell sidenav overlay; wizard builder 1 coluna |
| `< 768px` | Toolbar lista empilha; filtros full-width |
| `< 640px` | Header só avatar; wizard ações compactas |
| `< 900px` | Auth single column |

---

## Regras de UI (obrigatórias)

1. **Não inventar paleta** — só tokens `--theme-*`.
2. **Não usar cards no hero de lista** — toolbar + tabela full height.
3. **Tabela:** sticky header uppercase, hover verde `padrao/0.06`, cell-primary bold.
4. **Badges:** `up-badge` variants `type` | `status` (+ tones draft/published/archived).
5. **Menus conta/notif:** classes `.uam` / `.notif` (já no `styles.scss`).
6. **html/body:** `overflow: hidden`; scroll só no body do shell / conteúdo.
7. **Breakpoints:** shell `960px`, filtros/toolbar `768px` (`ScreenService`).
8. **Full-height:** filhos do shell body com `min-height: 0` (não forçar `min-height: 100%`).

---

## O que NÃO fazer

- Tema roxo / indigo / cream “AI default”
- Border-radius full em botões de ação (só search pill e badges status)
- `color="primary"` em botão soft/voltar
- Fundo branco na área de conteúdo (usar `floor-2`)
- Recriar shell do zero — copiar `layout/shell/`
- Card decorativo no painel do wizard designer (full-bleed)
- Aplicar padding do `.mat-stepper-horizontal` global no report-wizard
