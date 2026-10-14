import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LandingSegment, LandingService } from '../../core/services/landing.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-para-segmento',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="para-page">
      <header class="para-top">
        <a routerLink="/" class="para-brand">Gestgo</a>
        <a routerLink="/autenticacao" class="para-login">Entrar</a>
      </header>

      @if (erro()) {
        <main class="para-main">
          <p class="para-erro">{{ erro() }}</p>
          <a routerLink="/" class="para-link">Voltar</a>
        </main>
      } @else if (segment(); as s) {
        <main class="para-main">
          <p class="para-eyebrow">Para o seu segmento</p>
          <h1>{{ s.h1 }}</h1>
          <p class="para-sub">{{ s.subtitle }}</p>
          <div class="para-ctas">
            <a routerLink="/autenticacao" class="para-btn para-btn--primary" (click)="track('signup')">
              {{ s.cta_primary || 'Testar grátis' }}
            </a>
            @if (s.demo_model) {
              <a [routerLink]="['/l/demo', s.demo_model]" class="para-btn para-btn--ghost" (click)="track('demo')">
                {{ s.cta_secondary || 'Ver demonstração' }}
              </a>
            }
          </div>

          @if (s.pain) {
            <section class="para-section">
              <h2>O problema</h2>
              <p>{{ s.pain }}</p>
            </section>
          }

          @if (s.outcomes?.length) {
            <section class="para-section">
              <h2>O que você ganha</h2>
              <ul>
                @for (o of s.outcomes; track o) {
                  <li>{{ o }}</li>
                }
              </ul>
            </section>
          }

          <section class="para-section">
            <h2>Para quem não é</h2>
            <p>Não substitui ERP, prontuário completo nem agenda com comissões e faturamento. Complementa a documentação assinada.</p>
          </section>

          @if (s.faq?.length) {
            <section class="para-section">
              <h2>Perguntas frequentes</h2>
              @for (f of s.faq; track f.q) {
                <details class="para-faq">
                  <summary>{{ f.q }}</summary>
                  <p>{{ f.a }}</p>
                </details>
              }
            </section>
          }
        </main>
      } @else {
        <main class="para-main"><p class="para-muted">Carregando…</p></main>
      }
    </div>
  `,
  styles: [
    `
      .para-page {
        min-height: 100vh;
        background:
          radial-gradient(1200px 500px at 10% -10%, color-mix(in srgb, #14b87a 18%, transparent), transparent),
          linear-gradient(180deg, #f7faf8 0%, #eef3f0 100%);
        color: #122018;
        font-family: 'Segoe UI', system-ui, sans-serif;
      }
      .para-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.25rem;
        max-width: 880px;
        margin: 0 auto;
      }
      .para-brand {
        font-weight: 800;
        font-size: 1.25rem;
        color: #0f6b4a;
        text-decoration: none;
      }
      .para-login {
        color: #245;
        text-decoration: none;
        font-size: 0.9rem;
      }
      .para-main {
        max-width: 720px;
        margin: 0 auto;
        padding: 1.5rem 1.25rem 3rem;
      }
      .para-eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.72rem;
        color: #3d6b58;
        margin: 0 0 0.5rem;
      }
      h1 {
        font-size: clamp(1.7rem, 4vw, 2.4rem);
        line-height: 1.15;
        margin: 0 0 0.75rem;
      }
      .para-sub {
        font-size: 1.05rem;
        color: #3a4a42;
        margin: 0 0 1.25rem;
      }
      .para-ctas {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-bottom: 2rem;
      }
      .para-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.65rem;
        padding: 0.7rem 1.1rem;
        text-decoration: none;
        font-weight: 650;
      }
      .para-btn--primary {
        background: #14b87a;
        color: #fff;
      }
      .para-btn--ghost {
        background: #fff;
        color: #14553a;
        border: 1px solid #c9ddd2;
      }
      .para-section {
        margin-bottom: 1.75rem;
      }
      .para-section h2 {
        font-size: 1.1rem;
        margin: 0 0 0.5rem;
      }
      .para-section ul {
        margin: 0;
        padding-left: 1.1rem;
      }
      .para-section li {
        margin-bottom: 0.35rem;
      }
      .para-faq {
        background: #fff;
        border: 1px solid #d7e4dc;
        border-radius: 0.6rem;
        padding: 0.75rem 0.9rem;
        margin-bottom: 0.5rem;
      }
      .para-faq summary {
        cursor: pointer;
        font-weight: 600;
      }
      .para-faq p {
        margin: 0.5rem 0 0;
        color: #3a4a42;
      }
      .para-erro {
        color: #b42318;
      }
      .para-muted {
        color: #667;
      }
      .para-link {
        color: #0f6b4a;
      }
    `,
  ],
})
export class ParaSegmentoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private landing = inject(LandingService);
  private title = inject(Title);
  private doc = inject(DOCUMENT);

  readonly segment = signal<LandingSegment | null>(null);
  readonly erro = signal('');

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    if (!slug) {
      this.erro.set('Segmento inválido.');
      return;
    }
    const path = `/para/${slug}`;
    this.landing.recordView(path).subscribe({ error: () => undefined });
    this.landing.getSegment(slug).subscribe({
      next: (s) => {
        this.segment.set(s);
        this.title.setTitle(s.seo_title || `${s.h1} | Gestgo`);
        this.doc.documentElement.lang = 'pt-BR';
      },
      error: () => this.erro.set('Segmento não encontrado.'),
    });
  }

  track(channel: string): void {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    this.landing.recordCta(channel, `/para/${slug}`).subscribe({ error: () => undefined });
  }
}
