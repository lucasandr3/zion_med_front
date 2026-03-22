import { Component, OnInit, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlataformaService, PlatformTenant } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../../shared/components/skeletons';

@Component({
  selector: 'app-plataforma-clientes',
  standalone: true,
  imports: [CommonModule, RouterLink, ZmSkeletonListComponent],
  templateUrl: './plataforma-clientes.component.html',
  styleUrl: './plataforma-clientes.component.css',
})
export class PlataformaClientesComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  estadoErro = false;
  tenants: PlatformTenant[] = [];

  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getTenants());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.tenants = res.data ?? [];
      },
      error: () => {
        this.listaPronta = true;
        this.estadoErro = true;
      },
    });
  }
}
