/**
 * Bootstrap Nord Design System — alinhado ao pesquisa_app.
 *
 * NÃO usar `import '@nordhealth/components'` (barrel): o Angular/esbuild pode
 * tree-shakar e deixar `:not(:defined){visibility:hidden}` escondendo a UI.
 *
 * @see C:/Users/virtu/Downloads/teste/pesquisa/pesquisa_app/src/nord.ts
 * @see https://nordhealth.design/docs/developer/web-components
 */

/* Em uso hoje no Gestgo */
import '@nordhealth/components/lib/Banner.js';
import '@nordhealth/components/lib/Button.js';
import '@nordhealth/components/lib/Card.js';
import '@nordhealth/components/lib/CardBody.js';
import '@nordhealth/components/lib/CardHeader.js';
import '@nordhealth/components/lib/Checkbox.js';
import '@nordhealth/components/lib/Input.js';
import '@nordhealth/components/lib/Stack.js';
import '@nordhealth/components/lib/Toggle.js';

/* Próximos (mesmo set do pesquisa_app — modal, toast, tabs, shell, etc.) */
import '@nordhealth/components/lib/Avatar.js';
import '@nordhealth/components/lib/Badge.js';
import '@nordhealth/components/lib/ButtonGroup.js';
import '@nordhealth/components/lib/Combobox.js';
import '@nordhealth/components/lib/ComboboxOption.js';
import '@nordhealth/components/lib/CommandMenu.js';
import '@nordhealth/components/lib/CommandMenuAction.js';
import '@nordhealth/components/lib/DatePicker.js';
import '@nordhealth/components/lib/TimePicker.js';
import { registerTranslation } from '@nordhealth/components/lib/translation.js';
import '@nordhealth/components/lib/Divider.js';

/**
 * Sem tradução pt-BR o Nord cai no en-US e o calendário (meses/dias) fica em inglês,
 * mesmo com <html lang="pt-BR"> — o Intl usa `resolvedLang` da tradução registrada.
 */
registerTranslation({
  $lang: 'pt-BR',
  $name: 'Português (Brasil)',
  $dir: 'ltr',
  'nord-calendar': {
    prevMonthLabel: 'Mês anterior',
    nextMonthLabel: 'Próximo mês',
    monthSelectLabel: 'Mês',
    yearSelectLabel: 'Ano',
    weekLabel: 'Semana',
  },
  'nord-date-picker': {
    modalHeading: 'Escolher data',
    closeLabel: 'Fechar',
    buttonLabel: 'Escolher data',
    selectedDateMessage: 'Data selecionada',
    dateOutOfMinBound: (minDate: string) => `A data deve ser em ${minDate} ou depois`,
    dateOutOfMaxBound: (maxDate: string) => `A data deve ser em ${maxDate} ou antes`,
  },
  'nord-date-range-picker': {
    buttonLabel: 'Escolher período',
    placeholder: 'Escolher período',
    modalHeading: 'Escolher período',
    closeLabel: 'Fechar',
    applyLabel: 'Aplicar',
    cancelLabel: 'Cancelar',
    clearLabel: 'Limpar',
    presetsLabel: 'Atalhos de período',
    presetsCollapsedLabel: 'Escolher atalho',
    rangeSeparator: '–',
    dateOutOfMinBound: (minDate: string) => `A data deve ser em ${minDate} ou depois`,
    dateOutOfMaxBound: (maxDate: string) => `A data deve ser em ${maxDate} ou antes`,
    presetToday: 'Hoje',
    presetYesterday: 'Ontem',
    presetLastDays: (n: number) => `Últimos ${n} dias`,
    presetLastMonths: (n: number) => `Últimos ${n} meses`,
    presetThisMonth: 'Este mês',
    presetLastWeek: 'Semana passada',
    presetLastMonth: 'Mês passado',
    presetLastQuarter: 'Trimestre passado',
    presetLastYear: 'Ano passado',
    presetCurrentWeek: 'Semana atual',
    presetCurrentMonth: 'Mês atual',
    presetCurrentQuarter: 'Trimestre atual',
    presetCurrentYear: 'Ano atual',
    presetQuarter: (q: number, year: number) => `T${q} ${year}`,
  },
  'nord-time-picker': {
    chooseTime: 'Escolher horário',
  },
});

import '@nordhealth/components/lib/Dropdown.js';
import '@nordhealth/components/lib/DropdownGroup.js';
import '@nordhealth/components/lib/DropdownItem.js';
import '@nordhealth/components/lib/EmptyState.js';
import '@nordhealth/components/lib/Field.js';
import '@nordhealth/components/lib/FieldDescription.js';
import '@nordhealth/components/lib/FieldError.js';
import '@nordhealth/components/lib/FieldLabel.js';
import '@nordhealth/components/lib/Header.js';
import NordIcon from '@nordhealth/components/lib/Icon.js';
import '@nordhealth/components/lib/Item.js';
import nordicons from '@nordhealth/icons/lib/nordicons.js';

