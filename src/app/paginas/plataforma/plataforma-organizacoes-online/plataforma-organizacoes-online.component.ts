import { Component, OnInit, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlataformaService, PlatformOrganizationPresence } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../../shared/components/skeletons';

@Component({
  selector: 'app-plataforma-organizacoes-online',
  standalone: true,
  imports: [CommonModule, ZmSkeletonListComponent],
  templateUrl: './plataforma-organizacoes-online.component.html',
  styleUrl: './plataforma-organizacoes-online.component.css',
})
export class PlataformaOrganizacoesOnlineComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  estadoErro = false;
  linhas: PlatformOrganizationPresence[] = [];

  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getOrganizationPresences());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.linhas = res.data ?? [];
      },
      error: () => {
        this.listaPronta = true;
        this.estadoErro = true;
      },
    });
  }
}
