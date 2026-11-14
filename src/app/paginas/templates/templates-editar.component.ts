import { Component, OnInit, inject, Signal, signal, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TemplatesService, Template, TemplateCategory, TemplateComprehensionQuestion } from '../../core/services/templates.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonTemplateFormularioComponent } from '../../shared/components/skeletons';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { ToastService } from '../../core/services/toast.service';
import { GestgoComboboxComponent, type GestgoComboboxOption } from '@/shared/components/combobox';
import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { hasUsablePrintLayout, parsePrintLayout } from '../../core/utils/print-layout.util';

import { NORD_FORM_IMPORTS } from '@/shared/nord';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-templates-editar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page templates-editar' },
  imports: [
    ...NORD_FORM_IMPORTS,
    RouterLink,
    FormsModule,
    ZmSkeletonTemplateFormularioComponent,
    ZmPageBackLinkComponent,
    GestgoComboboxComponent,
    GestgoCardComponent
  ],
  templateUrl: './templates-editar.component.html',
  styleUrl: './templates-editar.component.css',
})
export class TemplatesEditarComponent implements OnInit {
  readonly template = signal<Template | null>(null);
  name = '';
  description = '';
  categoriaSelecionada = '';
  novaCategoria = '';
  readonly categorias = signal<TemplateCategory[]>([]);
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
  readonly listaPronta = signal(false);
  readonly salvando = signal(false);
  readonly erro = signal('');
  readonly sourceUploading = signal(false);
  readonly sourceDownloading = signal(false);
  readonly sourceRemoving = signal(false);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private templatesService = inject(TemplatesService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);

  get opcoesDocumento(): GestgoComboboxOption[] {
    return [
      { value: 'ficha', label: 'Ficha / anamnese' },
      { value: 'consentimento', label: 'Consentimento informado' },
      { value: 'ciencia_lgpd', label: 'Ciência LGPD / privacidade' }];
  }

  get opcoesCategoria(): GestgoComboboxOption[] {
    return [
      { value: '', label: 'Sem categoria' },
      ...this.categorias().map((cat) => ({ value: cat.key, label: cat.name })),
      { value: '__nova__', label: 'Nova categoria…' }];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.showSkeleton = signal(false).asReadonly();
      this.listaPronta.set(true);
      this.erro.set('ID inválido');
      return;
    }
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.templatesService.get(Number(id)));
    this.showSkeleton = showSkeleton;
    this.templatesService.categories().subscribe({
      next: (items) => {
        this.categorias.set(items);
      },
      error: () => {
        this.categorias.set([]);
      },
    });
    data$.subscribe({
      next: (t) => {
        this.listaPronta.set(true);
        this.template.set(t);
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
        this.listaPronta.set(true);
        this.erro.set('Template não encontrado.');
      },
    });
  }

  salvar(): void {
    const tpl = this.template();
    if (!tpl || !this.name.trim()) return;
    this.salvando.set(true);
    this.erro.set('');
    const usarNovaCategoria = this.categoriaSelecionada === '__nova__';
    const categoriaCustom = this.novaCategoria.trim();
    this.templatesService
      .update(tpl.id, {
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
          this.salvando.set(false);
          const label = this.name.trim();
          this.toast.success('Template salvo!', `${label} foi salvo com sucesso.`);
          this.router.navigate(['/templates']);
        },
        error: () => {
          this.salvando.set(false);
          this.erro.set('Não foi possível salvar.');
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

  onValidityDaysChange(raw: string | number | null): void {
    const digits = String(raw ?? '').replace(/\D/g, '');
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
      }];
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

  onSourceDocumentSelected(event: Event): void {
    const tpl = this.template();
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0] ?? null;
    if (input) input.value = '';
    if (!tpl || !file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      this.toast.error('PDF original', 'Envie apenas arquivo PDF.');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      this.toast.error('PDF original', 'O PDF pode ter no máximo 20 MB.');
      return;
    }

    this.sourceUploading.set(true);
    this.templatesService.uploadSourceDocument(tpl.id, file).subscribe({
      next: (updated) => {
        this.sourceUploading.set(false);
        this.template.set(updated);
        this.toast.success(
          'PDF original',
          'Documento anexado. Em seguida, use “Mapear aparência” para marcar onde cada resposta entra.',
        );
      },
      error: (err) => {
        this.sourceUploading.set(false);
        const msg =
          err?.error?.message ||
          err?.error?.errors?.file?.[0] ||
          'Não foi possível anexar o PDF.';
        this.toast.error('PDF original', msg);
      },
    });
  }

  baixarSourceDocument(): void {
    const tpl = this.template();
    if (!tpl?.has_source_document || this.sourceDownloading()) return;
    this.sourceDownloading.set(true);
    this.templatesService.downloadSourceDocument(tpl.id).subscribe({
      next: (blob) => {
        this.sourceDownloading.set(false);
        const name = tpl.source_document_original_name || `modelo-${tpl.id}-original.pdf`;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: () => {
        this.sourceDownloading.set(false);
        this.toast.error('PDF original', 'Não foi possível baixar o documento.');
      },
    });
  }

  removerSourceDocument(): void {
    const tpl = this.template();
    if (!tpl?.has_source_document || this.sourceRemoving()) return;
    this.sourceRemoving.set(true);
    this.templatesService.deleteSourceDocument(tpl.id).subscribe({
      next: (updated) => {
        this.sourceRemoving.set(false);
        this.template.set(updated);
        this.toast.success('PDF original', 'Documento removido do modelo.');
      },
      error: () => {
        this.sourceRemoving.set(false);
        this.toast.error('PDF original', 'Não foi possível remover o documento.');
      },
    });
  }

  formatSourceSize(bytes: number | null | undefined): string {
    if (bytes == null || !Number.isFinite(bytes) || bytes <= 0) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  get aparenciaMapeada(): boolean {
    return hasUsablePrintLayout(parsePrintLayout(this.template()?.print_layout));
  }

  get aparenciaMappedCount(): number {
    return parsePrintLayout(this.template()?.print_layout)?.placements.length ?? 0;
  }
}
