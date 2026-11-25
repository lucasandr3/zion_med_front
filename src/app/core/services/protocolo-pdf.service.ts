import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { fillSourcePdf, fetchImageBytes, type FillSourcePdfFieldValue } from '../utils/fill-source-pdf.util';
import { hasUsablePrintLayout, parsePrintLayout } from '../utils/print-layout.util';
import {
  resolveFieldRawValue,
  resolveValuesMap,
  synthesizeFieldsFromValues,
} from '../utils/protocolo-detalhe.util';
import { formatarDataBr, formatarSeDataIso } from '@/shared/utils/date';
import { AuthService } from './auth.service';
import { ClinicaService } from './clinica.service';
import { ContaPerfilService } from './conta-perfil.service';
import {
  ProtocolosService,
  type ProtocoloDetalheData,
  type ProtocoloField,
  type ProtocoloSignature,
} from './protocolos.service';
import { TemplatesService } from './templates.service';

/**
 * Gera o PDF da ficha preenchida com a mesma aparência do painel
 * (PDF original da clínica + print_layout), com fallback para o PDF do servidor.
 */
@Injectable({ providedIn: 'root' })
export class ProtocoloPdfService {
  private readonly protocolos = inject(ProtocolosService);
  private readonly templates = inject(TemplatesService);
  private readonly clinica = inject(ClinicaService);
  private readonly contaPerfil = inject(ContaPerfilService);
  private readonly auth = inject(AuthService);

  /**
   * Preferência: PDF com aparência da clínica.
   * Fallback: GET /protocols/{id}/pdf (genérico/arquivado).
   */
  async baixarPdfPreenchido(protocolo: ProtocoloDetalheData): Promise<Blob> {
    const branded = await this.gerarPdfComAparenciaClinica(protocolo);
    if (branded?.size) return branded;

    const server = await firstValueFrom(this.protocolos.pdf(protocolo.id));
    if (!server?.size) {
      throw new Error('PDF vazio ou indisponível');
    }
    const type = (server.type || '').toLowerCase();
    if (type.includes('json')) {
      throw new Error('Não foi possível gerar o PDF');
    }
    return type.includes('pdf') || !type
      ? new Blob([server], { type: 'application/pdf' })
      : server;
  }

  /** PDF preenchido no layout original da clínica (se houver mapa + fonte). */
  async gerarPdfComAparenciaClinica(protocolo: ProtocoloDetalheData): Promise<Blob | null> {
    const templateId = protocolo.template?.id ?? protocolo.template_id;
    const hasSourceHint =
      !!protocolo.template?.has_source_document ||
      !!protocolo.document_snapshot?.has_source_document;
    if (!templateId || !hasSourceHint) return null;

    let layout = parsePrintLayout(protocolo.template?.print_layout);
    let hasSource = !!protocolo.template?.has_source_document;
    try {
      const tpl = await firstValueFrom(this.templates.get(templateId));
      const live = parsePrintLayout(tpl.print_layout);
      if (hasUsablePrintLayout(live)) {
        layout = live;
      } else if (!hasUsablePrintLayout(layout)) {
        layout = parsePrintLayout(protocolo.document_snapshot?.print_layout);
      }
      hasSource = !!(tpl.has_source_document ?? hasSource ?? protocolo.document_snapshot?.has_source_document);
      if (protocolo.template) {
        protocolo.template.print_layout = layout;
        protocolo.template.has_source_document = hasSource;
      }
    } catch {
      if (!hasUsablePrintLayout(layout)) {
        layout = parsePrintLayout(protocolo.document_snapshot?.print_layout);
      }
      hasSource =
        hasSource ||
        !!(protocolo.document_snapshot?.has_source_document ?? protocolo.template?.has_source_document);
      if (protocolo.template) {
        protocolo.template.print_layout = layout;
        protocolo.template.has_source_document = hasSource;
      }
    }
    if (!hasSource || !layout || !hasUsablePrintLayout(layout)) return null;

    let sourceBlob: Blob;
    try {
      sourceBlob = await firstValueFrom(this.templates.downloadSourceDocument(templateId));
    } catch (err) {
      if (err instanceof HttpErrorResponse && err.status === 404 && protocolo.template) {
        protocolo.template.has_source_document = false;
      }
      return null;
    }

    const sourceBytes = new Uint8Array(await sourceBlob.arrayBuffer());
    const values = await this.montarValoresPrintLayout(protocolo);

    try {
      return await fillSourcePdf({ sourcePdfBytes: sourceBytes, layout, values });
    } catch (err) {
      console.warn('[protocolo-pdf] fill local falhou, tentando servidor', err);
      try {
        return await firstValueFrom(this.protocolos.pdf(protocolo.id, { fresh: true }));
      } catch {
        return null;
      }
    }
  }

