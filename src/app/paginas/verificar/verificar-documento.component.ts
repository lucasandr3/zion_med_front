import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PublicPageBodyService } from '../../core/services/public-page-body.service';
import {
  DocumentVerificationEvidence,
  DocumentVerificationResult,
  DocumentVerificationService,
} from '../../core/services/document-verification.service';

@Component({
  selector: 'app-verificar-documento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './verificar-documento.component.html',
  styleUrl: './verificar-documento.component.css',
})
export class VerificarDocumentoComponent implements OnInit, OnDestroy {
  codeInput = '';
  loading = false;
  result: DocumentVerificationResult | null = null;
  errorMessage: string | null = null;

  private readonly route = inject(ActivatedRoute);
  private readonly verification = inject(DocumentVerificationService);
  private readonly publicPageBody = inject(PublicPageBodyService);

  ngOnInit(): void {
    this.publicPageBody.enterPublicPage();
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.codeInput = code;
      this.consultar(code);
    }
  }

  ngOnDestroy(): void {
    this.publicPageBody.leavePublicPage();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.consultar(this.codeInput);
  }

  private consultar(raw: string): void {
    const code = raw.trim();
    if (code.length < 8) {
      this.result = null;
      this.errorMessage = 'Informe o código de verificação (mínimo 8 caracteres) ou o número do protocolo.';
      return;
    }
    this.loading = true;
    this.errorMessage = null;
    this.result = null;
    this.verification.verify(code).subscribe({
      next: (r) => {
        this.result = r;
        this.loading = false;
        if (!r.valid) {
          this.errorMessage = r.message || 'Documento não autenticado.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.result = err?.error ?? null;
        this.errorMessage =
          err?.error?.message ?? 'Não foi possível verificar este código. Tente novamente.';
      },
    });
  }

  formatDate(iso?: string | null): string {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleString('pt-BR');
    } catch {
      return iso;
    }
  }

  formatBool(value?: boolean | null): string {
    if (value === true) return 'Sim';
    if (value === false) return 'Não';
    return '—';
  }

  documentKindLabel(kind?: string | null): string {
    if (kind === 'consentimento') return 'Termo de consentimento';
    if (kind === 'ficha') return 'Ficha / formulário';
    return kind?.trim() ? kind : '—';
  }

  hasEvidence(evidence?: DocumentVerificationEvidence | null): boolean {
    return evidence != null;
  }
}
