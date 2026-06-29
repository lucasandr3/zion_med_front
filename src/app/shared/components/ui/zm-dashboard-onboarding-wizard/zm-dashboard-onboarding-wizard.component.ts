import { Component, EventEmitter, Input, Output, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { OnboardingService } from '../../../../core/services/onboarding.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Template } from '../../../../core/services/templates.service';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';

const DISMISS_PREFIX = 'zm_onboarding_dismiss_';

@Component({
  selector: 'zm-dashboard-onboarding-wizard',
  standalone: true,
  imports: [CommonModule, RouterLink, ZardCardComponent, ZardButtonComponent],
  templateUrl: './zm-dashboard-onboarding-wizard.component.html',
  styleUrl: './zm-dashboard-onboarding-wizard.component.css',
})
export class ZmDashboardOnboardingWizardComponent implements OnChanges {
  @Input({ required: true }) visible = false;
  @Output() dismissed = new EventEmitter<void>();
  @Output() linkGenerated = new EventEmitter<void>();

  private onboarding = inject(OnboardingService);
  private auth = inject(AuthService);
  private toast = inject(ToastService);

  templates: Template[] = [];
  carregandoTemplates = false;
  templateSelecionadoId: number | null = null;
  linkPublicoUrl = '';
  gerandoLink = false;
  linkCopiado = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']?.currentValue === true && this.templates.length === 0 && !this.carregandoTemplates) {
      this.carregarTemplates();
    }
  }

  carregarTemplates(): void {
    this.carregandoTemplates = true;
    this.onboarding
      .listTemplates()
      .pipe(finalize(() => (this.carregandoTemplates = false)))
      .subscribe({
        next: (items) => {
          this.templates = items.slice(0, 8);
          if (this.templates.length === 1) {
            this.templateSelecionadoId = this.templates[0].id;
          }
        },
        error: () => {
          this.toast.error('Erro', 'Não foi possível carregar os modelos.');
        },
      });
  }

  selecionarTemplate(id: number): void {
    this.templateSelecionadoId = id;
    this.linkPublicoUrl = '';
    this.linkCopiado = false;
  }

  gerarLink(): void {
    if (!this.templateSelecionadoId) {
      this.toast.error('Selecione um modelo', 'Escolha um formulário antes de gerar o link.');
      return;
    }

    this.gerandoLink = true;
    this.onboarding
      .gerarLinkPublico(this.templateSelecionadoId)
      .pipe(finalize(() => (this.gerandoLink = false)))
      .subscribe({
        next: (url) => {
          this.linkPublicoUrl = url;
          this.linkGenerated.emit();
          this.toast.success('Link gerado', 'Copie e envie para seu paciente ou publique no link na bio.');
        },
        error: () => {
          this.toast.error('Erro', 'Não foi possível gerar o link público.');
        },
      });
  }

  copiarLink(): void {
    if (!this.linkPublicoUrl || !navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(this.linkPublicoUrl).then(() => {
      this.linkCopiado = true;
      setTimeout(() => (this.linkCopiado = false), 2500);
    });
  }

  dispensar(): void {
    const orgId = this.auth.getCurrentOrganizationId();
    if (orgId != null) {
      try {
        localStorage.setItem(`${DISMISS_PREFIX}${orgId}`, '1');
      } catch {
        /* ignore */
      }
    }
    this.dismissed.emit();
  }

  static isDismissedForOrg(orgId: string | number | undefined | null): boolean {
    if (orgId == null || orgId === '') {
      return false;
    }
    try {
      return localStorage.getItem(`${DISMISS_PREFIX}${orgId}`) === '1';
    } catch {
      return false;
    }
  }
}
