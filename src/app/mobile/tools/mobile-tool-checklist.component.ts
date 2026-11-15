import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import {
  MobileToolsService,
  type MobileChecklistItem,
} from '../../core/services/mobile-tools.service';
import { ToastService } from '../../core/services/toast.service';
import { injectMobileToolContext } from './mobile-tool-context';

@Component({
  selector: 'app-mobile-tool-checklist',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    '[class.n-page]': '!isMobileShell',
    '[class.n-page--flush]': '!isMobileShell',
    '[class.gm-tool--desktop]': '!isMobileShell',
  },
  imports: [RouterLink, GestgoCardComponent, ZmPageBackLinkComponent],
  templateUrl: './mobile-tool-checklist.component.html',
  styleUrls: ['../mobile-shared.css', './ferramentas-tool-desktop.css'],
})
export class MobileToolChecklistComponent implements OnInit {
  private readonly toolCtx = injectMobileToolContext();
  readonly isMobileShell = this.toolCtx.isMobileShell;
  readonly backLink = this.toolCtx.backLink;

  private readonly tools = inject(MobileToolsService);
  private readonly toast = inject(ToastService);

  readonly loading = signal(true);
  readonly items = signal<MobileChecklistItem[]>([]);

  readonly doneCount = computed(() => this.items().filter((i) => i.done).length);
  readonly progress = computed(() => {
    const total = this.items().length || 1;
    return Math.round((100 * this.doneCount()) / total);
  });

  ngOnInit(): void {
    this.tools.checklist().subscribe({
      next: (row) => {
        this.items.set(row.items || []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Checklist', 'Não foi possível carregar.');
      },
    });
  }

  toggle(id: string): void {
    const next = this.items().map((i) => (i.id === id ? { ...i, done: !i.done } : i));
    this.items.set(next);
    this.tools.saveChecklist(next).subscribe({
      error: () => this.toast.error('Checklist', 'Falha ao salvar.'),
    });
  }

  reset(): void {
    this.tools.resetChecklist().subscribe({
      next: (row) => {
        this.items.set(row.items || []);
        this.toast.success('Checklist', 'Reiniciado.');
      },
      error: () => this.toast.error('Checklist', 'Falha ao reiniciar.'),
    });
  }
}
