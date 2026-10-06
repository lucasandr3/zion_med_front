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
import '@nordhealth/components/lib/Divider.js';
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
  --_n-navigation-header-block-size: var(--shell-header-height, var(--header-height, 3.5rem)) !important;
}
:host(nord-layout) {
  display: block !important;
  block-size: 100dvh !important;
  max-block-size: 100dvh !important;
  overflow: hidden !important;
  --_n-layout-padding: 0 !important;
  --n-layout-padding: 0 !important;
}
:host(nord-top-bar) {
  box-sizing: border-box !important;
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
/* Topo e marca */
:host-context(body.shell-preset-tinted) .n-has-top-bar[data-screen='wide'][data-nav='opened'] .n-layout-nav {
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
:host([active]) .n-nav-icon {
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
`;

let shellHeaderSheet: CSSStyleSheet | null = null;
let navItemSheet: CSSStyleSheet | null = null;
let accountMenuDropdownSheet: CSSStyleSheet | null = null;
let accountMenuPopoutSheet: CSSStyleSheet | null = null;
let noFocusSheet: CSSStyleSheet | null = null;
const shellStyled = new WeakSet<ShadowRoot>();
const navItemStyled = new WeakSet<ShadowRoot>();
const accountMenuDropdownStyled = new WeakSet<ShadowRoot>();
const accountMenuPopoutStyled = new WeakSet<ShadowRoot>();
const noFocusStyled = new WeakSet<ShadowRoot>();

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

function scanShellShadows(node: ParentNode = document): void {
  node.querySelectorAll('nord-layout, nord-header, nord-navigation, nord-top-bar').forEach((el) => {
    if (SHELL_SHADOW_TAGS.has(el.localName)) {
      injectShellHeaderStyles(el);
    }
  });
  node.querySelectorAll('nord-nav-item').forEach((el) => injectNavItemStyles(el));
  node.querySelectorAll('nord-dropdown.account-menu').forEach((el) => injectAccountMenuPopupStyles(el));
  // Botões (e demais nord-*): strip de foco/sombra como no pesquisa
  node.querySelectorAll('nord-button').forEach((el) => injectNoFocusStyles(el));
}

if (typeof document !== 'undefined') {
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
