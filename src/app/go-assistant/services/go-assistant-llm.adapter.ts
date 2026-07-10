import { Injectable } from '@angular/core';
import type { AssistantIntent, AssistantSearchHit } from '../models/assistant.types';

/**
 * Adapter preparado para LLM futuro.
 * Na v1 resolve offline (no-op / passthrough do catálogo local).
 */
export interface GoAssistantLlmResolveInput {
  query: string;
  catalog: Array<{ id: string; title: string; aliases: string[] }>;
  currentScreenId: string | null;
}

@Injectable({ providedIn: 'root' })
export class GoAssistantLlmAdapter {
  readonly enabled = false;

  /**
   * Futuro: chamar OpenAI/outro e retornar apenas intentId do catálogo.
   * Hoje sempre retorna null para o resolver offline assumir.
   */
  async resolveIntentId(_input: GoAssistantLlmResolveInput): Promise<string | null> {
    return null;
  }

  /** Mantém contrato para rankeamento assistido no futuro. */
  async rerank(hits: AssistantSearchHit[]): Promise<AssistantSearchHit[]> {
    return hits;
  }

  summarizeIntent(intent: AssistantIntent): string {
    return intent.title;
  }
}
