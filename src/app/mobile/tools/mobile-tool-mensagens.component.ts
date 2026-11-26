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
import { GestgoComboboxComponent, type GestgoComboboxOption } from '@/shared/components/combobox';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import {
  MobileToolsService,
  type MobileMessageTemplate,
} from '../../core/services/mobile-tools.service';
import { ToastService } from '../../core/services/toast.service';
import { injectMobileToolContext } from './mobile-tool-context';
import { injectToolPersonContext, whatsappShareUrl } from './tool-person-context';
import { ToolPersonBannerComponent } from './tool-person-banner.component';
import {
  ToolPersonFieldComponent,
  type ToolPersonValue,
} from './tool-person-field.component';
import {
  ToolServiceFieldComponent,
  type ToolServiceValue,
} from './tool-service-field.component';

export type MessageMoment = 'all' | 'confirmacao' | 'pos' | 'reativacao' | 'outros';

@Component({
  selector: 'app-mobile-tool-mensagens',
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
    GestgoComboboxComponent,
    ZmPageBackLinkComponent,
    ToolPersonBannerComponent,
    ToolPersonFieldComponent,
    ToolServiceFieldComponent,
  ],
  templateUrl: './mobile-tool-mensagens.component.html',
  styleUrls: ['../mobile-shared.css', './ferramentas-tool-desktop.css'],
})
export class MobileToolMensagensComponent implements OnInit {
  @ViewChild(ToolPersonFieldComponent) private personField?: ToolPersonFieldComponent;
  @ViewChild(ToolServiceFieldComponent) private serviceField?: ToolServiceFieldComponent;

  private readonly toolCtx = injectMobileToolContext();
  private readonly personCtx = injectToolPersonContext();
  readonly isMobileShell = this.toolCtx.isMobileShell;
  readonly backLink = this.toolCtx.backLink;

  private readonly tools = inject(MobileToolsService);
  private readonly toast = inject(ToastService);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly templates = signal<MobileMessageTemplate[]>([]);
  readonly selectedId = signal<number | null>(null);
  readonly moment = signal<MessageMoment>('all');
  readonly personId = signal<number | null>(null);
  readonly serviceId = signal<number | null>(null);
  readonly nome = signal('');
  readonly phone = signal('');
  readonly linkedNome = signal('');
  readonly linkedPhone = signal('');
  readonly procedimento = signal('');
  readonly draft = signal('');

  readonly moments: { key: MessageMoment; label: string }[] = [
    { key: 'all', label: 'Todos' },
    { key: 'confirmacao', label: 'Confirmação' },
    { key: 'pos', label: 'Pós-atendimento' },
    { key: 'reativacao', label: 'Reativação' },
    { key: 'outros', label: 'Outros' },
  ];

  readonly filteredTemplates = computed(() => {
    const moment = this.moment();
    const list = this.templates();
    if (moment === 'all') return list;
    return list.filter((t) => this.momentOf(t) === moment);
  });

  readonly templateOptions = computed<GestgoComboboxOption[]>(() =>
    this.filteredTemplates().map((t) => ({ value: String(t.id), label: t.label })),
  );

  readonly templateOptionsWithMoment = computed<GestgoComboboxOption[]>(() =>
    this.filteredTemplates().map((t) => ({
      value: String(t.id),
      label: `${t.label} · ${this.momentLabel(t)}`,
    })),
  );

  readonly selectedValue = computed(() => {
    const id = this.selectedId();
    return id == null ? null : String(id);
  });

  readonly selected = computed(() => {
    const id = this.selectedId();
    return this.templates().find((t) => t.id === id) || null;
  });

  readonly preview = computed(() =>
    this.draft()
      .replaceAll('{nome}', this.nome().trim() || 'cliente')
      .replaceAll('{procedimento}', this.procedimento().trim() || 'seu atendimento'),
  );

  ngOnInit(): void {
    this.personId.set(this.personCtx.personId);
    if (this.personCtx.nome) {
      this.nome.set(this.personCtx.nome);
      this.linkedNome.set(this.personCtx.nome);
    }
    if (this.personCtx.phone) {
      this.phone.set(this.personCtx.phone);
      this.linkedPhone.set(this.personCtx.phone);
    }

    this.tools.messages().subscribe({
      next: (list) => {
        this.templates.set(list || []);
        const first = list[0];
        if (first) {
          this.selectedId.set(first.id);
          this.draft.set(first.body);
        }
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Notificações', 'Não foi possível carregar os modelos.');
      },
    });
  }

  setMoment(m: MessageMoment): void {
    this.moment.set(m);
    const filtered = this.filteredTemplates();
    const current = this.selectedId();
    if (!filtered.some((t) => t.id === current)) {
      const first = filtered[0];
      if (first) this.onSelect(first.id);
      else {
        this.selectedId.set(null);
        this.draft.set('');
      }
    }
  }

  onSelectValue(value: string | null): void {
    if (!value) return;
    const id = Number(value);
    if (Number.isFinite(id)) this.onSelect(id);
  }

  onSelect(id: number): void {
    this.selectedId.set(id);
    const t = this.templates().find((x) => x.id === id);
    if (t) this.draft.set(t.body);
  }

  momentOf(t: MobileMessageTemplate): Exclude<MessageMoment, 'all'> {
    const hay = `${t.key} ${t.label}`.toLowerCase();
    if (/confirm|agend|lembrete|reminder/.test(hay)) return 'confirmacao';
    if (/p[oó]s|after|cuidad|recupera|agradec/.test(hay)) return 'pos';
    if (/reativ|retorno|inativ|win.?back|comeback|sumiu/.test(hay)) return 'reativacao';
    return 'outros';
  }

  momentLabel(t: MobileMessageTemplate): string {
    const m = this.momentOf(t);
    return this.moments.find((x) => x.key === m)?.label || 'Outros';
  }

  salvar(): void {
    const id = this.selectedId();
    if (!id) return;
    this.saving.set(true);
    this.tools.updateMessage(id, this.draft()).subscribe({
      next: (updated) => {
        this.templates.update((list) => list.map((t) => (t.id === updated.id ? updated : t)));
        this.saving.set(false);
        this.toast.success('Notificações', 'Modelo salvo na clínica.');
      },
      error: (err) => {
        this.saving.set(false);
        this.toast.error('Notificações', err?.error?.message || 'Falha ao salvar.');
      },
    });
  }

  async copiar(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.preview());
      this.toast.success('Notificações', 'Texto copiado.');
    } catch {
      this.toast.error('Notificações', 'Não foi possível copiar.');
    }
  }

  onPersonChange(value: ToolPersonValue): void {
    this.personId.set(value.personId);
    this.nome.set(value.name);
    this.phone.set(value.phone);
  }

  onServiceChange(value: ToolServiceValue): void {
    this.serviceId.set(value.serviceId);
    this.procedimento.set(value.name);
  }

  async whatsapp(): Promise<void> {
    const person = (await this.personField?.ensurePerson()) ?? null;
    if (person) {
      this.personId.set(person.personId);
      this.nome.set(person.name);
      this.phone.set(person.phone);
    }
    const service = (await this.serviceField?.ensureService()) ?? null;
    if (service?.name) {
      this.serviceId.set(service.serviceId);
      this.procedimento.set(service.name);
    }
    window.open(whatsappShareUrl(this.preview(), this.phone()), '_blank', 'noopener,noreferrer');
  }
}