/** Registra Nordicons localmente (evita fetch no CDN e ícones vazios offline). */
for (const icon of Object.values(nordicons as Record<string, { title: string; svg: string }>)) {
  if (icon?.title && icon?.svg) {
    NordIcon.registerIcon(icon.title, icon.svg);
  }
}
import '@nordhealth/components/lib/ItemActions.js';
import '@nordhealth/components/lib/ItemContent.js';
import '@nordhealth/components/lib/ItemDescription.js';
import '@nordhealth/components/lib/ItemGroup.js';
import '@nordhealth/components/lib/ItemMedia.js';
import '@nordhealth/components/lib/ItemTitle.js';
import '@nordhealth/components/lib/Layout.js';
import '@nordhealth/components/lib/Modal.js';
import '@nordhealth/components/lib/NavGroup.js';
import '@nordhealth/components/lib/NavItem.js';
import '@nordhealth/components/lib/NavToggle.js';
import '@nordhealth/components/lib/Navigation.js';
import '@nordhealth/components/lib/Progress.js';
import '@nordhealth/components/lib/ProgressBar.js';
import '@nordhealth/components/lib/Select.js';
import '@nordhealth/components/lib/Skeleton.js';
import '@nordhealth/components/lib/Tab.js';
import '@nordhealth/components/lib/TabGroup.js';
import '@nordhealth/components/lib/TabPanel.js';
import '@nordhealth/components/lib/Textarea.js';
import '@nordhealth/components/lib/Toast.js';
import '@nordhealth/components/lib/ToastGroup.js';
import '@nordhealth/components/lib/Tooltip.js';
import '@nordhealth/components/lib/TopBar.js';

/*
 * Shell Nord: alinha a altura do header/top-bar com `--shell-header-height`
 * do Gestgo e deixa o scroll só no conteúdo. Precisa entrar no shadow DOM
 * porque o Nord resolve esses tamanhos em variáveis privadas (`--_n-*`).
 *
 * @see C:/Users/virtu/Downloads/teste/pesquisa/pesquisa_app/src/nord.ts
 */
/*
 * Shadow CSS do shell — espelha pesquisa_app/src/nord.ts
 * (altura do header, scroll do conteúdo, tokens de nav/top-bar).
 * Presets Gestgo: body.shell-preset-tinted | body.shell-preset-sidebar-dark
 */
