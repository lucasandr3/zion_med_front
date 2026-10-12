import { Component, OnDestroy, OnInit, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicPageBodyService } from '../../core/services/public-page-body.service';
import { FormularioPublicoService } from '../../core/services/formulario-publico.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-formulario-publico-sucesso',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-publico-sucesso.component.html',
  styleUrl: './formulario-publico-sucesso.component.css',
})
export class FormularioPublicoSucessoComponent implements OnInit, OnDestroy {
  readonly protocolNumber = signal<string | null>(null);
  readonly clinicName = signal<string | null>(null);
  readonly clinicLogoUrl = signal<string | null>(null);
  readonly patientDownloadToken = signal<string | null>(null);
  readonly patientDownloadUrl = signal<string | null>(null);
  readonly patientCopyEmailedHint = signal(false);
  readonly downloading = signal(false);
  readonly dark = signal(false);

  /** R7: captura de e-mail quando a cópia ainda não foi enviada. */
  emailCapture = '';
  readonly emailSending = signal(false);
  readonly emailSentMessage = signal<string | null>(null);

  private router = inject(Router);
  private publicPageBody = inject(PublicPageBodyService);
  private formularioService = inject(FormularioPublicoService);
  private toast = inject(ToastService);

  constructor() {
    const state = this.router.getCurrentNavigation()?.extras?.state as
      | {
          protocol_number?: string;
          clinic_name?: string;
          clinic_logo_url?: string | null;
          patient_download_token?: string | null;
          patient_download_url?: string | null;
          submitter_email?: string | null;
          patient_copy_emailed?: boolean | null;
        }
      | undefined;
    this.protocolNumber.set(state?.protocol_number ?? null);
    this.clinicName.set(state?.clinic_name ?? null);
    const logo = state?.clinic_logo_url;
    this.clinicLogoUrl.set(logo != null && String(logo).trim() !== '' ? String(logo) : null);
    this.patientDownloadToken.set(state?.patient_download_token?.trim() || null);
    this.patientDownloadUrl.set(state?.patient_download_url?.trim() || null);
    // Só esconde a captura se a API confirmou o envio (não inferir só pelo e-mail digitado no formulário).
    this.patientCopyEmailedHint.set(state?.patient_copy_emailed === true);
    if (state?.submitter_email) {
      this.emailCapture = String(state.submitter_email).trim();
    }
  }

  get showEmailCapture(): boolean {
    return !!this.patientDownloadToken() && !this.patientCopyEmailedHint() && !this.emailSentMessage();
  }

  ngOnInit(): void {
    this.publicPageBody.enterPublicPage();
    try {
      this.dark.set(localStorage.getItem('gestgo_form_dark_mode') === '1');
    } catch {
      /* ignore */
    }
  }

  ngOnDestroy(): void {
    this.publicPageBody.leavePublicPage();
  }

  baixarCopia(): void {
    const token = this.patientDownloadToken();
    if (!token || this.downloading()) return;
    this.downloading.set(true);
    this.formularioService.downloadPatientCopy(token).subscribe({
      next: (blob) => {
        this.downloading.set(false);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `protocolo-${this.protocolNumber() || 'copia'}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: () => {
        this.downloading.set(false);
        const url = this.patientDownloadUrl();
        if (url) {
          window.open(url, '_blank', 'noopener');
          return;
        }
        this.toast.error('Download', 'Não foi possível baixar o PDF. O link pode ter expirado.');
      },
    });
  }

  enviarCopiaPorEmail(): void {
    const token = this.patientDownloadToken();
    if (!token || this.emailSending()) return;
    const email = this.emailCapture.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.toast.error('E-mail', 'Informe um e-mail válido.');
      return;
    }
    this.emailSending.set(true);
    this.formularioService.emailPatientCopy(token, email).subscribe({
      next: (res) => {
        this.emailSending.set(false);
        this.patientCopyEmailedHint.set(true);
        const msg = res.message || 'Enviamos o link para o e-mail informado.';
        this.emailSentMessage.set(msg);
        this.toast.success('E-mail', msg);
      },
      error: (err) => {
        this.emailSending.set(false);
        this.toast.error('E-mail', err.error?.message ?? 'Não foi possível enviar o e-mail.');
      },
    });
  }
}
