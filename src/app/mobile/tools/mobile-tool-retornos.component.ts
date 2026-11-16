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
import { Router, RouterLink } from '@angular/router';
import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { MobileToolsService, type MobileFollowup } from '../../core/services/mobile-tools.service';
import { ToastService } from '../../core/services/toast.service';
import { injectMobileToolContext } from './mobile-tool-context';
import { injectToolPersonContext, whatsappShareUrl } from './tool-person-context';
import { ToolPersonBannerComponent } from './tool-person-banner.component';

type RetornoFiltro = 'pending' | 'contacted' | 'all';

const MOTIVOS = [
  'Retorno após procedimento',
  'Confirmar interesse no orçamento',
  'Reativar contato',
  'Lembrar manutenção / sessão',
  'Pós-atendimento — como está?',
] as const;

@Component({
  selector: 'app-mobile-tool-retornos',
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
  templateUrl: './mobile-tool-retornos.component.html',
  styleUrls: ['../mobile-shared.css', './ferramentas-tool-desktop.css'],
})
export class MobileToolRetornosComponent implements OnInit {
  private readonly toolCtx = injectMobileToolContext();
  private readonly personCtx = injectToolPersonContext();
  private readonly router = inject(Router);
  private readonly tools = inject(MobileToolsService);
  private readonly toast = inject(ToastService);

  readonly isMobileShell = this.toolCtx.isMobileShell;
  readonly mode = this.toolCtx.mode;
  readonly backLink = this.toolCtx.backLink;
  readonly listLink = this.toolCtx.listLink;
  readonly formLink = this.toolCtx.formLink;

  readonly loading = signal(true);
  readonly items = signal<MobileFollowup[]>([]);
  readonly filtro = signal<RetornoFiltro>('pending');
  readonly motivos = MOTIVOS;
  readonly creating = signal(false);

  clientName = '';
  clientPhone = '';
  dueOn = '';
  linkedNome = '';
  linkedPhone = '';
  personId: number | null = null;
  detail = '';

  readonly visible = computed(() => {
    const f = this.filtro();
    const list = this.items();
    if (f === 'all') return list;
    if (f === 'contacted') return list.filter((i) => i.status === 'contacted');
    return list.filter((i) => i.status !== 'contacted');
  });

  readonly pendingCount = computed(() => this.items().filter((i) => i.status !== 'contacted').length);

  ngOnInit(): void {
    this.personId = this.personCtx.personId;
    if (this.personCtx.nome) {
      this.clientName = this.personCtx.nome;
      this.linkedNome = this.personCtx.nome;
    }
    if (this.personCtx.phone) {
      this.clientPhone = this.personCtx.phone;
      this.linkedPhone = this.personCtx.phone;
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.dueOn = tomorrow.toISOString().slice(0, 10);

    if (this.mode === 'list') {
      this.reload();
    } else {
      this.loading.set(false);
    }
  }

  personQuery(): Record<string, string> {
    const q: Record<string, string> = {};
    if (this.personId) q['person_id'] = String(this.personId);
    if (this.linkedNome) q['nome'] = this.linkedNome;
    if (this.linkedPhone) q['phone'] = this.linkedPhone;
    return q;
  }

  reload(): void {
    this.loading.set(true);
    this.tools.followups().subscribe({
      next: (list) => {
        this.items.set(list || []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Retornos', 'Não foi possível carregar.');
      },
    });
  }

  usarMotivo(motivo: string): void {
    this.detail = motivo;
  }

  criar(): void {
    if (!this.clientName.trim() || !this.detail.trim()) {
      this.toast.error('Retornos', 'Informe a pessoa e o motivo do retorno.');
      return;
    }
    this.creating.set(true);
    this.tools
      .createFollowup({
        client_name: this.clientName.trim(),
        detail: this.detail.trim(),
        person_id: this.personId,
        phone: this.clientPhone.trim() || null,
        due_on: this.dueOn || null,
      })
      .subscribe({
        next: () => {
          this.creating.set(false);
          this.toast.success('Retornos', 'Retorno agendado.');
          void this.router.navigate([this.listLink], { queryParams: this.personQuery() });
        },
        error: (err) => {
          this.creating.set(false);
          this.toast.error('Retornos', err?.error?.message || 'Falha.');
        },
      });
  }

  toggle(id: number): void {
    this.tools.toggleFollowup(id).subscribe({
      next: (row) => this.items.update((list) => list.map((i) => (i.id === row.id ? row : i))),
      error: () => this.toast.error('Retornos', 'Falha ao atualizar.'),
    });
  }

  whatsapp(item: MobileFollowup): void {
    const text = `Olá, ${item.client_name}! ${item.detail}`;
    const phone = item.phone || this.clientPhone;
    window.open(whatsappShareUrl(text, phone), '_blank', 'noopener,noreferrer');
  }

  formatContato(item: MobileFollowup): string {
    if (!item.contacted_at) return '';
    try {
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(item.contacted_at));
    } catch {
      return '';
    }
  }

  formatDue(raw?: string | null): string {
    if (!raw) return '';
    try {
      const d = new Date(raw.length === 10 ? `${raw}T12:00:00` : raw);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
      }).format(d);
    } catch {
      return '';
    }
  }

  isOverdue(item: MobileFollowup): boolean {
    if (!item.due_on || item.status === 'contacted') return false;
    const due = new Date(item.due_on.length === 10 ? `${item.due_on}T23:59:59` : item.due_on);
    return due.getTime() < Date.now();
  }

  statusLabel(item: MobileFollowup): string {
    if (item.status === 'contacted') return 'Contatado';
    if (this.isOverdue(item)) return 'Atrasado';
    return 'Pendente';
  }

  statusIcon(item: MobileFollowup): string {
    if (item.status === 'contacted') return 'check_circle';
    if (this.isOverdue(item)) return 'warning';
    return 'schedule';
  }
}
