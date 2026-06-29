import { LinkBioExtra } from '../../core/services/link-bio.service';
import { parseLinkBioExtra } from '../../core/utils/link-bio-clinic-normalize.util';

export interface LinkBioModalityFormRow {
  title: string;
  subtitle: string;
  available: boolean;
}

export interface LinkBioTeamFormRow {
  name: string;
  credential: string;
  notes: string;
  whatsapp: string;
}

export interface LinkBioSpeciesChipFormRow {
  label: string;
  active: boolean;
}

export interface LinkBioVetServiceCardFormRow {
  icon: string;
  title: string;
}

export interface LinkBioPedStepFormRow {
  title: string;
  subtitle: string;
}

export interface LinkBioPedAgeBandFormRow {
  emoji: string;
  title: string;
  range: string;
}

export interface LinkBioExtraFormState {
  heroTagline: string;
  councilRegistration: string;
  brandSubtitle: string;
  instagramUrl: string;
  conveniosLinhas: string[];
  modalities: LinkBioModalityFormRow[];
  equipe: LinkBioTeamFormRow[];
  vetExamResultsUrl: string;
  vetExamResultsLabel: string;
  vetExamResultsSubtitle: string;
  vetCoverKicker: string;
  vetWaCtaLabel: string;
  vetDocsSectionTitle: string;
  vetDocsIntro: string;
  speciesChips: LinkBioSpeciesChipFormRow[];
  vetServiceCards: LinkBioVetServiceCardFormRow[];
  pedCoverKicker: string;
  pedWaCtaLabel: string;
  pedDocsSectionTitle: string;
  pedDocsIntro: string;
  pedParentNoticeTitle: string;
  pedParentNoticeBody: string;
  pedFirstVisitSteps: LinkBioPedStepFormRow[];
  pedAgeBands: LinkBioPedAgeBandFormRow[];
}

export function createEmptyExtraFormState(): LinkBioExtraFormState {
  return {
    heroTagline: '',
    councilRegistration: '',
    brandSubtitle: '',
    instagramUrl: '',
    conveniosLinhas: [''],
    modalities: [],
    equipe: [],
    vetExamResultsUrl: '',
    vetExamResultsLabel: '',
    vetExamResultsSubtitle: '',
    vetCoverKicker: '',
    vetWaCtaLabel: '',
    vetDocsSectionTitle: '',
    vetDocsIntro: '',
    speciesChips: [],
    vetServiceCards: [],
    pedCoverKicker: '',
    pedWaCtaLabel: '',
    pedDocsSectionTitle: '',
    pedDocsIntro: '',
    pedParentNoticeTitle: '',
    pedParentNoticeBody: '',
    pedFirstVisitSteps: [],
    pedAgeBands: [],
  };
}

function trim(s: string): string {
  return (s ?? '').trim();
}

export function applyExtraToFormState(extra: unknown): LinkBioExtraFormState {
  const e = parseLinkBioExtra(extra);
  const conv = e.convenios?.filter((x) => trim(String(x))) ?? [];
  const mods = e.modalities ?? [];
  const team = e.team ?? [];
  const speciesChips = e.species_chips ?? [];
  const vetServiceCards = e.vet_service_cards ?? [];
  const pedSteps = e.ped_first_visit_steps ?? [];
  const pedAgeBands = e.ped_age_bands ?? [];

  return {
    heroTagline: e.hero_tagline ?? '',
    councilRegistration: e.council_registration ?? '',
    brandSubtitle: e.brand_subtitle ?? '',
    instagramUrl: e.instagram_url ?? '',
    conveniosLinhas: conv.length ? [...conv] : [''],
    modalities: mods.length
      ? mods.map((m) => ({
          title: m.title ?? '',
          subtitle: m.subtitle ?? '',
          available: m.available !== false,
        }))
      : [],
    equipe: team.length
      ? team.map((t) => ({
          name: t.name ?? '',
          credential: t.credential ?? '',
          notes: t.notes ?? '',
          whatsapp: t.whatsapp ?? '',
        }))
      : [],
    vetExamResultsUrl: typeof e.vet_exam_results_url === 'string' ? e.vet_exam_results_url : '',
    vetExamResultsLabel: typeof e.vet_exam_results_label === 'string' ? e.vet_exam_results_label : '',
    vetExamResultsSubtitle: typeof e.vet_exam_results_subtitle === 'string' ? e.vet_exam_results_subtitle : '',
    vetCoverKicker: e.layout_cover_kicker ?? '',
    vetWaCtaLabel: e.vet_wa_cta_label ?? '',
    vetDocsSectionTitle: e.vet_docs_section_title ?? '',
    vetDocsIntro: e.vet_docs_intro ?? '',
    speciesChips: speciesChips.length
      ? speciesChips.map((s) => ({ label: s.label ?? '', active: s.active !== false }))
      : [],
    vetServiceCards: vetServiceCards.length
      ? vetServiceCards.map((c) => ({ icon: c.icon ?? '', title: c.title ?? '' }))
      : [],
    pedCoverKicker: e.ped_cover_kicker ?? '',
    pedWaCtaLabel: e.ped_wa_cta_label ?? '',
    pedDocsSectionTitle: e.ped_docs_section_title ?? '',
    pedDocsIntro: e.ped_docs_intro ?? '',
    pedParentNoticeTitle: e.ped_parent_notice_title ?? '',
    pedParentNoticeBody: e.ped_parent_notice_body ?? '',
    pedFirstVisitSteps: pedSteps.length
      ? pedSteps.map((s) => ({ title: s.title ?? '', subtitle: s.subtitle ?? '' }))
      : [],
    pedAgeBands: pedAgeBands.length
      ? pedAgeBands.map((b) => ({ emoji: b.emoji ?? '', title: b.title ?? '', range: b.range ?? '' }))
      : [],
  };
}

