import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { MobileToolsService, type MobilePackage } from '../../core/services/mobile-tools.service';
import { ToastService } from '../../core/services/toast.service';
import { injectMobileToolContext } from './mobile-tool-context';
import {
  ToolPersonFieldComponent,
  type ToolPersonValue,
} from './tool-person-field.component';
import {
  ToolServiceFieldComponent,
  type ToolServiceValue,
} from './tool-service-field.component';

type PacoteFilter = 'active' | 'completed' | 'all';

@Component({
  selector: 'app-mobile-tool-pacotes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    '[class.n-page]': '!isMobileShell',
    '[class.n-page--flush]': '!isMobileShell',
    '[class.gm-tool--desktop]': '!isMobileShell',
  },
  imports: [
    FormsModule,
    RouterLink,
    GestgoCardComponent,
    ZmPageBackLinkComponent,
    ToolPersonFieldComponent,
    ToolServiceFieldComponent,
  ],
  templateUrl: './mobile-tool-pacotes.component.html',
  styleUrls: ['../mobile-shared.css', './ferramentas-tool-desktop.css'],
})
export class MobileToolPacotesComponent implements OnInit {
  @ViewChild(ToolPersonFieldComponent) private personField?: ToolPersonFieldComponent;
  @ViewChild(ToolServiceFieldComponent) private serviceField?: ToolServiceFieldComponent;

  private readonly toolCtx = injectMobileToolContext();
  readonly isMobileShell = this.toolCtx.isMobileShell;
  readonly backLink = this.toolCtx.backLink;

  private readonly tools = inject(MobileToolsService);
  private readonly toast = inject(ToastService);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly showForm = signal(false);
  readonly items = signal<MobilePackage[]>([]);
  readonly filter = signal<PacoteFilter>('active');
  readonly actingId = signal<number | null>(null);

  personId: number | null = null;
  serviceId: number | null = null;
  clientName = '';
  clientPhone = '';
  label = '';
  total = 5;

  readonly activeCount = computed(
    () => this.items().filter((p) => p.status !== 'completed').length,
  );

  readonly filtered = computed(() => {
    const f = this.filter();
    const list = this.items();
    if (f === 'active') return list.filter((p) => p.status !== 'completed');
    if (f === 'completed') return list.filter((p) => p.status === 'completed');
    return list;
  });

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.loading.set(true);
    this.tools.packages().subscribe({
      next: (list) => {
        this.items.set(list || []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Pacotes', 'Não foi possível carregar.');
      },
    });
  }

  setFilter(f: PacoteFilter): void {
    this.filter.set(f);
  }

  abrirForm(): void {
    this.showForm.set(true);
  }

  fecharForm(): void {
    this.showForm.set(false);
    this.resetForm();
  }

  onPersonChange(value: ToolPersonValue): void {
    this.personId = value.personId;
    this.clientName = value.name;
    this.clientPhone = value.phone;
  }

  onServiceChange(value: ToolServiceValue): void {
    this.serviceId = value.serviceId;
    this.label = value.name;
  }

  async criar(): Promise<void> {
    const person = (await this.personField?.ensurePerson()) ?? null;
    if (!person?.name) {
      this.toast.error('Pacotes', 'Informe ou cadastre o cliente.');
      return;
    }
    const service = (await this.serviceField?.ensureService()) ?? null;
    if (!service?.name) {
      this.toast.error('Pacotes', 'Informe ou cadastre o serviço.');
      return;
    }
    this.personId = person.personId;
    this.clientName = person.name;
    this.clientPhone = person.phone;
    this.serviceId = service.serviceId;
    this.label = service.name;
    this.saving.set(true);
    this.tools
      .createPackage({
        client_name: person.name,
        label: service.name,
        total_sessions: Math.max(1, Math.floor(Number(this.total) || 1)),
        person_id: person.personId,
      })
      .subscribe({
        next: (row) => {
          this.items.update((list) => [row, ...list]);
          this.saving.set(false);
          this.showForm.set(false);
          this.resetForm();
          this.filter.set('active');
          this.toast.success('Pacotes', 'Pacote criado.');
        },
        error: (err) => {
          this.saving.set(false);
          this.toast.error('Pacotes', err?.error?.message || 'Falha ao criar.');
        },
      });
  }

  registrar(p: MobilePackage): void {
    if (p.done_sessions >= p.total_sessions) return;
    this.actingId.set(p.id);
    this.tools.registerSession(p.id).subscribe({
      next: (row) => {
        this.items.update((list) => list.map((x) => (x.id === row.id ? row : x)));
        this.actingId.set(null);
        this.toast.success(
          'Pacotes',
          row.status === 'completed' ? 'Pacote concluído.' : 'Sessão registrada.',
        );
      },
      error: (err) => {
        this.actingId.set(null);
        this.toast.error('Pacotes', err?.error?.message || 'Falha.');
      },
    });
  }

  arquivar(p: MobilePackage): void {
    if (!window.confirm(`Arquivar o pacote de ${p.client_name}?`)) return;
    this.actingId.set(p.id);
    this.tools.archivePackage(p.id).subscribe({
      next: () => {
        this.items.update((list) => list.filter((x) => x.id !== p.id));
        this.actingId.set(null);
        this.toast.success('Pacotes', 'Pacote arquivado.');
      },
      error: () => {
        this.actingId.set(null);
        this.toast.error('Pacotes', 'Falha ao arquivar.');
      },
    });
  }

  pct(p: MobilePackage): number {
    if (!p.total_sessions) return 0;
    return Math.min(100, Math.round((100 * p.done_sessions) / p.total_sessions));
  }

  remaining(p: MobilePackage): number {
    return Math.max(0, p.total_sessions - p.done_sessions);
  }

  private resetForm(): void {
    this.personId = null;
    this.serviceId = null;
    this.clientName = '';
    this.clientPhone = '';
    this.label = '';
    this.total = 5;
  }
}
