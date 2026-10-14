import {
  Component,
  OnInit,
  inject,
  signal,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AgendaAppointment,
  AgendaAvailabilityRule,
  AgendaService,
  AgendaServiceItem,
} from '../../core/services/agenda.service';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { ListSkeletonComponent } from '../../shared/components/list-skeleton/list-skeleton.component';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
import { formatarDataHoraBr } from '@/shared/utils/date';

type AbaAgenda = 'reservas' | 'servicos' | 'expediente';

const WEEKDAYS = [
  { value: 1, label: 'Seg' },
  { value: 2, label: 'Ter' },
  { value: 3, label: 'Qua' },
  { value: 4, label: 'Qui' },
  { value: 5, label: 'Sex' },
  { value: 6, label: 'Sáb' },
  { value: 0, label: 'Dom' },
];

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-agenda',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  imports: [...NORD_FORM_IMPORTS, FormsModule, ListSkeletonComponent],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css',
})
export class AgendaComponent implements OnInit {
  private agenda = inject(AgendaService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);

  readonly weekdays = WEEKDAYS;
  readonly abas: { key: AbaAgenda; label: string }[] = [
    { key: 'reservas', label: 'Reservas' },
    { key: 'servicos', label: 'Serviços' },
    { key: 'expediente', label: 'Expediente' },
  ];

  readonly abaAtiva = signal<AbaAgenda>('reservas');
  readonly servicos = signal<AgendaServiceItem[]>([]);
  readonly reservas = signal<AgendaAppointment[]>([]);
  readonly salvando = signal(false);
  readonly carregando = signal(false);
  readonly listaPronta = signal(false);
  readonly erro = signal('');
  readonly acaoId = signal<number | null>(null);

  novoServico = { name: '', duration_minutes: 30 };
  private rulesState: Record<number, { enabled: boolean; start: string; end: string }> = {};

  ngOnInit(): void {
    for (const d of WEEKDAYS) {
      this.rulesState[d.value] = {
        enabled: d.value >= 1 && d.value <= 5,
        start: '09:00',
        end: '18:00',
      };
    }
    this.reload();
  }

  setAba(aba: AbaAgenda): void {
    this.abaAtiva.set(aba);
  }

  ruleFor(day: number) {
    return this.rulesState[day]!;
  }

  toggleDay(day: number, ev: Event): void {
    const checked = (ev.target as HTMLInputElement).checked;
    this.rulesState[day] = { ...this.ruleFor(day), enabled: checked };
  }

  setRuleTime(day: number, key: 'start' | 'end', value: string): void {
    this.rulesState[day] = { ...this.ruleFor(day), [key]: value };
  }

  formatDt(v: string): string {
    return formatarDataHoraBr(v) || v;
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
            this.rulesState[d.value] = { enabled: false, start: '09:00', end: '18:00' };
          }
          for (const r of rules) {
            this.rulesState[r.weekday] = {
              enabled: r.is_active !== false,
              start: String(r.start_time).slice(0, 5),
              end: String(r.end_time).slice(0, 5),
            };
          }
        }
        done();
      },
      error: () => done(),
    });

    this.agenda.listAppointments().subscribe({
      next: (a) => {
        this.reservas.set(a);
        done();
      },
      error: () => done(),
    });
  }

  criarServico(): void {
    const name = this.novoServico.name.trim();
    if (!name) {
      this.toast.error('Informe o nome', 'Digite o nome do serviço.');
      return;
    }
    this.salvando.set(true);
    this.agenda
      .createService({
        name,
        duration_minutes: Number(this.novoServico.duration_minutes) || 30,
        is_active: true,
      })
      .subscribe({
        next: () => {
          this.salvando.set(false);
          this.novoServico = { name: '', duration_minutes: 30 };
          this.reload();
          this.toast.success('Serviço criado', '');
        },
        error: (err) => {
          this.salvando.set(false);
          this.toast.error('Erro', err.error?.message ?? 'Não foi possível criar.');
        },
      });
  }

  async removerServico(s: AgendaServiceItem): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Remover serviço?',
      message: `O serviço “${s.name}” será removido. Reservas antigas podem ficar sem referência.`,
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
    const rules: AgendaAvailabilityRule[] = WEEKDAYS.filter((d) => this.ruleFor(d.value).enabled).map((d) => ({
      weekday: d.value,
      start_time: this.ruleFor(d.value).start,
      end_time: this.ruleFor(d.value).end,
      is_active: true,
    }));
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
        this.reload();
        this.toast.success('Reserva cancelada', '');
      },
      error: (err) => {
        this.acaoId.set(null);
        this.toast.error('Erro', err.error?.message ?? 'Falha ao cancelar.');
      },
    });
  }
}
