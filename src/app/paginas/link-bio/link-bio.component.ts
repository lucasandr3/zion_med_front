import { Component, OnInit, inject, PLATFORM_ID, Signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  LinkBioService,
  LinkBioState,
  LinkBioLink,
  LinkBioFormLink,
  LinkBioExtra,
  LinkBioLayoutModel,
  LinkBioStats,
  LinkBioClinic,
} from '../../core/services/link-bio.service';
import { ClinicaService } from '../../core/services/clinica.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { normalizeThemeKey } from '../../core/services/user-appearance.sync';
import { environment } from '../../../environments/environment';

type Aba = 'links' | 'forms' | 'stats' | 'aparencia' | 'modelos' | 'conteudoExtra';

/** Linha do formulário — modalidades (modelo 2). */
interface LinkBioModalityFormRow {
  title: string;
  subtitle: string;
  available: boolean;
}

/** Linha do formulário — equipe (modelo 5). */
interface LinkBioTeamFormRow {
  name: string;
  credential: string;
  notes: string;
  whatsapp: string;
}

const LINK_BIO_PREVIEW_SESSION_KEY = 'zm_link_bio_preview';

/** Mesmo limite do Laravel `max:2048` (kilobytes) na rota de upload. */
const LINK_BIO_FOTO_PROFISSIONAL_MAX_BYTES = 2048 * 1024;

@Component({
  selector: 'app-pagina-link-bio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ZmSkeletonListComponent],
  templateUrl: './link-bio.component.html',
  styleUrl: './link-bio.component.css',
})
export class LinkBioComponent implements OnInit {
  state: LinkBioState | null = null;
  showSkeleton!: Signal<boolean>;
  erro = '';
  abaAtiva: Aba = 'modelos';

  // Form novo link
  mostrarFormNovo = false;
  novoLabel = '';
  novoUrl = '';
  novoIcon = 'link';

  // Edição inline
  editandoId: number | null = null;
  editLabel = '';
  editUrl = '';
  editIcon = 'link';

  // Aparência
  aparenciaPublicTheme = '';
  aparenciaCustomAccent = '#c9a84c';
  aparenciaCoverColor = '#1a1a2e';
  aparenciaCoverMode: 'banner' | 'solid' | 'none' = 'banner';
  aparenciaModelo: LinkBioLayoutModel = 1;
  aparenciaShortDescription = '';
  aparenciaSpecialties = '';
  aparenciaFoundedYear: number | null = null;
  aparenciaContactEmail = '';
  aparenciaMapsUrl = '';
  enviandoCover = false;
  enviandoFotoProfissionalLinkBio = false;
  nomeArquivoFotoProfissional = '';
  salvandoExtra = false;
  salvandoNovoLink = false;
  salvandoEdicaoId: number | null = null;
  salvandoAparencia = false;
  salvandoModelos = false;
  excluindoLinkId: number | null = null;
  atualizandoStatsRodape = false;

  /** Formulário: dados extras para layouts temáticos (persistidos em `link_bio_extra`). */
  extraHeroTagline = '';
  extraCouncilRegistration = '';
  extraBrandSubtitle = '';
  extraInstagramUrl = '';
  /** Um campo por linha; linhas vazias são ignoradas ao salvar. */
  extraConveniosLinhas: string[] = [''];
  extraModalidades: LinkBioModalityFormRow[] = [];
  extraEquipe: LinkBioTeamFormRow[] = [];
  nomeArquivoCover = '';

  previewUrlSafe: SafeResourceUrl | null = null;

  private linkBioService = inject(LinkBioService);
  private loadingService = inject(LoadingService);
  private clinicaService = inject(ClinicaService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);

  get links(): LinkBioLink[] {
    return this.state?.links ?? [];
  }

  get forms(): LinkBioFormLink[] {
    return this.state?.forms ?? [];
  }

  get publicUrl(): string {
    return this.state?.public_url ?? '';
  }

