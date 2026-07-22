import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
    MatAutocompleteModule,
    MatAutocompleteSelectedEvent,
    MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
    MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { Overlay } from '@angular/cdk/overlay';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { auditTime } from 'rxjs/operators';
import { ViewChild } from '@angular/core';

export type UpxTreeSelectOption<TItem = any, TValue = any> = {
    value: TValue;
    label: string;
    level: number;
    hasChildren: boolean;
    raw: TItem;
};

type ParentKey = string | number | null | undefined;

@Component({
    selector: 'upx-tree-select',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatAutocompleteModule,
    ],
    templateUrl: './tree-select.component.html',
    styleUrls: ['./tree-select.component.scss'],
    providers: [
        // Faz o overlay do autocomplete reposicionar ao rolar a página/container.
        {
            provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
            useFactory: (overlay: Overlay) => () => overlay.scrollStrategies.reposition(),
            deps: [Overlay],
        },
    ],
    host: {
        'class': 'upx-input upx-tree-select',
        '[class.upx-input--disabled]': 'disabled',
        '[class.upx-input--size-xs]': 'size === "xs"',
        '[class.upx-input--size-sm]': 'size === "sm"',
        '[class.upx-input--size-md]': 'size === "md"',
        '[class.upx-input--size-lg]': 'size === "lg"',
        '[class.upx-input--size-xl]': 'size === "xl"',
    },
    encapsulation: ViewEncapsulation.None,
})
export class TreeSelectComponent implements OnInit, OnChanges, OnDestroy {

    /** FormControl que guarda o ID da opção selecionada (ex: gru_cod_gru). */
    @Input({ required: true }) field!: FormControl;
    @Output() fieldChange = new EventEmitter<FormControl>();

    @Input() items: any[] = [];

    @Input() idKey = 'gru_cod_gru';
    @Input() parentIdKey = 'gru_cod_pai';
    @Input() labelKey = 'gru_descricao';
    @Input() childrenKey = 'children';

    @Input() placeholderText = 'Selecione...';
    @Input() enableNone = true;
    @Input() noneLabel = 'Nenhum';
    @Input() required = false;
    @Input() size: string = 'md';

