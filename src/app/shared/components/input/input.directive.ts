import { booleanAttribute, computed, Directive, ElementRef, inject, input, linkedSignal } from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '@/shared/utils/merge-classes';

import {
  inputVariants,
  type ZardInputSizeVariants,
  type ZardInputStatusVariants,
  type ZardInputTypeVariants,
} from './input.variants';

/**
 * Estilização Zard para inputs — sem ControlValueAccessor (ngModel usa os accessors nativos do Angular
 * ou de integrações como Flatpickr / ngx-mask).
 */
@Directive({
  selector: 'input[z-input], textarea[z-input], select[z-input]',
  host: {
    '[class]': 'classes()',
  },
  exportAs: 'zInput',
})
export class ZardInputDirective {
  private readonly elementRef = inject<ElementRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>>(
    ElementRef,
  );

  readonly class = input<ClassValue>('');
  readonly zBorderless = input(false, { transform: booleanAttribute });
  readonly zSize = input<ZardInputSizeVariants>('default');
  readonly zStatus = input<ZardInputStatusVariants>();

  readonly size = linkedSignal<ZardInputSizeVariants>(() => this.zSize());

  protected readonly classes = computed(() =>
    mergeClasses(
      inputVariants({
        zType: this.getType(),
        zSize: this.size(),
        zStatus: this.zStatus(),
        zBorderless: this.zBorderless(),
      }),
      this.class(),
    ),
  );

  getType(): ZardInputTypeVariants {
    const tag = this.elementRef.nativeElement.tagName.toLowerCase();
    if (tag === 'textarea') {
      return 'textarea';
    }
    if (tag === 'select') {
      return 'select';
    }
    return 'default';
  }

  setDataSlot(name: string): void {
    if (this.elementRef?.nativeElement?.dataset) {
      this.elementRef.nativeElement.dataset['slot'] = name;
    }
  }
}
