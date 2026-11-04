import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  effect,
  viewChild,
  ElementRef,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, forkJoin, of } from 'rxjs';
import {
  AgendaAppointment,
  AgendaAvailabilityRule,
  AgendaService,
  AgendaServiceItem,
} from '../../core/services/agenda.service';
import { TemplatesService, Template } from '../../core/services/templates.service';
import { LinksPublicosService, type LinkPublico } from '../../core/services/links-publicos.service';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { ListSkeletonComponent } from '../../shared/components/list-skeleton/list-skeleton.component';
import { GestgoComboboxComponent, type GestgoComboboxOption } from '@/shared/components/combobox';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
import { formatarDataBr, formatarDataHoraBr } from '@/shared/utils/date';
import { absoluteMediaUrl } from '../../core/utils/absolute-media-url';

type VisaoAgenda = 'mes' | 'lista' | 'config';
type ConfigSecao = 'servicos' | 'expediente';
type ModalAgendaModo = 'dia' | 'criar';

type NordModalElement = HTMLElement & {
  showModal: () => void;
  close: (returnValue?: string) => void;
  open: boolean;
  shadowRoot: ShadowRoot | null;
};

const CENTER_STYLE_ATTR = 'data-gestgo-modal-center';

interface CalCell {
  key: string;
  day: number;
  inMonth: boolean;
  isToday: boolean;
  events: AgendaAppointment[];
}

const WEEKDAYS = [
  { value: 1, label: 'Seg', full: 'Segunda' },
  { value: 2, label: 'Ter', full: 'Terça' },
  { value: 3, label: 'Qua', full: 'Quarta' },
  { value: 4, label: 'Qui', full: 'Quinta' },
  { value: 5, label: 'Sex', full: 'Sexta' },
  { value: 6, label: 'Sáb', full: 'Sábado' },
  { value: 0, label: 'Dom', full: 'Domingo' },
];

type DayInterval = { start: string; end: string };
type DayRule = { enabled: boolean; intervals: DayInterval[] };

const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-agenda',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  imports: [...NORD_FORM_IMPORTS, FormsModule, ListSkeletonComponent, GestgoComboboxComponent],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css',
})
export class AgendaComponent implements OnInit {
  private agenda = inject(AgendaService);
  private templatesApi = inject(TemplatesService);
  private linksPublicosApi = inject(LinksPublicosService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);
  private readonly diaModalRef = viewChild<ElementRef<NordModalElement>>('diaModal');
  private readonly servicoModalRef = viewChild<ElementRef<NordModalElement>>('servicoModal');

  readonly weekdays = WEEKDAYS;
  readonly diasSemanaLabels = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'];
  readonly visoes: { key: VisaoAgenda; label: string }[] = [
    { key: 'mes', label: 'Mês' },
    { key: 'lista', label: 'Lista' },
    { key: 'config', label: 'Configuração' },
  ];

  readonly configSecoes: { key: ConfigSecao; label: string; icon: string }[] = [
    { key: 'servicos', label: 'Serviços', icon: 'medical_services' },
    { key: 'expediente', label: 'Expediente', icon: 'schedule' },
  ];

  readonly visao = signal<VisaoAgenda>('mes');
  readonly configSecao = signal<ConfigSecao>('servicos');
  readonly cursor = signal(new Date());
  readonly selectedDay = signal<string | null>(null);
  readonly modalAberto = signal(false);
  readonly modalModo = signal<ModalAgendaModo>('dia');
  /** Quando true, Cancelar no formulário volta à lista do dia em vez de fechar. */
  readonly criarVeioDoDia = signal(false);
  readonly servicoModalAberto = signal(false);
  readonly servicos = signal<AgendaServiceItem[]>([]);
  readonly reservas = signal<AgendaAppointment[]>([]);
  readonly salvando = signal(false);
  readonly carregando = signal(false);
  readonly listaPronta = signal(false);
  readonly erro = signal('');
  readonly acaoId = signal<number | null>(null);
  readonly fichasDisponiveis = signal<Template[]>([]);
  readonly servicoPhotoPreview = signal<string | null>(null);
  private servicoPhotoFile: File | null = null;
  private servicoPhotoRemoved = false;
  /** Evita fechar o modal no light-dismiss ao escolher opção do combobox. */
  private ignoreServicoModalDismissUntil = 0;

