import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplatesService, Template, TemplateCampo } from '../../core/services/templates.service';
import { LoadingOverlayComponent } from '../../componentes/ui/loading-overlay/loading-overlay.component';

/** Rótulos de categoria (igual ao backend) */
const CATEGORY_LABELS: Record<string, string> = {
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
};

const CATEGORY_EMOJI: Record<string, string> = {
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
};

@Component({
  selector: 'app-templates-criar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LoadingOverlayComponent],
  templateUrl: './templates-criar.component.html',
  styleUrl: './templates-criar.component.css',
})
export class TemplatesCriarComponent implements OnInit {
  /** Todos os templates com categoria (modelos) */
  modelos: Template[] = [];
  carregando = true;
  erro = '';

  buscaTexto = '';
  filtroAtual = 'todos';
  categoryKeys: string[] = [];
  readonly categoryLabels = CATEGORY_LABELS;
  readonly categoryEmoji = CATEGORY_EMOJI;

  /** Modal de pré-visualização */
  previewAberto = false;
  previewTemplate: (Template & { fields?: TemplateCampo[] }) | null = null;
  previewCarregando = false;
  usandoModelo = false;

  private templatesService = inject(TemplatesService);
  private router = inject(Router);

  ngOnInit(): void {
    this.templatesService.list().subscribe({
      next: (list) => {
        this.modelos = list.filter((t) => t.category != null && t.category !== '');
        const keys = [...new Set(this.modelos.map((t) => t.category!).filter(Boolean))].sort();
        this.categoryKeys = keys;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.erro = 'Não foi possível carregar os modelos.';
      },
    });
  }

  get cardsVisiveis(): Template[] {
    const q = this.buscaTexto.trim().toLowerCase();
    return this.modelos.filter((t) => {
      const matchSearch = !q || (t.name ?? '').toLowerCase().includes(q);
      const matchFilter = this.filtroAtual === 'todos' || (t.category ?? '') === this.filtroAtual;
      return matchSearch && matchFilter;
    });
  }

  setFiltro(cat: string): void {
    this.filtroAtual = cat;
  }

  abrirPreview(t: Template): void {
    this.previewAberto = true;
    this.previewTemplate = null;
    this.previewCarregando = true;
    this.templatesService.get(t.id).subscribe({
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

  usarModelo(t: Template): void {
    if (this.usandoModelo) return;
    this.usandoModelo = true;
    this.templatesService.createFromTemplate(t.id).subscribe({
      next: (novo) => {
        this.usandoModelo = false;
        this.fecharPreview();
        this.router.navigate(['/templates', novo.id, 'campos']);
      },
      error: () => {
        this.usandoModelo = false;
        alert('Não foi possível criar o template a partir do modelo.');
      },
    });
  }

  usarModeloDoCard(t: Template, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.usandoModelo) return;
    this.usandoModelo = true;
    this.templatesService.createFromTemplate(t.id).subscribe({
      next: (novo) => {
        this.usandoModelo = false;
        this.router.navigate(['/templates', novo.id, 'campos']);
      },
      error: () => {
        this.usandoModelo = false;
        alert('Não foi possível criar o template a partir do modelo.');
      },
    });
  }

  contagemFiltro(cat: string): number {
    if (cat === 'todos') return this.modelos.length;
    return this.modelos.filter((t) => (t.category ?? '') === cat).length;
  }

  descricaoResumo(t: Template, max = 120): string {
    const d = t.description?.trim() ?? '';
    if (!d) return 'Sem descrição.';
    return d.length <= max ? d : d.slice(0, max) + '…';
  }

  /** Texto do campo para pré-visualização */
  previewFieldText(f: TemplateCampo): string {
    const type = (f.type || 'text').toLowerCase();
    if (type === 'textarea') return '...';
    const raw = (f as { options?: string[] | { options?: string[] } }).options;
    const opts = Array.isArray(raw) ? raw : raw?.options;
    if ((type === 'select' || type === 'radio') && opts?.length) return opts.join(' · ');
    if (type === 'checkbox') return '☐';
    if (type === 'file') return 'Escolher arquivo';
    if (type === 'signature') return 'Assinatura';
    if (type === 'date') return 'dd/mm/aaaa';
    if (type === 'number') return '0';
    return '...';
  }
}