const NORD_SHELL_HEADER_CSS = `
:host {
  --_n-layout-header-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  --_n-layout-header-size-s: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  --_n-header-block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  --_n-header-padding-block: 0 !important;
  --n-size-top-bar: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  --n-navigation-header-block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  --_n-navigation-header-block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
}
:host(nord-layout) {
  display: block !important;
  block-size: 100dvh !important;
  max-block-size: 100dvh !important;
  overflow: hidden !important;
  --_n-layout-padding: 0 !important;
  --n-layout-padding: 0 !important;
  --n-size-top-bar: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  --n-navigation-header-block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
}
:host(nord-navigation) {
  --n-navigation-header-block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  --_n-navigation-header-block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
}
:host(nord-navigation) slot[name='header'] {
  box-sizing: border-box !important;
  block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  min-block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  max-block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
}
:host(nord-top-bar) {
  box-sizing: border-box !important;
  --n-size-top-bar: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  min-block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  max-block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  background: var(--shell-header-bg, var(--n-color-header, #fff)) !important;
  color: var(--shell-header-fg, var(--n-color-text)) !important;
}
.n-header {
  box-sizing: border-box !important;
  block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  min-block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  max-block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  padding-block: 0 !important;
}
.n-top-bar-container,
.n-has-top-bar {
  --_n-sticky-top: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  --_n-sticky-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
}
.n-top-bar-container,
slot[name='top-bar'],
slot[name='header'] {
  box-sizing: border-box !important;
  block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  min-block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  max-block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
}
.n-layout {
  block-size: 100% !important;
  max-block-size: 100% !important;
  overflow: hidden !important;
}
.n-has-top-bar .n-layout-main {
  inset-block-start: 0 !important;
  padding-block-start: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
  box-sizing: border-box !important;
  block-size: 100dvh !important;
  max-block-size: 100dvh !important;
  min-block-size: 0 !important;
  overflow: hidden !important;
  display: flex !important;
  flex-direction: column !important;
}
.n-layout-content {
  display: flex !important;
  flex: 1 1 auto !important;
  flex-direction: column !important;
  min-block-size: 0 !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  overscroll-behavior-y: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--n-color-border-strong) transparent;
}
/* Slot default (gestgo-shell__content) preenche a altura útil do layout */
.n-layout-content > ::slotted(*) {
  box-sizing: border-box !important;
  display: flex !important;
  flex: 1 1 auto !important;
  flex-direction: column !important;
  min-block-size: 100% !important;
  width: 100% !important;
}
.n-layout-content main {
  padding: 0 !important;
  display: flex !important;
  flex: 1 1 auto !important;
  flex-direction: column !important;
  min-block-size: 100% !important;
  box-sizing: border-box !important;
}
.n-layout-content main > ::slotted(router-outlet) {
  display: none !important;
  flex: none !important;
  block-size: 0 !important;
  min-block-size: 0 !important;
  overflow: hidden !important;
}
.n-layout-content main > ::slotted(:not(router-outlet)) {
  flex: 1 1 auto !important;
  min-block-size: 0 !important;
  width: 100% !important;
}
.n-layout-content::-webkit-scrollbar {
  inline-size: 8px;
  block-size: 8px;
}
.n-layout-content::-webkit-scrollbar-track,
.n-layout-content::-webkit-scrollbar-corner {
  background: transparent;
}
.n-layout-content::-webkit-scrollbar-thumb {
  background-color: var(--n-color-border-strong);
  border-radius: var(--n-border-radius-pill, 999px);
  border: 2px solid transparent;
  background-clip: content-box;
}
.n-layout-content::-webkit-scrollbar-thumb:hover {
  background-color: var(--n-color-border-hover);
  background-clip: content-box;
  border: 2px solid transparent;
}
/* Nav header/surface — padrão (não branded) */
:host-context(body:not(.shell-preset-tinted)) .n-has-top-bar[data-screen='wide'][data-nav='opened'] .n-layout-nav,
:host-context(body:not(.shell-preset-tinted)) .n-layout-nav {
  --n-navigation-header-background: var(--shell-header-bg, var(--n-color-header)) !important;
  --n-navigation-header-color: var(--shell-header-fg, var(--n-color-text)) !important;
  --n-navigation-header-toggle-icon-color: var(--shell-header-control, var(--n-color-icon)) !important;
  --n-navigation-header-divider: 1px solid var(--shell-header-border, var(--n-color-border)) !important;
  --n-navigation-header-focus-style: none !important;
  background: var(--shell-sidebar-bg, var(--n-color-nav-surface, var(--n-color-header))) !important;
  border-color: var(--n-color-border) !important;
  border-image: none !important;
}
/* Menu escuro — pesquisa dark-sidebar (nav tokens claros) */
:host-context(body.shell-preset-sidebar-dark) .n-has-top-bar[data-screen='wide'][data-nav='opened'] .n-layout-nav,
:host-context(body.shell-preset-sidebar-dark) .n-layout-nav {
  --n-navigation-header-background: var(--shell-sidebar-bg, var(--shell-nav-bg)) !important;
  --n-navigation-header-color: var(--shell-nav-fg, #eceef1) !important;
  --n-navigation-header-toggle-icon-color: var(--shell-nav-muted, rgb(255 255 255 / 0.8)) !important;
  --n-navigation-header-divider: 1px solid rgb(255 255 255 / 0.08) !important;
  background: var(--shell-sidebar-bg, var(--shell-nav-bg)) !important;
  border-color: rgb(255 255 255 / 0.1) !important;
  border-image: none !important;
  --n-color-text: var(--shell-nav-fg, #eceef1);
  --n-color-text-weak: var(--shell-nav-item, rgb(255 255 255 / 0.88));
  --n-color-text-weaker: var(--shell-nav-muted, rgb(255 255 255 / 0.8));
  --n-color-nav-heading: var(--shell-nav-muted, rgb(255 255 255 / 0.8));
  --n-color-icon: var(--shell-nav-item, rgb(255 255 255 / 0.88));
  --n-nav-item-color: var(--shell-nav-item, rgb(255 255 255 / 0.88));
}
/* Topo e marca — faixa da marca sempre na cor do tema (aberta ou rail fechada) */
:host-context(body.shell-preset-tinted) .n-layout-nav,
:host-context(body.shell-preset-tinted) .n-has-top-bar .n-layout-nav {
  --n-navigation-header-background: var(--n-color-accent, var(--c-primary)) !important;
  --n-navigation-header-color: var(--n-color-text-on-accent, #fff) !important;
  --n-navigation-header-toggle-icon-color: #ffffffd9 !important;
  --n-navigation-header-divider: none !important;
}
:host-context(body.shell-preset-tinted):host(nord-navigation) {
  --n-navigation-header-background: var(--n-color-accent, var(--c-primary)) !important;
  --n-navigation-header-color: var(--n-color-text-on-accent, #fff) !important;
  --n-navigation-header-toggle-icon-color: #ffffffd9 !important;
  --n-navigation-header-divider: none !important;
}
.n-navigation-main {
  scrollbar-width: thin;
  scrollbar-color: var(--n-color-border-strong) transparent;
}
.n-navigation-main::-webkit-scrollbar {
  inline-size: 8px;
  block-size: 8px;
}
.n-navigation-main::-webkit-scrollbar-thumb {
  background-color: var(--n-color-border-strong);
  border-radius: var(--n-border-radius-pill, 999px);
  border: 2px solid transparent;
  background-clip: content-box;
}
.n-navigation-main::-webkit-scrollbar-thumb:hover {
  background-color: var(--n-color-border-hover);
  background-clip: content-box;
  border: 2px solid transparent;
}
.n-navigation-main::-webkit-scrollbar-track,
.n-navigation-main::-webkit-scrollbar-corner {
  background: transparent;
}
`;

const SHELL_SHADOW_TAGS = new Set(['nord-layout', 'nord-header', 'nord-navigation', 'nord-top-bar']);

/*
 * Item ativo: texto/ícone na cor do tema + fundo suave (não bloco sólido).
 * Remove também o anel duplo no foco do ativo.
 */
