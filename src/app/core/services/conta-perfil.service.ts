import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService, User } from './auth.service';

export interface ElectronicSignaturePatchResponse {
  data: { user: User };
}

export interface MeDataExportPayload {
  exported_at: string;
  format_version: string;
  notice: string;
  account: User;
  current_organization: { id: number; name: string; contact_email?: string | null } | null;
  audit_logs: Array<{
    id: number;
    action: string;
    entity_type: string | null;
    entity_id: number | null;
    meta_json: Record<string, unknown> | null;
    organization_id: number | null;
    created_at: string | null;
  }>;
  protocols_activity: {
    submitted: MeDataExportProtocolSummary[];
    approved: MeDataExportProtocolSummary[];
  };
}

export interface MeDataExportProtocolSummary {
  id: number;
  protocol_number: string | null;
  status: string;
  template_id: number | null;
  template_name: string | null;
  organization_id: number | null;
  submitted_at: string | null;
  approved_at: string | null;
}

@Injectable({ providedIn: 'root' })
export class ContaPerfilService {
  private api = inject(ApiService);
  private auth = inject(AuthService);

  patchElectronicSignature(body: { image_base64?: string; clear?: boolean }): Observable<ElectronicSignaturePatchResponse> {
    return this.api.patch<ElectronicSignaturePatchResponse>('/me/electronic-signature', body).pipe(
      tap((res) => {
        const u = res.data?.user;
        if (u) {
          this.auth.mergeUserFromApi(u);
          this.auth.notifyAppearanceApplied();
        }
      })
    );
  }

  deleteAccount(password: string): Observable<{ data: { message: string; billing_canceled?: boolean } }> {
    return this.api.delete<{ data: { message: string; billing_canceled?: boolean } }>('/me/account', { password });
  }

  exportPersonalData(): Observable<{ data: MeDataExportPayload }> {
    return this.api.get<{ data: MeDataExportPayload }>('/me/data-export');
  }
}
