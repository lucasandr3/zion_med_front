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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import {
  AgendaAppointment,
  AgendaAvailabilityRule,
  AgendaDocumentSendInvite,
  AgendaService,
  AgendaServiceItem,
} from '../../core/services/agenda.service';
import { TemplatesService, Template } from '../../core/services/templates.service';
import { LinksPublicosService, type LinkPublico } from '../../core/services/links-publicos.service';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { ListSkeletonComponent } from '../../shared/components/list-skeleton/list-skeleton.component';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { GestgoComboboxComponent, type GestgoComboboxOption } from '@/shared/components/combobox';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
import { formatarDataBr, formatarDataHoraBr } from '@/shared/utils/date';
import { absoluteMediaUrl } from '../../core/utils/absolute-media-url';
import { normalizePublicAppUrl } from '../../core/utils/public-form-url.util';
import { openWhatsappShare } from '../../core/utils/whatsapp-share.util';
import { ProductTelemetryService } from '../../core/services/product-telemetry.service';

type VisaoAgenda = 'mes' | 'lista' | 'config';
type ConfigSecao = 'servicos' | 'expediente';
type ModalAgendaModo = 'dia' | 'criar' | 'reagendar';

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
  imports: [
    ...NORD_FORM_IMPORTS,
    FormsModule,
    RouterLink,
    ListSkeletonComponent,
    ZmPageBackLinkComponent,
    GestgoComboboxComponent,
  ],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css',
})
export class AgendaComponent implements OnInit {
  private agenda = inject(AgendaService);
  private templatesApi = inject(TemplatesService);
  private linksPublicosApi = inject(LinksPublicosService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);
  private productTelemetry = inject(ProductTelemetryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private readonly diaModalRef = viewChild<ElementRef<NordModalElement>>('diaModal');

  readonly servicoOptions = computed<GestgoComboboxOption[]>(() =>
    this.servicos().map((s) => ({
      value: String(s.id),
      label: `${s.name} (${s.duration_minutes} min)`,
    })),
  );

  readonly weekdays = WEEKDAYS;
  readonly diasSemanaLabels = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'];
  readonly visoes: { key: Exclude<VisaoAgenda, 'config'>; label: string }[] = [
    { key: 'mes', label: 'Mês' },
    { key: 'lista', label: 'Lista' },
  ];

  readonly configSecoes: { key: ConfigSecao; label: string; icon: string }[] = [
    { key: 'servicos', label: 'Serviços', icon: 'layers' },
    { key: 'expediente', label: 'Expediente', icon: 'schedule' },
  ];

  readonly visao = signal<VisaoAgenda>('mes');
  /** Visão de calendário/lista a restaurar ao sair das configurações. */
  private visaoAgendaAnterior: Exclude<VisaoAgenda, 'config'> = 'mes';
  readonly configSecao = signal<ConfigSecao>('expediente');
  readonly cursor = signal(new Date());
  readonly selectedDay = signal<string | null>(null);
  readonly modalAberto = signal(false);
  readonly modalModo = signal<ModalAgendaModo>('dia');
  readonly agendaCompacta = signal(
    typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches,
  );
  readonly usarModalAgenda = computed(
    () => this.modalAberto() && (this.agendaCompacta() || this.visao() !== 'mes'),
  );
  /** Quando true, Cancelar no formulário volta à lista do dia em vez de fechar. */
  readonly criarVeioDoDia = signal(false);
  readonly servicos = signal<AgendaServiceItem[]>([]);
  readonly reservas = signal<AgendaAppointment[]>([]);
  readonly salvando = signal(false);
  readonly carregando = signal(false);
  readonly listaPronta = signal(false);
  readonly erro = signal('');
  readonly acaoId = signal<number | null>(null);
  readonly fichasDisponiveis = signal<Template[]>([]);

  readonly modalTitulo = computed(() => {
    const day = this.selectedDay();
    if (this.modalModo() === 'criar') return 'Novo compromisso';
    if (this.modalModo() === 'reagendar') return 'Reagendar compromisso';
    return day ? this.formatDiaTitulo(day) : 'Compromissos';
  });

  readonly eventosDiaSelecionado = computed(() => {
    const day = this.selectedDay();
    return day ? this.eventosDoDia(day) : [];
  });

  constructor() {
    effect(() => {
      const shouldOpen = this.usarModalAgenda();
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

    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(max-width: 900px)');
      media.addEventListener('change', (event) => this.agendaCompacta.set(event.matches));
    }

  }

  novo = {
    patient_name: '',
    patient_email: '',
    patient_phone: '',
    service_id: null as number | null,
    date: '',
    time: '09:00',
  };

  reagendar = {
    id: null as number | null,
    patient_name: '',
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

    const config = (this.route.snapshot.queryParamMap.get('config') || '').trim();
    if (config === 'servicos') {
      void this.router.navigateByUrl('/servicos');
      return;
    }
    if (config === 'expediente') {
      this.abrirConfiguracoes('expediente');
      void this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { config: null },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    }
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

  setVisao(v: Exclude<VisaoAgenda, 'config'>): void {
    this.visaoAgendaAnterior = v;
    this.visao.set(v);
  }

  abrirConfiguracoes(secao: ConfigSecao = 'expediente'): void {
    const atual = this.visao();
    if (atual !== 'config') {
      this.visaoAgendaAnterior = atual;
    }
    this.configSecao.set(secao);
    this.visao.set('config');
  }

  voltarAgenda(): void {
    this.visao.set(this.visaoAgendaAnterior);
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

  serviceIdValue(): string | null {
    return this.novo.service_id != null ? String(this.novo.service_id) : null;
  }

  onServicoChange(value: string | null): void {
    this.novo.service_id = value ? Number(value) : null;
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

  /** AUT-06 — progresso do pacote documental (1–2 docs). */
  documentPackageProgress(a: AgendaAppointment): { done: number; total: number } | null {
    const fromApi = a.document_progress;
    if (fromApi && fromApi.required > 0) {
      return {
        done: Math.min(fromApi.completed, fromApi.required),
        total: fromApi.required,
      };
    }
    let total = 0;
    let done = 0;
    if (a.form_template_id && a.form_status !== 'not_applicable') {
      total++;
      if (a.form_status === 'completed') done++;
    }
    if (a.form_template_optional_id && a.form_status_optional !== 'not_applicable') {
      total++;
      if (a.form_status_optional === 'completed') done++;
    }
    if (total === 0) return null;
    return { done, total };
  }

  documentProgressLabel(a: AgendaAppointment): string {
    const p = this.documentPackageProgress(a);
    if (!p) return '';
    return `${p.done} de ${p.total}`;
  }

  documentProgressTitle(a: AgendaAppointment): string {
    const name = a.document_progress?.template_name || a.form_template_name;
    const p = this.documentPackageProgress(a);
    const base = name
      ? `Pacote documental: ${name}${p && p.total > 1 ? ` (+${p.total - 1} opcional)` : ''}`
      : 'Pacote documental vinculado ao serviço';
    if (!p) return base;
    return `${base}. Progresso ${p.done} de ${p.total} — não autoriza o procedimento clinicamente.`;
  }

  documentProgressBadgeVariant(a: AgendaAppointment): 'success' | 'warning' | 'neutral' {
    const p = this.documentPackageProgress(a);
    if (!p) return 'neutral';
    if (p.done >= p.total) return 'success';
    return 'warning';
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
    if (this.criarVeioDoDia() || this.modalModo() === 'reagendar') {
      this.modalModo.set('dia');
      this.criarVeioDoDia.set(false);
      this.reagendar = { id: null, patient_name: '', date: '', time: '09:00' };
      return;
    }
    this.fecharModal();
  }

  temFichaPendente(a: AgendaAppointment): boolean {
    return a.status === 'confirmed' && a.form_status === 'pending' && !!a.form_template_id;
  }

  async copiarLinkFicha(a: AgendaAppointment): Promise<void> {
    const send = await this.garantirDocumentSend(a);
    if (!send?.public_url) return;
    const url = normalizePublicAppUrl(send.public_url) || send.public_url;
    try {
      await navigator.clipboard.writeText(url);
      this.toast.success('Link copiado', 'Envie ao paciente pelo canal que preferir.');
    } catch {
      this.toast.error('Erro', 'Não foi possível copiar o link.');
    }
  }

  async compartilharFichaWhatsapp(a: AgendaAppointment): Promise<void> {
    const send = await this.garantirDocumentSend(a);
    if (!send?.share_message) return;
    this.productTelemetry.trackDocumentShare({
      source: 'agenda',
      channel: 'whatsapp',
      template_id: a.form_template_id ?? null,
      document_send_id: send.id ?? null,
      appointment_id: a.id,
    });
    openWhatsappShare(send.share_message, send.recipient_phone || a.patient_phone || null);
  }

  verEnvio(a: AgendaAppointment): void {
    void this.garantirDocumentSend(a).then(() => {
      void this.router.navigate(['/envios'], { queryParams: { caixa: 'pendentes' } });
    });
  }

  private async garantirDocumentSend(a: AgendaAppointment): Promise<AgendaDocumentSendInvite | null> {
    if (a.document_send?.public_url) return a.document_send;
    this.acaoId.set(a.id);
    try {
      const send = await new Promise<AgendaDocumentSendInvite>((resolve, reject) => {
        this.agenda.ensureDocumentInvite(a.id).subscribe({ next: resolve, error: reject });
      });
      this.patchAppointmentDocumentSend(a.id, send);
      return send;
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'error' in err
          ? (err as { error?: { message?: string } }).error?.message
          : undefined;
      this.toast.error('Convite', message ?? 'Não foi possível gerar o convite da ficha.');
      return null;
    } finally {
      this.acaoId.set(null);
    }
  }

  private patchAppointmentDocumentSend(id: number, send: AgendaDocumentSendInvite): void {
    this.reservas.update((list) =>
      list.map((item) => (item.id === id ? { ...item, document_send: send } : item)),
    );
  }

  abrirReagendar(a: AgendaAppointment): void {
    if (a.status !== 'confirmed') return;
    const starts = new Date(a.starts_at);
    const date = this.dateKey(starts);
    const hh = String(starts.getHours()).padStart(2, '0');
    const mm = String(starts.getMinutes()).padStart(2, '0');
    this.reagendar = {
      id: a.id,
      patient_name: a.patient_name,
      date,
      time: `${hh}:${mm}`,
    };
    this.selectedDay.set(date);
    this.criarVeioDoDia.set(this.modalAberto() && this.modalModo() === 'dia');
    this.modalModo.set('reagendar');
    this.modalAberto.set(true);
  }

  salvarReagendar(): void {
    if (!this.reagendar.id || !this.reagendar.date || !this.reagendar.time) {
      this.toast.error('Campos obrigatórios', 'Informe data e horário.');
      return;
    }
    const startsAt = `${this.reagendar.date}T${this.reagendar.time}:00`;
    this.salvando.set(true);
    this.agenda
      .updateAppointment(this.reagendar.id, {
        status: 'confirmed',
        starts_at: startsAt,
      })
      .subscribe({
        next: () => {
          this.salvando.set(false);
          this.toast.success(
            'Compromisso reagendado',
            'O convite de ficha pendente foi mantido (sem novo envio).',
          );
          this.selectedDay.set(this.reagendar.date);
          this.modalModo.set('dia');
          this.criarVeioDoDia.set(false);
          this.reagendar = { id: null, patient_name: '', date: '', time: '09:00' };
          this.reloadPeriod();
        },
        error: (err) => {
          this.salvando.set(false);
          this.toast.error('Erro', err.error?.message ?? 'Não foi possível reagendar.');
        },
      });
  }

  onModalClose(event: Event): void {
    // Date/time pickers e outros popovers internos também emitem `close`.
    // Como o evento borbulha, ele não pode ser tratado como fechamento do modal.
    if (event.target !== event.currentTarget) return;
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

  abrirServicoNoCatalogo(s: AgendaServiceItem): void {
    void this.router.navigate(['/servicos', s.id, 'editar'], { state: { servico: s } });
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

  servicePhotoUrl(s: AgendaServiceItem): string | null {
    return absoluteMediaUrl(s.photo_url) ?? s.photo_url ?? null;
  }

  iniciaisServico(name: string): string {
    const letters = name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0])
      .join('')
      .toUpperCase();
    return letters || '?';
  }

  corAvatarServico(name: string): string {
    const colors = ['#12b886', '#3b82f6', '#a855f7', '#f97316', '#ec4899', '#0ea5a4'];
    const key = name.trim() || '?';
    let hash = 0;
    for (let i = 0; i < key.length; i++) hash += key.charCodeAt(i);
    return colors[hash % colors.length];
  }

  private parsePriceNumber(raw: number | string | null | undefined): number | null {
    if (raw == null || raw === '') return null;
    const n = typeof raw === 'number' ? raw : Number(String(raw).replace(',', '.'));
    return Number.isFinite(n) && n > 0 ? n : null;
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
      message:
        a.form_status === 'pending' && a.form_template_id
          ? `Cancelar o horário de ${a.patient_name} em ${this.formatDt(a.starts_at)}? O convite de ficha pendente também será revogado.`
          : `Cancelar o horário de ${a.patient_name} em ${this.formatDt(a.starts_at)}?`,
      confirmLabel: 'Sim, cancelar',
      variant: 'danger',
    });
    if (!ok) return;
    this.acaoId.set(a.id);
    this.agenda.updateAppointment(a.id, { status: 'cancelled' }).subscribe({
      next: () => {
        this.acaoId.set(null);
        this.reloadPeriod();
        const hadPendingForm = a.form_status === 'pending' && !!a.form_template_id;
        this.toast.success(
          'Reserva cancelada',
          hadPendingForm ? 'Convite de ficha pendente também foi revogado.' : '',
        );
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
