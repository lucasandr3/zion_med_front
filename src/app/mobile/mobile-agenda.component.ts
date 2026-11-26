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
import { GestgoComboboxComponent, type GestgoComboboxOption } from '@/shared/components/combobox';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
import {
  AgendaAppointment,
  AgendaDocumentSendInvite,
  AgendaService,
  AgendaServiceItem,
} from '../core/services/agenda.service';
import { normalizePublicAppUrl } from '../core/utils/public-form-url.util';
import { openWhatsappShare } from '../core/utils/whatsapp-share.util';
import { MobileShellService } from './mobile-shell.service';

type AgendaView = 'lista' | 'criar' | 'reagendar' | 'detalhe';

@Component({
  selector: 'app-mobile-agenda',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsModule, RouterLink, GestgoComboboxComponent, ...NORD_FORM_IMPORTS],
  templateUrl: './mobile-agenda.component.html',
  styleUrls: ['./mobile-shared.css', './mobile-agenda.component.css'],
})
export class MobileAgendaComponent implements OnInit {
  private readonly agenda = inject(AgendaService);
  private readonly shell = inject(MobileShellService);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly salvando = signal(false);
  readonly acaoId = signal<number | null>(null);
  readonly view = signal<AgendaView>('lista');
  readonly selectedDay = signal(this.dateKey(new Date()));
  readonly query = signal('');
  readonly reservas = signal<AgendaAppointment[]>([]);
  readonly servicos = signal<AgendaServiceItem[]>([]);
  readonly selected = signal<AgendaAppointment | null>(null);

  readonly servicoOptions = computed<GestgoComboboxOption[]>(() =>
    this.servicos().map((s) => ({
      value: String(s.id),
      label: `${s.name} · ${s.duration_minutes} min`,
    })),
  );

  novo = {
    patient_name: '',
    patient_phone: '',
    patient_email: '',
    service_id: null as number | null,
    time: '09:00',
  };

  reagendar = {
    id: null as number | null,
    patient_name: '',
    date: '',
    time: '09:00',
  };

  readonly dayTitle = computed(() => this.formatDiaTitulo(this.selectedDay()));

  readonly monthLabel = computed(() => {
    const date = this.parseDay(this.selectedDay());
    const label = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    return label.charAt(0).toUpperCase() + label.slice(1);
  });

