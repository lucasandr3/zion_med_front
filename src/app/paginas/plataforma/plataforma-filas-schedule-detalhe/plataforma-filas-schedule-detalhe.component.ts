import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  Signal,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlataformaService, PlatformScheduleRow } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';
import { ZmPageBackLinkComponent } from '../../../shared/components/ui';

@Component({
  selector: 'app-plataforma-filas-schedule-detalhe',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ListSkeletonComponent, ZmPageBackLinkComponent],
  templateUrl: './plataforma-filas-schedule-detalhe.component.html',
  styleUrl: './plataforma-filas-schedule-detalhe.component.css',
})
export class PlataformaFilasScheduleDetalheComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly error = signal('');
  readonly item = signal<PlatformScheduleRow | null>(null);

  private route = inject(ActivatedRoute);
  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
      this.plataformaService.getJobSchedule(id),
    );
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.error.set('');
        this.item.set(res.data ?? null);
      },
      error: () => {
        this.listaPronta.set(true);
        this.error.set('Não foi possível carregar o schedule.');
        this.item.set(null);
      },
    });
  }

  statusLabel(status?: string | null): string {
    if (status === 'ok') return 'Última execução ok';
    if (status === 'error') return 'Última execução com erro';
    return 'Ainda sem execução registrada';
  }

  formatarData(iso?: string | null): string {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } catch {
      return iso;
    }
  }
}
