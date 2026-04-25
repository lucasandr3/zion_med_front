import { Component, OnInit, DestroyRef, inject, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
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
};

/** Cor de destaque do ícone por categoria (apenas UI) */
const CATEGORY_ACCENT: Record<string, string> = {
  personalizado: '#a78bfa',
  anamnese: '#06b6d4',
  anamneses: '#0891b2',
  cadastro_documentacao: '#a855f7',
  acompanhamento_controle: '#0d9488',
  acompanhamento: '#14b8a6',
  evolucao: '#22c55e',
  consentimento: '#6366f1',
  triagem: '#f59e0b',
  procedimento: '#ec4899',
  geral: '#818cf8',
  clinica_medica: '#38bdf8',
  odontologia: '#fbbf24',
  estetica: '#f472b6',
  fisioterapia: '#34d399',
  psicologia: '#c084fc',
  pediatria: '#fb923c',
  ginecologia: '#f87171',
  oftalmologia: '#22d3ee',
  dermatologia: '#fb7185',
  laboratorio: '#94a3b8',
};

/** Chave canônica para agrupar pastas (evita duplicar por typo de maiúsculas na API). */
function canonicalCategoryKey(raw: string | null | undefined): string {
  if (raw == null) return 'personalizado';
  const s = String(raw).trim();
  if (s === '') return 'personalizado';
  return s.toLowerCase();
}

