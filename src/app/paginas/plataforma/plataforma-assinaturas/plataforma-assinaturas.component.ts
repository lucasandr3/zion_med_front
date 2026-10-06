import { Component, OnInit, inject, Signal, ChangeDetectionStrategy, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { catchError } from 'rxjs';
import { PlataformaService, PlatformSubscription } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';
import { statusAssinaturaOuCobrancaPt } from '../../../core/utils/status-labels-pt';

@Component({
  selector: 'app-plataforma-assinaturas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ListSkeletonComponent],
  templateUrl: './plataforma-assinaturas.component.html',
  styleUrl: './plataforma-assinaturas.component.css',
})
export class PlataformaAssinaturasComponent implements OnInit {
  protected readonly rotuloStatusAssinaturaCobranca = statusAssinaturaOuCobrancaPt;

  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly estadoErro = signal(false);
  readonly assinaturas = signal<PlatformSubscription[]>([]);

  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    const load$ = this.plataformaService.getSubscriptions().pipe(
      catchError(() => this.plataformaService.getSubscriptionsFromTenants()),
    );
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(load$);
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.assinaturas.set(res.data ?? []);
      },
      error: () => {
        this.listaPronta.set(true);
        this.estadoErro.set(true);
      },
    });
  }

  formatarData(iso?: string | null): string {
    if (!iso) return '—';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return iso;
    }
  }

  badgeVariant(status?: string | null): 'success' | 'warning' | 'danger' | 'neutral' | 'info' {
    const k = (status ?? '').toLowerCase();
    if (['active', 'ok'].includes(k)) return 'success';
    if (['trial', 'attention', 'past_due'].includes(k)) return 'warning';
    if (['blocked', 'inactive'].includes(k)) return 'danger';
    return 'neutral';
  }
}
