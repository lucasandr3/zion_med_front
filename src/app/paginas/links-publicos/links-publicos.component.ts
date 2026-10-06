import { Component, OnInit, inject, Signal, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinksPublicosService, LinkPublico } from '../../core/services/links-publicos.service';
import { ToastService } from '../../core/services/toast.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonLinksPublicosComponent } from '../../shared/components/skeletons';
import { ZmEmptyStateComponent, ZmPaginationComponent } from '../../shared/components/ui';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardMenuImports } from '../../shared/components/menu/menu.imports';
import { ZardSkeletonComponent } from '@/shared/components/skeleton/skeleton.component';
import {
  downloadPublicFormQrPng,
  getOrCreatePublicFormQrDataUrl,
  prefetchPublicFormQr,
} from '../../core/utils/public-form-qr.util';

interface LinkPublicoItem {
  id: number;
  name: string;
  category_label?: string;
  public_url: string;
  public_token?: string;
  submission_count?: number;
  updated_at?: string;
}

@Component({
  selector: 'app-pagina-links-publicos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ZmSkeletonLinksPublicosComponent,
    ZmEmptyStateComponent,
    ZmPaginationComponent,
    ZardBadgeComponent,
    ZardButtonComponent,
    ZardCardComponent,
    ZardSkeletonComponent,
    ...ZardMenuImports,
  ],
  templateUrl: './links-publicos.component.html',
  styleUrl: './links-publicos.component.css',
})
export class LinksPublicosComponent implements OnInit {
  readonly templates = signal<LinkPublicoItem[]>([]);
  readonly meta = signal<{ current_page: number; last_page: number; per_page: number; total: number }>({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly erro = signal('');
  readonly copiedTemplateId = signal<number | null>(null);
  readonly qrAberto = signal(false);
  readonly qrCarregando = signal(false);
  readonly qrDataUrl = signal('');
  readonly qrItem = signal<LinkPublicoItem | null>(null);
  readonly menuItem = signal<LinkPublicoItem | null>(null);

  private linksService = inject(LinksPublicosService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);

  ngOnInit(): void {
    this.carregar(1);
  }

  carregar(page = 1): void {
    this.erro.set('');
    this.listaPronta.set(false);
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
      this.linksService.list({ page, per_page: this.meta().per_page }),
    );
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: ({ data: list, meta }) => {
        this.listaPronta.set(true);
        this.meta.set(meta);
        const base = typeof window !== 'undefined' ? window.location.origin : '';
        this.templates.set(list.map((t: LinkPublico) => ({
          id: t.template_id ?? t.id,
          name: t.template_name ?? t.name ?? '',
          category_label: t.category_label,
          public_url: t.public_url ?? (t.public_token ? `${base}/f/${t.public_token}` : ''),
          public_token: t.public_token,
          submission_count: t.submission_count,
          updated_at: t.updated_at ?? t.created_at,
        })));
        for (const item of this.templates()) {
          prefetchPublicFormQr(item.public_url);
        }
      },
      error: () => {
        this.listaPronta.set(true);
        this.erro.set('Não foi possível carregar os formulários públicos.');
        this.toast.error('Erro ao carregar', this.erro());
      },
    });
  }

  contagemTexto(): string {
    const { total, current_page, last_page, per_page } = this.meta();
    if (total === 0) return 'Nenhum formulário público';
    if (last_page <= 1) {
      return `${total} ${total === 1 ? 'formulário público' : 'formulários públicos'}`;
    }
    const inicio = (current_page - 1) * per_page + 1;
    const fim = Math.min(current_page * per_page, total);
    return `${inicio}–${fim} de ${total} formulários públicos`;
  }

  iconeTemplate(item: LinkPublicoItem): string {
    const cat = (item.category_label ?? item.name ?? '').toLowerCase();
    if (cat.includes('anamnese')) return 'clinical_notes';
    if (cat.includes('cadastro') || cat.includes('ficha')) return 'assignment';
    if (cat.includes('retorno') || cat.includes('avalia')) return 'stethoscope';
    if (cat.includes('consent')) return 'verified_user';
    return 'description';
  }

  metaLinha(item: LinkPublicoItem): string | null {
    const partes: string[] = [];
    if (item.submission_count != null) {
      const n = item.submission_count;
      partes.push(`${n} ${n === 1 ? 'resposta' : 'respostas'}`);
    }
    if (item.updated_at) {
      const rel = this.formatRelativeDate(item.updated_at);
      if (rel) partes.push(rel);
    }
    return partes.length ? partes.join(' · ') : null;
  }

  copiarLink(templateId: number, url: string): void {
    if (!url) {
      this.toast.warning('Link indisponível', 'Este formulário ainda não possui URL pública.');
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          this.copiedTemplateId.set(templateId);
          this.toast.success('Link copiado', 'Você já pode colar e enviar para o paciente.');
          setTimeout(() => {
            if (this.copiedTemplateId() === templateId) {
              this.copiedTemplateId.set(null);
            }
          }, 2000);
        })
        .catch(() => {
          this.toast.error('Não foi possível copiar', 'Tente novamente ou use a opção abrir.');
        });
      return;
    }
    this.toast.error('Navegador incompatível', 'Seu navegador não permite copiar automaticamente.');
  }

  async abrirQr(item: LinkPublicoItem): Promise<void> {
    if (!item.public_url) {
      this.toast.warning('Link indisponível', 'Este formulário ainda não possui URL pública.');
      return;
    }
    this.qrItem.set(item);
    this.qrAberto.set(true);
    this.qrCarregando.set(true);
    this.qrDataUrl.set('');
    try {
      this.qrDataUrl.set(await getOrCreatePublicFormQrDataUrl(item.public_url));
    } catch {
      this.toast.error('QR code', 'Não foi possível gerar o QR code deste link.');
      this.fecharQr();
    } finally {
      this.qrCarregando.set(false);
    }
  }

  baixarQr(): void {
    if (!this.qrDataUrl() || !this.qrItem()) return;
    downloadPublicFormQrPng(this.qrDataUrl(), this.qrItem()!.name);
    this.toast.success('Download iniciado', 'O QR code foi salvo no seu dispositivo.');
  }

  async baixarQrDireto(item: LinkPublicoItem): Promise<void> {
    if (!item.public_url) {
      this.toast.warning('Link indisponível', 'Este formulário ainda não possui URL pública.');
      return;
    }
    try {
      const dataUrl = await getOrCreatePublicFormQrDataUrl(item.public_url);
      downloadPublicFormQrPng(dataUrl, item.name);
      this.toast.success('Download iniciado', 'O QR code foi salvo no seu dispositivo.');
    } catch {
      this.toast.error('QR code', 'Não foi possível baixar o QR code deste link.');
    }
  }

  fecharQr(): void {
    this.qrAberto.set(false);
    this.qrCarregando.set(false);
    this.qrItem.set(null);
  }

  private formatRelativeDate(iso: string): string {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    const diffMs = Date.now() - date.getTime();
    const diffMin = Math.floor(diffMs / 60_000);
    if (diffMin < 1) return 'atualizado agora';
    if (diffMin < 60) return `atualizado há ${diffMin} min`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `atualizado há ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'atualizado há 1 dia';
    if (diffDays < 30) return `atualizado há ${diffDays} dias`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return 'atualizado há 1 mês';
    return `atualizado há ${diffMonths} meses`;
  }
}
