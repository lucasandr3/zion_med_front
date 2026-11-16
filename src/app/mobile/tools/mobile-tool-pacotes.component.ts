import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  ViewChild,
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
  readonly items = signal<MobilePackage[]>([]);
  personId: number | null = null;
  serviceId: number | null = null;
  clientName = '';
  clientPhone = '';
  label = '';
  total = 5;

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
          this.personId = null;
          this.serviceId = null;
          this.clientName = '';
          this.clientPhone = '';
          this.label = '';
          this.toast.success('Pacotes', 'Pacote criado.');
        },
        error: (err) => this.toast.error('Pacotes', err?.error?.message || 'Falha ao criar.'),
      });
  }

  registrar(id: number): void {
    this.tools.registerSession(id).subscribe({
      next: (row) => {
        this.items.update((list) => list.map((p) => (p.id === row.id ? row : p)));
        this.toast.success('Pacotes', 'Sessão registrada.');
      },
      error: (err) => this.toast.error('Pacotes', err?.error?.message || 'Falha.'),
    });
  }

  pct(p: MobilePackage): number {
    if (!p.total_sessions) return 0;
    return Math.min(100, Math.round((100 * p.done_sessions) / p.total_sessions));
  }
}