  readonly modalTitulo = computed(() => {
    const day = this.selectedDay();
    if (this.modalModo() === 'criar') return 'Novo compromisso';
    return day ? this.formatDiaTitulo(day) : 'Compromissos';
  });

  readonly eventosDiaSelecionado = computed(() => {
    const day = this.selectedDay();
    return day ? this.eventosDoDia(day) : [];
  });

  constructor() {
    effect(() => {
      const shouldOpen = this.modalAberto();
      const el = this.resolveModalEl(this.diaModalRef());
      if (!shouldOpen || !el) return;
      queueMicrotask(() => {
        const modal = this.resolveModalEl(this.diaModalRef());
        if (!modal || !this.modalAberto()) return;
        this.ensureModalCentered(modal);
        if (!modal.open) {
          modal.showModal();
        }
      });
    });

    effect(() => {
      const shouldOpen = this.servicoModalAberto();
      const el = this.resolveModalEl(this.servicoModalRef());
      if (!shouldOpen || !el) return;
      queueMicrotask(() => {
        const modal = this.resolveModalEl(this.servicoModalRef());
        if (!modal || !this.servicoModalAberto()) return;
        this.ensureModalCentered(modal);
        if (!modal.open) {
          modal.showModal();
        }
      });
    });
  }

  novoServico = {
    id: null as number | null,
    name: '',
    duration_minutes: 30,
    priceDisplay: '',
    priceNumber: null as number | null,
    show_price: false,
    pedir_ficha: false,
    form_template_id: null as number | null,
    photo_url: null as string | null,
  };
  novo = {
    patient_name: '',
    patient_email: '',
    patient_phone: '',
    service_id: null as number | null,
    date: '',
    time: '09:00',
  };

  private rulesState: Record<number, DayRule> = {};
  /** Bump para recompute de totais/resumo com OnPush. */
  readonly rulesVersion = signal(0);

  readonly mesTitulo = computed(() => {
    const d = this.cursor();
    return `${MESES[d.getMonth()]} de ${d.getFullYear()}`;
  });

  readonly reservasAtivasCount = computed(
    () => this.reservas().filter((r) => r.status !== 'cancelled').length,
  );

  readonly cells = computed<CalCell[]>(() => {
    const cursor = this.cursor();
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const startPad = first.getDay(); // 0=dom
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();
    const todayKey = this.dateKey(new Date());
    const byDay = this.groupByDay(this.reservas());

    const out: CalCell[] = [];
    for (let i = 0; i < startPad; i++) {
      const day = prevDays - startPad + i + 1;
      const d = new Date(year, month - 1, day);
      const key = this.dateKey(d);
      out.push({ key, day, inMonth: false, isToday: key === todayKey, events: byDay.get(key) ?? [] });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const key = this.dateKey(d);
      out.push({ key, day, inMonth: true, isToday: key === todayKey, events: byDay.get(key) ?? [] });
    }
    while (out.length % 7 !== 0 || out.length < 42) {
      const day = out.length - (startPad + daysInMonth) + 1;
      const d = new Date(year, month + 1, day);
      const key = this.dateKey(d);
      out.push({ key, day, inMonth: false, isToday: key === todayKey, events: byDay.get(key) ?? [] });
      if (out.length >= 42) break;
    }
    return out;
  });

  ngOnInit(): void {
    for (const d of WEEKDAYS) {
      this.rulesState[d.value] = {
        enabled: d.value >= 1 && d.value <= 5,
        intervals: [{ start: '09:00', end: '18:00' }],
      };
    }
    this.bumpRules();
    this.reload();
    this.carregarFichasDisponiveis();
  }