type OrdenacaoColecao = 'fixa' | 'az' | 'recente';
type ModoDetalhe = 'tabela' | 'cards';
type ModoColecao = 'cards' | 'lista';

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

  /** Query `?categoria=` — lista modelos só dessa categoria */
  categoriaAberta: string | null = null;

  /** Painel lateral de filtros (busca + status) */
  filtrosPainelAberto = false;

  /** Ordenação dos cards na coleção */
  ordenacao: OrdenacaoColecao = 'fixa';
  modoColecaoVisual: ModoColecao = 'cards';
  modoDetalhe: ModoDetalhe = 'cards';

  readonly categoryLabels = CATEGORY_LABELS;

  removendoId: number | null = null;

  private templatesService = inject(TemplatesService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((q) => {
      const raw = q['categoria'];
      const next =
        typeof raw === 'string' && raw.trim() !== '' ? canonicalCategoryKey(raw.trim()) : null;
      this.categoriaAberta = next;
      if (next) {
        this.filtrosPainelAberto = false;
      }
      this.validarCategoriaNaUrl();
    });
  }

  ngOnInit(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.templatesService.list());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (list) => {
        this.listaPronta = true;
        this.templates = list;
        this.montarGrupos();
        this.validarCategoriaNaUrl();
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Não foi possível carregar os templates.';
      },
    });
  }

  /** Vista em grade da coleção (sem query categoria) */
  get modoColecao(): boolean {
    return !this.categoriaAberta;
  }

  get grupoDetalhe(): { key: string; label: string; items: Template[] } | null {
    if (!this.categoriaAberta) return null;
    const q = canonicalCategoryKey(this.categoriaAberta);
    return this.grupos.find((g) => g.key === q) ?? null;
  }

  get gruposParaColecao(): { key: string; label: string; items: Template[] }[] {
    const base = this.grupos.filter((g) => this.grupoVisivel(g));
    const copy = [...base];
    if (this.ordenacao === 'az') {
      copy.sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));
    } else if (this.ordenacao === 'recente') {
      copy.sort((a, b) => {
        const ta = this.isoMaisRecente(a.items) ?? '';
        const tb = this.isoMaisRecente(b.items) ?? '';
        return tb.localeCompare(ta);
      });
    }
    return copy;
  }

  get totalAtivos(): number {
    return this.templates.filter((t) => t.is_active).length;
  }

  get totalPublicos(): number {
    return this.templates.filter((t) => t.public_enabled).length;
  }

  get totalCategoriasComModelos(): number {
    return this.grupos.filter((g) => g.items.length > 0).length;
  }

  rotuloOrdenacao(): string {
    if (this.ordenacao === 'az') return 'A–Z';
    if (this.ordenacao === 'recente') return 'Recentes';
    return 'Padrão';
  }

  tituloOrdenacao(): string {
    if (this.ordenacao === 'az') return 'Ordenar: nome da categoria (A–Z)';
    if (this.ordenacao === 'recente') return 'Ordenar: última atualização na categoria';
    return 'Ordenar: ordem padrão do sistema';
  }

  ciclarOrdenacao(): void {
    const seq: OrdenacaoColecao[] = ['fixa', 'az', 'recente'];
    const i = seq.indexOf(this.ordenacao);
    this.ordenacao = seq[(i + 1) % seq.length];
  }

  corAccent(key: string): string {
    return CATEGORY_ACCENT[canonicalCategoryKey(key)] ?? '#8b5cf6';
  }

  fecharCategoria(): void {
    void this.router.navigate(['/templates']);
  }

  toggleFiltrosPainel(): void {
    this.filtrosPainelAberto = !this.filtrosPainelAberto;
  }

  setFiltro(f: 'all' | 'ativo' | 'publico'): void {
    this.filtroAtual = f;
  }

  setModoDetalhe(modo: ModoDetalhe): void {
    this.modoDetalhe = modo;
  }

  setModoColecaoVisual(modo: ModoColecao): void {
    this.modoColecaoVisual = modo;
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

  isoMaisRecente(items: Template[]): string | null {
    if (!items.length) return null;
    let max = items[0].updated_at;
    for (const t of items) {
      if ((t.updated_at ?? '') > (max ?? '')) max = t.updated_at;
    }
    return max ?? null;
  }

  rotuloAtualizacaoGrupo(grupo: { items: Template[] }): string {
    const iso = this.isoMaisRecente(grupo.items);
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    const now = new Date();
    const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startThat = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const diffDays = Math.round((startToday.getTime() - startThat.getTime()) / 86400000);
    if (diffDays === 0) return 'Atualizado hoje';
    if (diffDays === 1) return 'Atualizado ontem';
    if (diffDays > 1 && diffDays < 7) return `Atualizado há ${diffDays} dias`;
    return `Atualizado em ${d.toLocaleDateString('pt-BR')}`;
  }

  descricaoCurta(t: Template): string {
    const raw = (t.description ?? '').trim();
    if (!raw) return 'Modelo sem descrição.';
    return raw.length > 110 ? `${raw.slice(0, 107)}...` : raw;
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
        this.validarCategoriaNaUrl();
        this.toast.success('Template removido', `${nome} foi excluído.`);
      },
      error: () => {
        this.removendoId = null;
        this.toast.error('Erro ao remover', 'Não foi possível remover o template.');
      },
    });
  }

  private montarGrupos(): void {
    const byCategory = new Map<string, Template[]>();
    for (const t of this.templates) {
      const key = canonicalCategoryKey(t.category);
      if (!byCategory.has(key)) byCategory.set(key, []);
      byCategory.get(key)!.push(t);
    }
    const order = ['personalizado', ...Object.keys(CATEGORY_LABELS).filter((k) => k !== 'personalizado')];
    const categoriasExtras = [...byCategory.keys()]
      .filter((key) => !order.includes(key))
      .sort((a, b) => a.localeCompare(b, 'pt-BR'));
    const ordemFinal = [...order, ...categoriasExtras];

    this.grupos = ordemFinal
      .filter((key) => byCategory.has(key))
      .map((key) => ({
        key,
        label: CATEGORY_LABELS[key] ?? this.formatarChaveCategoriaFallback(key),
        items: byCategory.get(key)!,
      }));
  }

  /** Remove query inválida ou categoria sem modelos após filtro */
  private formatarChaveCategoriaFallback(key: string): string {
    return key
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  private validarCategoriaNaUrl(): void {
    if (!this.categoriaAberta || !this.listaPronta) return;
    const q = canonicalCategoryKey(this.categoriaAberta);
    const grupo = this.grupos.find((g) => g.key === q);
    if (!grupo) {
      void this.router.navigate(['/templates'], { replaceUrl: true });
    }
  }
}
