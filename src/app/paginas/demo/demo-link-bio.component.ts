import { Component, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LinkBioPublicLayoutsComponent } from '../link-bio-public/link-bio-public-layouts.component';
import { LinkBioPublicLayoutGenericComponent } from '../link-bio-public/link-bio-public-layout-generic.component';
import { LinkBioPublicLayoutVetComponent } from '../link-bio-public/link-bio-public-layout-vet.component';
import { LinkBioPublicLayoutPediaComponent } from '../link-bio-public/link-bio-public-layout-pedia.component';
import { LinkBioPublicLayoutNutriComponent } from '../link-bio-public/link-bio-public-layout-nutri.component';
import type { LinkBioClinic, LinkBioLink, LinkBioPublicDocItem } from '../../core/services/link-bio.service';
import { PublicPageBodyService } from '../../core/services/public-page-body.service';

const MOCK_CLINICS: Record<number, Partial<LinkBioClinic> & { id: number; name: string; slug: string }> = {
  1: {
    id: 9001,
    name: 'Clínica São Paulo',
    slug: 'demo-1',
    short_description: 'Clínica geral multidisciplinar',
    logo_url: null,
    cover_image_url: null,
    /** Sem faixa hero — alinhado ao layout genérico “limpo” na prévia da landing */
    cover_mode: 'none',
    cover_color: null,
    accent_hex: '#1e293b',
    phone: '11999999999',
    contact_email: 'contato@clinicasp.com.br',
    address: 'Rua Central, 45 · São Paulo, SP',
    maps_url: '#',
    is_open_now: true,
    link_bio_model: 1,
    link_bio_extra: {},
    specialties_list: ['Clínica Geral', 'Cardiologia', 'Endocrinologia'],
    business_hours_grid: {
      '1': { label: 'Seg', text: '08:00–18:00' },
      '2': { label: 'Ter', text: '08:00–18:00' },
      '3': { label: 'Qua', text: '08:00–18:00' },
      '4': { label: 'Qui', text: '08:00–18:00' },
      '5': { label: 'Sex', text: '08:00–17:00' },
      '6': { label: 'Sáb', text: '–' },
      '7': { label: 'Dom', text: '–' },
    },
    founded_year: 2010,
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
  6: {
    id: 9006,
    name: 'VetCare Animal',
    slug: 'demo-6',
    short_description: 'Clínica veterinária para cães e gatos',
    logo_url: null,
    cover_image_url: null,
    phone: '11999999999',
    contact_email: 'contato@vetcare.com.br',
    address: 'Rua dos Bichos, 200 · São Paulo, SP',
    maps_url: '#',
    is_open_now: true,
    link_bio_model: 6,
    link_bio_extra: {},
    specialties_list: ['Clínica Geral', 'Cirurgia'],
    business_hours_grid: {
      '1': { label: 'Seg', text: '09:00–19:00' },
      '2': { label: 'Ter', text: '09:00–19:00' },
      '3': { label: 'Qua', text: '09:00–19:00' },
      '4': { label: 'Qui', text: '09:00–19:00' },
      '5': { label: 'Sex', text: '09:00–18:00' },
      '6': { label: 'Sáb', text: '09:00–14:00' },
      '7': { label: 'Dom', text: '–' },
    },
    founded_year: 2014,
  },
  7: {
    id: 9007,
    name: 'Crescer Pediatria',
    slug: 'demo-7',
    short_description: 'Saúde infantil com carinho e evidência',
    logo_url: null,
    cover_image_url: null,
    phone: '11999999999',
    contact_email: 'contato@crescerpedia.com.br',
    address: 'Alameda Infância, 88 · São Paulo, SP',
    maps_url: '#',
    is_open_now: true,
    link_bio_model: 7,
    link_bio_extra: {},
    specialties_list: ['Pediatria', 'Puericultura'],
    business_hours_grid: {
      '1': { label: 'Seg', text: '08:00–18:00' },
      '2': { label: 'Ter', text: '08:00–18:00' },
      '3': { label: 'Qua', text: '08:00–18:00' },
      '4': { label: 'Qui', text: '08:00–18:00' },
      '5': { label: 'Sex', text: '08:00–17:00' },
      '6': { label: 'Sáb', text: '08:00–12:00' },
      '7': { label: 'Dom', text: '–' },
    },
    founded_year: 2016,
  },
  8: {
    id: 9008,
    name: 'Nutri Vida',
    slug: 'demo-8',
    short_description: 'Nutrição clínica e funcional',
    logo_url: null,
    cover_image_url: null,
    phone: '11999999999',
    contact_email: 'ola@nutrivida.com.br',
    address: 'Rua Bem-Estar, 150 · São Paulo, SP',
    maps_url: '#',
    is_open_now: true,
    link_bio_model: 8,
    link_bio_extra: {},
    specialties_list: ['Nutrição clínica', 'Emagrecimento', 'Esportiva'],
    business_hours_grid: {
      '1': { label: 'Seg', text: '09:00–19:00' },
      '2': { label: 'Ter', text: '09:00–19:00' },
      '3': { label: 'Qua', text: '09:00–19:00' },
      '4': { label: 'Qui', text: '09:00–19:00' },
      '5': { label: 'Sex', text: '09:00–18:00' },
      '6': { label: 'Sáb', text: '–' },
      '7': { label: 'Dom', text: '–' },
    },
    founded_year: 2019,
  },
};

const MOCK_BIO_LINKS: LinkBioLink[] = [];

const MOCK_DOCS: LinkBioPublicDocItem[] = [
  {
    type: 'form',
    item: { id: 1, name: 'Ficha de Anamnese', public_url: 'https://gestgo.com.br/f/demo-anamnese' },
  },
  {
    type: 'form',
    item: { id: 2, name: 'Termo de Consentimento', public_url: 'https://gestgo.com.br/f/demo-consentimento' },
  },
  {
    type: 'form',
    item: { id: 3, name: 'Pesquisa de Satisfação', public_url: 'https://gestgo.com.br/f/demo-pesquisa' },
  },
];

@Component({
  selector: 'app-demo-link-bio',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LinkBioPublicLayoutGenericComponent,
    LinkBioPublicLayoutsComponent,
    LinkBioPublicLayoutVetComponent,
    LinkBioPublicLayoutPediaComponent,
    LinkBioPublicLayoutNutriComponent,
  ],
  template: `
    @if (!embedMode) {
      <div class="demo-banner">
        <div class="demo-banner-inner">
          <span class="demo-badge">DEMONSTRAÇÃO</span>
          <span>Esta é uma página de exemplo do Gestgo.</span>
          <a routerLink="/" class="demo-back">← Voltar ao site</a>
        </div>
      </div>
    }

    @if (clinic) {
      @switch (modelNum) {
        @case (1) {
          <app-link-bio-public-layout-generic
            [clinic]="clinic"
            [allLinks]="allDocs"
            [publicSlug]="clinic.slug!"
            [linkBioPreview]="false"
            [dark]="dark"
            [embedMode]="embedMode"
            (toggleDark)="toggleDark()"
            (share)="onShare()"
          />
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
        @case (6) {
          <app-link-bio-public-layout-vet
            [clinic]="clinic" [bioLinks]="bioLinks" [allDocs]="allDocs"
            [publicSlug]="clinic.slug!" [linkBioPreview]="false"
            [dark]="dark" (toggleDark)="toggleDark()" (share)="onShare()"
          />
        }
        @case (7) {
          <app-link-bio-public-layout-pedia
            [clinic]="clinic" [bioLinks]="bioLinks" [allDocs]="allDocs"
            [publicSlug]="clinic.slug!" [linkBioPreview]="false"
            [dark]="dark" (toggleDark)="toggleDark()" (share)="onShare()"
          />
        }
        @case (8) {
          <app-link-bio-public-layout-nutri
            [clinic]="clinic" [bioLinks]="bioLinks" [allDocs]="allDocs"
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
    .demo-badge { font-size: 10px; font-weight: 700; background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 0.5rem; letter-spacing: 0.05em; }
    .demo-back { color: #fff; text-decoration: underline; text-underline-offset: 2px; font-weight: 500; }
  `],
})
export class DemoLinkBioComponent implements OnInit, OnDestroy {
  clinic: LinkBioClinic | null = null;
  modelNum = 1;
  /** Oculta faixa fixa quando aberto dentro do iframe da landing (query embed=1) */
  embedMode = false;
  dark = true;
  bioLinks = MOCK_BIO_LINKS;
  allDocs = MOCK_DOCS;

  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  private publicPageBody = inject(PublicPageBodyService);

  ngOnInit(): void {
    this.publicPageBody.enterPublicPage();
    this.embedMode = this.route.snapshot.queryParamMap.get('embed') === '1';
    const modelParam = this.route.snapshot.paramMap.get('model') ?? '1';
    this.modelNum = parseInt(modelParam, 10) || 1;
    if (this.modelNum < 1 || this.modelNum > 8) this.modelNum = 1;

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
