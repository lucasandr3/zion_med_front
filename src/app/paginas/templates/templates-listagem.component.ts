import { Component, OnInit, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplatesService, Template } from '../../core/services/templates.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ZmEmptyStateComponent } from '../../shared/components/ui';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';

/** Rótulos de categoria (igual ao backend FormTemplate::categoryLabels) */
const CATEGORY_LABELS: Record<string, string> = {
  personalizado: 'Personalizado',
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

@Component({
  selector: 'app-templates-listagem',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ZmSkeletonListComponent, ZmEmptyStateComponent],
  templateUrl: './templates-listagem.component.html',
  styleUrl: './templates-listagem.component.css',
})
export class TemplatesListagemComponent implements OnInit {
  templates: Template[] = [];
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';

  /** Filtro: 'all' | 'ativo' | 'publico' */
  filtroAtual: 'all' | 'ativo' | 'publico' = 'all';
  buscaTexto = '';

  /** Grupos por categoria (chave = category ou 'personalizado') */
  grupos: { key: string; label: string; items: Template[] }[] = [];
  /** Grupo colapsado: key -> boolean */
  collapsed: Record<string, boolean> = {};

  readonly categoryLabels = CATEGORY_LABELS;

  removendoId: number | null = null;

  private templatesService = inject(TemplatesService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);

  ngOnInit(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.templatesService.list());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (list) => {
        this.listaPronta = true;
        this.templates = list;
        this.montarGrupos();
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Não foi possível carregar os templates.';
      },
    });
  }

  private montarGrupos(): void {
    const byCategory = new Map<string, Template[]>();
    for (const t of this.templates) {
      const key = t.category ?? 'personalizado';
      if (!byCategory.has(key)) byCategory.set(key, []);
      byCategory.get(key)!.push(t);
    }
    const order = ['personalizado', ...Object.keys(CATEGORY_LABELS).filter((k) => k !== 'personalizado')];
    this.grupos = order
      .filter((key) => byCategory.has(key))
      .map((key) => ({
        key,
        label: CATEGORY_LABELS[key] ?? key,
        items: byCategory.get(key)!,
      }));
    this.grupos.forEach((g) => {
      if (this.collapsed[g.key] === undefined) this.collapsed[g.key] = true;
    });
  }

  setFiltro(f: 'all' | 'ativo' | 'publico'): void {
    this.filtroAtual = f;
  }

  toggleGrupo(key: string): void {
    this.collapsed[key] = !this.collapsed[key];
  }

  /** Retorna os itens do grupo que passam no filtro e na busca */
  itensVisiveis(grupo: { items: Template[] }): Template[] {
    const search = this.buscaTexto.trim().toLowerCase();
    const matchFilter = (t: Template) => {
      if (this.filtroAtual === 'ativo') return !!t.is_active;
      if (this.filtroAtual === 'publico') return !!t.public_enabled;
      return true;
    };
    const matchSearch = (t: Template) => !search || (t.name ?? '').toLowerCase().includes(search);
    return grupo.items.filter((t) => matchFilter(t) && matchSearch(t));
  }

  /** Esconde grupo se não houver itens visíveis */
  grupoVisivel(grupo: { key: string; items: Template[] }): boolean {
    return this.itensVisiveis(grupo).length > 0;
  }

  async remover(t: Template, event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    const nome = t.name?.trim() || 'este template';
    const ok = await this.confirm.request({
      title: 'Deletar template?',
      messageBefore: 'O template ',
      emphasis: nome,
      messageAfter: ' será removido permanentemente. Esta ação não pode ser desfeita.',
      confirmLabel: 'Sim, deletar',
      variant: 'danger',
    });
    if (!ok) return;
    this.removendoId = t.id;
    this.templatesService.delete(t.id).subscribe({
      next: () => {
        this.removendoId = null;
        this.templates = this.templates.filter((x) => x.id !== t.id);
        this.montarGrupos();
        this.toast.success('Template removido', `${nome} foi excluído.`);
      },
      error: () => {
        this.removendoId = null;
        this.toast.error('Erro ao remover', 'Não foi possível remover o template.');
      },
    });
  }
}
