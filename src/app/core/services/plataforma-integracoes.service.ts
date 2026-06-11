import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export type PlatformIntegrationStatus = 'active' | 'inactive' | 'not_configured' | 'error';

export interface PlatformIntegrationItem {
  id: string;
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  configured: boolean;
  status: PlatformIntegrationStatus;
  connector_type: string;
  base_url: string;
}

export interface BusinessHubIntegration extends PlatformIntegrationItem {
  system_name: string;
  version: string;
  token_configured: boolean;
  token_preview: string | null;
  connector_types: string[];
  endpoints: Record<string, string>;
  updated_at?: string | null;
  token?: string;
}

export interface BusinessHubIntegrationTestResult {
  ok: boolean;
  status: string;
  health?: Record<string, unknown>;
  http_status?: number;
}

@Injectable({ providedIn: 'root' })
export class PlataformaIntegracoesService {
  private api = inject(ApiService);

  list(): Observable<{ data: { integrations: PlatformIntegrationItem[] } }> {
    return this.api.get<{ data: { integrations: PlatformIntegrationItem[] } }>('/platform/integrations');
  }

  getBusinessHub(): Observable<{ data: BusinessHubIntegration }> {
    return this.api.get<{ data: BusinessHubIntegration }>('/platform/integrations/business-hub');
  }

  updateBusinessHub(payload: {
    enabled?: boolean;
    connector_type?: string;
    system_name?: string;
    version?: string;
  }): Observable<{ message: string; data: BusinessHubIntegration }> {
    return this.api.put<{ message: string; data: BusinessHubIntegration }>(
      '/platform/integrations/business-hub',
      payload,
    );
  }

  regenerateBusinessHubToken(): Observable<{ message: string; data: BusinessHubIntegration }> {
    return this.api.post<{ message: string; data: BusinessHubIntegration }>(
      '/platform/integrations/business-hub/regenerate-token',
      {},
    );
  }

  testBusinessHub(): Observable<{ message: string; data: BusinessHubIntegrationTestResult }> {
    return this.api.post<{ message: string; data: BusinessHubIntegrationTestResult }>(
      '/platform/integrations/business-hub/test',
      {},
    );
  }
}
