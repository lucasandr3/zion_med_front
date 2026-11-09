import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnChanges,
  SimpleChanges,
  computed,
  inject,
  input,
  output,
  signal,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { OnboardingService } from '../../../../core/services/onboarding.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { TemplatePublishGuardService } from '../../../../core/services/template-publish-guard.service';
import { Template } from '../../../../core/services/templates.service';
import { normalizePublicAppUrl } from '../../../../core/utils/public-form-url.util';

const DISMISS_PREFIX = 'zm_onboarding_dismiss_';
const SEGMENT_KEY = 'zm_onboarding_segment';
const PROGRESS_PREFIX = 'zm_onboarding_progress_';

type OnboardingStepKey =
  | 'segment'
  | 'template'
  | 'personalize'
  | 'public_link'
  | 'test_fill'
  | 'see_result';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'zm-dashboard-onboarding-wizard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './zm-dashboard-onboarding-wizard.component.html',
  styleUrl: './zm-dashboard-onboarding-wizard.component.css',
})
export class ZmDashboardOnboardingWizardComponent implements OnChanges {
  readonly visible = input.required<boolean>();
  readonly dismissed = output<void>();
  readonly linkGenerated = output<void>();

  private onboarding = inject(OnboardingService);
  private auth = inject(AuthService);
  private toast = inject(ToastService);
  private publishGuard = inject(TemplatePublishGuardService);
  private destroyRef = inject(DestroyRef);

  readonly templates = signal<Template[]>([]);
  readonly carregandoTemplates = signal(false);
  readonly templateSelecionadoId = signal<number | null>(null);
  readonly linkPublicoUrl = signal('');
  readonly gerandoLink = signal(false);
  readonly enviandoParaMim = signal(false);
  readonly linkCopiado = signal(false);
  readonly personalizou = signal(false);
  readonly testouPreenchimento = signal(false);
  readonly viuResultado = signal(false);

  readonly checklist: ReadonlyArray<{ key: OnboardingStepKey; label: string }> = [
    { key: 'segment', label: 'Especialidade' },
    { key: 'template', label: 'Modelo' },
    { key: 'personalize', label: 'Visualizar' },
    { key: 'public_link', label: 'Link de teste' },
    { key: 'test_fill', label: 'Preencher' },
    { key: 'see_result', label: 'PDF / histórico' },
  ];

  readonly segmentos = [
    { key: 'estetica-facial', label: 'Estética' },
    { key: 'fisioterapia-dermatofuncional', label: 'Fisioterapia' },
    { key: 'podologia', label: 'Podologia' },
    { key: 'odontologia', label: 'Odontologia' },
    { key: 'outro', label: 'Outro' },
  ] as const;

  readonly segmento = signal<string | null>(null);

  /** 1..6 conforme progresso mínimo para ativação. */
  readonly passoAtivo = computed(() => {
    if (!this.segmento()) return 1;
    if (!this.templateSelecionadoId()) return 2;
    if (!this.personalizou()) return 3;
    if (!this.linkPublicoUrl()) return 4;
    if (!this.testouPreenchimento()) return 5;
    if (!this.viuResultado()) return 6;
    return 6;
  });

  readonly ativacaoConcluida = computed(
    () =>
      !!this.segmento() &&
      !!this.templateSelecionadoId() &&
      this.personalizou() &&
      !!this.linkPublicoUrl() &&
      this.testouPreenchimento() &&
      this.viuResultado(),
  );

  private copyResetTimer: ReturnType<typeof setTimeout> | null = null;

  readonly nomeTemplateSelecionado = computed(() => {
    const id = this.templateSelecionadoId();
    const template = this.templates().find((item) => item.id === id);
    return template ? template.name : '';
  });

