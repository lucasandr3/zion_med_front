import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TemplatesService, TemplateCategory } from '../../core/services/templates.service';
import { ToastService } from '../../core/services/toast.service';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { ZardComboboxComponent, type ZardComboboxOption } from '@/shared/components/combobox';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZARD_FORM_CONTROL_IMPORTS } from '@/shared/components/input';

@Component({
  selector: 'app-templates-criar-em-branco',
  standalone: true,
  imports: [
    ...ZARD_FORM_CONTROL_IMPORTS,
    RouterLink,
    FormsModule,
    ZmPageBackLinkComponent,
    ZardComboboxComponent,
    ZardCardComponent,
    ZardButtonComponent,
  ],
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

  get opcoesCategoria(): ZardComboboxOption[] {
    return [
      { value: '', label: 'Sem categoria' },
      ...this.categorias.map((cat) => ({ value: cat.key, label: cat.name })),
      { value: '__nova__', label: 'Nova categoria…' },
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

  selecionarCategoria(value: string | null): void {
    this.categoriaSelecionada = value ?? '';
    if (this.categoriaSelecionada !== '__nova__') {
      this.novaCategoria = '';
    }
  }
}
