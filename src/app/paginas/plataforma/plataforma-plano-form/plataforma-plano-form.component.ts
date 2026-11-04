import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  Signal,
  signal,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlataformaService, PlatformPlan } from '../../../core/services/plataforma.service';
import { PlataformaHeaderService } from '../../../core/services/plataforma-header.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmSkeletonCardComponent } from '../../../shared/components/skeletons';
import { ToastService } from '../../../core/services/toast.service';
import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { ZmPageBackLinkComponent } from '../../../shared/components/ui';

import { NORD_FORM_IMPORTS } from '@/shared/nord';

/** ~2 meses grátis: 12 × mensal pelo preço de 10. */
const DEFAULT_DISCOUNT_PERCENT = Math.round((2 / 12) * 10000) / 100; // 16.67

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-plataforma-plano-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page' },
  imports: [
    ...NORD_FORM_IMPORTS,
    FormsModule,
    RouterLink,
    GestgoCardComponent,
    ZmSkeletonCardComponent,
    ZmPageBackLinkComponent,
  ],
  templateUrl: './plataforma-plano-form.component.html',
  styleUrl: './plataforma-plano-form.component.css',
})
export class PlataformaPlanoFormComponent implements OnInit, OnDestroy {
  isEdit = false;
  id: string | null = null;
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');

  key = '';
  name = '';
  valueDisplay = '';
  valueNumber = 0;
  valueYearlyDisplay = '';
  valueYearlyNumber = 0;
  /** Desconto aplicado sobre 12 × mensal para obter o anual. */
  discountPercent = DEFAULT_DISCOUNT_PERCENT;
  description = '';
  sortOrder = 0;
  isActive = true;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private plataformaService = inject(PlataformaService);
  private headerService = inject(PlataformaHeaderService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.id;
    if (this.isEdit && this.id) {
      this.headerService.setHeader('Editar plano', '');
      const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getPlan(this.id));
      this.showSkeleton = showSkeleton;
      data$.subscribe({
        next: (res) => {
          this.listaPronta.set(true);
          const p = (res as { data?: PlatformPlan }).data ?? (res as unknown as PlatformPlan);
          this.preencherFormulario(p);
        },
        error: () => {
          this.plataformaService.getPlans().subscribe({
            next: (listRes) => {
              this.listaPronta.set(true);
              const list = listRes.data ?? [];
              const idNum = Number(this.id);
              const p = list.find((x) => x.id === this.id || x.id === idNum || String(x.id) === this.id);
              if (p) {
                this.preencherFormulario(p);
              } else {
                this.error.set('Plano não encontrado.');
              }
              this.cdr.markForCheck();
            },
            error: () => {
              this.listaPronta.set(true);
              this.error.set('Não foi possível carregar o plano.');
              this.cdr.markForCheck();
            },
          });
        },
      });
    } else {
      this.showSkeleton = signal(false).asReadonly();
      this.listaPronta.set(true);
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
    this.valueNumber = Number(p.value) || 0;
    this.valueDisplay = this.formatBrl(this.valueNumber);
    const yearly =
      p.value_yearly != null && Number(p.value_yearly) > 0
        ? Number(p.value_yearly)
        : this.calcularAnual(this.valueNumber, DEFAULT_DISCOUNT_PERCENT);
    this.valueYearlyNumber = yearly;
    this.valueYearlyDisplay = this.formatBrl(yearly);
    this.discountPercent = this.inferirDesconto(this.valueNumber, yearly);
    this.description = p.description ?? '';
    this.sortOrder = p.sort_order ?? 0;
    this.isActive = p.is_active !== false;
    this.headerService.setHeader('Editar plano', p.name);
    this.cdr.markForCheck();
  }

  onValueInput(raw: string): void {
    const parsed = this.parseMoneyMask(raw);
    this.valueDisplay = parsed.display;
    this.valueNumber = parsed.number;
    this.recalcularAnualDoDesconto();
  }

  onDiscountChange(raw: number | string): void {
    const n = typeof raw === 'number' ? raw : Number(String(raw).replace(',', '.'));
    this.discountPercent = Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 0;
    this.recalcularAnualDoDesconto();
  }

  onValueYearlyInput(raw: string): void {
    const parsed = this.parseMoneyMask(raw);
    this.valueYearlyDisplay = parsed.display;
    this.valueYearlyNumber = parsed.number;
    this.discountPercent = this.inferirDesconto(this.valueNumber, this.valueYearlyNumber);
    this.cdr.markForCheck();
  }

  onValueBlur(): void {
    this.valueDisplay = this.formatBrl(this.valueNumber);
    this.cdr.markForCheck();
  }

  onValueYearlyBlur(): void {
    this.valueYearlyDisplay = this.formatBrl(this.valueYearlyNumber);
    this.cdr.markForCheck();
  }

