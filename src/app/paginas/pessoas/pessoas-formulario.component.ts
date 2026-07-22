import { Component, OnInit, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PessoasService } from '../../core/services/pessoas.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonPessoaFormularioComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';
import { MAT_FORM_IMPORTS } from '@/shared/material';
import { OpenPickerOnInteractDirective } from '@/shared/directives/open-picker-on-interact.directive';
import { parseYmdToDate } from '@/shared/utils/date-time.util';
import {
  buildPessoaApiPayload,
  digitsOnlyCpf,
  digitsOnlyPhone,
  formatCpfDisplay,
  formatPhoneBrDisplay,
} from './pessoas-form.util';

@Component({
  selector: 'app-pessoas-formulario',
  standalone: true,
  imports: [
    ...MAT_FORM_IMPORTS,
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    ZmSkeletonPessoaFormularioComponent,
    MatProgressSpinnerModule,
    OpenPickerOnInteractDirective,
  ],
  templateUrl: './pessoas-formulario.component.html',
  styleUrl: './pessoas-formulario.component.css',
})
export class PessoasFormularioComponent implements OnInit {
  editMode = false;
  pessoaId: number | null = null;

  readonly pessoaForm = inject(FormBuilder).nonNullable.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    phoneDigits: [''],
    phoneAltDigits: [''],
    cpfDigits: [''],
    profession: [''],
    rg: [''],
    age: [null as number | null],
    sex: ['' as 'F' | 'M' | 'O' | ''],
    marital_status: [''],
    referred_by: [''],
    address: [''],
    neighborhood: [''],
    city: [''],
    cep: [''],
    lead_source_instagram: [false],
    lead_source_google: [false],
    lead_source_facebook: [false],
    lead_source_indicacao_amigo: [false],
    lead_source_indicacao_medica: [false],
    lead_source_plano_saude: [false],
    lead_source_outro: [''],
    has_health_plan: ['' as 'sim' | 'nao' | ''],
    health_plan_operator: [''],
    health_plan_card_number: [''],
    lgpd_accept_comms: [false],
    lgpd_accept_reminders: [false],
    notes: [''],
    status: ['active' as 'active' | 'inactive'],
  });

  phoneDisplay = '';
  phoneAltDisplay = '';
  cpfDisplay = '';
  birth_date: Date | null = null;

  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  salvando = false;
  erro = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pessoasService = inject(PessoasService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.pessoaId = Number(id);
      const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.pessoasService.get(this.pessoaId));
      this.showSkeleton = showSkeleton;
      data$.subscribe({
        next: (p) => {
          this.listaPronta = true;
          const phoneDigits = digitsOnlyPhone(p.phone ?? '');
          const phoneAltDigits = digitsOnlyPhone(p.phone_alt ?? '');
          const cpfDigits = digitsOnlyCpf(p.cpf ?? '');
          this.pessoaForm.patchValue({
            name: p.name ?? '',
            email: p.email ?? '',
            phoneDigits,
            phoneAltDigits,
            cpfDigits,
            rg: p.rg ?? '',
            age: p.age ?? null,
            sex: (p.sex === 'F' || p.sex === 'M' || p.sex === 'O') ? p.sex : '',
            marital_status: p.marital_status ?? '',
            profession: p.profession ?? '',
            referred_by: p.referred_by ?? '',
            address: p.address ?? '',
            neighborhood: p.neighborhood ?? '',
            city: p.city ?? '',
            cep: p.cep ?? '',
            lead_source_instagram: !!p.lead_source_instagram,
            lead_source_google: !!p.lead_source_google,
            lead_source_facebook: !!p.lead_source_facebook,
            lead_source_indicacao_amigo: !!p.lead_source_indicacao_amigo,
            lead_source_indicacao_medica: !!p.lead_source_indicacao_medica,
            lead_source_plano_saude: !!p.lead_source_plano_saude,
            lead_source_outro: p.lead_source_outro ?? '',
            has_health_plan: p.has_health_plan === 'sim' || p.has_health_plan === 'nao' ? p.has_health_plan : '',
            health_plan_operator: p.health_plan_operator ?? '',
            health_plan_card_number: p.health_plan_card_number ?? '',
            lgpd_accept_comms: !!p.lgpd_accept_comms,
            lgpd_accept_reminders: !!p.lgpd_accept_reminders,
            notes: p.notes ?? '',
            status: (p.status === 'inactive' ? 'inactive' : 'active') as 'active' | 'inactive',
          });
          this.phoneDisplay = formatPhoneBrDisplay(phoneDigits);
          this.phoneAltDisplay = formatPhoneBrDisplay(phoneAltDigits);
          this.cpfDisplay = formatCpfDisplay(cpfDigits);
          this.birth_date = parseYmdToDate(p.birth_date);
        },
        error: () => {
          this.listaPronta = true;
          this.erro = 'Pessoa não encontrada.';
        },
      });
    } else {
      this.showSkeleton = signal(false).asReadonly();
      this.listaPronta = true;
    }
  }

  onPhoneModelChange(raw: string): void {
    const d = digitsOnlyPhone(raw);
    this.pessoaForm.patchValue({ phoneDigits: d });
    this.phoneDisplay = formatPhoneBrDisplay(d);
  }

  onPhoneAltModelChange(raw: string): void {
    const d = digitsOnlyPhone(raw);
    this.pessoaForm.patchValue({ phoneAltDigits: d });
    this.phoneAltDisplay = formatPhoneBrDisplay(d);
  }

  onCpfModelChange(raw: string): void {
    const d = digitsOnlyCpf(raw);
    this.pessoaForm.patchValue({ cpfDigits: d });
    this.cpfDisplay = formatCpfDisplay(d);
  }

  salvar(): void {
    this.pessoaForm.markAllAsTouched();
    if (this.pessoaForm.invalid) return;
    this.salvando = true;
    this.erro = '';
    const body = buildPessoaApiPayload(this.pessoaForm.getRawValue(), this.birth_date);
    if (this.editMode && this.pessoaId != null) {
      this.pessoasService.update(this.pessoaId, body).subscribe({
        next: () => {
          this.salvando = false;
          this.toast.success('Pessoa salva', '');
          this.router.navigate(['/pessoas', this.pessoaId]);
        },
        error: (err) => {
          this.salvando = false;
          this.erro = err.error?.message ?? 'Não foi possível salvar.';
          this.toast.error('Erro', this.erro);
        },
      });
    } else {
      this.pessoasService.create(body).subscribe({
        next: (p) => {
          this.salvando = false;
          this.toast.success('Pessoa cadastrada', `Código: ${p.code}`);
          this.router.navigate(['/pessoas', p.id]);
        },
        error: (err) => {
          this.salvando = false;
          this.erro = err.error?.message ?? 'Não foi possível cadastrar.';
          this.toast.error('Erro', this.erro);
        },
      });
    }
  }
}
