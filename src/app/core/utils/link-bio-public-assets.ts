import type { LinkBioClinic } from '../services/link-bio.service';

function trimmedUrl(value: string | null | undefined): string | null {
  if (value == null) return null;
  const s = String(value).trim();
  return s !== '' ? s : null;
}

/**
 * Imagem compacta no topo da página pública: `company_logo_url` quando existir,
 * senão `logo_url` (comportamento legado — uma única imagem para tudo).
 */
export function linkBioHeaderBrandImageUrl(c: LinkBioClinic): string | null {
  return trimmedUrl(c.company_logo_url) ?? trimmedUrl(c.logo_url);
}

/**
 * Foto do profissional para avatar circular / retrato.
 * Sem fallback para logo (logo não deve virar “foto de pessoa” no hero).
 */
export function linkBioProfessionalPortraitUrl(c: LinkBioClinic): string | null {
  return trimmedUrl(c.professional_photo_url);
}

/**
 * Avatar de layouts temáticos: foto do profissional, senão logo (legado).
 * Usar só em anéis/avatares — nunca como fundo full-bleed do hero.
 */
export function linkBioHeroPortraitUrl(c: LinkBioClinic): string | null {
  return linkBioProfessionalPortraitUrl(c) ?? trimmedUrl(c.logo_url);
}

/**
 * Banner / capa do hero: somente `cover_image_url`.
 * A foto do profissional não deve ocupar este papel.
 */
export function linkBioHeroBannerUrl(c: LinkBioClinic): string | null {
  return trimmedUrl(c.cover_image_url);
}
