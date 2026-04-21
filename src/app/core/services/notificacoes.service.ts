import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

/** `id` é UUID (string) no Laravel `notifications`. */
export interface Notificacao {
  id: string;
  type?: string;
  data?: unknown;
  read_at?: string | null;
  created_at: string;
}

interface ListResponse {
  data: Notificacao[];
}

@Injectable({ providedIn: 'root' })
export class NotificacoesService {
  private api = inject(ApiService);

  list(): Observable<Notificacao[]> {
    return this.api.get<ListResponse>('/notificacoes').pipe(map((r) => r.data ?? []));
  }

  getNaoLidasCount(): Observable<number> {
    return this.list().pipe(map((list) => list.filter((n) => !n.read_at).length));
  }

  marcarComoLida(id: string): Observable<unknown> {
    return this.api.patch(`/notificacoes/${encodeURIComponent(id)}/lida`, {});
  }

  marcarTodasComoLidas(): Observable<unknown> {
    return this.api.post('/notificacoes/marcar-todas', {});
  }

  limparTudo(): Observable<unknown> {
    return this.api.delete('/notificacoes/limpar-tudo');
  }

  delete(id: string): Observable<void> {
    return this.api.delete(`/notificacoes/${encodeURIComponent(id)}`).pipe(map(() => undefined));
  }
}
