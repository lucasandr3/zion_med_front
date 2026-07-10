import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import type {
  GoAssistantEventPayload,
  GoAssistantHistoryItem,
  GoAssistantPopularItem,
} from '../models/assistant.types';

interface DataWrap<T> {
  data: T;
}

function asArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) {
    return value as T[];
  }
  if (value && typeof value === 'object' && Array.isArray((value as DataWrap<T[]>).data)) {
    return (value as DataWrap<T[]>).data;
  }
  return [];
}

@Injectable({ providedIn: 'root' })
export class GoAssistantApiService {
  private readonly api = inject(ApiService);

  getHistory(limit = 12): Observable<GoAssistantHistoryItem[]> {
    return this.api.get<DataWrap<unknown>>('/assistant/history', { limit }).pipe(
      map((res) => asArray<GoAssistantHistoryItem>(res?.data)),
      catchError(() => of([])),
    );
  }

  getPopular(limit = 8): Observable<GoAssistantPopularItem[]> {
    return this.api.get<DataWrap<unknown>>('/assistant/popular', { limit }).pipe(
      map((res) => asArray<GoAssistantPopularItem>(res?.data)),
      catchError(() => of([])),
    );
  }

  recordEvent(payload: GoAssistantEventPayload): Observable<GoAssistantHistoryItem | null> {
    return this.api.post<DataWrap<GoAssistantHistoryItem>>('/assistant/events', payload).pipe(
      map((res) => res?.data ?? null),
      catchError(() => of(null)),
    );
  }

  clearHistory(): Observable<{ message: string; deleted: number } | null> {
    return this.api.delete<DataWrap<{ message: string; deleted: number }>>('/assistant/history').pipe(
      map((res) => res?.data ?? null),
      catchError(() => of(null)),
    );
  }
}
