import { Component, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LinkBioPublicLayoutsComponent } from '../link-bio-public/link-bio-public-layouts.component';
import type { LinkBioClinic, LinkBioLink, LinkBioPublicDocItem } from '../../core/services/link-bio.service';
import type { LinkBioLayoutModel } from '../../core/services/link-bio.service';
import { PublicPageBodyService } from '../../core/services/public-page-body.service';

const MOCK_CLINICS: Record<number, Partial<LinkBioClinic> & { id: number; name: string; slug: string }> = {
  1: {
    id: 9001,
    name: 'Clínica São Paulo',
    slug: 'demo-1',
    short_description: 'Clínica geral multidisciplinar',
    logo_url: null,
    cover_image_url: null,
    phone: '11999999999',
    contact_email: 'contato@clinicasp.com.br',
    address: 'Rua Central, 45 · São Paulo, SP',
    maps_url: '#',
    is_open_now: true,
    link_bio_model: 1,
    link_bio_extra: {},
    specialties_list: ['Clínica Geral', 'Cardiologia', 'Endocrinologia'],
    business_hours_grid: { '1': { label: 'Seg', text: '08:00–18:00' }, '2': { label: 'Ter', text: '08:00–18:00' }, '3': { label: 'Qua', text: '08:00–18:00' }, '4': { label: 'Qui', text: '08:00–18:00' }, '5': { label: 'Sex', text: '08:00–17:00' } },
  },
  2: {
    id: 9002,
    name: 'Dra. Ana Costa',
    slug: 'demo-2',
    short_description: 'Dermatologia clínica e estética',
    logo_url: null,
    cover_image_url: null,
    phone: '11999999999',
    contact_email: 'ana@dracosta.com.br',
    address: 'Av. Paulista, 1200 · São Paulo, SP',
    maps_url: '#',
    is_open_now: true,
    link_bio_model: 2,
    link_bio_extra: { hero_tagline: 'Dermatologista · CRM 45.678', modalities: [{ title: 'Teleconsulta', subtitle: 'Via Google Meet', available: true }, { title: 'Presencial', subtitle: 'Av. Paulista', available: true }] },
    specialties_list: ['Dermatologia'],
    business_hours_grid: { '1': { label: 'Seg', text: '09:00–17:00' }, '2': { label: 'Ter', text: '09:00–17:00' }, '3': { label: 'Qua', text: '09:00–17:00' }, '4': { label: 'Qui', text: '09:00–17:00' }, '5': { label: 'Sex', text: '09:00–16:00' } },
  },
  3: {
    id: 9003,
    name: 'Studio Belle Estética',
    slug: 'demo-3',
    short_description: 'Estética avançada e harmonização facial',
    logo_url: null,
    cover_image_url: null,
    phone: '11999999999',
    contact_email: 'contato@studiobelle.com.br',
    address: 'Rua Oscar Freire, 890 · São Paulo, SP',
    maps_url: '#',
    is_open_now: true,
    link_bio_model: 3,
    link_bio_extra: { brand_subtitle: 'Estética avançada', specialties_list: ['Botox', 'Preenchimento', 'Bioestimuladores', 'Peeling', 'Limpeza de Pele', 'Microagulhamento'] },
    specialties_list: [],
    business_hours_grid: { '1': { label: 'Seg', text: '10:00–19:00' }, '2': { label: 'Ter', text: '10:00–19:00' }, '3': { label: 'Qua', text: '10:00–19:00' }, '4': { label: 'Qui', text: '10:00–19:00' }, '5': { label: 'Sex', text: '10:00–18:00' }, '6': { label: 'Sáb', text: '09:00–14:00' } },
  },
  4: {
    id: 9004,
    name: 'OdontoSmile',
    slug: 'demo-4',
    short_description: 'Odontologia completa para toda a família',
    logo_url: null,
    cover_image_url: null,
    phone: '11999999999',
    contact_email: 'contato@odontosmile.com.br',
    address: 'Rua Augusta, 320 · São Paulo, SP',
    maps_url: '#',
    is_open_now: false,
    link_bio_model: 4,
    link_bio_extra: { council_type: 'CRO', council_number: '12345', convenios: ['Amil', 'Bradesco Saúde', 'SulAmérica', 'Unimed'] },
    specialties_list: ['Ortodontia', 'Implantes', 'Endodontia'],
    business_hours_grid: { '1': { label: 'Seg', text: '08:00–18:00' }, '2': { label: 'Ter', text: '08:00–18:00' }, '3': { label: 'Qua', text: '08:00–18:00' }, '4': { label: 'Qui', text: '08:00–18:00' }, '5': { label: 'Sex', text: '08:00–17:00' } },
    founded_year: 2015,
  },
  5: {
    id: 9005,
    name: 'Instituto Saúde Integrar',
    slug: 'demo-5',
    short_description: 'Clínica multidisciplinar com equipe completa',
    logo_url: null,
    cover_image_url: null,
    phone: '11999999999',
    contact_email: 'contato@integrar.com.br',
    address: 'Rua Funchal, 573 · São Paulo, SP',
    maps_url: '#',
    is_open_now: true,
    link_bio_model: 5,
    link_bio_extra: { hero_tagline: '6 especialistas · Desde 2018', team: [{ name: 'Dr. Rafael Mendes', credential: 'CRM 34.567', notes: 'Cardiologia', whatsapp: '' }, { name: 'Dra. Juliana Alves', credential: 'CRP 06/12345', notes: 'Psicologia', whatsapp: '' }, { name: 'Dr. Carlos Lima', credential: 'CRO 45.678', notes: 'Odontologia', whatsapp: '' }] },
    specialties_list: ['Cardiologia', 'Psicologia', 'Odontologia', 'Nutrição'],
    business_hours_grid: { '1': { label: 'Seg', text: '07:00–20:00' }, '2': { label: 'Ter', text: '07:00–20:00' }, '3': { label: 'Qua', text: '07:00–20:00' }, '4': { label: 'Qui', text: '07:00–20:00' }, '5': { label: 'Sex', text: '07:00–19:00' }, '6': { label: 'Sáb', text: '08:00–13:00' } },
    founded_year: 2018,
  },
};

