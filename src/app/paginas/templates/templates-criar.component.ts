import { Component, OnInit, inject, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  TemplatesService,
  TemplateCampo,
  TemplateLibraryItem,
  TemplateLibraryMeta,
  TemplateReviewStatus,
} from '../../core/services/templates.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';

/** Rótulos de categoria (igual ao backend) */
const CATEGORY_LABELS: Record<string, string> = {
  anamnese: 'Anamnese',
  anamneses: 'Anamneses',
  cadastro_documentacao: 'Cadastro e Documentação',
  acompanhamento_controle: 'Acompanhamento e Controle',
  acompanhamento: 'Acompanhamento',
  evolucao: 'Evolução',
  consentimento: 'Consentimento',
  triagem: 'Triagem',
  procedimento: 'Procedimento',
  geral: 'Geral (todos os tenants)',
  clinica_medica: 'Clínica Médica',
  odontologia: 'Odontologia',
  estetica: 'Estética / Harmonização',
  fisioterapia: 'Fisioterapia',
  psicologia: 'Psicologia / Psiquiatria',
  pediatria: 'Pediatria',
  ginecologia: 'Ginecologia / Obstetrícia',
  oftalmologia: 'Oftalmologia',
  dermatologia: 'Dermatologia',
  laboratorio: 'Laboratório / Coleta',
  veterinaria: 'Veterinária',
};

const CATEGORY_EMOJI: Record<string, string> = {
  anamnese: '📝',
  anamneses: '📋',
  cadastro_documentacao: '🗂️',
  acompanhamento_controle: '📅',
  acompanhamento: '📆',
  evolucao: '📈',
  consentimento: '✅',
  triagem: '🚦',
  procedimento: '🧪',
  geral: '📄',
  clinica_medica: '🩺',
  odontologia: '🦷',
  estetica: '✨',
  fisioterapia: '💪',
  psicologia: '🧠',
  pediatria: '👶',
  ginecologia: '👩',
  oftalmologia: '👁️',
  dermatologia: '🧴',
  laboratorio: '🔬',
  veterinaria: '🐾',
};

@Component({
  selector: 'app-templates-criar',
  standalone: true,
  imports: [RouterLink, FormsModule, ZmSkeletonListComponent],
  templateUrl: './templates-criar.component.html',
  styleUrl: './templates-criar.component.css',
})
export class TemplatesCriarComponent implements OnInit {
  modelos: TemplateLibraryItem[] = [];
  bibliotecaMeta: TemplateLibraryMeta | null = null;
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';

  buscaTexto = '';
  filtroAtual = 'todos';
  categoryKeys: string[] = [];
  readonly categoryLabels = CATEGORY_LABELS;
  readonly categoryEmoji = CATEGORY_EMOJI;

  previewAberto = false;
  previewTemplate: TemplateLibraryItem | null = null;
  previewCarregando = false;
  usandoModelo = false;

  private templatesService = inject(TemplatesService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  private toast = inject(ToastService);

  ngOnInit(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.templatesService.biblioteca());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (payload) => {
        this.listaPronta = true;
        this.bibliotecaMeta = payload.meta;
        this.modelos = payload.specialties.flatMap((s) => s.templates);
        const keys = [
          ...new Set(this.modelos.map((t) => String(t.category ?? '').trim().toLowerCase()).filter(Boolean)),
        ].sort();
        this.categoryKeys = keys;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Não foi possível carregar a biblioteca de modelos.';
      },
    });
  }

  get cardsVisiveis(): TemplateLibraryItem[] {
    const q = this.buscaTexto.trim().toLowerCase();
    return this.modelos.filter((t) => {
      const matchSearch =
        !q ||
        (t.name ?? '').toLowerCase().includes(q) ||
        (t.description ?? '').toLowerCase().includes(q);
      const matchFilter =
        this.filtroAtual === 'todos' ||
        String(t.category ?? '')
          .trim()
          .toLowerCase() === this.filtroAtual;
      return matchSearch && matchFilter;
    });
  }

  setFiltro(cat: string): void {
    this.filtroAtual = cat;
  }

  abrirPreview(t: TemplateLibraryItem): void {
    this.previewAberto = true;
    this.previewTemplate = null;
    this.previewCarregando = true;
    this.templatesService.getBibliotecaItem(t.library_key).subscribe({
      next: (full) => {
        this.previewTemplate = full;
        this.previewCarregando = false;
      },
      error: () => {
        this.previewCarregando = false;
        this.previewTemplate = { ...t, fields: [] };
      },
    });
  }

  fecharPreview(): void {
    this.previewAberto = false;
    this.previewTemplate = null;
  }

  usarModelo(t: TemplateLibraryItem): void {
    if (this.usandoModelo) return;
    if (t.installed_template_id) {
      this.router.navigate(['/templates', t.installed_template_id, 'campos']);
      return;
    }
    this.usandoModelo = true;
    this.templatesService.installFromLibrary(t.library_key).subscribe({
      next: (novo) => {
        this.usandoModelo = false;
        this.fecharPreview();
        t.installed_template_id = novo.id;
        this.router.navigate(['/templates', novo.id, 'campos']);
      },
      error: () => {
        this.usandoModelo = false;
        this.toast.error('Erro', 'Não foi possível instalar o modelo da biblioteca.');
      },
    });
  }

  usarModeloDoCard(t: TemplateLibraryItem, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.usarModelo(t);
  }

  contagemFiltro(cat: string): number {
    if (cat === 'todos') return this.modelos.length;
    return this.modelos.filter(
      (t) =>
        String(t.category ?? '')
          .trim()
          .toLowerCase() === cat,
    ).length;
  }

  categoriaKey(t: TemplateLibraryItem): string {
    const k = String(t.category ?? '').trim().toLowerCase();
    return k === '' ? 'geral' : k;
  }

  descricaoResumo(t: TemplateLibraryItem, max = 120): string {
    const d = t.description?.trim() ?? '';
    if (!d) return 'Sem descrição.';
    return d.length <= max ? d : d.slice(0, max) + '…';
  }

  reviewBadgeLabel(t: TemplateLibraryItem): string | null {
    if (t.legal_review_status === 'approved' && t.clinical_review_status === 'approved') {
      return 'Revisão jurídica e clínica';
    }
    if (t.legal_review_status === 'approved') {
      return 'Revisão jurídica';
    }
    if (t.clinical_review_status === 'approved') {
      return 'Revisão clínica';
    }
    if (t.legal_review_status === 'pending' || t.clinical_review_status === 'pending') {
      return 'Revisão pendente';
    }
    if (t.legal_review_status === 'draft' || t.clinical_review_status === 'draft') {
      return 'Rascunho — revisar antes de usar';
    }
    return null;
  }

  reviewBadgeClass(t: TemplateLibraryItem): string {
    if (t.legal_review_status === 'approved' && t.clinical_review_status === 'approved') {
      return 'review-badge--approved';
    }
    if (t.legal_review_status === 'pending' || t.clinical_review_status === 'pending') {
      return 'review-badge--pending';
    }
    return 'review-badge--draft';
  }

  previewFieldText(f: TemplateCampo): string {
    const type = (f.type ?? 'text').toLowerCase();
    if (type === 'signature') return 'Campo de assinatura';
    if (type === 'file') return 'Upload de arquivo';
    if (type === 'checkbox') return 'Caixa de seleção';
    if (type === 'notice' || type === 'heading' || type === 'section_break') return f.label;
    return 'Campo ' + type;
  }

  specialtyLabel(): string {
    const niche = this.bibliotecaMeta?.niche ?? 'geral';
    return CATEGORY_LABELS[niche] ?? niche;
  }
}
