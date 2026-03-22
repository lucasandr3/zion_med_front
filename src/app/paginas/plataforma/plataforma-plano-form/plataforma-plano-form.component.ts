import { Component, OnInit, OnDestroy, inject, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlataformaService, PlatformPlan } from '../../../core/services/plataforma.service';
import { PlataformaHeaderService } from '../../../core/services/plataforma-header.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmSkeletonCardComponent } from '../../../shared/components/skeletons';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-plataforma-plano-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ZmSkeletonCardComponent],
  templateUrl: './plataforma-plano-form.component.html',
  styleUrl: './plataforma-plano-form.component.css',
})
export class PlataformaPlanoFormComponent implements OnInit, OnDestroy {
  isEdit = false;
  id: string | null = null;
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  saving = false;
  error = '';

  key = '';
  name = '';
  valueDisplay = '';
  valueNumber = 0;
  description = '';
  sortOrder = 0;
  isActive = true;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private plataformaService = inject(PlataformaService);
  private headerService = inject(PlataformaHeaderService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.id;
    if (this.isEdit && this.id) {
      this.headerService.setHeader('Editar plano', '');
      const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getPlan(this.id));
      this.showSkeleton = showSkeleton;
      data$.subscribe({
        next: (res) => {
          this.listaPronta = true;
          const p = (res as { data?: PlatformPlan }).data ?? (res as unknown as PlatformPlan);
          this.preencherFormulario(p);
        },
        error: () => {
          this.plataformaService.getPlans().subscribe({
            next: (listRes) => {
              this.listaPronta = true;
              const list = listRes.data ?? [];
              const idNum = Number(this.id);
              const p = list.find((x) => x.id === this.id || x.id === idNum || String(x.id) === this.id);
              if (p) {
                this.preencherFormulario(p);
              } else {
                this.error = 'Plano não encontrado.';
              }
            },
            error: () => {
              this.listaPronta = true;
              this.error = 'Não foi possível carregar o plano.';
            },
          });
        },
      });
    } else {
      this.showSkeleton = signal(false).asReadonly();
      this.listaPronta = true;
      this.headerService.setHeader('Novo plano', 'Criar plano de assinatura.');
    }
  }

  ngOnDestroy(): void {
    this.headerService.clearHeader();
  }

  preencherFormulario(p: PlatformPlan): void {
    if (!p) return;
    this.key = p.key ?? '';
    this.name = p.name ?? '';
    this.valueNumber = Number(p.value) ?? 0;
    this.valueDisplay = this.formatBrl(this.valueNumber);
    this.description = p.description ?? '';
    this.sortOrder = p.sort_order ?? 0;
    this.isActive = p.is_active !== false;
    this.headerService.setHeader('Editar plano', p.name);
  }

  onValueInput(raw: string): void {
    const digits = (raw ?? this.valueDisplay).replace(/\D/g, '');
    const padded = digits.padStart(2, '0');
    const cents = padded.slice(-2);
    const intPart = padded.slice(0, -2) || '0';
    const withDots = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    this.valueDisplay = withDots + ',' + cents;
    this.valueNumber = digits.length === 0 ? 0 : parseInt(digits, 10) / 100;
  }

  onValueBlur(): void {
    if (this.valueNumber >= 0) {
      this.valueDisplay = this.formatBrl(this.valueNumber);
    }
  }

  private formatBrl(n: number): string {
    const fixed = n.toFixed(2);
    const [intPart, decPart] = fixed.split('.');
    const withDots = intPart!.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return withDots + ',' + decPart;
  }

  submit(): void {
    this.error = '';
    const name = this.name.trim();
    if (!name) {
      this.error = 'Nome é obrigatório.';
      return;
    }
    if (!this.isEdit && !this.key.trim()) {
      this.error = 'Chave é obrigatória.';
      return;
    }
    if (!/^[a-z0-9_-]+$/.test(this.key.trim()) && !this.isEdit) {
      this.error = 'Chave deve conter apenas letras minúsculas, números, _ e -.';
      return;
    }
    if (this.valueNumber < 0) {
      this.error = 'Valor deve ser maior ou igual a zero.';
      return;
    }

    this.saving = true;
    if (this.isEdit && this.id) {
      this.plataformaService
        .updatePlan(this.id, {
          name,
          value: this.valueNumber,
          description: this.description.trim() || null,
          sort_order: this.sortOrder,
          is_active: this.isActive,
        })
        .subscribe({
          next: () => {
            this.saving = false;
            this.toast.success('Plano salvo', `${name} foi atualizado.`);
            this.router.navigate(['/plataforma/planos']);
          },
          error: () => {
            this.saving = false;
            this.error = 'Não foi possível salvar o plano.';
            this.toast.error('Erro', this.error);
          },
        });
    } else {
      this.plataformaService
        .createPlan({
          key: this.key.trim(),
          name,
          value: this.valueNumber,
          description: this.description.trim() || null,
          sort_order: this.sortOrder,
          is_active: this.isActive,
        })
        .subscribe({
          next: () => {
            this.saving = false;
            this.toast.success('Plano criado', `${name} foi cadastrado.`);
            this.router.navigate(['/plataforma/planos']);
          },
          error: () => {
            this.saving = false;
            this.error = 'Não foi possível criar o plano.';
            this.toast.error('Erro', this.error);
          },
        });
    }
  }
}