  readonly weekDays = computed(() => {
    const selected = this.selectedDay();
    const today = this.dateKey(new Date());
    const monday = this.mondayOf(this.parseDay(selected));
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const key = this.dateKey(d);
      return {
        key,
        weekday: this.weekdayShort(d),
        dayNum: d.getDate(),
        isSelected: key === selected,
        isToday: key === today,
        hasEvents: this.reservas().some(
          (r) => r.status !== 'cancelled' && this.dateKey(new Date(r.starts_at)) === key,
        ),
      };
    });
  });

  readonly isHoje = computed(() => this.selectedDay() === this.dateKey(new Date()));

  readonly buscando = computed(() => this.query().trim().length > 0);

  readonly eventosDoDia = computed(() => {
    const day = this.selectedDay();
    return this.reservas()
      .filter((r) => this.dateKey(new Date(r.starts_at)) === day)
      .sort((a, b) => a.starts_at.localeCompare(b.starts_at));
  });

  readonly ativosDoDia = computed(() =>
    this.eventosDoDia().filter((r) => r.status !== 'cancelled'),
  );

  readonly listaVisivel = computed(() => {
    const q = this.normalize(this.query());
    const base = q
      ? this.reservas()
          .filter((r) => r.status !== 'cancelled')
          .sort((a, b) => a.starts_at.localeCompare(b.starts_at))
      : this.eventosDoDia();

    if (!q) return base;

    return base.filter((r) => {
      const haystack = this.normalize(
        [r.patient_name, r.patient_phone, r.patient_email, r.service?.name, this.statusLabel(r.status)].join(' '),
      );
      return haystack.includes(q);
    });
  });

  readonly listaAtivos = computed(() =>
    this.listaVisivel().filter((r) => r.status !== 'cancelled'),
  );

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.loading.set(true);
    this.error.set(null);
    const { from, to } = this.weekRangeAround(this.selectedDay());

    this.agenda.listServices().subscribe({
      next: (s) => {
        this.servicos.set(s || []);
        if (!this.novo.service_id && s?.[0]?.id) {
          this.novo.service_id = s[0].id;
        }
      },
      error: () => {},
    });

    this.agenda.listAppointments(from, to).subscribe({
      next: (list) => {
        this.reservas.set(list || []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar a agenda.');
        this.loading.set(false);
      },
    });
  }

  semanaAnterior(): void {
    this.shiftDay(-7);
  }

  semanaProxima(): void {
    this.shiftDay(7);
  }

  selecionarDia(key: string): void {
    if (!key || key === this.selectedDay()) return;
    this.selectedDay.set(key);
    this.query.set('');
    this.view.set('lista');
  }

  irHoje(): void {
    this.selectedDay.set(this.dateKey(new Date()));
    this.query.set('');
    this.view.set('lista');
    this.carregar();
  }

  onQuery(value: string): void {
    this.query.set(value);
  }

  serviceIdValue(): string | null {
    return this.novo.service_id != null ? String(this.novo.service_id) : null;
  }

  onServicoChange(value: string | null): void {
    this.novo.service_id = value ? Number(value) : null;
  }

  abrirNotificacoes(): void {
    this.shell.openNotifications();
  }

  abrirMenu(): void {
    this.shell.openMenu();
  }

  abrirDetalhe(a: AgendaAppointment): void {
    this.selected.set(a);
    this.view.set('detalhe');
  }

  voltarLista(): void {
    this.selected.set(null);
    this.view.set('lista');
  }

  abrirCriar(): void {
    this.novo = {
      patient_name: '',
      patient_phone: '',
      patient_email: '',
      service_id: this.servicos()[0]?.id ?? null,
      time: '09:00',
    };
    this.view.set('criar');
  }

  salvarNovo(): void {
    if (!this.novo.patient_name.trim() || !this.novo.service_id || !this.novo.time) {
      this.shell.toast('Informe paciente, serviço e horário');
      return;
    }
    const startsAt = `${this.selectedDay()}T${this.novo.time}:00`;
    this.salvando.set(true);
    this.agenda
      .createAppointment({
        service_id: this.novo.service_id,
        starts_at: startsAt,
        patient_name: this.novo.patient_name.trim(),
        patient_phone: this.novo.patient_phone.trim() || undefined,
        patient_email: this.novo.patient_email.trim() || undefined,
      })
      .subscribe({
        next: () => {
          this.salvando.set(false);
          this.shell.toast('Compromisso criado');
          this.view.set('lista');
          this.carregar();
        },
        error: (err) => {
          this.salvando.set(false);
          this.shell.toast(err?.error?.message ?? 'Não foi possível criar');
        },
      });
  }

  abrirReagendar(a: AgendaAppointment): void {
    if (a.status !== 'confirmed') return;
    const starts = new Date(a.starts_at);
    const hh = String(starts.getHours()).padStart(2, '0');
    const mm = String(starts.getMinutes()).padStart(2, '0');
    this.reagendar = {
      id: a.id,
      patient_name: a.patient_name,
      date: this.dateKey(starts),
      time: `${hh}:${mm}`,
    };
    this.view.set('reagendar');
  }

  salvarReagendar(): void {
    if (!this.reagendar.id || !this.reagendar.date || !this.reagendar.time) {
      this.shell.toast('Informe data e horário');
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
          this.shell.toast('Compromisso reagendado');
          this.selectedDay.set(this.reagendar.date);
          this.view.set('lista');
          this.selected.set(null);
          this.carregar();
        },
        error: (err) => {
          this.salvando.set(false);
          this.shell.toast(err?.error?.message ?? 'Não foi possível reagendar');
        },
      });
  }

  cancelar(a: AgendaAppointment): void {
    const ok = window.confirm(
      a.form_status === 'pending' && a.form_template_id
        ? `Cancelar o horário de ${a.patient_name}? O convite de ficha pendente também será revogado.`
        : `Cancelar o horário de ${a.patient_name}?`,
    );
    if (!ok) return;
    this.acaoId.set(a.id);
    this.agenda.updateAppointment(a.id, { status: 'cancelled' }).subscribe({
      next: () => {
        this.acaoId.set(null);
        this.shell.toast('Reserva cancelada');
        this.view.set('lista');
        this.selected.set(null);
        this.carregar();
      },
      error: (err) => {
        this.acaoId.set(null);
        this.shell.toast(err?.error?.message ?? 'Falha ao cancelar');
      },
    });
  }

  async compartilharFicha(a: AgendaAppointment): Promise<void> {
    const send = await this.garantirDocumentSend(a);
    if (!send?.share_message) return;
    openWhatsappShare(send.share_message, send.recipient_phone || a.patient_phone || null);
  }

  async copiarLinkFicha(a: AgendaAppointment): Promise<void> {
    const send = await this.garantirDocumentSend(a);
    if (!send?.public_url) return;
    const url = normalizePublicAppUrl(send.public_url) || send.public_url;
    try {
      await navigator.clipboard.writeText(url);
      this.shell.toast('Link copiado');
    } catch {
      this.shell.toast('Não foi possível copiar');
    }
  }

  temFichaPendente(a: AgendaAppointment): boolean {
    return a.status === 'confirmed' && a.form_status === 'pending' && !!a.form_template_id;
  }

  iniciais(nome: string): string {
    const parts = (nome || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase();
  }

  horaCurta(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  dataCurta(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      confirmed: 'Confirmada',
      cancelled: 'Cancelada',
      completed: 'Concluída',
    };
    return map[status] ?? status;
  }

  formStatusLabel(a: AgendaAppointment): string {
    if (a.form_status === 'pending') return 'Ficha pendente';
    if (a.form_status === 'completed') return 'Ficha concluída';
    return '';
  }

  private async garantirDocumentSend(a: AgendaAppointment): Promise<AgendaDocumentSendInvite | null> {
    if (a.document_send?.public_url) return a.document_send;
    this.acaoId.set(a.id);
    try {
      const send = await new Promise<AgendaDocumentSendInvite>((resolve, reject) => {
        this.agenda.ensureDocumentInvite(a.id).subscribe({ next: resolve, error: reject });
      });
      this.reservas.update((list) =>
        list.map((item) => (item.id === a.id ? { ...item, document_send: send } : item)),
      );
      if (this.selected()?.id === a.id) {
        this.selected.set({ ...a, document_send: send });
      }
      return send;
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'error' in err
          ? (err as { error?: { message?: string } }).error?.message
          : undefined;
      this.shell.toast(message ?? 'Não foi possível gerar o convite');
      return null;
    } finally {
      this.acaoId.set(null);
    }
  }

  private shiftDay(delta: number): void {
    const [y, m, d] = this.selectedDay().split('-').map(Number);
    const next = new Date(y!, m! - 1, d! + delta);
    this.selectedDay.set(this.dateKey(next));
    this.view.set('lista');
    this.carregar();
  }

  private formatDiaTitulo(key: string): string {
    const date = this.parseDay(key);
    const weekday = date
      .toLocaleDateString('pt-BR', { weekday: 'long' })
      .replace(/^\w/, (c) => c.toUpperCase())
      .replace('-feira', '-Feira');
    const day = date.getDate();
    const month = date
      .toLocaleDateString('pt-BR', { month: 'long' })
      .replace(/^\w/, (c) => c.toUpperCase());
    return `${weekday}, ${day} De ${month}`;
  }

  private weekdayShort(d: Date): string {
    const map = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
    return map[d.getDay()] ?? '';
  }

  private parseDay(key: string): Date {
    const [y, m, d] = key.split('-').map(Number);
    return new Date(y!, m! - 1, d!);
  }

  private mondayOf(d: Date): Date {
    const copy = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const day = copy.getDay();
    const offset = day === 0 ? -6 : 1 - day;
    copy.setDate(copy.getDate() + offset);
    return copy;
  }

  private normalize(value: string): string {
    return (value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  private dateKey(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private weekRangeAround(dayKey: string): { from: string; to: string } {
    const center = this.parseDay(dayKey);
    const from = new Date(center);
    from.setDate(from.getDate() - 14);
    const to = new Date(center);
    to.setDate(to.getDate() + 21);
    return { from: this.dateKey(from), to: this.dateKey(to) };
  }
}
