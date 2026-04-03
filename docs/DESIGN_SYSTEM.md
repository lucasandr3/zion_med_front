# Design System — Gestgo (front-end Angular)

Documento de referência para evolução visual e consistência entre telas. O código-fonte da verdade continua sendo `src/styles.css` (tokens globais) e os componentes em `src/app/shared/components/ui/`.

---

## 1. Princípios

- **Tokens primeiro:** preferir `var(--c-*)`, `var(--space-*)`, `var(--radius-*)`, `var(--shadow-*)`, `var(--text-*)` em vez de cores ou tamanhos soltos.
- **Semântica de cor:** estado de negócio (sucesso, alerta, erro) usa `--c-success`, `--c-warning`, `--c-danger` (e variantes `*-soft` quando precisar de fundo).
- **Marca vs. semântica:** `--c-primary` / temas (`.theme-*`) são da marca; semânticas não mudam com o tema de cor escolhido pelo usuário.
- **Tabelas de listagem:** usar `table.data-table` dentro de `.data-table-wrap` (ver secção 4).
- **Acessibilidade:** manter contraste em claro e escuro; foco visível com `--c-focus` nos inputs globais.

---

## 2. Tokens CSS (`:root` / `.dark`)

### 2.1 Superfície e texto (já existentes)

| Token | Uso |
|--------|-----|
| `--c-bg` | Fundo da aplicação |
| `--c-surface` | Cards, painéis |
| `--c-elevated` | Dropdowns, drawers |
| `--c-soft` | Hover de linhas, fundos secundários |
| `--c-text` | Texto principal |
| `--c-muted` | Texto secundário, labels de tabela |
| `--c-border` | Bordas |
| `--c-primary` / `--c-accent` | Marca, links primários, botão principal |
| `--c-focus` | Anel de foco |

### 2.2 Semânticas (novos)

| Token | Claro (ex.) | Uso |
|--------|-------------|-----|
| `--c-success` | Verde | Aprovado, ativo, assinado |
| `--c-success-soft` | Mix translúcido | Fundos de badge/chip |
| `--c-warning` | Âmbar | Pendente, expirado |
| `--c-warning-soft` | Mix | Fundos |
| `--c-danger` / `--c-error` | Vermelho | Erro, reprovado, cancelar |
| `--c-danger-soft` | Mix | Fundos de alerta leve |
| `--c-info` | Azul info | Mensagens informativas |

### 2.3 KPI / dashboard

| Token | Uso |
|--------|-----|
| `--c-kpi-accent` | Destaque de métricas, links “ver todos”, badges teal do dashboard |
| `--c-kpi-accent-soft` / `--c-kpi-accent-text` | Fundo e texto do mesmo grupo |

### 2.4 Escala de espaçamento (`--space-*`)

Base 4px: `--space-1` (4px) … `--space-10` (40px). Preferir para padding/margin novos em CSS; em templates Tailwind pode coexistir.

### 2.5 Raio (`--radius-*`)

`--radius-sm` … `--radius-2xl` — botões, cards, inputs.

### 2.6 Sombra (`--shadow-*`)

`--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-drawer`.

### 2.7 Tipografia (`--text-*`)

`--text-xs` … `--text-2xl`, `--leading-tight`, `--tracking-wide` (headers de tabela).

---

## 3. Componentes globais de UI

### 3.1 Botões (classes em `styles.css`)

- `btn-primary` — ação principal; estados `:disabled` definidos.
- `btn-ghost` / `btn-default-bg` — secundário.
- `btn-danger` — ação destrutiva confirmada.

### 3.2 Formulários

- `form-input`, `form-select`, `form-label`, checkboxes/radios globais.
- Busca com ícone: wrapper `.form-search-wrap` + ícone `.form-search-icon` + input com `.form-input.form-search-input`.

### 3.3 Tabela de dados

- Container: `.data-table-wrap` (borda, raio, fundo surface).
- Tabela: `table.data-table` — cabeçalho uppercase muted, hover em linhas.

### 3.4 Layout shell

- Sidebar: item ativo `.nav-link.active` / `.ativo` — barra esquerda + ícone preenchido (`FILL` 1); em `body.sidebar-collapsed` a barra lateral do item ativo é omitida (`box-shadow: none`).
- Header: breadcrumbs opcionais via `[breadcrumbs]` no `app-cabecalho` (montados nos layouts app/plataforma). Sair apenas pelo menu do usuário na sidebar (sem botão duplicado no header).

### 3.5 Drawer de filtros

- Classe `.filter-drawer` — animação `zm-drawer-slide-in`.

---

## 4. Componentes Angular compartilhados

Local: `src/app/shared/components/ui/`

| Selector | Props principais | Uso |
|-----------|------------------|-----|
| `zm-pagination` | `[currentPage]`, `[lastPage]`, `(pageChange)` | Rodapé de listagens paginadas (números + anterior/próxima) |
| `zm-empty-state` | `[icon]`, `[title]`, `[description?]`, `[actionLabel?]`, `[actionLink?]` | Lista vazia com CTA opcional |

Export: `import { … } from '../../shared/components/ui';`

---

## 5. Padrões de página de listagem

1. Cabeçalho: `page-header` + `page-title` / ícone quando fizer sentido.
2. Filtros: busca com `.form-search-wrap` + `.form-input`.
3. Conteúdo: `.data-table-wrap` → se vazio `zm-empty-state`, senão `table.data-table` + `zm-pagination` se `last_page > 1`.
4. Drawer de filtros: selects com `form-select`, datas com `form-input`.

**Telas já alinhadas a este padrão (referência):** Pessoas, Protocolos, Templates, Envios, Usuários.

---

## 6. Próximas melhorias sugeridas

1. **Extrair drawer de filtros** para um componente `zm-filter-drawer` (título, slots de conteúdo, footer com Limpar/Aplicar).
2. **Migrar** `organizacao-papeis-listagem`, telas da plataforma (`platform-table`) e `campos-table-card` para o mesmo padrão visual da `data-table` onde não houver regra de negócio específica.
3. **Storybook** ou página interna “/dev/ui” com exemplos de tokens e componentes (opcional).
4. **Dividir** `styles.css` em módulos importados (tokens, base, forms, tables, layout) para manutenção — sem mudar comportamento.
5. **Testes visuais / a11y:** contraste automático em CI para `--c-primary` sobre `--c-surface` em cada tema.

---

## 7. Alterações recentes (changelog resumido)

- Tokens semânticos, espaçamento, raio, sombra e tipografia em `:root` / `.dark`.
- Tabela unificada `.data-table` / `.data-table-wrap`.
- `zm-pagination`, `zm-empty-state`.
- Breadcrumbs nos layouts tenant e plataforma.
- Dashboard: saudação com nome do usuário e barras de status com cores semânticas; KPIs com `--c-kpi-*`.
- Botões primário/secundário com `:disabled`; novo `btn-danger`.
- Navegação lateral com destaque mais claro no item ativo.

Para dúvidas de implementação, priorizar leitura de `src/styles.css` e dos templates das listagens citadas na secção 5.
