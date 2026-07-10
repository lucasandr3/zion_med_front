import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import type { AssistantAction, AssistantIntent } from '../models/assistant.types';
import { GoAssistantApiService } from './go-assistant-api.service';
import { GoAssistantTourService } from './go-assistant-tour.service';

@Injectable({ providedIn: 'root' })
export class GoAssistantActionService {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly api = inject(GoAssistantApiService);
  private readonly tour = inject(GoAssistantTourService);

  canRun(action: AssistantAction): boolean {
    if (!action.permission) {
      return true;
    }
    if (action.permission === 'platform_admin') {
      return this.auth.getUser()?.role === 'platform_admin';
    }
    return this.auth.hasPermission(action.permission);
  }

  run(action: AssistantAction, intent?: AssistantIntent): void {
    if (!this.canRun(action)) {
      return;
    }

    this.api
      .recordEvent({
        kind: 'action',
        intent_id: intent?.id ?? null,
        title: action.label,
        route: action.route ?? null,
        meta: { action_id: action.id, action_type: action.type },
      })
      .subscribe({ error: () => {} });

    switch (action.type) {
      case 'navigate':
      case 'navigate-create':
        if (action.route) {
          void this.router.navigateByUrl(action.route);
        }
        break;
      case 'start-tour':
        this.tour.start(action.tourId ?? intent?.actions.find((a) => a.type === 'start-tour')?.tourId);
        break;
      case 'external':
        if (action.route && typeof window !== 'undefined') {
          window.open(action.route, '_blank', 'noopener');
        }
        break;
    }
  }
}
