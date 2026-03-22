import { Component, OnInit, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PessoasService, PessoaDetalhe } from '../../core/services/pessoas.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonCardComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-pessoas-detalhe',
  standalone: true,
  imports: [CommonModule, RouterLink, ZmSkeletonCardComponent],
  templateUrl: './pessoas-detalhe.component.html',
  styleUrl: './pessoas-detalhe.component.css',
})
export class PessoasDetalheComponent implements OnInit {
  pessoa: PessoaDetalhe | null = null;
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';
  inativando = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pessoasService = inject(PessoasService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);
  private auth = inject(AuthService);

  get podeInativar(): boolean {
    return ['owner', 'admin'].includes(this.auth.getUser()?.role ?? '');
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
