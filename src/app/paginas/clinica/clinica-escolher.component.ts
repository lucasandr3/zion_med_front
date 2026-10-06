import { Component, OnInit, inject, Signal, ChangeDetectionStrategy, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ClinicaService, ClinicaOption } from '../../core/services/clinica.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { ListSkeletonComponent } from '../../shared/components/list-skeleton/list-skeleton.component';
import { ToastService } from '../../core/services/toast.service';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-clinica-escolher',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page' },
  imports: [ZmPageBackLinkComponent, ListSkeletonComponent],
  templateUrl: './clinica-escolher.component.html',
  styleUrl: './clinica-escolher.component.css',
})
export class ClinicaEscolherComponent implements OnInit {
  readonly clinicas = signal<ClinicaOption[]>([]);
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly erro = signal('');
  readonly escolhendoId = signal<number | null>(null);
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
        this.listaPronta.set(true);
        this.clinicas.set(list);
      },
      error: () => {
        this.listaPronta.set(true);
        this.erro.set('Não foi possível carregar as empresas.');
      },
    });
  }

  inicial(nome: string): string {
    if (!nome) return '?';
    return nome.trim().charAt(0).toUpperCase();
  }

  escolher(clinicId: number): void {
    this.escolhendoId.set(clinicId);
    this.clinicaService
      .escolher(clinicId)
      .pipe(switchMap(() => this.auth.me()))
      .subscribe({
        next: () => {
          this.escolhendoId.set(null);
          this.toast.success('Empresa selecionada', 'Redirecionando…');
          this.router.navigateByUrl(this.auth.getDefaultTenantPath());
        },
        error: () => {
          this.escolhendoId.set(null);
          this.erro.set('Não foi possível trocar de empresa.');
          this.toast.error('Erro', this.erro());
        },
      });
  }
}