export function buildExtraPayload(form: LinkBioExtraFormState, existingExtra: unknown): LinkBioExtra | null {
  const e = parseLinkBioExtra(existingExtra);
  const merged: Record<string, unknown> = Object.keys(e).length ? { ...(e as Record<string, unknown>) } : {};

  const setOrDelete = (key: string, value: unknown): void => {
    if (value === undefined || value === null || value === '') {
      delete merged[key];
    } else {
      merged[key] = value;
    }
  };

  setOrDelete('hero_tagline', trim(form.heroTagline) || undefined);
  setOrDelete('council_registration', trim(form.councilRegistration) || undefined);
  setOrDelete('brand_subtitle', trim(form.brandSubtitle) || undefined);
  setOrDelete('instagram_url', trim(form.instagramUrl) || undefined);

  const convenios = form.conveniosLinhas.map((x) => trim(x)).filter(Boolean);
  if (convenios.length) merged['convenios'] = convenios;
  else delete merged['convenios'];

  const modalities = form.modalities
    .filter((m) => trim(m.title))
    .map((m) => ({
      title: trim(m.title),
      subtitle: trim(m.subtitle) || undefined,
      available: m.available !== false,
    }));
  if (modalities.length) merged['modalities'] = modalities;
  else delete merged['modalities'];

  const team = form.equipe
    .filter((m) => trim(m.name))
    .map((m) => ({
      name: trim(m.name),
      credential: trim(m.credential) || undefined,
      notes: trim(m.notes) || undefined,
      whatsapp: trim(m.whatsapp) || undefined,
    }));
  if (team.length) merged['team'] = team;
  else delete merged['team'];

  const examUrlRaw = trim(form.vetExamResultsUrl);
  if (examUrlRaw) {
    merged['vet_exam_results_url'] = /^https?:\/\//i.test(examUrlRaw)
      ? examUrlRaw
      : `https://${examUrlRaw.replace(/^\/+/, '')}`;
    setOrDelete('vet_exam_results_label', trim(form.vetExamResultsLabel) || undefined);
    setOrDelete('vet_exam_results_subtitle', trim(form.vetExamResultsSubtitle) || undefined);
  } else {
    delete merged['vet_exam_results_url'];
    delete merged['vet_exam_results_label'];
    delete merged['vet_exam_results_subtitle'];
  }

  setOrDelete('layout_cover_kicker', trim(form.vetCoverKicker) || undefined);
  setOrDelete('vet_wa_cta_label', trim(form.vetWaCtaLabel) || undefined);
  setOrDelete('vet_docs_section_title', trim(form.vetDocsSectionTitle) || undefined);
  setOrDelete('vet_docs_intro', trim(form.vetDocsIntro) || undefined);

  const speciesChips = form.speciesChips.filter((s) => trim(s.label));
  if (speciesChips.length) {
    merged['species_chips'] = speciesChips.map((s) => ({ label: trim(s.label), active: s.active !== false }));
  } else delete merged['species_chips'];

  const vetServiceCards = form.vetServiceCards.filter((c) => trim(c.title));
  if (vetServiceCards.length) {
    merged['vet_service_cards'] = vetServiceCards.map((c) => ({
      icon: trim(c.icon) || '💉',
      title: trim(c.title),
    }));
  } else delete merged['vet_service_cards'];

  setOrDelete('ped_cover_kicker', trim(form.pedCoverKicker) || undefined);
  setOrDelete('ped_wa_cta_label', trim(form.pedWaCtaLabel) || undefined);
  setOrDelete('ped_docs_section_title', trim(form.pedDocsSectionTitle) || undefined);
  setOrDelete('ped_docs_intro', trim(form.pedDocsIntro) || undefined);
  setOrDelete('ped_parent_notice_title', trim(form.pedParentNoticeTitle) || undefined);
  setOrDelete('ped_parent_notice_body', trim(form.pedParentNoticeBody) || undefined);

  const pedSteps = form.pedFirstVisitSteps.filter((s) => trim(s.title));
  if (pedSteps.length) {
    merged['ped_first_visit_steps'] = pedSteps.map((s) => ({
      title: trim(s.title),
      subtitle: trim(s.subtitle),
    }));
  } else delete merged['ped_first_visit_steps'];

  const pedAgeBands = form.pedAgeBands.filter((b) => trim(b.title));
  if (pedAgeBands.length) {
    merged['ped_age_bands'] = pedAgeBands.map((b) => ({
      emoji: trim(b.emoji) || '👶',
      title: trim(b.title),
      range: trim(b.range),
    }));
  } else delete merged['ped_age_bands'];

  return Object.keys(merged).length ? (merged as LinkBioExtra) : null;
}
