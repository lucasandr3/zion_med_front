import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

export type ComplianceIssueType = 'consent_expired' | 'without_snapshot' | 'pending_review';

export interface ComplianceIssue {
  id: number;
  protocol_number: string;
  issue: ComplianceIssueType;
  person_name: string;
  template_name: string;
  status: string;
  consent_valid_until?: string | null;
  submitted_at?: string | null;
}

export interface ComplianceReportData {
  sem_clinica?: boolean;
  generated_at: string;
  organization_id?: number;
  scope?: 'consent' | 'all';
  summary: {
    total_protocols: number;
    pending: number;
    consent_expired: number;
    without_snapshot: number;
    revoked: number;
    retention_anonymized: number;
    revocation_rate_percent: number;
    revocation_rate_denominator?: string;
  };
  by_status: {
    pending: number;
    approved: number;
    rejected: number;
    revoked: number;
  };
  highlights: {
    pending_today: number;
    expiring_next_30_days: number;
  };
  recent_issues: ComplianceIssue[];
}

interface ApiResponse {
  data: ComplianceReportData;
}

@Injectable({ providedIn: 'root' })
export class ComplianceService {
  private api = inject(ApiService);

  getReport(scope: 'consent' | 'all' = 'consent'): Observable<ComplianceReportData> {
    return this.api
      .get<ApiResponse>(`/compliance/relatorio?scope=${scope}`)
      .pipe(map((r) => r.data));
  }
}
