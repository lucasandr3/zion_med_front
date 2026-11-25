import {
  hasUsablePrintLayout,
  newPlacementUid,
  parsePrintLayout,
  type PdfLayoutFingerprint,
  type PdfPageFingerprint,
  type PrintLayout,
  type PrintLayoutPlacement,
} from './print-layout.util';

export type { PdfLayoutFingerprint, PdfPageFingerprint };

export interface PrintLayoutArchivedPayload {
  print_layout: PrintLayout;
  archived_at?: string | null;
  source_document_original_name?: string | null;
  source_document_size?: number | null;
}

export type ReuseCompareStatus = 'compatible' | 'page_count_mismatch' | 'dimension_mismatch' | 'empty';

export interface ReuseCompareResult {
  status: ReuseCompareStatus;
  message: string;
  copied: PrintLayoutPlacement[];
  skipped_pages: number[];
  page_count_prev: number;
  page_count_curr: number;
}

const REL_TOL = 0.005; // 0,5%

/** Monta fingerprint do PDF aberto no editor (pdf.js). */
export async function buildPdfFingerprint(pdfDoc: {
  numPages: number;
  getPage: (n: number) => Promise<{ getViewport: (o: { scale: number }) => { width: number; height: number }; rotate?: number }>;
}): Promise<PdfLayoutFingerprint> {
  const pages: PdfPageFingerprint[] = [];
  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const vp = page.getViewport({ scale: 1 });
    pages.push({
      width: Math.round(vp.width * 100) / 100,
      height: Math.round(vp.height * 100) / 100,
      rotation: Number(page.rotate ?? 0) || 0,
    });
  }
  return { page_count: pdfDoc.numPages, pages };
}

export function parseArchivedPrintLayout(raw: unknown): PrintLayoutArchivedPayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const rec = raw as Record<string, unknown>;
  const layout = parsePrintLayout(rec['print_layout'] ?? raw);
  if (!hasUsablePrintLayout(layout)) return null;
  return {
    print_layout: layout!,
    archived_at: typeof rec['archived_at'] === 'string' ? rec['archived_at'] : null,
    source_document_original_name:
      typeof rec['source_document_original_name'] === 'string' ? rec['source_document_original_name'] : null,
    source_document_size:
      typeof rec['source_document_size'] === 'number' ? rec['source_document_size'] : null,
  };
}

export function fingerprintFromLayout(layout: PrintLayout | null | undefined): PdfLayoutFingerprint | null {
  if (!layout || typeof layout !== 'object') return null;
  const fp = (layout as PrintLayout & { pdf_fingerprint?: PdfLayoutFingerprint }).pdf_fingerprint;
  if (!fp || !Array.isArray(fp.pages) || fp.pages.length === 0) return null;
  return {
    page_count: Number(fp.page_count) || fp.pages.length,
    pages: fp.pages.map((p) => ({
      width: Number(p.width) || 0,
      height: Number(p.height) || 0,
      rotation: Number(p.rotation) || 0,
    })),
  };
}

function dimsClose(a: number, b: number): boolean {
  if (a <= 0 || b <= 0) return false;
  const d = Math.abs(a - b);
  return d <= 1 || d / Math.max(a, b) <= REL_TOL;
}

/**
 * Compara fingerprints e, se compatível, clona placements com novos uids.
 * Nunca reposiciona caixas quando dimensões divergem.
 */
export function planReuseFromArchived(
  archived: PrintLayoutArchivedPayload,
  currentFingerprint: PdfLayoutFingerprint,
  knownNameKeys?: Set<string>,
): ReuseCompareResult {
  const prev = fingerprintFromLayout(archived.print_layout);
  const pageCountPrev = prev?.page_count ?? Math.max(0, ...archived.print_layout.placements.map((p) => p.page + 1));
  const pageCountCurr = currentFingerprint.page_count;

  if (!hasUsablePrintLayout(archived.print_layout)) {
    return {
      status: 'empty',
      message: 'Não há mapeamento arquivado utilizável.',
      copied: [],
      skipped_pages: [],
      page_count_prev: pageCountPrev,
      page_count_curr: pageCountCurr,
    };
  }

  if (prev && prev.page_count !== pageCountCurr) {
    return {
      status: 'page_count_mismatch',
      message: `O PDF atual tem ${pageCountCurr} página(s); o mapa anterior tinha ${prev.page_count}. Reaproveitamento bloqueado.`,
      copied: [],
      skipped_pages: [],
      page_count_prev: prev.page_count,
      page_count_curr: pageCountCurr,
    };
  }

  if (prev) {
    for (let i = 0; i < Math.min(prev.pages.length, currentFingerprint.pages.length); i++) {
      const a = prev.pages[i];
      const b = currentFingerprint.pages[i];
      if (
        a.rotation !== b.rotation ||
        !dimsClose(a.width, b.width) ||
        !dimsClose(a.height, b.height)
      ) {
        return {
          status: 'dimension_mismatch',
          message: `Dimensões/rotação da página ${i + 1} divergem do PDF anterior. Não movemos campos automaticamente — mapeie ou ajuste manualmente.`,
          copied: [],
          skipped_pages: [i],
          page_count_prev: prev.page_count,
          page_count_curr: pageCountCurr,
        };
      }
    }
  } else if (pageCountPrev > 0 && pageCountPrev !== pageCountCurr) {
    return {
      status: 'page_count_mismatch',
      message: `O PDF atual tem ${pageCountCurr} página(s); o mapa anterior referenciava ${pageCountPrev}. Reaproveitamento bloqueado.`,
      copied: [],
      skipped_pages: [],
      page_count_prev: pageCountPrev,
      page_count_curr: pageCountCurr,
    };
  }

  const copied: PrintLayoutPlacement[] = [];
  for (const p of archived.print_layout.placements) {
    if (p.page < 0 || p.page >= pageCountCurr) continue;
    if (knownNameKeys && !p.name_key.startsWith('__') && !knownNameKeys.has(p.name_key)) {
      // Mantém a caixa, mas o editor avisa via lista; ainda copiamos para revisão.
    }
    copied.push({
      ...p,
      uid: newPlacementUid(),
    });
  }

  return {
    status: 'compatible',
    message:
      prev == null
        ? `${copied.length} área(s) do mapa anterior. Sem fingerprint salvo — revise posições com cuidado.`
        : `${copied.length} área(s) reaproveitadas. Revise antes de publicar.`,
    copied,
    skipped_pages: [],
    page_count_prev: pageCountPrev || pageCountCurr,
    page_count_curr: pageCountCurr,
  };
}

export function withFingerprint(layout: PrintLayout, fp: PdfLayoutFingerprint): PrintLayout & { pdf_fingerprint: PdfLayoutFingerprint } {
  return { ...layout, pdf_fingerprint: fp };
}
