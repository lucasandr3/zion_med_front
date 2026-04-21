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
  response_code?: number | null;
  error_message?: string | null;
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

export type IntegracaoSistemaStatus = 'ok' | 'error' | 'unknown' | 'disabled' | 'not_configured';

export interface IntegracaoSistemaItem {
  key: string;
  name: string;
  description?: string | null;
  enabled: boolean;
  status: IntegracaoSistemaStatus;
  last_check_at?: string | null;
  last_error?: string | null;
}

export interface FeegowConfigState {
  enabled: boolean;
  base_url: string;
  has_token: boolean;
  status: IntegracaoSistemaStatus;
  last_check_at?: string | null;
  last_error?: string | null;
}

export interface FeegowCatalogos {
  specialties: unknown[];
  insurances: unknown[];
  units: unknown[];
  locals: unknown[];
  channels: unknown[];
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

  /** Reenvia uma entrega de webhook falha. */
  reenviarDelivery(deliveryId: number): Observable<{ data?: { message?: string } }> {
    return this.api.post<{ data?: { message?: string } }>(`/clinica/integracoes/webhook-deliveries/${deliveryId}/retry`, {});
  }

  getSistemas(): Observable<IntegracaoSistemaItem[]> {
    return this.api.get<{ data: IntegracaoSistemaItem[] }>('/clinica/integracoes/sistemas').pipe(map((r) => r.data ?? []));
  }

  getFeegow(): Observable<FeegowConfigState> {
    return this.api.get<{ data: FeegowConfigState }>('/clinica/integracoes/sistemas/feegow').pipe(map((r) => r.data));
  }

  updateFeegow(payload: { enabled: boolean; base_url: string; token?: string }): Observable<FeegowConfigState> {
    return this.api.put<{ data: FeegowConfigState }>('/clinica/integracoes/sistemas/feegow', payload).pipe(map((r) => r.data));
  }

  testFeegow(): Observable<{ ok: boolean; status: IntegracaoSistemaStatus; message: string; last_check_at?: string }> {
    return this.api
      .post<{ data: { ok: boolean; status: IntegracaoSistemaStatus; message: string; last_check_at?: string } }>(
        '/clinica/integracoes/sistemas/feegow/test',
        {}
      )
      .pipe(map((r) => r.data));
  }

  getFeegowCatalogos(params?: { unidade_id?: number }): Observable<FeegowCatalogos> {
    return this.api
      .get<{ data: FeegowCatalogos }>('/clinica/integracoes/sistemas/feegow/catalogos', params)
      .pipe(map((r) => r.data));
  }

  getFeegowDisponibilidade(params: {
    tipo: 'E' | 'P';
    data_start: string;
    data_end: string;
    especialidade_id?: number;
    procedimento_id?: number;
    unidade_id?: number;
    profissional_id?: number;
    convenio_id?: number;
  }): Observable<{ schedule: unknown; raw: unknown }> {
    return this.api
      .get<{ data: { schedule: unknown; raw: unknown } }>('/clinica/integracoes/sistemas/feegow/disponibilidade', params)
      .pipe(map((r) => r.data));
  }

  criarFeegowAgendamento(payload: Record<string, unknown>): Observable<{
    message: string;
    feegow_appointment_id: number;
    integration_record_id: number;
    raw: unknown;
  }> {
    return this.api
      .post<{
        data: {
          message: string;
          feegow_appointment_id: number;
          integration_record_id: number;
          raw: unknown;
        };
      }>('/clinica/integracoes/sistemas/feegow/agendamentos', payload)
      .pipe(map((r) => r.data));
  }
}

