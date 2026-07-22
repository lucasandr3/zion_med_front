import { Component, OnInit, computed, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardTabComponent, ZardTabGroupComponent } from '@/shared/components/tabs';
import { MAT_FORM_IMPORTS } from '@/shared/material';
import {
  PlataformaService,
  PlatformManualEmail,
  PlatformManualEmailCategory,
  PlatformManualEmailRecipient,
  PlatformManualEmailRecipientsData,
} from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ToastService } from '../../../core/services/toast.service';
import { ZmSkeletonListComponent } from '../../../shared/components/skeletons';
import { ZmPaginationComponent } from '../../../shared/components/ui';
import { DataTableComponent, BadgeComponent, UpEmptyStateComponent } from '../../../shared/components/up';
import {
  applyPlatformEmailTemplate,
  PLATFORM_EMAIL_TEMPLATES,
} from './plataforma-email-templates';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectOptionGroup {
  label?: string;
  options: SelectOption[];
}

@Component({
  selector: 'app-plataforma-emails',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ZardCardComponent,
    ZardTabComponent,
    ZardTabGroupComponent,
    ...MAT_FORM_IMPORTS,
    ZmSkeletonListComponent,
    ZmPaginationComponent,
    DataTableComponent,
    BadgeComponent,
    UpEmptyStateComponent,
  ],
  templateUrl: './plataforma-emails.component.html',
  styleUrl: './plataforma-emails.component.css',
})
export class PlataformaEmailsComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  estadoErro = '';
  saving = false;
  loadingHistorico = false;
  formError = '';

  recipientsData: PlatformManualEmailRecipientsData | null = null;
  emails: PlatformManualEmail[] = [];
  currentPage = 1;
  lastPage = 1;
  total = 0;

  category: PlatformManualEmailCategory = 'general';
  templateKey = '';
  recipientKey = 'custom';
  toEmail = '';
  toName = '';
  subject = '';
  body = '';
  tenantId: number | null = null;
  organizationId: number | null = null;
  leadId: number | null = null;

  readonly customRecipientKey = 'custom';
  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);

  readonly recipientGroups = computed(() => {
    const recipients = this.recipientsData?.recipients ?? [];
    const groups = new Map<string, PlatformManualEmailRecipient[]>();

    recipients.forEach((item) => {
      const group = item.group ?? 'Outros';
      const list = groups.get(group) ?? [];
      list.push(item);
      groups.set(group, list);
    });

    return Array.from(groups.entries()).map(([label, items]) => ({ label, items }));
  });

  private readonly defaultCategoryOptions: SelectOption[] = [
    { value: 'contact', label: 'Contato' },
    { value: 'billing', label: 'Cobrança' },
    { value: 'general', label: 'Geral' },
    { value: 'support', label: 'Suporte' },
  ];

  readonly categoryOptions = computed((): SelectOption[] => {
    const merged = new Map(this.defaultCategoryOptions.map((item) => [item.value, item]));

    (this.recipientsData?.categories ?? []).forEach((item) => {
      merged.set(item.value, { value: item.value, label: item.label });
    });

    return Array.from(merged.values());
  });

  readonly whatsappTemplateIds = new Set(['general-whatsapp-missing', 'support-whatsapp-missing']);

  readonly usesSupportEmailLayout = computed(
    () => this.category === 'support' || this.whatsappTemplateIds.has(this.templateKey)
  );

  readonly whatsappButtonConfigured = computed(
    () => Boolean(this.recipientsData?.whatsapp_number?.trim())
  );

  readonly templateOptions = computed((): SelectOption[] => {
    const filtered = PLATFORM_EMAIL_TEMPLATES.filter((item) => item.category === this.category);

    return [
      { value: '', label: 'Escrever do zero' },
      ...filtered.map((item) => ({ value: item.id, label: item.label })),
    ];
  });

  readonly recipientSelectGroups = computed((): SelectOptionGroup[] => {
    const groups: SelectOptionGroup[] = [
      {
        options: [{ value: this.customRecipientKey, label: 'E-mail personalizado' }],
      },
    ];

    this.recipientGroups().forEach((group) => {
      groups.push({
        label: group.label,
        options: group.items.map((item) => ({
          value: item.id,
          label: item.label,
        })),
      });
    });

    return groups;
  });

  ngOnInit(): void {
    this.carregarInicial();
  }

  carregarInicial(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
      forkJoin({
        recipients: this.plataformaService.getManualEmailRecipients(),
        history: this.plataformaService.getManualEmails(1),
      })
    );
    this.showSkeleton = showSkeleton;

    data$.subscribe({
      next: ({ recipients, history }) => {
        this.listaPronta = true;
        this.estadoErro = '';
        this.recipientsData = recipients.data;
        this.aplicarHistorico(history);
      },
      error: () => {
        this.listaPronta = true;
        this.estadoErro = 'Não foi possível carregar os dados de e-mail.';
      },
    });
  }

  carregarHistorico(page = this.currentPage): void {
    this.loadingHistorico = true;
    this.plataformaService.getManualEmails(page).subscribe({
      next: (history) => {
        this.loadingHistorico = false;
        this.aplicarHistorico(history);
      },
      error: () => {
        this.loadingHistorico = false;
        this.toast.error('Não foi possível carregar o histórico.');
      },
    });
  }

  onCategoryChange(value: string | null): void {
    if (!value) {
      return;
    }

    this.category = value as PlatformManualEmailCategory;
    this.templateKey = '';

    if (this.subject.trim() !== '' || this.body.trim() !== '') {
      return;
    }

    this.aplicarAssuntoPadrao();
  }

  onTemplateChange(value: string | null): void {
    this.templateKey = value ?? '';

    if (!this.templateKey) {
      return;
    }

    const template = PLATFORM_EMAIL_TEMPLATES.find((item) => item.id === this.templateKey);
    if (!template) {
      return;
    }

    if (template.category === 'support' || this.whatsappTemplateIds.has(template.id)) {
      this.category = 'support';
    } else {
      this.category = template.category;
    }

    const applied = applyPlatformEmailTemplate(template, this.templateContext());
    this.subject = applied.subject;
    this.body = applied.body;
  }

  onToNameChange(): void {
    const nome = this.toName.trim() || 'cliente';

    if (/^Olá,\s*.+,\s*tudo bem\?/im.test(this.body)) {
      this.body = this.body.replace(/^Olá,\s*.+,\s*tudo bem\?/im, `Olá, ${nome}, tudo bem?`);
      return;
    }

    if (/^Olá,\s*.+!/im.test(this.body)) {
      this.body = this.body.replace(/^Olá,\s*.+!/im, `Olá, ${nome}!`);
    }
  }

  onRecipientChange(value: string | null): void {
    this.recipientKey = value ?? this.customRecipientKey;

    if (this.recipientKey === this.customRecipientKey) {
      this.tenantId = null;
      this.organizationId = null;
      this.leadId = null;
      return;
    }

    const recipient = this.recipientsData?.recipients.find((item) => item.id === this.recipientKey);
    if (!recipient) {
      return;
    }

    this.toEmail = recipient.email;
    this.toName = recipient.name ?? recipient.organization_name ?? recipient.tenant_name ?? '';
    this.tenantId = recipient.tenant_id ?? null;
    this.organizationId = recipient.organization_id ?? null;
    this.leadId = recipient.lead_id ?? null;

    if (recipient.email_type === 'billing') {
      this.category = 'billing';
    } else if (recipient.email_type === 'contact') {
      this.category = 'contact';
    }

    if (this.templateKey) {
      this.onTemplateChange(this.templateKey);
    }
  }

  submit(): void {
    this.formError = '';

    if (!this.recipientsData?.mail_configured) {
      this.formError = 'Configure o Resend em Configurações da plataforma antes de enviar.';
      return;
    }

    const toEmail = this.toEmail.trim();
    const subject = this.subject.trim();
    const body = this.body.trim();

    if (!toEmail || !subject || !body) {
      this.formError = 'Preencha destinatário, assunto e mensagem.';
      return;
    }

    this.saving = true;
    const category = this.usesSupportEmailLayout() ? 'support' : this.category;
    const toName = this.resolveRecipientName();

    this.plataformaService
      .sendManualEmail({
        category,
        to_email: toEmail,
        to_name: toName,
        subject,
        body,
        tenant_id: this.tenantId,
        organization_id: this.organizationId,
        lead_id: this.leadId,
      })
      .subscribe({
        next: (res) => {
          this.saving = false;
          this.toast.success(res.message ?? 'E-mail enviado com sucesso.');
          this.resetForm();
          this.carregarHistorico(1);
        },
        error: (err) => {
          this.saving = false;
          this.formError = err?.error?.message ?? 'Não foi possível enviar o e-mail.';
        },
      });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.lastPage) {
      return;
    }
    this.currentPage = page;
    this.carregarHistorico(page);
  }

  formatarData(iso?: string | null): string {
    if (!iso) {
      return '—';
    }
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  }

  destinatarioResumo(email: PlatformManualEmail): string {
    const name = email.recipient_name?.trim();
    return name ? `${name} · ${email.recipient_email}` : email.recipient_email;
  }

  private aplicarHistorico(history: { data?: PlatformManualEmail[]; meta?: { current_page?: number; last_page?: number; total?: number } }): void {
    this.emails = history.data ?? [];
    this.currentPage = history.meta?.current_page ?? 1;
    this.lastPage = history.meta?.last_page ?? 1;
    this.total = history.meta?.total ?? 0;
  }

  private resetForm(): void {
    this.recipientKey = this.customRecipientKey;
    this.templateKey = '';
    this.toEmail = '';
    this.toName = '';
    this.subject = '';
    this.body = '';
    this.category = 'general';
    this.tenantId = null;
    this.organizationId = null;
    this.leadId = null;
  }

  private resolveRecipientName(): string | null {
    const fromField = this.toName.trim();
    if (fromField) {
      return fromField;
    }

    const greetingMatch = this.body.match(/^Olá,\s*(.+?),\s*tudo bem\?/im);
    if (greetingMatch?.[1]) {
      const fromBody = greetingMatch[1].trim();
      if (fromBody) {
        return fromBody;
      }
    }

    const simpleMatch = this.body.match(/^Olá,\s*(.+?)!/im);
    if (simpleMatch?.[1]) {
      const fromBody = simpleMatch[1].trim();
      if (fromBody) {
        return fromBody;
      }
    }

    return null;
  }

  private templateContext(): { nome?: string | null; produto?: string | null; empresa?: string | null } {
    const recipient = this.recipientsData?.recipients.find((item) => item.id === this.recipientKey);

    return {
      nome: this.toName.trim() || recipient?.name || recipient?.organization_name || null,
      produto: this.recipientsData?.from_name ?? 'Gestgo',
      empresa: recipient?.organization_name ?? recipient?.tenant_name ?? null,
    };
  }

  private aplicarAssuntoPadrao(): void {
    const product = this.recipientsData?.from_name ?? 'Gestgo';
    const map: Record<PlatformManualEmailCategory, string> = {
      contact: `[${product}] Contato`,
      billing: `[${product}] Cobrança`,
      general: `[${product}]`,
      support: `[${product}] Suporte`,
    };
    this.subject = map[this.category] ?? map.general;
  }
}
