import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClinicaService, ClinicaOption } from '../../core/services/clinica.service';
import { LoadingOverlayComponent } from '../../componentes/ui/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-clinica-escolher',
  standalone: true,
  imports: [CommonModule, LoadingOverlayComponent],
  templateUrl: './clinica-escolher.component.html',
  styleUrl: './clinica-escolher.component.css',
})
export class ClinicaEscolherComponent implements OnInit {
  clinicas: ClinicaOption[] = [];
  carregando = false;
  erro = '';
  salvando = false;
  private clinicaService = inject(ClinicaService);
  private router = inject(Router);

  ngOnInit(): void {
    this.carregando = true;
    this.clinicaService.listParaEscolher().subscribe({
      next: (list) => {
        this.clinicas = list;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.erro = 'Não foi possível carregar as clínicas.';
      },
    });
  }

  escolher(clinicId: number): void {
    this.salvando = true;
    this.clinicaService.escolher(clinicId).subscribe({
      next: () => {
        this.salvando = false;
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.salvando = false;
        this.erro = 'Não foi possível trocar de clínica.';
      },
    });
  }
}
