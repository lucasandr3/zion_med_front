import { Injectable, Signal, signal } from '@angular/core';
import { defer, finalize } from 'rxjs';
import type { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  /**
   * Dispara o observable sob demanda e mostra skeleton só se passar do threshold.
   * Sem shareReplay: um subscribe = uma ida à rede (evita re-fetch por refCount).
   */
  loadWithThreshold<T>(observable: Observable<T>, thresholdMs = 300): {
    data$: Observable<T>;
    showSkeleton: Signal<boolean>;
  } {
    const showSkeleton = signal(thresholdMs <= 0);

    const data$ = defer(() => {
      let tid: ReturnType<typeof setTimeout> | null =
        thresholdMs <= 0 ? null : setTimeout(() => showSkeleton.set(true), thresholdMs);
      return observable.pipe(
        finalize(() => {
          if (tid !== null) {
            clearTimeout(tid);
            tid = null;
          }
          showSkeleton.set(false);
        }),
      );
    });

    return { data$, showSkeleton: showSkeleton.asReadonly() };
  }
}
