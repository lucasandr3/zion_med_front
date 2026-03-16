import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-publico-sucesso',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './formulario-publico-sucesso.component.html',
  styleUrl: './formulario-publico-sucesso.component.css',
})
export class FormularioPublicoSucessoComponent {
  protocolNumber: string | null = null;
  clinicName: string | null = null;
  dark = false;

  private router = inject(Router);

  constructor() {
    try {
      this.dark = localStorage.getItem('zionmed_form_dark_mode') === '1';
    } catch {}
    const state = this.router.getCurrentNavigation()?.extras?.state as { protocol_number?: string; clinic_name?: string } | undefined;
    this.protocolNumber = state?.protocol_number ?? null;
    this.clinicName = state?.clinic_name ?? null;
  }
}
