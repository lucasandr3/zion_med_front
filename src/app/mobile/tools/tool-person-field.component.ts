import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, firstValueFrom } from 'rxjs';
import { PessoasService, type Pessoa } from '../../core/services/pessoas.service';
import { ToastService } from '../../core/services/toast.service';
import {
  digitsOnlyPhone,
  formatPhoneBrDisplay,
  phoneDigitsForApi,
} from '../../paginas/pessoas/pessoas-form.util';

export interface ToolPersonValue {
  personId: number | null;
  name: string;
  phone: string;
}

@Component({
  selector: 'app-tool-person-field',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './tool-person-field.component.html',
  styleUrl: './tool-person-field.component.css',
})
export class ToolPersonFieldComponent implements OnChanges {
  private readonly pessoas = inject(PessoasService);
  private readonly toast = inject(ToastService);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly busca$ = new Subject<string>();
  private suppressSearch = false;

  @Input() label = 'Pessoa';
  @Input() personId: number | null = null;
  @Input() name = '';
  @Input() phone = '';
  @Input() inputId = 'tool-person';
  /** Layout compacto das tools mobile (`gm-field`). */
  @Input() mobile = false;

  @Output() readonly personChange = new EventEmitter<ToolPersonValue>();

  query = '';
  phoneDraft = '';
  readonly suggestions = signal<Pessoa[]>([]);
  readonly searching = signal(false);
  readonly creating = signal(false);
  readonly selected = signal<Pessoa | null>(null);
  readonly showCreate = signal(false);
  createName = '';
  createPhone = '';

  constructor() {
    this.busca$.pipe(debounceTime(280), distinctUntilChanged()).subscribe((termo) => {
      void this.search(termo);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] || changes['phone'] || changes['personId']) {
      this.syncFromInputs();
    }
  }

  private syncFromInputs(): void {
    this.phoneDraft = this.formatPhone(this.phone);
    if (this.personId && this.name) {
      this.query = this.name;
      this.selected.set({
        id: this.personId,
        code: '',
        name: this.name,
        phone: this.phone || null,
        status: 'active',
        created_at: '',
        updated_at: '',
      });
      return;
    }
    if (!this.personId) {
      this.selected.set(null);
      this.query = this.name || '';
    }
  }

  private formatPhone(raw: string | null | undefined): string {
    return formatPhoneBrDisplay(digitsOnlyPhone(raw ?? ''));
  }

  private phoneForApi(raw: string | null | undefined): string | null {
    return phoneDigitsForApi(digitsOnlyPhone(raw ?? ''));
  }

  onQueryChange(value: string): void {
    this.query = value;
    if (this.suppressSearch) {
      this.suppressSearch = false;
      return;
    }
    if (this.selected() && value.trim() !== (this.selected()?.name || '').trim()) {
      this.selected.set(null);
      this.emitValue({ personId: null, name: value, phone: this.phoneDraft });
    } else if (!this.selected()) {
      this.emitValue({ personId: null, name: value, phone: this.phoneDraft });
    }
    this.busca$.next(value.trim());
  }

  onPhoneChange(value: string): void {
    this.phoneDraft = this.formatPhone(value);
    this.emitValue({
      personId: this.selected()?.id ?? this.personId,
      name: this.selected()?.name || this.query,
      phone: this.phoneDraft,
    });
  }

  onCreatePhoneChange(value: string): void {
    this.createPhone = this.formatPhone(value);
  }

  selectPerson(p: Pessoa): void {
    this.selected.set(p);
    this.suggestions.set([]);
    this.showCreate.set(false);
    this.suppressSearch = true;
    this.query = p.name;
    this.phoneDraft = this.formatPhone(p.phone) || this.phoneDraft;
    this.emitValue({
      personId: p.id,
      name: p.name,
      phone: this.phoneDraft,
    });
  }

  clearPerson(): void {
    this.selected.set(null);
    this.query = '';
    this.phoneDraft = '';
    this.suggestions.set([]);
    this.showCreate.set(false);
    this.emitValue({ personId: null, name: '', phone: '' });
  }

