import { NgTemplateOutlet } from '@angular/common';
import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  Injector,
  input,
  output,
  runInInjectionContext,
  signal,
  type TemplateRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

import { twMerge } from 'tailwind-merge';

import { type GestgoTabVariants } from '@/shared/components/tabs/tabs.variants';

export type zPosition = 'top' | 'bottom' | 'left' | 'right';
export type zAlign = 'center' | 'start' | 'end';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'g-tab',
  imports: [],
  template: `
    <ng-template #content>
      <ng-content />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GestgoTabComponent {
  readonly label = input.required<string>();
  /** Nome do ícone Material Symbols Outlined exibido antes do rótulo. */
  readonly icon = input<string>();
  readonly contentTemplate = viewChild.required<TemplateRef<unknown>>('content');
}

/**
 * Compat `g-tab-group` sobre `nord-tab-group` (padrão pesquisa_app).
 * Mantém API `zTabChange` / `selectTabByIndex` para as telas existentes.
 */
@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'g-tab-group',
  imports: [NgTemplateOutlet],
  template: `
    <nord-tab-group class="g-tab-group__nord" label="Abas">
      @for (tab of tabs(); track $index; let index = $index) {
        <nord-tab
          slot="tab"
          [attr.id]="'tab-' + index"
          [selected]="activeTabIndex() === index"
          (click)="setActiveTab(index)"
        >
          @if (tab.icon()) {
            <span class="material-symbols-outlined g-tab-group__icon" aria-hidden="true">{{ tab.icon() }}</span>
          }
          {{ tab.label() }}
        </nord-tab>
      }

      @for (tab of tabs(); track $index; let index = $index) {
        <div
          role="tabpanel"
          [attr.id]="'tabpanel-' + index"
          [attr.aria-labelledby]="'tab-' + index"
          [hidden]="activeTabIndex() !== index"
          class="g-tab-group__panel"
        >
          <ng-container [ngTemplateOutlet]="tab.contentTemplate()" />
        </div>
      }
    </nord-tab-group>
  `,
  styles: `
    :host {
      display: block;
      visibility: visible !important;
    }

    .g-tab-group__nord {
      display: block;
      width: 100%;
    }

    .g-tab-group__icon {
      font-size: 1.125rem;
      line-height: 1;
      margin-inline-end: 0.35rem;
      vertical-align: middle;
    }

    .g-tab-group__panel[hidden] {
      display: none !important;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'containerClasses()' },
})
export class GestgoTabGroupComponent implements AfterViewInit {
  private readonly tabComponents = contentChildren(GestgoTabComponent, { descendants: false });
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);

  protected readonly tabs = computed(() => this.tabComponents());
  protected readonly activeTabIndex = signal<number>(0);

  readonly zTabChange = output<{
    index: number;
    label: string;
    tab: GestgoTabComponent;
  }>();

  protected readonly zDeselect = output<{
    index: number;
    label: string;
    tab: GestgoTabComponent;
  }>();

  /** Mantidos por compat — Nord tabs controlam layout. */
  readonly zTabsPosition = input<GestgoTabVariants['zPosition']>('top');
  readonly zActivePosition = input<GestgoTabVariants['zActivePosition']>('bottom');
  readonly zShowArrow = input(true);
  readonly zScrollAmount = input(100);
  readonly zAlignTabs = input<zAlign>('start');
  readonly zNavWrapperClass = input<string>('');
  readonly zNavClass = input<string>('');
  readonly class = input<string>('');

  ngAfterViewInit(): void {
    if (this.tabs().length) {
      this.setActiveTab(0);
    }

    runInInjectionContext(this.injector, () => {
      toObservable(this.tabs)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((list) => {
          if (list.length && this.activeTabIndex() >= list.length) {
            this.setActiveTab(0);
          }
        });
    });
  }

  protected readonly containerClasses = computed(() => twMerge('g-tab-group', this.class()));

  protected setActiveTab(index: number): void {
    const tabs = this.tabs();
    if (index < 0 || index >= tabs.length) return;

    const prev = this.activeTabIndex();
    if (prev !== index) {
      const prevTab = tabs[prev];
      if (prevTab) {
        this.zDeselect.emit({ index: prev, label: prevTab.label(), tab: prevTab });
      }
    }

    this.activeTabIndex.set(index);
    const tab = tabs[index];
    if (tab) {
      this.zTabChange.emit({ index, label: tab.label(), tab });
    }
  }

  selectTabByIndex(index: number): void {
    if (index >= 0 && index < this.tabs().length) {
      this.setActiveTab(index);
    } else {
      console.warn(`Index ${index} outside the range of available tabs.`);
    }
  }
}
