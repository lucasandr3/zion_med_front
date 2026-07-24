import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

/**
 * Presença de organizações no app tenant (login / troca de empresa no backend).
 * Beacon ao fechar aba usa presence_leave_token (HMAC), não o Sanctum plain token.
 */
@Injectable({ providedIn: 'root' })
export class OrganizationPresenceService {
  private auth = inject(AuthService);

  /** Chamado no fechamento da aba/navegador (pagehide). */
  sendLeaveBeaconIfTenantSession(): void {
    if (typeof navigator === 'undefined' || typeof window === 'undefined') {
      return;
    }
    if (!navigator.sendBeacon) {
      return;
    }
    if (!this.auth.isAuthenticated()) {
      return;
    }
    if (this.auth.isPlatformAdmin()) {
      return;
    }
    const leaveToken = this.auth.getPresenceLeaveToken();
    const organizationId = this.auth.getCurrentOrganizationId();
    if (!leaveToken || organizationId == null || organizationId === '') {
      return;
    }
    const url = `${environment.apiUrl}/api/v1/organization-presence/leave-beacon`;
    const body = new URLSearchParams();
    body.set('presence_leave_token', leaveToken);
    body.set('organization_id', String(organizationId));
    navigator.sendBeacon(url, body);
  }
}