  openCreate(): void {
    this.createName = this.query.trim() || this.name.trim();
    this.createPhone = this.phoneDraft;
    this.showCreate.set(true);
    this.suggestions.set([]);
  }

  cancelCreate(): void {
    this.showCreate.set(false);
  }

  async createPerson(): Promise<void> {
    const name = this.createName.trim();
    if (!name) {
      this.toast.error('Pessoas', 'Informe o nome para cadastrar.');
      return;
    }
    this.creating.set(true);
    try {
      const created = await firstValueFrom(
        this.pessoas.create({
          name,
          phone: this.phoneForApi(this.createPhone),
          status: 'active',
        }),
      );
      this.creating.set(false);
      this.showCreate.set(false);
      this.toast.success('Pessoas', 'Pessoa cadastrada.');
      this.selectPerson(created);
    } catch (err: unknown) {
      this.creating.set(false);
      const message =
        err && typeof err === 'object' && 'error' in err
          ? (err as { error?: { message?: string } }).error?.message
          : undefined;
      this.toast.error('Pessoas', message || 'Não foi possível cadastrar.');
    }
  }

  /**
   * Garante person_id: se já há seleção, devolve; se só há nome, tenta casar
   * por nome e só então cadastra. Usar no submit das tools.
   */
  async ensurePerson(): Promise<ToolPersonValue | null> {
    const name = (this.selected()?.name || this.query || this.name).trim();
    const phone = (this.phoneDraft || this.phone || '').trim();
    if (!name) return null;

    const existingId = this.selected()?.id ?? this.personId;
    if (existingId) {
      return { personId: existingId, name, phone };
    }

    this.creating.set(true);
    try {
      const found = await firstValueFrom(this.pessoas.list({ search: name, per_page: 15, page: 1 }));
      const match = (found.data || []).find(
        (p) => p.status === 'active' && p.name.trim().toLowerCase() === name.toLowerCase(),
      );
      if (match) {
        this.creating.set(false);
        this.selectPerson(match);
        return {
          personId: match.id,
          name: match.name,
          phone: phone || (match.phone || '').trim(),
        };
      }

      const created = await firstValueFrom(
        this.pessoas.create({
          name,
          phone: this.phoneForApi(phone),
          status: 'active',
        }),
      );
      this.creating.set(false);
      this.selectPerson(created);
      this.toast.success('Pessoas', 'Pessoa cadastrada.');
      return {
        personId: created.id,
        name: created.name,
        phone: this.formatPhone(created.phone) || phone,
      };
    } catch (err: unknown) {
      this.creating.set(false);
      const message =
        err && typeof err === 'object' && 'error' in err
          ? (err as { error?: { message?: string } }).error?.message
          : undefined;
      this.toast.error('Pessoas', message || 'Não foi possível cadastrar a pessoa.');
      return null;
    }
  }

  documento(p: Pessoa): string {
    const cpf = (p.cpf ?? '').replace(/\D/g, '');
    if (cpf.length === 11) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    if ((p.rg ?? '').trim()) return p.rg!.trim();
    if ((p.code ?? '').trim()) return p.code.trim();
    if ((p.phone ?? '').trim()) return this.formatPhone(p.phone);
    return 'Sem documento';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const el = event.target as Node | null;
    if (!el || !this.host.nativeElement.contains(el)) {
      this.suggestions.set([]);
    }
  }

  private emitValue(value: ToolPersonValue): void {
    this.personChange.emit({
      personId: value.personId,
      name: (value.name || '').trim(),
      phone: (value.phone || '').trim(),
    });
  }

  private async search(termo: string): Promise<void> {
    if (termo.length < 2) {
      this.suggestions.set([]);
      this.searching.set(false);
      return;
    }
    this.searching.set(true);
    try {
      const res = await firstValueFrom(this.pessoas.list({ search: termo, per_page: 15, page: 1 }));
      const ativos = (res.data || []).filter((p) => p.status === 'active');
      this.suggestions.set(ativos);
    } catch {
      this.suggestions.set([]);
    } finally {
      this.searching.set(false);
    }
  }
}
