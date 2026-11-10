import {
  Component,
  OnInit,
  inject,
  Signal,
  ChangeDetectionStrategy,
  signal,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { PlataformaService, PlatformFeedback } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';

@Component({
  selector: 'app-plataforma-feedback',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ListSkeletonComponent],
  templateUrl: './plataforma-feedback.component.html',
  styleUrl: './plataforma-feedback.component.css',
})
export class PlataformaFeedbackComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly estadoErro = signal(false);
  readonly items = signal<PlatformFeedback[]>([]);

  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
      this.plataformaService.getFeedback(),
    );
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.items.set(res.data ?? []);
      },
      error: () => {
        this.listaPronta.set(true);
        this.estadoErro.set(true);
      },
    });
  }

  tipoLabel(type: string): string {
    return type === 'bug' ? 'Problema/bug' : 'Sugestão';
  }

  origemLabel(source?: string | null): string {
    if (source === 'account_menu') return 'Menu da conta';
    if (source === 'go_assistant') return 'Go Assistant';
    return '—';
  }

  formatarData(iso?: string): string {
    if (!iso) return '—';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  }
}
