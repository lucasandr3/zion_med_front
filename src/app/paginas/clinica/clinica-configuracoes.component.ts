import { Component, OnInit, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FlatpickrDirective, provideFlatpickrDefaults } from 'angularx-flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { ClinicaService, ClinicaConfig, ClinicaOption, ClinicaAuditLog, ConfigPageData, BusinessHoursSlot } from '../../core/services/clinica.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';

const DAYS: { id: string; label: string }[] = [
  { id: '1', label: 'Segunda' },
  { id: '2', label: 'Terça' },
  { id: '3', label: 'Quarta' },
  { id: '4', label: 'Quinta' },
  { id: '5', label: 'Sexta' },
  { id: '6', label: 'Sábado' },
  { id: '7', label: 'Domingo' },
];

@Component({
  selector: 'app-clinica-configuracoes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ZmSkeletonListComponent, FlatpickrDirective],
  providers: [
    provideFlatpickrDefaults({
      locale: Portuguese,
      static: true,
      allowInput: true,
      disableMobile: true,
    }),
  ],
  templateUrl: './clinica-configuracoes.component.html',
  styleUrl: './clinica-configuracoes.component.css',
})
export class ClinicaConfiguracoesComponent implements OnInit {
  pageData: ConfigPageData | null = null;
  form: Partial<ClinicaConfig> & {
    business_hours?: Record<string, { open: string; close: string }>;
  } = {};
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  salvando = false;
  erro = '';
  sucesso = false;
  activeTab = 'dados';
  logoFile: File | null = null;
  readonly days = DAYS;

  // Logs
  logs: ClinicaAuditLog[] = [];
  logsLoading = false;
  logsLoaded = false;
  logsError = '';
  logsPage = 1;
  logsLastPage = 1;
  logsTotal = 0;

  private clinicaService = inject(ClinicaService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);

  get clinic(): ClinicaConfig | undefined {
    return this.pageData?.clinic;
  }

  get availableThemes(): Record<string, { label?: string; primary?: string }> {
    return this.pageData?.available_themes ?? {};
  }

  get canAddMultiEmpresa(): boolean {
    return !!this.pageData?.can_add_multi_empresa;
  }

  get tenantClinics(): ClinicaOption[] {
    return this.pageData?.tenant_clinics ?? [];
  }

  get showStickyFooter(): boolean {
    return this.activeTab !== 'assinatura' && this.activeTab !== 'empresas' && this.activeTab !== 'logs';
  }

  get themeKeys(): string[] {
    return Object.keys(this.availableThemes);
  }

  /** Primeiro plano disponível (para card principal da aba Assinatura). */
  get firstPlanKey(): string | null {
    const plans = this.pageData?.billing_plans ?? {};
    const keys = Object.keys(plans);
    return keys.length ? keys[0] : null;
  }

  get firstPlan(): { name?: string; value?: number } | null {
    const key = this.firstPlanKey;
    if (!key) return null;
    const plans = this.pageData?.billing_plans ?? {};
    return (plans as Record<string, { name?: string; value?: number }>)[key] ?? null;
  }

  get hasPayments(): boolean {
    return (this.pageData?.billing_payments?.length ?? 0) > 0;
  }

  private traduzirAcao(action?: string | null): string {
    if (!action) return '';
    const map: Record<string, string> = {
      'clinic.created': 'Empresa criada',
      'clinic.updated': 'Empresa atualizada',
      'user.created': 'Usuário criado',
      'user.deactivated': 'Usuário desativado',
      'template.created': 'Template criado',
      'template.updated': 'Template atualizado',
      'template.deleted': 'Template excluído',
      'submission.created': 'Protocolo criado',
      'submission.reviewed': 'Protocolo revisado',
      'submission.comment': 'Comentário em protocolo',
    };
    if (map[action]) return map[action];
    return action.replace(/\./g, ' ');
  }

  private traduzirEntidade(entityType?: string | null): string {
    if (!entityType) return '';
    const basename = entityType.split('\\').pop() ?? entityType;
    const map: Record<string, string> = {
      FormSubmission: 'Protocolo',
      User: 'Usuário',
      FormTemplate: 'Template',
      Clinic: 'Empresa',
      Organization: 'Empresa',
    };
    return map[basename] ?? basename;
  }