const NORD_NAV_ITEM_CSS = `
:host {
  /* Sem !important nas vars — shell-nord.css / dark / sidebar-dark sobrescrevem */
  --n-nav-item-color-active: color-mix(
    in srgb,
    var(--n-color-accent) 72%,
    #000 28%
  );
  --n-nav-item-background-active: color-mix(
    in srgb,
    var(--n-color-accent) 14%,
    transparent
  );
}
.n-nav-item:not(.n-rail-item) {
  block-size: 37px;
  min-block-size: 37px;
  max-block-size: 37px;
  box-sizing: border-box;
  padding-inline: var(--n-nav-item-padding-inline, 0.75rem) !important;
}
.n-nav-badge {
  padding-inline: var(--n-nav-badge-padding-inline, 0.5rem) !important;
}
:host([active]) .n-nav-item {
  background: var(--n-nav-item-background-active) !important;
  color: var(--n-nav-item-color-active) !important;
  font-weight: var(--n-font-weight-active, 600);
}
:host([active]) .n-nav-item:hover {
  background: var(--n-nav-item-background-active) !important;
  color: var(--n-nav-item-color-active) !important;
  filter: brightness(1.06);
}
:host([active]) nord-icon,
:host([active]) .n-nav-icon,
:host([active]) .material-symbols-outlined {
  color: var(--n-nav-item-color-active) !important;
}
:host([active]) .n-nav-item:focus,
:host([active]) .n-nav-item:focus-visible {
  --_n-nav-item-box-shadow: none !important;
  box-shadow: none !important;
}
`;

/*
 * Account menu — estilos no shadow do nord-dropdown (header + slotted group/item).
 * Espelha o CSS nativo Nord com contraste garantido (raised ≠ surface).
 */
const NORD_ACCOUNT_MENU_DROPDOWN_CSS = `
.n-dropdown-header {
  background-color: var(--n-color-surface-raised, #f0f3f1) !important;
  border-block-end: 1px solid var(--n-color-border, #d5ddd9) !important;
  padding: calc(var(--n-space-m) + 2px) var(--n-space-m) !important;
}
.n-dropdown-content {
  padding: var(--n-space-s) 0 !important;
}
::slotted(nord-dropdown-group) {
  border-block-end: 1px solid var(--n-color-border, #d5ddd9) !important;
  margin-block-end: var(--n-space-s) !important;
  padding-block-end: var(--n-space-s) !important;
}
::slotted(nord-dropdown-group:last-child) {
  border-block-end: 0 !important;
  margin-block-end: 0 !important;
  padding-block-end: 0 !important;
}
::slotted(nord-dropdown-item),
::slotted(nord-dropdown-group) {
  padding-inline-end: var(--n-space-s) !important;
  padding-inline-start: var(--n-space-s) !important;
}
`;

/* Cantos / sombra no shadow do nord-popout */
const NORD_ACCOUNT_MENU_POPOUT_CSS = `
.n-popout {
  border-radius: 8px !important;
  overflow: hidden;
  background: var(--n-popout-background, var(--n-color-surface, #fff)) !important;
  /* Borda 1px (anel) + sombra suave — igual à referência */
  box-shadow:
    0 0 0 1px var(--n-color-border, #d5ddd9),
    0 8px 24px rgb(0 0 0 / 0.12),
    0 2px 8px rgb(0 0 0 / 0.06) !important;
}
`;

/*
 * Remove foco/sombra interna do .n-button (pesquisa_app/nord.ts).
 * Sem isso o botão Nord fica com anel/sombra diferente da referência.
 */
const NORD_NO_FOCUS_CSS = `
:host(:focus),
:host(:focus-visible),
:host(:focus-within),
*:focus,
*:focus-visible,
*:focus-within {
  outline: none !important;
}
.n-button:focus,
.n-button:focus-visible,
.n-button:active {
  outline: none !important;
  box-shadow: none !important;
  --_n-button-box-shadow: none !important;
  --n-button-box-shadow: none !important;
}
.n-dropdown-item:focus,
.n-dropdown-item:focus-visible {
  outline: none !important;
  --n-dropdown-item-box-shadow: none !important;
}
/* nord-checkbox / toggle: anel verde no clique */
input[type='checkbox']:focus,
input[type='checkbox']:focus-visible,
input[type='checkbox']:focus-within,
input.n-input:focus,
input.n-input:focus-visible,
.n-input:focus,
.n-input:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}
`;

/** Padding + underline da aba ativa na cor do tema (shadow de nord-tab). */
const NORD_TAB_PADDING_CSS = `
:host {
  padding: 13px !important;
  box-sizing: border-box !important;
}
:host([aria-selected='true']),
:host([selected]) {
  --_n-tab-border: 2px solid var(--c-primary, var(--primary, var(--n-color-text-link))) !important;
  border-block-end: 2px solid var(--c-primary, var(--primary, var(--n-color-text-link))) !important;
  --_n-tab-color: var(--c-primary, var(--primary, var(--n-color-text-link))) !important;
}
`;

/*
 * Date/time: mesma altura dos demais controles (--control-height) e
 * input type=time do Nord não usa a fórmula nativa (mais baixa).
 * Toggle no slot=end: o Input pinta --n-button-border-color no hover/focus
 * (caixa dentro da caixa) — forçamos transparente no shadow do nord-input.
 */
