import { Component, OnInit, OnDestroy, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { PlataformaService, PlatformTenantDetail } from '../../../core/services/plataforma.service';
import { PlataformaHeaderService } from '../../../core/services/plataforma-header.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../../shared/components/skeletons';
import { ZmEmptyStateComponent } from '../../../shared/components/ui';
import { statusAssinaturaOuCobrancaPt } from '../../../core/utils/status-labels-pt';

import { ZardTableImports } from '@/shared/components/table';
@Component({
  selector: 'app-plataforma-cliente-detalhe',
  standalone: true,
  imports: [
    ...ZardTableImports,CommonModule, ZardCardComponent, ZmSkeletonListComponent, ZmEmptyStateComponent],
  templateUrl: './plataforma-cliente-detalhe.component.html',
  styleUrl: './plataforma-cliente-detalhe.component.css',
})
export class PlataformaClienteDetalheComponent implements OnInit, OnDestroy {
  protected readonly rotuloStatusAssinaturaCobranca = statusAssinaturaOuCobrancaPt;

  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  estadoErro = false;
  data: PlatformTenantDetail | null = null;

  private route = inject(ActivatedRoute);
  private plataformaService = inject(PlataformaService);
  private headerService = inject(PlataformaHeaderService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getTenant(+id));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.data = res.data;
        if (res.data?.tenant) {
          this.headerService.setHeader(
            'Cliente: ' + res.data.tenant.name,
            'Detalhes do cliente e empresas vinculadas.',
          );
        }
      },
      error: () => {
        this.listaPronta = true;
        this.estadoErro = true;
      },
    });
  }

  ngOnDestroy(): void {
    this.headerService.clearHeader();
  }
}
