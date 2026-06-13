import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

export interface LinkPublico {
  id: number;
  template_id?: number;
  template_name?: string;
  name?: string;
  category_label?: string;
  public_token?: string;
  public_enabled?: boolean;
  public_url?: string;
  submission_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface LinksPublicosListMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface ListResponse {
  data: LinkPublico[] | unknown[];
  meta: LinksPublicosListMeta;
  links?: { first: string; last: string; prev: string | null; next: string | null };
}

@Injectable({ providedIn: 'root' })
export class LinksPublicosService {
  private api = inject(ApiService);

  list(params?: { per_page?: number; page?: number }): Observable<{ data: LinkPublico[]; meta: LinksPublicosListMeta }> {
    const query: Record<string, string | number | undefined> = {
      per_page: params?.per_page ?? 10,
      page: params?.page ?? 1,
    };
    return this.api.get<ListResponse>('/links-publicos', query).pipe(
      map((r) => ({
        data: (r.data ?? []) as LinkPublico[],
        meta: r.meta ?? {
          current_page: 1,
          last_page: 1,
          per_page: query['per_page'] as number,
          total: (r.data ?? []).length,
        },
      })),
    );
  }
}
