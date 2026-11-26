import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface KnowledgeArticle {
  id: number;
  title: string;
  slug: string;
  category: string;
  content: string;
  tags?: string[];
  status: string;
  visibility: string;
  version?: number;
  published_at?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
}

@Injectable({ providedIn: 'root' })
export class KnowledgeService {
  private readonly api = inject(ApiService);

  searchHelp(q?: string): Observable<{ data: KnowledgeArticle[] }> {
    return this.api.get<{ data: KnowledgeArticle[] }>('/help/articles', q ? { q } : undefined);
  }

  getHelpArticle(slug: string): Observable<{ data: KnowledgeArticle }> {
    return this.api.get<{ data: KnowledgeArticle }>(`/help/articles/${slug}`);
  }

  platformList(): Observable<{ data: { published: number; draft: number; items: KnowledgeArticle[] } }> {
    return this.api.get('/platform/knowledge/articles');
  }

  platformGet(id: number): Observable<{ data: KnowledgeArticle }> {
    return this.api.get(`/platform/knowledge/articles/${id}`);
  }

  platformCreate(payload: Partial<KnowledgeArticle> & { title: string; content: string; category: string }): Observable<{ data: KnowledgeArticle }> {
    return this.api.post('/platform/knowledge/articles', payload);
  }

  platformUpdate(id: number, payload: Partial<KnowledgeArticle>): Observable<{ data: KnowledgeArticle }> {
    return this.api.put(`/platform/knowledge/articles/${id}`, payload);
  }

  platformPublish(id: number): Observable<{ data: KnowledgeArticle }> {
    return this.api.post(`/platform/knowledge/articles/${id}/publish`, {});
  }

  platformArchive(id: number): Observable<{ data: KnowledgeArticle }> {
    return this.api.post(`/platform/knowledge/articles/${id}/archive`, {});
  }
}
