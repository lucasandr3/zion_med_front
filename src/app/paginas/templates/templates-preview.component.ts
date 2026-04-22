import { Component, OnInit, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, map, of, switchMap } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { Template, TemplateCampo, TemplatesService } from '../../core/services/templates.service';

type PreviewValue = string | number | boolean;

@Component({
  selector: 'app-templates-preview',
  standalone: true,
  imports: [CommonModule, FormsModule, ZmSkeletonListComponent],
  templateUrl: './templates-preview.component.html',
  styleUrl: './templates-preview.component.css',
})
export class TemplatesPreviewComponent implements OnInit {
  templateId = '';
  template: Template | null = null;
  campos: TemplateCampo[] = [];
  valores: Record<string, PreviewValue> = {};
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';
  dark = false;

  private route = inject(ActivatedRoute);
  private templatesService = inject(TemplatesService);
  private loadingService = inject(LoadingService);

  constructor() {
    this.templateId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  get idNum(): number {
    return parseInt(this.templateId, 10) || 0;
  }

  ngOnInit(): void {
    try {
      this.dark = localStorage.getItem('gestgo_form_dark_mode') === '1';
    } catch {}
    this.carregar();
  }

  carregar(): void {
    const id = this.idNum;
    if (!id) return;
    this.erro = '';

    const load$ = this.templatesService.get(id).pipe(
      switchMap((template) =>
        this.templatesService.getCampos(id).pipe(
          map((campos) => ({ template, campos })),
          catchError(() => of({ template, campos: [] as TemplateCampo[] }))
        )
      )
    );

    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(load$);
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: ({ template, campos }) => {
        this.listaPronta = true;
        this.template = template;
        this.campos = campos;
        this.inicializarValores();
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Nao foi possivel carregar o preview do modelo.';
      },
    });
  }

  trackCampo(_index: number, campo: TemplateCampo): number {
    return campo.id;
  }

  fieldType(campo: TemplateCampo): string {
    const type = (campo.type ?? '').toLowerCase();
    if (type === 'anexo' || type === 'attachment') return 'file';
    return type;
  }

  getFieldOptions(campo: TemplateCampo): { value: string; label: string }[] {
    let raw: unknown = campo.options;
    if (!raw) return [];

    if (raw && typeof raw === 'object' && !Array.isArray(raw) && 'options' in raw) {
      raw = (raw as Record<string, unknown>)['options'];
    }

    if (typeof raw === 'string') {
      const str = raw.trim();
      if (str.startsWith('[') || str.startsWith('{')) {
        try {
          raw = JSON.parse(str) as unknown;
        } catch {
          raw = str;
        }
      }
      if (typeof raw === 'string') {
        raw = raw
          .split(/\n|,/)
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }

    if (!Array.isArray(raw)) return [];

    return raw.map((opt) => {
      if (typeof opt === 'string') return { value: opt, label: opt };
      if (opt && typeof opt === 'object') {
        const rec = opt as Record<string, unknown>;
        const value = String(rec['value'] ?? rec['id'] ?? rec['label'] ?? rec['name'] ?? '');
        const label = String(rec['label'] ?? rec['name'] ?? rec['value'] ?? value);
        return { value: value || label, label };
      }
      const normalized = String(opt);
      return { value: normalized, label: normalized };
    });
  }

  private inicializarValores(): void {
    this.valores = {};
    for (const campo of this.campos) {
      const type = this.fieldType(campo);
      if (type === 'checkbox') this.valores[campo.name_key] = false;
      else this.valores[campo.name_key] = '';
    }
  }

  toggleDark(): void {
    this.dark = !this.dark;
    try {
      localStorage.setItem('gestgo_form_dark_mode', this.dark ? '1' : '0');
    } catch {}
  }

  get requiredFieldsTotal(): number {
    return this.campos.filter((c) => !!c.required).length;
  }

  get requiredFieldsFilled(): number {
    return this.campos.filter((c) => !!c.required && this.isFieldFilled(c)).length;
  }

  get progressPercent(): number {
    const total = this.requiredFieldsTotal;
    if (!total) return 100;
    return Math.round((this.requiredFieldsFilled / total) * 100);
  }

  isFieldFilled(campo: TemplateCampo): boolean {
    const value = this.valores[campo.name_key];
    const type = this.fieldType(campo);
    if (type === 'checkbox') return value === true;
    if (type === 'number') return value !== '' && !Number.isNaN(Number(value));
    return String(value ?? '').trim().length > 0;
  }
}
