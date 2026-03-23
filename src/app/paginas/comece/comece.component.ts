import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LandingService, PlanoLanding } from '../../core/services/landing.service';
import { ComeceService } from '../../core/services/comece.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-pagina-comece',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './comece.component.html',
  styleUrl: './comece.component.css',
})
export class ComeceComponent implements OnInit {
  planos: PlanoLanding[] = [];
  diasTrial = 14;
  carregandoPlanos = true;
  planKey = '';
  companyName = '';
  responsibleName = '';
  email = '';
  /** CPF ou CNPJ para faturamento / Asaas (com ou sem máscara). */
  billingDocument = '';
  phone = '';
  password = '';
  passwordConfirmation = '';
  acceptedTerms = false;
  estadoCarregando = false;
  estadoErro = false;
  mensagemErro = '';
  mostrarSenha = false;
  mostrarSenhaConf = false;
  forcaSenha = 0;
  labelForcaSenha = 'Use no mínimo 8 caracteres';
  /** 1 = formulário cadastro; 2 = configuração pós-sucesso (só UI) */
  uiStep = 1;
  showSuccessOverlay = false;
  especialidadePrincipal = '';
  tamanhoEquipe = 'Só eu (profissional solo)';
  comoConheceu = '';
  lpTheme: 'dark' | 'light' = 'dark';

  readonly waCadastroUrl =
    'https://wa.me/5534996460818?text=' +
    encodeURIComponent('Olá! Estou criando minha conta no ZionMed e queria tirar uma dúvida.');

  private platformId: object;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private landingService = inject(LandingService);
  private comeceService = inject(ComeceService);
  private auth = inject(AuthService);

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.platformId = platformId;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('zm-lp-theme') as 'dark' | 'light' | null;
      if (saved === 'dark' || saved === 'light') {
        this.lpTheme = saved;
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        this.lpTheme = 'light';
      }
    }
    const qe = this.route.snapshot.queryParamMap.get('email');
    if (qe?.trim()) this.email = qe.trim();
    const qp = this.route.snapshot.queryParamMap.get('plan');
    if (qp?.trim()) this.planKey = qp.trim();

    this.landingService.getLanding().subscribe({
      next: (d) => {
        this.diasTrial = d.trial_days ?? 14;
        this.planos = d.plans ?? [];
        this.carregandoPlanos = false;
        if (this.planos.length && !this.planos.some((p) => p.key === this.planKey)) {
          this.planKey = this.planos[0].key;
        }
      },
      error: () => {
        this.diasTrial = 14;
        this.planos = [];
        this.carregandoPlanos = false;
      },
    });
  }

  toggleLpTheme(): void {
    this.lpTheme = this.lpTheme === 'dark' ? 'light' : 'dark';
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('zm-lp-theme', this.lpTheme);
    }
  }

  get progressPct(): number {
    if (this.showSuccessOverlay) return 100;
    return this.uiStep === 1 ? 33 : 66;
  }

  isPlanoGratis(plan: PlanoLanding): boolean {
    return plan.value <= 0 || /grat/i.test(plan.name) || plan.key === 'free';
  }

  selecionarPlano(key: string): void {
    this.planKey = key;
  }

  private billingDocDigits(): string {
    return (this.billingDocument || '').replace(/\D/g, '');
  }

  /** Alinhado à API: 11 (CPF) ou 14 (CNPJ) dígitos. */
  private billingDocValid(): boolean {
    const d = this.billingDocDigits();
    return d.length === 11 || d.length === 14;
  }

  atualizarForcaSenha(): void {
    const p = this.password || '';
    let score = 0;
    if (p.length >= 8) score++;
    if (p.length >= 12) score++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    this.forcaSenha = Math.min(4, score);
    const labels = ['', 'Senha muito fraca', 'Senha fraca', 'Senha razoável', 'Senha forte'];
    this.labelForcaSenha = labels[this.forcaSenha] || 'Use no mínimo 8 caracteres';
  }

  enviar(): void {
    this.estadoErro = false;
    this.mensagemErro = '';
    if (
      !this.planKey ||
      !this.companyName?.trim() ||
      !this.responsibleName?.trim() ||
      !this.email?.trim() ||
      !this.password ||
      this.password !== this.passwordConfirmation ||
      !this.acceptedTerms
    ) {
      this.estadoErro = true;
      this.mensagemErro = 'Preencha todos os campos obrigatórios, confirme a senha e aceite os termos.';
      return;
    }
    if (this.password.length < 8) {
      this.estadoErro = true;
      this.mensagemErro = 'A senha deve ter no mínimo 8 caracteres.';
      return;
    }
    if (!this.billingDocValid()) {
      this.estadoErro = true;
      this.mensagemErro =
        'Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido para faturamento e emissão do boleto.';
      return;
    }
    this.estadoCarregando = true;
    this.comeceService
      .store({
        company_name: this.companyName.trim(),
        responsible_name: this.responsibleName.trim(),
        email: this.email.trim(),
        billing_document: this.billingDocument.trim(),
        phone: this.phone.trim() || undefined,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        plan_key: this.planKey,
        accepted_terms: this.acceptedTerms,
      })
      .subscribe({
        next: (data) => {
          this.auth.setSessionFromLoginData(data);
          this.estadoCarregando = false;
          this.uiStep = 2;
          if (isPlatformBrowser(this.platformId)) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        },
        error: (err) => {
          this.estadoCarregando = false;
          this.estadoErro = true;
          let msg: string | undefined = err.error?.message;
          if (!msg && err.error?.errors) {
            msg = Object.values(err.error.errors).flat().join(' ');
          }
          this.mensagemErro =
            typeof msg === 'string' && msg.trim() ? msg : 'Não foi possível criar a conta. Tente novamente.';
        },
      });
  }

  finalizarConfiguracao(): void {
    this.showSuccessOverlay = true;
    if (isPlatformBrowser(this.platformId)) {
      window.setTimeout(() => void this.router.navigate(['/dashboard']), 1600);
    }
  }
}
