import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import { ServicosService, type ClinicServiceItem } from '../../core/services/servicos.service';
import { TemplatesService, type Template } from '../../core/services/templates.service';
import { LinksPublicosService, type LinkPublico } from '../../core/services/links-publicos.service';
import { ToastService } from '../../core/services/toast.service';
import { GestgoComboboxComponent, type GestgoComboboxOption } from '@/shared/components/combobox';
import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
import { absoluteMediaUrl } from '../../core/utils/absolute-media-url';

const AVATAR_COLORS = ['#12b886', '#3b82f6', '#a855f7', '#f97316', '#ec4899', '#0ea5a4'];

@Component({
  selector: 'app-servicos-formulario',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { class: 'n-page' },
  imports: [
    ...NORD_FORM_IMPORTS,
    FormsModule,
    RouterLink,
    GestgoComboboxComponent,
    GestgoCardComponent,
    ZmPageBackLinkComponent,
  ],
  templateUrl: './servicos-formulario.component.html',
  styleUrl: './servicos-formulario.component.css',
})
export class ServicosFormularioComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly servicosApi = inject(ServicosService);
  private readonly templatesApi = inject(TemplatesService);
  private readonly linksPublicosApi = inject(LinksPublicosService);
  private readonly toast = inject(ToastService);

  readonly editMode = signal(false);
  readonly loading = signal(true);
  readonly salvando = signal(false);
  readonly fichas = signal<Template[]>([]);
  readonly photoPreview = signal<string | null>(null);

  servicoId: number | null = null;
  name = '';
  duration_minutes = 30;
  priceDisplay = '';
  priceNumber: number | null = null;
  show_price = false;
  pedir_ficha = false;
  form_template_id: number | null = null;
  form_template_optional_id: number | null = null;
  photo_url: string | null = null;

  private photoFile: File | null = null;
  private photoRemoved = false;

  readonly opcoesFicha = computed<GestgoComboboxOption[]>(() =>
    this.fichas().map((t) => ({ value: String(t.id), label: t.name })),
  );

  ngOnInit(): void {
    this.loadFichas();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editMode.set(true);
      this.servicoId = Number(idParam);
      const fromList = (history.state?.['servico'] ?? null) as ClinicServiceItem | null;
      if (fromList?.id === this.servicoId) {
        this.patchFromItem(fromList);
        this.loading.set(false);
        return;
      }
      this.servicosApi.list().subscribe({
        next: (list) => {
          const found = (list || []).find((s) => s.id === this.servicoId);
          if (!found) {
            this.loading.set(false);
            this.toast.error('Serviço', 'Não encontrado.');
            void this.router.navigateByUrl('/servicos');
            return;
          }
          this.patchFromItem(found);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.toast.error('Serviço', 'Não foi possível carregar.');
          void this.router.navigateByUrl('/servicos');
        },
      });
      return;
    }
    this.loading.set(false);
  }

  ngOnDestroy(): void {
    this.revokePreview();
  }

  onPriceInput(raw: string): void {
    const parsed = this.parseMoneyMask(raw);
    this.priceDisplay = parsed.display;
    this.priceNumber = parsed.number > 0 ? parsed.number : null;
    if (this.priceNumber == null) this.show_price = false;
  }

  onFichaToggle(checked: boolean): void {
    this.pedir_ficha = !!checked;
    if (!this.pedir_ficha) {
      this.form_template_id = null;
      this.form_template_optional_id = null;
      return;
    }
    if (!this.form_template_id && this.fichas().length === 1) {
      this.form_template_id = this.fichas()[0].id;
    }
  }

  onFichaChange(raw: string | null): void {
    const n = Number(raw);
    this.form_template_id = Number.isFinite(n) && n > 0 ? n : null;
    if (
      this.form_template_optional_id != null &&
      this.form_template_id != null &&
      this.form_template_optional_id === this.form_template_id
    ) {
      this.form_template_optional_id = null;
    }
  }

  onFichaOpcionalChange(raw: string | null): void {
    const n = Number(raw);
    const id = Number.isFinite(n) && n > 0 ? n : null;
    if (id != null && this.form_template_id != null && id === this.form_template_id) {
      this.toast.error('Documento opcional', 'Escolha um modelo diferente do obrigatório.');
      this.form_template_optional_id = null;
      return;
    }
    this.form_template_optional_id = id;
  }

  fichaValue(): string | null {
    return this.form_template_id != null ? String(this.form_template_id) : null;
  }

  fichaOpcionalValue(): string | null {
    return this.form_template_optional_id != null ? String(this.form_template_optional_id) : null;
  }

  opcoesFichaOpcional(): GestgoComboboxOption[] {
    return this.fichas()
      .filter((t) => t.id !== this.form_template_id)
      .map((t) => ({ value: String(t.id), label: t.name }));
  }

  onPhotoSelected(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    input.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.toast.error('Arquivo inválido', 'Envie JPG, PNG ou WebP.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      this.toast.error('Arquivo grande', 'Máximo 2 MB.');
      return;
    }
    this.revokePreview();
    this.photoFile = file;
    this.photoRemoved = false;
    this.photoPreview.set(URL.createObjectURL(file));
  }

  removePhoto(): void {
    this.revokePreview();
    this.photoFile = null;
    this.photoRemoved = true;
    this.photoPreview.set(null);
    this.photo_url = null;
  }

  iniciais(name: string): string {
    const letters = name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0])
      .join('')
      .toUpperCase();
    return letters || '?';
  }

  corAvatar(name: string): string {
    const key = name.trim() || '?';
    let hash = 0;
    for (let i = 0; i < key.length; i++) hash += key.charCodeAt(i);
    return AVATAR_COLORS[hash % AVATAR_COLORS.length];
  }

  salvar(): void {
    const name = this.name.trim();
    if (!name) {
      this.toast.error('Informe o nome', 'Digite o nome do serviço.');
      return;
    }
    if (this.show_price && this.priceNumber == null) {
      this.toast.error('Informe o valor', 'Para exibir na agenda pública, preencha o valor.');
      return;
    }
    if (this.pedir_ficha && !this.form_template_id) {
      this.toast.error('Escolha a ficha', 'Selecione o documento obrigatório do pacote.');
      return;
    }
    if (
      this.pedir_ficha &&
      this.form_template_optional_id != null &&
      this.form_template_optional_id === this.form_template_id
    ) {
      this.toast.error('Documento opcional', 'Deve ser diferente do obrigatório.');
      return;
    }
    const payload = {
      name,
      duration_minutes: Number(this.duration_minutes) || 30,
      price: this.priceNumber,
      show_price: !!this.show_price && this.priceNumber != null,
      form_template_id: this.pedir_ficha ? this.form_template_id : null,
      form_template_optional_id: this.pedir_ficha ? this.form_template_optional_id : null,
      is_active: true,
    };
    const editingId = this.servicoId;
    const pendingPhoto = this.photoFile;
    const removePhoto = this.photoRemoved && !pendingPhoto;
    this.salvando.set(true);
    const req$ = editingId
      ? this.servicosApi.update(editingId, payload)
      : this.servicosApi.create(payload);
    req$.subscribe({
      next: (saved) => {
        const finish = () => {
          this.salvando.set(false);
          this.toast.success(editingId ? 'Serviço atualizado' : 'Serviço criado', '');
          void this.router.navigateByUrl('/servicos');
        };
        if (pendingPhoto) {
          this.servicosApi.uploadPhoto(saved.id, pendingPhoto).subscribe({
            next: () => finish(),
            error: (err) => {
              this.salvando.set(false);
              this.toast.error(
                'Serviço salvo, mas a foto falhou',
                err.error?.message ?? 'Tente enviar a foto de novo.',
              );
              void this.router.navigateByUrl('/servicos');
            },
          });
          return;
        }
        if (removePhoto && editingId) {
          this.servicosApi.deletePhoto(editingId).subscribe({
            next: () => finish(),
            error: () => finish(),
          });
          return;
        }
        finish();
      },
      error: (err) => {
        this.salvando.set(false);
        this.toast.error('Erro', err.error?.message ?? 'Não foi possível salvar.');
      },
    });
  }

  private patchFromItem(s: ClinicServiceItem): void {
    const price = this.parsePrice(s.price);
    const photo = absoluteMediaUrl(s.photo_url) ?? s.photo_url ?? null;
    const fichaId = s.form_template_id ?? null;
    const fichaOpcionalId = s.form_template_optional_id ?? null;
    this.servicoId = s.id;
    this.name = s.name;
    this.duration_minutes = s.duration_minutes || 30;
    this.priceDisplay = price != null ? this.formatBrl(price) : '';
    this.priceNumber = price;
    this.show_price = !!s.show_price;
    this.pedir_ficha = fichaId != null;
    this.form_template_id = fichaId;
    this.form_template_optional_id = fichaOpcionalId;
    this.photo_url = photo;
    this.photoFile = null;
    this.photoRemoved = false;
    this.photoPreview.set(photo);
  }

  private loadFichas(): void {
    forkJoin({
      templates: this.templatesApi.list({ is_active: true, public_enabled: true }).pipe(
        catchError(() => of([] as Template[])),
      ),
      links: this.linksPublicosApi.list({ per_page: 50 }).pipe(
        catchError(() =>
          of({ data: [] as LinkPublico[], meta: { current_page: 1, last_page: 1, per_page: 50, total: 0 } }),
        ),
      ),
    }).subscribe(({ templates, links }) => {
      const byId = new Map<number, Template>();
      for (const t of Array.isArray(templates) ? templates : []) {
        if (t?.id == null || t.is_active === false || !t.public_enabled) continue;
        byId.set(t.id, t);
      }
      for (const l of links.data ?? []) {
        const id = Number(l.template_id ?? l.id);
        if (!Number.isFinite(id) || id <= 0) continue;
        const name = (l.name ?? l.template_name ?? `Modelo #${id}`).trim() || `Modelo #${id}`;
        const prev = byId.get(id);
        byId.set(id, {
          ...(prev ?? {
            id,
            name,
            is_active: true,
            public_enabled: true,
          }),
          name: prev?.name || name,
        } as Template);
      }
      this.fichas.set([...byId.values()]);
    });
  }

  private revokePreview(): void {
    const cur = this.photoPreview();
    if (cur?.startsWith('blob:')) URL.revokeObjectURL(cur);
  }

  private parsePrice(raw: number | string | null | undefined): number | null {
    if (raw == null || raw === '') return null;
    const n = typeof raw === 'number' ? raw : Number(String(raw).replace(',', '.'));
    return Number.isFinite(n) && n > 0 ? n : null;
  }

  private parseMoneyMask(raw: string): { display: string; number: number } {
    const digits = String(raw ?? '').replace(/\D/g, '').replace(/^0+(?=\d)/, '');
    if (!digits) return { display: '', number: 0 };
    const padded = digits.padStart(3, '0');
    const cents = padded.slice(-2);
    const intRaw = padded.slice(0, -2).replace(/^0+(?=\d)/, '') || '0';
    const withDots = intRaw.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return { display: `${withDots},${cents}`, number: parseInt(digits, 10) / 100 };
  }

  private formatBrl(n: number): string {
    if (!Number.isFinite(n) || n < 0) n = 0;
    const [intPart, decPart] = n.toFixed(2).split('.');
    return `${intPart!.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${decPart}`;
  }
}
