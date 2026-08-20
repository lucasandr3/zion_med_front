import { Component, OnInit, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlatpickrDirective, provideFlatpickrDefaults } from 'angularx-flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { PessoasService } from '../../core/services/pessoas.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonPessoaFormularioComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardComboboxComponent, type ZardComboboxOption } from '@/shared/components/combobox';
import { ZARD_FORM_CONTROL_IMPORTS } from '@/shared/components/input';
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
    ...ZARD_FORM_CONTROL_IMPORTS,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    ZmSkeletonPessoaFormularioComponent,
    FlatpickrDirective,
    ZardCardComponent,
    ZardButtonComponent,
    ZardComboboxComponent,
  ],
  providers: [
    provideFlatpickrDefaults({
      locale: Portuguese,
      dateFormat: 'Y-m-d',
      altInput: true,
      altFormat: 'd/m/Y',
      allowInput: true,
      disableMobile: true,
      static: true,
    }),
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
  birth_date: string | Date | null = '';

  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  salvando = false;
  erro = '';
  flatpickrAppendTo!: HTMLElement;

  readonly opcoesSexo: ZardComboboxOption[] = [
    { value: '', label: 'Selecione' },
    { value: 'F', label: 'Feminino' },
    { value: 'M', label: 'Masculino' },
    { value: 'O', label: 'Outro' },
  ];

  readonly opcoesEstadoCivil: ZardComboboxOption[] = [
    { value: '', label: 'Selecione' },
    { value: 'solteiro', label: 'Solteiro(a)' },
    { value: 'casado', label: 'Casado(a)' },
    { value: 'divorciado', label: 'Divorciado(a)' },
    { value: 'viuvo', label: 'Viúvo(a)' },
    { value: 'uniao_estavel', label: 'União estável' },
  ];

  readonly opcoesPlanoSaude: ZardComboboxOption[] = [
    { value: '', label: 'Selecione' },
    { value: 'sim', label: 'Sim' },
    { value: 'nao', label: 'Não' },
  ];

  readonly opcoesStatus: ZardComboboxOption[] = [
    { value: 'active', label: 'Ativa' },
    { value: 'inactive', label: 'Inativa' },
  ];

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pessoasService = inject(PessoasService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);

  ngOnInit(): void {
    this.flatpickrAppendTo = document.body;
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
          this.birth_date = p.birth_date ? p.birth_date : '';
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
