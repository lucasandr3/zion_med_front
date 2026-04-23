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
 * Foto grande no perfil / herói: `professional_photo_url` quando existir,
 * senão `logo_url` (legado).
 */
export function linkBioHeroPortraitUrl(c: LinkBioClinic): string | null {
  return trimmedUrl(c.professional_photo_url) ?? trimmedUrl(c.logo_url);
}
