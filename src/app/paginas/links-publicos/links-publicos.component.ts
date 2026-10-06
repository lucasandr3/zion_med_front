import {
  Component,
  OnInit,
  inject,
  Signal,
  ChangeDetectionStrategy,
  signal,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  effect,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinksPublicosService, LinkPublico } from '../../core/services/links-publicos.service';
import { TemplatesService } from '../../core/services/templates.service';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonLinksPublicosComponent } from '../../shared/components/skeletons';
import { ZmPaginationComponent } from '../../shared/components/ui';
import { GestgoSkeletonComponent } from '@/shared/components/skeleton/skeleton.component';
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
  public_enabled?: boolean;
  submission_count?: number;
  last_submission_at?: string | null;
  updated_at?: string;
}

type NordModalElement = HTMLElement & {
  showModal: () => void;
  close: (returnValue?: string) => void;
  open: boolean;
  shadowRoot: ShadowRoot | null;
};

const CENTER_STYLE_ATTR = 'data-gestgo-modal-center';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-pagina-links-publicos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  imports: [
    RouterLink,
    ZmSkeletonLinksPublicosComponent,
    ZmPaginationComponent,
    GestgoSkeletonComponent,
  ],
  templateUrl: './links-publicos.component.html',
  styleUrl: './links-publicos.component.css',
})
export class LinksPublicosComponent implements OnInit {
  readonly templates = signal<LinkPublicoItem[]>([]);
  readonly meta = signal<{ current_page: number; last_page: number; per_page: number; total: number }>({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0,
  });
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly erro = signal('');
  readonly copiedTemplateId = signal<number | null>(null);
  readonly desativandoId = signal<number | null>(null);
  readonly qrAberto = signal(false);
  readonly qrCarregando = signal(false);
  readonly qrDataUrl = signal('');
  readonly qrItem = signal<LinkPublicoItem | null>(null);

  private readonly qrModalRef = viewChild<ElementRef<NordModalElement>>('qrModal');
  private linksService = inject(LinksPublicosService);
  private templatesService = inject(TemplatesService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);

  constructor() {
    effect(() => {
      const shouldOpen = this.qrAberto();
      const el = this.qrModalRef()?.nativeElement;
      if (!el) return;
      queueMicrotask(() => {
        this.ensureModalCentered(el);
        if (shouldOpen && !el.open) {
          el.showModal();
        } else if (!shouldOpen && el.open) {
          el.close();
        }
      });
    });
  }

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
          public_enabled: t.public_enabled !== false,
          submission_count: t.submission_count,
          last_submission_at: t.last_submission_at ?? null,
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

  iconeNordTemplate(item: LinkPublicoItem): string {
    const cat = (item.category_label ?? item.name ?? '').toLowerCase();
    if (cat.includes('anamnese')) return 'file-patient-records';
    if (cat.includes('cadastro') || cat.includes('ficha')) return 'file-notes';
    if (cat.includes('retorno') || cat.includes('avalia')) return 'file-treatment-plan';
    if (cat.includes('consent')) return 'interface-checked-circle';
    return 'file-generic';
  }

  urlCurta(url: string): string {
    if (!url) return '';
    try {
      const parsed = new URL(url);
      const path = `${parsed.host}${parsed.pathname}`.replace(/\/$/, '');
      return path.length > 28 ? `${path.slice(0, 25)}...` : path;
    } catch {
      return url.length > 28 ? `${url.slice(0, 25)}...` : url;
    }
  }

  ultimaRespostaLabel(item: LinkPublicoItem): string {
    const iso = item.last_submission_at;
    if (!iso) return '—';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '—';
    const diffMs = Date.now() - date.getTime();
    const diffMin = Math.floor(diffMs / 60_000);
    if (diffMin < 1) return 'agora';
    if (diffMin < 60) return `${diffMin} min`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours} h`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays} d`;
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
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

  async desativarLinkPublico(item: LinkPublicoItem, event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    if (this.desativandoId() === item.id) return;

    const nome = item.name?.trim() || 'este formulário';
    const ok = await this.confirm.request({
      title: 'Desativar link público?',
      messageBefore: 'O formulário ',
      emphasis: nome,
      messageAfter: ' deixará de ser acessível pelo link atual. Você poderá publicar novamente depois.',
      confirmLabel: 'Sim, desativar',
      variant: 'danger',
    });
    if (!ok) return;

    this.desativandoId.set(item.id);
    this.templatesService.desativarLink(item.id).subscribe({
      next: () => {
        this.desativandoId.set(null);
        this.templates.update((list) => list.filter((t) => t.id !== item.id));
        this.meta.update((m) => ({ ...m, total: Math.max(0, m.total - 1) }));
        this.toast.success('Link desativado', 'O formulário público foi removido desta lista.');
      },
      error: () => {
        this.desativandoId.set(null);
        this.toast.error('Erro ao desativar', 'Não foi possível desativar o link deste formulário.');
      },
    });
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

  copiarLinkQr(): void {
    const item = this.qrItem();
    if (!item?.public_url) return;
    this.copiarLink(item.id, item.public_url);
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
    this.qrDataUrl.set('');
  }

  /** Nord modal ancora no topo; centraliza via shadow DOM (igual confirm-dialog). */
  private ensureModalCentered(el: NordModalElement): void {
    const root = el.shadowRoot;
    if (!root || root.querySelector(`style[${CENTER_STYLE_ATTR}]`)) return;
    const style = document.createElement('style');
    style.setAttribute(CENTER_STYLE_ATTR, '');
    style.textContent = `
      .n-modal-backdrop {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-sizing: border-box !important;
        min-block-size: 100% !important;
        padding-block: var(--n-space-l) !important;
      }
      .n-modal {
        margin-block: 0 !important;
      }
    `;
    root.appendChild(style);
  }
}
