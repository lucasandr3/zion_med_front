import { Component, OnDestroy, OnInit, inject, ViewChild, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { FlatpickrDirective, provideFlatpickrDefaults } from 'angularx-flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { RouterLink } from '@angular/router';
import { PublicPageBodyService } from '../../core/services/public-page-body.service';
import { FormularioPublicoService, FormularioPublicoData, FormularioPublicoField } from '../../core/services/formulario-publico.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-formulario-publico-show',
  standalone: true,
  imports: [CommonModule, FormsModule, FlatpickrDirective, ZmSkeletonListComponent, RouterLink],
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
  templateUrl: './formulario-publico-show.component.html',
  styleUrl: './formulario-publico-show.component.css',
})
export class FormularioPublicoShowComponent implements OnInit, OnDestroy {
  @ViewChild('publicForm') ngForm!: NgForm;
  token = '';
  data: FormularioPublicoData | null = null;
  valores: Record<string, string | number | boolean | Date> = {};
  /** Par de valor + rótulo para select/radio. A API pode enviar:
   *  - string[]                         → ["Sim","Não"]
   *  - { options: string[] }            → { options: ["Sim","Não"] }
   *  - string (separada por , ou \n)    → "Sim,Não"
   *  - string JSON                      → "[\"Sim\",\"Não\"]"
   */
  getFieldOptions(f: FormularioPublicoField): { value: string; label: string }[] {
    let raw: unknown = f.options;
    if (!raw) return [];

    // API envolve em { options: [...] }
    if (raw && typeof raw === 'object' && !Array.isArray(raw) && 'options' in raw) {
      raw = (raw as Record<string, unknown>)['options'];
    }

    // String JSON ou separada por vírgula/quebra de linha
    if (typeof raw === 'string') {
      const str = raw.trim();
      if (str.startsWith('[') || str.startsWith('{')) {
        try { raw = JSON.parse(raw) as unknown; } catch { /* ignora */ }
      }
      if (typeof raw === 'string') {
        raw = str.split(/\n|,/).map((s: string) => s.trim()).filter(Boolean);
      }
    }

    if (Array.isArray(raw)) {
      return raw.map((o: unknown) => {
        if (typeof o === 'string') return { value: o, label: o };
        if (o && typeof o === 'object') {
          const obj = o as Record<string, unknown>;
          const label = String(obj['label'] ?? obj['name'] ?? obj['value'] ?? obj['text'] ?? '');
          const value = String(obj['value'] ?? obj['id'] ?? obj['label'] ?? obj['name'] ?? label);
          return { value, label: label || value };
        }
        return { value: String(o), label: String(o) };
      });
    }

    return [];
  }

