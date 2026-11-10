import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export type FeedbackType = 'suggestion' | 'bug';
export type FeedbackSource = 'account_menu' | 'go_assistant';

export interface FeedbackPayload {
  type: FeedbackType;
  title: string;
  message: string;
  source?: FeedbackSource;
  page_url?: string;
}

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private readonly api = inject(ApiService);

  enviar(payload: FeedbackPayload): Observable<{ success: boolean; message: string }> {
    return this.api.post('/feedback', {
      ...payload,
      page_url: payload.page_url ?? (typeof window !== 'undefined' ? window.location.href : undefined),
    });
  }
}
