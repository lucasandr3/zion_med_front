import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LinkBioService, LinkBioState, LinkBioLink, LinkBioFormLink } from '../../core/services/link-bio.service';
import { ClinicaService } from '../../core/services/clinica.service';
import { LoadingOverlayComponent } from '../../componentes/ui/loading-overlay/loading-overlay.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

type Aba = 'links' | 'forms' | 'stats' | 'aparencia';

@Component({
  selector: 'app-pagina-link-bio',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingOverlayComponent],
  templateUrl: './link-bio.component.html',
  styleUrl: './link-bio.component.css',
})
export class LinkBioComponent implements OnInit {
  state: LinkBioState | null = null;
  carregando = false;
  erro = '';
  abaAtiva: Aba = 'links';

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
  aparenciaCoverColor = '#1a1a2e';
  aparenciaCoverMode: 'banner' | 'solid' | 'none' = 'banner';
  aparenciaShortDescription = '';
  aparenciaSpecialties = '';
  aparenciaFoundedYear: number | null = null;
  aparenciaContactEmail = '';
  aparenciaMapsUrl = '';
  enviandoCover = false;
  nomeArquivoCover = '';

  previewUrlSafe: SafeResourceUrl | null = null;

  private linkBioService = inject(LinkBioService);
  private clinicaService = inject(ClinicaService);
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

  get availableIcons(): Record<string, string> {
    return this.state?.available_icons ?? {};
  }

  get availableThemes(): Record<string, { label: string; primary: string }> {
    return this.state?.available_themes ?? {};
  }

  get metrics() {
    return this.state?.metrics;
  }

  get stats() {
    return this.state?.stats;
  }

  /** URL para o iframe de preview: mesma origem + rota /l/:slug (layout do próprio projeto). */
  private getPreviewUrl(cacheBust?: boolean): string | null {
    const slug = this.state?.clinic?.slug;
    if (!slug) return this.publicUrl || null;
    if (!isPlatformBrowser(this.platformId)) return this.publicUrl || null;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    if (!origin) return this.publicUrl || null;
    const base = `${origin}/l/${encodeURIComponent(slug)}`;
    return cacheBust ? `${base}?t=${Date.now()}` : base;
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
    this.carregando = true;
    this.linkBioService.get().subscribe({
      next: (s) => {
        this.state = s;
        const c = s.clinic;
        this.aparenciaPublicTheme = c.public_theme ?? '';
        this.aparenciaCoverColor = c.cover_color ?? '#1a1a2e';
        this.aparenciaCoverMode = (c.cover_mode as 'banner' | 'solid' | 'none') ?? 'banner';
        this.aparenciaShortDescription = c.short_description ?? '';
        this.aparenciaSpecialties = c.specialties ?? '';
        this.aparenciaFoundedYear = (c.founded_year as number | null) ?? null;
        this.aparenciaContactEmail = c.contact_email ?? '';
        this.aparenciaMapsUrl = c.maps_url ?? '';
        // Preview no iframe usa a rota do próprio app (/l/:slug) para exibir o layout real do projeto
        const previewUrl = this.getPreviewUrl(true);
        this.previewUrlSafe = previewUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(previewUrl) : null;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.erro = 'Não foi possível carregar o Link Bio.';
      },
    });
  }

  ativarAba(aba: Aba): void {
    this.abaAtiva = aba;
  }

  copiarLinkPrincipal(): void {
    if (!this.publicUrl) return;
    navigator.clipboard.writeText(this.publicUrl);
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
    this.linkBioService.createLink({ label: this.novoLabel.trim(), url: this.novoUrl.trim(), icon: this.novoIcon }).subscribe({
      next: () => {
        this.toggleFormNovo();
        this.carregar();
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
    const payload = {
      label: this.editLabel.trim() || link.label,
      url: this.editUrl.trim() || link.url,
      icon: this.editIcon || link.icon || 'link',
    };
    this.linkBioService.updateLink(link.id, payload).subscribe({
      next: () => {
        this.cancelarEdicao();
        this.carregar();
      },
    });
  }

  excluirLink(link: LinkBioLink): void {
    if (!confirm('Remover este link?')) return;
    this.linkBioService.deleteLink(link.id).subscribe(() => this.carregar());
  }

  copiarLinkForm(f: LinkBioFormLink): void {
    navigator.clipboard.writeText(f.public_url);
  }

  salvarAparencia(): void {
    if (!this.state) return;
    const payload = {
      public_theme: this.aparenciaPublicTheme,
      cover_color: this.aparenciaCoverColor || null,
      cover_mode: this.aparenciaCoverMode,
      short_description: this.aparenciaShortDescription || null,
      specialties: this.aparenciaSpecialties || null,
      founded_year: this.aparenciaFoundedYear || null,
      contact_email: this.aparenciaContactEmail || null,
      maps_url: this.aparenciaMapsUrl || null,
    };
    this.linkBioService.updateAparencia(payload).subscribe({
      next: (clinic) => {
        if (this.state) {
          this.state.clinic = { ...this.state.clinic, ...clinic };
        }
        this.atualizarPreviewUrl();
      },
    });
  }

  selecionarTema(themeKey: string): void {
    this.aparenciaPublicTheme = themeKey;
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
      },
      error: () => {
        this.enviandoCover = false;
      },
    });
  }

  // Helpers para estatísticas
  get diasClicks(): { date: string; label: string; count: number; percent: number }[] {
    const s = this.stats;
    if (!s) return [];
    const entries = Object.entries(s.clicks_per_day ?? {});
    if (!entries.length) return [];
    const max = Math.max(1, ...entries.map(([, v]) => v || 0));
    const dayLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    return entries.map(([date, count]) => {
      const d = new Date(date);
      const dow = d.getDay() === 0 ? 7 : d.getDay();
      const label = dayLabels[dow - 1] ?? '';
      return { date, label, count, percent: Math.round((count / max) * 100) };
    });
  }
}
