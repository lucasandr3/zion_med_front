import { Component, OnInit, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplatesService, Template, TemplateCategory } from '../../core/services/templates.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonCardComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';
import { ZmSearchableSelectComponent, ZmSearchableSelectOption } from '../../shared/components/ui';

@Component({
  selector: 'app-templates-editar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ZmSkeletonCardComponent, ZmSearchableSelectComponent],
  templateUrl: './templates-editar.component.html',
  styleUrl: './templates-editar.component.css',
})
export class TemplatesEditarComponent implements OnInit {
  template: Template | null = null;
  name = '';
  description = '';
  categoriaSelecionada = '';
  novaCategoria = '';
  categorias: TemplateCategory[] = [];
  is_active = true;
  public_enabled = false;
  public_require_person_link = false;
  /** Só usado se exigir vínculo com pessoa no link público. */
  public_person_link_mode: 'code' | 'cpf' = 'code';
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  salvando = false;
  erro = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private templatesService = inject(TemplatesService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);

  get opcoesCategoria(): ZmSearchableSelectOption[] {
    return [
      { key: '', label: 'Sem categoria' },
      ...this.categorias.map((cat) => ({ key: cat.key, label: cat.name })),
    ];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.showSkeleton = signal(false).asReadonly();
      this.listaPronta = true;
      this.erro = 'ID inválido';
      return;
    }
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.templatesService.get(Number(id)));
    this.showSkeleton = showSkeleton;
    this.templatesService.categories().subscribe({
      next: (items) => {
        this.categorias = items;
      },
      error: () => {
        this.categorias = [];
      },
    });
    data$.subscribe({
      next: (t) => {
        this.listaPronta = true;
        this.template = t;
        this.name = t.name ?? '';
        this.description = t.description ?? '';
        this.categoriaSelecionada = t.category ?? '';
        this.is_active = t.is_active ?? true;
        this.public_enabled = t.public_enabled ?? false;
        this.public_require_person_link = t.public_require_person_link ?? false;
        const mode = (t.public_person_link_mode ?? 'code').toString().toLowerCase();
        this.public_person_link_mode = mode === 'cpf' ? 'cpf' : 'code';
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Template não encontrado.';
      },
    });
  }

  salvar(): void {
    if (!this.template || !this.name.trim()) return;
    this.salvando = true;
    this.erro = '';
    const usarNovaCategoria = this.categoriaSelecionada === '__nova__';
    const categoriaCustom = this.novaCategoria.trim();
    this.templatesService
      .update(this.template.id, {
        name: this.name.trim(),
        description: this.description.trim() || undefined,
        category: !usarNovaCategoria ? this.categoriaSelecionada || undefined : undefined,
        new_category: usarNovaCategoria && categoriaCustom ? categoriaCustom : undefined,
        is_active: this.is_active,
        public_enabled: this.public_enabled,
        public_require_person_link: this.public_require_person_link,
        public_person_link_mode: this.public_require_person_link ? this.public_person_link_mode : undefined,
      })
      .subscribe({
        next: () => {
          this.salvando = false;
          const label = this.name.trim();
          this.toast.success('Template salvo!', `${label} foi salvo com sucesso.`);
          this.router.navigate(['/templates']);
        },
        error: () => {
          this.salvando = false;
          this.erro = 'Não foi possível salvar.';
          this.toast.error('Erro ao salvar', 'Não foi possível salvar as alterações.');
        },
      });
  }

  selecionarCategoria(value: string): void {
    this.categoriaSelecionada = value;
    if (value !== '__nova__') {
      this.novaCategoria = '';
    }
  }

  abrirCriacaoCategoria(): void {
    this.categoriaSelecionada = '__nova__';
  }
}
