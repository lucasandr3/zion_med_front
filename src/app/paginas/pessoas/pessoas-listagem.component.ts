import { Component, OnInit, inject, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PessoasService, Pessoa } from '../../core/services/pessoas.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';

@Component({
  selector: 'app-pessoas-listagem',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ZmSkeletonListComponent],
  templateUrl: './pessoas-listagem.component.html',
  styleUrl: './pessoas-listagem.component.css',
})
export class PessoasListagemComponent implements OnInit {
  pessoas: Pessoa[] = [];
  meta: { current_page: number; last_page: number; per_page: number; total: number } = {
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  };
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';

  busca = '';
  status: string = '';
  has_protocols: '' | '1' | '0' = '';
  created_from = '';
  created_to = '';
  filterDrawerOpen = false;

  private pessoasService = inject(PessoasService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  ngOnInit(): void {
    this.carregar();
  }

  get temFiltrosAtivos(): boolean {
    return !!(this.status !== '' || this.has_protocols !== '' || this.created_from !== '' || this.created_to !== '');
  }

  get quantidadeFiltrosAtivos(): number {
    let n = 0;
    if (this.status !== '') n++;
    if (this.has_protocols !== '') n++;
    if (this.created_from !== '') n++;
    if (this.created_to !== '') n++;
    return n;
  }

  carregar(page = 1): void {
    const params: Parameters<PessoasService['list']>[0] = { per_page: 20, page };
    if (this.busca?.trim()) params.search = this.busca.trim();
    if (this.status) params.status = this.status;
    if (this.has_protocols !== '') params.has_protocols = this.has_protocols;
    if (this.created_from) params.created_from = this.created_from;
    if (this.created_to) params.created_to = this.created_to;

    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.pessoasService.list(params));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.pessoas = res.data;
        this.meta = res.meta;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Não foi possível carregar as pessoas.';
      },
    });
  }

  aplicarFiltros(): void {
    this.filterDrawerOpen = false;
    this.carregar(1);
  }

  limparFiltros(): void {
    this.status = '';
    this.has_protocols = '';
    this.created_from = '';
    this.created_to = '';
    this.filterDrawerOpen = false;
    this.carregar(1);
  }

  openFilterDrawer(): void {
    this.filterDrawerOpen = true;
  }

  closeFilterDrawer(): void {
    this.filterDrawerOpen = false;
  }

  irParaDetalhe(p: Pessoa, event: Event): void {
    if ((event.target as HTMLElement).closest('a, button')) return;
    this.router.navigate(['/pessoas', p.id]);
  }

  dataFormatada(val: string | undefined | null): string {
    if (!val) return '—';
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  formatarDataCurta(val: string | undefined | null): string {
    if (!val) return '—';
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString('pt-BR');
  }

  contagemTexto(): string {
    const n = this.meta.total;
    return n === 1 ? '1 registro' : `${n} registros`;
  }
}
