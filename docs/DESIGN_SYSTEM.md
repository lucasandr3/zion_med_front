# Design System — Gestgo (front-end Angular)

Documento de referência para manter consistência visual entre telas **e** para replicar o mesmo design em outro projeto Angular.

**Fonte da verdade no código:**

| Camada | Onde |
|--------|------|
| Tokens globais, utilitários CSS, layout shell | `src/styles.css` |
| Componentes Zard (botão, tabela, card, input…) | `src/app/shared/components/` |
| Wrappers Gestgo (`zm-*`) | `src/app/shared/components/ui/` |
| Skeletons de loading | `src/app/shared/components/skeletons/` |

---

## 1. Stack e dependências

Para outro sistema com a mesma aparência, alinhe esta base:

| Pacote | Uso |
|--------|-----|
| Angular 20+ (standalone) | Framework |
| Tailwind CSS 4 | Utilitários; `@import 'tailwindcss'` em `styles.css` |
| `tailwindcss-animate` | Animações (`zm-fade-in`, pulse do skeleton) |
| Zard UI (`zard-cli`) | Componentes headless (`z-button`, `z-card`, `z-table`, `z-input`…) |
| `class-variance-authority` + `clsx` + `tailwind-merge` | Variantes de componentes |
| `@ng-icons/lucide` | Ícones em `z-empty` e alguns componentes Zard |
| **Material Symbols Outlined** (Google Fonts) | Ícones de navegação, toolbars e ações — padrão do produto |
| **Roboto** | Tipografia principal (corpo + títulos) |
| Flatpickr + `angularx-flatpickr` | Datas em filtros e formulários |
| ApexCharts | Gráficos do dashboard |

**Checklist ao iniciar um projeto novo:**

1. Copiar/adaptar `src/styles.css` (tokens `:root`, `.dark`, temas `body.theme-*`, utilitários).
2. Copiar `src/app/shared/components/` (Zard + wrappers).
3. Configurar alias `@/` → `src/app/` no `tsconfig`.
4. Incluir Roboto + Material Symbols no `index.html`.
5. Aplicar `class="dark"` no `<html>` ou `<body>` conforme preferência do usuário (dark mode **não** usa `@media prefers-color-scheme`).
6. Aplicar tema de marca em `<body class="theme-ocean-blue">` (ou outro da lista na secção 4).
7. Preferir componentes Zard; usar classes legadas (`btn-primary`, `table.data-table`) só onde ainda não houve migração.

---

## 2. Princípios

1. **Tokens primeiro** — nunca hardcodar hex em CSS de página; usar `var(--c-*)`, `var(--space-*)`, `var(--radius-*)`, `var(--text-*)` ou tokens Zard (`var(--primary)`, `var(--border)`, `var(--muted-foreground)`).
2. **Duas camadas de cor, uma marca** — tokens `--c-*` (Gestgo) e tokens Zard/shadcn (`--primary`, `--foreground`, `--card`…). A ponte está em `body { --primary: var(--c-primary); }` dentro de `styles.css`.
3. **Semântica ≠ marca** — sucesso/alerta/erro usam `--c-success`, `--c-warning`, `--c-danger` (e `*-soft`). Não mudam quando o usuário troca o tema de cor.
4. **Sem sombras** — `--shadow-sm/md/lg/drawer` estão definidos como `none`; cards e tabelas usam **borda**, não elevação.
5. **Ícones preenchidos no ativo** — item de menu ativo: `font-variation-settings: 'FILL' 1` nos Material Symbols.
6. **Alturas fixas** — botões `35px` (`--button-height`); inputs/selects/combobox `43px` (`--control-height`). Manter alinhamento em toolbars.
7. **Acessibilidade** — contraste WCAG AA nos temas claros; labels em filtros com `zm-filter-label`; estados vazios com `role="status"`; foco visível via `--c-focus` / `--ring`.

---

## 3. Arquitetura de tokens

### 3.1 Superfície e texto (`--c-*`)

| Token | Claro | Uso |
|-------|-------|-----|
| `--c-bg` | `#f4faf7` | Fundo da área de conteúdo |
| `--c-surface` | `#ffffff` | Cards, painéis, tabelas |
| `--c-elevated` | `#ffffff` | Dropdowns, popovers |
| `--c-soft` | `#e6f5ef` | Hover de linha, fundos secundários |
| `--c-text` | `#0d1410` | Texto principal |
| `--c-muted` | `#3d4d46` | Texto secundário, cabeçalhos de tabela |
| `--c-border` | `#dde8e3` | Bordas |
| `--c-primary` | tema | Marca, botão principal, links |
| `--c-accent` | tema | Destaques secundários da marca |
| `--c-focus` | rgba da marca | Anel de foco |

