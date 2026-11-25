import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import { ServicosService, type ClinicServiceItem } from '../../core/services/servicos.service';
import { TemplatesService, type Template } from '../../core/services/templates.service';
import { LinksPublicosService, type LinkPublico } from '../../core/services/links-publicos.service';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { ListSkeletonComponent } from '../../shared/components/list-skeleton/list-skeleton.component';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
import { absoluteMediaUrl } from '../../core/utils/absolute-media-url';

const AVATAR_COLORS = ['#12b886', '#3b82f6', '#a855f7', '#f97316', '#ec4899', '#0ea5a4'];

@Component({
  selector: 'app-servicos-listagem',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { class: 'n-page-list' },
  imports: [...NORD_FORM_IMPORTS, FormsModule, RouterLink, ListSkeletonComponent],
  templateUrl: './servicos-listagem.component.html',
  styleUrl: './servicos-listagem.component.css',
})
export class ServicosListagemComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly servicosApi = inject(ServicosService);
  private readonly templatesApi = inject(TemplatesService);
  private readonly linksPublicosApi = inject(LinksPublicosService);
  private readonly toast = inject(ToastService);
  private readonly confirm = inject(ConfirmDialogService);

  readonly loading = signal(true);
  readonly items = signal<ClinicServiceItem[]>([]);
  readonly buscaSignal = signal('');
  readonly fichas = signal<Template[]>([]);

  busca = '';

  readonly filtrados = computed(() => {
    const q = this.buscaSignal().trim().toLowerCase();
    const list = this.items();
    if (!q) return list;
    return list.filter((s) => s.name.toLowerCase().includes(q));
  });

  aplicarBusca(): void {
    this.buscaSignal.set(this.busca);
  }

  limparBusca(): void {
    this.busca = '';
    this.buscaSignal.set('');
  }

  ngOnInit(): void {
    this.reload();
    this.loadFichas();
  }

  reload(): void {
    this.loading.set(true);
    this.servicosApi.list().subscribe({
      next: (list) => {
        this.items.set(list || []);
        this.loading.set(false);
      },
      error: () => {
        this.items.set([]);
        this.loading.set(false);
        this.toast.error('Serviços', 'Não foi possível carregar o catálogo.');
      },
    });
  }

  irParaEditar(s: ClinicServiceItem, event?: Event): void {
    if (event && (event.target as HTMLElement).closest('a, button, nord-button')) return;
    void this.router.navigate(['/servicos', s.id, 'editar'], { state: { servico: s } });
  }

  meta(s: ClinicServiceItem): string {
    const parts = [`${s.duration_minutes} min`];
    const price = this.parsePrice(s.price);
    if (price != null) {
      parts.push(`R$ ${this.formatBrl(price)}`);
      if (!s.show_price) parts.push('oculto na pública');
    }
    if (s.form_template_id) {
      const ficha = this.fichas().find((t) => t.id === s.form_template_id);
      const opc = s.form_template_optional_id
        ? this.fichas().find((t) => t.id === s.form_template_optional_id)
        : null;
      if (ficha && opc) {
        parts.push(`pacote: ${ficha.name} + ${opc.name} (opc.)`);
      } else if (ficha) {
        parts.push(s.form_template_optional_id ? `pacote: ${ficha.name} + 1 opc.` : `pacote: ${ficha.name}`);
      } else {
        parts.push(s.form_template_optional_id ? 'pacote 2 docs' : 'com pacote documental');
      }
    }
    if (s.is_active === false) parts.push('inativo');
    return parts.join(' · ');
  }

  photoUrl(s: ClinicServiceItem): string | null {
    return absoluteMediaUrl(s.photo_url) ?? s.photo_url ?? null;
  }

  iniciais(name: string): string {
    const letters = name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0])
      .join('')
      .toUpperCase();
    return letters || '?';
  }

  corAvatar(name: string): string {
    const key = name.trim() || '?';
    let hash = 0;
    for (let i = 0; i < key.length; i++) hash += key.charCodeAt(i);
    return AVATAR_COLORS[hash % AVATAR_COLORS.length];
  }

  async remover(s: ClinicServiceItem): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Remover serviço?',
      message: `O serviço “${s.name}” será removido do catálogo (agenda, orçamento e pacotes).`,
      confirmLabel: 'Sim, remover',
      variant: 'danger',
    });
    if (!ok) return;
    this.servicosApi.delete(s.id).subscribe({
      next: () => {
        this.reload();
        this.toast.success('Serviço removido', '');
      },
      error: (err) => this.toast.error('Erro', err.error?.message ?? 'Falha ao remover.'),
    });
  }

  private loadFichas(): void {
    forkJoin({
      templates: this.templatesApi.list({ is_active: true, public_enabled: true }).pipe(
        catchError(() => of([] as Template[])),
      ),
      links: this.linksPublicosApi.list({ per_page: 50 }).pipe(
        catchError(() =>
          of({ data: [] as LinkPublico[], meta: { current_page: 1, last_page: 1, per_page: 50, total: 0 } }),
        ),
      ),
    }).subscribe(({ templates, links }) => {
      const byId = new Map<number, Template>();
      for (const t of Array.isArray(templates) ? templates : []) {
        if (t?.id == null || t.is_active === false || !t.public_enabled) continue;
        byId.set(t.id, t);
      }
      for (const l of links.data ?? []) {
        const id = Number(l.template_id ?? l.id);
        if (!Number.isFinite(id) || id <= 0) continue;
        const name = (l.name ?? l.template_name ?? `Modelo #${id}`).trim() || `Modelo #${id}`;
        const prev = byId.get(id);
        byId.set(id, {
          ...(prev ?? {
            id,
            name,
            is_active: true,
            public_enabled: true,
          }),
          name: prev?.name || name,
        } as Template);
      }
      this.fichas.set([...byId.values()]);
    });
  }

  private parsePrice(raw: number | string | null | undefined): number | null {
    if (raw == null || raw === '') return null;
    const n = typeof raw === 'number' ? raw : Number(String(raw).replace(',', '.'));
    return Number.isFinite(n) && n > 0 ? n : null;
  }

  private formatBrl(n: number): string {
    if (!Number.isFinite(n) || n < 0) n = 0;
    const [intPart, decPart] = n.toFixed(2).split('.');
    return `${intPart!.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${decPart}`;
  }
}
