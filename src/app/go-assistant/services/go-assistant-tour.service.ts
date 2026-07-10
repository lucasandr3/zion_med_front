import { Injectable, computed, inject, signal } from '@angular/core';
import { getTourById, getTourByScreenId } from '../data';
import type { AssistantTour, AssistantTourStep } from '../models/assistant.types';
import { GoAssistantApiService } from './go-assistant-api.service';
import { GoAssistantContextService } from './go-assistant-context.service';

export interface ActiveTourState {
  tour: AssistantTour;
  stepIndex: number;
  step: AssistantTourStep;
  targetRect: DOMRect | null;
}

@Injectable({ providedIn: 'root' })
export class GoAssistantTourService {
  private readonly api = inject(GoAssistantApiService);
  private readonly context = inject(GoAssistantContextService);

  private readonly active = signal<ActiveTourState | null>(null);

  readonly isActive = computed(() => this.active() !== null);
  readonly state = this.active.asReadonly();

  start(tourId?: string | null): void {
    const screen = this.context.currentScreen();
    const tour = tourId
      ? getTourById(tourId)
      : screen
        ? getTourByScreenId(screen.id)
        : undefined;

    if (!tour || tour.steps.length === 0) {
      return;
    }

    this.api
      .recordEvent({
        kind: 'tour',
        screen_id: tour.screenId,
        title: `Tour: ${tour.id}`,
        meta: { tour_id: tour.id, action: 'start' },
      })
      .subscribe({ error: () => {} });

    this.goToStep(tour, 0);
  }

  next(): void {
    const current = this.active();
    if (!current) return;
    const nextIndex = current.stepIndex + 1;
    if (nextIndex >= current.tour.steps.length) {
      this.finish();
      return;
    }
    this.goToStep(current.tour, nextIndex);
  }

  prev(): void {
    const current = this.active();
    if (!current || current.stepIndex <= 0) return;
    this.goToStep(current.tour, current.stepIndex - 1);
  }

  skip(): void {
    const current = this.active();
    if (current) {
      this.api
        .recordEvent({
          kind: 'tour',
          screen_id: current.tour.screenId,
          title: `Tour: ${current.tour.id}`,
          meta: { tour_id: current.tour.id, action: 'skip', step: current.stepIndex },
        })
        .subscribe({ error: () => {} });
    }
    this.active.set(null);
  }

  finish(): void {
    const current = this.active();
    if (current) {
      this.api
        .recordEvent({
          kind: 'tour',
          screen_id: current.tour.screenId,
          title: `Tour: ${current.tour.id}`,
          meta: { tour_id: current.tour.id, action: 'complete' },
        })
        .subscribe({ error: () => {} });
    }
    this.active.set(null);
  }

  private goToStep(tour: AssistantTour, stepIndex: number): void {
    const step = tour.steps[stepIndex];
    if (!step) {
      this.active.set(null);
      return;
    }
    const el = typeof document !== 'undefined' ? document.querySelector(step.selector) : null;
    const targetRect = el instanceof HTMLElement ? el.getBoundingClientRect() : null;
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
    this.active.set({ tour, stepIndex, step, targetRect });
  }
}
