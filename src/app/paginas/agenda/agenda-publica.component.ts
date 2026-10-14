import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AgendaPublicSlot, AgendaService, AgendaServiceItem } from '../../core/services/agenda.service';
import { formatarDataHoraBr } from '@/shared/utils/date';

@Component({
  selector: 'app-agenda-publica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="ap">
      <header class="ap-head">
        <strong>Gestgo Agenda</strong>
        <span>{{ clinicName() }}</span>
      </header>
      @if (erro()) {
        <p class="ap-erro">{{ erro() }}</p>
      } @else if (okMsg()) {
        <main class="ap-main">
          <h1>Reserva confirmada</h1>
          <p>{{ okMsg() }}</p>
        </main>
      } @else {
        <main class="ap-main">
          <h1>Agendar atendimento</h1>
          <p class="ap-sub">Escolha o serviço, o dia e um horário disponível. Disponibilidade em tempo real depende da configuração da clínica.</p>

          <label>Serviço</label>
          <select [(ngModel)]="serviceId" name="service" (ngModelChange)="onServiceOrDate()">
            <option [ngValue]="null">Selecione…</option>
            @for (s of services(); track s.id) {
              <option [ngValue]="s.id">{{ s.name }} ({{ s.duration_minutes }} min)</option>
            }
          </select>

          <label>Data</label>
          <input type="date" [(ngModel)]="date" name="date" (ngModelChange)="onServiceOrDate()" />

          <label>Horário</label>
          <div class="ap-slots">
            @for (slot of slots(); track slot.starts_at) {
              <button type="button" class="ap-slot" [class.ap-slot--on]="selectedSlot === slot.starts_at" (click)="selectedSlot = slot.starts_at">
                {{ formatSlot(slot.starts_at) }}
              </button>
            } @empty {
              <p class="ap-muted">{{ serviceId && date ? 'Sem horários neste dia.' : 'Selecione serviço e data.' }}</p>
            }
          </div>

          <label>Nome</label>
          <input [(ngModel)]="patientName" name="name" maxlength="160" />
          <label>E-mail</label>
          <input type="email" [(ngModel)]="patientEmail" name="email" />
          <label>Telefone</label>
          <input [(ngModel)]="patientPhone" name="phone" />

          <button type="button" class="ap-submit" [disabled]="sending()" (click)="enviar()">
            {{ sending() ? 'Reservando…' : 'Confirmar reserva' }}
          </button>
        </main>
      }
    </div>
  `,
  styles: [
    `
      .ap {
        min-height: 100vh;
        background: linear-gradient(180deg, #f7faf8, #eef3f0);
        font-family: 'Segoe UI', system-ui, sans-serif;
        color: #122018;
      }
      .ap-head {
        max-width: 560px;
        margin: 0 auto;
        padding: 1rem 1.25rem;
        display: flex;
        justify-content: space-between;
        color: #0f6b4a;
      }
      .ap-main {
        max-width: 560px;
        margin: 0 auto;
        padding: 1rem 1.25rem 2.5rem;
        display: grid;
        gap: 0.55rem;
      }
      h1 {
        margin: 0 0 0.25rem;
        font-size: 1.5rem;
      }
      .ap-sub {
        color: #3a4a42;
        margin: 0 0 0.5rem;
        font-size: 0.95rem;
      }
      label {
        font-size: 0.8rem;
        font-weight: 600;
        margin-top: 0.35rem;
      }
      input,
      select {
        width: 100%;
        border: 1px solid #c9ddd2;
        border-radius: 0.55rem;
        padding: 0.55rem 0.7rem;
        background: #fff;
      }
      .ap-slots {
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
      }
      .ap-slot {
        border: 1px solid #c9ddd2;
        background: #fff;
        border-radius: 999px;
        padding: 0.35rem 0.75rem;
        cursor: pointer;
      }
      .ap-slot--on {
        background: #14b87a;
        border-color: #14b87a;
        color: #fff;
      }
      .ap-submit {
        margin-top: 0.75rem;
        background: #14b87a;
        color: #fff;
        border: 0;
        border-radius: 0.65rem;
        padding: 0.75rem 1rem;
        font-weight: 700;
        cursor: pointer;
      }
      .ap-submit:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .ap-erro {
        color: #b42318;
        padding: 1rem;
      }
      .ap-muted {
        color: #667;
        font-size: 0.9rem;
      }
    `,
  ],
})
export class AgendaPublicaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private agenda = inject(AgendaService);

  readonly clinicName = signal('');
  readonly services = signal<AgendaServiceItem[]>([]);
  readonly slots = signal<AgendaPublicSlot[]>([]);
  readonly erro = signal('');
  readonly okMsg = signal('');
  readonly sending = signal(false);

  serviceId: number | null = null;
  date = '';
  selectedSlot = '';
  patientName = '';
  patientEmail = '';
  patientPhone = '';
  private slug = '';

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    if (!this.slug) {
      this.erro.set('Agenda inválida.');
      return;
    }
    this.agenda.publicShow(this.slug).subscribe({
      next: (data) => {
        this.clinicName.set(data.clinic.name);
        this.services.set(data.services || []);
      },
      error: () => this.erro.set('Agenda não encontrada.'),
    });
  }

  formatSlot(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  onServiceOrDate(): void {
    this.selectedSlot = '';
    this.slots.set([]);
    if (!this.serviceId || !this.date) return;
    this.agenda.publicSlots(this.slug, this.serviceId, this.date).subscribe({
      next: (slots) => this.slots.set(slots),
      error: () => this.slots.set([]),
    });
  }

  enviar(): void {
    if (!this.serviceId || !this.selectedSlot || !this.patientName.trim()) {
      this.erro.set('Preencha serviço, horário e nome.');
      return;
    }
    if (!this.patientEmail.trim() && !this.patientPhone.trim()) {
      this.erro.set('Informe e-mail ou telefone.');
      return;
    }
    this.erro.set('');
    this.sending.set(true);
    this.agenda
      .publicBook(this.slug, {
        service_id: this.serviceId,
        starts_at: this.selectedSlot,
        patient_name: this.patientName.trim(),
        patient_email: this.patientEmail.trim() || undefined,
        patient_phone: this.patientPhone.trim() || undefined,
      })
      .subscribe({
        next: (res) => {
          this.sending.set(false);
          this.okMsg.set(
            `${res.service_name} em ${formatarDataHoraBr(res.starts_at)}. Guarde o código: ${res.public_token.slice(0, 8)}…`,
          );
        },
        error: (err) => {
          this.sending.set(false);
          this.erro.set(err.error?.message ?? 'Não foi possível reservar.');
        },
      });
  }
}
