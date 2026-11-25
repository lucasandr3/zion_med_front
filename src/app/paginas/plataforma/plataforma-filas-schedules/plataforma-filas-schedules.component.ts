import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  Signal,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlataformaService, PlatformScheduleRow } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';
import { ZmPageBackLinkComponent } from '../../../shared/components/ui';

@Component({
  selector: 'app-plataforma-filas-schedules',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterLink, ListSkeletonComponent, ZmPageBackLinkComponent],
  templateUrl: './plataforma-filas-schedules.component.html',
  styleUrl: './plataforma-filas-schedules.component.css',
})
export class PlataformaFilasSchedulesComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly error = signal('');
  readonly items = signal<PlatformScheduleRow[]>([]);

  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
      this.plataformaService.getJobSchedules(),
    );
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.error.set('');
        this.items.set(res.data ?? []);
      },
      error: () => {
        this.listaPronta.set(true);
        this.error.set('Não foi possível carregar os schedules.');
      },
    });
  }

  statusLabel(status?: string | null): string {
    if (status === 'ok') return 'Última ok';
    if (status === 'error') return 'Última com erro';
    return 'Sem execução';
  }

  formatarData(iso?: string | null): string {
    if (!iso) return 'ainda não rodou';
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
