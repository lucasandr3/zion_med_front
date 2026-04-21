import { Component, Input, OnInit, OnDestroy, inject, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { UserAppearanceService } from '../../../core/services/user-appearance.service';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';
import { ClinicaService } from '../../../core/services/clinica.service';
import { TooltipDirective } from '../../../core/directives/tooltip.directive';
import { normalizeThemeKey } from '../../../core/services/user-appearance.sync';
import { absoluteMediaUrl } from '../../../core/utils/absolute-media-url';

export const TEMAS: { key: string; label: string; labelPt: string; color: string }[] = [
  { key: 'gestgo-blue', label: 'Royal blue', labelPt: 'Azul Gestgo', color: '#1e40af' },
  { key: 'ocean-blue', label: 'Ocean Blue', labelPt: 'Azul oceano', color: '#1d4ed8' },
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

export interface AppBreadcrumb {
  label: string;
  url: string | null;
}

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [CommonModule, RouterLink, TooltipDirective],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css',
})
export class CabecalhoComponent implements OnInit, OnDestroy {
  @Input() titulo = 'Gestgo';
  /** Subtítulo exibido abaixo do título no header (ex.: "Visão geral dos clientes utilizando o Gestgo."). */
  @Input() subtitulo: string | null = null;
  /** Trilha opcional (Início → página atual). */
  @Input() breadcrumbs: AppBreadcrumb[] | null = null;
  @Input() urlVoltar: string | null = null;
  @Input() labelVoltar = 'Voltar';
  @Input() notificacoesNaoLidas = 0;
  /** Quando informado, o ícone de notificações no header usa esta rota (ex.: /plataforma/notificacoes). */
  @Input() notificacoesRouterLink = '/notificacoes';
  nomeClinica: string | null = null;
  emailClinica: string | null = null;
  logoUrlClinica: string | null = null;
  exibirTrocarEmpresa = false;
  menuEmpresaAberto = false;

  temas = TEMAS;

  /** Temas na ordem da grade de círculos (6 + 5). */
  get temasOrdemGrade(): { key: string; label: string; labelPt: string; color: string }[] {
    const byKey = new Map(this.temas.map((t) => [t.key, t]));
    return TEMAS_GRADE_ORDER.map((k) => byKey.get(k)).filter((t): t is (typeof TEMAS)[number] => t != null);
  }

  get temaAtualMeta(): (typeof TEMAS)[number] | undefined {
    return this.temas.find((t) => t.key === this.temaAtual);
  }

  /** Ícone de notificações só para quem tem permissão no contexto atual (tenant ou plataforma). */
  get podeVerNotificacoesNoHeader(): boolean {
    return this.auth.hasPermission('notifications.access');
  }

  get podeVerBillingNoHeader(): boolean {
    return this.auth.hasPermission('billing.manage');
  }
  temaAtual = 'ocean-blue';
  modoEscuro = false;
  themeDrawerMode: 'light' | 'dark' | 'auto' = 'light';
  sidebarColapsada = false;
  menuTemaAberto = false;

  private appearanceSub?: Subscription;
  private clinicaSub?: Subscription;
  private _sysDarkMql: MediaQueryList | null = null;
  private _sysListener = () => this._applyAutoMode();

  @ViewChild('themePicker') themePickerRef?: ElementRef<HTMLElement>;
  @ViewChild('clinicMenuContainer') clinicMenuContainer?: ElementRef<HTMLElement>;

  private auth = inject(AuthService);
  private router = inject(Router);
  private appearance = inject(UserAppearanceService);
  private sidebarMobile = inject(SidebarMobileService);
  private clinicaService = inject(ClinicaService);

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: Event): void {
    const target = e.target as Node;

    if (this.menuTemaAberto) {
      const themeEl = this.themePickerRef?.nativeElement;
      if (!themeEl || !themeEl.contains(target)) {
        this.fecharMenuTema();
      }
    }

    if (this.menuEmpresaAberto) {
      const clinicEl = this.clinicMenuContainer?.nativeElement;
      if (!clinicEl || !clinicEl.contains(target)) {
        this.fecharMenuEmpresa();
      }
    }
  }

  ngOnInit(): void {
    this.syncTemaControlsFromBrowser();
    this.appearanceSub = this.auth.appearanceApplied$.subscribe(() => this.syncTemaControlsFromBrowser());
    this.syncClinicInfo();
    this.clinicaSub = this.clinicaService.clinicBrandingUpdated$.subscribe(() => this.syncClinicInfo());
  }

  ngOnDestroy(): void {
    this.appearanceSub?.unsubscribe();
    this.clinicaSub?.unsubscribe();
    this._removeSysListener();
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
      this.themeDrawerMode = this.modoEscuro ? 'dark' : 'light';
    } catch {}
  }

  aplicarModoTema(mode: 'light' | 'dark' | 'auto'): void {
    this.themeDrawerMode = mode;
    if (mode === 'auto') {
      this._sysDarkMql = window.matchMedia('(prefers-color-scheme: dark)');
      this._sysDarkMql.addEventListener('change', this._sysListener);
      this._applyAutoMode();
    } else {
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

  private _removeSysListener(): void {
    this._sysDarkMql?.removeEventListener('change', this._sysListener);
    this._sysDarkMql = null;
  }

  alternarSidebar(): void {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
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
    this.menuTemaAberto = !this.menuTemaAberto;
  }

  fecharMenuTema(): void {
    this.menuTemaAberto = false;
  }

  alternarMenuEmpresa(): void {
    this.menuEmpresaAberto = !this.menuEmpresaAberto;
  }

  fecharMenuEmpresa(): void {
    this.menuEmpresaAberto = false;
  }

  sair(): void {
    this.menuEmpresaAberto = false;
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
  }
}