### 3.2 Semânticas (fixas em claro/escuro)

| Token | Claro | Escuro | Uso |
|-------|-------|--------|-----|
| `--c-success` | `#15803d` | `#4ade80` | Aprovado, ativo, assinado |
| `--c-success-soft` | mix 14% | rgba | Fundo de badge/chip |
| `--c-warning` | `#d97706` | `#fbbf24` | Pendente, expirado |
| `--c-warning-soft` | mix 16% | rgba | Fundo |
| `--c-danger` / `--c-error` | `#dc2626` | `#f87171` | Erro, reprovado, destrutivo |
| `--c-danger-soft` | rgba | rgba | Alertas leves |
| `--c-info` | `#0369a1` | `#38bdf8` | Informativo |

### 3.3 KPI / dashboard

| Token | Uso |
|-------|-----|
| `--c-kpi-accent` | Destaque de métricas, links “ver todos” |
| `--c-kpi-accent-soft` | Fundo de badges KPI |
| `--c-kpi-accent-text` | Texto sobre fundo KPI |

### 3.4 Escala, raio, tipografia

**Espaçamento** (base 4px): `--space-1` (4px) … `--space-10` (40px).

**Raio:** `--radius-sm` 6px · `--radius-md` 8px · `--radius-lg` 12px · `--radius-xl` 16px · `--radius-2xl` 20px.

Cards de seção usam frequentemente `0.875rem` (14px) como raio local.

**Tipografia:**

| Token | Tamanho | Uso típico |
|-------|---------|------------|
| `--text-xs` | 11px | Labels uppercase, cabeçalho de tabela |
| `--text-sm` | 13px | Células, botões, corpo compacto |
| `--text-base` | 14px | Texto padrão de formulário |
| `--text-md` | 16px | Valores destacados |
| `--text-lg` | 18px | Preços, subtítulos |
| `--text-xl` | 20px | — |
| `--text-2xl` | 24px | Título de página (`h1` em `.page-title`) |
| `--tracking-wide` | 0.06em | Headers de tabela |
| `--leading-body` | 1.55 | Parágrafos |

**Sombras:** todas `none` — não reintroduzir `box-shadow` em novos componentes.

### 3.5 Tokens Zard (Tailwind)

Usados por `z-button`, `z-card`, `z-badge`, utilitários `bg-card`, `text-muted-foreground`, etc.

Em CSS de página, prefira fallback duplo para compatibilidade:

```css
color: var(--muted-foreground, var(--c-muted));
border: 1px solid var(--border, var(--c-border));
background: var(--card, var(--c-surface));
```

### 3.6 Mix translúcido (padrão de destaque)

Fundos e bordas “tintados” pela cor primária ou semântica:

```css
background: color-mix(in srgb, var(--primary, var(--c-primary)) 12%, transparent);
border-color: color-mix(in srgb, var(--c-warning) 35%, var(--border, var(--c-border)));
```

Percentuais usuais: **7–8%** intro/info · **12–14%** ícones e chips · **28–35%** bordas de estado.

---

## 4. Temas de marca e modo escuro

### 4.1 Aplicação

```html
<body class="theme-ocean-blue">
<!-- ou -->
<body class="dark theme-gestgo-blue">
```

Classes em `body`: `theme-gestgo-blue` (canônico; `theme-zion-blue` é alias legado), `theme-ocean-blue` (padrão verde Gestgo), `theme-indigo-night`, `theme-emerald-fresh`, `theme-rose-elegant`, `theme-amber-warm`, `theme-violet-dream`, `theme-teal-ocean`, `theme-slate-pro`, `theme-cyan-tech`, `theme-fuchsia-bold`.

Cada tema redefine `--c-primary`, `--c-accent`, `--c-focus` em claro e escuro (`.dark.theme-*`).

### 4.2 Preset de shell

`body.shell-preset-tinted` — header com fundo `--c-primary`; sidebar permanece neutra.

### 4.3 Dark mode

Classe `.dark` no ancestral (geralmente `<html>` ou `<body>`). Não usar media query automática.

---

## 5. Tipografia e ícones

