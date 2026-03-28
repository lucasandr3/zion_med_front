import { Component, Input, OnInit, inject, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';
import { TooltipDirective } from '../../../core/directives/tooltip.directive';

export const TEMAS: { key: string; label: string; labelPt: string; color: string }[] = [
  { key: 'zion-blue', label: 'Zion Blue', labelPt: 'Azul royal', color: '#1e40af' },
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
  'zion-blue',
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
  imports: [CommonModule, RouterLink, TooltipDirective],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css',
})
export class CabecalhoComponent implements OnInit {
  @Input() titulo = 'Gestgo';
  /** Subtítulo exibido abaixo do título no header (ex.: "Visão geral dos clientes utilizando o Gestgo."). */
  @Input() subtitulo: string | null = null;
  @Input() urlVoltar: string | null = null;
  @Input() labelVoltar = 'Voltar';
  @Input() notificacoesNaoLidas = 0;
  /** Quando informado, o ícone de notificações no header usa esta rota (ex.: /plataforma/notificacoes). */
  @Input() notificacoesRouterLink = '/notificacoes';

  temas = TEMAS;

  /** Temas na ordem da grade de círculos (6 + 5). */
  get temasOrdemGrade(): { key: string; label: string; labelPt: string; color: string }[] {
    const byKey = new Map(this.temas.map((t) => [t.key, t]));
    return TEMAS_GRADE_ORDER.map((k) => byKey.get(k)).filter((t): t is (typeof TEMAS)[number] => t != null);
  }

  get temaAtualMeta(): (typeof TEMAS)[number] | undefined {
    return this.temas.find((t) => t.key === this.temaAtual);
  }
  temaAtual = 'ocean-blue';
  modoEscuro = false;
  sidebarColapsada = false;
  menuTemaAberto = false;

  @ViewChild('themePicker') themePickerRef?: ElementRef<HTMLElement>;

  private auth = inject(AuthService);
  private router = inject(Router);
  private sidebarMobile = inject(SidebarMobileService);

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: Event): void {
    if (!this.menuTemaAberto) return;
    const el = this.themePickerRef?.nativeElement;
    if (el && el.contains(e.target as Node)) return;
    this.fecharMenuTema();
  }

  ngOnInit(): void {
    try {
      const saved = localStorage.getItem('gestgo_theme');
      if (saved) this.temaAtual = saved;
      else {
        const m = document.body.className.match(/theme-([a-z-]+)/);
        if (m) this.temaAtual = m[1];
      }
      this.modoEscuro = document.body.classList.contains('dark') || localStorage.getItem('gestgo_dark_mode') === '1';
    } catch {}
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
  }

  alternarMenuTema(): void {
    this.menuTemaAberto = !this.menuTemaAberto;
  }

  fecharMenuTema(): void {
    this.menuTemaAberto = false;
  }

  aplicarTema(key: string): void {
    const list = Array.from(document.body.classList).filter((c) => c.startsWith('theme-'));
    list.forEach((c) => document.body.classList.remove(c));
    document.body.classList.add('theme-' + key);
    this.temaAtual = key;
    try {
      localStorage.setItem('gestgo_theme', key);
    } catch {}
  }

  sair(): void {
    this.auth.logout().subscribe(() => this.router.navigate(['/autenticacao']));
  }
}
