import { Component, Inject, OnInit, PLATFORM_ID, inject, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

import { ZardCheckboxComponent } from '@/shared/components/checkbox';
import { LandingService, PlanoLanding } from '../../core/services/landing.service';
import { ComeceService } from '../../core/services/comece.service';
import { AuthService } from '../../core/services/auth.service';
import { OnboardingService } from '../../core/services/onboarding.service';
import { Template } from '../../core/services/templates.service';
import {
  billingDocumentValidator,
  passwordMatchValidator,
  phoneMinDigitsValidator,
} from './comece-form.validators';

@Component({
  selector: 'app-pagina-comece',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, NgxMaskDirective, ZardCheckboxComponent],
  templateUrl: './comece.component.html',
  styleUrl: './comece.component.css',
})
export class ComeceComponent implements OnInit {
  readonly planos = signal<PlanoLanding[]>([]);
  readonly diasTrial = signal(14);
  readonly carregandoPlanos = signal(true);
  readonly planKey = signal('');
  readonly estadoCarregando = signal(false);
  readonly estadoErro = signal(false);
  readonly mensagemErro = signal('');
  readonly mostrarSenha = signal(false);
  readonly mostrarSenhaConf = signal(false);
  readonly forcaSenha = signal(0);
  readonly labelForcaSenha = signal('Use no mínimo 8 caracteres');
  readonly uiStep = signal(1);
  readonly showSuccessOverlay = signal(false);
  readonly lpTheme = signal<'dark' | 'light'>('dark');
  readonly formularioEnviado = signal(false);

  readonly niches = signal<string[]>([]);
  readonly nicheKey = signal('estetica');

  readonly templatesOnboarding = signal<Template[]>([]);
  readonly carregandoTemplates = signal(false);
  readonly templateSelecionadoId = signal<number | null>(null);
  readonly linkPublicoUrl = signal('');
  readonly gerandoLink = signal(false);
  readonly onboardingErro = signal('');
  readonly linkCopiado = signal(false);

  readonly nicheLabels: Record<string, string> = {
    estetica: 'Estética / Harmonização',
    odontologia: 'Odontologia',
    clinica_medica: 'Clínica Médica',
    fisioterapia: 'Fisioterapia',
    psicologia: 'Psicologia / Psiquiatria',
    pediatria: 'Pediatria',
    ginecologia: 'Ginecologia / Obstetrícia',
    oftalmologia: 'Oftalmologia',
    dermatologia: 'Dermatologia',
    laboratorio: 'Laboratório / Coleta',
    veterinaria: 'Veterinária',
    geral: 'Geral',
  };

  readonly waCadastroUrl =
    'https://wa.me/5534996460818?text=' +
    encodeURIComponent('Olá! Estou criando minha conta no Gestgo e queria tirar uma dúvida.');

  readonly cadastroForm = inject(FormBuilder).nonNullable.group(
    {
      companyName: ['', Validators.required],
      responsibleName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      billingDocument: ['', billingDocumentValidator()],
      phone: ['', [Validators.required, phoneMinDigitsValidator(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', Validators.required],
      acceptedTerms: [false, Validators.requiredTrue],
    },
    { validators: passwordMatchValidator },
  );

  private platformId: object;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private landingService = inject(LandingService);
  private comeceService = inject(ComeceService);
  private auth = inject(AuthService);
  private onboarding = inject(OnboardingService);

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.platformId = platformId;
    this.cadastroForm.controls.password.valueChanges.subscribe(() => this.atualizarForcaSenha());
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let saved = localStorage.getItem('gestgo-lp-theme') as 'dark' | 'light' | null;
      if (saved !== 'dark' && saved !== 'light') {
        const legacy = localStorage.getItem('zm-lp-theme') as 'dark' | 'light' | null;
        if (legacy === 'dark' || legacy === 'light') {
          saved = legacy;
          localStorage.setItem('gestgo-lp-theme', legacy);
          localStorage.removeItem('zm-lp-theme');
        }
      }
      if (saved === 'dark' || saved === 'light') {
        this.lpTheme.set(saved);
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        this.lpTheme.set('light');
      }
    }
    const qe = this.route.snapshot.queryParamMap.get('email');
    if (qe?.trim()) {
      this.cadastroForm.patchValue({ email: qe.trim() });
    }
    const qp = this.route.snapshot.queryParamMap.get('plan');
    if (qp?.trim()) this.planKey.set(qp.trim());

    this.landingService.getLanding().subscribe({
      next: (d) => {
        this.diasTrial.set(d.trial_days ?? 14);
        this.planos.set(d.plans ?? []);
        this.niches.set(d.niches?.length ? d.niches.map(String) : ['estetica', 'odontologia']);
        const qn = this.route.snapshot.queryParamMap.get('niche');
        if (qn && this.niches().includes(qn)) {
          this.nicheKey.set(qn);
        } else if (!this.niches().includes(this.nicheKey())) {
          this.nicheKey.set(this.niches()[0] ?? 'estetica');
        }
        this.carregandoPlanos.set(false);
        if (this.planos().length && !this.planos().some((p) => p.key === this.planKey())) {
          this.planKey.set(this.planos()[0].key);
        }
      },
      error: () => {
        this.diasTrial.set(14);
        this.planos.set([]);
        this.niches.set(['estetica', 'odontologia']);
        this.nicheKey.set('estetica');
        this.carregandoPlanos.set(false);
      },
    });
  }

  toggleLpTheme(): void {
    this.lpTheme.set(this.lpTheme() === 'dark' ? 'light' : 'dark');
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('gestgo-lp-theme', this.lpTheme());
      localStorage.removeItem('zm-lp-theme');
    }
  }