- **Fonte:** Roboto (`--font-sans`, `--font-heading`).
- **Ícones de produto:** `<span class="material-symbols-outlined">nome</span>` — tamanho comum `text-base` (16px) em botões; `text-sm` em cabeçalhos de seção.
- **Ícones Zard/vazios:** Lucide via `@ng-icons` (ex.: `z-empty`).

---

## 6. Componentes — o que usar

### 6.1 Hierarquia (preferência)

| Necessidade | Preferir | Legado (evitar em código novo) |
|-------------|----------|--------------------------------|
| Botão | `<button z-button zType="default\|outline\|ghost\|destructive" zSize="sm">` | `.btn-primary`, `.btn-ghost`, `.btn-danger` |
| Input / select | `z-input` + classes `form-input` quando necessário | só `.form-input` sem diretiva |
| Tabela de listagem | `<table z-table zSize="compact">` dentro de `<z-card class="zm-table-card">` | `table.data-table` |
| Card | `<z-card>` | `.card` |
| Badge de status | `<z-badge zType="default\|secondary\|destructive\|outline" zShape="pill">` | — |
| Combobox / select pesquisável | `<z-combobox>` | `zm-searchable-select` (deprecated) |
| Estado vazio | `<z-empty>` ou `<zm-empty-state>` | — |
| Paginação | `<zm-pagination>` | — |
| Skeleton | `<zm-skeleton-list>` ou `<z-skeleton>` | `.zm-skeleton` |
| Sheet de filtros | `<z-sheet>` + `.zm-filter-sheet` | `.filter-drawer` |
| Segment control | `.z-segment` + `.z-segment-btn--active` | — |

**Importações comuns:**

```typescript
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardTableImports } from '@/shared/components/table';
import { ZARD_FORM_CONTROL_IMPORTS } from '@/shared/components/input/form-controls.imports';
import { ZmPaginationComponent, ZmEmptyStateComponent } from '@/shared/components/ui';
import { ZmSkeletonListComponent } from '@/shared/components/skeletons';
```

### 6.2 Botões legados (`styles.css`)

Ainda presentes em billing e telas antigas:

- `btn-primary` — ação principal (fundo `--c-primary`, texto branco).
- `btn-ghost` / `btn-default-bg` — secundário (fundo `--c-soft`, borda, texto `--c-primary`).
- `btn-danger` — destrutivo confirmado.
- `btn-spinner` — loading inline em botões.
- Variante `btn-sm` — mesma altura `--button-height`, padding menor.

### 6.3 Formulários

- Labels: `.form-label` ou `.zm-filter-label` (uppercase 12px).
- Inputs: `z-input` com altura `--control-height`; placeholder com `--c-muted` a 70% opacidade.
- Busca: wrapper `.form-search-wrap` + ícone `.form-search-icon` + input `.form-search-input` (padding-left extra).
- Checkbox/radio: `.form-checkbox`, `.form-radio`.
- Datas: Flatpickr com `z-input`.

### 6.4 Tabela de listagem (padrão atual)

```html
<z-card class="zm-table-card gap-0 overflow-hidden rounded-[8px] py-0 shadow-sm **:data-[slot=card-content]:p-0">
  <div class="zm-table-wrap">
    <table z-table zSize="compact">
      <thead z-table-header>...</thead>
      <tbody z-table-body>
        <tr z-table-row class="zm-row-clickable">...</tr>
      </tbody>
    </table>
  </div>
</z-card>
```

Utilitários de linha: `.zm-row-title`, `.zm-row-sub`, `.zm-cell-muted`, `.zm-row-avatar`, `.zm-action-icon`.

**Legado:** `.data-table-wrap` + `table.data-table` — manter só onde não migrado.

### 6.5 Cards de seção (configurações, billing, detalhe)

Estrutura canônica:

```html
<z-card class="section-card gap-0 overflow-hidden rounded-[0.875rem] border-border bg-card py-0 shadow-sm **:data-[slot=card-content]:p-0">
  <div class="section-header">
    <div class="icon-wrap w-7 h-7 rounded-lg flex items-center justify-center">
      <span class="material-symbols-outlined text-sm">icon_name</span>
    </div>
    <div>
      <p class="section-title text-xs font-bold uppercase tracking-wider">Título da seção</p>
      <!-- valor ou subtítulo opcional -->
    </div>
  </div>
  <div class="section-body"><!-- conteúdo --></div>
</z-card>
```

Estilos globais em `.clinica-config`, `.link-bio-config`, `.protocolo-detalhe-page`; billing usa classes locais espelhando o mesmo visual (`.billing-section-card`).

