import {
  afterNextRender,
  Component,
  Injector,
  OnDestroy,
  OnInit,
  inject,
  runInInjectionContext,
  Signal,
  ViewChild,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ProtocolosService,
  ProtocoloAttachment,
  ProtocoloDetalheData,
  ProtocoloEvent,
  ProtocoloField,
  ProtocoloSignature,
} from '../../core/services/protocolos.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonProtocoloDetalheComponent } from '../../shared/components/skeletons';
import { ZmEmptyStateComponent } from '../../shared/components/ui';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { AuthService } from '../../core/services/auth.service';
import { ClinicaService, ClinicaConfig } from '../../core/services/clinica.service';
import { PessoasService, Pessoa } from '../../core/services/pessoas.service';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import type { ZardBadgeTypeVariants } from '@/shared/components/badge/badge.variants';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardTabComponent, ZardTabGroupComponent } from '@/shared/components/tabs';
import { ZardAvatarComponent } from '@/shared/components/avatar/avatar.component';
import { ZARD_FORM_CONTROL_IMPORTS } from '@/shared/components/input';

/** Linha do documento de impressão: agrupamento dinâmico de campos do template. */
interface DocLinhaCampo {
  field: ProtocoloField;
  full: boolean;
}

interface DocLinha {
  campos: DocLinhaCampo[];
}

type ProtocoloAbaId = 'visao-geral' | 'respostas' | 'historico' | 'assinaturas' | 'comentarios' | 'impressao';

const PROTOCOLO_ABA_IDS: ProtocoloAbaId[] = [
  'visao-geral',
  'respostas',
  'historico',
  'assinaturas',
  'comentarios',
  'impressao',
];

@Component({
  selector: 'app-protocolos-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ZmSkeletonProtocoloDetalheComponent,
    ZmEmptyStateComponent,
    ZardButtonComponent,
    ZardBadgeComponent,
    ZardCardComponent,
    ZardTabComponent,
    ZardTabGroupComponent,
    ZardAvatarComponent,
    ...ZARD_FORM_CONTROL_IMPORTS,
  ],
  templateUrl: './protocolos-detalhe.component.html',
  styleUrl: './protocolos-detalhe.component.css',
})
export class ProtocolosDetalheComponent implements OnInit, OnDestroy {
  abaAtiva: ProtocoloAbaId = 'visao-geral';

  @ViewChild('protocoloTabGroup') protocoloTabGroup?: ZardTabGroupComponent;
  protocolo: ProtocoloDetalheData | null = null;
  showSkeleton!: Signal<boolean>;
  erro = '';
  comentarioEnviando = false;
  revisaoEnviando = false;
  gerandoPdf = false;
  gerandoDossie = false;

  revisaoFormVisible = false;
  revisaoAprovado = true;
  comentarioRevisao = '';
  novoComentario = '';

  /** Rascunho dos campos internos da equipe (modelos Estética). */
  staffDraft: Record<string, unknown> = {};
  staffSalvando = false;

  clinicaConfig: ClinicaConfig | null = null;
  pessoaCompleta: Pessoa | null = null;
  docHash = '';
  docCode = '';
  docVerifyUrl = '';
  docQrDataUrl = '';

  private readonly route = inject(ActivatedRoute);
  private readonly protocolosService = inject(ProtocolosService);
  private readonly loadingService = inject(LoadingService);
  private readonly toast = inject(ToastService);
  private readonly confirm = inject(ConfirmDialogService);
  private readonly auth = inject(AuthService);
  private readonly clinicaService = inject(ClinicaService);
  private readonly pessoasService = inject(PessoasService);
  private readonly injector = inject(Injector);

  get podeRevisarProtocolo(): boolean {
    return this.auth.hasPermission('submissions.approve');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.carregar(+id);
    this.carregarConfigClinica();
  }

  private carregarConfigClinica(): void {
    this.clinicaService.getConfiguracoes().subscribe({
      next: (cfg) => (this.clinicaConfig = cfg),
      error: () => {},
    });
  }

