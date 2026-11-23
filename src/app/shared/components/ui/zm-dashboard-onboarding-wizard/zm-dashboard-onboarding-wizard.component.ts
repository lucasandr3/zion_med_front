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
import { catchError, finalize, of } from 'rxjs';
import { OnboardingService } from '../../../../core/services/onboarding.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ClinicaConfig, ClinicaService } from '../../../../core/services/clinica.service';
import { DashboardData } from '../../../../core/services/dashboard.service';
import { ProductTelemetryService } from '../../../../core/services/product-telemetry.service';
import { ToastService } from '../../../../core/services/toast.service';
import { TemplatePublishGuardService } from '../../../../core/services/template-publish-guard.service';
import { Template } from '../../../../core/services/templates.service';
import { nicheToSegmentKey, segmentKeyToNiche } from '../../../../core/utils/onboarding-niche.util';
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
  /** Snapshot de GET /dashboard.onboarding — hidrata passos 2–5 sem depender só do localStorage. */
  readonly serverOnboarding = input<DashboardData['onboarding'] | null>(null);
  readonly dismissed = output<void>();
  readonly linkGenerated = output<void>();

  private onboarding = inject(OnboardingService);
  private auth = inject(AuthService);
  private clinica = inject(ClinicaService);
  private telemetry = inject(ProductTelemetryService);
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
  readonly expandido = signal(false);
  readonly personalizou = signal(false);
  readonly testouPreenchimento = signal(false);
  readonly viuResultado = signal(false);
  /** Marcos do servidor (checklist 3 passos do dashboard). */
  readonly serverHasTemplate = signal(false);
  readonly serverHasLink = signal(false);
  readonly serverHasSend = signal(false);

  readonly checklist: ReadonlyArray<{ key: OnboardingStepKey; label: string }> = [
    { key: 'segment', label: 'Especialidade' },
    { key: 'template', label: 'Minha ficha' },
    { key: 'personalize', label: 'Mapear' },
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

  private temTemplateLocalOuServer(): boolean {
    return !!this.templateSelecionadoId() || this.serverHasTemplate();
  }

  private temLinkLocalOuServer(): boolean {
    return !!this.linkPublicoUrl() || this.serverHasLink();
  }

  private temTesteLocalOuServer(): boolean {
    return this.testouPreenchimento() || this.serverHasSend();
  }

  private temPersonalizacaoLocalOuServer(): boolean {
    return this.personalizou() || this.serverHasTemplate();
  }

  /** 1..6 conforme progresso mínimo para ativação. */
  readonly passoAtivo = computed(() => {
    if (!this.segmento()) return 1;
    if (!this.temTemplateLocalOuServer()) return 2;
    if (!this.temPersonalizacaoLocalOuServer()) return 3;
    if (!this.temLinkLocalOuServer()) return 4;
    if (!this.temTesteLocalOuServer()) return 5;
    if (!this.viuResultado() && !this.serverHasSend()) return 6;
    return 6;
  });

  readonly ativacaoConcluida = computed(
    () =>
      !!this.segmento() &&
      this.temTemplateLocalOuServer() &&
      this.temPersonalizacaoLocalOuServer() &&
      this.temLinkLocalOuServer() &&
      this.temTesteLocalOuServer() &&
      (this.viuResultado() || this.serverHasSend()),
  );

  alternarExpansao(): void {
    this.expandido.update((value) => !value);
  }

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
    if (changes['serverOnboarding']) {
      this.aplicarServerOnboarding(this.serverOnboarding());
    }
    if (changes['visible']?.currentValue === true) {
      this.hidratarSegmentoDaOrg();
      if (this.templates().length === 0 && !this.carregandoTemplates()) {
        this.carregarTemplates();
      }
    }
  }

  private aplicarServerOnboarding(data: DashboardData['onboarding'] | null | undefined): void {
    if (!data) return;
    this.serverHasTemplate.set((data.templates_count ?? 0) > 0);
    this.serverHasLink.set((data.public_links_count ?? 0) > 0);
    this.serverHasSend.set((data.sends_count ?? 0) + (data.submissions_count ?? 0) > 0);
    if (this.serverHasTemplate() && !this.personalizou()) {
      this.personalizou.set(true);
    }
    if (this.serverHasSend() && !this.testouPreenchimento()) {
      this.testouPreenchimento.set(true);
    }
    if (this.serverHasSend() && !this.viuResultado()) {
      this.viuResultado.set(true);
    }
  }

  /** Preferência: LS por org → niche da clínica → LS legado global. */
  private hidratarSegmentoDaOrg(): void {
    if (this.segmento()) return;
    const orgId = this.auth.getCurrentOrganizationId();
    if (orgId != null) {
      try {
        const perOrg = localStorage.getItem(`${SEGMENT_KEY}_${orgId}`);
        if (perOrg) {
          this.segmento.set(perOrg);
          return;
        }
      } catch {
        /* ignore */
      }
    }

    if (!this.auth.hasPermission('organization.manage')) return;
    this.clinica
      .getConfiguracoes()
      .pipe(takeUntilDestroyed(this.destroyRef), catchError(() => of(null)))
      .subscribe((cfg) => {
        if (this.segmento() || !cfg?.niche) return;
        const seg = nicheToSegmentKey(cfg.niche);
        if (seg) this.segmento.set(seg);
      });
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
    const niche = segmentKeyToNiche(key);
    const orgId = this.auth.getCurrentOrganizationId();
    try {
      localStorage.setItem(SEGMENT_KEY, key);
      if (orgId != null) localStorage.setItem(`${SEGMENT_KEY}_${orgId}`, key);
    } catch {
      /* ignore */
    }
    this.persistirProgresso();
    this.telemetry.trackOnboardingSegment({ segment: key, niche });

    if (this.auth.hasPermission('organization.manage')) {
      this.clinica
        .updateConfiguracoes({ niche } as Partial<ClinicaConfig>)
        .pipe(catchError(() => of(null)))
        .subscribe(() => this.carregarTemplates());
      return;
    }
    this.carregarTemplates();
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
        return this.temTemplateLocalOuServer();
      case 'personalize':
        return this.temPersonalizacaoLocalOuServer();
      case 'public_link':
        return this.temLinkLocalOuServer();
      case 'test_fill':
        return this.temTesteLocalOuServer();
      case 'see_result':
        return this.viuResultado() || this.serverHasSend();
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
    const orgId = this.auth.getCurrentOrganizationId();
    try {
      const perOrg = orgId != null ? localStorage.getItem(`${SEGMENT_KEY}_${orgId}`) : null;
      const seg = perOrg || localStorage.getItem(SEGMENT_KEY);
      if (seg) this.segmento.set(seg);
    } catch {
      /* ignore */
    }

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