  economiaAnual(): number {
    const cheio = this.valueNumber * 12;
    const economia = cheio - this.valueYearlyNumber;
    return economia > 0 ? Math.round(economia * 100) / 100 : 0;
  }

  formatBrlPublic(n: number): string {
    return this.formatBrl(n);
  }

  private recalcularAnualDoDesconto(): void {
    const yearly = this.calcularAnual(this.valueNumber, this.discountPercent);
    this.valueYearlyNumber = yearly;
    this.valueYearlyDisplay = yearly > 0 ? this.formatBrl(yearly) : '';
    this.cdr.markForCheck();
  }

  /** Anual = 12 × mensal × (1 − desconto%). */
  private calcularAnual(mensal: number, descontoPct: number): number {
    if (!mensal || mensal <= 0) return 0;
    const pct = Math.min(100, Math.max(0, descontoPct)) / 100;
    return Math.round(mensal * 12 * (1 - pct) * 100) / 100;
  }

  /** Infere % de desconto a partir de mensal e anual salvos. */
  private inferirDesconto(mensal: number, anual: number): number {
    if (!mensal || mensal <= 0 || !anual || anual <= 0) return DEFAULT_DISCOUNT_PERCENT;
    const cheio = mensal * 12;
    if (cheio <= 0) return DEFAULT_DISCOUNT_PERCENT;
    const pct = (1 - anual / cheio) * 100;
    if (!Number.isFinite(pct) || pct < 0) return 0;
    if (pct > 100) return 100;
    return Math.round(pct * 100) / 100;
  }

  /** Máscara BRL a partir só dos dígitos (centavos), sem zero à esquerda no inteiro. */
  private parseMoneyMask(raw: string): { display: string; number: number } {
    const digits = String(raw ?? '').replace(/\D/g, '').replace(/^0+(?=\d)/, '');
    if (!digits) {
      return { display: '', number: 0 };
    }
    const padded = digits.padStart(3, '0');
    const cents = padded.slice(-2);
    const intRaw = padded.slice(0, -2).replace(/^0+(?=\d)/, '') || '0';
    const withDots = intRaw.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return {
      display: `${withDots},${cents}`,
      number: parseInt(digits, 10) / 100,
    };
  }

  private formatBrl(n: number): string {
    if (!Number.isFinite(n) || n < 0) n = 0;
    const fixed = n.toFixed(2);
    const [intPart, decPart] = fixed.split('.');
    const withDots = intPart!.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${withDots},${decPart}`;
  }

  submit(): void {
    this.error.set('');
    const name = this.name.trim();
    if (!name) {
      this.error.set('Nome é obrigatório.');
      return;
    }
    if (!this.isEdit && !this.key.trim()) {
      this.error.set('Chave é obrigatória.');
      return;
    }
    if (!/^[a-z0-9_-]+$/.test(this.key.trim()) && !this.isEdit) {
      this.error.set('Chave deve conter apenas letras minúsculas, números, _ e -.');
      return;
    }
    if (this.valueNumber < 0) {
      this.error.set('Valor mensal deve ser maior ou igual a zero.');
      return;
    }
    const valueYearly =
      this.valueYearlyNumber > 0
        ? this.valueYearlyNumber
        : this.calcularAnual(this.valueNumber, this.discountPercent);

    this.saving.set(true);
    if (this.isEdit && this.id) {
      this.plataformaService
        .updatePlan(this.id, {
          name,
          value: this.valueNumber,
          value_yearly: valueYearly,
          description: this.description.trim() || null,
          sort_order: this.sortOrder,
          is_active: this.isActive,
        })
        .subscribe({
          next: () => {
            this.saving.set(false);
            this.toast.success('Plano salvo', `${name} foi atualizado.`);
            this.router.navigate(['/plataforma/planos']);
          },
          error: () => {
            this.saving.set(false);
            this.error.set('Não foi possível salvar o plano.');
            this.toast.error('Erro', this.error());
            this.cdr.markForCheck();
          },
        });
    } else {
      this.plataformaService
        .createPlan({
          key: this.key.trim(),
          name,
          value: this.valueNumber,
          value_yearly: valueYearly,
          description: this.description.trim() || null,
          sort_order: this.sortOrder,
          is_active: this.isActive,
        })
        .subscribe({
          next: () => {
            this.saving.set(false);
            this.toast.success('Plano criado', `${name} foi cadastrado.`);
            this.router.navigate(['/plataforma/planos']);
          },
          error: () => {
            this.saving.set(false);
            this.error.set('Não foi possível criar o plano.');
            this.toast.error('Erro', this.error());
            this.cdr.markForCheck();
          },
        });
    }
  }
}
