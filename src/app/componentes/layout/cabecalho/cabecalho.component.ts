import { Component, Input, OnInit, OnDestroy, inject, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { UserAppearanceService } from '../../../core/services/user-appearance.service';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';
import { ClinicaService } from '../../../core/services/clinica.service';
import { ShellNavLayoutService } from '../../../core/services/shell-nav-layout.service';
import {
  applyNavLayoutToDom,
  applyShellPresetToDom,
  GESTGO_APPEARANCE_MODE_LS,
  GESTGO_NAV_LAYOUT_LS,
  GESTGO_SHELL_PRESET_LS,
  NAV_LAYOUT_UI_OPTIONS,
  normalizeNavLayout,
  normalizeShellPreset,
  normalizeThemeKey,
  readNavLayoutFromDom,
  SHELL_PRESET_UI_OPTIONS,
  type NavLayout,
  type ShellPreset,
} from '../../../core/services/user-appearance.sync';
import { absoluteMediaUrl } from '../../../core/utils/absolute-media-url';
import { resolveSidebarLogoSrc } from '../../../core/utils/sidebar-logo.util';
import { BarraNavHorizontalComponent } from '../barra-nav-horizontal/barra-nav-horizontal.component';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardMenuImports } from '../../../shared/components/menu/menu.imports';
import { ZardAvatarComponent } from '@/shared/components/avatar/avatar.component';
import { ZardSheetService } from '@/shared/components/sheet/sheet.service';
import type { ZardSheetRef } from '@/shared/components/sheet/sheet-ref';

export const TEMAS: { key: string; label: string; labelPt: string; color: string }[] = [
  { key: 'gestgo-blue', label: 'Royal blue', labelPt: 'Azul Gestgo', color: '#1e40af' },
  { key: 'ocean-blue', label: 'Brand green', labelPt: 'Verde marca', color: '#16a874' },
  { key: 'indigo-night', label: 'Indigo Night', labelPt: 'Anil', color: '#3730a3' },
  { key: 'emerald-fresh', label: 'Emerald Fresh', labelPt: 'Esmeralda', color: '#15803d' },
  { key: 'rose-elegant', label: 'Rose Elegant', labelPt: 'Rosa', color: '#be185d' },
  { key: 'amber-warm', label: 'Amber Warm', labelPt: 'Âmbar', color: '#b45309' },
  { key: 'violet-dream', label: 'Violet Dream', labelPt: 'Violeta', color: '#6d28d9' },
  { key: 'teal-ocean', label: 'Teal Ocean', labelPt: 'Verde-água', color: '#0f766e' },
  { key: 'slate-pro', label: 'Slate Pro', labelPt: 'Ardósia', color: '#334155' },
  { key: 'cyan-tech', label: 'Cyan Tech', labelPt: 'Ciano', color: '#0369a1' },
  { key: 'fuchsia-bold', label: 'Fuchsia Bold', labelPt: 'Magenta', color: '#a21caf' },
];

/** Ordem na grade 6+5 (alinhada ao painel visual de referência). */
const TEMAS_GRADE_ORDER = [
  'gestgo-blue',
  'indigo-night',
  'rose-elegant',
  'violet-dream',
  'slate-pro',
  'fuchsia-bold',
  'ocean-blue',
  'emerald-fresh',
  'amber-warm',
  'teal-ocean',
  'cyan-tech',
] as const;

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [CommonModule, RouterLink, ZardButtonComponent, ZardBadgeComponent, ZardAvatarComponent, BarraNavHorizontalComponent, ...ZardMenuImports],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css',
})
export class CabecalhoComponent implements OnInit, OnDestroy {
  @Input() titulo = 'Gestgo';
  /** Subtítulo exibido abaixo do título no header (ex.: "Visão geral dos clientes utilizando o Gestgo."). */
  @Input() subtitulo: string | null = null;
  @Input() notificacoesNaoLidas = 0;
  /** Quando informado, o ícone de notificações no header usa esta rota (ex.: /plataforma/notificacoes). */
  @Input() notificacoesRouterLink = '/notificacoes';
  /** Contexto do shell: tenant (`app`) ou plataforma. */
  @Input() shellContext: 'app' | 'plataforma' = 'app';
  nomeClinica: string | null = null;
  emailClinica: string | null = null;
  logoUrlClinica: string | null = null;
  exibirTrocarEmpresa = false;
  ehAdminPlataforma = false;
  podeGerenciarClinica = false;

  temas = TEMAS;

  /** Temas na ordem da grade de círculos (6 + 5). */
  get temasOrdemGrade(): { key: string; label: string; labelPt: string; color: string }[] {
    const byKey = new Map(this.temas.map((t) => [t.key, t]));
    return TEMAS_GRADE_ORDER.map((k) => byKey.get(k)).filter((t): t is (typeof TEMAS)[number] => t != null);
  }

  get temaAtualMeta(): (typeof TEMAS)[number] | undefined {
    return this.temas.find((t) => t.key === this.temaAtual);
  }