Variante destaque: `section-card--highlight` ou borda com `--c-warning` quando há pendência.

### 6.6 Layout shell

| Elemento | Detalhe |
|----------|---------|
| Sidebar | Largura `--sidebar-w` (15rem); item `.nav-link.active` / `.shell-sidebar-nav.router-link-active` |
| Header | Altura `--shell-header-height` (3.5rem); breadcrumbs via `[breadcrumbs]` no cabeçalho |
| Conteúdo | Entrada suave `.zm-content-enter` (fade 0.25s) |
| Sidebar colapsada | `body.sidebar-collapsed` — sem barra lateral no item ativo |

Logout apenas pelo menu do usuário na sidebar (sem botão duplicado no header).

---

## 7. Padrões de página

### 7.1 Listagem paginada

Ordem no template:

1. **Toolbar** — `.zm-list-toolbar` (opcional `--search-wide`):
   - Busca: `.form-search-wrap` + `z-input.form-search-input`
   - Ações: `z-button zType="outline" zSize="sm"` (filtros) + `z-button zSize="sm"` (criar)
2. **Contagem** — `.zm-count-label` (ex.: “12 pessoas”).
3. **Loading** — `@if (showSkeleton()) { <zm-skeleton-list [rows]="6" /> }`
4. **Conteúdo** — `.zm-content-enter`:
   - Vazio → `<zm-empty-state title="…" actionLabel="…" actionLink="…" />`
   - Com dados → `z-card` + `z-table`
5. **Paginação** — `<zm-pagination [currentPage] [lastPage] (pageChange)>` se `last_page > 1`
6. **Filtros** — `z-sheet` com `.zm-filter-sheet`, footer Limpar / Aplicar

**Telas de referência:** Pessoas, Protocolos, Templates, Envios, Usuários, Plataforma (assinaturas).

### 7.2 Cabeçalho de página (quando não usa só toolbar)

```html
<header class="page-header">
  <div class="page-title">
    <div class="page-title-icon"><span class="material-symbols-outlined">…</span></div>
    <div>
      <h1>Título</h1>
      <p class="page-header-subtitle">Subtítulo opcional</p>
    </div>
  </div>
</header>
```

### 7.3 Página de conteúdo / billing

- Intro contextual: bloco com borda tintada (`color-mix` 7% fundo, 22% borda) — ver `billing-intro`.
- Status boxes: `--active` (primária), `--pending` (warning).
- Grids responsivos: 1 col → `sm:2` → `lg:3` para cards de plano.
- Erros: `text-destructive` ou `.billing-error-text`.
- Bloqueio de assinatura: `<zm-assinatura-bloqueada-card>`.

**Referência:** `src/app/paginas/billing/`.

### 7.4 Dashboard

- KPIs com `--c-kpi-*` e semânticas para barras de status.
- Gráficos ApexCharts; filtro de período com `.dash-period-tabs`.
- Skeleton: `zm-skeleton-dashboard`.

### 7.5 Formulário público (exceção)

`.form-publico-page` tem tokens próprios (`--fp-*`) e pode aplicar marca do cliente (`.fp-branded`). **Não** reutilizar esses tokens no app autenticado.

---

## 8. Estados, feedback e motion

| Situação | Padrão |
|----------|--------|
| Loading inicial | Skeleton (`zm-skeleton-*` ou `z-skeleton`) |
| Loading de ação | `btn-spinner` ou `zLoading` no botão |
| Entrada de conteúdo | `.zm-content-enter` |
| Toast | `ngx-sonner` + container custom |
| Erro inline | `text-destructive` / `--c-error` |
| Drawer/sheet | `.filter-drawer` ou `z-sheet`; animação `zm-drawer-slide-in` |
| Progresso global | `.global-loader` (3 dots `--c-primary`) |
| Top bar | `top-progress-bar` durante navegação |

**Skeleton:** cores `--skeleton-base` / `--skeleton-highlight` (verde-acinzentado claro; neutro escuro).

---

## 9. CSS em componentes de página

Regras para manter consistência ao criar `.minha-page`:

