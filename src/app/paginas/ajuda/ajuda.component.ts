import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FeedbackService } from '../../core/services/feedback.service';
import { KnowledgeArticle, KnowledgeService } from '../../core/services/knowledge.service';
import { ToastService } from '../../core/services/toast.service';
import { ListSkeletonComponent } from '../../shared/components/list-skeleton/list-skeleton.component';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

type FeedbackValue = 'yes' | 'no' | null;

interface AjudaSection {
  title: string;
  body: string;
  warn: boolean;
  icon: string;
}

const CATEGORY_META: Record<string, { label: string; icon: string }> = {
  primeiros_passos: { label: 'Primeiros passos', icon: 'rocket_launch' },
  fichas_documentos: { label: 'Fichas e documentos', icon: 'description' },
  assinatura_eletronica: { label: 'Assinatura eletrônica', icon: 'draw' },
  protocolos: { label: 'Protocolos', icon: 'verified' },
  link_na_bio: { label: 'Link na Bio', icon: 'link' },
  totem: { label: 'Totem', icon: 'tablet_mac' },
  agenda: { label: 'Agenda', icon: 'calendar_month' },
  servicos: { label: 'Serviços', icon: 'medical_services' },
  integracoes: { label: 'Integrações', icon: 'hub' },
  planos_pagamentos: { label: 'Planos e pagamentos', icon: 'credit_card' },
  seguranca_privacidade: { label: 'Segurança e privacidade', icon: 'shield' },
  solucao_problemas: { label: 'Solução de problemas', icon: 'support_agent' },
};

@Component({
  selector: 'app-ajuda',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterLink, ListSkeletonComponent, ZmPageBackLinkComponent],
  templateUrl: './ajuda.component.html',
  styleUrl: './ajuda.component.css',
})
export class AjudaComponent implements OnInit {
  readonly items = signal<KnowledgeArticle[]>([]);
  readonly selected = signal<KnowledgeArticle | null>(null);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly query = signal('');
  readonly category = signal<string>('todos');
  readonly feedback = signal<FeedbackValue>(null);
  readonly feedbackEnviando = signal(false);

  private readonly search$ = new Subject<string>();
  private readonly knowledge = inject(KnowledgeService);
  private readonly feedbackApi = inject(FeedbackService);
  private readonly toast = inject(ToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly categorias = computed(() => {
    const present = new Set(this.items().map((item) => item.category));
    return [
      { id: 'todos', label: 'Todos' },
      ...Object.entries(CATEGORY_META)
        .filter(([id]) => present.has(id))
        .map(([id, meta]) => ({ id, label: meta.label })),
    ];
  });

  readonly filteredItems = computed(() => {
    const cat = this.category();
    const list = this.items();
    if (cat === 'todos') return list;
    return list.filter((item) => item.category === cat);
  });

  readonly listHeading = computed(() => {
    const q = this.query().trim();
    const count = this.filteredItems().length;
    if (q) {
      return `${count} resultado${count === 1 ? '' : 's'} para “${q}”`;
    }
    const cat = this.category();
    if (cat === 'todos') return 'Todos os artigos';
    return this.categoryLabel(cat);
  });

  readonly relatedItems = computed(() => {
    const current = this.selected();
    if (!current) return [] as KnowledgeArticle[];
    const same = this.items().filter(
      (item) => item.id !== current.id && item.category === current.category,
    );
    if (same.length >= 4) return same.slice(0, 4);
    const others = this.items().filter(
      (item) => item.id !== current.id && item.category !== current.category,
    );
    return [...same, ...others].slice(0, 4);
  });

  readonly articleLead = computed(() => {
    const content = this.selected()?.content?.trim() ?? '';
    if (!content) return '';
    return content.split(/\n\n+/)[0] ?? content;
  });

  readonly articleSections = computed((): AjudaSection[] => {
    const content = this.selected()?.content?.trim() ?? '';
    if (!content) return [];
    const blocks = content.split(/\n\n+/);
    if (blocks.length <= 1) return [];
    return blocks.slice(1).map((block, index) => this.parseSection(block, index));
  });

  ngOnInit(): void {
    this.search$
      .pipe(debounceTime(250), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((q) => this.buscar(q));

    this.buscar('');

    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const slug = params.get('artigo');
      if (!slug) {
        this.selected.set(null);
        this.feedback.set(null);
        return;
      }
      if (this.selected()?.slug === slug) return;
      this.carregarArtigo(slug, false);
    });
  }