  constructor() {
    this.restaurarProgressoLocal();
    this.destroyRef.onDestroy(() => this.clearCopyTimer());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['visible']?.currentValue === true &&
      this.templates().length === 0 &&
      !this.carregandoTemplates()
    ) {
      this.carregarTemplates();
    }
  }

  carregarTemplates(): void {
    this.carregandoTemplates.set(true);
    this.onboarding
      .listTemplates()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.carregandoTemplates.set(false)),
      )
      .subscribe({
        next: (items) => {
          const slice = items.slice(0, 4);
          this.templates.set(slice);
          if (slice.length === 1 && !this.templateSelecionadoId()) {
            this.templateSelecionadoId.set(slice[0].id);
          }
        },
        error: () => {
          this.toast.error('Erro', 'Não foi possível carregar os modelos.');
        },
      });
  }

  selecionarSegmento(key: string): void {
    this.segmento.set(key);
    try {
      localStorage.setItem(SEGMENT_KEY, key);
    } catch {
      /* ignore */
    }
    this.persistirProgresso();
  }

  selecionarTemplate(id: number): void {
    this.templateSelecionadoId.set(id);
    this.linkPublicoUrl.set('');
    this.linkCopiado.set(false);
    this.personalizou.set(false);
    this.testouPreenchimento.set(false);
    this.viuResultado.set(false);
    this.clearCopyTimer();
    this.persistirProgresso();
  }

  marcarPersonalizado(): void {
    this.personalizou.set(true);
    this.persistirProgresso();
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

  gerarLink(): void {
    const templateId = this.templateSelecionadoId();
    if (!templateId) {
      this.toast.error('Selecione um modelo', 'Escolha um formulário antes de gerar o link.');
      return;
    }
    if (!this.personalizou()) {
      this.personalizou.set(true);
    }

    this.gerandoLink.set(true);
    this.onboarding
      .gerarLinkPublico(templateId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.gerandoLink.set(false)),
      )
      .subscribe({
        next: (url) => {
          this.linkPublicoUrl.set(normalizePublicAppUrl(url));
          this.linkGenerated.emit();
          this.persistirProgresso();
          this.toast.success('Link gerado', 'Abra o link e preencha com dados fictícios para testar.');
        },
        error: (err: unknown) => {
          void this.publishGuard.reportPublishFailure(err, templateId);
        },
      });
  }

  enviarParaMim(): void {
    const templateId = this.templateSelecionadoId();
    if (!templateId) {
      this.toast.error('Selecione um modelo', 'Escolha um formulário antes de enviar o teste.');
      return;
    }
    this.enviandoParaMim.set(true);
    this.onboarding
      .enviarParaMim(templateId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.enviandoParaMim.set(false)),
      )
      .subscribe({
        next: (res) => {
          if (res.public_url) {
            this.linkPublicoUrl.set(normalizePublicAppUrl(res.public_url));
          }
          this.testouPreenchimento.set(true);
          this.linkGenerated.emit();
          this.persistirProgresso();
          this.toast.success(
            'Teste enviado',
            res.message || 'Abra o e-mail da sua conta e preencha com dados fictícios.',
          );
        },
        error: (err: unknown) => {
          void this.publishGuard.reportPublishFailure(err, templateId);
        },
      });
  }

  abrirLinkTeste(): void {
    const url = this.linkPublicoUrl();
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
    this.testouPreenchimento.set(true);
    this.persistirProgresso();
  }

  marcarTesteFeito(): void {
    this.testouPreenchimento.set(true);
    this.persistirProgresso();
  }

  marcarResultadoVisto(): void {
    this.viuResultado.set(true);
    this.persistirProgresso();
  }

  copiarLink(): void {
    const url = this.linkPublicoUrl();
    if (!url || !navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(url).then(() => {
      this.linkCopiado.set(true);
      this.clearCopyTimer();
      this.copyResetTimer = setTimeout(() => this.linkCopiado.set(false), 2500);
    });
  }

  passoConcluido(index: number): boolean {
    const step = this.checklist[index]?.key;
    switch (step) {
      case 'segment':
        return !!this.segmento();
      case 'template':
        return !!this.templateSelecionadoId();
      case 'personalize':
        return this.personalizou();
      case 'public_link':
        return !!this.linkPublicoUrl();
      case 'test_fill':
        return this.testouPreenchimento();
      case 'see_result':
        return this.viuResultado();
      default:
        return false;
    }
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

  static clearDismissForOrg(orgId: string | number | undefined | null): void {
    if (orgId == null || orgId === '') {
      return;
    }
    try {
      localStorage.removeItem(`${DISMISS_PREFIX}${orgId}`);
    } catch {
      /* ignore */
    }
  }

  static isAtivacaoConcluidaLocal(orgId: string | number | undefined | null): boolean {
    if (orgId == null || orgId === '') {
      return false;
    }
    try {
      const raw = localStorage.getItem(`${PROGRESS_PREFIX}${orgId}`);
      if (!raw) return false;
      const data = JSON.parse(raw) as {
        templateId?: number;
        personalizou?: boolean;
        link?: string;
        testou?: boolean;
        viuResultado?: boolean;
      };
      return (
        !!data.templateId &&
        !!data.personalizou &&
        !!data.link &&
        !!data.testou &&
        !!data.viuResultado
      );
    } catch {
      return false;
    }
  }

  private restaurarProgressoLocal(): void {
    try {
      const seg = localStorage.getItem(SEGMENT_KEY);
      if (seg) this.segmento.set(seg);
    } catch {
      /* ignore */
    }

    const orgId = this.auth.getCurrentOrganizationId();
    if (orgId == null) return;
    try {
      const raw = localStorage.getItem(`${PROGRESS_PREFIX}${orgId}`);
      if (!raw) return;
      const data = JSON.parse(raw) as {
        templateId?: number;
        personalizou?: boolean;
        link?: string;
        testou?: boolean;
        viuResultado?: boolean;
      };
      if (data.templateId) this.templateSelecionadoId.set(Number(data.templateId));
      if (data.personalizou) this.personalizou.set(true);
      if (data.link) this.linkPublicoUrl.set(String(data.link));
      if (data.testou) this.testouPreenchimento.set(true);
      if (data.viuResultado) this.viuResultado.set(true);
    } catch {
      /* ignore */
    }
  }

  private persistirProgresso(): void {
    const orgId = this.auth.getCurrentOrganizationId();
    if (orgId == null) return;
    try {
      localStorage.setItem(
        `${PROGRESS_PREFIX}${orgId}`,
        JSON.stringify({
          templateId: this.templateSelecionadoId(),
          personalizou: this.personalizou(),
          link: this.linkPublicoUrl(),
          testou: this.testouPreenchimento(),
          viuResultado: this.viuResultado(),
        }),
      );
    } catch {
      /* ignore */
    }
  }

  private clearCopyTimer(): void {
    if (this.copyResetTimer != null) {
      clearTimeout(this.copyResetTimer);
      this.copyResetTimer = null;
    }
  }
}