const NORD_PICKER_INPUT_CSS = `
:host {
  --n-input-block-size: var(--control-height, 40px) !important;
  --_n-input-block-size: var(--control-height, 40px) !important;
  --n-input-font-size: var(--control-font-size, 0.875rem) !important;
  --_n-input-font-size: var(--control-font-size, 0.875rem) !important;
}
:host([type='time']) .n-control,
:host .n-control {
  min-block-size: var(--control-height, 40px) !important;
  block-size: var(--control-height, 40px) !important;
  box-sizing: border-box !important;
}
:host([type='time']) .n-input {
  block-size: auto !important;
  min-block-size: 0 !important;
}
:host([type='time']) .n-input::-webkit-calendar-picker-indicator {
  display: none !important;
  opacity: 0 !important;
  pointer-events: none !important;
}
.n-input {
  caret-color: transparent !important;
  cursor: pointer !important;
}
/* Cancela o “addon” do input-group (raio só de um lado = caixa aninhada) */
slot[name='end'] {
  --n-button-border-radius: var(--n-border-radius-s) !important;
}
::slotted(nord-button.n-date-picker-toggle),
::slotted(nord-dropdown),
.n-input-container:hover:not(:focus-within) ::slotted(nord-button.n-date-picker-toggle),
.n-input-container:hover:not(:focus-within) ::slotted(nord-dropdown),
.n-label-container:hover ~ .n-input-container:not(:focus-within) ::slotted(nord-button.n-date-picker-toggle),
.n-label-container:hover ~ .n-input-container:not(:focus-within) ::slotted(nord-dropdown),
.n-input-container:focus-within ::slotted(nord-button.n-date-picker-toggle),
.n-input-container:focus-within ::slotted(nord-dropdown) {
  --n-button-border-color: transparent !important;
  --n-button-background-color: transparent !important;
  --n-button-background-color-hover: color-mix(in srgb, var(--n-color-text) 6%, transparent) !important;
  --n-button-box-shadow: none !important;
  --n-button-box-shadow-hover: none !important;
  --n-button-border-radius: var(--n-border-radius-s) !important;
}
`;

/** Shadow do nord-button do calendário/hora — zera borda de 1px mesmo transparente. */
const NORD_PICKER_TOGGLE_CSS = `
:host {
  --n-button-border-color: transparent !important;
  --_n-button-border-color: transparent !important;
  --n-button-border-radius: var(--n-border-radius-s) !important;
  --_n-button-border-radius: var(--n-border-radius-s) !important;
  --n-button-box-shadow: none !important;
  --_n-button-box-shadow: none !important;
  --n-button-background-color: transparent !important;
  --_n-button-background-color: transparent !important;
}
.n-button,
.n-button:hover,
.n-button:focus,
.n-button:focus-visible,
.n-button:active {
  border: none !important;
  box-shadow: none !important;
  background: transparent !important;
}
.n-button:hover {
  background: color-mix(in srgb, var(--n-color-text) 6%, transparent) !important;
}
`;

let shellHeaderSheet: CSSStyleSheet | null = null;
let navItemSheet: CSSStyleSheet | null = null;
let accountMenuDropdownSheet: CSSStyleSheet | null = null;
let accountMenuPopoutSheet: CSSStyleSheet | null = null;
let noFocusSheet: CSSStyleSheet | null = null;
let tabPaddingSheet: CSSStyleSheet | null = null;
let pickerInputSheet: CSSStyleSheet | null = null;
let pickerToggleSheet: CSSStyleSheet | null = null;
const shellStyled = new WeakSet<ShadowRoot>();
const navItemStyled = new WeakSet<ShadowRoot>();
const accountMenuDropdownStyled = new WeakSet<ShadowRoot>();
const accountMenuPopoutStyled = new WeakSet<ShadowRoot>();
const noFocusStyled = new WeakSet<ShadowRoot>();
const tabPaddingStyled = new WeakSet<ShadowRoot>();
const pickerInputStyled = new WeakSet<ShadowRoot>();
const pickerToggleStyled = new WeakSet<ShadowRoot>();

function getShellHeaderSheet(): CSSStyleSheet {
  if (!shellHeaderSheet) {
    shellHeaderSheet = new CSSStyleSheet();
    shellHeaderSheet.replaceSync(NORD_SHELL_HEADER_CSS);
  }
  return shellHeaderSheet;
}

function getNavItemSheet(): CSSStyleSheet {
  if (!navItemSheet) {
    navItemSheet = new CSSStyleSheet();
    navItemSheet.replaceSync(NORD_NAV_ITEM_CSS);
  }
  return navItemSheet;
}

function getAccountMenuDropdownSheet(): CSSStyleSheet {
  if (!accountMenuDropdownSheet) {
    accountMenuDropdownSheet = new CSSStyleSheet();
    accountMenuDropdownSheet.replaceSync(NORD_ACCOUNT_MENU_DROPDOWN_CSS);
  }
  return accountMenuDropdownSheet;
}

function getAccountMenuPopoutSheet(): CSSStyleSheet {
  if (!accountMenuPopoutSheet) {
    accountMenuPopoutSheet = new CSSStyleSheet();
    accountMenuPopoutSheet.replaceSync(NORD_ACCOUNT_MENU_POPOUT_CSS);
  }
  return accountMenuPopoutSheet;
}

function getNoFocusSheet(): CSSStyleSheet {
  if (!noFocusSheet) {
    noFocusSheet = new CSSStyleSheet();
  }
  // Sempre sync — HMR / correções atualizam shadows que já adotaram a sheet
  noFocusSheet.replaceSync(NORD_NO_FOCUS_CSS);
  return noFocusSheet;
}

