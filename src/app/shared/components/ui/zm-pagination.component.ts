import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ZmPaginationBlock = number | 'ellipsis';

@Component({
  selector: 'zm-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zm-pagination.component.html',
  styleUrl: './zm-pagination.component.css',
})
export class ZmPaginationComponent {
  @Input({ required: true }) currentPage = 1;
  @Input({ required: true }) lastPage = 1;
  @Output() pageChange = new EventEmitter<number>();

  blocks(): ZmPaginationBlock[] {
    const L = this.lastPage;
    const c = this.currentPage;
    if (L <= 1) {
      return [];
    }
    if (L <= 7) {
      return Array.from({ length: L }, (_, i) => i + 1);
    }
    const out: ZmPaginationBlock[] = [];
    const push = (b: ZmPaginationBlock) => {
      const prev = out[out.length - 1];
      if (b === 'ellipsis' && prev === 'ellipsis') {
        return;
      }
      out.push(b);
    };
    push(1);
    const start = Math.max(2, c - 1);
    const end = Math.min(L - 1, c + 1);
    if (start > 2) {
      push('ellipsis');
    }
    for (let p = start; p <= end; p++) {
      push(p);
    }
    if (end < L - 1) {
      push('ellipsis');
    }
    push(L);
    return out;
  }

  goPage(p: number): void {
    if (p === this.currentPage || p < 1 || p > this.lastPage) {
      return;
    }
    this.pageChange.emit(p);
  }

  prev(): void {
    this.goPage(this.currentPage - 1);
  }

  next(): void {
    this.goPage(this.currentPage + 1);
  }
}
