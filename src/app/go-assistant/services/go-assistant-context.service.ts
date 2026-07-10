import { Injectable, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { getAllScreens, getIntentById, getScreenById } from '../data';
import type { AssistantContext, AssistantIntent, AssistantScreen } from '../models/assistant.types';
import { canAccessByPermissions } from '../utils/permission-filter';
import { matchRoutePattern, normalizeRoutePath } from '../utils/route-matcher';
import { GoAssistantApiService } from './go-assistant-api.service';

@Injectable({ providedIn: 'root' })
export class GoAssistantContextService {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly api = inject(GoAssistantApiService);

  private readonly routeSignal = signal(normalizeRoutePath(this.router.url));
  private lastTrackedScreenId: string | null = null;

  readonly context = computed<AssistantContext>(() => {
    const route = this.routeSignal();
    const screenId = matchRoutePattern(route, getAllScreens());
    const screen = screenId ? getScreenById(screenId) ?? null : null;
    return {
      route,
      screen,
      moduleId: screen?.moduleId ?? null,
    };
  });

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const path = normalizeRoutePath(e.urlAfterRedirects || e.url);
        this.routeSignal.set(path);
        this.trackScreenIfKnown(path);
      });

    // Garante tracking da rota já ativa ao criar o serviço.
    this.trackScreenIfKnown(normalizeRoutePath(this.router.url));
  }

  private trackScreenIfKnown(path: string): void {
    if (!this.auth.isAuthenticated()) {
      return;
    }
    const screenId = matchRoutePattern(path, getAllScreens());
    const screen = screenId ? getScreenById(screenId) : undefined;
    if (!screen || screen.id === this.lastTrackedScreenId) {
      return;
    }
    this.lastTrackedScreenId = screen.id;
    this.api
      .recordEvent({
        kind: 'screen',
        screen_id: screen.id,
        route: path,
        title: screen.title,
      })
      .subscribe({ error: () => {} });
  }

  currentScreen(): AssistantScreen | null {
    return this.context().screen;
  }

  contextualIntents(): AssistantIntent[] {
    const screen = this.currentScreen();
    if (!screen) {
      return [];
    }
    return screen.quickAskIntentIds
      .map((id) => getIntentById(id))
      .filter((intent): intent is AssistantIntent => !!intent && this.canSeeIntent(intent));
  }

  canSeeIntent(intent: AssistantIntent): boolean {
    return canAccessByPermissions(
      intent.permissionsAny,
      (key) => this.auth.hasPermission(key),
      this.auth.getUser()?.role === 'platform_admin',
    );
  }

  canSeeScreen(screen: AssistantScreen): boolean {
    return canAccessByPermissions(
      screen.permissionsAny,
      (key) => this.auth.hasPermission(key),
      this.auth.getUser()?.role === 'platform_admin',
    );
  }
}