function getTabPaddingSheet(): CSSStyleSheet {
  if (!tabPaddingSheet) {
    tabPaddingSheet = new CSSStyleSheet();
  }
  tabPaddingSheet.replaceSync(NORD_TAB_PADDING_CSS);
  return tabPaddingSheet;
}

function getPickerInputSheet(): CSSStyleSheet {
  if (!pickerInputSheet) {
    pickerInputSheet = new CSSStyleSheet();
  }
  pickerInputSheet.replaceSync(NORD_PICKER_INPUT_CSS);
  return pickerInputSheet;
}

function getPickerToggleSheet(): CSSStyleSheet {
  if (!pickerToggleSheet) {
    pickerToggleSheet = new CSSStyleSheet();
  }
  pickerToggleSheet.replaceSync(NORD_PICKER_TOGGLE_CSS);
  return pickerToggleSheet;
}

function injectAdoptedOrStyle(
  root: ShadowRoot,
  sheet: CSSStyleSheet,
  cssText: string,
  dataAttr: string,
): void {
  try {
    const sheets = root.adoptedStyleSheets ?? [];
    root.adoptedStyleSheets = [...sheets, sheet];
  } catch {
    const style = document.createElement('style');
    style.setAttribute(dataAttr, '');
    style.textContent = cssText;
    root.appendChild(style);
  }
}

function injectShellHeaderStyles(host: Element): void {
  const root = host.shadowRoot;
  if (!root || shellStyled.has(root)) return;
  shellStyled.add(root);
  injectAdoptedOrStyle(root, getShellHeaderSheet(), NORD_SHELL_HEADER_CSS, 'data-gestgo-shell-header');
}

function syncRailTooltipDelay(root: ShadowRoot): void {
  root.querySelectorAll('nord-tooltip').forEach((tip) => {
    const el = tip as HTMLElement & { delay?: number };
    if (el.delay !== 0) el.delay = 0;
  });
}

function injectNavItemStyles(host: Element): void {
  const root = host.shadowRoot;
  if (!root) return;
  if (!navItemStyled.has(root)) {
    navItemStyled.add(root);
    injectAdoptedOrStyle(root, getNavItemSheet(), NORD_NAV_ITEM_CSS, 'data-gestgo-nav-item');
    // Tooltip do rail (sidebar fechada): delay 0 como no header
    new MutationObserver(() => syncRailTooltipDelay(root)).observe(root, {
      childList: true,
      subtree: true,
    });
  }
  syncRailTooltipDelay(root);
}

function injectAccountMenuPopupStyles(dropdown: Element): void {
  if (!(dropdown instanceof HTMLElement) || !dropdown.classList.contains('account-menu')) return;
  const root = dropdown.shadowRoot;
  if (!root) return;

  if (!accountMenuDropdownStyled.has(root)) {
    accountMenuDropdownStyled.add(root);
    injectAdoptedOrStyle(
      root,
      getAccountMenuDropdownSheet(),
      NORD_ACCOUNT_MENU_DROPDOWN_CSS,
      'data-gestgo-account-menu',
    );
  }

  root.querySelectorAll('nord-popout').forEach((popout) => {
    const pr = popout.shadowRoot;
    if (!pr || accountMenuPopoutStyled.has(pr)) return;
    accountMenuPopoutStyled.add(pr);
    injectAdoptedOrStyle(
      pr,
      getAccountMenuPopoutSheet(),
      NORD_ACCOUNT_MENU_POPOUT_CSS,
      'data-gestgo-account-menu-popout',
    );
  });
}

function injectNoFocusStyles(host: Element): void {
  if (!(host instanceof HTMLElement) || !host.localName?.startsWith('nord-')) return;
  host.style.setProperty('--n-button-box-shadow', 'none');
  host.style.setProperty('--_n-button-box-shadow', 'none');
  const root = host.shadowRoot;
  if (!root || noFocusStyled.has(root)) return;
  noFocusStyled.add(root);
  injectAdoptedOrStyle(root, getNoFocusSheet(), NORD_NO_FOCUS_CSS, 'data-gestgo-no-focus');
}

function injectTabPaddingStyles(host: Element): void {
  if (!(host instanceof HTMLElement) || host.localName !== 'nord-tab') return;
  const root = host.shadowRoot;
  if (!root || tabPaddingStyled.has(root)) return;
  tabPaddingStyled.add(root);
  injectAdoptedOrStyle(root, getTabPaddingSheet(), NORD_TAB_PADDING_CSS, 'data-gestgo-tab-padding');
}

function injectPickerInputStyles(nordInput: Element): void {
  const root = nordInput.shadowRoot;
  if (!root) return;
  // replaceSync atualiza shadows que já adotaram a sheet (HMR / correções)
  const sheet = getPickerInputSheet();
  if (pickerInputStyled.has(root)) return;
  pickerInputStyled.add(root);
  injectAdoptedOrStyle(root, sheet, NORD_PICKER_INPUT_CSS, 'data-gestgo-picker-input');
}

function injectPickerToggleStyles(toggle: Element): void {
  const root = toggle.shadowRoot;
  if (!root) return;
  const sheet = getPickerToggleSheet();
  if (pickerToggleStyled.has(root)) return;
  pickerToggleStyled.add(root);
  injectAdoptedOrStyle(root, sheet, NORD_PICKER_TOGGLE_CSS, 'data-gestgo-picker-toggle');
}

