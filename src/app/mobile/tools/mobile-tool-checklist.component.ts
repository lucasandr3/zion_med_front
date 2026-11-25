import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
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
  imports: [FormsModule, RouterLink, GestgoCardComponent, ZmPageBackLinkComponent, ...NORD_FORM_IMPORTS],
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
  readonly saving = signal(false);
  readonly items = signal<MobileChecklistItem[]>([]);
  readonly newLabel = signal('');

  readonly pendingItems = computed(() => this.items().filter((i) => !i.done));
  readonly doneItems = computed(() => this.items().filter((i) => i.done));
  readonly doneCount = computed(() => this.doneItems().length);
  readonly progress = computed(() => {
    const total = this.items().length || 1;
    return Math.round((100 * this.doneCount()) / total);
  });
  readonly allDone = computed(
    () => this.items().length > 0 && this.doneCount() === this.items().length,
  );

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.loading.set(true);
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

  setDone(id: string, done: boolean): void {
    const next = this.items().map((i) => (i.id === id ? { ...i, done } : i));
    this.persist(next);
  }

  adicionar(): void {
    const label = this.newLabel().trim();
    if (!label) {
      this.toast.error('Checklist', 'Informe o item.');
      return;
    }
    const id = `custom_${Date.now()}`;
    const next = [...this.items(), { id, label, done: false }];
    this.newLabel.set('');
    this.persist(next, 'Item adicionado.');
  }

  remover(item: MobileChecklistItem): void {
    if (!window.confirm(`Remover "${item.label}" do checklist?`)) return;
    this.persist(
      this.items().filter((i) => i.id !== item.id),
      'Item removido.',
    );
  }

  reset(): void {
    if (!window.confirm('Reiniciar o checklist? Os itens voltam ao padrão e as marcações são limpas.')) {
      return;
    }
    this.saving.set(true);
    this.tools.resetChecklist().subscribe({
      next: (row) => {
        this.items.set(row.items || []);
        this.saving.set(false);
        this.toast.success('Checklist', 'Reiniciado.');
      },
      error: () => {
        this.saving.set(false);
        this.toast.error('Checklist', 'Falha ao reiniciar.');
      },
    });
  }

  private persist(next: MobileChecklistItem[], okMsg?: string): void {
    this.items.set(next);
    this.saving.set(true);
    this.tools.saveChecklist(next).subscribe({
      next: (row) => {
        this.items.set(row.items || next);
        this.saving.set(false);
        if (okMsg) this.toast.success('Checklist', okMsg);
      },
      error: () => {
        this.saving.set(false);
        this.toast.error('Checklist', 'Falha ao salvar.');
        this.reload();
      },
    });
  }
}
