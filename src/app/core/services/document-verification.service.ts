import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

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