  get shellPresetMeta(): (typeof SHELL_PRESET_UI_OPTIONS)[number] | undefined {
    return this.shellPresetOptions.find((o) => o.id === this.shellPresetAtual);
  }

  get homeRouterLink(): string {
    return this.shellContext === 'plataforma' ? '/plataforma' : '/dashboard';
  }

  get brandTitulo(): string {
    return 'Gestgo';
  }

  get brandTag(): string {
    return 'Plataforma';
  }

  /** Ícone de notificações só para quem tem permissão no contexto atual (tenant ou plataforma). */
  get podeVerNotificacoesNoHeader(): boolean {
    return this.auth.hasPermission('notifications.access');
  }

  get podeVerBillingNoHeader(): boolean {
    return this.auth.hasPermission('billing.manage');
  }

  get iniciaisClinica(): string {
    const nome = this.nomeClinica?.trim();
    return nome ? nome.charAt(0).toUpperCase() : '?';
  }
  temaAtual = 'ocean-blue';
  modoEscuro = false;
  shellPresetAtual: ShellPreset = 'default';
  navLayoutAtual: NavLayout = 'sidebar';
  readonly shellPresetOptions = SHELL_PRESET_UI_OPTIONS;
  readonly navLayoutOptions = NAV_LAYOUT_UI_OPTIONS;
  /** Classes padrão do `z-avatar` (Zard) nos chips de perfil do header. */
  readonly avatarChipClass =
    'shrink-0 !bg-primary !text-primary-foreground [&>img]:object-cover [&>span]:text-[0.65rem] [&>span]:font-bold';
  themeDrawerMode: 'light' | 'dark' | 'auto' = 'light';
  sidebarColapsada = false;
  sidebarLogoSrc = '/assets/logo/logo.png';
  nomeUsuario = 'Usuário';
  iniciaisUsuario = 'U';
  emailUsuario = '';

  private appearanceSub?: Subscription;
  private clinicaSub?: Subscription;
  private _sysDarkMql: MediaQueryList | null = null;
  private _sysListener = () => this._applyAutoMode();

  @ViewChild('temaSheetContent') temaSheetTpl?: TemplateRef<void>;

  private auth = inject(AuthService);
  private router = inject(Router);
  private appearance = inject(UserAppearanceService);
  private sidebarMobile = inject(SidebarMobileService);
  private clinicaService = inject(ClinicaService);
  private readonly shellNavLayout = inject(ShellNavLayoutService);
  private readonly vcr = inject(ViewContainerRef);
  private readonly zardSheet = inject(ZardSheetService);
  private temaSheetRef?: ZardSheetRef<void>;

  ngOnInit(): void {
    this.syncTemaControlsFromBrowser();
    if (this.themeDrawerMode === 'auto') {
      this._applyAutoMode();
    }
    this.appearanceSub = this.auth.appearanceApplied$.subscribe(() => {
      this.syncTemaControlsFromBrowser();
      this.shellNavLayout.refresh();
    });
    this.syncMenuPermissoes();
    this.syncUsuarioInfo();
    this.syncClinicInfo();
    this.clinicaSub = this.clinicaService.clinicBrandingUpdated$.subscribe(() => this.syncClinicInfo());
  }

  ngOnDestroy(): void {
    this.temaSheetRef?.close();
    this.appearanceSub?.unsubscribe();
    this.clinicaSub?.unsubscribe();
    this._removeSysListener();
  }

  private syncUsuarioInfo(): void {
    const u = this.auth.getUser();
    if (u) {
      this.nomeUsuario = u.name || 'Usuário';
      this.emailUsuario = u.email || '';
      this.iniciaisUsuario = this.nomeUsuario.slice(0, 2).toUpperCase() || 'U';
    }
    this.sidebarLogoSrc = resolveSidebarLogoSrc();
  }

  private syncMenuPermissoes(): void {
    const u = this.auth.getUser();
    this.ehAdminPlataforma = u?.role === 'platform_admin';
    this.podeGerenciarClinica = u ? this.auth.hasPermission('organization.manage') : false;
  }

  private syncClinicInfo(): void {
    this.exibirTrocarEmpresa = this.auth.canSwitchClinic();
    const clinic = this.auth.getCurrentClinic();
    this.nomeClinica = clinic?.name ?? null;
    this.emailClinica = null;
    this.logoUrlClinica = null;
    if (!this.auth.getCurrentClinicId()) return;
    this.clinicaService.getConfiguracoes().subscribe({
      next: (config) => {
        this.nomeClinica = config.name ?? this.nomeClinica;
        this.emailClinica = config.contact_email ?? config.notification_email ?? config.email ?? null;
        const raw = config.logo_url;
        if (raw != null && String(raw).trim() !== '') {
          const abs = absoluteMediaUrl(String(raw));
          this.logoUrlClinica = abs ?? String(raw);
        } else {
          this.logoUrlClinica = null;
        }
      },
      error: () => {}
    });
  }

