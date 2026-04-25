import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplatesService, TemplateCategory } from '../../core/services/templates.service';
import { ToastService } from '../../core/services/toast.service';
import { ZmSearchableSelectComponent, ZmSearchableSelectOption } from '../../shared/components/ui';

@Component({
  selector: 'app-templates-criar-em-branco',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ZmSearchableSelectComponent],
  templateUrl: './templates-criar-em-branco.component.html',
  styleUrl: './templates-criar-em-branco.component.css',
})
export class TemplatesCriarEmBrancoComponent {
  name = '';
  description = '';
  categoriaSelecionada = '';
  novaCategoria = '';
  is_active = true;
  public_enabled = false;
  public_require_person_link = false;
  salvando = false;
  erro = '';
  categorias: TemplateCategory[] = [];

  get opcoesCategoria(): ZmSearchableSelectOption[] {
    return [
      { key: '', label: 'Sem categoria' },
      ...this.categorias.map((cat) => ({ key: cat.key, label: cat.name })),
    ];
  }

  private templatesService = inject(TemplatesService);
  private router = inject(Router);
  private toast = inject(ToastService);

  constructor() {
    this.templatesService.categories().subscribe({
      next: (items) => {
        this.categorias = items;
      },
      error: () => {
        this.categorias = [];
      },
    });
  }

  salvar(): void {
    if (!this.name.trim()) return;
    this.salvando = true;
    this.erro = '';
    const usarNovaCategoria = this.categoriaSelecionada === '__nova__';
    const categoriaCustom = this.novaCategoria.trim();
    this.templatesService
      .create({
        name: this.name.trim(),
        description: this.description.trim() || undefined,
        category: !usarNovaCategoria ? this.categoriaSelecionada || undefined : undefined,
        new_category: usarNovaCategoria && categoriaCustom ? categoriaCustom : undefined,
        is_active: this.is_active,
        public_enabled: this.public_enabled,
        public_require_person_link: this.public_require_person_link,
      })
      .subscribe({
        next: (t) => {
          this.salvando = false;
          this.toast.success('Template criado!', `${this.name.trim()} foi criado.`);
          this.router.navigate(['/templates', t.id, 'campos']);
        },
        error: () => {
          this.salvando = false;
          this.erro = 'Não foi possível criar o template.';
          this.toast.error('Erro ao criar', this.erro);
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
