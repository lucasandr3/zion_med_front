import { Component, OnInit, inject, Signal, ChangeDetectionStrategy, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ClinicaService, ClinicaOption } from '../../core/services/clinica.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { ListSkeletonComponent } from '../../shared/components/list-skeleton/list-skeleton.component';
import { ToastService } from '../../core/services/toast.service';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-clinica-escolher',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
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
  readonly empresaAtualId = signal<number | null>(null);
  readonly empresaAtualNome = signal('');
  private auth = inject(AuthService);
  private clinicaService = inject(ClinicaService);
  private confirm = inject(ConfirmDialogService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  private toast = inject(ToastService);

  ngOnInit(): void {
    this.syncEmpresaAtual();
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

  isAtual(c: ClinicaOption): boolean {
    const id = this.empresaAtualId();
    return id != null && Number(c.id) === id;
  }

  private syncEmpresaAtual(): void {
    const id = this.auth.getCurrentOrganizationId();
    this.empresaAtualId.set(id != null && id !== '' ? Number(id) : null);
    this.empresaAtualNome.set(this.auth.getCurrentOrganization()?.name?.trim() ?? '');
  }

  async escolher(c: ClinicaOption): Promise<void> {
    if (this.escolhendoId() !== null || this.isAtual(c)) return;
    const ok = await this.confirm.request({
      title: 'Trocar de empresa?',
      messageBefore: 'A empresa ',
      emphasis: c.name,
      messageAfter:
        ' será selecionada e você será redirecionado. Salve qualquer alteração em andamento. Dados não salvos na empresa atual podem ser perdidos.',
      confirmLabel: 'Sim, trocar empresa',
      cancelLabel: 'Cancelar',
      variant: 'neutral',
    });
    if (!ok) return;

    this.escolhendoId.set(c.id);
    this.clinicaService
      .escolher(c.id)
      .pipe(switchMap(() => this.auth.me()))
      .subscribe({
        next: () => {
          this.escolhendoId.set(null);
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
