import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

export interface WhatsappEvolutionState {
  server_configured: boolean;
  instance_configured: boolean;
  instance_name: string | null;
  has_instance_token: boolean;
  remote_id: string | null;
  connected: boolean | null;
  logged_in: boolean | null;
  remote_error: string | null;
}

export interface WhatsappEvolutionCreateResult {
  instance_name: string | null;
  remote_id: string | null;
  instance_token: string;
}

interface StateResponse {
  data: WhatsappEvolutionState;
}

interface CreateResponse {
  data: WhatsappEvolutionCreateResult;
}

interface QrResponse {
  data: { qrcode: string | null; link_code: string | null };
}

interface PairResponse {
  data: { pairing_code: string | null };
}

interface MessageResponse {
  data: { message: string };
}

@Injectable({ providedIn: 'root' })
export class WhatsappEvolutionService {
  private api = inject(ApiService);

  private readonly base = '/clinica/whatsapp/evolution';

  getState(): Observable<WhatsappEvolutionState> {
    return this.api.get<StateResponse>(`${this.base}`).pipe(map((r) => r.data));
  }

  /** Nome e token da instância são gerados no servidor (não enviar pelo cliente). */
  createInstance(): Observable<WhatsappEvolutionCreateResult> {
    return this.api.post<CreateResponse>(`${this.base}/instance`, {}).pipe(map((r) => r.data));
  }

  connect(payload: {
    phone?: string;
    webhook_url?: string;
    subscribe?: string[];
    immediate?: boolean;
  }): Observable<{ message: string }> {
    return this.api.post<MessageResponse>(`${this.base}/connect`, payload).pipe(map((r) => r.data));
  }

  getQr(): Observable<{ qrcode: string | null; link_code: string | null }> {
    return this.api.get<QrResponse>(`${this.base}/qr`).pipe(map((r) => r.data));
  }

  requestPair(phone: string, subscribe?: string[]): Observable<{ pairing_code: string | null }> {
    return this.api.post<PairResponse>(`${this.base}/pair`, { phone, subscribe }).pipe(map((r) => r.data));
  }

  disconnect(): Observable<{ message: string }> {
    return this.api.post<MessageResponse>(`${this.base}/disconnect`, {}).pipe(map((r) => r.data));
  }

  destroyInstance(): Observable<{ message: string }> {
    return this.api.delete<MessageResponse>(`${this.base}/instance`).pipe(map((r) => r.data));
  }

  sendTest(phone: string, text?: string): Observable<{ message: string }> {
    return this.api.post<MessageResponse>(`${this.base}/test`, { phone, text }).pipe(map((r) => r.data));
  }
}
