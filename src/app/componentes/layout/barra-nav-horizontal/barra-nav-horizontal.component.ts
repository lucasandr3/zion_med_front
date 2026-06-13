import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { ZardMenuImports } from '@/shared/components/menu/menu.imports';
import {
  SHELL_NAV_APP_SECTIONS,
  SHELL_NAV_APP_STANDALONE,
  SHELL_NAV_PLATAFORMA_SECTIONS,
  SHELL_NAV_PLATAFORMA_STANDALONE,
  shellNavItemVisivel,
  type ShellNavItem,
  type ShellNavSectionView,
} from '../shell-nav.config';

@Component({
  selector: 'app-barra-nav-horizontal',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ZardBadgeComponent, ...ZardMenuImports],
  templateUrl: './barra-nav-horizontal.component.html',
  styleUrl: './barra-nav-horizontal.component.css',
})
export class BarraNavHorizontalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() context: 'app' | 'plataforma' = 'app';
  @Input() notificacoesNaoLidas = 0;

  secoesVisiveis: ShellNavSectionView[] = [];
  avulsosVisiveis: ShellNavItem[] = [];

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private appearanceSub?: Subscription;
  private routerSub?: Subscription;

  ngOnInit(): void {
    this.atualizarMenu();
    this.appearanceSub = this.auth.appearanceApplied$.subscribe(() => this.atualizarMenu());
    this.routerSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.atualizarMenu());
    queueMicrotask(() => this.atualizarMenu());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['context']) {
      this.atualizarMenu();
    }
  }

  ngOnDestroy(): void {
    this.appearanceSub?.unsubscribe();
    this.routerSub?.unsubscribe();
  }

  secaoAtiva(secao: ShellNavSectionView): boolean {
    const path = this.pathAtual();
    return secao.visibleItems.some((item) => this.rotaAtiva(item.route, !!item.exact, path));
  }

  linkAtivo(item: ShellNavItem): boolean {
    return this.rotaAtiva(item.route, !!item.exact, this.pathAtual());
  }

  private atualizarMenu(): void {
    const secoes = this.context === 'plataforma' ? SHELL_NAV_PLATAFORMA_SECTIONS : SHELL_NAV_APP_SECTIONS;
    const avulsos = this.context === 'plataforma' ? SHELL_NAV_PLATAFORMA_STANDALONE : SHELL_NAV_APP_STANDALONE;

    this.secoesVisiveis = secoes
      .map((secao) => ({
        ...secao,
        visibleItems: secao.items.filter((item) =>
          shellNavItemVisivel(item, (p) => this.auth.hasPermission(p), this.context),
        ),
      }))
      .filter((secao) => secao.visibleItems.length > 0);

    this.avulsosVisiveis = avulsos.filter((item) =>
      shellNavItemVisivel(item, (p) => this.auth.hasPermission(p), this.context),
    );
  }

  private pathAtual(): string {
    return this.router.url.split('?')[0].replace(/\/$/, '') || '/';
  }

  private rotaAtiva(route: string, exact: boolean, path: string): boolean {
    const alvo = route.replace(/\/$/, '') || '/';
    if (exact) return path === alvo;
    return path === alvo || path.startsWith(alvo + '/');
  }
}
