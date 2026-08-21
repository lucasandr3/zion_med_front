import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicPageBodyService } from '../../core/services/public-page-body.service';
import { FormularioPublicoService } from '../../core/services/formulario-publico.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-formulario-publico-sucesso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formulario-publico-sucesso.component.html',
  styleUrl: './formulario-publico-sucesso.component.css',
})
export class FormularioPublicoSucessoComponent implements OnInit, OnDestroy {
  protocolNumber: string | null = null;
  clinicName: string | null = null;
  clinicLogoUrl: string | null = null;
  patientDownloadToken: string | null = null;
  patientDownloadUrl: string | null = null;
  patientCopyEmailedHint = false;
  downloading = false;
  dark = false;

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
        }
      | undefined;
    this.protocolNumber = state?.protocol_number ?? null;
    this.clinicName = state?.clinic_name ?? null;
    const logo = state?.clinic_logo_url;
    this.clinicLogoUrl = logo != null && String(logo).trim() !== '' ? String(logo) : null;
    this.patientDownloadToken = state?.patient_download_token?.trim() || null;
    this.patientDownloadUrl = state?.patient_download_url?.trim() || null;
    this.patientCopyEmailedHint = !!(state?.submitter_email && String(state.submitter_email).trim());
  }

  ngOnInit(): void {
    this.publicPageBody.enterPublicPage();
    try {
      this.dark = localStorage.getItem('gestgo_form_dark_mode') === '1';
    } catch {}
  }

  ngOnDestroy(): void {
    this.publicPageBody.leavePublicPage();
  }

  baixarCopia(): void {
    if (!this.patientDownloadToken || this.downloading) return;
    this.downloading = true;
    this.formularioService.downloadPatientCopy(this.patientDownloadToken).subscribe({
      next: (blob) => {
        this.downloading = false;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `protocolo-${this.protocolNumber || 'copia'}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: () => {
        this.downloading = false;
        if (this.patientDownloadUrl) {
          window.open(this.patientDownloadUrl, '_blank', 'noopener');
          return;
        }
        this.toast.error('Download', 'Não foi possível baixar o PDF. O link pode ter expirado.');
      },
    });
  }
}
