import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

export interface Plano {
  id: number;
  name: string;
  value: number;
  description?: string;
}

export interface BillingState {
  status?: string;
  trial_ends_at?: string;
  plan?: Plano;
  plans?: Plano[];
}

interface ApiResponse {
  data: BillingState;
}

@Injectable({ providedIn: 'root' })
export class BillingService {
  private api = inject(ApiService);

  get(): Observable<BillingState> {
    return this.api.get<ApiResponse>('/billing').pipe(map((r) => r.data));
  }

  checkout(planId: number): Observable<{ data?: { url?: string } }> {
    return this.api.post<{ data?: { url?: string } }>('/billing/checkout', { plan_id: planId });
  }
}
