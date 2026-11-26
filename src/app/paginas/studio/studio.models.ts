import type { StudioSpecialtyKey } from './studio-catalog';

export type { StudioSpecialtyKey };

export type StudioMode = 'link' | 'site';
export type StudioStatus = 'draft' | 'published' | 'unpublished';

export interface StudioBlock {
  id: string;
  type: string;
  enabled: boolean;
  order: number;
  variant: string;
  title: string;
  description: string;
}

export interface StudioModePresentation {
  enabled: boolean;
  templateId: string;
  status: StudioStatus;
  blocks: StudioBlock[];
}

export type StudioMediaSlot = 'hero' | 'portrait' | 'office';

export interface StudioMedia {
  heroPath?: string | null;
  portraitPath?: string | null;
  officePath?: string | null;
  heroUrl?: string | null;
  portraitUrl?: string | null;
  officeUrl?: string | null;
}

export interface StudioSharedContent {
  displayName: string;
  headline: string;
  description: string;
  ctaLabel: string;
  city: string;
  whatsapp: string;
  instagram: string;
  bookingUrl: string;
  media?: StudioMedia;
}

export interface StudioDraft {
  schemaVersion: number;
  version: number;
  specialtyKey: StudioSpecialtyKey;
  shared: StudioSharedContent;
  modes: {
    link: StudioModePresentation;
    site: StudioModePresentation;
  };
  themeOverrides: Record<string, Record<string, string | number>>;
  updatedAt?: string | null;
  seededFromLegacy?: boolean;
}
