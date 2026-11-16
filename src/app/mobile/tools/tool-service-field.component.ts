import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, firstValueFrom } from 'rxjs';
import { ServicosService, type ClinicServiceItem } from '../../core/services/servicos.service';
import { ToastService } from '../../core/services/toast.service';

export interface ToolServiceValue {
  serviceId: number | null;
  name: string;
  price: number | null;
  durationMinutes: number | null;
}

@Component({
  selector: 'app-tool-service-field',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './tool-service-field.component.html',
  styleUrl: './tool-service-field.component.css',
})
export class ToolServiceFieldComponent implements OnInit, OnChanges {
  private readonly servicos = inject(ServicosService);
  private readonly toast = inject(ToastService);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly busca$ = new Subject<string>();
  private suppressSearch = false;
  private catalog: ClinicServiceItem[] = [];

  @Input() label = 'Serviço ou procedimento';
  @Input() serviceId: number | null = null;
  @Input() name = '';
  @Input() inputId = 'tool-service';
  @Input() mobile = false;
  /** Se true, ao selecionar emite preço do catálogo (orçamento). */
  @Input() emitPrice = false;

  @Output() readonly serviceChange = new EventEmitter<ToolServiceValue>();

  query = '';
  readonly suggestions = signal<ClinicServiceItem[]>([]);
  readonly searching = signal(false);
  readonly creating = signal(false);
  readonly selected = signal<ClinicServiceItem | null>(null);
  readonly showCreate = signal(false);
  createName = '';
  createDuration = 60;
  createPrice: number | null = null;

