# 04 — Design System próprio (inspirado no Nord)

**Produto:** Gestgo (SPA Angular)  
**Princípio:** design system **próprio** (tokens Gestgo + componentes Zard/`zm-*`), **inspirado e parcialmente implementado com Nord Health** (web components).

> Fonte de verdade no código: `src/styles.css`, `src/nord-setup.ts`, `src/app/shared/components/`, `src/app/shared/nord/`.  
> Docs complementares: `docs/DESIGN_SYSTEM.md`, `docs/Desgin System/GESTGO_DESIGN_SYSTEM.md`.

---

## 1. Direção visual

Gestgo deve parecer um SaaS B2B **moderno, confiável, técnico e limpo**, com densidade intermediária.

| Princípio | Regra |
|-----------|-------|
| Marca | Verde (`#14B87A`) = ação, seleção, sucesso — não superfícies enormes |
| Superfície | Bordas em vez de sombras (`--shadow-*` = `none`) |
| Tipografia | **Inter** (não Nordhealth Sans) |
| Ícones de produto | Material Symbols Outlined |
| Tema do usuário | Classes `body.theme-*` + `.dark` (sem `prefers-color-scheme`) |
|Tenant accent | Pode tingir CTA/header tintado; **não** repinta cards/tabelas inteiros |

---

## 2. Stack visual

| Pacote / camada | Papel |
|-----------------|-------|
| `@nordhealth/components` + css/themes/icons/fonts | Web components (`nord-button`, `nord-card`, `nord-input`, …) |
| `src/nord-setup.ts` | Registro seletivo (evitar barrel completo) + tradução PT |
| `provideNord()` | Providers Angular + value accessors (`nord-checkbox`, toggle, date/time) |
| Zard UI (local) | `z-button`, `z-table`, `z-card`, `z-input`, `z-sheet`, … |
| Wrappers `zm-*` | Pagination, empty state, skeletons, dashboard wizard |
| Tailwind 4 + CVA | Utilitários e variantes |
| Geist (dep.) | Disponível; tipografia canônica do app é Inter |

---

## 3. Tokens Gestgo (`--c-*`)

### 3.1 Marca

| Token | Valor (tema ocean / padrão) | Uso |
|-------|-----------------------------|-----|
| `--c-primary` | `#14B87A` | CTA, links ativos, focus soft |
| `--c-primary-hover` | `#0E9D68` | Hover |
| `--c-primary-active` | `#087D64` | Active / brand-700 |
| `--c-accent` | `#087D64` | Destaques secundários |
| Brand scale (doc marca) | `#063D36` → `#14B87A` → `#EAF7F2` | Logo / superfícies suaves |

Tema padrão no boot: **`theme-ocean-blue`** (verde Gestgo). Alias legado: `zion-blue` → `gestgo-blue`.

### 3.2 Superfície e texto (claro)

| Token | Exemplo | Uso |
|-------|---------|-----|
| `--c-bg` | `#f4faf7` / `#F8FAF6` | Fundo conteúdo |
| `--c-surface` | `#ffffff` | Cards, tabelas |
| `--c-soft` | `#e6f5ef` | Hover de linha |
| `--c-text` | `#0d1410` / `#17201F` | Texto principal |
| `--c-muted` | `#3d4d46` / `#56635F` | Secundário |
| `--c-border` | `#dde8e3` / `#DDE5E1` | Bordas |

### 3.3 Semânticas (não mudam com tema de marca)

| Token | Claro | Uso |
|-------|-------|-----|
| `--c-success` | `#15803d` | Aprovado, assinado |
| `--c-warning` | `#d97706` | Pendente, expirado |
| `--c-danger` / `--c-error` | `#dc2626` | Erro, reprovado |
| `--c-info` | `#0369a1` | Informativo |

Variantes `*-soft` para fundos de badge.

### 3.4 Escala, raio, tipografia

- Espaçamento base 4px: `--space-1` … `--space-10`
- Raio típico: 6–8px em controles; cards de seção ~`0.875rem`
- Texto: `--text-xs` (11) … `--text-2xl` (24)
- Alturas: botão `--button-height` (~35px); controle `--control-height` (~43px)

### 3.5 Ponte Nord ↔ Gestgo

Em `styles.css`, o accent Nord segue o tema:

```css
--n-color-accent: var(--c-primary);
--n-font-family: "Inter", ui-sans-serif, system-ui, …;
```

Botões Nord usam `--n-button-background-color: var(--c-primary)`.

---

