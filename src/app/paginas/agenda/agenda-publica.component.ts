import {
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AgendaPublicFormInvite,
  AgendaPublicSlot,
  AgendaService,
  AgendaServiceItem,
} from '../../core/services/agenda.service';
import { formatarDataHoraBr } from '@/shared/utils/date';
import { PublicPageBodyService } from '../../core/services/public-page-body.service';
import { digitsOnlyPhone, formatPhoneBrDisplay } from '../pessoas/pessoas-form.util';
import { linkBioPresetMeta } from '../link-bio-public/link-bio-preset.util';
import type { LinkBioLayoutModel } from '../../core/services/link-bio.service';
import { normalizePublicAppUrl } from '../../core/utils/public-form-url.util';
import { resolvePublicAccentHex, solidBrandSoft } from '../../core/utils/public-theme-accent';
import { absoluteMediaUrl } from '../../core/utils/absolute-media-url';

type BookStep = 1 | 2 | 3 | 4;

interface CalendarCell {
  day: number;
  iso: string;
  spacer?: boolean;
  disabled?: boolean;
}

interface SlotGroup {
  label: string;
  items: AgendaPublicSlot[];
}

interface BookConfirm {
  serviceName: string;
  startsAt: string;
  duration: number;
  tokenHint: string;
  patientFirstName: string;
  form?: AgendaPublicFormInvite | null;
}