  private carregarPessoaCompleta(): void {
    const personId = this.protocolo?.person?.id;
    if (!personId) {
      this.pessoaCompleta = null;
      return;
    }
    this.pessoasService.get(personId).subscribe({
      next: (p) => (this.pessoaCompleta = p),
      error: () => (this.pessoaCompleta = null),
    });
  }

  private async gerarAutenticacaoDocumento(): Promise<void> {
    if (!this.protocolo) return;
    try {
      const id = this.protocolo.id;
      const numero = this.protocolo.protocol_number || String(id);
      const criadoEm = this.protocolo.created_at || '';
      const orgId = this.auth.getCurrentOrganizationId() || '';
      const seed = `${orgId}|${id}|${numero}|${criadoEm}`;
      const hash = await this.sha256Hex(seed);
      this.docHash = hash;
      this.docCode = hash.substring(0, 8).toUpperCase();
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      this.docVerifyUrl = origin ? `${origin}/verificar/${this.docCode}` : `/verificar/${this.docCode}`;
      const QR: any = await import('qrcode');
      const qrFn = QR.toDataURL ?? QR.default?.toDataURL;
      if (qrFn) {
        this.docQrDataUrl = await qrFn.call(QR.default ?? QR, this.docVerifyUrl, {
          margin: 0,
          width: 96,
          color: { dark: '#0f172a', light: '#ffffff' },
        });
      }
    } catch {
      this.docHash = '';
      this.docCode = '';
      this.docQrDataUrl = '';
    }
  }