  ngOnInit(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.clinicaService.getConfiguracoesPage());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (data) => {
        this.listaPronta = true;
        this.pageData = data;
        this.activeTab = data.active_config_tab ?? 'dados';
        this.patchFormFromClinic(data.clinic);
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Não foi possível carregar as configurações.';
      },
    });
  }

  private patchFormFromClinic(c: ClinicaConfig): void {
    const bh = (c.business_hours ?? {}) as Record<string, BusinessHoursSlot>;
    const businessHours: Record<string, { open: string; close: string }> = {};
    DAYS.forEach((d) => {
      const slot = bh[d.id] ?? bh[d.id as unknown as number];
      businessHours[d.id] = {
        open: (slot?.open as string) ?? '',
        close: (slot?.close as string) ?? '',
      };
    });
    this.form = {
      name: c.name ?? '',
      notification_email: c.notification_email ?? '',
      contact_email: c.contact_email ?? '',
      phone: c.phone ?? '',
      address: c.address ?? '',
      billing_name: c.billing_name ?? '',
      billing_email: c.billing_email ?? '',
      billing_document: c.billing_document ?? '',
      business_hours: businessHours,
      whatsapp_notifications_enabled: c.whatsapp_notifications_enabled ?? false,
      whatsapp_notify_cobranca: c.whatsapp_notify_cobranca ?? true,
      whatsapp_notify_faturas_boleto: c.whatsapp_notify_faturas_boleto ?? true,
      whatsapp_notify_avisos: c.whatsapp_notify_avisos ?? true,
      theme: c.theme ?? 'ocean-blue',
      dark_mode: c.dark_mode ?? false,
    };
  }

  setTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'logs') {
      this.carregarLogs();
    }
  }

  /** Atualiza horário (abre/fecha) a partir da seleção do Flatpickr. */
  setTime(dayId: string, field: 'open' | 'close', dates: Date[]): void {
    if (!this.form.business_hours || !dates?.length) return;
    const d = dates[0];
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    this.form.business_hours[dayId][field] = `${h}:${m}`;
  }

  carregarLogs(page = 1): void {
    this.logsLoading = true;
    this.logsError = '';
    this.clinicaService.getClinicaLogs(page).subscribe({
      next: (res) => {
        this.logsLoading = false;
        this.logsLoaded = true;
        this.logs = (res.data ?? []).map((log) => ({
          ...log,
          action: this.traduzirAcao(log.action),
          entity_type: this.traduzirEntidade(log.entity_type ?? undefined),
        }));
        this.logsPage = res.meta?.current_page ?? 1;
        this.logsLastPage = res.meta?.last_page ?? 1;
        this.logsTotal = res.meta?.total ?? this.logs.length;
      },
      error: () => {
        this.logsLoading = false;
        this.logsError = 'Não foi possível carregar os logs.';
      },
    });
  }

  isScheduleActive(dayId: string): boolean {
    const slot = this.form.business_hours?.[dayId];
    return !!(slot && (slot.open || slot.close));
  }

  toggleScheduleDay(dayId: string, checked: boolean): void {
    if (!this.form.business_hours) this.form.business_hours = {};
    if (checked) {
      this.form.business_hours[dayId] = { open: '08:00', close: '18:00' };
    } else {
      this.form.business_hours[dayId] = { open: '', close: '' };
    }
  }

  copyFirstDayToAll(): void {
    const first = this.form.business_hours?.['1'];
    if (!first) return;
    const open = first.open || '08:00';
    const close = first.close || '18:00';
    DAYS.forEach((d) => {
      if (d.id === '1') return;
      if (!this.form.business_hours) this.form.business_hours = {};
      this.form.business_hours[d.id] = { open, close };
    });
  }

  onLogoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.logoFile = input.files?.[0] ?? null;
  }

  salvar(): void {
    this.salvando = true;
    this.erro = '';
    this.sucesso = false;
    const bh = this.form.business_hours ?? {};
    const cleaned: Record<string, { open: string; close: string }> = {};
    Object.entries(bh).forEach(([d, slot]) => {
      const open = (slot?.open ?? '').trim();
      const close = (slot?.close ?? '').trim();
      if (open && close) cleaned[d] = { open, close };
    });
    const payload: Record<string, unknown> = {
      name: this.form.name,
      notification_email: this.form.notification_email ?? null,
      contact_email: this.form.contact_email ?? null,
      phone: this.form.phone ?? null,
      address: this.form.address ?? null,
      billing_name: this.form.billing_name ?? null,
      billing_email: this.form.billing_email ?? null,
      billing_document: this.form.billing_document ?? null,
      business_hours: Object.keys(cleaned).length ? cleaned : null,
      whatsapp_notifications_enabled: !!this.form.whatsapp_notifications_enabled,
      whatsapp_notify_cobranca: !!this.form.whatsapp_notify_cobranca,
      whatsapp_notify_faturas_boleto: !!this.form.whatsapp_notify_faturas_boleto,
      whatsapp_notify_avisos: !!this.form.whatsapp_notify_avisos,
      theme: this.form.theme ?? undefined,
      dark_mode: !!this.form.dark_mode,
    };
    this.clinicaService.updateConfiguracoes(payload as Partial<ClinicaConfig>, this.logoFile ?? undefined).subscribe({
      next: (updated) => {
        this.salvando = false;
        this.sucesso = true;
        this.logoFile = null;
        if (this.pageData) this.pageData.clinic = { ...this.pageData.clinic, ...updated };
        this.patchFormFromClinic(updated);
        this.toast.success('Configurações salvas', 'As alterações da empresa foram gravadas.');
      },
      error: () => {
        this.salvando = false;
        this.erro = 'Não foi possível salvar.';
        this.toast.error('Erro ao salvar', this.erro);
      },
    });
  }

  progressFilled(): number {
    const f = this.form;
    let n = 0;
    if ((f.name ?? '').trim()) n++;
    if ((f.notification_email ?? '').trim()) n++;
    if ((f.address ?? '').trim()) n++;
    if ((f.phone ?? '').trim()) n++;
    if ((f.contact_email ?? '').trim()) n++;
    return Math.min(8, n);
  }
}