  private async montarValoresPrintLayout(
    protocolo: ProtocoloDetalheData,
  ): Promise<FillSourcePdfFieldValue[]> {
    const fields = this.camposRespostas(protocolo);
    const out: FillSourcePdfFieldValue[] = [];
    const seen = new Set<string>();

    for (const field of fields) {
      const item: FillSourcePdfFieldValue = { name_key: field.name_key };
      const type = (field.type || '').toLowerCase();
      seen.add(field.name_key);

      if (type === 'signature') {
        const url = this.assinaturaParaCampo(protocolo, field.name_key)?.url ?? null;
        if (url) {
          const img = await fetchImageBytes(url);
          if (img) {
            item.imageBytes = img.bytes;
            item.imageMime = img.mime;
          }
        }
        out.push(item);
        continue;
      }

      if (type === 'checkbox' && (!field.options || field.options.length === 0)) {
        item.checked = this.checkboxBooleanoMarcado(protocolo, field);
        item.text = this.valorCampoDocumento(protocolo, field);
        out.push(item);
        continue;
      }

      item.text = this.valorCampoDocumento(protocolo, field);
      if (type === 'radio' || type === 'select') {
        const v = item.text.trim();
        item.selected_options = v ? [v] : [];
      } else if (type === 'checkbox' && field.options && field.options.length > 0) {
        item.selected_options = field.options.filter((opt) =>
          this.opcaoSelecionadaCheckbox(protocolo, field, opt),
        );
        item.checked = item.selected_options.length > 0;
      } else if (type === 'checkbox') {
        item.checked =
          this.checkboxBooleanoMarcado(protocolo, field) || item.text.trim().length > 0;
      }
      out.push(item);
    }

    for (const sig of protocolo.signatures || []) {
      const key = (sig.field_key || '').trim();
      if (!key || seen.has(key) || !sig.url) continue;
      const img = await fetchImageBytes(sig.url);
      if (!img) continue;
      out.push({ name_key: key, imageBytes: img.bytes, imageMime: img.mime });
      seen.add(key);
    }

    const logoImg = await this.resolverImagemLogoClinica();
    if (logoImg) {
      out.push({
        name_key: '__clinic_logo',
        imageBytes: logoImg.bytes,
        imageMime: logoImg.mime,
      });
    }

    const clinicSig = await this.resolverImagemAssinaturaClinica(protocolo);
    if (clinicSig) {
      out.push({
        name_key: '__clinic_signature',
        imageBytes: clinicSig.bytes,
        imageMime: clinicSig.mime,
      });
    }

    const auth = await this.gerarAutenticacaoDocumento(protocolo);
    if (auth.qrDataUrl) {
      const img = await fetchImageBytes(auth.qrDataUrl);
      if (img) {
        out.push({
          name_key: '__verify_qr',
          imageBytes: img.bytes,
          imageMime: img.mime,
        });
      }
    }
    if (auth.code) {
      out.push({ name_key: '__verify_code', text: auth.code });
    }

    out.push({ name_key: '__doc_date', text: this.formatarDataDocumento(protocolo) });
    return out;
  }

