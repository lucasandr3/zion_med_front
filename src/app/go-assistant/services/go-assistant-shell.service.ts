import { Injectable, inject, signal } from '@angular/core';
import { Subscription, finalize, timeout } from 'rxjs';
import { getIntentById, getScreenById } from '../data';
import type {
  AssistantDrawerView,
  AssistantIntent,
  GoAssistantHistoryItem,
  GoAssistantPopularItem,
} from '../models/assistant.types';
import { GoAssistantApiService } from './go-assistant-api.service';
import { GoAssistantContextService } from './go-assistant-context.service';
import { GoAssistantSearchService } from './go-assistant-search.service';

@Injectable({ providedIn: 'root' })
export class GoAssistantShellService {
  private readonly api = inject(GoAssistantApiService);
  private readonly context = inject(GoAssistantContextService);
  private readonly search = inject(GoAssistantSearchService);

  private historySub?: Subscription;
  private popularSub?: Subscription;

  readonly open = signal(false);
  readonly view = signal<AssistantDrawerView>({ kind: 'home' });
  readonly query = signal('');
  readonly history = signal<GoAssistantHistoryItem[]>([]);
  readonly popular = signal<GoAssistantPopularItem[]>([]);
  readonly loadingHistory = signal(false);

  toggle(): void {
    if (this.open()) {
      this.close();
    } else {
      this.show();
    }
  }

  show(): void {
    this.open.set(true);
    this.view.set({ kind: 'home' });
    this.query.set('');
    this.refreshSideData(true);
  }

  close(): void {
    this.open.set(false);
  }

  /**
   * @param showLoading quando false, atualiza em silêncio (ex.: após abrir um tutorial)
   */
  refreshSideData(showLoading = true): void {
    this.historySub?.unsubscribe();
    this.popularSub?.unsubscribe();

    if (showLoading) {
      this.loadingHistory.set(true);
    }

    this.historySub = this.api
      .getHistory(12)
      .pipe(
        timeout({ first: 10000 }),
        finalize(() => this.loadingHistory.set(false)),
      )
      .subscribe({
        next: (items) => this.history.set(items),
        error: () => this.history.set([]),
      });

    this.popularSub = this.api.getPopular(8).subscribe({
      next: (items) => this.popular.set(items),
      error: () => this.popular.set([]),
    });
  }

  onQueryChange(value: string): void {
    this.query.set(value);
    const trimmed = value.trim();
    if (!trimmed) {
      this.view.set({ kind: 'home' });
      return;
    }
    const hits = this.search.search(trimmed);
    if (hits.length === 0) {
      this.api
        .recordEvent({
          kind: 'no_match',
          query: trimmed,
          route: this.context.context().route,
          screen_id: this.context.currentScreen()?.id ?? null,
        })
        .subscribe();
      this.view.set({
        kind: 'empty',
        query: trimmed,
        suggestions: this.search.suggestWhenEmpty(5),
      });
      return;
    }
    this.api
      .recordEvent({
        kind: 'search',
        query: trimmed,
        route: this.context.context().route,
        screen_id: this.context.currentScreen()?.id ?? null,
        meta: { hits: hits.length },
      })
      .subscribe();
    this.view.set({ kind: 'search', query: trimmed, hits });
  }

  openIntent(intent: AssistantIntent): void {
    this.view.set({ kind: 'intent', intent });
    this.api
      .recordEvent({
        kind: 'intent',
        intent_id: intent.id,
        title: intent.title,
        screen_id: this.context.currentScreen()?.id ?? null,
        route: this.context.context().route,
      })
      .subscribe({
        next: () => this.refreshSideData(false),
      });
  }

  openIntentById(intentId: string): void {
    const intent = getIntentById(intentId);
    if (intent && this.context.canSeeIntent(intent)) {
      this.openIntent(intent);
    }
  }

  openHistoryItem(item: GoAssistantHistoryItem): void {
    if (item.kind === 'intent' && item.intent_id) {
      this.openIntentById(item.intent_id);
      return;
    }
    if (item.kind === 'screen' && item.screen_id) {
      const screen = getScreenById(item.screen_id);
      if (screen?.quickAskIntentIds[0]) {
        this.openIntentById(screen.quickAskIntentIds[0]);
      }
    }
  }

  backHome(): void {
    this.query.set('');
    this.view.set({ kind: 'home' });
  }

  historyLabel(item: GoAssistantHistoryItem): string {
    if (item.title) return item.title;
    if (item.intent_id) {
      return getIntentById(item.intent_id)?.title ?? item.intent_id;
    }
    if (item.screen_id) {
      return getScreenById(item.screen_id)?.title ?? item.screen_id;
    }
    return item.query ?? 'Acesso recente';
  }

  popularLabel(item: GoAssistantPopularItem): string {
    return item.title ?? getIntentById(item.intent_id)?.title ?? item.intent_id;
  }
}