  readonly progressPct = computed(() => {
    if (this.showSuccessOverlay()) return 100;
    if (this.linkPublicoUrl()) return 90;
    return this.uiStep() === 1 ? 33 : 66;
  });

  isPlanoGratis(plan: PlanoLanding): boolean {
    return plan.value <= 0 || /grat/i.test(plan.name) || plan.key === 'free';
  }

  selecionarPlano(key: string): void {
    this.planKey.set(key);
  }

  selecionarNicho(key: string): void {
    this.nicheKey.set(key);
  }

  selecionarTemplate(id: number): void {
    this.templateSelecionadoId.set(id);
    this.linkPublicoUrl.set('');
    this.onboardingErro.set('');
  }

  labelNicho(key: string): string {
    return this.nicheLabels[key] ?? key;
  }

  atualizarForcaSenha(): void {
    const p = this.cadastroForm.controls.password.value || '';
    let score = 0;
    if (p.length >= 8) score++;
    if (p.length >= 12) score++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    this.forcaSenha.set(Math.min(4, score));
    const labels = ['', 'Senha muito fraca', 'Senha fraca', 'Senha razoável', 'Senha forte'];
    this.labelForcaSenha.set(labels[this.forcaSenha()] || 'Use no mínimo 8 caracteres');
  }

  enviar(): void {
    this.formularioEnviado.set(true);
    this.estadoErro.set(false);
    this.mensagemErro.set('');
    this.cadastroForm.markAllAsTouched();

    if (!this.planKey() || !this.nicheKey()) {
      this.estadoErro.set(true);
      this.mensagemErro.set('Selecione o plano e o segmento do negócio.');
      return;
    }

    if (this.cadastroForm.invalid) {
      this.estadoErro.set(true);
      if (this.cadastroForm.hasError('passwordMismatch')) {
        this.mensagemErro.set('As senhas não coincidem.');
      } else if (this.cadastroForm.controls.billingDocument.hasError('billingDocument')) {
        this.mensagemErro.set('Se informar CPF/CNPJ, use 11 ou 14 dígitos válidos.');
      } else {
        this.mensagemErro.set('Preencha todos os campos obrigatórios, confirme a senha e aceite os termos.');
      }
      return;
    }

    const v = this.cadastroForm.getRawValue();
    this.estadoCarregando.set(true);
    const payload = {
      company_name: v.companyName.trim(),
      responsible_name: v.responsibleName.trim(),
      email: v.email.trim(),
      phone: v.phone.trim(),
      password: v.password,
      password_confirmation: v.passwordConfirmation,
      plan_key: this.planKey(),
      niche: this.nicheKey(),
      accepted_terms: v.acceptedTerms,
    };
    const doc = v.billingDocument.trim();
    this.comeceService
      .store(doc ? { ...payload, billing_document: doc } : payload)
      .subscribe({
        next: () => {
          this.estadoCarregando.set(false);
          this.uiStep.set(2);
          this.carregarTemplatesOnboarding();
          if (isPlatformBrowser(this.platformId)) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        },
        error: (err) => {
          this.estadoCarregando.set(false);
          this.estadoErro.set(true);
          let msg: string | undefined = err.error?.message;
          if (!msg && err.error?.errors) {
            msg = Object.values(err.error.errors).flat().join(' ');
          }
          this.mensagemErro.set(typeof msg === 'string' && msg.trim() ? msg : 'Não foi possível criar a conta. Tente novamente.');
        },
      });
  }

  private carregarTemplatesOnboarding(): void {
    this.carregandoTemplates.set(true);
    this.onboardingErro.set('');
    this.onboarding.listTemplates().subscribe({
      next: (items) => {
        this.templatesOnboarding.set(items);
        this.carregandoTemplates.set(false);
        if (items.length === 1) {
          this.templateSelecionadoId.set(items[0].id);
        }
      },
      error: () => {
        this.carregandoTemplates.set(false);
        this.onboardingErro.set('Não foi possível carregar os modelos. Você pode configurar depois no painel.');
      },
    });
  }

  gerarLinkPublico(): void {
    if (this.templateSelecionadoId() == null) {
      this.onboardingErro.set('Escolha um modelo de ficha para continuar.');
      return;
    }
    this.gerandoLink.set(true);
    this.onboardingErro.set('');
    this.onboarding.gerarLinkPublico(this.templateSelecionadoId() as number).subscribe({
      next: (url) => {
        this.gerandoLink.set(false);
        if (!url) {
          this.onboardingErro.set('Link não retornado. Tente novamente no painel.');
          return;
        }
        this.linkPublicoUrl.set(url);
      },
      error: () => {
        this.gerandoLink.set(false);
        this.onboardingErro.set('Erro ao gerar o link. Tente em Modelos de fichas no painel.');
      },
    });
  }

  copiarLink(): void {
    if (!this.linkPublicoUrl() || !isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText(this.linkPublicoUrl()).then(() => {
      this.linkCopiado.set(true);
      window.setTimeout(() => (this.linkCopiado.set(false), 2000));
    });
  }

  finalizarConfiguracao(): void {
    this.showSuccessOverlay.set(true);
    if (isPlatformBrowser(this.platformId)) {
      window.setTimeout(() => void this.router.navigateByUrl(this.auth.getDefaultTenantPath()), 1600);
    }
  }
}
