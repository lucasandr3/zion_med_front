import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrDirective, provideFlatpickrDefaults } from 'angularx-flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import {
  FormularioPublicoFeegowMeta,
  FormularioPublicoService,
} from '../../core/services/formulario-publico.service';
import {
  extractAvailabilityByProfessional,
  FEEGOW_VALUE_DEFAULTS,
  optionsFromList,
} from './formulario-publico-feegow.util';

@Component({
  selector: 'zm-formulario-publico-feegow',
  standalone: true,
  imports: [CommonModule, FormsModule, FlatpickrDirective],
  providers: [
    provideFlatpickrDefaults({
      locale: Portuguese,
      dateFormat: 'Y-m-d',
      altInput: true,
      altFormat: 'd/m/Y',
      altInputClass: 'fp-input',
      allowInput: true,
      disableMobile: true,
      static: false,
    }),
  ],
  templateUrl: './formulario-publico-feegow.component.html',
})
export class FormularioPublicoFeegowComponent implements OnChanges {
  @Input() token = '';
  @Input({ required: true }) valores!: Record<string, string | number | boolean | Date>;
  @Input() feegowMeta: FormularioPublicoFeegowMeta | null = null;

  @Output() valoresChange = new EventEmitter<void>();

  feegowHorariosDisponiveis: string[] = [];
  feegowProfissionaisDisponiveis: { value: string; label: string }[] = [];
  feegowHorasPorProfissional: Record<string, string[]> = {};
  feegowDisponibilidadeErro = '';
  feegowBuscandoDisponibilidade = false;

  private formularioService = inject(FormularioPublicoService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['feegowMeta']?.currentValue?.enabled) {
      this.initFeegowValues();
    }
  }

  feegowSpecialtiesOptions(): { value: string; label: string }[] {
    return optionsFromList(this.feegowMeta?.specialties, ['nome', 'name'], ['especialidade_id', 'id']);
  }

  feegowInsurancesOptions(): { value: string; label: string }[] {
    return optionsFromList(this.feegowMeta?.insurances, ['nome', 'convenio', 'name'], ['convenio_id', 'id']);
  }

  feegowLocalsOptions(): { value: string; label: string }[] {
    return optionsFromList(this.feegowMeta?.locals, ['local', 'nome', 'name'], ['id', 'local_id']);
  }

  feegowChannelsOptions(): { value: string; label: string }[] {
    return optionsFromList(this.feegowMeta?.channels, ['canal', 'nome', 'name'], ['id', 'canal_id']);
  }

  feegowProceduresOptions(): { value: string; label: string }[] {
    return optionsFromList(this.feegowMeta?.procedures, ['procedimento', 'nome', 'name'], ['procedimento_id', 'id']);
  }

  feegowProfessionalsOptions(): { value: string; label: string }[] {
    const fromMeta = optionsFromList(
      this.feegowMeta?.professionals,
      ['nome', 'name'],
      ['profissional_id', 'id', 'sys_user'],
    );
    const merged = new Map<string, { value: string; label: string }>();
    [...fromMeta, ...this.feegowProfissionaisDisponiveis].forEach((opt) => merged.set(opt.value, opt));
    return Array.from(merged.values());
  }

  hasFeegowProcedureOptions(): boolean {
    return this.feegowProceduresOptions().length > 0;
  }

  hasFeegowProfessionalOptions(): boolean {
    return this.feegowProfessionalsOptions().length > 0;
  }

  onProfissionalChange(): void {
    const selected = String(this.valores['feegow_profissional_id'] || '');
    if (selected && this.feegowHorasPorProfissional[selected]?.length) {
      this.feegowHorariosDisponiveis = this.feegowHorasPorProfissional[selected];
      const current = String(this.valores['feegow_horario'] || '');
      if (current && !this.feegowHorariosDisponiveis.includes(current)) {
        this.valores['feegow_horario'] = '';
      }
      this.valoresChange.emit();
      return;
    }
    const all = Array.from(new Set(Object.values(this.feegowHorasPorProfissional).flat())).sort();
    if (all.length > 0) {
      this.feegowHorariosDisponiveis = all;
      this.valoresChange.emit();
    }
  }

  consultarDisponibilidade(): void {
    if (!this.feegowMeta?.enabled || !this.token) return;

    const especialidadeId = Number(this.valores['feegow_especialidade_id'] || 0);
    const procedimentoId = Number(this.valores['feegow_procedimento_id'] || 0);
    const dataRaw = String(this.valores['feegow_data'] || '');
    if (!especialidadeId || !procedimentoId || !dataRaw) {
      this.feegowDisponibilidadeErro = 'Informe especialidade, procedimento e data para consultar horários.';
      return;
    }

    this.feegowBuscandoDisponibilidade = true;
    this.feegowDisponibilidadeErro = '';
    this.feegowHorariosDisponiveis = [];

    const [yyyy, mm, dd] = dataRaw.split('-');
    const dateBr = yyyy && mm && dd ? `${dd}-${mm}-${yyyy}` : '';

    this.formularioService
      .getFeegowDisponibilidade(this.token, {
        tipo: 'P',
        procedimento_id: procedimentoId,
        especialidade_id: especialidadeId,
        data_start: dateBr,
        data_end: dateBr,
        convenio_id: this.valores['feegow_convenio_id'] ? Number(this.valores['feegow_convenio_id']) : undefined,
      })
      .subscribe({
        next: (resp) => {
          this.feegowBuscandoDisponibilidade = false;
          const availability = extractAvailabilityByProfessional(resp.schedule);
          this.feegowHorasPorProfissional = availability.hoursByProfessional;
          this.feegowProfissionaisDisponiveis = availability.professionals;
          this.feegowHorariosDisponiveis = availability.allHours;
          this.onProfissionalChange();
          if (this.feegowHorariosDisponiveis.length === 0) {
            this.feegowDisponibilidadeErro = 'Nenhum horário disponível para os filtros informados.';
          }
        },
        error: (err) => {
          this.feegowBuscandoDisponibilidade = false;
          this.feegowDisponibilidadeErro = err?.error?.message ?? 'Não foi possível consultar a disponibilidade.';
        },
      });
  }

  resetAvailabilityState(): void {
    this.feegowBuscandoDisponibilidade = false;
    this.feegowDisponibilidadeErro = '';
    this.feegowHorariosDisponiveis = [];
    this.feegowProfissionaisDisponiveis = [];
    this.feegowHorasPorProfissional = {};
  }

  private initFeegowValues(): void {
    Object.entries(FEEGOW_VALUE_DEFAULTS).forEach(([key, value]) => {
      if (!(key in this.valores)) this.valores[key] = value;
    });
    this.valoresChange.emit();
  }
}
