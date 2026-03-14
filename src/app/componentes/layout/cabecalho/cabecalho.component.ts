import { Component, Input, OnInit, inject, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarMobileService } from '../../../core/services/sidebar-mobile.service';

export const TEMAS: { key: string; label: string; color: string }[] = [
  { key: 'zion-blue', label: 'Zion Blue', color: '#1e40af' },
  { key: 'ocean-blue', label: 'Ocean Blue', color: '#2563eb' },
  { key: 'indigo-night', label: 'Indigo Night', color: '#4f46e5' },
  { key: 'emerald-fresh', label: 'Emerald Fresh', color: '#10b981' },
  { key: 'rose-elegant', label: 'Rose Elegant', color: '#f43f5e' },
  { key: 'amber-warm', label: 'Amber Warm', color: '#f59e0b' },
  { key: 'violet-dream', label: 'Violet Dream', color: '#8b5cf6' },
  { key: 'teal-ocean', label: 'Teal Ocean', color: '#14b8a6' },
  { key: 'slate-pro', label: 'Slate Pro', color: '#475569' },
  { key: 'cyan-tech', label: 'Cyan Tech', color: '#06b6d4' },
  { key: 'fuchsia-bold', label: 'Fuchsia Bold', color: '#d946ef' },
];

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css',
})
export class CabecalhoComponent implements OnInit {
  @Input() titulo = 'Zion Med';
  @Input() urlVoltar: string | null = null;
  @Input() labelVoltar = 'Voltar';
  @Input() notificacoesNaoLidas = 0;

  temas = TEMAS;
  /** Coluna esquerda: Zion Blue, Indigo Night, Rose Elegant, Violet Dream, Slate Pro, Fuchsia Bold */
  get temasCol1() {
    return [this.temas[0], this.temas[2], this.temas[4], this.temas[6], this.temas[8], this.temas[10]];
  }
  /** Coluna direita: Ocean Blue, Emerald Fresh, Amber Warm, Teal Ocean, Cyan Tech */
  get temasCol2() {
    return [this.temas[1], this.temas[3], this.temas[5], this.temas[7], this.temas[9]];
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
      const saved = localStorage.getItem('zionmed_theme');
      if (saved) this.temaAtual = saved;
      else {
        const m = document.body.className.match(/theme-([a-z-]+)/);
        if (m) this.temaAtual = m[1];
      }
      this.modoEscuro = document.body.classList.contains('dark') || localStorage.getItem('zionmed_dark_mode') === '1';
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
      localStorage.setItem('zionmed_sidebar_collapsed', this.sidebarColapsada ? '1' : '0');
    } catch {}
  }

  /** Define modo escuro (true) ou claro (false); usado no drawer de tema */
  aplicarModoEscuro(escuro: boolean): void {
    this.modoEscuro = escuro;
    document.body.classList.toggle('dark', this.modoEscuro);
    try {
      localStorage.setItem('zionmed_dark_mode', this.modoEscuro ? '1' : '0');
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
    this.menuTemaAberto = false;
    try {
      localStorage.setItem('zionmed_theme', key);
    } catch {}
  }

  sair(): void {
    this.auth.logout().subscribe(() => this.router.navigate(['/autenticacao']));
  }
}
