import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import type { GestgoSheetRef } from '@/shared/components/sheet/sheet-ref';
import { GestgoSheetService } from '@/shared/components/sheet/sheet.service';
import { getTourByScreenId } from '../data';
import type { AssistantAction, AssistantIntent } from '../models/assistant.types';
import { GoAssistantActionService } from '../services/go-assistant-action.service';
import { GoAssistantContextService } from '../services/go-assistant-context.service';
import { GoAssistantShellService } from '../services/go-assistant-shell.service';
import { GoAssistantTourService } from '../services/go-assistant-tour.service';

@Component({
  selector: 'go-assistant-drawer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './go-assistant-drawer.component.html',
  styleUrl: './go-assistant-drawer.component.css',
})
export class GoAssistantDrawerComponent {
  @ViewChild('assistantSheetContent', { static: true })
  private assistantSheetTpl!: TemplateRef<void>;

  readonly shell = inject(GoAssistantShellService);
  readonly context = inject(GoAssistantContextService);
  readonly actions = inject(GoAssistantActionService);
  readonly tour = inject(GoAssistantTourService);

  private readonly gestgoSheet = inject(GestgoSheetService);
  private readonly vcr = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  private sheetRef?: GestgoSheetRef<void>;

  readonly screenTitle = computed(() => this.context.currentScreen()?.title ?? 'Gestgo');
  readonly contextualIntents = computed(() => this.context.contextualIntents());
  readonly hasTour = computed(() => {
    const screen = this.context.currentScreen();
    return !!(screen && (screen.tourId || getTourByScreenId(screen.id)));
  });

  constructor() {
    toObservable(this.shell.open)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((open) => this.syncSheet(open));
  }

  onSearchInput(value: string): void {
    this.shell.onQueryChange(value);
  }

  openIntent(intent: AssistantIntent): void {
    this.shell.openIntent(intent);
  }

  runAction(action: AssistantAction, intent?: AssistantIntent): void {
    this.actions.run(action, intent);
    if (action.type === 'navigate' || action.type === 'navigate-create' || action.type === 'start-tour') {
      this.shell.close();
    }
  }

  startTour(): void {
    const screen = this.context.currentScreen();
    this.tour.start(screen?.tourId);
    this.shell.close();
  }

  visibleActions(intent: AssistantIntent): AssistantAction[] {
    return intent.actions.filter((a) => this.actions.canRun(a));
  }

  private syncSheet(wantOpen: boolean): void {
    if (wantOpen) {
      if (this.sheetRef) return;
      this.openSheet();
      return;
    }
    if (!this.sheetRef) return;
    const ref = this.sheetRef;
    this.sheetRef = undefined;
    ref.close();
  }

  private openSheet(): void {
    if (!this.assistantSheetTpl) return;

    this.sheetRef = this.gestgoSheet.create<void, void>({
      zContent: this.assistantSheetTpl,
      zViewContainerRef: this.vcr,
      zSide: 'right',
      zSize: 'custom',
      zWidth: 'min(100vw, 26.5rem)',
      zHeight: '100dvh',
      zTitle: 'Go Assistant',
      zCustomClasses: 'go-assistant-sheet-panel',
      zHideFooter: true,
      zOkText: null,
      zCancelText: null,
      zMaskClosable: true,
      zAfterClose: () => {
        this.sheetRef = undefined;
        if (this.shell.open()) {
          this.shell.close();
        }
      },
    });
  }
}
