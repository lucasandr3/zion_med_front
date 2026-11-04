import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LandingHowItWorks, LandingService } from '../../core/services/landing.service';

@Component({
  selector: 'app-como-funciona',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="cf-page">
      <header class="cf-top">
        <a routerLink="/" class="cf-brand">Gestgo</a>
        <a routerLink="/autenticacao" class="cf-login">Entrar</a>
      </header>
      @if (erro()) {
        <main class="cf-main"><p class="cf-erro">{{ erro() }}</p></main>
      } @else if (page(); as p) {
        <main class="cf-main">
          <h1>{{ p.h1 }}</h1>
          <p class="cf-sub">{{ p.subtitle }}</p>
          @if (p.steps?.length) {
            <ol class="cf-steps">
              @for (step of p.steps; track step; let i = $index) {
                <li><span>{{ i + 1 }}</span><p>{{ step }}</p></li>
              }
            </ol>
          }
          <div class="cf-ctas">
            <a routerLink="/autenticacao" class="cf-btn" (click)="track('signup')">{{ p.cta_primary || 'Começar teste grátis' }}</a>
            <a routerLink="/para/fisioterapia-dermatofuncional" class="cf-link" (click)="track('segments')">
              {{ p.cta_secondary || 'Ver modelos por segmento' }}
            </a>
          </div>
        </main>
      } @else {
        <main class="cf-main"><p>Carregando…</p></main>
      }
    </div>
  `,
  styles: [
    `
      .cf-page {
        min-height: 100vh;
        background: linear-gradient(180deg, #f7faf8, #eef3f0);
        font-family: 'Segoe UI', system-ui, sans-serif;
        color: #122018;
      }
      .cf-top {
        max-width: 800px;
        margin: 0 auto;
        padding: 1rem 1.25rem;
        display: flex;
        justify-content: space-between;
      }
      .cf-brand {
        font-weight: 800;
        color: #0f6b4a;
        text-decoration: none;
      }
      .cf-login {
        color: #245;
        text-decoration: none;
      }
      .cf-main {
        max-width: 680px;
        margin: 0 auto;
        padding: 1.5rem 1.25rem 3rem;
      }
      h1 {
        font-size: clamp(1.6rem, 4vw, 2.2rem);
        margin: 0 0 0.75rem;
      }
      .cf-sub {
        color: #3a4a42;
        margin: 0 0 1.5rem;
      }
      .cf-steps {
        list-style: none;
        padding: 0;
        margin: 0 0 1.5rem;
        display: grid;
        gap: 0.75rem;
      }
      .cf-steps li {
        display: flex;
        gap: 0.75rem;
        background: #fff;
        border: 1px solid #d7e4dc;
        border-radius: 0.7rem;
        padding: 0.85rem 1rem;
      }
      .cf-steps span {
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 999px;
        background: #14b87a;
        color: #fff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        flex-shrink: 0;
      }
      .cf-steps p {
        margin: 0;
      }
      .cf-ctas {
        display: flex;
        flex-wrap: wrap;
        gap: 0.85rem;
        align-items: center;
      }
      .cf-btn {
        background: #14b87a;
        color: #fff;
        text-decoration: none;
        padding: 0.7rem 1.1rem;
        border-radius: 0.65rem;
        font-weight: 650;
      }
      .cf-link {
        color: #0f6b4a;
      }
      .cf-erro {
        color: #b42318;
      }
    `,
  ],
})
export class ComoFuncionaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private landing = inject(LandingService);
  private title = inject(Title);

  readonly page = signal<LandingHowItWorks | null>(null);
  readonly erro = signal('');

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    if (!slug) {
      this.erro.set('Página inválida.');
      return;
    }
    const path = `/como-funciona/${slug}`;
    this.landing.recordView(path).subscribe({ error: () => undefined });
    this.landing.getHowItWorks(slug).subscribe({
      next: (p) => {
        this.page.set(p);
        this.title.setTitle(p.seo_title || `${p.h1} | Gestgo`);
      },
      error: () => this.erro.set('Página não encontrada.'),
    });
  }

  track(channel: string): void {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    this.landing.recordCta(channel, `/como-funciona/${slug}`).subscribe({ error: () => undefined });
  }
}