  private camposRespostas(protocolo: ProtocoloDetalheData): ProtocoloField[] {
    const snapshot =
      protocolo.document_snapshot?.fields_snapshot ??
      protocolo.template_version?.fields_snapshot;
    if (snapshot?.length) {
      return [...snapshot]
        .map((f) => ({
          name_key: f.name_key || '',
          label: f.label || '',
          type: f.type || 'text',
          sort_order: f.sort_order ?? 0,
          required: !!f.required,
          options: Array.isArray((f as ProtocoloField).options)
            ? (f as ProtocoloField).options
            : undefined,
        }))
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    }
    const fields = protocolo.template?.fields;
    if (fields?.length) {
      return [...fields].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    }
    const valuesMap = resolveValuesMap(protocolo);
    if (Object.keys(valuesMap).length) {
      return synthesizeFieldsFromValues(valuesMap);
    }
    return [];
  }

  private rawValorCampo(protocolo: ProtocoloDetalheData, field: ProtocoloField): unknown {
    return resolveFieldRawValue(resolveValuesMap(protocolo), field.name_key);
  }

  private valorCampoDocumento(protocolo: ProtocoloDetalheData, field: ProtocoloField): string {
    const raw = this.rawValorCampo(protocolo, field);
    if (raw == null) return '';
    if (Array.isArray(raw)) return raw.join(', ');
    if (field.type === 'checkbox' && (!field.options || field.options.length === 0)) {
      const t = String(raw).trim().toLowerCase();
      if (['true', '1', 'sim', 'yes', 'x', 'on'].includes(t)) return 'Sim';
      if (['false', '0', 'não', 'nao', 'no', 'off'].includes(t)) return 'Não';
    }
    if (field.type === 'date') {
      return formatarDataBr(String(raw)) || String(raw).trim();
    }
    return formatarSeDataIso(String(raw).trim());
  }

  private opcaoSelecionadaCheckbox(
    protocolo: ProtocoloDetalheData,
    field: ProtocoloField,
    opcao: string,
  ): boolean {
    const raw = this.rawValorCampo(protocolo, field);
    if (raw == null) return false;
    const alvo = opcao.trim().toLowerCase();
    if (Array.isArray(raw)) {
      return raw.some((it) => String(it).trim().toLowerCase() === alvo);
    }
    const partes = String(raw).split(/[;]/).map((p) => p.trim().toLowerCase());
    if (partes.includes(alvo)) return true;
    return String(raw).trim().toLowerCase() === alvo;
  }

  private checkboxBooleanoMarcado(protocolo: ProtocoloDetalheData, field: ProtocoloField): boolean {
    const v = this.valorCampoDocumento(protocolo, field).trim().toLowerCase();
    return v === 'sim' || v === 'true' || v === '1' || v === 'x' || v === 'yes';
  }

  private assinaturaParaCampo(
    protocolo: ProtocoloDetalheData,
    nameKey: string,
  ): ProtocoloSignature | undefined {
    return protocolo.signatures?.find((s) => s.field_key === nameKey);
  }

  private formatarDataDocumento(protocolo: ProtocoloDetalheData): string {
    const raw = protocolo.approved_at || protocolo.submitted_at || protocolo.created_at || '';
    const d = raw ? new Date(raw) : new Date();
    const base = Number.isNaN(d.getTime()) ? new Date() : d;
    const dd = String(base.getDate()).padStart(2, '0');
    const mm = String(base.getMonth() + 1).padStart(2, '0');
    return `${dd}/${mm}/${base.getFullYear()}`;
  }

  private async gerarAutenticacaoDocumento(
    protocolo: ProtocoloDetalheData,
  ): Promise<{ code: string; qrDataUrl: string }> {
    try {
      const hashFromProtocol = (protocolo.document_hash || '').trim().toLowerCase();
      const hashFromSignature = (protocolo.signatures ?? [])
        .map((s) => (s.document_hash || '').trim().toLowerCase())
        .find((h) => h.length >= 8);
      const hash = hashFromProtocol || hashFromSignature || '';
      if (!hash) return { code: '', qrDataUrl: '' };

      const code = hash.substring(0, 8).toUpperCase();
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const verifyUrl = origin ? `${origin}/verificar/${code}` : `/verificar/${code}`;
      const QR: any = await import('qrcode');
      const qrFn = QR.toDataURL ?? QR.default?.toDataURL;
      if (!qrFn) return { code, qrDataUrl: '' };
      const qrDataUrl = await qrFn.call(QR.default ?? QR, verifyUrl, {
        margin: 0,
        width: 96,
        color: { dark: '#0f172a', light: '#ffffff' },
      });
      return { code, qrDataUrl: qrDataUrl || '' };
    } catch {
      return { code: '', qrDataUrl: '' };
    }
  }

