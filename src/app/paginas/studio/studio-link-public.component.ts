import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import {
  STUDIO_BLOCK_LABELS,
  STUDIO_SPECIALTIES,
  findSpecialty,
  type StudioSpecialtyKey,
} from './studio-catalog';
import type { StudioBlock, StudioSharedContent } from './studio.models';
import type { LinkBioLink, LinkBioPublicDocItem } from '../../core/services/link-bio.service';
import { LinkBioService } from '../../core/services/link-bio.service';
import { inject } from '@angular/core';

export interface StudioLinkPublicPayload {
  enabled: boolean;
  specialtyKey: StudioSpecialtyKey | string;
  templateId: string;
  shared: StudioSharedContent;
  blocks: StudioBlock[];
  themeOverrides?: Record<string, string | number>;
  publishedAt?: string | null;
}

@Component({
  selector: 'app-studio-link-public',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './studio-link-public.component.html',
  styleUrl: './studio-link-public.component.css',
})
export class StudioLinkPublicComponent {
  private readonly linkBio = inject(LinkBioService);

  readonly studio = input.required<StudioLinkPublicPayload>();
  readonly publicSlug = input('');
  readonly clinicSlug = input('');
  readonly bioLinks = input<LinkBioLink[]>([]);
  readonly allDocs = input<LinkBioPublicDocItem[]>([]);
  readonly linkBioPreview = input(false);
  readonly dark = input(false);
  readonly toggleDark = output<void>();
  readonly share = output<void>();

  readonly template = computed(() => {
    const studio = this.studio();
    const specialty = findSpecialty((studio.specialtyKey as StudioSpecialtyKey) || 'est');
    return specialty.templates.find((t) => t.id === studio.templateId) ?? specialty.templates[0];
  });

  readonly specialtyName = computed(() => {
    const key = this.studio().specialtyKey as StudioSpecialtyKey;
    return STUDIO_SPECIALTIES.find((s) => s.key === key)?.name ?? '';
  });

  readonly theme = computed(() => {
    const tpl = this.template();
    const ov = this.studio().themeOverrides ?? {};
    return {
      canvas: String(ov['canvas'] ?? tpl.canvas),
      ink: String(ov['ink'] ?? tpl.ink),
      accent: String(ov['accent'] ?? tpl.accent),
      layout: tpl.layout,
    };
  });

  readonly enabledBlocks = computed(() =>
    [...(this.studio().blocks ?? [])].filter((b) => b.enabled).sort((a, b) => a.order - b.order)
  );

  labelFor(type: string): string {
    return STUDIO_BLOCK_LABELS[type] ?? type;
  }

  bookingHref(): string | null {
    const booking = (this.studio().shared.bookingUrl || '').trim();
    if (booking) return booking;
    const cta = this.linkBio.outboundCtaUrl(
      this.publicSlug(),
      'appointment',
      this.linkBioPreview(),
      this.clinicSlug()
    );
    return cta;
  }

  whatsappHref(): string | null {
    const wa = (this.studio().shared.whatsapp || '').replace(/\D/g, '');
    if (wa) return `https://wa.me/${wa}`;
    return this.linkBio.outboundCtaUrl(
      this.publicSlug(),
      'whatsapp',
      this.linkBioPreview(),
      this.clinicSlug()
    );
  }

  bioHref(link: LinkBioLink): string {
    return this.linkBio.outboundBioLinkUrl(
      this.publicSlug(),
      link,
      this.linkBioPreview(),
      this.clinicSlug()
    );
  }
}
