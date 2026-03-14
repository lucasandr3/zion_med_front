import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

export interface IntegracoesToken {
  id: number;
  name: string;
  created_at?: string;
}

export interface IntegracoesWebhook {
  id: number;
  url: string;
  events: string[];
  description?: string | null;
  is_active: boolean;
  created_at?: string;
}

export interface IntegracoesDelivery {
  id: number;
  webhook_id: number;
  event: string;
  status_code?: number | null;
  created_at?: string;
}

export interface IntegracoesState {
  tokens: IntegracoesToken[];
  webhooks: IntegracoesWebhook[];
  deliveries: IntegracoesDelivery[];
  available_events: string[];
  event_labels: Record<string, string>;
}

interface ApiResponse {
  data: IntegracoesState;
}

@Injectable({ providedIn: 'root' })
export class IntegracoesService {
  private api = inject(ApiService);

  get(): Observable<IntegracoesState> {
    return this.api.get<ApiResponse>('/clinica/integracoes').pipe(map((r) => r.data));
  }

  criarToken(name: string): Observable<{ token: string; token_id: number; name: string }> {
    return this.api
      .post<{ data: { token: string; token_id: number; name: string } }>('/clinica/integracoes/tokens', { name })
      .pipe(map((r) => r.data));
  }

  revogarToken(id: number): Observable<void> {
    return this.api.delete(`/clinica/integracoes/tokens/${id}`).pipe(map(() => undefined));
  }

  criarWebhook(payload: { url: string; events: string[]; secret?: string; description?: string }): Observable<IntegracoesWebhook> {
    return this.api.post<{ data: IntegracoesWebhook }>('/clinica/integracoes/webhooks', payload).pipe(map((r) => r.data));
  }

  removerWebhook(id: number): Observable<void> {
    return this.api.delete(`/clinica/integracoes/webhooks/${id}`).pipe(map(() => undefined));
  }
}

