import { Directive, inject, Injectable, input, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
class GestgoIdInternalService {
  private counter = 0;
  generate(prefix: string) {
    return `${prefix}-${++this.counter}`;
  }
}

@Directive({
  selector: '[gestgoId]',
  exportAs: 'gestgoId',
})
export class GestgoIdDirective {
  private idService = inject(GestgoIdInternalService);

  readonly gestgoId = input('ssr');

  readonly id = computed(() => this.idService.generate(this.gestgoId()));
}