const MOCK_BIO_LINKS: LinkBioLink[] = [];

const MOCK_DOCS: LinkBioPublicDocItem[] = [
  { type: 'form', item: { id: 1, name: 'Ficha de Anamnese', public_url: '#' } },
  { type: 'form', item: { id: 2, name: 'Termo de Consentimento', public_url: '#' } },
];

@Component({
  selector: 'app-demo-link-bio',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LinkBioPublicLayoutsComponent,
  ],
  template: `
    <div class="demo-banner">
      <div class="demo-banner-inner">
        <span class="demo-badge">DEMONSTRAÇÃO</span>
        <span>Esta é uma página de exemplo do Gestgo.</span>
        <a routerLink="/" class="demo-back">← Voltar ao site</a>
      </div>
    </div>

    @if (clinic) {
      @switch (modelNum) {
        @case (1) {
          <div class="lb-public-root" [class.dark]="dark">
            <div class="lb-topbar">
              <button type="button" (click)="toggleDark()" class="lb-tb-btn" aria-label="Alternar tema">🌓</button>
            </div>
            <div class="lb-cover-wrap">
              <div class="lb-cover-img lb-cover-default"></div>
            </div>
            <div class="lb-avatar-wrap">
              <div class="lb-avatar">{{ clinic.name!.charAt(0) }}</div>
            </div>
            <div class="lb-content">
              <h1 class="lb-name">{{ clinic.name }}</h1>
              <p class="lb-desc" *ngIf="clinic.short_description">{{ clinic.short_description }}</p>
              <div class="lb-links">
                @for (doc of allDocs; track $index) {
                  <div class="lb-link-item">
                    <span class="lb-link-icon">📋</span>
                    <div class="lb-link-body">
                      <span class="lb-link-title">{{ $any(doc.item).name }}</span>
                      <span class="lb-link-sub">Preenchimento online</span>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        }
        @case (2) {
          <app-link-bio-public-layouts
            [model]="2" [clinic]="clinic" [bioLinks]="bioLinks" [allDocs]="allDocs"
            [publicSlug]="clinic.slug!" [linkBioPreview]="false"
            [dark]="dark" (toggleDark)="toggleDark()" (share)="onShare()"
          />
        }
        @case (3) {
          <app-link-bio-public-layouts
            [model]="3" [clinic]="clinic" [bioLinks]="bioLinks" [allDocs]="allDocs"
            [publicSlug]="clinic.slug!" [linkBioPreview]="false"
            [dark]="dark" (toggleDark)="toggleDark()" (share)="onShare()"
          />
        }
        @case (4) {
          <app-link-bio-public-layouts
            [model]="4" [clinic]="clinic" [bioLinks]="bioLinks" [allDocs]="allDocs"
            [publicSlug]="clinic.slug!" [linkBioPreview]="false"
            [dark]="dark" (toggleDark)="toggleDark()" (share)="onShare()"
          />
        }
        @case (5) {
          <app-link-bio-public-layouts
            [model]="5" [clinic]="clinic" [bioLinks]="bioLinks" [allDocs]="allDocs"
            [publicSlug]="clinic.slug!" [linkBioPreview]="false"
            [dark]="dark" (toggleDark)="toggleDark()" (share)="onShare()"
          />
        }
        @default {
          <div style="text-align: center; padding: 100px 24px; color: #888">
            Layout não encontrado. <a routerLink="/" style="color: #3b82f6">Voltar ao site</a>
          </div>
        }
      }
    } @else {
      <div style="text-align: center; padding: 100px 24px; color: #888">
        Carregando demonstração...
      </div>
    }
  `,
  styles: [`
    :host { display: block; }
    .demo-banner { position: fixed; top: 0; left: 0; right: 0; z-index: 9999; background: #1d4ed8; color: #fff; font-size: 13px; padding: 8px 16px; }
    .demo-banner-inner { max-width: 600px; margin: 0 auto; display: flex; align-items: center; gap: 10px; justify-content: center; flex-wrap: wrap; }
    .demo-badge { font-size: 10px; font-weight: 700; background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 4px; letter-spacing: 0.05em; }
    .demo-back { color: #fff; text-decoration: underline; text-underline-offset: 2px; font-weight: 500; }
    .lb-public-root { padding-top: 40px; min-height: 100vh; background: #09090b; color: #fafafa; }
    .lb-public-root.dark { background: #09090b; color: #fafafa; }
    .lb-topbar { display: flex; justify-content: flex-end; padding: 12px 16px; }
    .lb-tb-btn { background: none; border: none; font-size: 16px; cursor: pointer; padding: 6px; border-radius: 8px; }
    .lb-cover-wrap { max-width: 500px; margin: 0 auto; padding: 0 16px; }
    .lb-cover-default { height: 80px; background: linear-gradient(135deg, #0b1628, #1a2540); border-radius: 16px; margin-bottom: -20px; }
    .lb-avatar-wrap { max-width: 500px; margin: 0 auto; padding: 0 16px; }
    .lb-avatar { width: 48px; height: 48px; border-radius: 14px; background: #3b82f6; border: 3px solid #09090b; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800; color: #fff; position: relative; z-index: 2; }
    .lb-content { max-width: 500px; margin: 0 auto; padding: 16px 16px 40px; }
    .lb-name { font-size: 20px; font-weight: 700; margin: 10px 0 4px; }
    .lb-desc { font-size: 13px; color: #a1a1aa; margin-bottom: 20px; }
    .lb-links { display: flex; flex-direction: column; gap: 8px; }
    .lb-link-item { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; cursor: pointer; }
    .lb-link-item:hover { border-color: rgba(255,255,255,0.2); }
    .lb-link-icon { font-size: 18px; }
    .lb-link-body { flex: 1; }
    .lb-link-title { font-size: 13px; font-weight: 600; display: block; }
    .lb-link-sub { font-size: 11px; color: #52525b; display: block; }
  `],
})
export class DemoLinkBioComponent implements OnInit, OnDestroy {
  clinic: LinkBioClinic | null = null;
  modelNum = 1;
  dark = true;
  bioLinks = MOCK_BIO_LINKS;
  allDocs = MOCK_DOCS;

  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  private publicPageBody = inject(PublicPageBodyService);

  ngOnInit(): void {
    this.publicPageBody.enterPublicPage();
    const modelParam = this.route.snapshot.paramMap.get('model') ?? '1';
    this.modelNum = parseInt(modelParam, 10) || 1;
    if (this.modelNum < 1 || this.modelNum > 5) this.modelNum = 1;

    const mock = MOCK_CLINICS[this.modelNum];
    if (mock) {
      this.clinic = mock as LinkBioClinic;
    }

    if (isPlatformBrowser(this.platformId)) {
      try {
        this.dark = localStorage.getItem('gestgo_bio_dark') !== '0';
      } catch {}
    }
  }

  ngOnDestroy(): void {
    this.publicPageBody.leavePublicPage();
  }

  toggleDark(): void {
    this.dark = !this.dark;
    if (isPlatformBrowser(this.platformId)) {
      try { localStorage.setItem('gestgo_bio_dark', this.dark ? '1' : '0'); } catch {}
    }
  }

  onShare(): void {
    if (isPlatformBrowser(this.platformId) && navigator.share) {
      navigator.share({ title: this.clinic?.name ?? 'Demo', url: window.location.href }).catch(() => {});
    }
  }
}