@Component({
  selector: 'app-agenda-publica',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NgStyle],
  templateUrl: './agenda-publica.component.html',
  styleUrl: './agenda-publica.component.css',
})
export class AgendaPublicaComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private agenda = inject(AgendaService);
  private publicPageBody = inject(PublicPageBodyService);

  readonly clinicName = signal('');
  readonly clinicInitial = signal('G');
  /** Mesma chave da Link Bio — preferência compartilhada. */
  readonly dark = signal(false);
  /** CSS vars do tema Link Bio (accent ou preset do modelo). */
  readonly themeStyle = signal<Record<string, string>>({});
  readonly services = signal<AgendaServiceItem[]>([]);
  readonly slots = signal<AgendaPublicSlot[]>([]);
  readonly slotsLoading = signal(false);
  readonly pageErro = signal('');
  readonly formErro = signal('');
  readonly sending = signal(false);

  /** Cor sólida para theme-color (reaplicada ao trocar claro/escuro). */
  private chromeLight = '#f6f9f6';

  readonly step = signal<BookStep>(1);
  readonly serviceId = signal<number | null>(null);
  readonly date = signal('');
  readonly selectedSlot = signal('');
  readonly patientName = signal('');
  readonly patientEmail = signal('');
  readonly patientPhone = signal('');
  readonly confirm = signal<BookConfirm | null>(null);

  readonly calYear = signal(new Date().getFullYear());
  readonly calMonth = signal(new Date().getMonth());

  private slug = '';
  private readonly horizonDays = 60;

  readonly selectedService = computed(() => {
    const id = this.serviceId();
    return this.services().find((s) => s.id === id) ?? null;
  });

  readonly monthLabel = computed(() => {
    const d = new Date(this.calYear(), this.calMonth(), 1);
    const raw = d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  });

  readonly calendarCells = computed((): CalendarCell[] => {
    const yy = this.calYear();
    const mm = this.calMonth();
    const startWeek = (new Date(yy, mm, 1).getDay() + 6) % 7; // seg=0
    const dayCount = new Date(yy, mm + 1, 0).getDate();
    const today = this.startOfToday();
    const max = new Date(today);
    max.setDate(max.getDate() + this.horizonDays);

    const cells: CalendarCell[] = [];
    for (let i = 0; i < startWeek; i++) {
      cells.push({ day: 0, iso: '', spacer: true });
    }
    for (let day = 1; day <= dayCount; day++) {
      const d = new Date(yy, mm, day);
      const iso = this.toIsoDate(d);
      const disabled = d < today || d > max;
      cells.push({ day, iso, disabled });
    }
    return cells;
  });

  readonly canPrevMonth = computed(() => {
    const now = new Date();
    return this.calYear() * 12 + this.calMonth() > now.getFullYear() * 12 + now.getMonth();
  });

  readonly canNextMonth = computed(() => {
    const max = new Date();
    max.setDate(max.getDate() + this.horizonDays);
    return this.calYear() * 12 + this.calMonth() < max.getFullYear() * 12 + max.getMonth();
  });

  readonly slotGroups = computed((): SlotGroup[] => {
    const all = this.slots();
    const morning = all.filter((s) => this.slotHour(s) < 12);
    const afternoon = all.filter((s) => {
      const h = this.slotHour(s);
      return h >= 12 && h < 18;
    });
    const evening = all.filter((s) => this.slotHour(s) >= 18);
    return [
      { label: 'Manhã', items: morning },
      { label: 'Tarde', items: afternoon },
      { label: 'Noite', items: evening },
    ].filter((g) => g.items.length > 0);
  });

  readonly dateLabel = computed(() => {
    const iso = this.date();
    if (!iso) return '';
    const raw = new Date(iso + 'T12:00:00').toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  });

  readonly selectedSlotLabel = computed(() => {
    const iso = this.selectedSlot();
    return iso ? this.formatSlot(iso) : '';
  });

  ngOnInit(): void {
    this.publicPageBody.enterPublicPage();
    try {
      this.dark.set(localStorage.getItem('gestgo_bio_dark') === '1');
    } catch {
      /* ignore */
    }
    this.syncThemeColor();
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    if (!this.slug) {
      this.pageErro.set('Agenda inválida.');
      return;
    }
    this.agenda.publicShow(this.slug).subscribe({
      next: (data) => {
        this.clinicName.set(data.clinic.name);
        this.clinicInitial.set(this.initials(data.clinic.name));
        this.services.set(data.services || []);
        this.applyLinkBioTheme(
          data.clinic.link_bio_model,
          data.clinic.accent_hex,
          data.clinic.public_theme,
        );
        if (data.services?.length === 1) {
          this.serviceId.set(data.services[0].id);
        }
      },
      error: () => this.pageErro.set('Agenda não encontrada.'),
    });
  }

  toggleDark(): void {
    this.dark.update((v) => !v);
    try {
      localStorage.setItem('gestgo_bio_dark', this.dark() ? '1' : '0');
    } catch {
      /* ignore */
    }
    this.syncThemeColor();
  }

  private syncThemeColor(): void {
    if (this.dark()) {
      this.publicPageBody.setThemeColor('#151a1b');
      return;
    }
    this.publicPageBody.setThemeColor(this.chromeLight);
  }

  /** Herda cor do tema público / accent da Link Bio (não só do modelo visual). */
  private applyLinkBioTheme(
    modelRaw: number | null | undefined,
    accentRaw: string | null | undefined,
    publicTheme?: string | null,
  ): void {
    const model = ([1, 2, 3, 4, 5, 6, 7, 8].includes(Number(modelRaw))
      ? Number(modelRaw)
      : 2) as LinkBioLayoutModel;
    const meta = linkBioPresetMeta(model);
    const resolved = resolvePublicAccentHex(publicTheme, accentRaw);
    const hasThemeAccent = !!resolved;
    const brand = resolved || meta.brand;
    const brandDark = hasThemeAccent ? brand : meta.brandDark;
    const brandSoft = hasThemeAccent
      ? `color-mix(in srgb, ${brand} 14%, #ffffff)`
      : meta.brandSoft;
    this.themeStyle.set({
      '--ap-brand': brand,
      '--ap-brand-strong': brandDark,
      '--ap-brand-soft': brandSoft,
    });
    // Status bar mobile = cor do tema (accent), não o verde do painel Gestgo
    this.chromeLight = hasThemeAccent ? brand : meta.brandSoft || solidBrandSoft(meta.brand);
    this.syncThemeColor();
  }

  ngOnDestroy(): void {
    this.publicPageBody.leavePublicPage();
  }

  chooseService(id: number): void {
    this.serviceId.set(id);
    this.formErro.set('');
  }

  goNext(): void {
    this.formErro.set('');
    const s = this.step();
    if (s === 1) {
      if (!this.serviceId()) {
        this.formErro.set('Selecione um serviço para continuar.');
        return;
      }
      this.step.set(2);
      if (!this.date()) {
        // preselect today if within month view
        const todayIso = this.toIsoDate(new Date());
        this.chooseDate(todayIso);
      } else {
        this.reloadSlots();
      }
      return;
    }
    if (s === 2) {
      if (!this.date() || !this.selectedSlot()) {
        this.formErro.set('Escolha uma data e um horário.');
        return;
      }
      this.step.set(3);
    }
  }

  goBack(): void {
    this.formErro.set('');
    const s = this.step();
    if (s === 2) this.step.set(1);
    else if (s === 3) this.step.set(2);
  }

  shiftMonth(dir: -1 | 1): void {
    if (dir < 0 && !this.canPrevMonth()) return;
    if (dir > 0 && !this.canNextMonth()) return;
    let m = this.calMonth() + dir;
    let y = this.calYear();
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    this.calMonth.set(m);
    this.calYear.set(y);
  }

  chooseDate(iso: string): void {
    if (!iso) return;
    this.date.set(iso);
    this.selectedSlot.set('');
    this.reloadSlots();
  }

  chooseSlot(startsAt: string): void {
    this.selectedSlot.set(startsAt);
    this.formErro.set('');
  }

  onPhoneInput(raw: string): void {
    this.patientPhone.set(formatPhoneBrDisplay(digitsOnlyPhone(raw)));
  }

  formatSlot(iso: string): string {
    return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  formatPrice(s: AgendaServiceItem): string {
    if (!s.show_price || s.price == null || Number(s.price) <= 0) return 'Consulte';
    return `R$ ${Number(s.price).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  servicePhoto(s: AgendaServiceItem): string | null {
    return absoluteMediaUrl(s.photo_url) ?? s.photo_url ?? null;
  }

  enviar(): void {
    const serviceId = this.serviceId();
    const svc = this.selectedService();
    if (!serviceId || !this.selectedSlot() || !this.patientName().trim()) {
      this.formErro.set('Preencha serviço, horário e nome.');
      return;
    }
    const phoneDigits = digitsOnlyPhone(this.patientPhone());
    if (!this.patientEmail().trim() && phoneDigits.length < 10) {
      this.formErro.set('Informe e-mail ou WhatsApp válido.');
      return;
    }
    this.formErro.set('');
    this.sending.set(true);
    this.agenda
      .publicBook(this.slug, {
        service_id: serviceId,
        starts_at: this.selectedSlot(),
        patient_name: this.patientName().trim(),
        patient_email: this.patientEmail().trim() || undefined,
        patient_phone: phoneDigits || undefined,
      })
      .subscribe({
        next: (res) => {
          this.sending.set(false);
          const first = this.patientName().trim().split(/\s+/)[0] || '';
          const form = res.form
            ? {
                ...res.form,
                public_url: normalizePublicAppUrl(res.form.public_url) || res.form.public_url,
              }
            : null;
          this.confirm.set({
            serviceName: res.service_name || svc?.name || 'Atendimento',
            startsAt: res.starts_at,
            duration: svc?.duration_minutes ?? 0,
            tokenHint: res.public_token.slice(0, 8),
            patientFirstName: first,
            form,
          });
          this.step.set(4);
          this.publicPageBody.reapplyLockedThemeColor();
        },
        error: (err) => {
          this.sending.set(false);
          this.formErro.set(err.error?.message ?? 'Não foi possível reservar.');
        },
      });
  }

  novaReserva(): void {
    this.confirm.set(null);
    this.formErro.set('');
    this.selectedSlot.set('');
    this.patientName.set('');
    this.patientEmail.set('');
    this.patientPhone.set('');
    this.slots.set([]);
    this.step.set(1);
  }

  confirmWhenLabel(): string {
    const c = this.confirm();
    if (!c) return '';
    return formatarDataHoraBr(c.startsAt) || c.startsAt;
  }

  private reloadSlots(): void {
    this.selectedSlot.set('');
    this.slots.set([]);
    const serviceId = this.serviceId();
    const date = this.date();
    if (!serviceId || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      this.slotsLoading.set(false);
      return;
    }
    this.slotsLoading.set(true);
    this.agenda.publicSlots(this.slug, serviceId, date).subscribe({
      next: (slots) => {
        this.slots.set(slots ?? []);
        this.slotsLoading.set(false);
      },
      error: (err) => {
        this.slots.set([]);
        this.slotsLoading.set(false);
        this.formErro.set(err?.error?.message ?? 'Não foi possível carregar os horários.');
      },
    });
  }

  private slotHour(slot: AgendaPublicSlot): number {
    return new Date(slot.starts_at).getHours();
  }

  private startOfToday(): Date {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private toIsoDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private initials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return 'G';
    if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
}
