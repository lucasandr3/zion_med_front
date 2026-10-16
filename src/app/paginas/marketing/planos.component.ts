import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LandingPublicData, LandingService } from '../../core/services/landing.service';

type CycleUi = 'MONTHLY' | 'YEARLY';

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  template: `
    <div class="planos-page">
      <header class="planos-top">
        <a routerLink="/" class="planos-brand">Gestgo</a>
        <nav class="planos-nav">
          <a routerLink="/para/fisioterapia-dermatofuncional">Segmentos</a>
          <a routerLink="/autenticacao">Entrar</a>
        </nav>
      </header>

      <main class="planos-main">
        <p class="planos-eyebrow">Preços claros</p>
        <h1>Escolha o plano e comece o teste</h1>
        <p class="planos-sub">
          @if (data()?.trial_days; as days) {
            {{ days }} dias de teste, sem cartão. Cancele quando quiser.
          } @else {
            Teste grátis antes de assinar. Sem compromisso oculto.
          }
        </p>

        <div class="planos-cycle" role="group" aria-label="Periodicidade">
          <button
            type="button"
            class="planos-cycle__btn"
            [class.planos-cycle__btn--active]="ciclo() === 'MONTHLY'"
            (click)="ciclo.set('MONTHLY')"
          >
            Mensal
          </button>
          <button
            type="button"
            class="planos-cycle__btn"
            [class.planos-cycle__btn--active]="ciclo() === 'YEARLY'"
            (click)="ciclo.set('YEARLY')"
          >
            Anual
          </button>
        </div>
        <p class="planos-cycle-hint">
          @if (ciclo() === 'YEARLY') {
            Anual à vista: 12 meses pelo preço de 10.
          } @else {
            Cobrança mensal recorrente.
          }
        </p>

        @if (erro()) {
          <p class="planos-erro">{{ erro() }}</p>
        } @else if (!data()) {
          <p class="planos-muted">Carregando planos…</p>
        } @else {
          <div class="planos-grid">
            @for (p of data()!.plans || []; track p.key) {
              <article class="planos-card" [class.planos-card--featured]="p.key === 'profissional'">
                <h2>{{ p.name }}</h2>
                <p class="planos-price">
                  {{ preco(p) | currency: 'BRL' : 'symbol-narrow' : '1.0-0' : 'pt-BR' }}
                  <span>{{ ciclo() === 'YEARLY' ? '/ano' : '/mês' }}</span>
                </p>
                <ul>
                  <li>Fichas e consentimentos digitais</li>
                  <li>Assinatura no celular</li>
                  <li>Histórico por pessoa</li>
                  @if (p.key !== 'essencial') {
                    <li>Mais volume e equipe</li>
                  }
                </ul>
                <a routerLink="/autenticacao" class="planos-cta" (click)="track(p.key)">Começar teste</a>
              </article>
            }
          </div>
          <p class="planos-note">
            O Gestgo não substitui ERP nem prontuário completo. Foque em documentação assinada e organização de protocolos.
          </p>
        }
      </main>
    </div>
  `,
  styles: [
    `
      .planos-page {
        min-height: 100vh;
        background: linear-gradient(180deg, #f7faf8, #eef3f0);
        color: #122018;
        font-family: 'Segoe UI', system-ui, sans-serif;
      }
      .planos-top {
        max-width: 980px;
        margin: 0 auto;
        padding: 1rem 1.25rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .planos-brand {
        font-weight: 800;
        color: #0f6b4a;
        text-decoration: none;
        font-size: 1.2rem;
      }
      .planos-nav {
        display: flex;
        gap: 1rem;
      }
      .planos-nav a {
        color: #245;
        text-decoration: none;
        font-size: 0.9rem;
      }
      .planos-main {
        max-width: 980px;
        margin: 0 auto;
        padding: 1.25rem 1.25rem 3rem;
      }
      .planos-eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.72rem;
        color: #3d6b58;
        margin: 0 0 0.4rem;
      }
      h1 {
        margin: 0 0 0.5rem;
        font-size: clamp(1.7rem, 4vw, 2.3rem);
      }
      .planos-sub {
        color: #3a4a42;
        margin: 0 0 1rem;
      }
      .planos-cycle {
        display: inline-flex;
        border: 1px solid #c9ddd3;
        border-radius: 0.65rem;
        overflow: hidden;
        margin-bottom: 0.35rem;
      }
      .planos-cycle__btn {
        border: 0;
        background: transparent;
        padding: 0.45rem 0.9rem;
        font-size: 0.9rem;
        cursor: pointer;
        color: #3a4a42;
      }
      .planos-cycle__btn--active {
        background: #14b87a;
        color: #fff;
        font-weight: 650;
      }
      .planos-cycle-hint {
        margin: 0 0 1.25rem;
        font-size: 0.85rem;
        color: #667;
      }
      .planos-grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }
      .planos-card {
        background: #fff;
        border: 1px solid #d7e4dc;
        border-radius: 0.85rem;
        padding: 1.1rem 1.15rem 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
      }
      .planos-card--featured {
        border-color: #14b87a;
        box-shadow: 0 0 0 1px #14b87a;
      }
      .planos-card h2 {
        margin: 0;
        font-size: 1.05rem;
      }
      .planos-price {
        margin: 0;
        font-size: 1.75rem;
        font-weight: 800;
        color: #0f6b4a;
      }
      .planos-price span {
        font-size: 0.85rem;
        font-weight: 500;
        color: #667;
      }
      .planos-card ul {
        margin: 0;
        padding-left: 1.1rem;
        color: #3a4a42;
        font-size: 0.9rem;
        flex: 1;
      }
      .planos-cta {
        display: inline-flex;
        justify-content: center;
        background: #14b87a;
        color: #fff;
        text-decoration: none;
        border-radius: 0.6rem;
        padding: 0.65rem 0.9rem;
        font-weight: 650;
      }
      .planos-note {
        margin-top: 1.5rem;
        font-size: 0.85rem;
        color: #667;
      }
      .planos-erro {
        color: #b42318;
      }
      .planos-muted {
        color: #667;
      }
    `,
  ],
})
export class PlanosComponent implements OnInit {
  private landing = inject(LandingService);
  private title = inject(Title);

  readonly data = signal<LandingPublicData | null>(null);
  readonly erro = signal('');
  readonly ciclo = signal<CycleUi>('YEARLY');

  ngOnInit(): void {
    this.title.setTitle('Planos e preços | Gestgo');
    this.landing.recordView('/planos').subscribe({ error: () => undefined });
    this.landing.getLanding().subscribe({
      next: (d) => this.data.set(d),
      error: () => this.erro.set('Não foi possível carregar os planos.'),
    });
  }

  preco(p: { value: number; value_yearly?: number }): number {
    if (this.ciclo() === 'YEARLY') {
      const yearly = Number(p.value_yearly);
      if (Number.isFinite(yearly) && yearly > 0) {
        return yearly;
      }
      return Math.round(Number(p.value || 0) * 10);
    }
    return Number(p.value || 0);
  }

  track(planKey: string): void {
    this.landing.recordCta(`plan_${planKey}_${this.ciclo().toLowerCase()}`, '/planos').subscribe({
      error: () => undefined,
    });
  }
}
