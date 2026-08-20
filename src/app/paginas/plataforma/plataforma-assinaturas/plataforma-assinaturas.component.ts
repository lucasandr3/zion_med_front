import { Component, OnInit, inject, Signal } from '@angular/core';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { catchError } from 'rxjs';
import { PlataformaService, PlatformSubscription } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../../shared/components/skeletons';
import { ZmEmptyStateComponent } from '../../../shared/components/ui';
import { statusAssinaturaOuCobrancaPt } from '../../../core/utils/status-labels-pt';
import { ZardTableImports } from '@/shared/components/table';
@Component({
  selector: 'app-plataforma-assinaturas',
  standalone: true,
  imports: [
    ...ZardTableImports,
    ZardCardComponent,
    ZardBadgeComponent,
    ZmSkeletonListComponent,
    ZmEmptyStateComponent,
  ],
  templateUrl: './plataforma-assinaturas.component.html',
  styleUrl: './plataforma-assinaturas.component.css',
})
export class PlataformaAssinaturasComponent implements OnInit {
  protected readonly rotuloStatusAssinaturaCobranca = statusAssinaturaOuCobrancaPt;

  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  estadoErro = false;
  assinaturas: PlatformSubscription[] = [];

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
        this.listaPronta = true;
        this.assinaturas = res.data ?? [];
      },
      error: () => {
        this.listaPronta = true;
        this.estadoErro = true;
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

  badgeTipoStatus(status?: string | null): 'default' | 'secondary' | 'destructive' | 'outline' {
    const k = (status ?? '').toLowerCase();
    if (['active', 'ok'].includes(k)) return 'default';
    if (['trial', 'attention', 'past_due'].includes(k)) return 'secondary';
    if (['blocked', 'inactive'].includes(k)) return 'destructive';
    return 'outline';
  }
}
