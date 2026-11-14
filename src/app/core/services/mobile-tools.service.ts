import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface MobileToolCatalogItem {
  key: string;
  name: string;
  category: string;
  ready: boolean;
}

export interface MobileMessageTemplate {
  id: number;
  key: string;
  label: string;
  body: string;
  is_default: boolean;
  sort_order: number;
}

export interface MobileChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface MobileChecklist {
  id: number;
  items: MobileChecklistItem[];
}

export interface MobilePackage {
  id: number;
  client_name: string;
  label: string;
  total_sessions: number;
  done_sessions: number;
  status: string;
  notes?: string | null;
}

export interface MobileStockItem {
  id: number;
  name: string;
  quantity_label?: string | null;
  quantity?: number | null;
  expires_on?: string | null;
  status: string;
  notes?: string | null;
}

export interface MobileFollowup {
  id: number;
  client_name: string;
  detail: string;
  status: string;
  contacted_at?: string | null;
}

@Injectable({ providedIn: 'root' })
export class MobileToolsService {
  private readonly api = inject(ApiService);

  catalog(): Observable<MobileToolCatalogItem[]> {
    return this.api
      .get<{ data: { tools: MobileToolCatalogItem[] } }>('/mobile/tools')
      .pipe(map((r) => r.data.tools));
  }

  calculatePrice(payload: {
    materials: number;
    minutes: number;
    hourly_rate: number;
    fee_percent: number;
    margin_percent: number;
  }): Observable<{ price: number; cost: number; fee: number; profit: number }> {
    return this.api
      .post<{ data: { price: number; cost: number; fee: number; profit: number } }>('/mobile/tools/price', payload)
      .pipe(map((r) => r.data));
  }

  previewQuote(payload: {
    client_name?: string;
    procedure?: string;
    sessions: number;
    unit_price: number;
    discount?: number;
    save?: boolean;
  }): Observable<{ total: number; sessions: number; message: string; id?: number | null }> {
    return this.api
      .post<{ data: { total: number; sessions: number; message: string; id?: number | null } }>(
        '/mobile/tools/quotes',
        payload,
      )
      .pipe(map((r) => r.data));
  }

  calculateCard(payload: {
    amount: number;
    fee_percent: number;
    installments?: number;
  }): Observable<{ net: number; fee: number; installments: number }> {
    return this.api
      .post<{ data: { net: number; fee: number; installments: number } }>('/mobile/tools/card', payload)
      .pipe(map((r) => r.data));
  }

  messages(): Observable<MobileMessageTemplate[]> {
    return this.api
      .get<{ data: MobileMessageTemplate[] }>('/mobile/tools/messages')
      .pipe(map((r) => r.data));
  }

  updateMessage(id: number, body: string, label?: string): Observable<MobileMessageTemplate> {
    return this.api
      .put<{ data: MobileMessageTemplate }>(`/mobile/tools/messages/${id}`, { body, label })
      .pipe(map((r) => r.data));
  }

  checklist(): Observable<MobileChecklist> {
    return this.api.get<{ data: MobileChecklist }>('/mobile/tools/checklist').pipe(map((r) => r.data));
  }

  saveChecklist(items: MobileChecklistItem[]): Observable<MobileChecklist> {
    return this.api
      .put<{ data: MobileChecklist }>('/mobile/tools/checklist', { items })
      .pipe(map((r) => r.data));
  }

  resetChecklist(): Observable<MobileChecklist> {
    return this.api
      .post<{ data: MobileChecklist }>('/mobile/tools/checklist/reset', {})
      .pipe(map((r) => r.data));
  }

  packages(): Observable<MobilePackage[]> {
    return this.api.get<{ data: MobilePackage[] }>('/mobile/tools/packages').pipe(map((r) => r.data));
  }

  createPackage(payload: {
    client_name: string;
    label: string;
    total_sessions: number;
    done_sessions?: number;
    notes?: string;
  }): Observable<MobilePackage> {
    return this.api
      .post<{ data: MobilePackage }>('/mobile/tools/packages', payload)
      .pipe(map((r) => r.data));
  }

  registerSession(id: number): Observable<MobilePackage> {
    return this.api
      .post<{ data: MobilePackage }>(`/mobile/tools/packages/${id}/sessions`, {})
      .pipe(map((r) => r.data));
  }

  archivePackage(id: number): Observable<void> {
    return this.api.delete<{ data: unknown }>(`/mobile/tools/packages/${id}`).pipe(map(() => undefined));
  }

  stock(): Observable<MobileStockItem[]> {
    return this.api.get<{ data: MobileStockItem[] }>('/mobile/tools/stock').pipe(map((r) => r.data));
  }

  createStock(payload: {
    name: string;
    quantity_label?: string;
    quantity?: number;
    expires_on?: string;
    notes?: string;
  }): Observable<MobileStockItem> {
    return this.api.post<{ data: MobileStockItem }>('/mobile/tools/stock', payload).pipe(map((r) => r.data));
  }

  deleteStock(id: number): Observable<void> {
    return this.api.delete<{ data: unknown }>(`/mobile/tools/stock/${id}`).pipe(map(() => undefined));
  }

  followups(): Observable<MobileFollowup[]> {
    return this.api.get<{ data: MobileFollowup[] }>('/mobile/tools/followups').pipe(map((r) => r.data));
  }

  createFollowup(payload: { client_name: string; detail: string }): Observable<MobileFollowup> {
    return this.api
      .post<{ data: MobileFollowup }>('/mobile/tools/followups', payload)
      .pipe(map((r) => r.data));
  }

  toggleFollowup(id: number): Observable<MobileFollowup> {
    return this.api
      .post<{ data: MobileFollowup }>(`/mobile/tools/followups/${id}/toggle`, {})
      .pipe(map((r) => r.data));
  }

  archiveFollowup(id: number): Observable<void> {
    return this.api.delete<{ data: unknown }>(`/mobile/tools/followups/${id}`).pipe(map(() => undefined));
  }
}