  /** Alinha estado do drawer com `body`/`localStorage` (inclui após `/me`). */
  private syncTemaControlsFromBrowser(): void {
    try {
      const saved = localStorage.getItem('gestgo_theme');
      if (saved) this.temaAtual = normalizeThemeKey(saved);
      else {
        const m = document.body.className.match(/theme-([a-z-]+)/);
        if (m) this.temaAtual = normalizeThemeKey(m[1]);
      }
      this.modoEscuro = document.body.classList.contains('dark') || localStorage.getItem('gestgo_dark_mode') === '1';
      const preferAuto = localStorage.getItem(GESTGO_APPEARANCE_MODE_LS) === 'auto';
      if (preferAuto) {
        this.themeDrawerMode = 'auto';
        this._ensureAutoListener();
      } else {
        this.themeDrawerMode = this.modoEscuro ? 'dark' : 'light';
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
      if (ls) {
        layout = normalizeNavLayout(ls);
      } else {
        layout = readNavLayoutFromDom();
      }
    } catch {
      layout = readNavLayoutFromDom();
    }

    const u = this.auth.getUser();
    const apiLayout = u?.ui_nav_layout;
    if (apiLayout != null && String(apiLayout).trim() !== '') {
      layout = normalizeNavLayout(apiLayout);
    }

    this.navLayoutAtual = layout;
    applyNavLayoutToDom(layout);
    this.shellNavLayout.refresh();
  }

  /** Alinha preset do shell com usuário logado ou localStorage. */
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

  private _applyAutoMode(): void {
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.modoEscuro = dark;
    document.body.classList.toggle('dark', dark);
    try { localStorage.setItem('gestgo_dark_mode', dark ? '1' : '0'); } catch {}
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

  alternarSidebar(): void {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    if (!isMobile && this.navLayoutAtual === 'horizontal') {
      return;
    }
    if (isMobile) {
      /* Igual ao backend: apenas alternar estado; sidebar/overlay reagem por classe no elemento */
      this.sidebarMobile.setOpen(!this.sidebarMobile.isOpen);
      return;
    }
    this.sidebarColapsada = !this.sidebarColapsada;
    document.body.classList.toggle('sidebar-collapsed', this.sidebarColapsada);
    try {
      localStorage.setItem('gestgo_sidebar_collapsed', this.sidebarColapsada ? '1' : '0');
    } catch {}
  }

  /** Define modo escuro (true) ou claro (false); usado no drawer de tema */
  aplicarModoEscuro(escuro: boolean): void {
    this.modoEscuro = escuro;
    document.body.classList.toggle('dark', this.modoEscuro);
    try {
      localStorage.setItem('gestgo_dark_mode', this.modoEscuro ? '1' : '0');
    } catch {}
    if (this.auth.isAuthenticated()) {
      this.appearance.patchAppearance({ ui_dark_mode: escuro }).subscribe({ error: () => {} });
    }
  }

  alternarMenuTema(): void {
    if (this.temaSheetRef) {
      this.temaSheetRef.close();
      return;
    }
    if (!this.temaSheetTpl) {
      return;
    }
    this.temaSheetRef = this.zardSheet.create<void, void>({
      zContent: this.temaSheetTpl,
      zViewContainerRef: this.vcr,
      zSide: 'right',
      zSize: 'custom',
      zWidth: '22.5rem',
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

  sair(): void {
    this.auth.logout().subscribe(() => this.router.navigate(['/autenticacao']));
  }

  aplicarTema(key: string): void {
    const canonical = normalizeThemeKey(key);
    const list = Array.from(document.body.classList).filter((c) => c.startsWith('theme-'));
    list.forEach((c) => document.body.classList.remove(c));
    document.body.classList.add('theme-' + canonical);
    this.temaAtual = canonical;
    try {
      localStorage.setItem('gestgo_theme', canonical);
    } catch {}
    if (this.auth.isAuthenticated()) {
      this.appearance.patchAppearance({ ui_theme: canonical }).subscribe({ error: () => {} });
    }
    this.auth.notifyAppearanceApplied();
  }

  aplicarShellPreset(preset: ShellPreset): void {
    const canonical = normalizeShellPreset(preset);
    this.shellPresetAtual = canonical;
    applyShellPresetToDom(canonical);
    this.auth.notifyAppearanceApplied();
    if (this.auth.isAuthenticated()) {
      this.appearance
        .patchAppearance({
          ui_shell_preset: canonical === 'default' ? null : canonical,
        })
        .subscribe({ error: () => {} });
    }
  }

  aplicarNavLayout(layout: NavLayout): void {
    const canonical = normalizeNavLayout(layout);
    this.navLayoutAtual = canonical;
    applyNavLayoutToDom(canonical);
    this.shellNavLayout.refresh();
    if (this.auth.isAuthenticated()) {
      this.appearance
        .patchAppearance({
          ui_nav_layout: canonical === 'sidebar' ? null : canonical,
        })
        .subscribe({ error: () => {} });
    }
  }
}
