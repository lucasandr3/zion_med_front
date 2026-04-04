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
import { Router, RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import {
  LandingService,
  PlanoLanding,
  ServiceStatusPayload,
  DemonstracaoPayload,
} from '../../core/services/landing.service';
import * as QRCode from 'qrcode';

const STATUS_LABELS: Record<string, string> = {
  operational: 'Todos os sistemas operacionais',
  degraded: 'Desempenho degradado',
  outage: 'Interrupção nos serviços',
  maintenance: 'Manutenção em andamento',
};

/** Hashes antigos (inglês) → fragmentos em português na URL da landing. */
const LANDING_HASH_LEGACY: Record<string, string> = {
  '#features': '#funcionalidades',
  '#preview': '#demonstracao',
  '#pricing': '#planos',
  '#faq': '#duvidas',
  '#demo': '#contato',
};

interface DemoLayout {
  model: number;
  name: string;
  specialty: string;
  /** Ícone Material Symbols Outlined (ligature), exibido em monocromático na landing */
  materialIcon: string;
  clinicName: string;
  description: string;
  accentLight: string;
  accentDark: string;
}

interface DemoForm {
  key: string;
  title: string;
  description: string;
  fields: { label: string; type: string; placeholder?: string; options?: string[] }[];
}

interface Testimonial {
  name: string;
  clinic: string;
  specialty: string;
  text: string;
  initials: string;
}

@Component({
  selector: 'app-pagina-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NgxMaskDirective],
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
  demonstracao: DemonstracaoPayload = { name: '', clinic: '', email: '', phone: '', message: '' };
  demonstracaoEnviando = false;
  demonstracaoFeedback = '';
  demonstracaoSucesso = false;
  heroEmail = '';
  howStep = 0;
  faqOpenIndex = 0;
  heroSlide = 0;
  selectedLayout = 0;
  /** URL sanitizada para iframe da prévia real (/l/demo/:id?embed=1) */
  previewIframeUrl: SafeResourceUrl | null = null;
  previewIframeLoading = true;
  qrCodeDataUrl = '';
  selectedFormIdx = 0;
  demoFormValues: Record<string, string | boolean> = {};
  demoFormSubmitted = false;

  readonly lpLogoMarquee: { k: string; t: string }[];

  readonly demoLayouts: DemoLayout[] = [
    { model: 1, name: 'Genérico', specialty: 'Clínica Geral', materialIcon: 'view_quilt', clinicName: 'Clínica São Paulo', description: 'Versátil para qualquer área', accentLight: '#3b82f6', accentDark: '#60a5fa' },
    { model: 2, name: 'Perfil Solo', specialty: 'Dermatologia', materialIcon: 'person', clinicName: 'Dra. Ana Costa', description: 'Ideal para profissional solo', accentLight: '#5a9e72', accentDark: '#9ec9aa' },
    { model: 3, name: 'Estética', specialty: 'Harmonização', materialIcon: 'diamond', clinicName: 'Studio Belle', description: 'Premium e sofisticado', accentLight: '#e8c97a', accentDark: '#e8c97a' },
    { model: 4, name: 'Odontologia', specialty: 'Odontologia', materialIcon: 'dentistry', clinicName: 'OdontoSmile', description: 'Convênios e especialidades', accentLight: '#0ea5e9', accentDark: '#38bdf8' },
    { model: 5, name: 'Equipe', specialty: 'Multidisciplinar', materialIcon: 'groups', clinicName: 'Instituto Saúde', description: 'Destaque para a equipe', accentLight: '#6366f1', accentDark: '#818cf8' },
    { model: 6, name: 'Veterinária', specialty: 'Pets', materialIcon: 'pets', clinicName: 'VetCare Animal', description: 'Foco em tutores e pets', accentLight: '#0d9488', accentDark: '#2dd4bf' },
    { model: 7, name: 'Pediatria', specialty: 'Crianças', materialIcon: 'child_care', clinicName: 'Crescer Pediatria', description: 'Acolhimento para famílias', accentLight: '#38bdf8', accentDark: '#7dd3fc' },
    { model: 8, name: 'Nutrição', specialty: 'Nutrição clínica', materialIcon: 'nutrition', clinicName: 'Nutri Vida', description: 'Áreas e convênios', accentLight: '#65a30d', accentDark: '#a3e635' },
  ];

  readonly demoForms: DemoForm[] = [
    {
      key: 'anamnese',
      title: 'Anamnese Clínica',
      description: 'Ficha de anamnese geral para primeiro atendimento',
      fields: [
        { label: 'Nome completo', type: 'text', placeholder: 'Ex: Maria Fernanda Silva' },
        { label: 'Data de nascimento', type: 'date' },
        { label: 'Alergias conhecidas', type: 'textarea', placeholder: 'Descreva alergias a medicamentos, alimentos...' },
        { label: 'Medicamentos em uso', type: 'textarea', placeholder: 'Liste medicamentos e dosagens...' },
        { label: 'Possui plano de saúde?', type: 'select', options: ['Sim', 'Não'] },
        { label: 'Motivo do atendimento', type: 'textarea', placeholder: 'Descreva brevemente o motivo...' },
      ],
    },
    {
      key: 'consentimento',
      title: 'Termo de Consentimento',
      description: 'Consentimento informado para procedimentos',
      fields: [
        { label: 'Nome completo', type: 'text', placeholder: 'Nome conforme documento' },
        { label: 'CPF', type: 'cpf', placeholder: '000.000.000-00' },
        { label: 'Procedimento', type: 'select', options: ['Botox', 'Preenchimento', 'Peeling', 'Limpeza de pele', 'Outro'] },
        { label: 'Li e compreendi os riscos', type: 'checkbox' },
        { label: 'Assinatura', type: 'signature' },
      ],
    },
    {
      key: 'satisfacao',
      title: 'Pesquisa de Satisfação',
      description: 'Feedback pós-atendimento',
      fields: [
        { label: 'Como avalia o atendimento?', type: 'select', options: ['Excelente', 'Bom', 'Regular', 'Ruim'] },
        { label: 'O tempo de espera foi adequado?', type: 'select', options: ['Sim', 'Não'] },
        { label: 'Recomendaria para um amigo?', type: 'select', options: ['Com certeza', 'Provavelmente', 'Talvez', 'Não'] },
        { label: 'Sugestões de melhoria', type: 'textarea', placeholder: 'O que podemos melhorar?' },
      ],
    },
  ];

  readonly testimonials: Testimonial[] = [
    { name: 'Dra. Camila Rêgo', clinic: 'Estética Avançada', specialty: 'Harmonização', text: 'Eliminamos 100% do papel na recepção. Quem chega já traz a ficha pronta e a assinatura digital feita.', initials: 'CR' },
    { name: 'Dr. Rafael Mendes', clinic: 'OdontoCenter', specialty: 'Odontologia', text: 'A equipe parou de perder tempo digitando fichas. Agora é tudo automático — do link no Instagram ao PDF no prontuário.', initials: 'RM' },
    { name: 'Dra. Juliana Alves', clinic: 'Clínica Integrar', specialty: 'Psicologia', text: 'O contrato terapêutico digital é perfeito. A pessoa assina antes da primeira sessão, sem constrangimento.', initials: 'JA' },
  ];

  readonly howSteps = [
    { title: 'Crie seus formulários', desc: 'Escolha entre 86 templates ou crie do zero. Personaliza em minutos.', icon: 'edit_document' },
    { title: 'Publique no seu perfil', desc: 'Cole o link na bio do Instagram ou WhatsApp. No ar em segundos.', icon: 'link' },
    { title: 'Cliente preenche antes', desc: 'Abre pelo celular, preenche e assina digitalmente.', icon: 'smartphone' },
    { title: 'PDF gerado na hora', desc: 'A ficha chega formatada em PDF, pronta para arquivar.', icon: 'picture_as_pdf' },
  ];

  private platformId: object;
  private sanitizer = inject(DomSanitizer);
  private landingService = inject(LandingService);
  private router = inject(Router);
  private host = inject(ElementRef<HTMLElement>);
  private animObserver: IntersectionObserver | null = null;
  private animFallbackId: ReturnType<typeof setTimeout> | null = null;
  private heroInterval: ReturnType<typeof setInterval> | null = null;
  /** Se o evento load do iframe não disparar (ex.: app Angular aninhado), libera a prévia. */
  private previewIframeLoadFallbackId: ReturnType<typeof setTimeout> | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.platformId = platformId;
    const chips = [
      'Clínica Geral',
      'Estética',
      'Odontologia',
      'Psicologia',
      'Pediatria',
      'Veterinária',
      'Fisioterapia',
      'Oftalmologia',
      'Dermatologia',
      'Laboratório',
    ];
    this.lpLogoMarquee = [
      ...chips.map((t, i) => ({ k: 'a' + i, t })),
      ...chips.map((t, i) => ({ k: 'b' + i, t })),
    ];
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

    this.selectLayout(0);
    this.initDemoFormValues();
  }

  ngAfterViewInit(): void {
    this.scheduleObserveAnims();
    if (isPlatformBrowser(this.platformId)) {
      this.migrarHashLegadoLanding();
      this.heroInterval = setInterval(() => {
        this.heroSlide = (this.heroSlide + 1) % 3;
      }, 4000);
    }
  }

  ngOnDestroy(): void {
    this.animObserver?.disconnect();
    this.animObserver = null;
    if (this.animFallbackId != null) {
      clearTimeout(this.animFallbackId);
      this.animFallbackId = null;
    }
    if (this.heroInterval != null) {
      clearInterval(this.heroInterval);
      this.heroInterval = null;
    }
    if (this.previewIframeLoadFallbackId != null) {
      clearTimeout(this.previewIframeLoadFallbackId);
      this.previewIframeLoadFallbackId = null;
    }
  }

  /** Atualiza URL e rolagem quando o usuário abre links antigos (#features, #pricing, etc.). */
  private migrarHashLegadoLanding(): void {
    const hash = window.location.hash;
    const next = LANDING_HASH_LEGACY[hash];
    if (!next) return;
    const { pathname, search } = window.location;
    window.history.replaceState(null, '', `${pathname}${search}${next}`);
    const id = next.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
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
      localStorage.setItem('gestgo-lp-theme', this.lpTheme);
      localStorage.removeItem('zm-lp-theme');
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

  irComece(planKey?: string): void {
    const raw = this.heroEmail?.trim() ?? '';
    const queryParams: Record<string, string> = {};
    if (raw) queryParams['email'] = raw;
    if (planKey) queryParams['plan'] = planKey;
    void this.router.navigate(['/comece'], { queryParams: Object.keys(queryParams).length ? queryParams : undefined });
  }

  irComeceComPlano(plan: PlanoLanding, index: number): void {
    if (this.planos.length >= 3 && index === this.planos.length - 1) {
      if (isPlatformBrowser(this.platformId)) {
        document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
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

  selectLayout(idx: number): void {
    this.selectedLayout = idx;
    this.previewIframeLoading = true;
    this.generateQrCode();
    this.syncPreviewIframe();
  }

  onPreviewIframeLoad(): void {
    if (this.previewIframeLoadFallbackId != null) {
      clearTimeout(this.previewIframeLoadFallbackId);
      this.previewIframeLoadFallbackId = null;
    }
    this.previewIframeLoading = false;
  }

  private syncPreviewIframe(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.previewIframeLoadFallbackId != null) {
      clearTimeout(this.previewIframeLoadFallbackId);
      this.previewIframeLoadFallbackId = null;
    }
    const layout = this.demoLayouts[this.selectedLayout];
    const path = this.router.serializeUrl(
      this.router.createUrlTree(['/l', 'demo', String(layout.model)], { queryParams: { embed: '1' } }),
    );
    const url = `${window.location.origin}${path}`;
    this.previewIframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.previewIframeLoadFallbackId = setTimeout(() => {
      this.previewIframeLoadFallbackId = null;
      this.previewIframeLoading = false;
    }, 3500);
  }

  selectForm(idx: number): void {
    this.selectedFormIdx = idx;
    this.demoFormSubmitted = false;
    this.initDemoFormValues();
  }

  submitDemoForm(): void {
    this.demoFormSubmitted = true;
    this.scrollLandingElementIntoView('lp-demo-form-card');
    setTimeout(() => {
      this.demoFormSubmitted = false;
      this.initDemoFormValues();
    }, 3000);
  }

  /** Evita “sumir” o feedback quando a altura da página muda após enviar (demo ou contato). */
  private scrollLandingElementIntoView(elementId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    setTimeout(() => {
      document.getElementById(elementId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }, 0);
  }

  /** Valores iniciais por tipo (checkbox boolean, data string vazia para máscara dd/mm/aaaa). */
  private initDemoFormValues(): void {
    const form = this.demoForms[this.selectedFormIdx];
    if (!form) {
      this.demoFormValues = {};
      return;
    }
    const next: Record<string, string | boolean> = {};
    for (const f of form.fields) {
      if (f.type === 'checkbox') {
        next[f.label] = false;
      } else if (f.type === 'date') {
        next[f.label] = '';
      } else {
        next[f.label] = '';
      }
    }
    this.demoFormValues = next;
  }

  /** Id estável do canvas de assinatura (demo landing), por índice do campo. */
  signatureDemoCanvasId(idx: number): string {
    return `lpdemo_sig_${this.selectedFormIdx}_${idx}`;
  }

  startDemoSignature(e: MouseEvent | TouchEvent, idx: number): void {
    e.preventDefault();
    const canvas = this.getDemoSignatureCanvas(idx);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = this.lpTheme === 'dark' ? '#d4c9bb' : '#1e1b18';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    const pos = this.getDemoSignaturePoint(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    (canvas as unknown as { _signing: boolean })._signing = true;
  }

  moveDemoSignature(e: MouseEvent | TouchEvent, idx: number): void {
    e.preventDefault();
    const canvas = this.getDemoSignatureCanvas(idx);
    if (!canvas || !(canvas as unknown as { _signing?: boolean })._signing) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pos = this.getDemoSignaturePoint(e, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  endDemoSignature(idx: number): void {
    const canvas = this.getDemoSignatureCanvas(idx);
    const field = this.demoForms[this.selectedFormIdx]?.fields[idx];
    if (canvas) {
      (canvas as unknown as { _signing: boolean })._signing = false;
      if (field) {
        this.demoFormValues[field.label] = canvas.toDataURL('image/png');
      }
    }
  }

  clearDemoSignature(idx: number): void {
    const canvas = this.getDemoSignatureCanvas(idx);
    const field = this.demoForms[this.selectedFormIdx]?.fields[idx];
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    if (field) {
      this.demoFormValues[field.label] = '';
    }
  }

  private getDemoSignatureCanvas(idx: number): HTMLCanvasElement | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return document.getElementById(this.signatureDemoCanvasId(idx)) as HTMLCanvasElement | null;
  }

  private getDemoSignaturePoint(e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e instanceof TouchEvent && e.touches.length) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    const me = e as MouseEvent;
    return { x: (me.clientX - rect.left) * scaleX, y: (me.clientY - rect.top) * scaleY };
  }

  private generateQrCode(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const layout = this.demoLayouts[this.selectedLayout];
    const path = this.router.serializeUrl(this.router.createUrlTree(['/l', 'demo', String(layout.model)]));
    const url = `${window.location.origin}${path}`;
    QRCode.toDataURL(url, {
      width: 160,
      margin: 1,
      color: {
        dark: this.lpTheme === 'dark' ? '#ffffff' : '#09090b',
        light: '#00000000',
      },
    }).then((dataUrl: string) => {
      this.qrCodeDataUrl = dataUrl;
    }).catch(() => {
      this.qrCodeDataUrl = '';
    });
  }

  enviarDemonstracao(): void {
    this.demonstracaoEnviando = true;
    this.demonstracaoFeedback = '';
    this.demonstracaoSucesso = false;

    this.landingService.enviarDemonstracao(this.demonstracao).subscribe({
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
        this.scrollLandingElementIntoView('lp-demo-contato-card');
      },
      error: () => {
        this.demonstracaoEnviando = false;
        this.demonstracaoFeedback = 'Erro de conexão. Você pode enviar direto pelo WhatsApp.';
        this.scrollLandingElementIntoView('lp-demo-contato-card');
      },
    });
  }

  get selectedDemoLayout(): DemoLayout {
    return this.demoLayouts[this.selectedLayout];
  }

  get selectedDemoForm(): DemoForm {
    return this.demoForms[this.selectedFormIdx];
  }
}
