import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'zion-data-table',
  template: `
    <div class="zion-data-table">
      <div class="zion-data-table__scroll">
        <table class="zion-data-table">
          <ng-content select="thead" />
          <ng-content select="tbody" />
        </table>

        @if (showEndHint()) {
          <div class="zion-data-table__end-hint">{{ endHint() }}</div>
        }
      </div>

      @if (showFooter()) {
        <footer class="zion-data-table__footer">
          <span>{{ footerLabel() }}</span>
          <ng-content select="[data-table-footer-end]" />
        </footer>
      }
    </div>
  `,
  styleUrl: './data-table.component.scss',
  host: {
    class: 'zion-data-table-host',
  },
})
export class DataTableComponent {
  /** Total de registros (exibe footer). Omita para esconder o rodapé. */
  readonly recordCount = input<number | null>(null);
  readonly endHint = input('Isso é tudo!');
  readonly showEndHint = input(true);
  readonly recordLabel = input('registro');
  readonly recordLabelPlural = input('registros');

  readonly showFooter = computed(() => this.recordCount() !== null);

  readonly footerLabel = computed(() => {
    const count = this.recordCount() ?? 0;
    const label = count === 1 ? this.recordLabel() : this.recordLabelPlural();
    return `${count} ${label}`;
  });
}
