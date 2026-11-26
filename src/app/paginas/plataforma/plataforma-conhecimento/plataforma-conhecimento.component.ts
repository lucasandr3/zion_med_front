import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  Signal,
  inject,
  signal,
} from '@angular/core';
import { KnowledgeArticle, KnowledgeService } from '../../../core/services/knowledge.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';
import { ToastService } from '../../../core/services/toast.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';
import { ZmPageBackLinkComponent } from '../../../shared/components/ui';
import { GestgoComboboxComponent, type GestgoComboboxOption } from '@/shared/components/combobox';

@Component({
  selector: 'app-plataforma-conhecimento',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ListSkeletonComponent, ZmPageBackLinkComponent, GestgoComboboxComponent],
  templateUrl: './plataforma-conhecimento.component.html',
  styleUrl: './plataforma-conhecimento.component.css',
})
export class PlataformaConhecimentoComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly error = signal('');
  readonly acting = signal(false);
  readonly items = signal<KnowledgeArticle[]>([]);
  readonly editing = signal(false);
  readonly editId = signal<number | null>(null);
  readonly title = signal('');
  readonly category = signal('primeiros_passos');
  readonly content = signal('');
  readonly visibility = signal('authenticated');

  readonly categories = [
    { id: 'primeiros_passos', label: 'Primeiros passos' },
    { id: 'fichas_documentos', label: 'Fichas e documentos' },
    { id: 'assinatura_eletronica', label: 'Assinatura eletrônica' },
    { id: 'protocolos', label: 'Protocolos' },
    { id: 'link_na_bio', label: 'Link na Bio' },
    { id: 'totem', label: 'Totem' },
    { id: 'agenda', label: 'Agenda' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'integracoes', label: 'Integrações' },
    { id: 'planos_pagamentos', label: 'Planos e pagamentos' },
    { id: 'seguranca_privacidade', label: 'Segurança e privacidade' },
    { id: 'solucao_problemas', label: 'Solução de problemas' },
  ];

  readonly categoryOptions: GestgoComboboxOption[] = this.categories.map((c) => ({
    value: c.id,
    label: c.label,
  }));

  readonly visibilityOptions: GestgoComboboxOption[] = [
    { value: 'authenticated', label: 'Usuários autenticados' },
    { value: 'public', label: 'Pública' },
    { value: 'internal', label: 'Interna (equipe Gestgo)' },
  ];

  private knowledge = inject(KnowledgeService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.knowledge.platformList());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.error.set('');
        this.items.set(res.data?.items ?? []);
      },
      error: () => {
        this.listaPronta.set(true);
        this.error.set('Não foi possível carregar os artigos.');
      },
    });
  }

  novo(): void {
    this.editing.set(true);
    this.editId.set(null);
    this.title.set('');
    this.category.set('primeiros_passos');
    this.content.set('');
    this.visibility.set('authenticated');
  }

  editar(item: KnowledgeArticle): void {
    this.editing.set(true);
    this.editId.set(item.id);
    this.title.set(item.title);
    this.category.set(item.category);
    this.content.set(item.content);
    this.visibility.set(item.visibility);
  }

  cancelar(): void {
    this.editing.set(false);
  }

  salvar(): void {
    const title = this.title().trim();
    const content = this.content().trim();
    if (!title || !content) {
      this.toast.error('Campos', 'Informe título e conteúdo.');
      return;
    }
    const payload = {
      title,
      content,
      category: this.category(),
      visibility: this.visibility(),
      status: 'draft',
    };
    this.acting.set(true);
    const id = this.editId();
    const req = id
      ? this.knowledge.platformUpdate(id, payload)
      : this.knowledge.platformCreate(payload);
    req.subscribe({
      next: () => {
        this.acting.set(false);
        this.editing.set(false);
        this.toast.success('Salvo', 'Artigo atualizado.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível salvar.');
      },
    });
  }

  async publicar(item: KnowledgeArticle): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Publicar artigo',
      message: `Publicar "${item.title}" para usuários autenticados?`,
      confirmLabel: 'Publicar',
    });
    if (!ok) return;
    this.acting.set(true);
    this.knowledge.platformPublish(item.id).subscribe({
      next: () => {
        this.acting.set(false);
        this.toast.success('Publicado', 'Artigo disponível na ajuda.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Falha ao publicar.');
      },
    });
  }

  async arquivar(item: KnowledgeArticle): Promise<void> {
    this.acting.set(true);
    this.knowledge.platformArchive(item.id).subscribe({
      next: () => {
        this.acting.set(false);
        this.toast.success('Arquivado', 'Artigo arquivado.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Falha ao arquivar.');
      },
    });
  }

  categoryLabel(id: string): string {
    return this.categories.find((c) => c.id === id)?.label ?? id;
  }

  onTitle(e: Event): void {
    this.title.set((e.target as HTMLInputElement).value);
  }
  onContent(e: Event): void {
    this.content.set((e.target as HTMLTextAreaElement).value);
  }
  onCategory(value: string | null): void {
    if (value) this.category.set(value);
  }
  onVisibility(value: string | null): void {
    if (value) this.visibility.set(value);
  }
}
