import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { ZardSkeletonComponent } from '@/shared/components/skeleton';
import { ZardTableImports } from '@/shared/components/table';
import {
  applyShellPresetToDom,
  applyUserAppearanceToBrowser,
  normalizeShellPreset,
  type ShellPreset,
} from '../../core/services/user-appearance.sync';
import { ZmEmptyStateComponent, ZmPaginationComponent } from '../../shared/components/ui';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';

interface TokenSwatch {
  token: string;
  label: string;
}

interface ThemeOption {
  id: string;
  label: string;
}

@Component({
  selector: 'app-dev-ui',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ZardBadgeComponent,
    ZardButtonComponent,
    ZardCardComponent,
    ZardInputDirective,
    ZardSkeletonComponent,
    ZmEmptyStateComponent,
    ZmPaginationComponent,
    ZmSkeletonListComponent,
    ...ZardTableImports,
  ],
  templateUrl: './dev-ui.component.html',
  styleUrl: './dev-ui.component.css',
})
export class DevUiComponent {
  private readonly platformId = inject(PLATFORM_ID);

  readonly paginationPage = signal(2);
  readonly paginationLast = signal(8);

  readonly themeOptions: ThemeOption[] = [
    { id: 'ocean-blue', label: 'Ocean Blue (padrão)' },
    { id: 'gestgo-blue', label: 'Gestgo Blue' },
    { id: 'indigo-night', label: 'Indigo Night' },
    { id: 'emerald-fresh', label: 'Emerald Fresh' },
    { id: 'rose-elegant', label: 'Rose Elegant' },
    { id: 'amber-warm', label: 'Amber Warm' },
    { id: 'violet-dream', label: 'Violet Dream' },
    { id: 'teal-ocean', label: 'Teal Ocean' },
    { id: 'slate-pro', label: 'Slate Pro' },
    { id: 'cyan-tech', label: 'Cyan Tech' },
    { id: 'fuchsia-bold', label: 'Fuchsia Bold' },
  ];

  readonly shellPresets: { id: ShellPreset; label: string }[] = [
    { id: 'default', label: 'Padrão' },
    { id: 'tinted', label: 'Topo e marca' },
    { id: 'sidebar_dark', label: 'Menu escuro' },
  ];

  readonly surfaceTokens: TokenSwatch[] = [
    { token: '--c-bg', label: 'bg' },
    { token: '--c-surface', label: 'surface' },
    { token: '--c-elevated', label: 'elevated' },
    { token: '--c-soft', label: 'soft' },
    { token: '--c-text', label: 'text' },
    { token: '--c-muted', label: 'muted' },
    { token: '--c-border', label: 'border' },
    { token: '--c-primary', label: 'primary' },
    { token: '--c-accent', label: 'accent' },
  ];

  readonly semanticTokens: TokenSwatch[] = [
    { token: '--c-success', label: 'success' },
    { token: '--c-success-soft', label: 'success-soft' },
    { token: '--c-warning', label: 'warning' },
    { token: '--c-warning-soft', label: 'warning-soft' },
    { token: '--c-danger', label: 'danger' },
    { token: '--c-danger-soft', label: 'danger-soft' },
    { token: '--c-info', label: 'info' },
    { token: '--c-info-soft', label: 'info-soft' },
  ];

  readonly typographySamples = [
    { cls: 'dev-ui-type-xs', label: '--text-xs · 11px', sample: 'Label uppercase' },
    { cls: 'dev-ui-type-sm', label: '--text-sm · 13px', sample: 'Células e botões compactos' },
    { cls: 'dev-ui-type-base', label: '--text-base · 14px', sample: 'Corpo de formulário' },
    { cls: 'dev-ui-type-md', label: '--text-md · 16px', sample: 'Valores destacados' },
    { cls: 'dev-ui-type-lg', label: '--text-lg · 18px', sample: 'Subtítulos e preços' },
    { cls: 'dev-ui-type-2xl', label: '--text-2xl · 24px', sample: 'Título de página' },
  ];

  selectedTheme = 'ocean-blue';
  isDark = false;
  selectedShell: ShellPreset = 'default';

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const body = document.body;
    this.isDark = body.classList.contains('dark');
    const themeClass = Array.from(body.classList).find((c) => c.startsWith('theme-'));
    if (themeClass) {
      this.selectedTheme = themeClass.replace('theme-', '');
    }
    if (body.classList.contains('shell-preset-tinted')) {
      this.selectedShell = 'tinted';
    } else if (body.classList.contains('shell-preset-sidebar-dark')) {
      this.selectedShell = 'sidebar_dark';
    }
  }

  onThemeChange(theme: string): void {
    this.selectedTheme = theme;
    applyUserAppearanceToBrowser({ ui_theme: theme });
  }

  toggleDark(): void {
    this.isDark = !this.isDark;
    applyUserAppearanceToBrowser({ ui_dark_mode: this.isDark });
  }

  onShellChange(preset: ShellPreset): void {
    this.selectedShell = preset;
    applyShellPresetToDom(normalizeShellPreset(preset));
  }

  onPageChange(page: number): void {
    this.paginationPage.set(page);
  }
}
