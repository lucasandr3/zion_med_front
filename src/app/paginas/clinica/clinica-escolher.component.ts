import { Component, OnInit, inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ClinicaService, ClinicaOption } from '../../core/services/clinica.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-clinica-escolher',
  standalone: true,
  imports: [CommonModule, ZmSkeletonListComponent],
  templateUrl: './clinica-escolher.component.html',
  styleUrl: './clinica-escolher.component.css',
})
export class ClinicaEscolherComponent implements OnInit {
  clinicas: ClinicaOption[] = [];
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';
  escolhendoId: number | null = null;
  private auth = inject(AuthService);
  private clinicaService = inject(ClinicaService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  private toast = inject(ToastService);

  ngOnInit(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.clinicaService.listParaEscolher());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (list) => {
        this.listaPronta = true;
        this.clinicas = list;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Não foi possível carregar as clínicas.';
      },
    });
  }

  escolher(clinicId: number): void {
    this.escolhendoId = clinicId;
    this.clinicaService
      .escolher(clinicId)
      .pipe(switchMap(() => this.auth.me()))
      .subscribe({
      next: () => {
        this.escolhendoId = null;
        this.toast.success('Empresa selecionada', 'Redirecionando…');
        this.router.navigateByUrl(this.auth.getDefaultTenantPath());
      },
      error: () => {
        this.escolhendoId = null;
        this.erro = 'Não foi possível trocar de clínica.';
        this.toast.error('Erro', this.erro);
      },
    });
  }
}
