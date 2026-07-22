# Design system Gestgo (`components/ds/lib`)

**Import:** módulo `NgxDsModule` / barrel `projects/up/src/app/components/ds/public-api.ts` (`ShareModule` reexporta o DS).

**Prefixo de seletores:** `upx-*` (ex.: `upx-input`, `upx-select`).

## Formulários e entrada

| Componente | Seletor | Caminho | Notas |
|------------|---------|---------|--------|
| Input | `upx-input` | `ds/lib/input/` | Suporta máscaras (money, CPF, CEP, NCM, etc.) via inputs do component |
| Select | `upx-select` | `ds/lib/select/` | Tipos: `native`, `material`, `funciona`, `multiempresa` |
| Input + select combinado | `upx-input-select` | `ds/lib/input-select/` | Autocomplete / combo |
| Tree select | `upx-tree-select` | `ds/lib/tree-select/` | Hierarquia (planos, categorias) |
| Checkbox | `upx-checkbox`, `upx-checkbox-group` | `ds/lib/checkbox/` | |
| Radio | `upx-radio` | `ds/lib/radio/` | |
| Toggle | `upx-toggle` | `ds/lib/toggle/` | |
| Label / Legend | `upx-label`, `upx-legend` | `ds/lib/label/`, `legend/` | |
| Datepicker | `upx-datepicker` | `ds/lib/custom-datepicker/` | |
| Mês/ano | `upx-month-year` | `ds/lib/month-year/` | |
| Editor rich text | `upx-editor` | `ds/lib/editor/` | |
| Form layout | `upx-form-page`, `upx-form-grid`, `upx-form-field` | `ds/lib/form/` | Grid de formulário |

## Tabelas e listagens

| Componente | Seletor | Caminho | Notas |
|------------|---------|---------|--------|
| Table (layout) | `upx-table`, `upx-table-header`, `upx-table-body`, `upx-table-row`, `upx-table-col` | `ds/lib/table/` | Composição por projeção (`ng-content`) |
| Table Material | `upx-table-mat` | `ds/lib/table-mat/` | Variante Material |
| **Data list** | `upx-data-list` | `ds/lib/data-list/` | **Lista principal do ERP** — integra colunas, ações, seleção |
| Busca de lista | `upx-data-list-search` | `ds/lib/data-list-search/` | Filtros da listagem |

Para **nova listagem de entidade** com backend `list` / `new-list`: avaliar `upx-data-list` + `DataListService` antes de tabela custom.

## Layout, navegação, feedback

| Componente | Seletor | Caminho |
|------------|---------|---------|
| Page | `upx-page` | `ds/lib/page/` |
| Card | `upx-card` | `ds/lib/card/` |
| Toolbar | `upx-toolbar` | `ds/lib/toolbar/` |
| Sidenav | `upx-sidenav`, header/body/footer/filters | `ds/lib/sidenav*/` |
| Drawer | `upx-drawer` | `ds/lib/drawer/` |
| Tabs | `upx-tab-group`, `[upxTab]` | `ds/lib/tab/`, `tabs/` |
| Expansion | `upx-expansion`, `upx-expansion-panel` | `ds/lib/expansion/` |
| Modal | `upx-modal`, heading/content/footer | `ds/lib/modal/` |
| Confirm | `upx-confirm` | `ds/lib/confirm/` |
| Toast | via `ToastService` | `ds/lib/toast/` |
| Alert | `upx-alert` | `ds/lib/alert/` |
| Loading | `upx-loading` | `ds/lib/loading/` |
| Badge / Avatar / Icon | `upx-badge`, `upx-avatar`, `upx-icon` | respectivos |
| Dropdown | `upx-dropdown` | `ds/lib/dropdown/` |
| Notification | `upx-notification` | `ds/lib/notification/` |
| Button | `upx-button` | `ds/lib/button/` |

## Serviços do DS (injetar, não recriar)

| Serviço | Arquivo | Uso |
|---------|---------|-----|
| `ModalService` | `ds/lib/services/modal.service.ts` | `MatDialog` + confirmações |
| `ToastService` | `ds/lib/toast/toast.service.ts` | Mensagens de sucesso/erro |
| `ScreenService` | `ds/lib/services/screen.service.ts` | Breakpoints / mobile |

Padrão de modais de feature: muitas telas usam `*-modal-component.ts` abertos via `ModalService` — copiar o padrão da pasta do domínio (ex. `financas/processos/`).

## Exemplo mínimo (formulário)

```html
<upx-form-field>
  <upx-label>Nome</upx-label>
  <upx-input [formControl]="nomeCtrl"></upx-input>
</upx-form-field>

<upx-select [formControl]="tipoCtrl" type="material" [options]="opcoes"></upx-select>
```

Consultar HTML de telas vizinhas no mesmo módulo (`pages/painel/<dominio>/`) antes de inventar estrutura.

## Criar novo componente no DS

Só quando for **reutilizável em 2+ domínios** e não der para estender inputs/outputs dos existentes.

- Pasta: `ds/lib/<nome-kebab>/`
- Exportar em `public-api.ts` e registrar no `ngx-ds.module.ts` se necessário
- Seguir `angular-project-standards.mdc` (standalone quando o vizinho já for)
- **Evitar** injetar `VixFinService` / services de domínio dentro do DS (exceção legada: `data-list` — não replicar)