  /**
   * Link aberto por &quot;Ver página&quot;. Em dev, se o `public_url` da API tiver outro origin
   * que o painel (ex.: FRONTEND_URL=zion_med.test e `ng serve` em localhost:4200), abre o SPA
   * no host atual para a página pública chamar a mesma API e as métricas baterem.
   */
  get publicUrlAbrirNoNavegador(): string {
    const canonical = this.publicUrl;
    const slug = this.state?.clinic?.slug;
    if (!canonical || !slug) return canonical;
    if (environment.production || !isPlatformBrowser(this.platformId)) {
      return canonical;
    }
    try {
      const spaOrigin = window.location.origin;
      const linkOrigin = new URL(canonical).origin;
      if (linkOrigin !== spaOrigin) {
        return `${spaOrigin}/l/${encodeURIComponent(slug)}`;
      }
    } catch {
      /* URL inválida — mantém canonical */
    }
    return canonical;
  }

  /**
   * Página pública em modo totem/recepção (`?kiosk=1`): só lista de links, ideal para tablet.
   * Mesma regra de origem que {@link publicUrlAbrirNoNavegador} em desenvolvimento.
   */
  get recepcaoKioskUrl(): string {
    const base = this.publicUrlAbrirNoNavegador;
    if (!base?.trim()) return '';
    try {
      const u = new URL(base);
      u.searchParams.set('kiosk', '1');
      return u.toString();
    } catch {
      const sep = base.includes('?') ? '&' : '?';
      return `${base}${sep}kiosk=1`;
    }
  }

  copiarLinkRecepcao(): void {
    const url = this.recepcaoKioskUrl;
    if (!url) return;
    navigator.clipboard.writeText(url).then(
      () => this.toast.success('Copiado', 'Link do modo recepção na área de transferência.'),
      () => this.toast.error('Não foi possível copiar', 'Tente selecionar o link manualmente.')
    );
  }

  get availableIcons(): Record<string, string> {
    return this.state?.available_icons ?? {};
  }

  get availableThemes(): Record<string, { label: string; primary: string }> {
    return this.state?.available_themes ?? {};
  }

  /** Mesma ordem que Configurações → Tema visual (`Object.keys`, não ordenação alfabética do keyvalue). */
  get themeKeys(): string[] {
    return Object.keys(this.availableThemes);
  }

  get metrics() {
    return this.state?.metrics;
  }

  get stats(): LinkBioStats {
    return (
      this.state?.stats ?? {
        clicks_per_day: {},
        views_per_day: {},
        most_clicked_link: null,
        peak_day_label: null,
        click_breakdown: [],
      }
    );
  }

  /** Iframe de prévia visível (fora de Modelos e Conteúdo extra). */
  get previewVisivel(): boolean {
    return this.abaAtiva !== 'modelos' && this.abaAtiva !== 'conteudoExtra';
  }

  /** Prévia na coluna direita (lg+) — Links, Formulários e Aparência (faixa de abas em cima; conteúdo | prévia). */
  get previewAoLado(): boolean {
    return (
      this.previewVisivel &&
      (this.abaAtiva === 'links' || this.abaAtiva === 'forms' || this.abaAtiva === 'aparencia')
    );
  }

  /** IDs dos modelos para grade de prévia na aba Modelos. */
  readonly previewModelIds: readonly LinkBioLayoutModel[] = [1, 2, 3, 4, 5, 6, 7, 8];

  /** Nome exibido de cada layout (substitui “Modelo N”). */
  readonly linkBioModelLabels: Record<LinkBioLayoutModel, string> = {
    1: 'Genérico atual',
    2: 'Profissional solo',
    3: 'Estética e beleza',
    4: 'Odontologia',
    5: 'Multi profissionais',
    6: 'Clínica veterinária',
    7: 'Pediatria',
    8: 'Nutricionista',
  };

  /** Subtítulo curto nos cards de modelo (layout). */
  readonly linkBioModelSubtitles: Record<LinkBioLayoutModel, string> = {
    1: 'Layout multipropósito',
    2: 'Perfil + contato direto',
    3: 'Agendamento + portfólio',
    4: 'Convênios + serviços',
    5: 'Equipe em destaque',
    6: 'Pets + agendamento',
    7: 'Agenda + info para pais',
    8: 'Planos + consulta online',
  };

  /** Modelo salvo na API (para barra “alterações não salvas”). */
  modeloPersistido: LinkBioLayoutModel = 1;

