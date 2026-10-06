import { Component, OnInit, inject, Signal, ChangeDetectionStrategy, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlataformaService, PlatformLead } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';

@Component({
  selector: 'app-plataforma-leads',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ListSkeletonComponent],
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
