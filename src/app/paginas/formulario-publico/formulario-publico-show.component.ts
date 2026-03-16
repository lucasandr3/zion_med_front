import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { FlatpickrDirective, provideFlatpickrDefaults } from 'angularx-flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { RouterLink } from '@angular/router';
import { FormularioPublicoService, FormularioPublicoData, FormularioPublicoField } from '../../core/services/formulario-publico.service';
import { LoadingOverlayComponent } from '../../componentes/ui/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-formulario-publico-show',
  standalone: true,
  imports: [CommonModule, FormsModule, FlatpickrDirective, LoadingOverlayComponent, RouterLink],
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
export class FormularioPublicoShowComponent implements OnInit {
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
    return (f.type ?? '').toLowerCase();
  }
  submitterName = '';
  submitterEmail = '';
  carregando = true;
  enviando = false;
  erro = '';
  dark = false;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formularioService = inject(FormularioPublicoService);

  constructor() {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
  }

  ngOnInit(): void {
    try {
      this.dark = localStorage.getItem('zionmed_form_dark_mode') === '1';
    } catch {}
    if (!this.token) {
      this.carregando = false;
      this.erro = 'Link inválido.';
      return;
    }
    this.formularioService.getByToken(this.token).subscribe({
      next: (d) => {
        this.data = d;
        this.carregando = false;
        d.fields.forEach((f) => {
          if (f.type === 'checkbox') this.valores[f.name_key] = false;
          else this.valores[f.name_key] = '';
        });
      },
      error: (err) => {
        this.carregando = false;
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

  enviar(): void {
    if (!this.data || this.enviando) return;
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
    this.formularioService.submit(this.token, payload).subscribe({
      next: (r) => {
        this.enviando = false;
        this.router.navigate(['/f/sucesso'], {
          state: { protocol_number: r.protocol_number, clinic_name: this.data?.clinic_name },
        });
      },
      error: (err) => {
        this.enviando = false;
        this.erro = err.error?.message ?? (err.error?.errors ? Object.values(err.error.errors).flat().join(' ') : 'Não foi possível enviar. Tente novamente.');
      },
    });
  }

  trackByKey(_index: number, f: FormularioPublicoField): string {
    return f.name_key;
  }

  /** Inicia desenho da assinatura no canvas. */
  startSignature(e: MouseEvent | TouchEvent, key: string): void {
    e.preventDefault();
    const canvas = this.getSignatureCanvas(key);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = this.dark ? '#e8e8f0' : '#1a1a2e';
    ctx.lineWidth = 2;
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

  }
