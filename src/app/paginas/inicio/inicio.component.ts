import { Component, OnInit, Inject, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LandingService, PlanoLanding, ServiceStatusPayload } from '../../core/services/landing.service';

/** Rótulos e classes do status do sistema (igual ao backend landing.blade.php) */
const STATUS_LABELS: Record<string, string> = {
  operational: 'Todos os sistemas operacionais',
  degraded: 'Desempenho degradado',
  outage: 'Interrupção nos serviços',
  maintenance: 'Manutenção em andamento',
};
const STATUS_DOTS: Record<string, string> = {
  operational: 'bg-emeraldish-500',
  degraded: 'bg-yellow-400',
  outage: 'bg-red-400',
  maintenance: 'bg-indigo-400',
};
const STATUS_BARS: Record<string, string> = {
  operational: 'bg-accent-600',
  degraded: 'bg-yellow-600',
  outage: 'bg-red-600',
  maintenance: 'bg-indigo-600',
};

@Component({
  selector: 'app-pagina-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {
  ano = new Date().getFullYear();
  temaEscuro = false;
  labelTema = 'Modo escuro';
  landingTrialDias = 14;
  planos: PlanoLanding[] = [];
  carregandoLanding = true;
  /** Status do sistema (banner topo + footer) — default operacional */
  serviceStatusKey = 'operational';
  serviceStatusLabel = STATUS_LABELS['operational'];
  serviceStatusMessage: string | null = null;
  statusDotClass = STATUS_DOTS['operational'];
  statusBarClass = STATUS_BARS['operational'];
  /** URL da página de status no backend */
  statusPageUrl = environment.apiUrl ? `${environment.apiUrl}/status` : '/status';
  demonstracao = { name: '', clinic: '', email: '', phone: '', message: '' };
  demonstracaoEnviando = false;
  demonstracaoFeedback = '';
  demonstracaoSucesso = false;
  private platformId: object;
  private http = inject(HttpClient);
  private landingService = inject(LandingService);

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.platformId = platformId;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.temaEscuro = localStorage.getItem('zionmed_dark_mode') === '1';
      this.atualizarLabelTema();
      document.body.classList.toggle('dark', this.temaEscuro);
    }
    this.landingService.getLanding().subscribe({
      next: (data) => {
        this.landingTrialDias = data.trial_days ?? 14;
        this.planos = data.plans ?? [];
        this.carregandoLanding = false;
      },
      error: () => {
        this.landingTrialDias = 14;
        this.planos = [];
        this.carregandoLanding = false;
      },
    });
    this.landingService.getStatus().subscribe({
      next: (payload: ServiceStatusPayload) => {
        const key = (payload?.status ?? 'operational') as keyof typeof STATUS_LABELS;
        this.serviceStatusKey = key;
        this.serviceStatusLabel = STATUS_LABELS[key] ?? STATUS_LABELS['operational'];
        this.serviceStatusMessage = payload?.message?.trim() || null;
        this.statusDotClass = STATUS_DOTS[key] ?? STATUS_DOTS['operational'];
        this.statusBarClass = STATUS_BARS[key] ?? STATUS_BARS['operational'];
      },
      error: () => {
        this.serviceStatusKey = 'operational';
        this.serviceStatusLabel = STATUS_LABELS['operational'];
        this.serviceStatusMessage = null;
        this.statusDotClass = STATUS_DOTS['operational'];
        this.statusBarClass = STATUS_BARS['operational'];
      },
    });
  }

  alternarTema(): void {
    this.temaEscuro = !this.temaEscuro;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('zionmed_dark_mode', this.temaEscuro ? '1' : '0');
      document.body.classList.toggle('dark', this.temaEscuro);
    }
    this.atualizarLabelTema();
  }

  private atualizarLabelTema(): void {
    this.labelTema = this.temaEscuro ? 'Modo claro' : 'Modo escuro';
  }

  isPlanoRecomendado(index: number): boolean {
    return this.planos.length >= 2 && index === 1;
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
    this.http.post<{ success?: boolean; message?: string; errors?: Record<string, string[]> }>(url, payload, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
    }).subscribe({
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