## 4. Temas de marca e shell

### Temas (`body.theme-*`)

`theme-ocean-blue` (padrão), `theme-gestgo-blue`, `theme-indigo-night`, `theme-emerald-fresh`, `theme-rose-elegant`, `theme-amber-warm`, `theme-violet-dream`, `theme-teal-ocean`, `theme-slate-pro`, `theme-cyan-tech`, `theme-fuchsia-bold`.

Persistência: `localStorage` (`gestgo_theme`, `gestgo_dark_mode`, `gestgo_shell_preset`, …) aplicado no boot do `index.html`.

### Shell

| Preset | Comportamento |
|--------|---------------|
| `default` | Header/sidebar neutros |
| `shell-preset-tinted` | Header com fundo `--c-primary`; sidebar neutra |

Sidebar: largura `--sidebar-w` (~15rem); item ativo com Material Symbol `FILL` 1.

---

## 5. Dark mode

Classe `.dark` no `body`/`html`. Superfícies **neutras** (grafite), não verde-escuro:

| Token | Valor típico |
|-------|--------------|
| background | `#0D0D0D` |
| sidebar | `#111111` |
| surface | `#171717`–`#262626` |
| text | `#F2F2F2` |
| border | `#303030` |

---

## 6. Componentes — o que usar

### Preferência atual

| Necessidade | Preferir |
|-------------|----------|
| Controles Nord em fluxos migrados | `nord-button`, `nord-input`, `nord-card`, `nord-checkbox`, `nord-date-picker`, … |
| Listagens / padrões Zard | `z-button`, `z-table`, `z-card`, `z-badge`, `z-combobox`, `z-sheet` |
| Produto Gestgo | `zm-pagination`, `zm-empty-state`, skeletons `zm-skeleton-*` |
| Ícones UI | Material Symbols (`text-base` / `text-sm`) |

### Padrões de layout

1. **Tabela:** `z-card.zm-table-card` + `table[z-table]` compacta + `.zm-row-clickable`
2. **Seção de config:** `section-card` + `section-header` (ícone + título uppercase) + `section-body`
3. **Filtros:** sheet `z-sheet` + labels `.zm-filter-label`
4. **Estados vazios:** `z-empty` / `zm-empty-state` com `role="status"`
5. **Toasts:** ngx-sonner / toast Gestgo

### Legado (evitar em código novo)

`.btn-primary`, `table.data-table`, `zm-searchable-select` (deprecated), hardcode de hex em CSS de página.

---

## 7. Formulário público e link-bio

- Formulário público: tipografia Inter; campos alinhados ao DS; assinatura em canvas; gate de identidade com hierarquia clara (sem cards decorativos).
- Link-bio: layouts por modelo (`link_bio_model`), incluindo variante veterinária; accent da organização via tokens tenant (`accent_hex` / tema público).

---

## 8. Acessibilidade

- Contraste WCAG AA nos temas claros
- Foco visível: `--c-focus` / `--ring`
- Labels em filtros; estados vazios anunciáveis
- Não depender só de cor para status (badge + texto)

---

## 9. Checklist para novas telas

1. Usar tokens `--c-*` / `--primary` — nunca hex solto
2. Preferir Nord ou Zard conforme o módulo já migrado
3. Sem sombra; borda + surface
4. Inter + Material Symbols
5. Respeitar alturas de botão/controle
6. Dark mode: testar com `.dark`
7. Tema ocean-blue e um tema quente (ex.: rose) como sanity check
8. Não alterar regras de negócio ao “embelezar”

---

## 10. Arquivos-chave

| Arquivo | Conteúdo |
|---------|----------|
| `src/styles.css` | Tokens, temas, ponte Nord, utilitários shell |
| `src/nord-setup.ts` | Imports Nord |
| `src/app/shared/nord/` | Accessors + `provideNord` |
| `src/app/shared/components/` | Zard |
| `src/app/shared/components/ui/` | Wrappers `zm-*` |
| `src/app/componentes/layout/shell-nord.css` | Ajustes shell Nord |
| `src/index.html` | Fontes Inter + Material Symbols + boot de tema |

---

## 11. Relação com a documentação anterior

Este entregável **consolida** o estado atual (Nord + tokens Gestgo + Zard).  
Para detalhe expandido de componentes Zard e listagens, ver `docs/DESIGN_SYSTEM.md`.  
Para a especificação de marca (brand scale / dark tokens), ver `docs/Desgin System/GESTGO_DESIGN_SYSTEM.md`.
