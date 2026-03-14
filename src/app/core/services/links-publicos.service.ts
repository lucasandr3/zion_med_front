import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

export interface LinkPublico {
  id: number;
  template_id?: number;
  template_name?: string;
  name?: string;
  public_token?: string;
  public_enabled?: boolean;
  public_url?: string;
  created_at?: string;
}

interface ListResponse {
  data: LinkPublico[] | unknown[];
}

@Injectable({ providedIn: 'root' })
export class LinksPublicosService {
  private api = inject(ApiService);

  list(): Observable<LinkPublico[]> {
    return this.api.get<ListResponse>('/links-publicos').pipe(map((r) => (r.data ?? []) as LinkPublico[]));
  }
}