  /** Tipo do campo normalizado (minúsculo) para o template. */
  fieldType(f: FormularioPublicoField): string {
    const t = (f.type ?? '').toLowerCase();
    if (t === 'anexo' || t === 'attachment') return 'file';
    return t;
  }
  submitterName = '';
  submitterEmail = '';
  /** Formulários com vínculo à ficha (código + nascimento). */
  personGateOk = false;
  personCode = '';
  personBirthDate = '';
  personGateErro = '';
  validandoPerson = false;
  personValidatedName: string | null = null;
  showSkeleton!: Signal<boolean>;
  enviando = false;
  erro = '';
  dark = false;
  /** Se a URL da logo existir mas a imagem falhar (404, CORS, host interno). */
  logoImageFailed = signal(false);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formularioService = inject(FormularioPublicoService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private publicPageBody = inject(PublicPageBodyService);

  constructor() {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
  }

  ngOnInit(): void {
    this.publicPageBody.enterPublicPage();
    try {
      this.dark = localStorage.getItem('zionmed_form_dark_mode') === '1';
    } catch {}
    if (!this.token) {
      this.showSkeleton = signal(false).asReadonly();
      this.erro = 'Link inválido.';
      return;
    }
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.formularioService.getByToken(this.token));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (d) => {
        this.logoImageFailed.set(false);
        this.data = d;
        this.personGateOk = !d.person_link?.enabled;
        this.personCode = '';
        this.personBirthDate = '';
        this.personGateErro = '';
        this.personValidatedName = null;
        d.fields.forEach((f) => {
          const ft = this.fieldType(f);
          if (ft === 'checkbox') this.valores[f.name_key] = false;
          else this.valores[f.name_key] = '';
        });
      },
      error: (err) => {
        this.erro = err.error?.message ?? 'Formulário não encontrado ou não disponível.';
      },
    });
  }

  toggleDark(): void {
    this.dark = !this.dark;
    try {
      localStorage.setItem('zionmed_form_dark_mode', this.dark ? '1' : '0');
    } catch {}
  }

  personLinkRequired(): boolean {
    return !!this.data?.person_link?.enabled;
  }

  personFormUnlocked(): boolean {
    return !this.personLinkRequired() || this.personGateOk;
  }

  validarIdentificacao(): void {
    this.personGateErro = '';
    if (!this.personCode.trim() || !this.personBirthDate) {
      this.personGateErro = 'Preencha o código e a data de nascimento.';
      return;
    }
    this.validandoPerson = true;
    this.formularioService
      .validatePerson(this.token, { code: this.personCode.trim(), birth_date: this.personBirthDate })
      .subscribe({
        next: (r) => {
          this.validandoPerson = false;
          this.personGateOk = true;
          this.personValidatedName = r.name;
        },
        error: (err) => {
          this.validandoPerson = false;
          const msg = err.error?.errors ? Object.values(err.error.errors).flat().join(' ') : err.error?.message;
          this.personGateErro = msg ?? 'Código ou data de nascimento não conferem.';
        },
      });
  }

  enviar(): void {
    if (!this.data || this.enviando) return;
    if (!this.personFormUnlocked()) return;
    if (this.ngForm && !this.ngForm.valid) return;
    this.enviando = true;
    this.erro = '';
    const normalized = Object.fromEntries(
      Object.entries(this.valores).map(([k, v]) => [
        k,
        v instanceof Date ? v.toISOString().slice(0, 10) : v,
      ])
    );
    const payload: Record<string, unknown> = {
      _submitter_name: this.submitterName || undefined,
      _submitter_email: this.submitterEmail || undefined,
      ...normalized,
    };
    if (this.personLinkRequired()) {
      payload['_person_code'] = this.personCode.trim();
      payload['_person_birth_date'] = this.personBirthDate;
    }
    this.formularioService.submit(this.token, payload).subscribe({
      next: (r) => {
        this.enviando = false;
        this.toast.success('Enviado com sucesso', 'Seu formulário foi recebido.');
        this.router.navigate(['/f/sucesso'], {
          state: {
            protocol_number: r.protocol_number,
            clinic_name: this.data?.clinic_name,
            clinic_logo_url: this.data?.logo_url ?? null,
          },
        });
      },
      error: (err) => {
        this.enviando = false;
        this.erro = err.error?.message ?? (err.error?.errors ? Object.values(err.error.errors).flat().join(' ') : 'Não foi possível enviar. Tente novamente.');
        this.toast.error('Não foi possível enviar', this.erro);
      },
    });
  }

  trackByKey(_index: number, f: FormularioPublicoField): string {
    return f.name_key;
  }

  clinicLogoDisplayUrl(): string | null {
    if (this.logoImageFailed()) return null;
    const u = this.data?.logo_url;
    return u != null && String(u).trim() !== '' ? String(u) : null;
  }

  onClinicLogoError(): void {
    this.logoImageFailed.set(true);
  }

  clinicNameInitial(): string {
    const n = (this.data?.clinic_name ?? 'Z').trim();
    return n ? n.charAt(0).toUpperCase() : 'Z';
  }

  /** Campos obrigatórios (para barra de progresso). */
  get requiredFieldsTotal(): number {
    return this.data?.fields.filter((f) => f.required).length ?? 0;
  }

  get requiredFieldsFilled(): number {
    if (!this.data) return 0;
    return this.data.fields.filter((f) => f.required && this.isFieldFilled(f)).length;
  }

  get progressPercent(): number {
    const t = this.requiredFieldsTotal;
    if (t <= 0) return 100;
    return Math.round((this.requiredFieldsFilled / t) * 100);
  }

  isFieldFilled(f: FormularioPublicoField): boolean {
    const v = this.valores[f.name_key];
    const t = this.fieldType(f);
    switch (t) {
      case 'checkbox':
        return v === true;
      case 'number':
        if (v === '' || v === null || v === undefined) return false;
        return !Number.isNaN(Number(v));
      case 'date':
        return v instanceof Date || (typeof v === 'string' && v.trim().length > 0);
      case 'signature':
        return typeof v === 'string' && v.length > 80;
      case 'file':
        return typeof v === 'string' && v.startsWith('data:') && v.length > 64;
      case 'select':
      case 'radio':
        return typeof v === 'string' && v.trim().length > 0;
      default:
        return String(v ?? '').trim().length > 0;
    }
  }

  /** Inicia desenho da assinatura no canvas. */
  startSignature(e: MouseEvent | TouchEvent, key: string): void {
    e.preventDefault();
    const canvas = this.getSignatureCanvas(key);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = this.dark ? '#d4c9bb' : '#1e1b18';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    const pos = this.getSignaturePoint(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    (canvas as unknown as { _signing: boolean })._signing = true;
  }

  /** Desenha na assinatura. */
  moveSignature(e: MouseEvent | TouchEvent, key: string): void {
    e.preventDefault();
    const canvas = this.getSignatureCanvas(key);
    if (!canvas || !(canvas as unknown as { _signing?: boolean })._signing) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pos = this.getSignaturePoint(e, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  /** Finaliza traço da assinatura e atualiza o valor (base64). */
  endSignature(key: string): void {
    const canvas = this.getSignatureCanvas(key);
    if (canvas) {
      (canvas as unknown as { _signing: boolean })._signing = false;
      this.valores[key] = canvas.toDataURL('image/png');
    }
  }

  /** Obtém canvas da assinatura pelo name_key. */
  private getSignatureCanvas(key: string): HTMLCanvasElement | null {
    return typeof document !== 'undefined' ? document.getElementById('signature_' + key) as HTMLCanvasElement | null : null;
  }

  private getSignaturePoint(e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e instanceof TouchEvent && e.touches.length) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    const me = e as MouseEvent;
    return { x: (me.clientX - rect.left) * scaleX, y: (me.clientY - rect.top) * scaleY };
  }

  private static readonly FILE_MAX_BYTES = 15 * 1024 * 1024;

  onFileSelected(event: Event, key: string): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      this.valores[key] = '';
      return;
    }
    if (file.size > FormularioPublicoShowComponent.FILE_MAX_BYTES) {
      this.toast.error('Arquivo grande demais', 'Escolha um arquivo de até 15 MB.');
      input.value = '';
      this.valores[key] = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const r = reader.result;
      this.valores[key] = typeof r === 'string' ? r : '';
    };
    reader.onerror = () => {
      this.toast.error('Erro ao ler arquivo', 'Tente outro arquivo.');
      input.value = '';
      this.valores[key] = '';
    };
    reader.readAsDataURL(file);
  }

  clearFile(key: string): void {
    this.valores[key] = '';
    const el = typeof document !== 'undefined' ? (document.getElementById('field_' + key) as HTMLInputElement | null) : null;
    if (el?.type === 'file') el.value = '';
  }

  /** Limpa o canvas e atualiza o valor da assinatura. */
  clearSignature(key: string): void {
    const canvas = this.getSignatureCanvas(key);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    this.valores[key] = '';
  }

  ngOnDestroy(): void {
    this.publicPageBody.leavePublicPage();
  }
}