1. Usar **BEM** com prefixo da página: `.billing-section-card__title`, não `.title` genérico.
2. Layout flex/grid no `:host` ou wrapper raiz; `min-height: 0` em colunas scrolláveis.
3. Zero hex — só tokens e `color-mix`.
4. Reutilizar classes globais (`.section-header`, `.zm-list-toolbar`) antes de duplicar.
5. Não adicionar `box-shadow`.
6. Raio de card alinhado: `0.875rem` ou `rounded-[8px]` / `rounded-[0.875rem]`.
7. Espaçamento entre blocos: `gap: 1rem` ou `var(--space-4)`.

---

## 10. Anti-padrões

- Cores hex soltas em CSS de componente.
- `box-shadow` para “elevar” cards (fora do design atual).
- Tabelas HTML cruas sem `z-table` em listagens novas.
- Botões com altura/padding inconsistentes fora de `--button-height` / `--control-height`.
- Ícones Material Symbols com tamanhos aleatórios (preferir `text-sm` / `text-base`).
- Duplicar botão “Sair” no header.
- Usar `@media (prefers-color-scheme: dark)` — o app usa classe `.dark`.
- Misturar tokens `--fp-*` do formulário público no shell autenticado.

---

## 11. Estrutura de pastas relevante

```
src/
├── styles.css                 # tokens + utilitários globais
├── app/
│   ├── shared/components/
│   │   ├── button/            # z-button
│   │   ├── table/             # z-table
│   │   ├── card/              # z-card
│   │   ├── input/             # z-input
│   │   ├── combobox/          # z-combobox
│   │   ├── badge/             # z-badge
│   │   ├── empty/             # z-empty
│   │   ├── sheet/             # z-sheet
│   │   ├── ui/                # zm-pagination, zm-empty-state, …
│   │   └── skeletons/         # zm-skeleton-*
│   ├── componentes/layout/    # shell (sidebar, header, layouts)
│   └── paginas/               # telas (CSS local BEM por feature)
└── docs/DESIGN_SYSTEM.md      # este arquivo
```

---

## 12. Replicar em outro sistema (resumo)

1. **Identidade:** escolher tema default (`theme-ocean-blue` = verde `#16a874`) ou outro da secção 4.
2. **Global:** portar `styles.css` completo; garantir Tailwind 4 + `@custom-variant dark`.
3. **Componentes:** portar `shared/components` e configurar path alias.
4. **Layout:** reimplementar shell (sidebar 15rem, header 3.5rem) ou reutilizar `componentes/layout`.
5. **Listagens:** copiar template de Pessoas como blueprint.
6. **Seções:** copiar padrão `section-card` de Configurações da clínica ou Billing.
7. **Validar:** contraste primário sobre branco em cada tema; dark mode com `.dark`; nenhuma sombra indesejada.

**Pacote mínimo:** ver `docs/DESIGN_SYSTEM_PORTABLE.md`.

**Showcase local:** com `ng serve`, abrir [`/dev/ui`](http://localhost:4200/dev/ui) — rota bloqueada em produção via `devGuard`.

---

## 13. Roadmap (melhorias internas)

1. ~~Página `/dev/ui` com exemplos vivos~~ (implementada).
2. Extrair `zm-filter-drawer` reutilizável (hoje cada listagem monta o sheet).
3. Migrar telas restantes de `table.data-table` / `platform-table` para `z-table`.
4. Consolidar `.billing-section-card` com estilos globais de `.section-card`.
5. Dividir `styles.css` em módulos importados (tokens, forms, tables, layout).
6. Testes de contraste automatizados em CI por tema.

---

## 14. Changelog resumido

- Tokens semânticos, espaçamento, raio e tipografia em `:root` / `.dark`.
- Integração Zard UI (botão, tabela, card, input, combobox, sheet, badge, empty).
- Migração de listagens para `z-table` + `.zm-list-toolbar` + `.zm-filter-sheet`.
- Tabela legada `.data-table` mantida para compatibilidade.
- `zm-pagination`, `zm-empty-state`, skeletons por tela.
- Billing alinhado ao padrão section-card + status boxes semânticos.
- Temas de marca `body.theme-*` com ponte `--primary` → `--c-primary`.
- Sombras desativadas globalmente; visual flat com bordas.
- Dashboard: KPIs `--c-kpi-*`, ApexCharts, filtro de período.
- Shell: sidebar/header unificados, preset tinted, breadcrumbs nos layouts.
- Página `/dev/ui` (dev only) + guia `DESIGN_SYSTEM_PORTABLE.md`.

Para dúvidas de implementação: ler `src/styles.css`, abrir `/dev/ui` em dev e comparar com **Pessoas** (listagem), **Billing** (seções) e **Dashboard** (KPIs).
