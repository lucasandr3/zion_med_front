import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface DocumentVerificationEvidence {
  document_kind?: string | null;
  template_version?: number | null;
  comprehension_ack?: boolean;
  comprehension_ack_at?: string | null;
  term_scrolled_at?: string | null;
  privacy_ack?: boolean;
  comprehension_quiz_passed?: boolean;
  assisted_mode?: boolean;
  professional_explained?: boolean;
  has_guardian?: boolean;
  has_witness?: boolean;
  approved_at?: string | null;
  revoked_at?: string | null;
  retention_anonymized_at?: string | null;
}

export interface DocumentVerificationData {
  protocol_number?: string | null;
  verification_code?: string | null;
  document_hash?: string | null;
  template_name?: string | null;
  clinic_name?: string | null;
  submitted_at?: string | null;
  status?: string | null;
  has_signature?: boolean;
  signed_at?: string | null;
  evidence?: DocumentVerificationEvidence | null;
}

export interface DocumentVerificationResult {
  valid: boolean;
  message?: string;
  data?: DocumentVerificationData | null;
}

@Injectable({ providedIn: 'root' })
export class DocumentVerificationService {
  private readonly api = inject(ApiService);

  verify(code: string): Observable<DocumentVerificationResult> {
    return this.api.get<DocumentVerificationResult>(`/verificar/${code.trim()}`);
  }
}
