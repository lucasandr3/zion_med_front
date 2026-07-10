import { Injectable, inject } from '@angular/core';
import { getAllIntents } from '../data';
import type { AssistantIntent, AssistantSearchHit } from '../models/assistant.types';
import { normalizeAssistantText, tokenizeAssistantQuery } from '../utils/text-normalize';
import { GoAssistantContextService } from './go-assistant-context.service';

@Injectable({ providedIn: 'root' })
export class GoAssistantSearchService {
  private readonly context = inject(GoAssistantContextService);

  search(rawQuery: string, limit = 12): AssistantSearchHit[] {
    const query = normalizeAssistantText(rawQuery);
    if (!query) {
      return [];
    }
    const tokens = tokenizeAssistantQuery(rawQuery);
    const currentScreenId = this.context.currentScreen()?.id;
    const hits: AssistantSearchHit[] = [];

    for (const intent of getAllIntents()) {
      if (!this.context.canSeeIntent(intent)) {
        continue;
      }
      const score = this.scoreIntent(intent, query, tokens, currentScreenId);
      if (score > 0) {
        hits.push({ intent, score });
      }
    }

    return hits.sort((a, b) => b.score - a.score).slice(0, limit);
  }

  suggestWhenEmpty(limit = 5): AssistantIntent[] {
    const contextual = this.context.contextualIntents();
    if (contextual.length >= limit) {
      return contextual.slice(0, limit);
    }
    const extras = getAllIntents()
      .filter((i) => this.context.canSeeIntent(i) && !contextual.some((c) => c.id === i.id))
      .slice(0, limit - contextual.length);
    return [...contextual, ...extras];
  }

  private scoreIntent(
    intent: AssistantIntent,
    query: string,
    tokens: string[],
    currentScreenId: string | undefined,
  ): number {
    const title = normalizeAssistantText(intent.title);
    const aliases = intent.aliases.map(normalizeAssistantText);
    const keywords = intent.keywords.map(normalizeAssistantText);
    let score = 0;

    if (title === query || aliases.includes(query)) {
      score += 100;
    }
    if (title.includes(query)) {
      score += 40;
    }
    for (const alias of aliases) {
      if (alias.includes(query) || query.includes(alias)) {
        score += 35;
      }
    }
    for (const token of tokens) {
      if (title.includes(token)) score += 8;
      if (aliases.some((a) => a.includes(token))) score += 10;
      if (keywords.some((k) => k.includes(token) || token.includes(k))) score += 6;
    }

    if (currentScreenId && intent.screenIds.includes(currentScreenId)) {
      score += 15;
    }

    return score;
  }
}
