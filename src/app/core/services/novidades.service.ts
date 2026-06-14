import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable, tap } from 'rxjs';

export type ReleaseNoteItemType = 'feature' | 'improvement' | 'fix';

export interface ReleaseNoteItem {
  type: ReleaseNoteItemType;
  text: string;
}

export interface ReleaseNote {
  id: number;
  version: string;
  title: string;
  summary?: string | null;
  items: ReleaseNoteItem[];
  released_at: string;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface ListResponse {
  data: ReleaseNote[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

interface LatestResponse {
  data: {
    latest_id: number | null;
    latest_version: string | null;
  };
}

interface SavePayload {
  version: string;
  title: string;
  summary?: string | null;
  items: ReleaseNoteItem[];
  released_at: string;
  is_published?: boolean;
}

const LS_LAST_SEEN_ID = 'gestgo_last_seen_release_id';

@Injectable({ providedIn: 'root' })
export class NovidadesService {
  private api = inject(ApiService);

  list(page = 1, q?: string): Observable<{ data: ReleaseNote[]; meta?: ListResponse['meta'] }> {
    const params: Record<string, string | number | undefined> = { page };
    const term = q?.trim();
    if (term) params['q'] = term;
    return this.api.get<ListResponse>('/release-notes', params);
  }

  latest(): Observable<{ latest_id: number | null; latest_version: string | null }> {
    return this.api.get<LatestResponse>('/release-notes/latest').pipe(map((r) => r.data));
  }

  getNaoVistasCount(): Observable<number> {
    return this.latest().pipe(
      map((latest) => {
        const latestId = latest.latest_id;
        if (latestId == null) return 0;
        const seenId = this.getLastSeenId();
        if (seenId == null) return 1;
        return latestId > seenId ? 1 : 0;
      }),
    );
  }

  markAllAsSeen(notes: ReleaseNote[]): void {
    if (notes.length === 0) return;
    const maxId = Math.max(...notes.map((n) => n.id));
    this.setLastSeenId(maxId);
  }

  markLatestAsSeen(): Observable<void> {
    return this.latest().pipe(
      tap((latest) => {
        if (latest.latest_id != null) {
          this.setLastSeenId(latest.latest_id);
        }
      }),
      map(() => undefined),
    );
  }

  getLastSeenId(): number | null {
    try {
      const raw = localStorage.getItem(LS_LAST_SEEN_ID);
      if (raw == null || raw.trim() === '') return null;
      const parsed = Number(raw);
      return Number.isFinite(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  setLastSeenId(id: number): void {
    try {
      localStorage.setItem(LS_LAST_SEEN_ID, String(id));
    } catch {}
  }

  isNoteNova(note: ReleaseNote): boolean {
    const seenId = this.getLastSeenId();
    if (seenId == null) return true;
    return note.id > seenId;
  }

  listPlatform(page = 1): Observable<{ data: ReleaseNote[]; meta?: ListResponse['meta'] }> {
    return this.api.get<ListResponse>('/platform/release-notes', { page });
  }

  createPlatform(payload: SavePayload): Observable<ReleaseNote> {
    return this.api.post<{ data: ReleaseNote }>('/platform/release-notes', payload).pipe(map((r) => r.data));
  }

  updatePlatform(id: number, payload: SavePayload): Observable<ReleaseNote> {
    return this.api.put<{ data: ReleaseNote }>(`/platform/release-notes/${id}`, payload).pipe(map((r) => r.data));
  }

  deletePlatform(id: number): Observable<void> {
    return this.api.delete(`/platform/release-notes/${id}`).pipe(map(() => undefined));
  }

  labelTipo(type: ReleaseNoteItemType): string {
    const labels: Record<ReleaseNoteItemType, string> = {
      feature: 'Novidade',
      improvement: 'Melhoria',
      fix: 'Correção',
    };
    return labels[type] ?? type;
  }
}
