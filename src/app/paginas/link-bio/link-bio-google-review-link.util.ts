import type { LinkBioClinic, LinkBioLink } from '../../core/services/link-bio.service';

export const GOOGLE_REVIEW_LINK_LABEL = 'Avalie no Google';
export const GOOGLE_REVIEW_LINK_ICON = 'star';

/** Link curto do Maps (Compartilhar) — serve para Como chegar, mas não traz Place ID. */
export function isShortGoogleMapsShareUrl(mapsUrl: string | null | undefined): boolean {
  const raw = mapsUrl?.trim();
  if (!raw) return false;
  return /maps\.app\.goo\.gl|goo\.gl\/maps/i.test(raw);
}

/**
 * Tenta extrair identificador do local a partir de uma URL do Google Maps.
 * Ordem: place_id=, ChIJ…, CID 0x…:0x…, g/11x… (formato recente do Maps).
 */
export function extractPlaceIdFromMapsUrl(mapsUrl: string | null | undefined): string | null {
  const raw = mapsUrl?.trim();
  if (!raw) return null;

  const placeIdParam = raw.match(/[?&]place_id=([^&]+)/i);
  if (placeIdParam?.[1]) {
    return decodeURIComponent(placeIdParam[1]);
  }

  const chij = raw.match(/(ChI[a-zA-Z0-9_-]{20,})/);
  if (chij?.[1]) return chij[1];

  const cid = raw.match(/!1s(0x[a-fA-F0-9]+:0x[a-fA-F0-9]+)/);
  if (cid?.[1]) {
    return cid[1];
  }

  const gFeature =
    raw.match(/!16s(?:%2F|\/)g(?:%2F|\/)([A-Za-z0-9_-]+)/i) ??
    raw.match(/(?:^|[?&#!/])g\/([A-Za-z0-9_-]{8,})/i);
  if (gFeature?.[1]) {
    return `g/${gFeature[1]}`;
  }

  return null;
}

/** Aceita Place ID, CID ou URL do Maps — devolve só o identificador. */
export function normalizeGooglePlaceId(value: string | null | undefined): string | null {
  const raw = value?.trim();
  if (!raw) return null;

  if (
    /^https?:\/\//i.test(raw) ||
    raw.includes('google.com/maps') ||
    raw.includes('maps.app.goo.gl')
  ) {
    return extractPlaceIdFromMapsUrl(raw);
  }

  return raw;
}

/** CID legado (0x…:0x…) — abre o formulário de avaliação via URL do Maps. */
function isMapsCid(placeId: string): boolean {
  return /^0x[a-fA-F0-9]+:0x[a-fA-F0-9]+$/i.test(placeId.trim());
}

export function buildGoogleWriteReviewUrl(placeId: string): string | null {
  const id = normalizeGooglePlaceId(placeId);
  if (!id) return null;

  if (isMapsCid(id)) {
    return `https://www.google.com/maps/place//data=!4m3!3m2!1s${encodeURIComponent(id)}!12e1`;
  }

  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(id)}`;
}

export function resolveGoogleWriteReviewUrl(clinic: LinkBioClinic): string | null {
  const explicit = normalizeGooglePlaceId(clinic.google_place_id);
  if (explicit) {
    return buildGoogleWriteReviewUrl(explicit);
  }

  const fromMaps = extractPlaceIdFromMapsUrl(clinic.maps_url);
  if (fromMaps) {
    return buildGoogleWriteReviewUrl(fromMaps);
  }

  return null;
}

export function hasGoogleReviewLink(links: LinkBioLink[]): boolean {
  return links.some((link) => {
    const haystack = `${link.label} ${link.url}`.toLowerCase();
    return (
      /local\/writereview|writereview\?placeid|g\.page\/r\/|!12e1/i.test(haystack) ||
      (/google|g\.page|maps\.app\.goo\.gl/.test(haystack) && /avalia|review|estrela|star/.test(haystack))
    );
  });
}
