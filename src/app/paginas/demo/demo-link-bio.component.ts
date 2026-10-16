import { Component, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LinkBioPublicLayoutPresetComponent } from '../link-bio-public/link-bio-public-layout-preset.component';
import type { LinkBioClinic, LinkBioLink, LinkBioPublicDocItem } from '../../core/services/link-bio.service';
import { PublicPageBodyService } from '../../core/services/public-page-body.service';

const MOCK_CLINICS: Record<number, Partial<LinkBioClinic> & { id: number; name: string; slug: string }> = {
  1: {
    id: 9001,
    name: 'Dra. Clara Mendes',
    slug: 'demo-1',
    short_description: 'Atendimento individual, acolhedor e organizado.',
    accent_hex: '#206D58',
    phone: '11999999999',
    contact_email: 'clara@exemplo.com',
    address: 'Av. Paulista, 1000 · São Paulo, SP',
    maps_url: '#',
    is_open_now: true,
    link_bio_model: 1,
    link_bio_extra: { hero_tagline: 'Cuidar de você começa com uma boa conversa.' },
    specialties_list: ['Consulta individual', 'Retorno'],
  },
  2: {
    id: 9002,
    name: 'Clínica Horizonte',
    slug: 'demo-2',
    short_description: 'Seu cuidado, com mais simplicidade.',
    accent_hex: '#24334A',
    phone: '11999999999',
    contact_email: 'contato@horizonte.com.br',
    address: 'Rua Central, 45 · São Paulo, SP',
    maps_url: '#',
    is_open_now: true,
    link_bio_model: 2,
    link_bio_extra: {},
    specialties_list: ['Clínica Geral', 'Cardiologia', 'Endocrinologia'],
  },
  3: {
    id: 9003,
    name: 'Ateliê da Pele',
    slug: 'demo-3',
    short_description: 'Estética facial com documentos digitais.',
    accent_hex: '#806044',
    phone: '11999999999',
    contact_email: 'contato@ateliedapele.com.br',
    address: 'Rua Oscar Freire, 890 · São Paulo, SP',
    maps_url: '#',
    is_open_now: true,
    link_bio_model: 3,
    link_bio_extra: { hero_tagline: 'Sua beleza, no seu próprio tempo.' },
    specialties_list: ['Botox', 'Preenchimento', 'Bioestimuladores', 'Peeling'],
  },
  4: {
    id: 9004,
    name: 'Oral Prime',
    slug: 'demo-4',
    short_description: 'Odontologia completa para a família.',
    accent_hex: '#1764A8',
    phone: '11999999999',
    contact_email: 'contato@oralprime.com.br',
    address: 'Rua Augusta, 320 · São Paulo, SP',
    maps_url: '#',
    is_open_now: true,
    link_bio_model: 4,
    link_bio_extra: { convenios: ['Amil', 'Bradesco Saúde', 'SulAmérica', 'Unimed'] },
    specialties_list: ['Ortodontia', 'Implantes', 'Endodontia'],
  },
  5: {
    id: 9005,
    name: 'Raiz Nutrição',
    slug: 'demo-5',
    short_description: 'Nutrição clínica e funcional.',
    accent_hex: '#3E6345',
    phone: '11999999999',
    contact_email: 'ola@raiznutri.com.br',
    address: 'Rua Bem-Estar, 150 · São Paulo, SP',
    maps_url: '#',
    is_open_now: true,
    link_bio_model: 5,
    link_bio_extra: {},
    specialties_list: ['Nutrição clínica', 'Emagrecimento', 'Esportiva'],
  },
  6: {
    id: 9006,
    name: 'Pequenos Horizontes',
    slug: 'demo-6',
    short_description: 'Pediatria com acolhimento para a família.',
    accent_hex: '#286D8A',
    phone: '11999999999',
    contact_email: 'contato@pequenos.com.br',
    address: 'Alameda Infância, 88 · São Paulo, SP',
    maps_url: '#',
    is_open_now: true,
    link_bio_model: 6,
    link_bio_extra: {},
    specialties_list: ['Pediatria', 'Puericultura'],
  },
  7: {
    id: 9007,
    name: 'Núcleo Integrar',
    slug: 'demo-7',
    short_description: 'Clínica multiprofissional.',
    accent_hex: '#6250AA',
    phone: '11999999999',
    contact_email: 'contato@integrar.com.br',
    address: 'Rua Funchal, 573 · São Paulo, SP',
    maps_url: '#',
    is_open_now: true,
    link_bio_model: 7,
    link_bio_extra: {
      team: [
        { name: 'Dr. Rafael Mendes', credential: 'CRM 34.567', notes: 'Cardiologia' },
        { name: 'Dra. Juliana Alves', credential: 'CRP 06/12345', notes: 'Psicologia' },
        { name: 'Dr. Carlos Lima', credential: 'CRO 45.678', notes: 'Odontologia' },
      ],
    },
    specialties_list: ['Cardiologia', 'Psicologia', 'Odontologia', 'Nutrição'],
  },
  8: {
    id: 9008,
    name: 'Essentia Dermato',
    slug: 'demo-8',
    short_description: 'Fisioterapia dermatofuncional.',
    accent_hex: '#3E736C',
    phone: '11999999999',
    contact_email: 'contato@essentia.com.br',
    address: 'Rua da Pele, 220 · São Paulo, SP',
    maps_url: '#',
    is_open_now: true,
    link_bio_model: 8,
    link_bio_extra: { hero_tagline: 'Ciência e cuidado para a saúde da sua pele.' },
    specialties_list: ['Avaliação dermato', 'Pós-operatório', 'Saúde da pele', 'Tratamento funcional'],
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
];

@Component({
  selector: 'app-demo-link-bio',
  standalone: true,
  imports: [RouterLink, LinkBioPublicLayoutPresetComponent],
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
      <app-link-bio-public-layout-preset
        [model]="modelNum"
        [clinic]="clinic"
        [bioLinks]="bioLinks"
        [allDocs]="allDocs"
        [publicSlug]="clinic.slug!"
        [linkBioPreview]="false"
        [dark]="dark"
        [embedMode]="embedMode"
        (toggleDark)="toggleDark()"
        (share)="onShare()"
      />
    } @else {
      <div style="text-align: center; padding: 100px 24px; color: #888">
        Layout não encontrado. <a routerLink="/" style="color: #3b82f6">Voltar ao site</a>
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
  modelNum: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 = 1;
  embedMode = false;
  dark = false;
  bioLinks = MOCK_BIO_LINKS;
  allDocs = MOCK_DOCS;

  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  private publicPageBody = inject(PublicPageBodyService);

  ngOnInit(): void {
    this.embedMode = this.route.snapshot.queryParamMap.get('embed') === '1';
    const raw = Number(this.route.snapshot.paramMap.get('model') || this.route.snapshot.queryParamMap.get('model') || 1);
    this.modelNum = ([1, 2, 3, 4, 5, 6, 7, 8].includes(raw) ? raw : 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    const mock = MOCK_CLINICS[this.modelNum];
    this.clinic = mock ? ({ ...mock } as LinkBioClinic) : null;
    if (isPlatformBrowser(this.platformId)) {
      this.publicPageBody.enterPublicPage();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.publicPageBody.leavePublicPage();
    }
  }

  toggleDark(): void {
    this.dark = !this.dark;
  }

  onShare(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    void navigator.clipboard?.writeText(location.href);
  }
}