  ngOnInit(): void {
    this.busca$.pipe(debounceTime(200), distinctUntilChanged()).subscribe((termo) => this.filterLocal(termo));
    void this.loadCatalog();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] || changes['serviceId']) {
      this.syncFromInputs();
    }
  }

  private syncFromInputs(): void {
    if (this.serviceId && this.name) {
      this.query = this.name;
      const fromCatalog = this.catalog.find((s) => s.id === this.serviceId);
      this.selected.set(
        fromCatalog || {
          id: this.serviceId,
          name: this.name,
          duration_minutes: 60,
        },
      );
      return;
    }
    if (!this.serviceId) {
      this.selected.set(null);
      this.query = this.name || '';
    }
  }

  onQueryChange(value: string): void {
    this.query = value;
    if (this.suppressSearch) {
      this.suppressSearch = false;
      return;
    }
    if (this.selected() && value.trim() !== (this.selected()?.name || '').trim()) {
      this.selected.set(null);
      this.emitValue({ serviceId: null, name: value, price: null, durationMinutes: null });
    } else if (!this.selected()) {
      this.emitValue({ serviceId: null, name: value, price: null, durationMinutes: null });
    }
    this.busca$.next(value.trim());
  }

  selectService(s: ClinicServiceItem): void {
    this.selected.set(s);
    this.suggestions.set([]);
    this.showCreate.set(false);
    this.suppressSearch = true;
    this.query = s.name;
    const price = this.parsePrice(s.price);
    this.emitValue({
      serviceId: s.id,
      name: s.name,
      price: this.emitPrice ? price : null,
      durationMinutes: s.duration_minutes ?? null,
    });
  }

  clearService(): void {
    this.selected.set(null);
    this.query = '';
    this.suggestions.set([]);
    this.showCreate.set(false);
    this.emitValue({ serviceId: null, name: '', price: null, durationMinutes: null });
  }

  openCreate(): void {
    this.createName = this.query.trim() || this.name.trim();
    this.createDuration = 60;
    this.createPrice = null;
    this.showCreate.set(true);
    this.suggestions.set([]);
  }

  cancelCreate(): void {
    this.showCreate.set(false);
  }

  async createService(): Promise<void> {
    const name = this.createName.trim();
    if (!name) {
      this.toast.error('Serviços', 'Informe o nome do serviço.');
      return;
    }
    const duration = Math.max(10, Math.min(480, Math.floor(Number(this.createDuration) || 60)));
    this.creating.set(true);
    try {
      const created = await firstValueFrom(
        this.servicos.create({
          name,
          duration_minutes: duration,
          price: this.createPrice,
          show_price: this.createPrice != null && this.createPrice > 0,
          is_active: true,
        }),
      );
      this.creating.set(false);
      this.showCreate.set(false);
      this.catalog = [...this.catalog, created];
      this.toast.success('Serviços', 'Serviço cadastrado.');
      this.selectService(created);
    } catch (err: unknown) {
      this.creating.set(false);
      const message =
        err && typeof err === 'object' && 'error' in err
          ? (err as { error?: { message?: string } }).error?.message
          : undefined;
      this.toast.error('Serviços', message || 'Não foi possível cadastrar.');
    }
  }

  /** Garante serviço no catálogo (casa por nome ou cadastra). */
  async ensureService(): Promise<ToolServiceValue | null> {
    const name = (this.selected()?.name || this.query || this.name).trim();
    if (!name) return null;

    const existingId = this.selected()?.id ?? this.serviceId;
    if (existingId) {
      const sel = this.selected() || this.catalog.find((s) => s.id === existingId);
      return {
        serviceId: existingId,
        name: sel?.name || name,
        price: this.emitPrice ? this.parsePrice(sel?.price) : null,
        durationMinutes: sel?.duration_minutes ?? null,
      };
    }

    const match = this.catalog.find(
      (s) => s.is_active !== false && s.name.trim().toLowerCase() === name.toLowerCase(),
    );
    if (match) {
      this.selectService(match);
      return {
        serviceId: match.id,
        name: match.name,
        price: this.emitPrice ? this.parsePrice(match.price) : null,
        durationMinutes: match.duration_minutes ?? null,
      };
    }

    this.creating.set(true);
    try {
      const created = await firstValueFrom(
        this.servicos.create({
          name,
          duration_minutes: 60,
          is_active: true,
        }),
      );
      this.creating.set(false);
      this.catalog = [...this.catalog, created];
      this.selectService(created);
      this.toast.success('Serviços', 'Serviço cadastrado.');
      return {
        serviceId: created.id,
        name: created.name,
        price: this.emitPrice ? this.parsePrice(created.price) : null,
        durationMinutes: created.duration_minutes ?? null,
      };
    } catch (err: unknown) {
      this.creating.set(false);
      const message =
        err && typeof err === 'object' && 'error' in err
          ? (err as { error?: { message?: string } }).error?.message
          : undefined;
      this.toast.error('Serviços', message || 'Não foi possível cadastrar o serviço.');
      return null;
    }
  }

  priceLabel(s: ClinicServiceItem): string {
    const p = this.parsePrice(s.price);
    if (p == null) return `${s.duration_minutes || 0} min`;
    return `R$ ${p.toFixed(2).replace('.', ',')} · ${s.duration_minutes || 0} min`;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const el = event.target as Node | null;
    if (!el || !this.host.nativeElement.contains(el)) {
      this.suggestions.set([]);
    }
  }

  private emitValue(value: ToolServiceValue): void {
    this.serviceChange.emit({
      serviceId: value.serviceId,
      name: (value.name || '').trim(),
      price: value.price,
      durationMinutes: value.durationMinutes,
    });
  }

  private async loadCatalog(): Promise<void> {
    this.searching.set(true);
    try {
      this.catalog = await firstValueFrom(this.servicos.list(true));
      this.syncFromInputs();
    } catch {
      this.catalog = [];
    } finally {
      this.searching.set(false);
    }
  }

  private filterLocal(termo: string): void {
    if (termo.length < 1) {
      this.suggestions.set([]);
      return;
    }
    const q = termo.toLowerCase();
    this.suggestions.set(
      this.catalog
        .filter((s) => s.is_active !== false && s.name.toLowerCase().includes(q))
        .slice(0, 12),
    );
  }

  private parsePrice(raw: number | string | null | undefined): number | null {
    if (raw == null || raw === '') return null;
    const n = typeof raw === 'number' ? raw : Number(String(raw).replace(',', '.'));
    return Number.isFinite(n) ? n : null;
  }
}
