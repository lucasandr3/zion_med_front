import { Component, EventEmitter, Input, Output, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LinkBioCtaChannel,
  LinkBioClinic,
  LinkBioExtra,
  LinkBioGoogleReviews,
  LinkBioLayoutModel,
  LinkBioLink,
  LinkBioPublicDocItem,
  LinkBioService,
} from '../../core/services/link-bio.service';
import { linkBioHeaderBrandImageUrl, linkBioHeroPortraitUrl } from '../../core/utils/link-bio-public-assets';
import { linkBioSpecialtiesList, parseLinkBioExtra } from '../../core/utils/link-bio-clinic-normalize.util';
import {
  initialsFromName,
  linkBioPresetMeta,
  type LinkBioPresetMeta,
} from './link-bio-preset.util';
import { resolvePublicAccentHex } from '../../core/utils/public-theme-accent';
import { LinkBioPublicGoogleReviewsComponent } from './link-bio-public-google-reviews.component';

@Component({
  selector: 'app-link-bio-public-layout-preset',
  standalone: true,
  imports: [CommonModule, RouterLink, LinkBioPublicGoogleReviewsComponent],
  templateUrl: './link-bio-public-layout-preset.component.html',
  styleUrl: './link-bio-public-layout-preset.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LinkBioPublicLayoutPresetComponent {
  private linkBioService = inject(LinkBioService);

  @Input({ required: true }) model!: LinkBioLayoutModel;
  @Input({ required: true }) clinic!: LinkBioClinic;
  @Input() bioLinks: LinkBioLink[] = [];
  @Input() allDocs: LinkBioPublicDocItem[] = [];
  @Input() googleReviews: LinkBioGoogleReviews | null = null;
  @Input() publicSlug = '';
  @Input() linkBioPreview = false;
  @Input() dark = false;
  @Input() embedMode = false;

  @Output() toggleDark = new EventEmitter<void>();
  @Output() share = new EventEmitter<void>();

  specialtyFilter = 'Todos';
  ageBandIndex = 0;

  get meta(): LinkBioPresetMeta {
    return linkBioPresetMeta(this.model);
  }

  /** Mapeia chaves do preset SVG legado → Material Symbols. */
  materialIcon(key: string | null | undefined): string {
    const map: Record<string, string> = {
      arrow: 'arrow_forward',
      chevron: 'chevron_right',
      calendar: 'calendar_month',
      file: 'description',
      pin: 'location_on',
      message: 'chat',
      clock: 'schedule',
      check: 'check',
      share: 'share',
      sun: 'light_mode',
      moon: 'dark_mode',
      heart: 'favorite',
      leaf: 'eco',
      spark: 'auto_awesome',
      users: 'group',
      shield: 'verified_user',
      clipboard: 'assignment',
      stethoscope: 'medical_services',
      tooth: 'dentistry',
      mail: 'mail',
      phone: 'call',
      instagram: 'photo_camera',
    };
    const k = (key ?? '').trim().toLowerCase();
    return map[k] || 'circle';
  }

  get extra(): LinkBioExtra {
    return parseLinkBioExtra(this.clinic.link_bio_extra);
  }

  get rootClass(): string {
    const parts = ['lb-preset-root', this.meta.theme];
    if (this.dark) parts.push('dark');
    if (this.embedMode) parts.push('embed');
    return parts.join(' ');
  }

  get themeVars(): Record<string, string> {
    const resolved =
      resolvePublicAccentHex(this.clinic.public_theme, this.clinic.accent_hex) ||
      this.clinic.accent_hex?.trim() ||
      '';
    const hasAccent = /^#[0-9A-Fa-f]{6}$/.test(resolved);
    const brand = hasAccent ? resolved : this.meta.brand;
    const brandDark = hasAccent ? brand : this.meta.brandDark;
    const brandSoft = hasAccent
      ? this.dark
        ? `color-mix(in srgb, ${brand} 22%, #1d2625)`
        : `color-mix(in srgb, ${brand} 16%, white)`
      : this.meta.brandSoft;
    return {
      '--brand': brand,
      // No escuro, --brand-dark acompanha o tema (CSS antigo forçava cinza-verde)
      '--brand-dark': this.dark ? brand : brandDark,
      '--brand-soft': brandSoft,
    };
  }

  get initials(): string {
    return initialsFromName(this.clinic.name);
  }

  get brandImage(): string | null {
    return linkBioHeaderBrandImageUrl(this.clinic);
  }

  get portraitUrl(): string | null {
    return linkBioHeroPortraitUrl(this.clinic);
  }

  get eyebrow(): string {
    if (this.model === 6) {
      return this.extra.ped_cover_kicker?.trim() || this.meta.eyebrow;
    }
    return this.meta.eyebrow;
  }

  get headline(): string {
    return this.extra.hero_tagline?.trim() || this.meta.defaultHeadline;
  }

  get description(): string {
    return (
      this.clinic.short_description?.trim() ||
      this.extra.brand_subtitle?.trim() ||
      this.meta.defaultDescription
    );
  }

  get councilLine(): string {
    const parts: string[] = [];
    if (this.extra.council_registration?.trim()) {
      parts.push(this.extra.council_registration.trim());
    }
    if (this.clinic.founded_year) {
      parts.push(`Desde ${this.clinic.founded_year}`);
    }
    return parts.join(' · ');
  }

  get specialties(): string[] {
    return linkBioSpecialtiesList(this.clinic);
  }

  get services(): { title: string; subtitle: string; icon: string }[] {
    const modalities = (this.extra.modalities ?? []).filter((m) => m.available !== false);
    if (modalities.length) {
      return modalities.slice(0, 6).map((m) => ({
        title: m.title,
        subtitle: m.subtitle?.trim() || 'Saiba mais com a equipe',
        icon: 'spark',
      }));
    }
    const specs = this.specialties;
    if (specs.length) {
      return specs.slice(0, 6).map((s) => ({
        title: s,
        subtitle: 'Atendimento disponível',
        icon: 'heart',
      }));
    }
    return [
      { title: 'Primeira consulta', subtitle: 'Conheça o atendimento', icon: 'heart' },
      { title: 'Retorno', subtitle: 'Continuidade do cuidado', icon: 'clock' },
    ];
  }

  get filteredServices(): { title: string; subtitle: string; icon: string }[] {
    if (!this.meta.showSpecialtyFilter || this.specialtyFilter === 'Todos') {
      return this.services;
    }
    return this.services.filter((s) => s.title === this.specialtyFilter);
  }

  get filterOptions(): string[] {
    return ['Todos', ...this.services.map((s) => s.title)];
  }

  get ageBands(): { title: string; range: string; copy: string; emoji?: string }[] {
    const custom = this.extra.ped_age_bands;
    if (custom?.length) {
      return custom.map((b) => ({
        title: b.title,
        range: b.range,
        emoji: b.emoji,
        copy: `${b.title}: ${b.range}`,
      }));
    }
    return [
      { title: '0–2 anos', range: 'Bebês', copy: 'Acompanhamento e orientação para os primeiros anos.' },
      { title: '3–10 anos', range: 'Crianças', copy: 'Cuidados do dia a dia e prevenção.' },
      { title: '11–17 anos', range: 'Adolescentes', copy: 'Acolhimento com privacidade e clareza.' },
    ];
  }

  get ageInfo(): string {
    return this.ageBands[this.ageBandIndex]?.copy ?? '';
  }

  get steps(): string[] {
    const custom = this.extra.ped_first_visit_steps;
    if (custom?.length) {
      return custom.map((s) => s.title + (s.subtitle ? ` — ${s.subtitle}` : ''));
    }
    if (this.model === 8) {
      return [
        'Você escolhe o atendimento ou solicita uma avaliação.',
        'Preenche a anamnese de forma segura, pelo celular.',
        'O profissional revisa as informações no atendimento.',
      ];
    }
    return [
      'Escolha o atendimento desejado.',
      'Preencha os documentos indicados.',
      'Fale com a equipe para confirmar o horário.',
    ];
  }

  get showParentNotice(): boolean {
    return this.model === 6 && !!(this.parentNoticeTitle || this.parentNoticeBody);
  }

  get parentNoticeTitle(): string {
    return this.extra.ped_parent_notice_title?.trim() || (this.model === 6 ? 'Importante para os pais' : '');
  }

  get parentNoticeBody(): string {
    return (
      this.extra.ped_parent_notice_body?.trim() ||
      (this.model === 6
        ? 'As fichas e termos devem ser preenchidos e assinados pelo responsável legal da criança.'
        : '')
    );
  }

  get docsTitle(): string {
    if (this.model === 6 && this.extra.ped_docs_section_title?.trim()) {
      return this.extra.ped_docs_section_title.trim();
    }
    return this.meta.docsTitle;
  }

  get docsSub(): string {
    if (this.model === 6 && this.extra.ped_docs_intro?.trim()) {
      return this.extra.ped_docs_intro.trim();
    }
    return this.meta.docsSub;
  }

  get primaryCtaLabel(): string {
    if (this.appointmentUrl && this.appointmentCtaLabel) {
      return this.appointmentCtaLabel;
    }
    if (this.model === 6 && this.extra.ped_wa_cta_label?.trim()) {
      return this.extra.ped_wa_cta_label.trim();
    }
    return this.meta.primaryCta;
  }

  get team() {
    return (this.extra.team ?? []).filter((m) => m.name?.trim());
  }

  get convenios(): string[] {
    return (this.extra.convenios ?? []).map((c) => String(c).trim()).filter(Boolean);
  }

  get formDocs(): LinkBioPublicDocItem[] {
    return this.allDocs.filter((d) => d.type === 'form' || d.type === 'bio');
  }

  get whatsapp(): string {
    const phone = this.clinic.phone?.replace(/\D/g, '') ?? '';
    const wa = phone.length >= 10 && phone.length <= 11 ? '55' + phone : phone;
    if (wa) return `https://wa.me/${wa}`;
    const link = this.bioLinks.find((l) => /wa\.me|whatsapp/i.test(l.url));
    return link?.url ?? '';
  }

  get mapsUrl(): string {
    return this.clinic.maps_url?.trim() || '';
  }

  get instagramUrl(): string {
    if (this.extra.instagram_url?.trim()) return this.extra.instagram_url.trim();
    const ig = this.bioLinks.find((l) => /instagram\.com/i.test(l.url));
    return ig?.url ?? '';
  }

  get emailHref(): string {
    const email = this.clinic.contact_email?.trim();
    return email ? `mailto:${email}` : '';
  }

  get phoneHref(): string {
    const raw = this.clinic.phone?.trim() ?? '';
    if (!raw) return '';
    if (raw.startsWith('+')) return `tel:${raw}`;
    const d = raw.replace(/\D/g, '');
    if (!d) return '';
    const intl = d.length <= 11 && !d.startsWith('55') ? '55' + d : d;
    return `tel:+${intl}`;
  }

  get hoursRows(): { label: string; text: string }[] {
    const grid = this.clinic.business_hours_grid;
    if (!grid || typeof grid !== 'object') return [];
    const order = ['1', '2', '3', '4', '5', '6', '7'];
    return order
      .map((k) => (grid as Record<string, { label: string; text: string }>)[k])
      .filter((d): d is { label: string; text: string } => !!d && !!d.text && d.text !== '–');
  }

  get hasHours(): boolean {
    return this.hoursRows.length > 0;
  }

  get showGoogleReviews(): boolean {
    return !!(
      this.googleReviews &&
      this.clinic.google_reviews_enabled !== false &&
      (this.googleReviews.reviews?.length || this.googleReviews.rating != null)
    );
  }

  get appointmentUrl(): string {
    const extra = this.clinic?.link_bio_extra as Record<string, unknown> | null | undefined;
    if (extra && extra['appointment_cta_enabled']) {
      const mode = String(extra['appointment_cta_mode'] || 'external');
      if (mode === 'gestgo' && this.clinic?.slug) {
        const path = `/a/${this.clinic.slug}`;
        return typeof window !== 'undefined' && window.location?.origin
          ? `${window.location.origin}${path}`
          : path;
      }
      if (mode === 'feegow') {
        const u = String(extra['appointment_feegow_url'] || extra['appointment_url'] || '').trim();
        if (u) return u;
      } else {
        const u = String(extra['appointment_url'] || '').trim();
        if (u) return u;
      }
    }
    const agenda = this.bioLinks.find((l) =>
      /agend|calendly|feegow|marcar|consulta/i.test(`${l.label} ${l.url}`),
    );
    return agenda?.url || '';
  }

  get appointmentCtaLabel(): string {
    const extra = this.clinic?.link_bio_extra as Record<string, unknown> | null | undefined;
    const label = extra ? String(extra['appointment_cta_label'] || '').trim() : '';
    return label || 'Agendar atendimento';
  }

  trackCta(channel: LinkBioCtaChannel, directUrl: string, teamRef?: number | null): string {
    if (!directUrl) return '';
    return (
      this.linkBioService.outboundCtaUrl(
        this.publicSlug,
        channel,
        this.linkBioPreview,
        this.clinic?.slug,
        teamRef,
      ) ?? directUrl
    );
  }

  teamWhatsappHref(member: { whatsapp?: string }, index: number): string {
    const raw = member.whatsapp?.replace(/\D/g, '') ?? '';
    if (!raw) return '';
    const wa = raw.length >= 10 && raw.length <= 11 && !raw.startsWith('55') ? '55' + raw : raw;
    const direct = `https://wa.me/${wa}`;
    return this.trackCta('team_whatsapp', direct, index);
  }

  hrefBioLink(link: LinkBioLink): string {
    return this.linkBioService.outboundBioLinkUrl(
      this.publicSlug,
      link,
      this.linkBioPreview,
      this.clinic?.slug,
    );
  }

  formToken(f: { public_url: string }): string {
    const parts = f.public_url.split('/f/');
    return parts.length > 1 ? parts[1]!.split('?')[0]! : '';
  }

  docTitle(doc: LinkBioPublicDocItem): string {
    return doc.type === 'bio' ? doc.item.label : doc.item.name;
  }

  docSubtitle(doc: LinkBioPublicDocItem): string {
    return doc.type === 'form' ? 'Formulário digital' : 'Link da clínica';
  }

  selectSpecialty(value: string): void {
    this.specialtyFilter = value;
  }

  selectAge(index: number): void {
    this.ageBandIndex = index;
  }

  onToggleDark(): void {
    this.toggleDark.emit();
  }

  onShare(): void {
    this.share.emit();
  }
}