    private _disabled = false;
    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value: any) {
        this._disabled = coerceBooleanProperty(value);
        if (this.searchControl) {
            this._disabled ? this.searchControl.disable() : this.searchControl.enable();
        }
    }

    @Output() onItemSelect = new EventEmitter<UpxTreeSelectOption | null>();

    /** Control interno do autocomplete: exibe o label, não o id. */
    readonly searchControl = new FormControl<string>('');

    filteredOptions$!: Observable<UpxTreeSelectOption[]>;

    @ViewChild(MatAutocompleteTrigger) private autocompleteTrigger?: MatAutocompleteTrigger;

    private allOptions: UpxTreeSelectOption[] = [];
    private optionByValue = new Map<any, UpxTreeSelectOption>();
    private readonly destroy$ = new Subject<void>();
    private readonly fieldWatchDestroy$ = new Subject<void>();

    ngOnInit(): void {
        this.setupAutocomplete();
        this.syncLabelFromField();
        this.watchFieldValue();
        this.watchScrollAndResizeForOverlayReposition();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ((changes['disabled'] || changes['field']) && this.field) {
            this._disabled ? this.field.disable() : this.field.enable();
        }
        if (changes['field']) {
            this.watchFieldValue();
        }

        if (
            changes['items'] ||
            changes['idKey'] ||
            changes['parentIdKey'] ||
            changes['labelKey'] ||
            changes['childrenKey']
        ) {
            this.rebuildOptions();
            // Após rebuild, sincroniza label caso field já tenha valor
            this.syncLabelFromField();
        }
    }

    ngOnDestroy(): void {
        this.fieldWatchDestroy$.next();
        this.destroy$.next();
        this.destroy$.complete();
    }

    private watchScrollAndResizeForOverlayReposition(): void {
        // Alguns layouts têm scroll em containers com overflow. O CDK nem sempre detecta isso,
        // então reposicionamos manualmente quando o painel está aberto.
        const scroll$ = fromEvent<Event>(window, 'scroll', { capture: true, passive: true } as AddEventListenerOptions);
        const resize$ = fromEvent<Event>(window, 'resize', { passive: true } as AddEventListenerOptions);

        merge(scroll$, resize$)
            .pipe(takeUntil(this.destroy$), auditTime(16))
            .subscribe(() => {
                if (!this.autocompleteTrigger) return;
                if (!this.autocompleteTrigger.panelOpen) return;
                this.autocompleteTrigger.updatePosition();
            });
    }

    private watchFieldValue(): void {
        // reinicia watcher caso `field` mude
        this.fieldWatchDestroy$.next();
        if (!this.field?.valueChanges) return;

        this.field.valueChanges
            .pipe(takeUntil(this.destroy$), takeUntil(this.fieldWatchDestroy$))
            .subscribe(() => this.syncLabelFromField());
    }

    onOptionSelected(event: MatAutocompleteSelectedEvent): void {
        const opt: UpxTreeSelectOption | null = event.option.value;

        if (opt === null) {
            // "Nenhum" selecionado
            this.field.setValue(null);
            this.field.markAsDirty();
            this.searchControl.setValue('', { emitEvent: false });
            this.onItemSelect.emit(null);
        } else {
            this.field.setValue(opt.value);
            this.field.markAsDirty();
            this.searchControl.setValue(opt.label, { emitEvent: false });
            this.onItemSelect.emit(opt);
        }

        this.fieldChange.emit(this.field);
    }

    clearSelection(): void {
        this.field.setValue(null);
        this.field.markAsDirty();
        this.searchControl.setValue('');
        this.onItemSelect.emit(null);
        this.fieldChange.emit(this.field);
    }

    displayFn(opt: UpxTreeSelectOption | string | null): string {
        if (!opt) return '';
        if (typeof opt === 'string') return opt;
        return opt.label ?? '';
    }

    private setupAutocomplete(): void {
        this.filteredOptions$ = this.searchControl.valueChanges.pipe(
            startWith(''),
            takeUntil(this.destroy$),
            map((term) => this.filter(typeof term === 'string' ? term : '')),
        );
    }

    private filter(term: string): UpxTreeSelectOption[] {
        const q = term.trim().toLowerCase();
        if (!q) return [...this.allOptions];

        const directMatches = new Set<any>(
            this.allOptions
                .filter((o) => o.label.toLowerCase().includes(q))
                .map((o) => o.value)
        );

        const toShow = new Set<any>(directMatches);

        // Inclui ancestrais dos matches para manter contexto hierárquico
        for (const opt of this.allOptions) {
            if (!directMatches.has(opt.value)) continue;
            let raw = opt.raw;
            while (raw) {
                const parentId = raw?.[this.parentIdKey];
                if (parentId == null) break;
                const parentOpt = this.optionByValue.get(parentId);
                if (!parentOpt) break;
                toShow.add(parentId);
                raw = parentOpt.raw;
            }
        }

        return this.allOptions.filter((o) => toShow.has(o.value));
    }

    private syncLabelFromField(): void {
        if (!this.field) return;
        const id = this.field.value;
        if (id == null) {
            this.searchControl.setValue('', { emitEvent: false });
            return;
        }
        const opt = this.optionByValue.get(id);
        if (opt) {
            this.searchControl.setValue(opt.label, { emitEvent: false });
        }
    }

    private rebuildOptions(): void {
        const items = Array.isArray(this.items) ? this.items : [];
        const hasTree = items.some((i) => Array.isArray(i?.[this.childrenKey]));

        const options = hasTree ? this.flattenFromTree(items) : this.flattenFromFlat(items);
        this.allOptions = options;
        this.optionByValue = new Map(options.map((o) => [o.value, o]));

        // Reinicia o pipe com a lista nova
        this.setupAutocomplete();
    }

    private flattenFromTree(tree: any[]): UpxTreeSelectOption[] {
        const out: UpxTreeSelectOption[] = [];
        const visit = (node: any, level: number) => {
            const children: any[] = Array.isArray(node?.[this.childrenKey]) ? node[this.childrenKey] : [];
            out.push({ value: node?.[this.idKey], label: String(node?.[this.labelKey] ?? ''), level, hasChildren: children.length > 0, raw: node });
            const sorted = [...children].sort((a, b) => String(a?.[this.labelKey] ?? '').localeCompare(String(b?.[this.labelKey] ?? '')));
            for (const c of sorted) visit(c, level + 1);
        };
        [...tree].sort((a, b) => String(a?.[this.labelKey] ?? '').localeCompare(String(b?.[this.labelKey] ?? ''))).forEach((r) => visit(r, 0));
        return out;
    }

    private flattenFromFlat(items: any[]): UpxTreeSelectOption[] {
        const childrenByParent = new Map<ParentKey, any[]>();
        const byId = new Map<any, any>();

        for (const it of items) {
            const id = it?.[this.idKey];
            byId.set(id, it);
            const parentId: ParentKey = it?.[this.parentIdKey] ?? null;
            const arr = childrenByParent.get(parentId) ?? [];
            arr.push(it);
            childrenByParent.set(parentId, arr);
        }

        for (const [k, arr] of childrenByParent.entries()) {
            arr.sort((a, b) => String(a?.[this.labelKey] ?? '').localeCompare(String(b?.[this.labelKey] ?? '')));
            childrenByParent.set(k, arr);
        }

        const roots = childrenByParent.get(null) ?? childrenByParent.get(undefined) ?? [];
        const out: UpxTreeSelectOption[] = [];
        const visited = new Set<any>();

        const visit = (node: any, level: number) => {
            const id = node?.[this.idKey];
            if (visited.has(id)) return;
            visited.add(id);
            const kids = childrenByParent.get(id) ?? [];
            out.push({ value: id, label: String(node?.[this.labelKey] ?? ''), level, hasChildren: kids.length > 0, raw: node });
            for (const child of kids) visit(child, level + 1);
        };

        for (const r of roots) visit(r, 0);
        for (const it of items) { if (!visited.has(it?.[this.idKey])) visit(it, 0); }

        return out;
    }
}
