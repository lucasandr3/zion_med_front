import { Component, OnInit, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrDirective, provideFlatpickrDefaults } from 'angularx-flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { PessoasService } from '../../core/services/pessoas.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonCardComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';

/** Formata dígitos para exibição: +55 (11) 98765-4321 ou (11) 98765-4321 */
function formatPhoneBrDisplay(digits: string): string {
  if (!digits) return '';
  if (digits.startsWith('55') && digits.length > 2) {
    const r = digits.slice(2);
    if (r.length <= 2) return `+55 (${r}`;
    if (r.length <= 6) return `+55 (${r.slice(0, 2)}) ${r.slice(2)}`;
    if (r.length <= 10) return `+55 (${r.slice(0, 2)}) ${r.slice(2, 6)}-${r.slice(6)}`;
    return `+55 (${r.slice(0, 2)}) ${r.slice(2, 7)}-${r.slice(7, 11)}`;
  }
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

function digitsOnlyPhone(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, 13);
}

function digitsOnlyCpf(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, 11);
}

/** CPF: 000.000.000-00 */
function formatCpfDisplay(digits: string): string {
  if (!digits) return '';
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
}

@Component({
  selector: 'app-pessoas-formulario',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ZmSkeletonCardComponent, FlatpickrDirective],
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

  name = '';
  /** Dígitos apenas (55 + DDD + número, até 13). */
  phoneDigits = '';
  /** Valor exibido com máscara (sincronizado com phoneDigits). */
  phoneDisplay = '';
  email = '';
  /** Data: string Y-m-d ou Date (Flatpickr com convertModelValue). */
  birth_date: string | Date | null = '';
  /** Apenas dígitos do CPF (até 11). */
  cpfDigits = '';
  cpfDisplay = '';
  notes = '';
  status: 'active' | 'inactive' = 'active';

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
          this.name = p.name ?? '';
          this.phoneDigits = digitsOnlyPhone(p.phone ?? '');
          this.phoneDisplay = formatPhoneBrDisplay(this.phoneDigits);
          this.email = p.email ?? '';
          this.birth_date = p.birth_date ? p.birth_date : '';
          this.cpfDigits = digitsOnlyCpf(p.cpf ?? '');
          this.cpfDisplay = formatCpfDisplay(this.cpfDigits);
          this.notes = p.notes ?? '';
          this.status = (p.status === 'inactive' ? 'inactive' : 'active') as 'active' | 'inactive';
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
    this.phoneDigits = d;
    this.phoneDisplay = formatPhoneBrDisplay(d);
  }

  onCpfModelChange(raw: string): void {
    const d = digitsOnlyCpf(raw);
    this.cpfDigits = d;
    this.cpfDisplay = formatCpfDisplay(d);
  }

  /** API: só dígitos ou null (backend costuma normalizar). */
  private cpfForApi(): string | null {
    return this.cpfDigits ? this.cpfDigits : null;
  }

  /** Envia telefone no padrão WhatsApp quando possível (55…). */
  private phoneForApi(): string | null {
    if (!this.phoneDigits) return null;
    let d = this.phoneDigits;
    if (d.length >= 10 && d.length <= 11 && !d.startsWith('55')) {
      d = '55' + d;
    }
    return d;
  }

  private serializeBirthDate(): string | null {
    const v = this.birth_date;
    if (v == null || v === '') return null;
    if (v instanceof Date) {
      if (isNaN(v.getTime())) return null;
      const y = v.getFullYear();
      const m = String(v.getMonth() + 1).padStart(2, '0');
      const d = String(v.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
    const s = String(v).trim();
    return s || null;
  }

  salvar(): void {
    if (!this.name.trim()) return;
    this.salvando = true;
    this.erro = '';
    const body = {
      name: this.name.trim(),
      phone: this.phoneForApi(),
      email: this.email.trim() || null,
      birth_date: this.serializeBirthDate(),
      cpf: this.cpfForApi(),
      notes: this.notes.trim() || null,
      status: this.status,
    };
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
