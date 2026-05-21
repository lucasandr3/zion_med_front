import { Component, OnInit, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PessoasService, PessoaDetalhe } from '../../core/services/pessoas.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonPessoaDetalheComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { AuthService } from '../../core/services/auth.service';

import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { ZardTableImports } from '@/shared/components/table';
@Component({
  selector: 'app-pessoas-detalhe',
  standalone: true,
  imports: [
    ...ZardTableImports,
    CommonModule,
    RouterLink,
    ZmSkeletonPessoaDetalheComponent,
    ZardCardComponent,
    ZardButtonComponent,
    ZardBadgeComponent,
  ],
  templateUrl: './pessoas-detalhe.component.html',
  styleUrl: './pessoas-detalhe.component.css',
})
export class PessoasDetalheComponent implements OnInit {
  pessoa: PessoaDetalhe | null = null;
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';
  inativando = false;
  abaAtiva: 'dados' | 'estatisticas' | 'protocolos' = 'dados';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pessoasService = inject(PessoasService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);
  private auth = inject(AuthService);

  get podeInativar(): boolean {
    return this.auth.hasPermission('people.deactivate');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.showSkeleton = signal(false).asReadonly();
      this.listaPronta = true;
      this.erro = 'ID inválido';
      return;
    }
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.pessoasService.get(Number(id)));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (p) => {
        this.listaPronta = true;
        this.pessoa = p;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Pessoa não encontrada.';
      },
    });
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

  statusProtocolo(s: string): string {
    const map: Record<string, string> = { pending: 'Pendente', approved: 'Aprovado', rejected: 'Reprovado' };
    return map[s?.toLowerCase()] ?? s;
  }

  statusPessoaBadgeClass(): string {
    if (this.pessoa?.status === 'active') {
      return 'border-transparent bg-[color-mix(in_srgb,var(--c-success)_14%,transparent)] text-[var(--c-success)]';
    }
    return 'border-transparent bg-[color-mix(in_srgb,var(--c-error)_14%,transparent)] text-[var(--c-error)]';
  }

  statusProtocoloBadgeClass(status: string): string {
    const s = status?.toLowerCase();
    if (s === 'pending') {
      return 'border-transparent bg-[color-mix(in_srgb,var(--c-warning)_14%,transparent)] text-[var(--c-warning)]';
    }
    if (s === 'rejected') {
      return 'border-transparent bg-[color-mix(in_srgb,var(--c-error)_14%,transparent)] text-[var(--c-error)]';
    }
    return 'border-transparent bg-[color-mix(in_srgb,var(--c-success)_14%,transparent)] text-[var(--c-success)]';
  }

  setAbaAtiva(aba: 'dados' | 'estatisticas' | 'protocolos'): void {
    this.abaAtiva = aba;
  }

  async inativar(): Promise<void> {
    if (!this.pessoa || !this.podeInativar) return;
    const ok = await this.confirm.request({
      title: 'Inativar pessoa?',
      message: 'A ficha ficará inativa. Formulários públicos com código não aceitarão mais esta pessoa até reativar.',
      confirmLabel: 'Sim, inativar',
      variant: 'danger',
    });
    if (!ok) return;
    this.inativando = true;
    this.pessoasService.destroy(this.pessoa.id).subscribe({
      next: () => {
        this.inativando = false;
        this.toast.success('Pessoa inativada', '');
        this.router.navigate(['/pessoas']);
      },
      error: (err) => {
        this.inativando = false;
        this.toast.error('Erro', err.error?.message ?? 'Não foi possível inativar.');
      },
    });
  }
}
