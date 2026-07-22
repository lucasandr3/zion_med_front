import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'up-search-box',
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <div class="search-box">
      @if (iconPosition() === 'start') {
        <mat-icon class="search-box__search" aria-hidden="true">search</mat-icon>
      }
      <input
        type="text"
        [formControl]="control()"
        [placeholder]="placeholder()"
        [attr.aria-label]="ariaLabel()" />
      @if (iconPosition() === 'end' && !control().value) {
        <mat-icon class="search-box__search" aria-hidden="true">search</mat-icon>
      }
      @if (control().value) {
        <button
          type="button"
          class="search-box__clear"
          aria-label="Limpar busca"
          (click)="clear()">
          <mat-icon aria-hidden="true">close</mat-icon>
        </button>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: min(100%, 24rem);
    }

    .search-box {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
      height: 2.15rem;
      padding: 0 0.85rem;
      border: 1px solid rgb(var(--theme-border) / 0.45);
      border-radius: 10px;
      background: rgb(var(--theme-floor-1));
      box-shadow: 0 1px 0 rgb(var(--theme-border) / 0.04);
      transition:
        border-color 120ms ease,
        box-shadow 120ms ease;

      &:hover {
        border-color: rgb(var(--theme-border) / 0.6);
      }

      &:focus-within {
        border-color: rgb(var(--theme-padrao));
        box-shadow: 0 0 0 3px rgb(var(--theme-padrao) / 0.16);
      }
    }

    .search-box__search {
      flex-shrink: 0;
      font-size: 1.15rem;
      width: 1.15rem;
      height: 1.15rem;
      color: rgb(var(--theme-fg) / 0.75);
    }

    input {
      flex: 1;
      min-width: 0;
      border: none;
      outline: none;
      background: transparent;
      font: inherit;
      font-size: 0.875rem;
      color: rgb(var(--theme-fg));

      &::placeholder {
        color: rgb(var(--theme-fg) / 0.72);
        opacity: 1;
      }

      &::-webkit-search-cancel-button,
      &::-webkit-search-decoration {
        -webkit-appearance: none;
        appearance: none;
        display: none;
      }
    }

    .search-box__clear {
      display: inline-grid;
      place-items: center;
      flex-shrink: 0;
      width: 1.35rem;
      height: 1.35rem;
      padding: 0;
      border: none;
      border-radius: 999px;
      background: transparent;
      color: rgb(var(--theme-fg) / 0.58);
      cursor: pointer;

      mat-icon {
        font-size: 1.05rem;
        width: 1.05rem;
        height: 1.05rem;
      }

      &:hover {
        background: rgb(var(--theme-fg) / 0.1);
        color: rgb(var(--theme-fg) / 0.85);
      }
    }

    :host-context(html.dark) .search-box {
      border-color: rgb(var(--theme-border) / 0.5);
      background: rgb(var(--theme-sidebar));

      &:hover {
        border-color: rgb(var(--theme-border) / 0.65);
      }

      &:focus-within {
        background: rgb(var(--theme-floor-1));
        border-color: rgb(var(--theme-padrao));
      }
    }
  `,
})
export class SearchBoxComponent {
  readonly control = input.required<FormControl<string>>();
  readonly placeholder = input('Digite para buscar');
  readonly ariaLabel = input('Buscar');
  readonly shape = input<'pill' | 'rounded'>('rounded');
  /** Relatórios/usuários: search à esquerda. API Keys/OAuth: à direita. */
  readonly iconPosition = input<'start' | 'end'>('start');

  clear(): void {
    this.control().setValue('');
  }
}
