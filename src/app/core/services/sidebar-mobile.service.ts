import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarMobileService {
  private readonly open$ = new BehaviorSubject<boolean>(false);

  setOpen(open: boolean): void {
    this.open$.next(open);
  }

  getOpen(): Observable<boolean> {
    return this.open$.asObservable();
  }

  get isOpen(): boolean {
    return this.open$.value;
  }
}
