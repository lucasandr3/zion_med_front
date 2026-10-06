import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { UserAppearanceService } from '../../../core/services/user-appearance.service';
import {
  applyShellPresetToDom,
  disableHorizontalNavInDom,
  GESTGO_APPEARANCE_MODE_LS,
  GESTGO_SHELL_PRESET_LS,
  normalizeShellPreset,
  normalizeThemeKey,
  SHELL_PRESET_UI_OPTIONS,
  syncThemeChrome,
  type ShellPreset,
} from '../../../core/services/user-appearance.sync';
import { GoAssistantShellService } from '../../../go-assistant/services/go-assistant-shell.service';
import type { GestgoSheetRef } from '@/shared/components/sheet/sheet-ref';
import { GestgoSheetService } from '@/shared/components/sheet/sheet.service';
import { temasOrdemGrade, TEMAS, type ShellTema } from '../shell-theme.config';

/**
 * Ícones do `nord-top-bar` (slot=end) — padrão pesquisa_app.
 * O menu da conta fica em `nord-dropdown[gestgoAccountMenu]` (filho direto do top-bar).
 */
@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-shell-top-bar-actions',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './shell-top-bar-actions.component.html',
  styleUrl: './shell-top-bar-actions.component.css',
})
export class ShellTopBarActionsComponent implements OnInit, OnDestroy {
  @Input() notificacoesNaoLidas = 0;
  @Input() novidadesNaoVistas = 0;
  @Input() notificacoesRouterLink = '/notificacoes';

  temaAtual = 'ocean-blue';
  modoEscuro = false;
  shellPresetAtual: ShellPreset = 'default';
  themeDrawerMode: 'light' | 'dark' | 'auto' = 'light';

  readonly shellPresetOptions = SHELL_PRESET_UI_OPTIONS;
  readonly temasOrdemGrade = temasOrdemGrade();

  private appearanceSub?: Subscription;
  private _sysDarkMql: MediaQueryList | null = null;
  private readonly _sysListener = () => this._applyAutoMode();

  @ViewChild('temaSheetContent') temaSheetTpl?: TemplateRef<void>;

  private readonly auth = inject(AuthService);
  private readonly appearance = inject(UserAppearanceService);
  private readonly vcr = inject(ViewContainerRef);
  private readonly gestgoSheet = inject(GestgoSheetService);
  private readonly goAssistant = inject(GoAssistantShellService);
  private readonly cdr = inject(ChangeDetectorRef);
  /** Exposto ao template para estado ativo do botão de tema. */
  temaSheetRef?: GestgoSheetRef<void>;

  get temaAtualMeta(): ShellTema | undefined {
    return TEMAS.find((t) => t.key === this.temaAtual);
  }

  get shellPresetMeta(): (typeof SHELL_PRESET_UI_OPTIONS)[number] | undefined {
    return this.shellPresetOptions.find((o) => o.id === this.shellPresetAtual);
  }

  get podeVerNotificacoesNoHeader(): boolean {
    return this.auth.hasPermission('notifications.access');
  }

  ngOnInit(): void {
    this.syncTemaControlsFromBrowser();
    if (this.themeDrawerMode === 'auto') {
      this._applyAutoMode();
    }
    this.appearanceSub = this.auth.appearanceApplied$.subscribe(() =>
      this.syncTemaControlsFromBrowser(),
    );
  }

  ngOnDestroy(): void {
    this.temaSheetRef?.close();
    this.appearanceSub?.unsubscribe();
    this._removeSysListener();
  }

  abrirGoAssistant(): void {
    this.goAssistant.show();
  }

  alternarMenuTema(): void {
    if (this.temaSheetRef) {
      this.temaSheetRef.close();
      return;
    }
    if (!this.temaSheetTpl) {
      return;
    }
    this.temaSheetRef = this.gestgoSheet.create<void, void>({
      zContent: this.temaSheetTpl,
      zViewContainerRef: this.vcr,
      zSide: 'right',
      zSize: 'custom',
      zWidth: 'min(100vw, 22rem)',
      zHeight: '100dvh',
      zTitle: 'Tema e aparência',
      zCustomClasses: 'cabecalho-theme-sheet-panel',
      zHideFooter: true,
      zOkText: null,
      zCancelText: null,
      zMaskClosable: true,
      zAfterClose: () => {
        this.temaSheetRef = undefined;
      },
    });
  }