  get modeloDirty(): boolean {
    return this.state != null && this.aparenciaModelo !== this.modeloPersistido;
  }

  get layoutPublicadoLabel(): string {
    return this.linkBioModelLabels[this.modeloPersistido] ?? '—';
  }

  get layoutSelecionadoLabel(): string {
    return this.linkBioModelLabels[this.aparenciaModelo] ?? '—';
  }

  get conteudoExtraApareceNoPublico(): boolean {
    return this.modeloPersistido !== 1;
  }

  /** Bust de cache dos iframes da aba Modelos. */
  private previewModelsTimestamp = Date.now();

  /** URL para o iframe de preview: mesma origem + rota /l/:slug (layout do próprio projeto). */
  private getPreviewUrl(cacheBust?: boolean): string | null {
    const slug = this.state?.clinic?.slug;
    if (!slug) return this.publicUrl || null;
    if (!isPlatformBrowser(this.platformId)) return this.publicUrl || null;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    if (!origin) return this.publicUrl || null;
    const base = `${origin}/l/${encodeURIComponent(slug)}?preview=1`;
    return cacheBust ? `${base}&t=${Date.now()}` : base;
  }

  /** Prévia pública com modelo forçado (aba Modelos). */
  modelPreviewUrlSafe(model: LinkBioLayoutModel): SafeResourceUrl | null {
    const slug = this.state?.clinic?.slug;
    if (!slug || !isPlatformBrowser(this.platformId)) return null;
    const origin = window.location.origin;
    const u = `${origin}/l/${encodeURIComponent(slug)}?preview=1&preview_model=${model}&t=${this.previewModelsTimestamp}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(u);
  }

  /** Grava rascunho do formulário extra na sessão para os iframes de prévia (?preview=1). */
  syncDraftToSessionForPreviews(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      const payload = this.montarLinkBioExtraPayload();
      if (!payload) {
        sessionStorage.removeItem(LINK_BIO_PREVIEW_SESSION_KEY);
      } else {
        sessionStorage.setItem(LINK_BIO_PREVIEW_SESSION_KEY, JSON.stringify({ link_bio_extra: payload }));
      }
    } catch {
      /* ignore */
    }
    this.previewModelsTimestamp = Date.now();
  }

  private trim(s: string): string {
    return (s ?? '').trim();
  }

  /** Monta o objeto salvo na API a partir do formulário. */
  private montarLinkBioExtraPayload(): LinkBioExtra | null {
    const o: LinkBioExtra = {};
    if (this.trim(this.extraHeroTagline)) o.hero_tagline = this.trim(this.extraHeroTagline);
    if (this.trim(this.extraCouncilRegistration)) o.council_registration = this.trim(this.extraCouncilRegistration);
    if (this.trim(this.extraBrandSubtitle)) o.brand_subtitle = this.trim(this.extraBrandSubtitle);
    if (this.trim(this.extraInstagramUrl)) o.instagram_url = this.trim(this.extraInstagramUrl);
    const convenios = this.extraConveniosLinhas.map((x) => this.trim(x)).filter(Boolean);
    if (convenios.length) o.convenios = convenios;
    const modalities = this.extraModalidades
      .filter((m) => this.trim(m.title))
      .map((m) => ({
        title: this.trim(m.title),
        subtitle: this.trim(m.subtitle) || undefined,
        available: m.available !== false,
      }));
    if (modalities.length) o.modalities = modalities;
    const team = this.extraEquipe
      .filter((m) => this.trim(m.name))
      .map((m) => ({
        name: this.trim(m.name),
        credential: this.trim(m.credential) || undefined,
        notes: this.trim(m.notes) || undefined,
        whatsapp: this.trim(m.whatsapp) || undefined,
      }));
    if (team.length) o.team = team;
    return Object.keys(o).length ? o : null;
  }

  private aplicarExtraNoFormulario(extra: unknown): void {
    const e =
      extra && typeof extra === 'object' && !Array.isArray(extra) ? (extra as LinkBioExtra) : null;
    this.extraHeroTagline = e?.hero_tagline ?? '';
    this.extraCouncilRegistration = e?.council_registration ?? '';
    this.extraBrandSubtitle = e?.brand_subtitle ?? '';
    this.extraInstagramUrl = e?.instagram_url ?? '';
    const conv = e?.convenios?.filter((x) => this.trim(String(x))) ?? [];
    this.extraConveniosLinhas = conv.length ? [...conv] : [''];
    const mods = e?.modalities ?? [];
    this.extraModalidades = mods.length
      ? mods.map((m) => ({
          title: m.title ?? '',
          subtitle: m.subtitle ?? '',
          available: m.available !== false,
        }))
      : [];
    const team = e?.team ?? [];
    this.extraEquipe = team.length
      ? team.map((t) => ({
          name: t.name ?? '',
          credential: t.credential ?? '',
          notes: t.notes ?? '',
          whatsapp: t.whatsapp ?? '',
        }))
      : [];
  }

  adicionarConvenioLinha(): void {
    this.extraConveniosLinhas.push('');
  }

  removerConvenioLinha(index: number): void {
    if (this.extraConveniosLinhas.length <= 1) {
      this.extraConveniosLinhas = [''];
      return;
    }
    this.extraConveniosLinhas.splice(index, 1);
  }

  adicionarModalidade(): void {
    this.extraModalidades.push({ title: '', subtitle: '', available: true });
  }

  removerModalidade(index: number): void {
    this.extraModalidades.splice(index, 1);
  }

  adicionarMembroEquipe(): void {
    this.extraEquipe.push({ name: '', credential: '', notes: '', whatsapp: '' });
  }

  removerMembroEquipe(index: number): void {
    this.extraEquipe.splice(index, 1);
  }

  salvarConteudoExtra(): void {
    if (!this.state) return;
    this.salvandoExtra = true;
    const link_bio_extra = this.montarLinkBioExtraPayload();
    this.linkBioService.updateAparencia({ link_bio_extra }).subscribe({
      next: (clinic) => {
        this.salvandoExtra = false;
        if (this.state) {
          this.state.clinic = { ...this.state.clinic, ...clinic };
        }
        if (isPlatformBrowser(this.platformId)) {
          try {
            sessionStorage.removeItem(LINK_BIO_PREVIEW_SESSION_KEY);
          } catch {
            /* ignore */
          }
        }
        this.previewModelsTimestamp = Date.now();
        this.atualizarPreviewUrl();
        this.toast.success('Conteúdo extra salvo', 'As informações foram atualizadas.');
      },
      error: () => {
        this.salvandoExtra = false;
        this.toast.error('Erro ao salvar', 'Não foi possível salvar o conteúdo extra.');
      },
    });
  }

  /** Atualiza o iframe de preview (ex.: após salvar aparência). */
  private atualizarPreviewUrl(): void {
    const url = this.getPreviewUrl(true);
    this.previewUrlSafe = url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  }

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.linkBioService.get());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (s) => this.aplicarEstadoLinkBio(s),
      error: () => {
        this.erro = 'Não foi possível carregar o Link Bio.';
      },
    });
  }

  private aplicarEstadoLinkBio(s: LinkBioState): void {
    this.state = s;
    const c = s.clinic;
    this.aparenciaPublicTheme = c.public_theme
      ? normalizeThemeKey(String(c.public_theme))
      : '';
    this.aparenciaCustomAccent = this.normalizarHex(c.accent_hex) ?? '#c9a84c';
    this.aparenciaCoverColor = c.cover_color ?? '#1a1a2e';
    this.aparenciaCoverMode = (c.cover_mode as 'banner' | 'solid' | 'none') ?? 'banner';
    this.aparenciaModelo = (c.link_bio_model as LinkBioLayoutModel) ?? 1;
    this.modeloPersistido = this.aparenciaModelo;
    this.aparenciaShortDescription = c.short_description ?? '';
    this.aparenciaSpecialties = c.specialties ?? '';
    this.aparenciaFoundedYear = (c.founded_year as number | null) ?? null;
    this.aparenciaContactEmail = c.contact_email ?? '';
    this.aparenciaMapsUrl = c.maps_url ?? '';
    this.aplicarExtraNoFormulario(c.link_bio_extra);
    this.syncDraftToSessionForPreviews();
    const previewUrl = this.getPreviewUrl(true);
    this.previewUrlSafe = previewUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(previewUrl) : null;
  }

  /** Rodapé da aba Links: salvar novo link ou edição em andamento. */
  get linkBioFooterLinksSaveDisabled(): boolean {
    if (this.salvandoNovoLink || this.salvandoEdicaoId !== null) return true;
    if (this.mostrarFormNovo) {
      return !this.novoLabel.trim() || !this.novoUrl.trim();
    }
    if (this.editandoId !== null) {
      return !this.editLabel.trim() || !this.editUrl.trim();
    }
    return true;
  }

  salvarFooterAbaLinks(): void {
    if (this.mostrarFormNovo) {
      this.salvarNovoLink();
      return;
    }
    if (this.editandoId !== null) {
      const lnk = this.links.find((l) => l.id === this.editandoId);
      if (lnk) {
        this.salvarEdicao(lnk);
      }
    }
  }

  atualizarDadosEstatisticas(): void {
    if (this.atualizandoStatsRodape) return;
    this.atualizandoStatsRodape = true;
    this.linkBioService.get().subscribe({
      next: (s) => {
        this.atualizandoStatsRodape = false;
        this.aplicarEstadoLinkBio(s);
        this.toast.success('Dados atualizados', 'Métricas e estatísticas foram recarregadas.');
      },
      error: () => {
        this.atualizandoStatsRodape = false;
        this.toast.error('Erro', 'Não foi possível atualizar os dados.');
      },
    });
  }

  ativarAba(aba: Aba): void {
    this.abaAtiva = aba;
    if (aba === 'modelos') {
      this.syncDraftToSessionForPreviews();
    }
  }

  selecionarModelo(m: LinkBioLayoutModel): void {
    this.aparenciaModelo = m;
  }

  copiarLinkPrincipal(): void {
    if (!this.publicUrl) return;
    navigator.clipboard.writeText(this.publicUrl).then(
      () => this.toast.success('Link copiado', 'Você já pode colar e compartilhar.'),
      () => this.toast.error('Não foi possível copiar', 'Tente novamente.')
    );
  }

  toggleFormNovo(): void {
    this.mostrarFormNovo = !this.mostrarFormNovo;
    if (!this.mostrarFormNovo) {
      this.novoLabel = '';
      this.novoUrl = '';
      this.novoIcon = 'link';
    }
  }

  salvarNovoLink(): void {
    if (!this.novoLabel.trim() || !this.novoUrl.trim()) return;
    this.salvandoNovoLink = true;
    this.linkBioService.createLink({ label: this.novoLabel.trim(), url: this.novoUrl.trim(), icon: this.novoIcon }).subscribe({
      next: () => {
        this.salvandoNovoLink = false;
        this.toggleFormNovo();
        this.carregar();
        this.toast.success('Link adicionado', 'O novo link foi salvo.');
      },
      error: () => {
        this.salvandoNovoLink = false;
        this.toast.error('Erro', 'Não foi possível adicionar o link.');
      },
    });
  }

  iniciarEdicao(link: LinkBioLink): void {
    this.editandoId = link.id;
    this.editLabel = link.label;
    this.editUrl = link.url;
    this.editIcon = link.icon ?? 'link';
  }

  cancelarEdicao(): void {
    this.editandoId = null;
    this.editLabel = '';
    this.editUrl = '';
    this.editIcon = 'link';
  }

  salvarEdicao(link: LinkBioLink): void {
    if (!this.editandoId) return;
    this.salvandoEdicaoId = link.id;
    const payload = {
      label: this.editLabel.trim() || link.label,
      url: this.editUrl.trim() || link.url,
      icon: this.editIcon || link.icon || 'link',
    };
    this.linkBioService.updateLink(link.id, payload).subscribe({
      next: () => {
        this.salvandoEdicaoId = null;
        this.cancelarEdicao();
        this.carregar();
        this.toast.success('Link atualizado', 'As alterações foram salvas.');
      },
      error: () => {
        this.salvandoEdicaoId = null;
        this.toast.error('Erro', 'Não foi possível salvar o link.');
      },
    });
  }

  async excluirLink(link: LinkBioLink): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Remover este link?',
      messageBefore: 'O link ',
      emphasis: link.label,
      messageAfter: ' será removido da página pública.',
      confirmLabel: 'Sim, remover',
      variant: 'danger',
    });
    if (!ok) return;
    this.excluindoLinkId = link.id;
    this.linkBioService.deleteLink(link.id).subscribe({
      next: () => {
        this.excluindoLinkId = null;
        this.carregar();
        this.toast.success('Link removido', `${link.label} foi excluído.`);
      },
      error: () => {
        this.excluindoLinkId = null;
        this.toast.error('Erro', 'Não foi possível remover o link.');
      },
    });
  }

  copiarLinkForm(f: LinkBioFormLink): void {
    navigator.clipboard.writeText(f.public_url);
  }

  salvarAparencia(): void {
    if (!this.state) return;
    this.salvandoAparencia = true;
    const isCustom = this.aparenciaPublicTheme === 'custom';
    const payload: Partial<LinkBioClinic> & Record<string, unknown> = {
      public_theme: this.aparenciaPublicTheme,
      cover_color: this.aparenciaCoverColor || null,
      cover_mode: this.aparenciaCoverMode,
      short_description: this.aparenciaShortDescription || null,
      specialties: this.aparenciaSpecialties || null,
      founded_year: this.aparenciaFoundedYear || null,
      contact_email: this.aparenciaContactEmail || null,
      maps_url: this.aparenciaMapsUrl || null,
      accent_hex: isCustom ? this.aparenciaCustomAccent : null,
    };
    this.linkBioService.updateAparencia(payload).subscribe({
      next: (clinic) => {
        this.salvandoAparencia = false;
        if (this.state) {
          this.state.clinic = { ...this.state.clinic, ...clinic };
        }
        this.atualizarPreviewUrl();
        this.toast.success('Aparência salva', 'As configurações visuais foram atualizadas.');
      },
      error: () => {
        this.salvandoAparencia = false;
        this.toast.error('Erro ao salvar', 'Não foi possível salvar a aparência.');
      },
    });
  }

  /** Apenas o layout publicado (dados extras ficam na aba Conteúdo extra). */
  salvarModelos(): void {
    if (!this.state) return;
    if (!this.modeloDirty) return;
    this.salvandoModelos = true;
    this.linkBioService.updateAparencia({ link_bio_model: this.aparenciaModelo }).subscribe({
      next: (clinic) => {
        this.salvandoModelos = false;
        if (this.state) {
          this.state.clinic = { ...this.state.clinic, ...clinic };
        }
        this.modeloPersistido = this.aparenciaModelo;
        this.syncDraftToSessionForPreviews();
        this.previewModelsTimestamp = Date.now();
        this.atualizarPreviewUrl();
        this.toast.success('Modelo publicado', 'O layout do link público foi atualizado.');
      },
      error: () => {
        this.salvandoModelos = false;
        this.toast.error('Erro ao salvar', 'Não foi possível salvar o modelo.');
      },
    });
  }

  selecionarTema(themeKey: string): void {
    this.aparenciaPublicTheme = themeKey === '' ? '' : normalizeThemeKey(themeKey);
  }

  /** Normaliza hex no formato #RRGGBB (ou #RGB → #RRGGBB). Retorna null se inválido. */
  private normalizarHex(value: string | null | undefined): string | null {
    const v = (value ?? '').trim();
    if (!v) return null;
    const short = /^#([0-9a-f]{3})$/i.exec(v);
    if (short) {
      const [r, g, b] = short[1]!.split('');
      return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
    }
    const long = /^#([0-9a-f]{6})$/i.exec(v);
    if (long) return v.toLowerCase();
    return null;
  }

  onCustomAccentChange(value: string): void {
    const hex = this.normalizarHex(value);
    if (hex) this.aparenciaCustomAccent = hex;
  }

  onSelecionarCoverImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.state?.clinic?.name) return;
    this.enviandoCover = true;
    this.nomeArquivoCover = file.name;
    this.clinicaService.uploadCoverImage(file, this.state.clinic.name).subscribe({
      next: (clinic) => {
        if (this.state) {
          this.state.clinic = { ...this.state.clinic, ...clinic };
        }
        this.aparenciaCoverMode = 'banner';
        this.atualizarPreviewUrl();
        this.enviandoCover = false;
        this.toast.success('Capa enviada', 'A imagem de capa foi atualizada.');
      },
      error: () => {
        this.enviandoCover = false;
        this.toast.error('Erro no upload', 'Não foi possível enviar a imagem.');
      },
    });
  }

  onSelecionarFotoProfissionalLinkBio(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.state) return;

    if (file.size > LINK_BIO_FOTO_PROFISSIONAL_MAX_BYTES) {
      const mb = (file.size / (1024 * 1024)).toFixed(1);
      this.toast.error(
        'Arquivo muito grande',
        `Esta imagem tem cerca de ${mb} MB. O tamanho máximo permitido é 2 MB. Comprima ou redimensione a foto e tente novamente.`
      );
      input.value = '';
      return;
    }

    this.enviandoFotoProfissionalLinkBio = true;
    this.nomeArquivoFotoProfissional = file.name;
    this.linkBioService.uploadProfessionalPhoto(file).subscribe({
      next: (clinic) => {
        if (this.state) {
          this.state.clinic = { ...this.state.clinic, ...clinic };
        }
        this.atualizarPreviewUrl();
        this.previewModelsTimestamp = Date.now();
        this.enviandoFotoProfissionalLinkBio = false;
        this.toast.success('Foto enviada', 'A foto do profissional foi atualizada no Link Bio.');
      },
      error: (err: unknown) => {
        this.enviandoFotoProfissionalLinkBio = false;
        const detalhe = this.mensagemErroUploadFotoProfissional(err);
        this.toast.error('Não foi possível enviar a foto', detalhe);
      },
    });
    input.value = '';
  }

  /** Mensagem legível para falhas de upload (tamanho, tipo, limite do servidor). */
  private mensagemErroUploadFotoProfissional(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 413) {
        return 'O servidor recusou o arquivo por ser muito grande. Use uma imagem de até 2 MB ou comprima o arquivo antes de enviar.';
      }
      const body = err.error as
        | { message?: string; errors?: Record<string, string[] | string> }
        | null
        | undefined;
      const fromErrors = body?.errors?.['professional_photo'];
      if (Array.isArray(fromErrors) && fromErrors.length) {
        return String(fromErrors[0]).trim();
      }
      if (typeof fromErrors === 'string' && fromErrors.trim()) {
        return fromErrors.trim();
      }
      if (body?.errors && typeof body.errors === 'object') {
        const first = Object.values(body.errors).flat()[0];
        if (typeof first === 'string' && first.trim()) {
          return first.trim();
        }
      }
      if (typeof body?.message === 'string' && body.message.trim()) {
        const m = body.message.trim();
        if (/greater than|too large|exceeds|413/i.test(m)) {
          return 'A foto é muito grande. O tamanho máximo permitido é 2 MB. Reduza a imagem e tente novamente.';
        }
        return m;
      }
    }
    return 'Verifique sua conexão e tente de novo. Se o arquivo for grande, use no máximo 2 MB.';
  }

  // Helpers para estatísticas
  get diasClicks(): { date: string; label: string; count: number; percent: number; ghost: boolean }[] {
    const s = this.stats;
    if (!s) return [];
    const entries = Object.entries(s.clicks_per_day ?? {});
    if (!entries.length) return [];
    entries.sort(([a], [b]) => a.localeCompare(b));
    const counts = entries.map(([, v]) => Number(v) || 0);
    const maxVal = Math.max(...counts);
    const dayLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    return entries.map(([date, countVal]) => {
      const c = Number(countVal) || 0;
      const d = this.parseStatsDate(date);
      const dow = d.getDay() === 0 ? 7 : d.getDay();
      const label = dayLabels[dow - 1] ?? date;
      /** Sem cliques em nenhum dia: barras “fantasma” só para o gráfico não sumir. */
      const ghost = maxVal === 0;
      const percent = ghost ? 18 : Math.round((c / maxVal) * 100);
      return { date, label, count: c, percent, ghost };
    });
  }

  /** Evita deslocar o dia da semana com fuso em strings YYYY-MM-DD. */
  private parseStatsDate(date: string): Date {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return new Date(`${date}T12:00:00`);
    }
    return new Date(date);
  }
}
