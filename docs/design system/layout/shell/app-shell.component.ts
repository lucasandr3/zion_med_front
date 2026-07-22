import { DatePipe } from '@angular/common';
import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../core/services/auth.service';
import {
  NotificationService,
  UserNotificationItem,
} from '../../core/services/notification.service';
import { HelpAssistantService } from '../../features/help-assistant/help-assistant.service';
import { ScreenService } from '../../shared/services/screen.service';
import { TemaUtil } from '../../shared/utils/tema.util';

function matchesShellMobile(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 959.98px)').matches;
}

interface NavItem {
  label: string;
  route: string;
  icon: string;
  iconSet?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

@Component({
  selector: 'up-app-shell',
  imports: [
    DatePipe,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
  host: {
    class: 'up-app-shell',
  },
})
export class AppShellComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly temaUtil = inject(TemaUtil);
  private readonly helpAssistant = inject(HelpAssistantService);
  private readonly notificationsApi = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly screen = inject(ScreenService);

  readonly pageTitle = input('');
  readonly empresaNome = input('Gestgo');
  readonly logout = output<void>();

  readonly sidenavOpened = signal(!matchesShellMobile());

  readonly isDark = this.temaUtil.isDark;
  readonly themeToggleIcon = computed(() => (this.isDark() ? 'light_mode' : 'dark_mode'));
  readonly isMobile = this.screen.isMobile;
  readonly sidenavMode = this.screen.sidenavMode;

  readonly usuarioNome = computed(() => this.auth.user()?.name ?? 'Usuário');
  readonly usuarioEmail = computed(() => this.auth.user()?.email ?? '');
  readonly isAdmin = this.auth.isAdmin;
  readonly headerLabel = computed(() => this.pageTitle() || this.empresaNome());

  readonly notifications = signal<UserNotificationItem[]>([]);
  readonly unreadCount = signal(0);
  readonly notificationsLoading = signal(false);

  constructor() {
    effect(() => {
      this.sidenavOpened.set(!this.isMobile());
    });
  }

  readonly navSections = computed<NavSection[]>(() => {
    const sections: NavSection[] = [
      {
        title: 'Principal',
        items: [
          { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
          { label: 'Relatórios', route: '/relatorios', icon: 'bar_chart' },
          { label: 'Biblioteca', route: '/biblioteca', icon: 'app_registration' },
          {
            label: 'Agendamentos',
            route: '/agendamentos',
            icon: 'acute',
            iconSet: 'material-symbols-outlined',
          },
        ],
      },
      {
        title: 'Dados',
        items: [
          {
            label: 'Fontes dos Dados',
            route: '/fontes-dados',
            icon: 'database_search',
            iconSet: 'material-symbols-outlined',
          },
          {
            label: 'Relatórios vinculados',
            route: '/vinculos',
            icon: 'linked_services',
            iconSet: 'material-symbols-outlined',
          },
        ],
      },
    ];

    if (this.isAdmin()) {
      sections.push({
        title: 'Administração',
        items: [
          { label: 'Usuários', route: '/usuarios', icon: 'group' },
          { label: 'Permissões', route: '/permissoes', icon: 'admin_panel_settings' },
          { label: 'API Keys', route: '/api-keys', icon: 'vpn_key' },
          // OAuth Clients fica oculto na sidebar (uso avançado via /oauth-clients)
        ],
      });
    }

    return sections;
  });

  readonly userInitials = computed(() => {
    const parts = this.usuarioNome().trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) {
      return 'U';
    }
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  });

  ngOnInit(): void {
    this.refreshUnread();
  }

  onNavClick(): void {
    if (this.isMobile()) {
      this.sidenavOpened.set(false);
    }
  }

  onSidenavOpenedChange(opened: boolean): void {
    this.sidenavOpened.set(opened);
  }

  toggleTheme(): void {
    this.temaUtil.toggleColorScheme();
  }

  openHelp(): void {
    this.helpAssistant.show();
  }

  openHelpFromMenu(trigger: MatMenuTrigger): void {
    trigger.closeMenu();
    this.openHelp();
  }

  openMyAccount(trigger: MatMenuTrigger): void {
    trigger.closeMenu();
    const userId = this.auth.user()?.id;
    if (userId && this.isAdmin()) {
      void this.router.navigate(['/usuarios', userId, 'editar']);
    }
  }

  openSettings(trigger: MatMenuTrigger): void {
    trigger.closeMenu();
    if (this.isAdmin()) {
      void this.router.navigate(['/permissoes']);
    }
  }

  onNotificationsMenuOpened(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationsLoading.set(true);
    this.notificationsApi.list(1, 15).subscribe({
      next: (res) => {
        this.notifications.set(res.data);
        this.unreadCount.set(res.meta.unread);
        this.notificationsLoading.set(false);
      },
      error: () => {
        this.notificationsLoading.set(false);
      },
    });
  }

  refreshUnread(): void {
    this.notificationsApi.summary().subscribe({
      next: (summary) => this.unreadCount.set(summary.unread),
      error: () => this.unreadCount.set(0),
    });
  }

  markAllRead(event: Event): void {
    event.stopPropagation();
    this.notificationsApi.markAllRead().subscribe({
      next: () => {
        this.unreadCount.set(0);
        this.notifications.update((items) =>
          items.map((item) => ({ ...item, is_read: true, read_at: new Date().toISOString() })),
        );
      },
    });
  }

  openNotification(item: UserNotificationItem, trigger: MatMenuTrigger): void {
    const go = (): void => {
      trigger.closeMenu();
      const route = item.payload?.['route'];
      if (typeof route === 'string' && route.startsWith('/')) {
        void this.router.navigateByUrl(route);
      }
    };

    if (!item.is_read) {
      this.notificationsApi.markRead(item.id).subscribe({
        next: () => {
          this.unreadCount.update((n) => Math.max(0, n - 1));
          this.notifications.update((items) =>
            items.map((n) =>
              n.id === item.id ? { ...n, is_read: true, read_at: new Date().toISOString() } : n,
            ),
          );
          go();
        },
        error: () => go(),
      });
      return;
    }

    go();
  }

  levelIcon(level: string): string {
    return (
      (
        {
          success: 'check_circle',
          error: 'error',
          warning: 'warning',
          info: 'info',
        } as Record<string, string>
      )[level] ?? 'notifications'
    );
  }

  onLogout(): void {
    this.logout.emit();
    this.auth.logout();
  }
}
