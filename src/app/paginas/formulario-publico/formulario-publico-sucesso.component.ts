import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicPageBodyService } from '../../core/services/public-page-body.service';

@Component({
  selector: 'app-formulario-publico-sucesso',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './formulario-publico-sucesso.component.html',
  styleUrl: './formulario-publico-sucesso.component.css',
})
export class FormularioPublicoSucessoComponent implements OnInit, OnDestroy {
  protocolNumber: string | null = null;
  clinicName: string | null = null;
  clinicLogoUrl: string | null = null;
  dark = false;

  private router = inject(Router);
  private publicPageBody = inject(PublicPageBodyService);

  constructor() {
    const state = this.router.getCurrentNavigation()?.extras?.state as
      | { protocol_number?: string; clinic_name?: string; clinic_logo_url?: string | null }
      | undefined;
    this.protocolNumber = state?.protocol_number ?? null;
    this.clinicName = state?.clinic_name ?? null;
    const logo = state?.clinic_logo_url;
    this.clinicLogoUrl = logo != null && String(logo).trim() !== '' ? String(logo) : null;
  }

  ngOnInit(): void {
    this.publicPageBody.enterPublicPage();
    try {
      this.dark = localStorage.getItem('zionmed_form_dark_mode') === '1';
    } catch {}
  }

  ngOnDestroy(): void {
    this.publicPageBody.leavePublicPage();
  }
}
