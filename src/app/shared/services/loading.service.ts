import { Injectable, Signal, signal } from '@angular/core';
import { defer, finalize, shareReplay } from 'rxjs';
import type { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  loadWithThreshold<T>(observable: Observable<T>, thresholdMs = 300): {
    data$: Observable<T>;
    showSkeleton: Signal<boolean>;
  } {
    const showSkeleton = signal(false);

    const data$ = defer(() => {
      let tid: ReturnType<typeof setTimeout> | null = setTimeout(() => showSkeleton.set(true), thresholdMs);
      return observable.pipe(
        finalize(() => {
          if (tid !== null) {
            clearTimeout(tid);
            tid = null;
          }
          showSkeleton.set(false);
        }),
      );
    }).pipe(shareReplay({ bufferSize: 1, refCount: true }));

    return { data$, showSkeleton: showSkeleton.asReadonly() };
  }
}