  private async blobToImageBytes(
    blob: Blob,
  ): Promise<{ bytes: Uint8Array; mime: 'png' | 'jpg' } | null> {
    if (!blob || blob.size < 8) return null;
    const type = (blob.type || '').toLowerCase();
    if (type.includes('json') || type.includes('html') || type.includes('text')) return null;
    const bytes = new Uint8Array(await blob.arrayBuffer());
    if (bytes.length < 8) return null;
    const mime: 'png' | 'jpg' =
      type.includes('jpeg') || type.includes('jpg') || (bytes[0] === 0xff && bytes[1] === 0xd8)
        ? 'jpg'
        : 'png';
    return { bytes, mime };
  }

  private async resolverImagemLogoClinica(): Promise<{
    bytes: Uint8Array;
    mime: 'png' | 'jpg';
  } | null> {
    try {
      const blob = await firstValueFrom(this.clinica.downloadLogo());
      const fromApi = await this.blobToImageBytes(blob);
      if (fromApi) return fromApi;
    } catch {
      // fallback URL
    }
    try {
      const cfg = await firstValueFrom(this.clinica.getConfiguracoes());
      const logoUrl = (cfg?.logo_url || '').trim();
      if (!logoUrl) return null;
      return fetchImageBytes(logoUrl);
    } catch {
      return null;
    }
  }

  private async resolverImagemAssinaturaClinica(
    protocolo: ProtocoloDetalheData,
  ): Promise<{ bytes: Uint8Array; mime: 'png' | 'jpg' } | null> {
    try {
      const blob = await firstValueFrom(this.contaPerfil.downloadElectronicSignature());
      const fromApi = await this.blobToImageBytes(blob);
      if (fromApi) return fromApi;
    } catch {
      // sem assinatura no perfil
    }

    const electronic = (this.auth.getUser()?.electronic_signature_url || '').trim();
    if (electronic) {
      const img = await fetchImageBytes(electronic);
      if (img) return img;
    }

    const professional = this.encontrarAssinaturaProfissional(protocolo);
    if (professional?.url) {
      const img = await fetchImageBytes(professional.url);
      if (img) return img;
    }

    return this.resolverImagemLogoClinica();
  }

  private encontrarAssinaturaProfissional(
    protocolo: ProtocoloDetalheData,
  ): ProtocoloSignature | undefined {
    const sigs = protocolo.signatures || [];
    const byKey = sigs.find((s) => (s.field_key || '').trim() === 'assinatura_profissional');
    if (byKey) return byKey;

    const fields = this.camposRespostas(protocolo);
    const positive = [
      'profissional',
      'responsavel',
      'responsável',
      'clinica',
      'clínica',
      'equipe',
      'medico',
      'médico',
    ];
    const negative = ['paciente', 'cliente', 'titular', 'acompanhante'];
    let best: ProtocoloSignature | undefined;
    let bestScore = Number.NEGATIVE_INFINITY;

    for (const field of fields.filter((f) => f.type === 'signature')) {
      const hay = `${field.name_key} ${field.label}`.toLowerCase();
      let score = 0;
      for (const w of positive) if (hay.includes(w)) score += 3;
      for (const w of negative) if (hay.includes(w)) score -= 5;
      if (score <= 0) continue;
      const sig = this.assinaturaParaCampo(protocolo, field.name_key);
      if (!sig?.url) continue;
      if (score > bestScore) {
        bestScore = score;
        best = sig;
      }
    }
    return best;
  }
}
