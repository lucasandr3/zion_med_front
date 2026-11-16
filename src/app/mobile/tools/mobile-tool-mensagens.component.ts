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
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import {
  MobileToolsService,
  type MobileMessageTemplate,
} from '../../core/services/mobile-tools.service';
import { ToastService } from '../../core/services/toast.service';
import { injectMobileToolContext } from './mobile-tool-context';
import { injectToolPersonContext, whatsappShareUrl } from './tool-person-context';
import { ToolPersonBannerComponent } from './tool-person-banner.component';

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
    ZmPageBackLinkComponent,
    ToolPersonBannerComponent,
  ],
  templateUrl: './mobile-tool-mensagens.component.html',
  styleUrls: ['../mobile-shared.css', './ferramentas-tool-desktop.css'],
})
export class MobileToolMensagensComponent implements OnInit {
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
        this.toast.error('Mensagens', 'Não foi possível carregar os modelos.');
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
        this.toast.success('Mensagens', 'Modelo salvo na clínica.');
      },
      error: (err) => {
        this.saving.set(false);
        this.toast.error('Mensagens', err?.error?.message || 'Falha ao salvar.');
      },
    });
  }

  async copiar(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.preview());
      this.toast.success('Mensagens', 'Texto copiado.');
    } catch {
      this.toast.error('Mensagens', 'Não foi possível copiar.');
    }
  }

  whatsapp(): void {
    window.open(whatsappShareUrl(this.preview(), this.phone()), '_blank', 'noopener,noreferrer');
  }
}
