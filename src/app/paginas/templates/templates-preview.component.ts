import {
  Component,
  OnDestroy,
  OnInit,
  Signal,
  ViewEncapsulation,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError, map, of, switchMap } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';
import { PublicPageBodyService } from '../../core/services/public-page-body.service';
import { NORD_FORM_IMPORTS } from '@/shared/nord';

import { Template, TemplateCampo, TemplatesService } from '../../core/services/templates.service';

type PreviewValue = string | number | boolean;

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-templates-preview',
  standalone: true,
  imports: [FormsModule, ...NORD_FORM_IMPORTS],
  templateUrl: './templates-preview.component.html',
  styleUrl: './templates-preview.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TemplatesPreviewComponent implements OnInit, OnDestroy {
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
  private publicPageBody = inject(PublicPageBodyService);

  constructor() {
    this.templateId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  get idNum(): number {
    return parseInt(this.templateId, 10) || 0;
  }

  ngOnInit(): void {
    this.publicPageBody.enterPublicPage();
    this.lockPageScroll();
    try {
      this.dark = localStorage.getItem('gestgo_form_dark_mode') === '1';
    } catch {
      /* ignore */
    }
    this.syncDarkChrome();
    this.carregar();
  }

  ngOnDestroy(): void {
    this.unlockPageScroll();
    this.publicPageBody.leavePublicPage();
  }

  carregar(): void {
    const id = this.idNum;
    if (!id) return;
    this.erro = '';

    const load$ = this.templatesService.get(id).pipe(
      switchMap((template) =>
        this.templatesService.getCampos(id).pipe(
          map((campos) => ({ template, campos })),
          catchError(() => of({ template, campos: [] as TemplateCampo[] })),
        ),
      ),
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
        this.erro = 'Não foi possível carregar a prévia do modelo.';
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
    } catch {
      /* ignore */
    }
    this.syncDarkChrome();
  }

  private syncDarkChrome(): void {
    if (this.dark) {
      this.publicPageBody.applyPageBackground('#050505');
    } else {
      this.publicPageBody.applyPageBackground('#eff4f1');
    }
  }

  private lockPageScroll(): void {
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100dvh';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100dvh';
  }

  private unlockPageScroll(): void {
    document.documentElement.style.removeProperty('overflow');
    document.documentElement.style.removeProperty('height');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('height');
  }

  get requiredFieldsTotal(): number {
    return this.campos.filter((c) => {
      const t = this.fieldType(c);
      return !!c.required && t !== 'heading' && t !== 'notice' && t !== 'section_break';
    }).length;
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
