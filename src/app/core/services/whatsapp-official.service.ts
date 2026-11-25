import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';

/** MSG-03B-0 — estado do canal oficial Meta (sem tokens). */
export interface WhatsappOfficialStatus {
  platform_enabled: boolean;
  status: 'disconnected' | 'pending' | 'connected' | string;
  display_number_masked: string | null;
  meta_business_id?: string | null;
  can_send_official: boolean;
  manual_share_available: boolean;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class WhatsappOfficialService {
  private readonly api = inject(ApiService);

  getStatus(): Observable<WhatsappOfficialStatus> {
    return this.api
      .get<{ data: WhatsappOfficialStatus }>('/clinica/whatsapp/official')
      .pipe(map((r) => r.data));
  }
}