/**
 * Exibição dd/mm/aaaa (Brasil). O `value` do componente continua ISO YYYY-MM-DD
 * para o Angular/API — só muda o que aparece no input e o parse da digitação.
 */
type NordCreateDate = (year: string, month: string, day: string) => Date | undefined;
const BR_DATE_ADAPTER = {
  format(date: Date): string {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = String(date.getFullYear()).padStart(4, '0');
    return `${d}/${m}/${y}`;
  },
  parse(input: string, createDate: NordCreateDate): Date | undefined {
    const s = String(input ?? '').trim();
    if (!s) return undefined;
    let match = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (match) {
      return createDate(match[3], match[2].padStart(2, '0'), match[1].padStart(2, '0'));
    }
    match = s.match(/^(\d{1,2})[.\-](\d{1,2})[.\-](\d{4})$/);
    if (match) {
      return createDate(match[3], match[2].padStart(2, '0'), match[1].padStart(2, '0'));
    }
    // Aceita ISO (valor do model / API)
    match = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) {
      return createDate(match[1], match[2], match[3]);
    }
    return undefined;
  },
};

/** Altura padrão + cursor de picker (sem digitação livre). */
function enhanceNordPicker(host: Element): void {
  if (!(host instanceof HTMLElement)) return;
  if (host.localName !== 'nord-date-picker' && host.localName !== 'nord-time-picker') return;

  host.style.setProperty('--n-input-block-size', 'var(--control-height)');
  host.style.setProperty('--_n-input-block-size', 'var(--control-height)');
  host.style.setProperty('--n-input-font-size', 'var(--control-font-size)');
  host.style.setProperty('--_n-input-font-size', 'var(--control-font-size)');
  // size=s encolhe tipografia/padding — padroniza com os demais inputs
  if (host.getAttribute('size') === 's') {
    host.setAttribute('size', 'm');
  }
  if (!host.hasAttribute('expand')) {
    host.setAttribute('expand', '');
  }

  if (host.localName === 'nord-date-picker') {
    const picker = host as HTMLElement & {
      dateAdapter?: typeof BR_DATE_ADAPTER;
      firstDayOfWeek?: number;
    };
    if (picker.dateAdapter !== BR_DATE_ADAPTER) {
      picker.dateAdapter = BR_DATE_ADAPTER;
    }
    // Calendário BR: domingo como primeiro dia
    if (!host.hasAttribute('first-day-of-week')) {
      picker.firstDayOfWeek = 0;
    }
    if (!host.getAttribute('lang')) {
      host.setAttribute('lang', 'pt-BR');
    }
    const ph = host.getAttribute('placeholder');
    if (!ph || ph === 'aaaa-mm-dd' || ph === 'yyyy-mm-dd' || ph === 'YYYY-MM-DD') {
      host.setAttribute('placeholder', 'dd/mm/aaaa');
    }
  }

  const root = host.shadowRoot;
  if (!root) return;
  root.querySelectorAll('nord-input').forEach((el) => injectPickerInputStyles(el));

  // Toggle plain: sem borda padrão do nord-button (o Input ainda força no hover via CSS acima)
  root.querySelectorAll('nord-button.n-date-picker-toggle, nord-dropdown > nord-button[slot="toggle"]').forEach((btn) => {
    if (!(btn instanceof HTMLElement)) return;
    if (btn.getAttribute('variant') !== 'plain') {
      btn.setAttribute('variant', 'plain');
    }
    btn.style.setProperty('--n-button-border-color', 'transparent');
    btn.style.setProperty('--n-button-background-color', 'transparent');
    btn.style.setProperty('--n-button-box-shadow', 'none');
    injectPickerToggleStyles(btn);
  });
}

type NordShowable = HTMLElement & { show?: () => void; open?: boolean; disabled?: boolean };

function findPickerHost(path: EventTarget[]): NordShowable | null {
  for (const node of path) {
    if (!(node instanceof HTMLElement)) continue;
    if (node.localName === 'nord-date-picker' || node.localName === 'nord-time-picker') {
      return node as NordShowable;
    }
  }
  return null;
}

function isPickerToggle(path: EventTarget[]): boolean {
  return path.some((n) => {
    if (!(n instanceof Element)) return false;
    if (n.classList.contains('n-date-picker-toggle') || n.closest?.('.n-date-picker-toggle')) {
      return true;
    }
    // Time picker: botão/dropdown dentro de nord-time-picker — não o menu da conta
    const inTimePicker =
      !!n.closest?.('nord-time-picker') ||
      (n.getRootNode() instanceof ShadowRoot &&
        (n.getRootNode() as ShadowRoot).host?.localName === 'nord-time-picker');
    if (!inTimePicker) return false;
    return (
      n.localName === 'nord-dropdown' ||
      (n.localName === 'nord-button' && n.getAttribute('slot') === 'toggle')
    );
  });
}

function openNordPicker(host: NordShowable): void {
  if (host.disabled || host.hasAttribute('disabled')) return;
  if (host.localName === 'nord-date-picker') {
    if (!host.open) host.show?.();
    return;
  }
  const dropdown = host.shadowRoot?.querySelector('nord-dropdown') as NordShowable | null;
  dropdown?.show?.();
}

