import { Component, OnInit, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TemplatesService, Template, TemplateCategory, TemplateComprehensionQuestion } from '../../core/services/templates.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonTemplateFormularioComponent } from '../../shared/components/skeletons';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { ToastService } from '../../core/services/toast.service';
import { ZardComboboxComponent, type ZardComboboxOption } from '@/shared/components/combobox';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZARD_FORM_CONTROL_IMPORTS } from '@/shared/components/input';

@Component({
  selector: 'app-templates-editar',
  standalone: true,
  imports: [
    ...ZARD_FORM_CONTROL_IMPORTS,
    RouterLink,
    FormsModule,
    ZmSkeletonTemplateFormularioComponent,
    ZmPageBackLinkComponent,
    ZardComboboxComponent,
    ZardCardComponent,
    ZardButtonComponent,
  ],
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
  document_kind: 'ficha' | 'consentimento' | 'ciencia_lgpd' = 'ficha';
  /** Vazio = sem validade temporal. */
  consent_validity_days: number | null = null;
  quizQuestions: TemplateComprehensionQuestion[] = [];
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  salvando = false;
  erro = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private templatesService = inject(TemplatesService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);

  get opcoesDocumento(): ZardComboboxOption[] {
    return [
      { value: 'ficha', label: 'Ficha / anamnese' },
      { value: 'consentimento', label: 'Consentimento informado' },
      { value: 'ciencia_lgpd', label: 'Ciência LGPD / privacidade' },
    ];
  }

  get opcoesCategoria(): ZardComboboxOption[] {
    return [
      { value: '', label: 'Sem categoria' },
      ...this.categorias.map((cat) => ({ value: cat.key, label: cat.name })),
      { value: '__nova__', label: 'Nova categoria…' },
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
        const kind = (t.document_kind || (t.category === 'consentimento' ? 'consentimento' : 'ficha')).toString();
        this.document_kind =
          kind === 'consentimento' || kind === 'ciencia_lgpd' ? kind : 'ficha';
        this.consent_validity_days =
          this.document_kind === 'consentimento' && t.consent_validity_days != null
            ? Number(t.consent_validity_days)
            : null;
        this.quizQuestions =
          this.document_kind === 'consentimento' && Array.isArray(t.comprehension_quiz)
            ? t.comprehension_quiz.map((q, i) => ({
                id: q.id || `q${i + 1}`,
                prompt: q.prompt || '',
                options: Array.isArray(q.options) && q.options.length >= 2 ? [...q.options] : ['Sim', 'Não'],
                correct_index: typeof q.correct_index === 'number' ? q.correct_index : 0,
              }))
            : [];
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
        document_kind: this.document_kind,
        consent_validity_days:
          this.document_kind === 'consentimento' && this.consent_validity_days != null && this.consent_validity_days > 0
            ? this.consent_validity_days
            : null,
        comprehension_quiz: this.document_kind === 'consentimento' ? this.buildQuizPayload() : null,
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

  selecionarCategoria(value: string | null): void {
    this.categoriaSelecionada = value ?? '';
    if (this.categoriaSelecionada !== '__nova__') {
      this.novaCategoria = '';
    }
  }

  onDocumentKindChange(value: string | null): void {
    this.document_kind =
      value === 'consentimento' || value === 'ciencia_lgpd' ? value : 'ficha';
    if (this.document_kind !== 'consentimento') {
      this.consent_validity_days = null;
      this.quizQuestions = [];
    }
  }

  onValidityDaysChange(raw: string): void {
    const digits = (raw || '').replace(/\D/g, '');
    if (!digits) {
      this.consent_validity_days = null;
      return;
    }
    const n = Math.min(3650, Math.max(1, Number(digits)));
    this.consent_validity_days = Number.isFinite(n) ? n : null;
  }

  addQuizQuestion(): void {
    if (this.quizQuestions.length >= 5) return;
    const n = this.quizQuestions.length + 1;
    this.quizQuestions = [
      ...this.quizQuestions,
      {
        id: `q${n}`,
        prompt: '',
        options: ['Sim', 'Não'],
        correct_index: 0,
      },
    ];
  }

  removeQuizQuestion(index: number): void {
    this.quizQuestions = this.quizQuestions.filter((_, i) => i !== index);
  }

  addQuizOption(qi: number): void {
    const q = this.quizQuestions[qi];
    if (!q || q.options.length >= 4) return;
    this.quizQuestions = this.quizQuestions.map((item, i) =>
      i === qi ? { ...item, options: [...item.options, ''] } : item,
    );
  }

  removeQuizOption(qi: number, oi: number): void {
    const q = this.quizQuestions[qi];
    if (!q || q.options.length <= 2) return;
    const options = q.options.filter((_, i) => i !== oi);
    const correct_index = Math.min(q.correct_index, options.length - 1);
    this.quizQuestions = this.quizQuestions.map((item, i) =>
      i === qi ? { ...item, options, correct_index } : item,
    );
  }

  setQuizOption(qi: number, oi: number, value: string): void {
    this.quizQuestions = this.quizQuestions.map((item, i) => {
      if (i !== qi) return item;
      const options = item.options.map((opt, j) => (j === oi ? value : opt));
      return { ...item, options };
    });
  }

  private buildQuizPayload(): TemplateComprehensionQuestion[] | null {
    const cleaned = this.quizQuestions
      .map((q, i) => {
        const options = q.options.map((o) => o.trim()).filter(Boolean);
        return {
          id: (q.id || `q${i + 1}`).trim() || `q${i + 1}`,
          prompt: q.prompt.trim(),
          options: options.length >= 2 ? options : ['Sim', 'Não'],
          correct_index: Math.min(Math.max(0, q.correct_index), Math.max(0, options.length - 1)),
        };
      })
      .filter((q) => q.prompt.length > 0);
    return cleaned.length > 0 ? cleaned : null;
  }
}