  aplicarModoTema(mode: 'light' | 'dark' | 'auto'): void {
    this.themeDrawerMode = mode;
    if (mode === 'auto') {
      try {
        localStorage.setItem(GESTGO_APPEARANCE_MODE_LS, 'auto');
      } catch {}
      this._ensureAutoListener();
      this._applyAutoMode();
      this.cdr.markForCheck();
      return;
    }
    try {
      localStorage.removeItem(GESTGO_APPEARANCE_MODE_LS);
    } catch {}
    this._removeSysListener();
    this.aplicarModoEscuro(mode === 'dark');
    this.cdr.markForCheck();
  }

  aplicarModoEscuro(escuro: boolean): void {
    this.modoEscuro = escuro;
    document.body.classList.toggle('dark', this.modoEscuro);
    try {
      localStorage.setItem('gestgo_dark_mode', this.modoEscuro ? '1' : '0');
    } catch {}
    syncThemeChrome();
    if (this.auth.isAuthenticated()) {
      this.appearance.patchAppearance({ ui_dark_mode: escuro }).subscribe({ error: () => {} });
    }
  }

  aplicarTema(key: string): void {
    const canonical = normalizeThemeKey(key);
    Array.from(document.body.classList)
      .filter((c) => c.startsWith('theme-'))
      .forEach((c) => document.body.classList.remove(c));
    document.body.classList.add('theme-' + canonical);
    this.temaAtual = canonical;
    try {
      localStorage.setItem('gestgo_theme', canonical);
    } catch {}
    syncThemeChrome();
    if (this.auth.isAuthenticated()) {
      this.appearance.patchAppearance({ ui_theme: canonical }).subscribe({ error: () => {} });
    }
    this.auth.notifyAppearanceApplied();
    this.cdr.markForCheck();
  }

  aplicarShellPreset(preset: ShellPreset): void {
    const canonical = normalizeShellPreset(preset);
    this.shellPresetAtual = canonical;
    applyShellPresetToDom(canonical);
    this.auth.notifyAppearanceApplied();
    if (this.auth.isAuthenticated()) {
      this.appearance
        .patchAppearance({ ui_shell_preset: canonical === 'default' ? null : canonical })
        .subscribe({ error: () => {} });
    }
    this.cdr.markForCheck();
  }

  private syncTemaControlsFromBrowser(): void {
    try {
      const saved = localStorage.getItem('gestgo_theme');
      if (saved) {
        this.temaAtual = normalizeThemeKey(saved);
      } else {
        const m = document.body.className.match(/theme-([a-z-]+)/);
        if (m) this.temaAtual = normalizeThemeKey(m[1]);
      }
      this.modoEscuro =
        document.body.classList.contains('dark') || localStorage.getItem('gestgo_dark_mode') === '1';
      if (localStorage.getItem(GESTGO_APPEARANCE_MODE_LS) === 'auto') {
        this.themeDrawerMode = 'auto';
        this._ensureAutoListener();
      } else {
        this.themeDrawerMode = this.modoEscuro ? 'dark' : 'light';
        this._removeSysListener();
      }
      this.syncShellPresetFromBrowser();
      disableHorizontalNavInDom();
      syncThemeChrome();
    } catch {}
  }

  private syncShellPresetFromBrowser(): void {
    const u = this.auth.getUser();
    let preset: ShellPreset = 'default';
    if (this.auth.isAuthenticated() && u && u.ui_shell_preset !== undefined) {
      preset = normalizeShellPreset(u.ui_shell_preset);
    } else {
      try {
        const ls = localStorage.getItem(GESTGO_SHELL_PRESET_LS);
        if (ls) preset = normalizeShellPreset(ls);
      } catch {}
    }
    this.shellPresetAtual = preset;
    applyShellPresetToDom(preset);
  }

  private _applyAutoMode(): void {
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.modoEscuro = dark;
    document.body.classList.toggle('dark', dark);
    try {
      localStorage.setItem('gestgo_dark_mode', dark ? '1' : '0');
    } catch {}
    syncThemeChrome();
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
}