  onQuery(event: Event): void {
    const value = (event.target as HTMLInputElement | null)?.value ?? '';
    this.query.set(value);
    this.search$.next(value.trim());
  }

  setCategory(id: string): void {
    this.category.set(id);
  }

  buscar(q: string): void {
    this.loading.set(true);
    this.knowledge.searchHelp(q || undefined).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.error.set('');
        this.items.set(res.data ?? []);
        const cat = this.category();
        if (cat !== 'todos' && !(res.data ?? []).some((item) => item.category === cat)) {
          this.category.set('todos');
        }
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Não foi possível carregar a ajuda.');
      },
    });
  }

  abrir(item: KnowledgeArticle): void {
    this.carregarArtigo(item.slug, true);
  }

  /** Mantido para deep-link / testes; preferir `abrir`. */
  abrirSlug(slug: string): void {
    this.carregarArtigo(slug, true);
  }

  private carregarArtigo(slug: string, syncUrl: boolean): void {
    this.feedback.set(null);
    this.knowledge.getHelpArticle(slug).subscribe({
      next: (res) => {
        this.selected.set(res.data);
        this.error.set('');
        if (!syncUrl) return;
        void this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { artigo: slug },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
      },
      error: () => {
        this.error.set('Artigo não encontrado.');
      },
    });
  }

  voltarLista(): void {
    this.selected.set(null);
    this.feedback.set(null);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { artigo: null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  registrarFeedback(value: Exclude<FeedbackValue, null>): void {
    const article = this.selected();
    if (!article || this.feedbackEnviando() || this.feedback() === value) return;

    const helpful = value === 'yes';
    const titlePrefix = helpful ? 'Ajuda útil' : 'Ajuda não útil';
    const title = `${titlePrefix}: ${article.title}`.slice(0, 160);
    const message = [
      `Artigo: ${article.slug}`,
      `Categoria: ${this.categoryLabel(article.category)}`,
      `Resposta: ${helpful ? 'sim' : 'nao'}`,
      `Título: ${article.title}`,
    ].join('\n');

    this.feedbackEnviando.set(true);
    this.feedbackApi
      .enviar({
        type: 'suggestion',
        title,
        message,
        source: 'help_center',
      })
      .subscribe({
        next: () => {
          this.feedbackEnviando.set(false);
          this.feedback.set(value);
        },
        error: () => {
          this.feedbackEnviando.set(false);
          this.toast.error('Feedback', 'Não foi possível salvar sua resposta. Tente de novo.');
        },
      });
  }

  categoryLabel(id: string): string {
    return CATEGORY_META[id]?.label ?? id;
  }

  categoryIcon(id: string): string {
    return CATEGORY_META[id]?.icon ?? 'help';
  }

  excerpt(content: string | null | undefined): string {
    const text = (content ?? '').replace(/\s+/g, ' ').trim();
    if (!text) return 'Abra para ver o passo a passo.';
    return text.length > 110 ? `${text.slice(0, 109)}…` : text;
  }

  private parseSection(block: string, index: number): AjudaSection {
    const lines = block
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    const warn = /aten[cç][aã]o|importante|cuidado|n[aã]o\s+alter/i.test(block);
    const icon = warn ? 'warning' : index === 0 ? 'article' : 'check_circle';

    if (lines.length === 0) {
      return { title: `Ponto ${index + 1}`, body: block, warn, icon };
    }

    const headingLike = /^(#{1,3}\s+|\*\*.+\*\*$|\d+[.)]\s+)/.test(lines[0]);
    if (headingLike || lines.length > 1) {
      const rawTitle = lines[0]
        .replace(/^#{1,3}\s+/, '')
        .replace(/^\d+[.)]\s+/, '')
        .replace(/^\*\*|\*\*$/g, '')
        .trim();
      const body = lines.slice(1).join('\n').trim();
      return {
        title: rawTitle || (warn ? 'Atenção' : `Ponto ${index + 1}`),
        body: body || block,
        warn,
        icon,
      };
    }

    return {
      title: warn ? 'Atenção' : `Ponto ${index + 1}`,
      body: block,
      warn,
      icon,
    };
  }
}
