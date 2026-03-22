import { Component, OnInit, inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProtocolosService, Protocolo } from '../../core/services/protocolos.service';
import { TemplatesService, Template } from '../../core/services/templates.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';

@Component({
  selector: 'app-protocolos-listagem',
  standalone: true,
  imports: [CommonModule, FormsModule, ZmSkeletonListComponent],
  templateUrl: './protocolos-listagem.component.html',
  styleUrl: './protocolos-listagem.component.css',
})
export class ProtocolosListagemComponent implements OnInit {
  protocolos: Protocolo[] = [];
  templates: Template[] = [];
  meta: { current_page: number; last_page: number; per_page: number; total: number } = {
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  };
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';
  exportando = false;

  busca = '';
  template_id: number | '' = '';
  status: string = '';
  data_inicio = '';
  data_fim = '';
  filterDrawerOpen = false;

  private protocolosService = inject(ProtocolosService);
  private templatesService = inject(TemplatesService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  ngOnInit(): void {
    this.templatesService.list().subscribe({ next: (t) => (this.templates = t) });
    this.carregar();
  }

  get temFiltrosAtivos(): boolean {
    return !!(
      this.template_id !== '' ||
      this.status !== '' ||
      this.data_inicio !== '' ||
      this.data_fim !== ''
    );
  }

  get quantidadeFiltrosAtivos(): number {
    let n = 0;
    if (this.template_id !== '') n++;
    if (this.status !== '') n++;
    if (this.data_inicio !== '') n++;
    if (this.data_fim !== '') n++;
    return n;
  }

  carregar(page = 1): void {
    const params: Parameters<ProtocolosService['list']>[0] = { per_page: 20, page };
    if (this.busca?.trim()) params.busca = this.busca.trim();
    if (this.template_id !== '') params.template_id = Number(this.template_id);
    if (this.status) params.status = this.status;
    if (this.data_inicio) params.data_inicio = this.data_inicio;
    if (this.data_fim) params.data_fim = this.data_fim;

    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.protocolosService.list(params));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.protocolos = res.data;
        this.meta = res.meta;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Não foi possível carregar os protocolos.';
      },
    });
  }

  aplicarFiltros(): void {
    this.filterDrawerOpen = false;
    this.carregar(1);
  }

  limparFiltros(): void {
    this.template_id = '';
    this.status = '';
    this.data_inicio = '';
    this.data_fim = '';
    this.filterDrawerOpen = false;
    this.carregar(1);
  }

  openFilterDrawer(): void {
    this.filterDrawerOpen = true;
  }

  closeFilterDrawer(): void {
    this.filterDrawerOpen = false;
  }

  irParaDetalhe(p: Protocolo, event: Event): void {
    if ((event.target as HTMLElement).closest('a, button')) return;
    this.router.navigate(['/protocolos', p.id]);
  }

  statusLabel(s: string): string {
    const map: Record<string, string> = {
      pending: 'Pendente',
      approved: 'Aprovado',
      rejected: 'Reprovado',
    };
    return map[s?.toLowerCase()] ?? s;
  }

  dataFormatada(val: string | undefined): string {
    if (!val) return '—';
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  exportarCsv(): void {
    this.exportando = true;
    const params: { template_id?: number; status?: string; data_inicio?: string; data_fim?: string } = {};
    if (this.template_id !== '') params.template_id = Number(this.template_id);
    if (this.status) params.status = this.status;
    if (this.data_inicio) params.data_inicio = this.data_inicio;
    if (this.data_fim) params.data_fim = this.data_fim;

    this.protocolosService.exportarCsv(params).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `protocolos-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        this.exportando = false;
      },
      error: () => (this.exportando = false),
    });
  }

  exportarPdf(): void {
    this.exportando = true;
    const params: { template_id?: number; status?: string; data_inicio?: string; data_fim?: string; limit?: number } = { limit: 50 };
    if (this.template_id !== '') params.template_id = Number(this.template_id);
    if (this.status) params.status = this.status;
    if (this.data_inicio) params.data_inicio = this.data_inicio;
    if (this.data_fim) params.data_fim = this.data_fim;

    this.protocolosService.exportarPdf(params).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `protocolos-pdf-${new Date().toISOString().slice(0, 10)}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        this.exportando = false;
      },
      error: () => (this.exportando = false),
    });
  }

  contagemTexto(): string {
    const n = this.meta.total;
    return n === 1 ? '1 registro' : `${n} registros`;
  }
}
