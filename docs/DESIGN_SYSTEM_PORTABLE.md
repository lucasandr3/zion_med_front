# Pacote mínimo — replicar o design Gestgo

Lista objetiva do que copiar para outro projeto Angular manter a mesma consistência visual. Detalhes de uso em `DESIGN_SYSTEM.md`; exemplos vivos em `/dev/ui` (somente dev).

---

## 1. Arquivos obrigatórios

| Arquivo / pasta | Motivo |
|-----------------|--------|
| `src/styles.css` | Tokens `:root` / `.dark`, temas `body.theme-*`, utilitários globais (botões, tabelas, toolbar, section-card, shell) |
| `src/index.html` | Roboto + Material Symbols Outlined |
| `src/app/shared/components/` | Zard UI (button, card, table, input, badge, combobox, sheet, skeleton, empty, dialog, toast…) |
| `src/app/shared/utils/merge-classes.ts` | Utilitário dos componentes Zard |
| `src/app/shared/core/` | Diretivas base (`zardId`, string template outlet) |
| `src/app/core/services/user-appearance.sync.ts` | Aplicação de tema, dark mode e shell preset no `body` |
| `tsconfig` path `@/*` → `src/app/*` | Imports dos componentes |

---

## 2. Dependências npm

```json
{
  "@angular/cdk": "^20",
  "@ng-icons/core": "^32",
  "@ng-icons/lucide": "^32",
  "@tailwindcss/postcss": "^4",
  "class-variance-authority": "^0.7",
  "clsx": "^2",
  "tailwind-merge": "^3",
  "tailwindcss": "^4",
  "tailwindcss-animate": "^1"
}
```

Opcional conforme features: `flatpickr`, `angularx-flatpickr`, `ngx-sonner`, `apexcharts`, `ng-apexcharts`.

---

## 3. Configuração Tailwind / PostCSS

- `angular.json` → `"styles": ["src/styles.css"]`
- PostCSS com `@tailwindcss/postcss`
- Em `styles.css`: `@import 'tailwindcss'`, `@custom-variant dark (&:where(.dark, .dark *))`

---

## 4. Boot do tema (index ou `main.ts`)

No carregamento da app, antes do primeiro render:

```typescript
import { applyUserAppearanceToBrowser } from './app/core/services/user-appearance.sync';

// Exemplo: tema verde padrão, modo claro
applyUserAppearanceToBrowser({
  ui_theme: 'ocean-blue',
  ui_dark_mode: false,
  ui_shell_preset: 'default',
});
```

Classes esperadas no `<body>`:

- `theme-ocean-blue` (ou outro tema)
- `dark` (opcional)
- `shell-preset-tinted` / `shell-preset-sidebar-dark` (opcional)

---

## 5. Layout shell (opcional mas recomendado)

Para o app autenticado com sidebar + header:

| Pasta | Conteúdo |
|-------|----------|
| `src/app/componentes/layout/layout-app/` | Shell tenant |
| `src/app/componentes/layout/barra-lateral/` | Sidebar |
| `src/app/componentes/layout/cabecalho/` | Header |

Tokens de shell: `--shell-header-height`, `--sidebar-w`, `--gestgo-brand-*`.

---

## 6. Wrappers Gestgo (opcional)

| Pasta | Componentes |
|-------|-------------|
| `src/app/shared/components/ui/` | `zm-pagination`, `zm-empty-state`, `zm-page-back-link` |
| `src/app/shared/components/skeletons/` | `zm-skeleton-list` e variantes por tela |

---

## 7. Templates de referência (copiar padrão, não obrigatório portar)

| Padrão | Arquivo |
|--------|---------|
| Listagem + toolbar + filtros | `src/app/paginas/pessoas/pessoas-listagem.component.html` |
| Section card | `src/app/paginas/clinica/clinica-configuracoes.component.html` |
| Billing / status boxes | `src/app/paginas/billing/billing.component.html` + `.css` |
| Dashboard KPI | `src/app/paginas/dashboard/dashboard.component.css` |

---

## 8. Checklist pós-cópia

- [ ] `ng build` sem erros de import `@/`
- [ ] Tema aplicado no `body` (primária visível em botões)
- [ ] Dark mode com classe `.dark` (não media query)
- [ ] Botões com altura 35px; inputs 43px
- [ ] Cards sem `box-shadow` indesejado
- [ ] Ícones Material Symbols carregando
- [ ] Abrir `/dev/ui` em dev e comparar com o projeto origem

---

## 9. O que **não** copiar para outro produto

- `src/app/paginas/formulario-publico/` — tokens `--fp-*` e branding por cliente
- Páginas de domínio (protocolos, templates, plataforma…) — só como referência de padrão
- Assets de marketing / landing (`comece`, logos específicos) — substituir pela marca do novo produto
