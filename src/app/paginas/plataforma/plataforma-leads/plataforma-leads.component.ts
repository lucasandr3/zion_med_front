import { Component, OnInit, inject, Signal, ChangeDetectionStrategy, signal } from '@angular/core';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { PlataformaService, PlatformLead } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../../shared/components/skeletons';
import { ZmEmptyStateComponent } from '../../../shared/components/ui';
import { ZardTableImports } from '@/shared/components/table';
@Component({
  selector: 'app-plataforma-leads',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ...ZardTableImports,
    ZardCardComponent,
    ZmSkeletonListComponent,
    ZmEmptyStateComponent,
  ],
  templateUrl: './plataforma-leads.component.html',
  styleUrl: './plataforma-leads.component.css',
})
export class PlataformaLeadsComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly estadoErro = signal(false);
  readonly leads = signal<PlatformLead[]>([]);

  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getLeads());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.leads.set(res.data ?? []);
      },
      error: () => {
        this.listaPronta.set(true);
        this.estadoErro.set(true);
      },
    });
  }

  formatarData(iso?: string): string {
    if (!iso) return '—';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return iso;
    }
  }
}
