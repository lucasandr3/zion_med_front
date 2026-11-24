import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, catchError, finalize, of, timeout } from 'rxjs';
import { KnowledgeArticle, KnowledgeService } from '../../core/services/knowledge.service';
import { getIntentById, getScreenById } from '../data';
import type {
  AssistantArticleHit,
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
  private readonly knowledge = inject(KnowledgeService);
  private readonly router = inject(Router);

  private historySub?: Subscription;
  private popularSub?: Subscription;
  private knowledgeSub?: Subscription;
  private querySeq = 0;

  readonly open = signal(false);
  readonly view = signal<AssistantDrawerView>({ kind: 'home' });
  readonly query = signal('');
  readonly history = signal<GoAssistantHistoryItem[]>([]);
  readonly popular = signal<GoAssistantPopularItem[]>([]);
  readonly loadingHistory = signal(false);
  readonly searchingArticles = signal(false);

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
    this.knowledgeSub?.unsubscribe();
    if (!trimmed) {
      this.searchingArticles.set(false);
      this.view.set({ kind: 'home' });
      return;
    }

    const hits = this.search.search(trimmed);
    const seq = ++this.querySeq;
    this.applySearchView(trimmed, hits, [], false);
    this.searchingArticles.set(true);
    this.knowledgeSub = this.knowledge
      .searchHelp(trimmed)
      .pipe(
        timeout({ first: 8000 }),
        catchError(() => of({ data: [] as KnowledgeArticle[] })),
        finalize(() => {
          if (seq === this.querySeq) {
            this.searchingArticles.set(false);
          }
        }),
      )
      .subscribe((res) => {
        if (seq !== this.querySeq) return;
        const articles = this.mapArticles(res.data ?? []).slice(0, 6);
        this.applySearchView(trimmed, hits, articles, true);
      });
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

  openArticle(article: AssistantArticleHit): void {
    this.close();
    void this.router.navigate(['/ajuda'], { queryParams: { artigo: article.slug } });
    this.api
      .recordEvent({
        kind: 'action',
        title: article.title,
        query: this.query(),
        route: '/ajuda',
        meta: { article_slug: article.slug, source: 'knowledge' },
      })
      .subscribe();
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

  private applySearchView(
    trimmed: string,
    hits: ReturnType<GoAssistantSearchService['search']>,
    articles: AssistantArticleHit[],
    recordEvent: boolean,
  ): void {
    if (hits.length === 0 && articles.length === 0) {
      if (recordEvent) {
        this.api
          .recordEvent({
            kind: 'no_match',
            query: trimmed,
            route: this.context.context().route,
            screen_id: this.context.currentScreen()?.id ?? null,
          })
          .subscribe();
      }
      this.view.set({
        kind: 'empty',
        query: trimmed,
        suggestions: this.search.suggestWhenEmpty(5),
        articles: [],
      });
      return;
    }

    if (recordEvent) {
      this.api
        .recordEvent({
          kind: 'search',
          query: trimmed,
          route: this.context.context().route,
          screen_id: this.context.currentScreen()?.id ?? null,
          meta: { hits: hits.length, articles: articles.length },
        })
        .subscribe();
    }

    if (hits.length === 0) {
      this.view.set({
        kind: 'empty',
        query: trimmed,
        suggestions: this.search.suggestWhenEmpty(5),
        articles,
      });
      return;
    }

    this.view.set({ kind: 'search', query: trimmed, hits, articles });
  }

  private mapArticles(list: KnowledgeArticle[]): AssistantArticleHit[] {
    return list
      .filter((item) => !!item.slug && !!item.title)
      .map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        category: item.category,
      }));
  }
}
