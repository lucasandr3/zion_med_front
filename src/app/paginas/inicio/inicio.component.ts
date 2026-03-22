import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LandingService, PlanoLanding, ServiceStatusPayload } from '../../core/services/landing.service';

const STATUS_LABELS: Record<string, string> = {
  operational: 'Todos os sistemas operacionais',
  degraded: 'Desempenho degradado',
  outage: 'Interrupção nos serviços',
  maintenance: 'Manutenção em andamento',
};

@Component({
  selector: 'app-pagina-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit, AfterViewInit, OnDestroy {
  ano = new Date().getFullYear();
  lpTheme: 'dark' | 'light' = 'dark';
  menuAberto = false;
  landingTrialDias = 14;
  planos: PlanoLanding[] = [];
  carregandoLanding = true;
  serviceStatusKey = 'operational';
  serviceStatusLabel = STATUS_LABELS['operational'];
  serviceStatusMessage: string | null = null;
  statusPageUrl = environment.apiUrl ? `${environment.apiUrl}/status` : '/status';
  demonstracao = { name: '', clinic: '', email: '', phone: '', message: '' };
  demonstracaoEnviando = false;
  demonstracaoFeedback = '';
  demonstracaoSucesso = false;
  heroEmail = '';
  finalEmail = '';
  howStep = 0;
  faqOpenIndex = 0;

  /** Chips duplicados para marquee infinito (keys únicas para track) */
  readonly lpLogoMarquee: { k: string; t: string }[];

  private platformId: object;
  private http = inject(HttpClient);
  private landingService = inject(LandingService);
  private router = inject(Router);
  private host = inject(ElementRef<HTMLElement>);
  private animObserver: IntersectionObserver | null = null;
  private animFallbackId: ReturnType<typeof setTimeout> | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.platformId = platformId;
    const chips = [
      '🩺 Clínica Geral',
      '✨ Estética & Harmonização',
      '🦷 Odontologia',
      '🧠 Psicologia',
      '👶 Pediatria',
      '🐾 Veterinária',
      '💪 Fisioterapia',
      '👁️ Oftalmologia',
      '🧬 Dermatologia',
      '🔬 Laboratório',
    ];
    this.lpLogoMarquee = [
      ...chips.map((t, i) => ({ k: 'a' + i, t })),
      ...chips.map((t, i) => ({ k: 'b' + i, t })),
    ];
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
    this.landingService.getLanding().subscribe({
      next: (data) => {
        this.landingTrialDias = data.trial_days ?? 14;
        this.planos = data.plans ?? [];
        this.carregandoLanding = false;
        this.scheduleObserveAnims();
      },
      error: () => {
        this.landingTrialDias = 14;
        this.planos = [];
        this.carregandoLanding = false;
        this.scheduleObserveAnims();
      },
    });
    this.landingService.getStatus().subscribe({
      next: (payload: ServiceStatusPayload) => {
        const key = (payload?.status ?? 'operational') as keyof typeof STATUS_LABELS;
        this.serviceStatusKey = key in STATUS_LABELS ? key : 'operational';
        this.serviceStatusLabel = STATUS_LABELS[this.serviceStatusKey] ?? STATUS_LABELS['operational'];
        this.serviceStatusMessage = payload?.message?.trim() || null;
      },
      error: () => {
        this.serviceStatusKey = 'operational';
        this.serviceStatusLabel = STATUS_LABELS['operational'];
        this.serviceStatusMessage = null;
      },
    });
  }

  ngAfterViewInit(): void {
    this.scheduleObserveAnims();
  }

  ngOnDestroy(): void {
    this.animObserver?.disconnect();
    this.animObserver = null;
    if (this.animFallbackId != null) {
      clearTimeout(this.animFallbackId);
      this.animFallbackId = null;
    }
  }

  private scheduleObserveAnims(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    requestAnimationFrame(() => this.observeAnims());
  }

  private observeAnims(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const root = this.host.nativeElement;

    if (this.animFallbackId != null) {
      clearTimeout(this.animFallbackId);
      this.animFallbackId = null;
    }

    this.animObserver?.disconnect();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => (e.target as HTMLElement).classList.add('visible'), i * 50);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: '100px 0px 100px 0px' },
    );
    this.animObserver = obs;

    const reveal = (el: Element) => {
      (el as HTMLElement).classList.add('visible');
    };

    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    root.querySelectorAll('.anim').forEach((el: Element) => {
      const r = (el as HTMLElement).getBoundingClientRect();
      const nearViewport = r.bottom > -120 && r.top < vh + 120;
      if (nearViewport) {
        reveal(el);
      } else {
        obs.observe(el);
      }
    });

    this.animFallbackId = setTimeout(() => {
      root.querySelectorAll('.anim:not(.visible)').forEach(reveal);
      this.animFallbackId = null;
    }, 3200);
  }

  toggleLpTheme(): void {
    this.lpTheme = this.lpTheme === 'dark' ? 'light' : 'dark';
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('zm-lp-theme', this.lpTheme);
    }
  }

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  focusCaptureEmail(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = this.host.nativeElement.querySelector('#capture-email') as HTMLInputElement | null;
    el?.focus();
  }

  isPlanoRecomendado(index: number): boolean {
    return this.planos.length >= 2 && index === 1;
  }

  isPlanoGratis(plan: PlanoLanding): boolean {
    return plan.value <= 0 || /grat/i.test(plan.name) || plan.key === 'free';
  }

  ctaPlanoLabel(plan: PlanoLanding, index: number): string {
    if (this.planos.length >= 3 && index === this.planos.length - 1) {
      return 'Falar com vendas';
    }
    return this.isPlanoGratis(plan) ? 'Começar grátis' : 'Começar trial grátis';
  }

  irComece(which: 'hero' | 'final', planKey?: string): void {
    const raw = (which === 'hero' ? this.heroEmail : this.finalEmail)?.trim() ?? '';
    const queryParams: Record<string, string> = {};
    if (raw) queryParams['email'] = raw;
    if (planKey) queryParams['plan'] = planKey;
    void this.router.navigate(['/comece'], { queryParams: Object.keys(queryParams).length ? queryParams : undefined });
  }

  irComeceComPlano(plan: PlanoLanding, index: number): void {
    if (this.planos.length >= 3 && index === this.planos.length - 1) {
      if (isPlatformBrowser(this.platformId)) {
        document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    void this.router.navigate(['/comece'], { queryParams: { plan: plan.key } });
  }

  toggleFaq(index: number): void {
    this.faqOpenIndex = this.faqOpenIndex === index ? -1 : index;
  }

  setHowStep(i: number): void {
    this.howStep = i;
  }

  formatarPhone(value: string): string {
    const digits = (value || '').replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits ? '(' + digits : '';
    if (digits.length <= 7) return '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
    return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
  }

  onPhoneInput(e: Event): void {
    const el = e.target as HTMLInputElement;
    const start = el.selectionStart ?? 0;
    const prevLen = el.value.length;
    const digits = el.value.replace(/\D/g, '').slice(0, 11);
    el.value = this.formatarPhone(digits);
    const newLen = el.value.length;
    el.setSelectionRange(start + (newLen - prevLen), start + (newLen - prevLen));
  }

  enviarDemonstracao(): void {
    this.demonstracaoEnviando = true;
    this.demonstracaoFeedback = '';
    this.demonstracaoSucesso = false;

    const payload = {
      name: this.demonstracao.name,
      clinic: this.demonstracao.clinic,
      email: this.demonstracao.email,
      phone: this.demonstracao.phone,
      message: this.demonstracao.message,
    };

    const url = environment.apiUrl ? `${environment.apiUrl}/demonstracao` : '/demonstracao';
    this.http
      .post<{ success?: boolean; message?: string; errors?: Record<string, string[]> }>(url, payload, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
      .subscribe({
        next: (data) => {
          this.demonstracaoEnviando = false;
          if (data.success) {
            this.demonstracaoFeedback = data.message || 'Mensagem enviada. Entraremos em contato em breve.';
            this.demonstracaoSucesso = true;
            this.demonstracao = { name: '', clinic: '', email: '', phone: '', message: '' };
          } else if (data.errors) {
            this.demonstracaoFeedback = Object.values(data.errors).flat().join('\n');
          } else {
            this.demonstracaoFeedback = data.message || 'Não foi possível enviar. Tente novamente.';
          }
        },
        error: () => {
          this.demonstracaoEnviando = false;
          this.demonstracaoFeedback = 'Erro de conexão. Você pode enviar direto pelo WhatsApp.';
        },
      });
  }
}
