import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ZmSearchableSelectOption {
  key: string;
  label: string;
}

@Component({
  selector: 'zm-searchable-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './zm-searchable-select.component.html',
  styleUrl: './zm-searchable-select.component.css',
})
export class ZmSearchableSelectComponent {
  @Input() options: ZmSearchableSelectOption[] = [];
  @Input() value = '';
  @Input() placeholder = 'Selecione';
  @Input() searchPlaceholder = 'Buscar...';
  @Input() emptyStateLabel = 'Nenhuma opção encontrada.';
  @Input() createActionLabel = '';

  @Output() valueChange = new EventEmitter<string>();
  @Output() createAction = new EventEmitter<void>();

  aberto = false;
  busca = '';

  private host = inject(ElementRef<HTMLElement>);

  get opcoesFiltradas(): ZmSearchableSelectOption[] {
    const q = this.busca.trim().toLowerCase();
    if (!q) return this.options;
    return this.options.filter((o) => o.label.toLowerCase().includes(q));
  }

  get rotuloSelecionado(): string {
    const item = this.options.find((o) => o.key === this.value);
    return item?.label ?? '';
  }

  abrir(): void {
    this.aberto = true;
    this.busca = '';
  }

  toggle(): void {
    if (this.aberto) {
      this.fechar();
      return;
    }
    this.abrir();
  }

  fechar(): void {
    this.aberto = false;
    this.busca = '';
  }

  selecionar(key: string): void {
    this.valueChange.emit(key);
    this.fechar();
  }

  acionarCriacao(): void {
    this.createAction.emit();
    this.fechar();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const el = event.target as Node | null;
    if (!el) return;
    if (!this.host.nativeElement.contains(el)) {
      this.fechar();
    }
  }
}
