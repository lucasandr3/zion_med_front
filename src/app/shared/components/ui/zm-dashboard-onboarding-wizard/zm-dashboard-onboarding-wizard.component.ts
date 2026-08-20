import { Component, EventEmitter, Input, Output, inject, OnChanges, SimpleChanges } from '@angular/core';
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
  imports: [RouterLink, ZardCardComponent, ZardButtonComponent],
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

  iconeTemplate(template: Template): string {
    const name = (template.name ?? '').toLowerCase();
    const category = (template.category ?? '').toLowerCase();
    const label = `${name} ${category}`;

    if (label.includes('lgpd') || label.includes('autorização') || label.includes('consent')) {
      return 'verified_user';
    }
    if (label.includes('checklist') || label.includes('sala')) {
      return 'checklist';
    }
    if (label.includes('toxina') || label.includes('botul')) {
      return 'vaccines';
    }
    if (label.includes('preenchimento') || label.includes('ácido') || label.includes('acido')) {
      return 'water_drop';
    }
    if (label.includes('depilação') || label.includes('depilacao') || label.includes('laser')) {
      return 'flare';
    }
    if (label.includes('peeling') || label.includes('lumínic') || label.includes('luminic')) {
      return 'light_mode';
    }
    if (label.includes('corporal') || label.includes('corpo')) {
      return 'accessibility_new';
    }
    if (label.includes('anamnese')) {
      return 'clinical_notes';
    }
    if (label.includes('cadastro') || label.includes('ficha')) {
      return 'assignment';
    }
    if (label.includes('retorno') || label.includes('avalia')) {
      return 'stethoscope';
    }
    return 'description';
  }

  categoriaTemplate(template: Template): string | null {
    const name = (template.name ?? '').toLowerCase();
    if (name.includes('anamnese')) {
      return 'Anamnese';
    }
    if (name.includes('lgpd') || name.includes('autorização') || name.includes('autorizacao')) {
      return 'Consentimento';
    }
    if (name.includes('checklist')) {
      return 'Operacional';
    }
    if (template.category?.trim()) {
      return template.category.trim();
    }
    return null;
  }

  nomeTemplateSelecionado(): string {
    const template = this.templates.find((item) => item.id === this.templateSelecionadoId);
    return template ? `Modelo selecionado: ${template.name}` : '';
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