  private async sha256Hex(input: string): Promise<string> {
    if (typeof crypto === 'undefined' || !crypto.subtle) {
      let h = 0;
      for (let i = 0; i < input.length; i++) {
        h = (h << 5) - h + input.charCodeAt(i);
        h |= 0;
      }
      return Math.abs(h).toString(16).padStart(8, '0').repeat(8);
    }
    const enc = new TextEncoder().encode(input);
    const buf = await crypto.subtle.digest('SHA-256', enc);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  ngOnDestroy(): void {
    this.aplicarClasseImpressaoSomenteDocumento(false);
  }

  carregar(id: number): void {
    this.erro = '';
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.protocolosService.get(id));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (p) => {
        this.protocolo = p;
        this.initStaffDraft();
        this.carregarPessoaCompleta();
        void this.gerarAutenticacaoDocumento();
        this.syncTabGroupFromAba();
      },
      error: () => {
        this.erro = 'Não foi possível carregar o protocolo.';
      },
    });
  }

  private initStaffDraft(): void {
    this.staffDraft = {};
    const p = this.protocolo;
    if (!p?.staff_fields?.length) {
      return;
    }
    const src = p.values ?? p.form_data ?? {};
    for (const f of p.staff_fields) {
      const k = f.name_key;
      if (Object.prototype.hasOwnProperty.call(src, k) && src[k] !== undefined && src[k] !== null) {
        this.staffDraft[k] = src[k] as unknown;
      } else {
        this.staffDraft[k] = f.type === 'checkbox' ? false : '';
      }
    }
  }

  temCamposEquipe(): boolean {
    return (this.protocolo?.staff_fields?.length ?? 0) > 0;
  }

  salvarRegistroEquipe(): void {
    if (!this.protocolo?.id || !this.temCamposEquipe()) {
      return;
    }
    this.staffSalvando = true;
    this.protocolosService.saveStaffValues(this.protocolo.id, { ...this.staffDraft }).subscribe({
      next: (p) => {
        this.protocolo = p;
        this.initStaffDraft();
        this.toast.success('Registro salvo', 'Dados da equipe atualizados no protocolo.');
      },
      error: () => {
        this.toast.error('Erro', 'Não foi possível salvar o registro da equipe.');
      },
      complete: () => {
        this.staffSalvando = false;
      },
    });
  }

  get isPending(): boolean {
    const s = this.protocolo?.status?.toLowerCase();
    return s === 'pending' || s === 'pendente';
  }

  statusLabel(): string {
    const s = this.protocolo?.status;
    if (!s) return '';
    const map: Record<string, string> = {
      pending: 'Pendente',
      approved: 'Aprovado',
      rejected: 'Reprovado',
    };
    return map[s.toLowerCase()] ?? s;
  }

  assinaturaStatusLabel(status: string | undefined): string {
    if (!status) return '—';
    const map: Record<string, string> = {
      pending: 'Pendente',
      approved: 'Aprovada',
      rejected: 'Reprovada',
      completed: 'Concluida',
      signed: 'Assinada',
    };
    return map[status.toLowerCase()] ?? status;
  }

  assinaturaCanalLabel(canal: string | undefined): string {
    if (!canal) return '—';
    const map: Record<string, string> = {
      web: 'Site',
      email: 'E-mail',
      whatsapp: 'WhatsApp',
    };
    return map[canal.toLowerCase()] ?? canal;
  }

  setAbaAtiva(aba: ProtocoloAbaId): void {
    this.abaAtiva = aba;
    this.aplicarClasseImpressaoSomenteDocumento(aba === 'impressao');
    this.syncTabGroupFromAba();
  }

  onZardTabChange(event: { index: number }): void {
    const aba = PROTOCOLO_ABA_IDS[event.index];
    if (aba) {
      this.abaAtiva = aba;
      this.aplicarClasseImpressaoSomenteDocumento(aba === 'impressao');
    }
  }

  private syncTabGroupFromAba(): void {
    runInInjectionContext(this.injector, () => {
      afterNextRender(() => {
        const index = PROTOCOLO_ABA_IDS.indexOf(this.abaAtiva);
        if (index >= 0) {
          this.protocoloTabGroup?.selectTabByIndex(index);
        }
      });
    });
  }

  tabLabelRespostas(): string {
    const n = this.camposRespostas().length;
    return n > 0 ? `Respostas (${n})` : 'Respostas';
  }

  tabLabelAssinaturas(): string {
    const n = this.protocolo?.signatures?.length ?? 0;
    return n > 0 ? `Assinaturas (${n})` : 'Assinaturas';
  }

  tabLabelComentarios(): string {
    const n = this.totalComentarios();
    return n > 0 ? `Comentários (${n})` : 'Comentários';
  }

  statusBadgeType(): ZardBadgeTypeVariants {
    const tone = this.statusBadgeTone();
    if (tone === 'red') return 'destructive';
    if (tone === 'green') return 'secondary';
    return 'outline';
  }

  statusBadgeClass(): string {
    const tone = this.statusBadgeTone();
    if (tone === 'amber') {
      return 'border-transparent bg-[color-mix(in_srgb,var(--c-warning)_14%,transparent)] text-[var(--c-warning)]';
    }
    if (tone === 'green') {
      return 'border-transparent bg-[color-mix(in_srgb,var(--c-success)_14%,transparent)] text-[var(--c-success)]';
    }
    return '';
  }

  imprimirFicha(): void {
    this.aplicarClasseImpressaoSomenteDocumento(this.abaAtiva === 'impressao');
    window.print();
  }

  private aplicarClasseImpressaoSomenteDocumento(ativo: boolean): void {
    if (typeof document === 'undefined') return;
    document.body.classList.toggle('print-document-only', ativo);
  }

  /** Baixa o PDF gerado no backend (DomPDF). */
  baixarFichaPdf(): void {
    if (!this.protocolo || this.gerandoPdf) return;
    this.gerandoPdf = true;
    const arquivo = this.nomeArquivoPdf();
    this.protocolosService.pdf(this.protocolo.id).subscribe({
      next: (blob) => {
        if (!this.eBlobPdf(blob)) {
          this.gerandoPdf = false;
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = arquivo;
        a.click();
        URL.revokeObjectURL(url);
        this.gerandoPdf = false;
      },
      error: (err) => {
        this.gerandoPdf = false;
        void this.tratarErroPdf(err);
      },
    });
  }

  /** Abre o PDF do backend em nova aba. */
  visualizarFichaPdf(): void {
    if (!this.protocolo || this.gerandoPdf) return;
    const previewWindow = window.open('', '_blank');
    if (!previewWindow) {
      this.toast.error('PDF', 'Permita pop-ups neste site para visualizar o PDF.');
      return;
    }
    this.escreverCarregandoPdf(previewWindow);
    this.gerandoPdf = true;
    this.protocolosService.pdf(this.protocolo.id).subscribe({
      next: (blob) => {
        if (!this.eBlobPdf(blob)) {
          if (!previewWindow.closed) previewWindow.close();
          this.gerandoPdf = false;
          return;
        }
        const url = URL.createObjectURL(blob);
        previewWindow.location.replace(url);
        setTimeout(() => URL.revokeObjectURL(url), 120_000);
        this.gerandoPdf = false;
      },
      error: (err) => {
        if (!previewWindow.closed) previewWindow.close();
        this.gerandoPdf = false;
        void this.tratarErroPdf(err);
      },
    });
  }

  private nomeArquivoPdf(): string {
    const p = this.protocolo;
    return `protocolo-${p?.protocol_number || p?.id || 'documento'}.pdf`;
  }

  private eBlobPdf(blob: Blob): boolean {
    if (blob.size === 0) {
      this.toast.error('PDF', 'O servidor retornou um arquivo vazio.');
      return false;
    }
    const type = (blob.type || '').toLowerCase();
    if (type.includes('json')) {
      void this.exibirErroPdfDeBlob(blob);
      return false;
    }
    return true;
  }

  private async exibirErroPdfDeBlob(blob: Blob): Promise<void> {
    try {
      const body = JSON.parse(await blob.text()) as { message?: string };
      this.toast.error('PDF', body.message?.trim() || 'Não foi possível gerar o PDF.');
    } catch {
      this.toast.error('PDF', 'Não foi possível gerar o PDF.');
    }
  }

  private async tratarErroPdf(err: unknown): Promise<void> {
    const fallback = 'Não foi possível obter o PDF do protocolo.';
    if (err instanceof HttpErrorResponse && err.error instanceof Blob) {
      await this.exibirErroPdfDeBlob(err.error);
      return;
    }
    this.toast.error('PDF', this.mensagemErroApi(err, fallback));
  }

  private escreverCarregandoPdf(janela: Window): void {
    janela.document.write(`
      <!doctype html>
      <html lang="pt-BR">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Carregando PDF...</title>
          <style>
            body {
              margin: 0;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: Roboto, Arial, sans-serif;
              background: #f8fafc;
              color: #0f172a;
            }
            .box {
              display: inline-flex;
              align-items: center;
              gap: 10px;
              background: #fff;
              border: 1px solid #e2e8f0;
              border-radius: 10px;
              padding: 14px 16px;
              font-weight: 600;
            }
            .spinner {
              width: 16px;
              height: 16px;
              border: 2px solid #cbd5e1;
              border-top-color: #7c3aed;
              border-radius: 50%;
              animation: spin 0.8s linear infinite;
            }
            @keyframes spin { to { transform: rotate(360deg); } }
          </style>
        </head>
        <body>
          <div class="box">
            <span class="spinner" aria-hidden="true"></span>
            <span>Carregando PDF...</span>
          </div>
        </body>
      </html>
    `);
    janela.document.close();
  }

  /** Nome da clínica/empresa atual para o cabeçalho do documento. */
  clinicaNome(): string {
    if (this.clinicaConfig?.name) return this.clinicaConfig.name;
    const org = this.auth.getCurrentOrganization();
    return (org?.name as string) || 'Documento';
  }

  /** Subtítulo abaixo do nome da clínica (nicho ou padrão). */
  clinicaSubtitulo(): string {
    const niche = this.clinicaConfig?.niche;
    if (niche) return niche;
    const org = this.auth.getCurrentOrganization();
    const niche2 = (org as { niche?: string } | null)?.niche;
    if (niche2) return niche2;
    return '';
  }

  get clinicaLogo(): string {
    return this.clinicaConfig?.logo_url || '';
  }

  get clinicaCnpj(): string {
    const raw = (this.clinicaConfig?.billing_document as string) || '';
    return this.formatarCnpj(raw);
  }

  get clinicaTelefone(): string {
    return this.formatarTelefone(this.clinicaConfig?.phone);
  }

  get clinicaEmail(): string {
    return (
      (this.clinicaConfig?.contact_email as string) ||
      (this.clinicaConfig?.notification_email as string) ||
      ''
    );
  }

  get clinicaEndereco(): string {
    const c = this.clinicaConfig;
    if (!c) return '';
    const a = c.address_data;
    if (a) {
      const ruaNum = a.logradouro && a.numero ? `${a.logradouro}, ${a.numero}` : a.logradouro || '';
      const partes: (string | null | undefined)[] = [
        ruaNum,
        a.complemento,
        a.bairro,
        a.cidade && a.uf ? `${a.cidade}/${a.uf}` : a.cidade,
        a.cep ? `CEP ${a.cep}` : null,
      ];
      const filtradas = partes.filter((s) => !!s && String(s).trim().length > 0);
      if (filtradas.length > 0) return filtradas.join(' · ');
    }
    return c.address || '';
  }

  formatarCpf(cpf: string | null | undefined): string {
    if (!cpf) return '';
    const d = String(cpf).replace(/\D/g, '');
    if (d.length !== 11) return String(cpf);
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  }

  formatarCnpj(cnpj: string | null | undefined): string {
    if (!cnpj) return '';
    const d = String(cnpj).replace(/\D/g, '');
    if (d.length === 11) return this.formatarCpf(d);
    if (d.length !== 14) return String(cnpj);
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
  }

  formatarTelefone(tel: string | null | undefined): string {
    if (!tel) return '';
    const d = String(tel).replace(/\D/g, '');
    if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return String(tel);
  }

  formatarSexo(s: string | null | undefined): string {
    if (!s) return '';
    if (s === 'F') return 'Feminino';
    if (s === 'M') return 'Masculino';
    if (s === 'O') return 'Outro';
    return s;
  }

  formatarDataCurta(d: string | null | undefined): string {
    if (!d) return '';
    const date = new Date(d);
    if (isNaN(date.getTime())) return d;
    return date.toLocaleDateString('pt-BR');
  }

  calcularIdade(birthDate: string | null | undefined): string {
    if (!birthDate) return '';
    const d = new Date(birthDate);
    if (isNaN(d.getTime())) return '';
    const hoje = new Date();
    let idade = hoje.getFullYear() - d.getFullYear();
    const m = hoje.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < d.getDate())) idade--;
    if (idade < 0) return '';
    return String(idade);
  }

  /** Título do documento (vem do nome do template do protocolo). */
  tituloDocumento(): string {
    return this.templateNome();
  }

  dataDocumentoPorExtenso(): string {
    const source = this.protocolo?.submitted_at || this.protocolo?.created_at;
    if (!source) return '—';
    const d = new Date(source);
    if (isNaN(d.getTime())) return source;
    return d.toLocaleDateString('pt-BR');
  }

  assinaturaDocumento(fieldKey: string): string | null {
    return this.assinaturaParaCampo(fieldKey)?.url ?? null;
  }

  /** Retorna o valor BRUTO armazenado para um campo (sem stringificar). */
  private rawValorCampo(field: ProtocoloField): unknown {
    const p = this.protocolo;
    if (!p) return null;
    const key = field.name_key;
    const keyed = p.values_keyed?.[key];
    if (keyed) {
      if ('value_json' in keyed && keyed.value_json != null) return keyed.value_json;
      if ('value_text' in keyed && keyed.value_text != null) return keyed.value_text;
    }
    const form = p.form_data as Record<string, unknown> | undefined;
    return form?.[key] ?? null;
  }

  /** Texto do campo já formatado para o documento. */
  valorCampoDocumento(field: ProtocoloField): string {
    const raw = this.rawValorCampo(field);
    if (raw == null) return '';
    if (Array.isArray(raw)) return raw.join(', ');
    if (field.type === 'checkbox' && (!field.options || field.options.length === 0)) {
      const t = String(raw).trim().toLowerCase();
      if (['true', '1', 'sim', 'yes', 'x', 'on'].includes(t)) return 'Sim';
      if (['false', '0', 'não', 'nao', 'no', 'off'].includes(t)) return 'Não';
    }
    if (field.type === 'date') {
      const d = new Date(String(raw));
      if (!isNaN(d.getTime())) return d.toLocaleDateString('pt-BR');
    }
    return String(raw).trim();
  }

  /** Para campos do tipo radio: marca a opção selecionada. */
  opcaoSelecionadaRadio(field: ProtocoloField, opcao: string): boolean {
    const v = this.valorCampoDocumento(field).trim().toLowerCase();
    return v === opcao.trim().toLowerCase();
  }

  /** Para campos checkbox com múltiplas opções: marca cada opção presente no valor. */
  opcaoSelecionadaCheckbox(field: ProtocoloField, opcao: string): boolean {
    const raw = this.rawValorCampo(field);
    if (raw == null) return false;
    const alvo = opcao.trim().toLowerCase();
    if (Array.isArray(raw)) {
      return raw.some((it) => String(it).trim().toLowerCase() === alvo);
    }
    const partes = String(raw).split(/[;,]/).map((p) => p.trim().toLowerCase());
    if (partes.includes(alvo)) return true;
    return String(raw).trim().toLowerCase() === alvo;
  }

  /** Booleano "marcado/sim" para checkbox sem opções (valor único true/false). */
  checkboxBooleanoMarcado(field: ProtocoloField): boolean {
    const v = this.valorCampoDocumento(field).trim().toLowerCase();
    return v === 'sim' || v === 'true' || v === '1' || v === 'x' || v === 'yes';
  }

  /** Lista de campos do template para serem renderizados no corpo do documento (exclui assinatura). */
  camposCorpoDocumento(): ProtocoloField[] {
    return this.camposRespostas().filter((f) => f.type !== 'signature');
  }

  /** Lista de campos de assinatura do template (ordenados). */
  camposAssinaturaDocumento(): ProtocoloField[] {
    return this.camposRespostas().filter((f) => f.type === 'signature');
  }

  /** Quantas colunas o campo ocupa na grade do documento (em unidades de 1/12). */
  larguraCampoDocumento(field: ProtocoloField): number {
    if (field.type === 'textarea') return 12;
    if (field.type === 'file') return 12;
    if (field.type === 'checkbox' && field.options && field.options.length > 0) return 12;
    if (field.type === 'radio' && field.options && field.options.length > 2) return 12;
    if (field.type === 'select' || field.type === 'date' || field.type === 'number') return 4;
    return 6;
  }

  /** Agrupa campos em linhas com até 12 colunas para o documento. */
  linhasDocumento(): DocLinha[] {
    const linhas: DocLinha[] = [];
    let atual: DocLinhaCampo[] = [];
    let usado = 0;
    for (const field of this.camposCorpoDocumento()) {
      const w = this.larguraCampoDocumento(field);
      if (usado + w > 12 && atual.length > 0) {
        linhas.push({ campos: atual });
        atual = [];
        usado = 0;
      }
      atual.push({ field, full: w === 12 });
      usado += w;
      if (usado >= 12) {
        linhas.push({ campos: atual });
        atual = [];
        usado = 0;
      }
    }
    if (atual.length > 0) linhas.push({ campos: atual });
    return linhas;
  }

  /** Classe utilitária para a largura de cada campo. */
  classeLarguraCampo(field: ProtocoloField): string {
    const w = this.larguraCampoDocumento(field);
    if (w === 12) return 'dp-cell dp-cell--full';
    if (w === 6) return 'dp-cell dp-cell--half';
    if (w === 4) return 'dp-cell dp-cell--third';
    return 'dp-cell';
  }

  /** Na versão documento, não renderiza campo vazio para evitar linhas sobrando. */
  mostrarCampoNoDocumento(field: ProtocoloField): boolean {
    const raw = this.rawValorCampo(field);
    if (raw == null) return false;
    if (Array.isArray(raw)) return raw.length > 0;
    if (typeof raw === 'string') return raw.trim().length > 0;
    return String(raw).trim().length > 0;
  }

  camposRespostas(): ProtocoloField[] {
    const fields = this.protocolo?.template?.fields;
    if (!fields?.length) return [];
    return [...fields].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  }

  anexoParaCampo(nameKey: string): ProtocoloAttachment | undefined {
    return this.protocolo?.attachments?.find((a) => a.field_key === nameKey);
  }

  /** Anexo com URL garantida (para o template da aba Respostas). */
  anexoParaDownload(nameKey: string): (ProtocoloAttachment & { url: string }) | null {
    const a = this.anexoParaCampo(nameKey);
    if (!a?.url) return null;
    return { ...a, url: a.url };
  }

  assinaturaParaCampo(nameKey: string): ProtocoloSignature | undefined {
    return this.protocolo?.signatures?.find((s) => s.field_key === nameKey);
  }

  /** Campos longos ocupam a linha inteira da grade (como na referência de editais). */
  respostaEmLinhaCompleta(field: ProtocoloField): boolean {
    return field.type === 'textarea';
  }

  /** Texto para exibição na aba Respostas (exceto anexo/assinatura, tratados no template). */
  textoRespostaCampo(field: ProtocoloField): string {
    if (field.type === 'file' || field.type === 'signature') return '';
    const raw = this.valorCampo(field);
    if (field.type === 'checkbox') {
      const n = raw.trim().toLowerCase();
      if (raw === '—' || raw === '') return '—';
      if (n === 'true' || n === '1' || n === 'sim') return 'Sim';
      if (n === 'false' || n === '0' || n === 'não' || n === 'nao') return 'Não';
    }
    return raw;
  }

  totalComentarios(): number {
    return this.eventosTimeline().filter((event) => event.type?.toLowerCase() === 'comment' || !!event.body).length;
  }

  templateNome(): string {
    if (!this.protocolo) return '—';
    if (this.protocolo.template_name) return this.protocolo.template_name;
    return (this.protocolo.template as { name?: string } | undefined)?.name ?? '—';
  }

  dataFormatada(val: string | undefined): string {
    if (!val) return '—';
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  abrirRevisao(aprovado: boolean): void {
    if (!this.podeRevisarProtocolo) return;
    const jaMostrandoMesmaDecisao = this.revisaoFormVisible && this.revisaoAprovado === aprovado;
    if (jaMostrandoMesmaDecisao) {
      this.revisaoFormVisible = false;
      return;
    }
    this.revisaoAprovado = aprovado;
    this.revisaoFormVisible = true;
    setTimeout(() => {
      document.getElementById('revisao_form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  fecharRevisao(): void {
    this.revisaoFormVisible = false;
    this.comentarioRevisao = '';
  }

  toggleFormRevisao(): void {
    if (!this.podeRevisarProtocolo) return;
    this.revisaoFormVisible = !this.revisaoFormVisible;
  }

  baixarPdf(): void {
    void this.baixarFichaPdf();
  }

  baixarDossie(): void {
    if (!this.protocolo || this.gerandoDossie) return;
    this.gerandoDossie = true;
    this.protocolosService.dossie(this.protocolo.id).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dossie-${this.protocolo!.protocol_number || this.protocolo!.id}.zip`;
        a.click();
        URL.revokeObjectURL(url);
        this.gerandoDossie = false;
      },
      error: () => {
        this.gerandoDossie = false;
        this.toast.error('Download', 'Não foi possível baixar o dossiê.');
      },
    });
  }

  async enviarRevisao(): Promise<void> {
    if (!this.protocolo || !this.podeRevisarProtocolo) return;
    if (this.revisaoAprovado === false) {
      const ok = await this.confirm.request({
        title: 'Reprovar protocolo?',
        message: 'Tem certeza que deseja reprovar este protocolo? O submetente pode ser notificado.',
        confirmLabel: 'Sim, reprovar',
        variant: 'danger',
      });
      if (!ok) return;
    }
    this.revisaoEnviando = true;
    this.protocolosService.aprovar(this.protocolo.id, this.revisaoAprovado, this.comentarioRevisao || undefined).subscribe({
      next: () => {
        this.revisaoEnviando = false;
        this.revisaoFormVisible = false;
        this.comentarioRevisao = '';
        if (this.revisaoAprovado) {
          this.toast.success('Protocolo aprovado', 'A revisão foi registrada.');
        } else {
          this.toast.warning('Protocolo reprovado', 'A revisão foi registrada.');
        }
        this.carregar(this.protocolo!.id);
      },
      error: (err) => {
        this.revisaoEnviando = false;
        this.erro = this.mensagemErroApi(err, 'Não foi possível enviar a revisão.');
        this.toast.error('Erro', this.erro);
      },
    });
  }

  enviarComentario(): void {
    if (!this.protocolo || !this.novoComentario.trim()) return;
    this.comentarioEnviando = true;
    this.protocolosService.comentario(this.protocolo.id, this.novoComentario.trim()).subscribe({
      next: () => {
        this.comentarioEnviando = false;
        this.novoComentario = '';
        this.toast.success('Comentário adicionado', 'Seu comentário foi publicado.');
        this.carregar(this.protocolo!.id);
      },
      error: (err) => {
        this.comentarioEnviando = false;
        this.erro = this.mensagemErroApi(err, 'Não foi possível adicionar o comentário.');
        this.toast.error('Erro', this.erro);
      },
    });
  }

  eventosTimeline(): ProtocoloEvent[] {
    const p = this.protocolo;
    if (!p) return [];
    if (p.events?.length) return p.events;
    return [
      {
        type: 'created',
        type_label: 'Protocolo criado',
        body: undefined,
        user: undefined,
        created_at: p.created_at,
      },
    ];
  }

  camposTemplate(): ProtocoloField[] {
    const fields = this.protocolo?.template?.fields;
    if (!fields?.length) return [];
    return fields.filter((f) => f.type !== 'file' && f.type !== 'signature');
  }

  valorCampo(field: ProtocoloField): string {
    const p = this.protocolo;
    if (!p) return '—';
    const key = field.name_key;
    const val = p.values_keyed?.[key] ?? (p.form_data as Record<string, unknown>)?.[key];
    if (val == null) return '—';
    if (typeof val === 'object' && 'value_text' in val && val.value_text != null) return String(val.value_text);
    if (typeof val === 'object' && 'value_json' in val) {
      const j = (val as { value_json?: unknown }).value_json;
      if (Array.isArray(j)) return j.join(', ');
      if (j != null) return String(j);
    }
    if (typeof val === 'string') return val;
    if (Array.isArray(val)) return val.join(', ');
    return String(val);
  }

  private mensagemErroApi(err: unknown, fallback: string): string {
    if (!(err instanceof HttpErrorResponse)) return fallback;
    const e = err.error as { message?: string; errors?: Record<string, string[]> } | null;
    if (e?.errors) {
      for (const msgs of Object.values(e.errors)) {
        if (msgs?.length) return msgs[0];
      }
    }
    if (typeof e?.message === 'string' && e.message.trim()) return e.message.trim();
    return fallback;
  }

  /** Destaque visual nas células de resposta (preenchido vs vazio). */
  campoRespostaEmDestaque(field: ProtocoloField): boolean {
    if (field.type === 'file') {
      return !!this.anexoParaDownload(field.name_key);
    }
    if (field.type === 'signature') {
      return !!this.assinaturaParaCampo(field.name_key);
    }
    const t = this.textoRespostaCampo(field);
    return t !== '—' && t.trim().length > 0;
  }

  /** Texto do banner superior na aba Respostas (padrão visual do protocolo). */
  mensagemBannerTopo(): string {
    const s = this.protocolo?.status?.toLowerCase();
    if (s === 'approved' || s === 'aprovado') {
      return 'Protocolo aprovado — registro concluído.';
    }
    if (s === 'rejected' || s === 'reprovado') {
      return 'Este protocolo foi reprovado na revisão.';
    }
    if (s === 'pending' || s === 'pendente') {
      return 'Aguardando revisão da equipe.';
    }
    return 'Detalhes do protocolo e respostas do formulário.';
  }

  dataBannerTopo(): string {
    const raw = this.protocolo?.approved_at || this.protocolo?.submitted_at || this.protocolo?.created_at;
    return raw ? this.formatarDataCurta(raw) : '';
  }

  statusBadgeTone(): 'green' | 'red' | 'amber' | 'gray' {
    const s = this.protocolo?.status?.toLowerCase();
    if (s === 'approved' || s === 'aprovado') return 'green';
    if (s === 'rejected' || s === 'reprovado') return 'red';
    if (s === 'pending' || s === 'pendente') return 'amber';
    return 'gray';
  }

  iniciaisNome(nome: string | null | undefined): string {
    if (!nome?.trim()) return '?';
    const partes = nome.trim().split(/\s+/).filter(Boolean);
    if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  }
}