/**
 * Abre o calendário/hora após o ciclo do clique.
 * Abrir no pointerdown faz o LightDismiss do nord-popout ver mousedown/click
 * “fora” do toggle e fechar na mesma interação.
 */
function openNordPickerAfterClick(host: NordShowable): void {
  window.setTimeout(() => openNordPicker(host), 0);
}

const pickerOpenOnPointer = new WeakMap<NordShowable, boolean>();

function installNordPickerUx(): void {
  if (typeof document === 'undefined') return;
  if ((document.documentElement as HTMLElement).dataset['gestgoPickerUx'] === '1') return;
  (document.documentElement as HTMLElement).dataset['gestgoPickerUx'] = '1';

  const allowedKeys = new Set([
    'Tab',
    'Escape',
    'Enter',
    ' ',
    'ArrowDown',
    'ArrowUp',
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'End',
  ]);

  // Marca se já estava aberto — evita reabrir após o LightDismiss fechar no mesmo clique
  document.addEventListener(
    'pointerdown',
    (ev) => {
      const path = ev.composedPath();
      const host = findPickerHost(path);
      if (!host || isPickerToggle(path)) return;
      const wasOpen =
        host.localName === 'nord-date-picker'
          ? !!host.open
          : !!(host.shadowRoot?.querySelector('nord-dropdown') as NordShowable | null)?.open;
      pickerOpenOnPointer.set(host, wasOpen);
    },
    true,
  );

  document.addEventListener(
    'click',
    (ev) => {
      const path = ev.composedPath();
      const host = findPickerHost(path);
      if (!host) return;
      // Clique no botão/dropdown nativo: deixa o Nord abrir/fechar
      if (isPickerToggle(path)) return;
      if (pickerOpenOnPointer.get(host)) return;
      openNordPickerAfterClick(host);
    },
    true,
  );

  document.addEventListener(
    'keydown',
    (ev) => {
      const path = ev.composedPath();
      const host = findPickerHost(path);
      if (!host) return;
      // Dentro do popout/dropdown o teclado continua operacional
      const inOverlay = path.some(
        (n) =>
          n instanceof Element &&
          (n.localName === 'nord-popout' ||
            n.localName === 'nord-calendar' ||
            n.localName === 'nord-dropdown-item' ||
            n.getAttribute?.('role') === 'dialog'),
      );
      if (inOverlay) return;
      if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
      if (allowedKeys.has(ev.key)) {
        if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'ArrowDown') {
          ev.preventDefault();
          openNordPickerAfterClick(host);
        }
        return;
      }
      ev.preventDefault();
      ev.stopPropagation();
    },
    true,
  );

  document.addEventListener(
    'beforeinput',
    (ev) => {
      const path = ev.composedPath();
      const host = findPickerHost(path);
      if (!host) return;
      const inOverlay = path.some(
        (n) =>
          n instanceof Element &&
          (n.localName === 'nord-popout' ||
            n.localName === 'nord-calendar' ||
            n.localName === 'nord-dropdown-item'),
      );
      if (inOverlay) return;
      ev.preventDefault();
    },
    true,
  );

  document.addEventListener(
    'paste',
    (ev) => {
      const path = ev.composedPath();
      if (!findPickerHost(path)) return;
      ev.preventDefault();
    },
    true,
  );
}

function scanShellShadows(node: ParentNode = document): void {
  node.querySelectorAll('nord-layout, nord-header, nord-navigation, nord-top-bar').forEach((el) => {
    if (SHELL_SHADOW_TAGS.has(el.localName)) {
      injectShellHeaderStyles(el);
    }
  });
  node.querySelectorAll('nord-nav-item').forEach((el) => injectNavItemStyles(el));
  node.querySelectorAll('nord-dropdown.account-menu').forEach((el) => injectAccountMenuPopupStyles(el));
  // Botões / checkboxes / toggles: strip de foco/sombra como no pesquisa
  node.querySelectorAll('nord-button, nord-checkbox, nord-toggle').forEach((el) => injectNoFocusStyles(el));
  node.querySelectorAll('nord-tab').forEach((el) => injectTabPaddingStyles(el));
  node.querySelectorAll('nord-date-picker, nord-time-picker').forEach((el) => enhanceNordPicker(el));
}

if (typeof document !== 'undefined') {
  installNordPickerUx();

  const startShellStyles = () => {
    scanShellShadows(document);
    new MutationObserver(() => scanShellShadows(document)).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
    // Elementos que só ganham shadow root depois do primeiro paint.
    let passes = 0;
    const timer = window.setInterval(() => {
      scanShellShadows(document);
      passes += 1;
      if (passes >= 20) window.clearInterval(timer);
    }, 250);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startShellStyles, { once: true });
  } else {
    startShellStyles();
  }
}

/** Sincroniza data-color-scheme + color-scheme com o tema Gestgo (body.dark). */
function syncNordColorScheme(): void {
  if (typeof document === 'undefined') return;
  const dark = document.body.classList.contains('dark');
  const scheme = dark ? 'dark' : 'light';
  document.documentElement.setAttribute('data-color-scheme', scheme);
  document.documentElement.style.colorScheme = scheme;
}

syncNordColorScheme();

if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
  const observer = new MutationObserver(() => syncNordColorScheme());
  if (document.body) {
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      syncNordColorScheme();
      observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    });
  }
}
