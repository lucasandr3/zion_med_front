import { Component, OnDestroy, OnInit, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { UserAppearanceService } from '../../core/services/user-appearance.service';
import { ShellNavLayoutService } from '../../core/services/shell-nav-layout.service';
import { TemaUtil } from '../../shared/utils/tema.util';
import {
  applyNavLayoutToDom,
  applyShellAppearanceToDom,
  GESTGO_APPEARANCE_MODE_LS,
  GESTGO_NAV_LAYOUT_LS,
  GESTGO_SHELL_PRESET_LS,
  GESTGO_THEME_LS,
  NAV_LAYOUT_UI_OPTIONS,
  normalizeNavLayout,
  normalizeThemeKey,
  parseShellAppearance,
  readNavLayoutFromDom,
  readShellAppearanceFromDom,
  serializeShellAppearance,
  SHELL_PRESET_UI_OPTIONS,
  type NavLayout,
  type ShellAppearance,
  type ShellHeaderPreset,
} from '../../core/services/user-appearance.sync';
import { TEMAS, TEMAS_GRADE_ORDER } from '../../core/theme/gestgo-themes';

/**
 * Painel de tema e aparência do shell Material (InspecFlow-style overlay).
 * Porta a lógica do drawer legado de `cabecalho.component.ts` para o novo shell.
 */
@Component({
  selector: 'app-gestgo-theme-panel',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './gestgo-theme-panel.component.html',
  styleUrl: './gestgo-theme-panel.component.scss',
})
export class GestgoThemePanelComponent implements OnInit, OnDestroy {
  readonly closed = output<void>();

  private readonly auth = inject(AuthService);
  private readonly appearance = inject(UserAppearanceService);
  private readonly temaUtil = inject(TemaUtil);
  private readonly shellNavLayout = inject(ShellNavLayoutService);

  readonly temas = TEMAS;
  readonly shellPresetOptions = SHELL_PRESET_UI_OPTIONS;
  readonly navLayoutOptions = NAV_LAYOUT_UI_OPTIONS;

  themeDrawerMode: 'light' | 'dark' | 'auto' = 'light';
  temaAtual = 'ocean-blue';
  shellHeaderAtual: ShellHeaderPreset = 'default';
  shellSidebarDark = false;
  navLayoutAtual: NavLayout = 'sidebar';

  private _sysDarkMql: MediaQueryList | null = null;
  private readonly _sysListener = () => this._applyAutoMode();

  /** Temas na ordem da grade de círculos (6 + 5). */
  get temasOrdemGrade(): { key: string; label: string; labelPt: string; color: string }[] {
    const byKey = new Map(this.temas.map((t) => [t.key, t]));
    return TEMAS_GRADE_ORDER.map((k) => byKey.get(k)).filter((t): t is (typeof TEMAS)[number] => t != null);
  }

  get temaAtualMeta(): (typeof TEMAS)[number] | undefined {
    return this.temas.find((t) => t.key === this.temaAtual);
  }

  get shellAppearance(): ShellAppearance {
    return { header: this.shellHeaderAtual, sidebarDark: this.shellSidebarDark };
  }

  get shellPresetFootnote(): string {
    const headerOpt = this.shellPresetOptions.find((o) => o.id === this.shellHeaderAtual);
    const darkOpt = this.shellPresetOptions.find((o) => o.id === 'sidebar_dark');
    if (this.shellSidebarDark) {
      return `${headerOpt?.description ?? ''} ${darkOpt?.description ?? ''}`.trim();
    }
    return headerOpt?.description ?? '—';
  }

  isShellOptionActive(id: 'default' | 'tinted' | 'sidebar_dark'): boolean {
    if (id === 'sidebar_dark') return this.shellSidebarDark;
    return this.shellHeaderAtual === id;
  }

  ngOnInit(): void {
    this.syncFromBrowser();
  }

  ngOnDestroy(): void {
    this._removeSysListener();
  }

  close(): void {
    this.closed.emit();
  }

  /** Alinha estado do painel com `body`/`localStorage` (inclui após `/me`). */
  private syncFromBrowser(): void {
    try {
      const saved = localStorage.getItem(GESTGO_THEME_LS);
      if (saved) {
        this.temaAtual = normalizeThemeKey(saved);
      } else {
        const m = document.body.className.match(/theme-([a-z-]+)/);
        if (m) this.temaAtual = normalizeThemeKey(m[1]);
      }

      const modoEscuro = document.body.classList.contains('dark') || localStorage.getItem('gestgo_dark_mode') === '1';
      const preferAuto = localStorage.getItem(GESTGO_APPEARANCE_MODE_LS) === 'auto';
      if (preferAuto) {
        this.themeDrawerMode = 'auto';
        this._ensureAutoListener();
      } else {
        this.themeDrawerMode = modoEscuro ? 'dark' : 'light';
        this._removeSysListener();
      }

      this.syncShellPresetFromBrowser();
      this.syncNavLayoutFromBrowser();
    } catch {}
  }

  /** Alinha disposição do menu com localStorage (prioridade) ou API quando persistido. */
  private syncNavLayoutFromBrowser(): void {
    let layout: NavLayout = 'sidebar';
    try {
      const ls = localStorage.getItem(GESTGO_NAV_LAYOUT_LS);
      layout = ls ? normalizeNavLayout(ls) : readNavLayoutFromDom();
    } catch {
      layout = readNavLayoutFromDom();
    }

    const u = this.auth.getUser();
    const apiLayout = u?.ui_nav_layout;
    if (apiLayout != null && String(apiLayout).trim() !== '') {
      layout = normalizeNavLayout(apiLayout);
    }

    this.navLayoutAtual = layout;
  }

  /** Alinha preset do shell com usuário logado ou localStorage. */
  private syncShellPresetFromBrowser(): void {
    const u = this.auth.getUser();
    let appearance = readShellAppearanceFromDom();
    if (this.auth.isAuthenticated() && u && u.ui_shell_preset !== undefined) {
      appearance = parseShellAppearance(u.ui_shell_preset);
    } else {
      try {
        const ls = localStorage.getItem(GESTGO_SHELL_PRESET_LS);
        if (ls) appearance = parseShellAppearance(ls);
      } catch {}
    }
    this.shellHeaderAtual = appearance.header;
    this.shellSidebarDark = appearance.sidebarDark;
  }

  aplicarModoTema(mode: 'light' | 'dark' | 'auto'): void {
    this.themeDrawerMode = mode;
    if (mode === 'auto') {
      try {
        localStorage.setItem(GESTGO_APPEARANCE_MODE_LS, 'auto');
      } catch {}
      this._ensureAutoListener();
      this._applyAutoMode();
    } else {
      try {
        localStorage.removeItem(GESTGO_APPEARANCE_MODE_LS);
      } catch {}
      this._removeSysListener();
      this.aplicarModoEscuro(mode === 'dark');
    }
  }

  private aplicarModoEscuro(escuro: boolean): void {
    this.temaUtil.setColorScheme(escuro ? 'dark' : 'light');
    if (this.auth.isAuthenticated()) {
      this.appearance.patchAppearance({ ui_dark_mode: escuro }).subscribe({ error: () => {} });
    }
  }

  private _applyAutoMode(): void {
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.temaUtil.setColorScheme(dark ? 'dark' : 'light');
    if (this.auth.isAuthenticated()) {
      this.appearance.patchAppearance({ ui_dark_mode: dark }).subscribe({ error: () => {} });
    }
  }

  private _ensureAutoListener(): void {
    if (this._sysDarkMql != null) return;
    this._sysDarkMql = window.matchMedia('(prefers-color-scheme: dark)');
    this._sysDarkMql.addEventListener('change', this._sysListener);
  }

  private _removeSysListener(): void {
    this._sysDarkMql?.removeEventListener('change', this._sysListener);
    this._sysDarkMql = null;
  }

  aplicarTema(key: string): void {
    const canonical = normalizeThemeKey(key);
    const list = Array.from(document.body.classList).filter((c) => c.startsWith('theme-'));
    list.forEach((c) => document.body.classList.remove(c));
    document.body.classList.add('theme-' + canonical);
    this.temaAtual = canonical;
    try {
      localStorage.setItem(GESTGO_THEME_LS, canonical);
    } catch {}
    if (this.auth.isAuthenticated()) {
      this.appearance.patchAppearance({ ui_theme: canonical }).subscribe({ error: () => {} });
    }
    this.auth.notifyAppearanceApplied();
  }

  aplicarShellPreset(option: 'default' | 'tinted' | 'sidebar_dark'): void {
    if (option === 'sidebar_dark') {
      this.shellSidebarDark = !this.shellSidebarDark;
    } else {
      this.shellHeaderAtual = option;
    }
    const appearance = this.shellAppearance;
    applyShellAppearanceToDom(appearance);
    this.auth.notifyAppearanceApplied();
    if (this.auth.isAuthenticated()) {
      const serialized = serializeShellAppearance(appearance);
      this.appearance
        .patchAppearance({
          ui_shell_preset: serialized === 'default' ? null : serialized,
        })
        .subscribe({ error: () => {} });
    }
  }

  aplicarNavLayout(layout: NavLayout): void {
    const canonical = normalizeNavLayout(layout);
    this.navLayoutAtual = canonical;
    applyNavLayoutToDom(canonical);
    this.shellNavLayout.refresh();
    this.auth.notifyAppearanceApplied();
    if (this.auth.isAuthenticated()) {
      this.appearance
        .patchAppearance({
          ui_nav_layout: canonical === 'sidebar' ? null : canonical,
        })
        .subscribe({ error: () => {} });
    }
  }
}