  private carregarFichasDisponiveis(): void {
    // Só fichas publicadas (link público ativo), como em Links públicos.
    forkJoin({
      templates: this.templatesApi.list({ is_active: true, public_enabled: true }).pipe(
        catchError(() => of([] as Template[])),
      ),
      links: this.linksPublicosApi.list({ per_page: 50 }).pipe(
        catchError(() => of({ data: [] as LinkPublico[], meta: { current_page: 1, last_page: 1, per_page: 50, total: 0 } })),
      ),
    }).subscribe(({ templates, links }) => {
      const byId = new Map<number, Template>();
      for (const t of Array.isArray(templates) ? templates : []) {
        if (t?.id == null || t.is_active === false || !t.public_enabled) continue;
        byId.set(t.id, t);
      }
      for (const l of links.data ?? []) {
        const id = Number(l.template_id ?? l.id);
        if (!Number.isFinite(id) || id <= 0) continue;
        const name = (l.name ?? l.template_name ?? `Modelo #${id}`).trim() || `Modelo #${id}`;
        const prev = byId.get(id);
        byId.set(id, {
          ...(prev ?? {
            id,
            created_at: l.created_at ?? '',
            updated_at: l.updated_at ?? '',
          }),
          id,
          name: prev?.name?.trim() ? prev.name : name,
          is_active: true,
          public_enabled: true,
          public_url: l.public_url ?? prev?.public_url,
        });
      }
      const list = [...byId.values()].sort((a, b) =>
        a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }),
      );
      this.fichasDisponiveis.set(list);
    });
  }

  readonly opcoesFichaServico = computed<GestgoComboboxOption[]>(() =>
    this.fichasDisponiveis().map((t) => ({
      value: String(t.id),
      label: t.name,
    })),
  );

  /** Remonta o combobox quando a lista chega (evita lista vazia no nord-combobox). */
  readonly fichasComboKey = computed(() => this.opcoesFichaServico().length);

  servicoFichaValue(): string | null {
    const id = this.novoServico.form_template_id;
    return id != null ? String(id) : null;
  }

  setVisao(v: VisaoAgenda): void {
    this.visao.set(v);
  }

  setConfigSecao(secao: ConfigSecao): void {
    this.configSecao.set(secao);
  }

  mesAnterior(): void {
    const d = this.cursor();
    this.cursor.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
    this.reloadPeriod();
  }

  mesProximo(): void {
    const d = this.cursor();
    this.cursor.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
    this.reloadPeriod();
  }

  irHoje(): void {
    const now = new Date();
    this.cursor.set(new Date(now.getFullYear(), now.getMonth(), 1));
    this.selectedDay.set(this.dateKey(now));
    this.reloadPeriod();
  }

  selecionarDia(key: string): void {
    this.selectedDay.set(key);
    this.modalModo.set('dia');
    this.criarVeioDoDia.set(false);
    this.modalAberto.set(true);
  }

  eventosDoDia(key: string): AgendaAppointment[] {
    return this.groupByDay(this.reservas()).get(key) ?? [];
  }

  ruleFor(day: number): DayRule {
    const existing = this.rulesState[day];
    if (existing) return existing;
    const fallback: DayRule = {
      enabled: false,
      intervals: [{ start: '09:00', end: '18:00' }],
    };
    this.rulesState[day] = fallback;
    return fallback;
  }

  toggleDay(day: number, enabled: boolean): void {
    const current = this.ruleFor(day);
    this.rulesState[day] = {
      enabled,
      intervals: current.intervals.length
        ? current.intervals.map((i) => ({ ...i }))
        : [{ start: '09:00', end: '18:00' }],
    };
    this.bumpRules();
  }

  onNordInput(ev: Event): string {
    return String((ev.target as HTMLInputElement & { value?: string }).value ?? '');
  }

  onNordNumberInput(ev: Event): number {
    const n = Number(this.onNordInput(ev));
    return Number.isFinite(n) ? n : 0;
  }

  setIntervalTime(day: number, index: number, key: 'start' | 'end', value: string): void {
    const rule = this.ruleFor(day);
    const intervals = rule.intervals.map((i) => ({ ...i }));
    const target = intervals[index];
    if (!target) return;
    // API exige H:i (sem segundos)
    target[key] = String(value ?? '').trim().slice(0, 5);
    this.rulesState[day] = { ...rule, intervals };
    this.bumpRules();
  }

  addPausa(day: number): void {
    const rule = this.ruleFor(day);
    const intervals = rule.intervals.map((i) => ({ ...i }));
    if (intervals.length === 1) {
      const only = intervals[0]!;
      intervals[0] = { start: only.start || '09:00', end: '12:00' };
      intervals.push({ start: '13:00', end: only.end || '18:00' });
    } else {
      const last = intervals[intervals.length - 1]!;
      const nextStart = this.addHours(last.end || '18:00', 1);
      intervals.push({ start: nextStart, end: this.addHours(nextStart, 4) });
    }
    this.rulesState[day] = { enabled: true, intervals };
    this.bumpRules();
  }

  removeInterval(day: number, index: number): void {
    const rule = this.ruleFor(day);
    if (rule.intervals.length <= 1) return;
    const intervals = rule.intervals.filter((_, i) => i !== index).map((i) => ({ ...i }));
    this.rulesState[day] = { ...rule, intervals };
    this.bumpRules();
  }

  aplicarSegundaDiasUteis(): void {
    const monday = this.ruleFor(1);
    const clone = monday.intervals.map((i) => ({ ...i }));
    for (const d of [2, 3, 4, 5]) {
      this.rulesState[d] = {
        enabled: monday.enabled,
        intervals: clone.map((i) => ({ ...i })),
      };
    }
    this.bumpRules();
    this.toast.success('Horário aplicado', 'Segunda foi replicada para Ter–Sex.');
  }

  dayTotalLabel(day: number): string {
    this.rulesVersion();
    const minutes = this.dayMinutes(day);
    if (minutes <= 0) return '0h/dia';
    const hours = Math.round((minutes / 60) * 10) / 10;
    const label = Number.isInteger(hours) ? `${hours}` : `${hours}`.replace('.', ',');
    return `${label}h/dia`;
  }

  private dayMinutes(day: number): number {
    const rule = this.ruleFor(day);
    if (!rule.enabled) return 0;
    return rule.intervals.reduce((sum, i) => sum + Math.max(0, this.minutesOf(i.end) - this.minutesOf(i.start)), 0);
  }

  private minutesOf(hhmm: string): number {
    const [h, m] = String(hhmm || '00:00')
      .slice(0, 5)
      .split(':')
      .map((x) => Number(x));
    if (!Number.isFinite(h) || !Number.isFinite(m)) return 0;
    return h * 60 + m;
  }

  private addHours(hhmm: string, hours: number): string {
    const total = Math.min(23 * 60 + 59, Math.max(0, this.minutesOf(hhmm) + hours * 60));
    const h = Math.floor(total / 60);
    const m = total % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  private bumpRules(): void {
    this.rulesVersion.update((v) => v + 1);
  }

  formatDt(v: string): string {
    return formatarDataHoraBr(v) || v;
  }

  formatDiaTitulo(key: string): string {
    const [y, m, d] = key.split('-').map(Number);
    return formatarDataBr(`${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`) || key;
  }

  horaCurta(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      confirmed: 'Confirmada',
      cancelled: 'Cancelada',
      completed: 'Concluída',
    };
    return map[status] ?? status;
  }

  statusBadgeVariant(status: string): 'success' | 'warning' | 'danger' | 'neutral' | 'info' {
    if (status === 'confirmed') return 'success';
    if (status === 'completed') return 'info';
    if (status === 'cancelled') return 'neutral';
    return 'warning';
  }

  formStatusLabel(status: string | null | undefined): string {
    if (status === 'pending') return 'Ficha pendente';
    if (status === 'completed') return 'Ficha concluída';
    return '';
  }

  formStatusBadgeVariant(status: string | null | undefined): 'success' | 'warning' | 'neutral' {
    if (status === 'completed') return 'success';
    if (status === 'pending') return 'warning';
    return 'neutral';
  }

  dotClass(status: string): string {
    if (status === 'completed') return 'agenda-dot agenda-dot--done';
    if (status === 'cancelled') return 'agenda-dot agenda-dot--off';
    return 'agenda-dot agenda-dot--ok';
  }

  abrirNovo(): void {
    const day = this.selectedDay() || this.dateKey(new Date());
    this.selectedDay.set(day);
    this.resetNovoForm(day);
    this.criarVeioDoDia.set(this.modalAberto() && this.modalModo() === 'dia');
    this.modalModo.set('criar');
    this.modalAberto.set(true);
  }

  abrirCriarNoModal(): void {
    const day = this.selectedDay() || this.dateKey(new Date());
    this.resetNovoForm(day);
    this.criarVeioDoDia.set(true);
    this.modalModo.set('criar');
  }

  cancelarCriar(): void {
    if (this.criarVeioDoDia()) {
      this.modalModo.set('dia');
      this.criarVeioDoDia.set(false);
      return;
    }
    this.fecharModal();
  }

  fecharModal(): void {
    if (!this.modalAberto()) return;
    this.modalAberto.set(false);
    this.modalModo.set('dia');
    this.criarVeioDoDia.set(false);
    const el = this.resolveModalEl(this.diaModalRef());
    if (el?.open) {
      el.close();
    }
  }

  abrirNovoServico(): void {
    this.resetNovoServico();
    this.carregarFichasDisponiveis();
    this.servicoModalAberto.set(true);
  }

  abrirEditarServico(s: AgendaServiceItem): void {
    const price = this.parsePriceNumber(s.price);
    const photo = absoluteMediaUrl(s.photo_url) ?? s.photo_url ?? null;
    const fichaId = s.form_template_id ?? null;
    this.novoServico = {
      id: s.id,
      name: s.name,
      duration_minutes: s.duration_minutes || 30,
      priceDisplay: price != null ? this.formatBrl(price) : '',
      priceNumber: price,
      show_price: !!s.show_price,
      pedir_ficha: fichaId != null,
      form_template_id: fichaId,
      photo_url: photo,
    };
    this.servicoPhotoFile = null;
    this.servicoPhotoRemoved = false;
    this.servicoPhotoPreview.set(photo);
    this.carregarFichasDisponiveis();
    this.servicoModalAberto.set(true);
  }

  /**
   * O listbox do nord-combobox fica fora do diálogo; o clique na opção (ou o
   * “fall-through” no backdrop) dispara light-dismiss. Bloqueia esse fechamento.
   */
  onServicoModalCancel(ev: Event): void {
    if (Date.now() < this.ignoreServicoModalDismissUntil) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    const trigger = (ev as Event & { trigger?: Event }).trigger;
    if (!trigger) return;
    const path =
      typeof trigger.composedPath === 'function' ? trigger.composedPath() : [];
    const fromCombobox = path.some((node) => {
      if (!(node instanceof HTMLElement)) return false;
      const tag = node.tagName.toLowerCase();
      if (tag === 'nord-combobox' || tag === 'nord-popout' || tag === 'nord-combobox-option') {
        return true;
      }
      if (node.getAttribute('role') === 'listbox' || node.getAttribute('role') === 'option') {
        return true;
      }
      return node.classList.contains('n-option') || node.classList.contains('n-popout');
    });
    if (fromCombobox) {
      ev.preventDefault();
      ev.stopPropagation();
      this.ignoreServicoModalDismissUntil = Date.now() + 400;
    }
  }

  fecharServicoModal(force = false): void {
    if (!force && Date.now() < this.ignoreServicoModalDismissUntil) {
      // Modal pode ter fechado no light-dismiss: reabre sem perder o formulário.
      queueMicrotask(() => {
        this.servicoModalAberto.set(true);
        const el = this.resolveModalEl(this.servicoModalRef());
        if (el && !el.open) {
          this.ensureModalCentered(el);
          el.showModal();
        }
      });
      return;
    }
    this.ignoreServicoModalDismissUntil = 0;
    if (!this.servicoModalAberto()) return;
    this.servicoModalAberto.set(false);
    this.resetNovoServico();
    const el = this.resolveModalEl(this.servicoModalRef());
    if (el?.open) {
      el.close();
    }
  }

  onServicoPriceInput(ev: Event): void {
    const parsed = this.parseMoneyMask(this.onNordInput(ev));
    this.novoServico.priceDisplay = parsed.display;
    this.novoServico.priceNumber = parsed.number > 0 ? parsed.number : null;
    if (this.novoServico.priceNumber == null) {
      this.novoServico.show_price = false;
    }
    const target = ev.target as HTMLElement & { value?: string };
    if (target && 'value' in target) {
      target.value = parsed.display;
    }
  }

  servicoMeta(s: AgendaServiceItem): string {
    const parts = [`${s.duration_minutes} min`];
    const price = this.parsePriceNumber(s.price);
    if (price != null) {
      parts.push(`R$ ${this.formatBrl(price)}`);
      if (!s.show_price) {
        parts.push('oculto na pública');
      }
    }
    if (s.form_template_id) {
      const ficha = this.fichasDisponiveis().find((t) => t.id === s.form_template_id);
      parts.push(ficha ? `ficha: ${ficha.name}` : 'com ficha');
    }
    return parts.join(' · ');
  }

  private resetNovoServico(): void {
    this.revokeServicoPhotoPreview();
    this.novoServico = {
      id: null,
      name: '',
      duration_minutes: 30,
      priceDisplay: '',
      priceNumber: null,
      show_price: false,
      pedir_ficha: false,
      form_template_id: null,
      photo_url: null,
    };
    this.servicoPhotoFile = null;
    this.servicoPhotoRemoved = false;
    this.servicoPhotoPreview.set(null);
  }

  onServicoPedirFichaToggle(checked: boolean): void {
    this.novoServico.pedir_ficha = !!checked;
    if (!this.novoServico.pedir_ficha) {
      this.novoServico.form_template_id = null;
      return;
    }
    if (!this.novoServico.form_template_id && this.fichasDisponiveis().length === 1) {
      this.novoServico.form_template_id = this.fichasDisponiveis()[0].id;
    }
  }

  /** Armar antes do click na opção (pointerdown), senão o light-dismiss ganha a corrida. */
  armServicoModalDismissGuard(): void {
    this.ignoreServicoModalDismissUntil = Date.now() + 500;
  }

  onServicoFichaChange(raw: string | null): void {
    this.armServicoModalDismissGuard();
    const n = Number(raw);
    this.novoServico.form_template_id = Number.isFinite(n) && n > 0 ? n : null;
    this.novoServico.pedir_ficha = this.novoServico.form_template_id != null || this.novoServico.pedir_ficha;
  }

  onServicoPhotoSelected(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    input.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.toast.error('Arquivo inválido', 'Envie uma imagem JPG, PNG ou WebP.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      this.toast.error('Arquivo grande', 'A foto deve ter no máximo 2 MB.');
      return;
    }
    this.revokeServicoPhotoPreview();
    this.servicoPhotoFile = file;
    this.servicoPhotoRemoved = false;
    this.servicoPhotoPreview.set(URL.createObjectURL(file));
  }

  removerServicoFoto(): void {
    this.revokeServicoPhotoPreview();
    this.servicoPhotoFile = null;
    this.servicoPhotoRemoved = true;
    this.servicoPhotoPreview.set(null);
    this.novoServico.photo_url = null;
  }

  private revokeServicoPhotoPreview(): void {
    const cur = this.servicoPhotoPreview();
    if (cur?.startsWith('blob:')) {
      URL.revokeObjectURL(cur);
    }
  }

  servicePhotoUrl(s: AgendaServiceItem): string | null {
    return absoluteMediaUrl(s.photo_url) ?? s.photo_url ?? null;
  }

  private parsePriceNumber(raw: number | string | null | undefined): number | null {
    if (raw == null || raw === '') return null;
    const n = typeof raw === 'number' ? raw : Number(String(raw).replace(',', '.'));
    return Number.isFinite(n) && n > 0 ? n : null;
  }

  private parseMoneyMask(raw: string): { display: string; number: number } {
    const digits = String(raw ?? '').replace(/\D/g, '').replace(/^0+(?=\d)/, '');
    if (!digits) {
      return { display: '', number: 0 };
    }
    const padded = digits.padStart(3, '0');
    const cents = padded.slice(-2);
    const intRaw = padded.slice(0, -2).replace(/^0+(?=\d)/, '') || '0';
    const withDots = intRaw.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return {
      display: `${withDots},${cents}`,
      number: parseInt(digits, 10) / 100,
    };
  }

  private formatBrl(n: number): string {
    if (!Number.isFinite(n) || n < 0) n = 0;
    const fixed = n.toFixed(2);
    const [intPart, decPart] = fixed.split('.');
    const withDots = intPart!.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${withDots},${decPart}`;
  }

  salvarNovo(): void {
    if (!this.novo.patient_name.trim() || !this.novo.service_id || !this.novo.date || !this.novo.time) {
      this.toast.error('Campos obrigatórios', 'Informe paciente, serviço, data e horário.');
      return;
    }
    const startsAt = `${this.novo.date}T${this.novo.time}:00`;
    this.salvando.set(true);
    this.agenda
      .createAppointment({
        service_id: this.novo.service_id,
        starts_at: startsAt,
        patient_name: this.novo.patient_name.trim(),
        patient_email: this.novo.patient_email.trim() || undefined,
        patient_phone: this.novo.patient_phone.trim() || undefined,
      })
      .subscribe({
        next: () => {
          this.salvando.set(false);
          this.toast.success('Compromisso criado', '');
          this.selectedDay.set(this.novo.date);
          this.modalModo.set('dia');
          this.criarVeioDoDia.set(false);
          this.modalAberto.set(true);
          this.reloadPeriod();
        },
        error: (err) => {
          this.salvando.set(false);
          this.toast.error('Erro', err.error?.message ?? 'Não foi possível criar.');
        },
      });
  }

  private resetNovoForm(day: string): void {
    this.novo = {
      patient_name: '',
      patient_email: '',
      patient_phone: '',
      service_id: this.servicos()[0]?.id ?? null,
      date: day,
      time: '09:00',
    };
  }

  private resolveModalEl(
    ref: ElementRef<NordModalElement> | NordModalElement | null | undefined,
  ): NordModalElement | null {
    if (!ref) return null;
    const el = 'nativeElement' in ref ? ref.nativeElement : ref;
    return el && typeof el.showModal === 'function' ? el : null;
  }

  private ensureModalCentered(el: NordModalElement): void {
    const root = el.shadowRoot;
    if (!root || root.querySelector(`style[${CENTER_STYLE_ATTR}]`)) return;
    const style = document.createElement('style');
    style.setAttribute(CENTER_STYLE_ATTR, '');
    style.textContent = `
      .n-modal-backdrop {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-sizing: border-box !important;
        min-block-size: 100% !important;
        padding-block: var(--n-space-l) !important;
      }
      .n-modal {
        margin-block: 0 !important;
      }
    `;
    root.appendChild(style);
  }

  reload(): void {
    this.carregando.set(true);
    this.erro.set('');
    let pending = 3;
    const done = () => {
      pending -= 1;
      if (pending <= 0) {
        this.carregando.set(false);
        this.listaPronta.set(true);
      }
    };

    this.agenda.listServices().subscribe({
      next: (s) => {
        this.servicos.set(s);
        done();
      },
      error: () => {
        this.erro.set('Não foi possível carregar a agenda.');
        done();
      },
    });

    this.agenda.listAvailability().subscribe({
      next: (rules) => {
        if (rules.length) {
          for (const d of WEEKDAYS) {
            this.rulesState[d.value] = {
              enabled: false,
              intervals: [{ start: '09:00', end: '18:00' }],
            };
          }
          const byDay = new Map<number, DayInterval[]>();
          for (const r of rules) {
            if (r.is_active === false) continue;
            const list = byDay.get(r.weekday) ?? [];
            list.push({
              start: String(r.start_time).slice(0, 5),
              end: String(r.end_time).slice(0, 5),
            });
            byDay.set(r.weekday, list);
          }
          for (const [weekday, intervals] of byDay) {
            intervals.sort((a, b) => this.minutesOf(a.start) - this.minutesOf(b.start));
            this.rulesState[weekday] = {
              enabled: intervals.length > 0,
              intervals: intervals.length ? intervals : [{ start: '09:00', end: '18:00' }],
            };
          }
          this.bumpRules();
        }
        done();
      },
      error: () => done(),
    });

    this.loadAppointments(done);
  }

  private reloadPeriod(): void {
    this.carregando.set(true);
    this.loadAppointments(() => this.carregando.set(false));
  }

  private loadAppointments(done: () => void): void {
    const { from, to } = this.monthRange(this.cursor());
    this.agenda.listAppointments(from, to).subscribe({
      next: (a) => {
        this.reservas.set(a);
        done();
      },
      error: () => done(),
    });
  }

  salvarServico(): void {
    const name = this.novoServico.name.trim();
    if (!name) {
      this.toast.error('Informe o nome', 'Digite o nome do serviço.');
      return;
    }
    if (this.novoServico.show_price && this.novoServico.priceNumber == null) {
      this.toast.error('Informe o valor', 'Para exibir o preço na agenda pública, preencha o valor.');
      return;
    }
    if (this.novoServico.pedir_ficha && !this.novoServico.form_template_id) {
      this.toast.error('Escolha a ficha', 'Selecione qual modelo o paciente deve preencher após a reserva.');
      return;
    }
    const payload = {
      name,
      duration_minutes: Number(this.novoServico.duration_minutes) || 30,
      price: this.novoServico.priceNumber,
      show_price: !!this.novoServico.show_price && this.novoServico.priceNumber != null,
      form_template_id: this.novoServico.pedir_ficha ? this.novoServico.form_template_id : null,
      is_active: true,
    };
    const editingId = this.novoServico.id;
    const pendingPhoto = this.servicoPhotoFile;
    const removePhoto = this.servicoPhotoRemoved && !pendingPhoto;
    this.salvando.set(true);
    const req$ = editingId
      ? this.agenda.updateService(editingId, payload)
      : this.agenda.createService(payload);
    req$.subscribe({
      next: (saved) => {
        const id = saved.id;
        const finish = () => {
          this.salvando.set(false);
          this.fecharServicoModal(true);
          this.reload();
          this.toast.success(editingId ? 'Serviço atualizado' : 'Serviço criado', '');
        };
        if (pendingPhoto) {
          this.agenda.uploadServicePhoto(id, pendingPhoto).subscribe({
            next: () => finish(),
            error: (err) => {
              this.salvando.set(false);
              this.reload();
              this.toast.error(
                'Serviço salvo, mas a foto falhou',
                err.error?.message ?? err.error?.errors?.photo?.[0] ?? 'Tente enviar a foto de novo.',
              );
            },
          });
          return;
        }
        if (removePhoto && editingId) {
          this.agenda.deleteServicePhoto(editingId).subscribe({
            next: () => finish(),
            error: () => finish(),
          });
          return;
        }
        finish();
      },
      error: (err) => {
        this.salvando.set(false);
        this.toast.error('Erro', err.error?.message ?? 'Não foi possível salvar.');
      },
    });
  }

  async removerServico(s: AgendaServiceItem): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Remover serviço?',
      message: `O serviço “${s.name}” será removido.`,
      confirmLabel: 'Sim, remover',
      variant: 'danger',
    });
    if (!ok) return;
    this.agenda.deleteService(s.id).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Serviço removido', '');
      },
      error: (err) => this.toast.error('Erro', err.error?.message ?? 'Falha ao remover.'),
    });
  }

  salvarExpediente(): void {
    const rules: AgendaAvailabilityRule[] = [];
    for (const d of WEEKDAYS) {
      const rule = this.ruleFor(d.value);
      if (!rule.enabled) continue;
      for (const interval of rule.intervals) {
        if (!interval.start || !interval.end) continue;
        if (this.minutesOf(interval.end) <= this.minutesOf(interval.start)) {
          this.toast.error('Horário inválido', `${d.full}: o fim deve ser depois do início.`);
          return;
        }
        rules.push({
          weekday: d.value,
          start_time: String(interval.start).slice(0, 5),
          end_time: String(interval.end).slice(0, 5),
          is_active: true,
        });
      }
    }
    if (rules.length > 21) {
      this.toast.error('Muitos intervalos', 'Remova algumas pausas (máximo 21 faixas).');
      return;
    }
    this.salvando.set(true);
    this.agenda.syncAvailability(rules).subscribe({
      next: () => {
        this.salvando.set(false);
        this.toast.success('Expediente salvo', '');
      },
      error: (err) => {
        this.salvando.set(false);
        this.toast.error('Erro', err.error?.message ?? 'Não foi possível salvar.');
      },
    });
  }

  async cancelar(a: AgendaAppointment): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Cancelar reserva?',
      message: `Cancelar o horário de ${a.patient_name} em ${this.formatDt(a.starts_at)}?`,
      confirmLabel: 'Sim, cancelar',
      variant: 'danger',
    });
    if (!ok) return;
    this.acaoId.set(a.id);
    this.agenda.updateAppointment(a.id, { status: 'cancelled' }).subscribe({
      next: () => {
        this.acaoId.set(null);
        this.reloadPeriod();
        this.toast.success('Reserva cancelada', '');
      },
      error: (err) => {
        this.acaoId.set(null);
        this.toast.error('Erro', err.error?.message ?? 'Falha ao cancelar.');
      },
    });
  }

  private dateKey(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private monthRange(cursor: Date): { from: string; to: string } {
    const y = cursor.getFullYear();
    const m = cursor.getMonth();
    const from = this.dateKey(new Date(y, m, 1));
    const to = this.dateKey(new Date(y, m + 1, 0));
    return { from, to };
  }

  private groupByDay(items: AgendaAppointment[]): Map<string, AgendaAppointment[]> {
    const map = new Map<string, AgendaAppointment[]>();
    for (const item of items) {
      const key = this.dateKey(new Date(item.starts_at));
      const list = map.get(key) ?? [];
      list.push(item);
      map.set(key, list);
    }
    for (const [, list] of map) {
      list.sort((a, b) => a.starts_at.localeCompare(b.starts_at));
    }
    return map;
  }
}
