import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getTourByScreenId } from '../data';
import type { AssistantAction, AssistantIntent } from '../models/assistant.types';
import { GoAssistantActionService } from '../services/go-assistant-action.service';
import { GoAssistantContextService } from '../services/go-assistant-context.service';
import { GoAssistantShellService } from '../services/go-assistant-shell.service';
import { GoAssistantTourService } from '../services/go-assistant-tour.service';

@Component({
  selector: 'go-assistant-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './go-assistant-drawer.component.html',
  styleUrl: './go-assistant-drawer.component.css',
})
export class GoAssistantDrawerComponent {
  readonly shell = inject(GoAssistantShellService);
  readonly context = inject(GoAssistantContextService);
  readonly actions = inject(GoAssistantActionService);
  readonly tour = inject(GoAssistantTourService);

  readonly screenTitle = computed(() => this.context.currentScreen()?.title ?? 'Gestgo');
  readonly contextualIntents = computed(() => this.context.contextualIntents());
  readonly hasTour = computed(() => {
    const screen = this.context.currentScreen();
    return !!(screen && (screen.tourId || getTourByScreenId(screen.id)));
  });

  onSearchInput(value: string): void {
    this.shell.onQueryChange(value);
  }

  openIntent(intent: AssistantIntent): void {
    this.shell.openIntent(intent);
  }

  runAction(action: AssistantAction, intent?: AssistantIntent): void {
    this.actions.run(action, intent);
    if (action.type === 'navigate' || action.type === 'navigate-create' || action.type === 'start-tour') {
      this.shell.close();
    }
  }

  startTour(): void {
    const screen = this.context.currentScreen();
    this.tour.start(screen?.tourId);
    this.shell.close();
  }

  visibleActions(intent: AssistantIntent): AssistantAction[] {
    return intent.actions.filter((a) => this.actions.canRun(a));
  }
}
