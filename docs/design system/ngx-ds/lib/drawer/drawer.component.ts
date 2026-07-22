import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	Output,
	SimpleChanges,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Drawer from 'flowbite/lib/esm/components/drawer';
import type { DrawerInterface } from 'flowbite/lib/esm/components/drawer/interface';
import type { DrawerOptions } from 'flowbite/lib/esm/components/drawer/types';

type DrawerPlacement = NonNullable<DrawerOptions['placement']>;

const DEFAULT_BACKDROP_CLASSES =
	'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30';

@Component({
	selector: 'upx-drawer',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './drawer.component.html',
	styleUrls: ['./drawer.component.scss'],
	host: {
		class: 'upx-drawer',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent implements AfterViewInit, OnChanges, OnDestroy {
	@ViewChild('drawerElement', { static: true })
	drawerElement!: ElementRef<HTMLElement>;

	@Input() id = `upx-drawer-${Math.random().toString(36).slice(2, 10)}`;
	@Input() open = false;
	@Input() placement: DrawerPlacement = 'left';
	@Input() bodyScrolling: DrawerOptions['bodyScrolling'] = false;
	@Input() backdrop: DrawerOptions['backdrop'] = true;
	@Input() edge: DrawerOptions['edge'] = false;
	@Input() edgeOffset: DrawerOptions['edgeOffset'] = 'bottom-[60px]';
	@Input() backdropClasses: DrawerOptions['backdropClasses'] = DEFAULT_BACKDROP_CLASSES;
	@Input() widthClass = 'w-80';
	@Input() heightClass = 'h-screen';
	@Input() paddingClass = 'p-0';
	@Input() customClasses = '';
	@Input() ariaLabelledBy?: string;

	@Output() openChange = new EventEmitter<boolean>();
	@Output() drawerShow = new EventEmitter<void>();
	@Output() drawerHide = new EventEmitter<void>();
	@Output() drawerToggle = new EventEmitter<boolean>();

	private drawerInstance?: DrawerInterface;

	ngAfterViewInit(): void {
		this.initializeDrawer();

		if (this.open) {
			this.drawerInstance?.show();
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (!this.drawerInstance) {
			return;
		}

		const optionKeys: (keyof DrawerComponent)[] = [
			'placement',
			'bodyScrolling',
			'backdrop',
			'edge',
			'edgeOffset',
			'backdropClasses',
		];

		const optionChanged = optionKeys.some((key) => key in changes);

		if (optionChanged) {
			this.updateDrawerOptions();
			this.applyPlacementClasses();
		}

		if ('open' in changes && !changes['open'].firstChange) {
			this.syncVisibility();
		}
	}

	ngOnDestroy(): void {
		if (this.drawerInstance?.isVisible()) {
			this.drawerInstance.hide();
		}
		this.drawerInstance = undefined;
	}

	get containerClasses(): string[] {
		return [
			'fixed',
			'z-40',
			'overflow-y-auto',
			'transition-transform',
			'bg-white',
			'dark:bg-gray-800',
			// Aplica width 0 quando fechado, senão aplica a widthClass
			...(this.open ? this.splitClasses(this.widthClass) : ['w-0']),
			...this.splitClasses(this.heightClassForPlacement()),
			...this.splitClasses(this.paddingClass),
			...this.baseClassesForPlacement(),
			...this.splitClasses(this.customClasses),
			...this.inactiveClassesForPlacement(),
		].filter(Boolean);
	}

	private initializeDrawer(): void {
		if (!this.drawerElement?.nativeElement) {
			return;
		}

		this.drawerInstance = new Drawer(this.drawerElement.nativeElement, {
			placement: this.placement,
			bodyScrolling: this.bodyScrolling,
			backdrop: this.backdrop,
			edge: this.edge,
			edgeOffset: this.edgeOffset,
			backdropClasses: this.backdropClasses,
			onShow: () => {
				this.open = true;
				this.drawerShow.emit();
				this.drawerToggle.emit(true);
				this.openChange.emit(true);
			},
			onHide: () => {
				this.open = false;
				this.drawerHide.emit();
				this.drawerToggle.emit(false);
				this.openChange.emit(false);
			},
			onToggle: () => {
				this.drawerToggle.emit(this.drawerInstance?.isVisible() ?? false);
			},
		});

		this.applyPlacementClasses();
	}

	private updateDrawerOptions(): void {
		if (!this.drawerInstance) {
			return;
		}

		this.drawerInstance._options = {
			...this.drawerInstance._options,
			placement: this.placement,
			bodyScrolling: this.bodyScrolling,
			backdrop: this.backdrop,
			edge: this.edge,
			edgeOffset: this.edgeOffset,
			backdropClasses: this.backdropClasses,
		};
	}

	private applyPlacementClasses(): void {
		const element = this.drawerElement?.nativeElement;
		if (!element || !this.drawerInstance) {
			return;
		}

		const placements: DrawerPlacement[] = ['left', 'right', 'top', 'bottom'];

		placements.forEach((placement) => {
			const { base, active, inactive } = this.drawerInstance!._getPlacementClasses(
				placement === 'bottom' && this.edge ? `${placement}-edge` : placement,
			);

			[...base, ...active, ...inactive].forEach((cls) => {
				element.classList.remove(cls);
			});
		});

		const placementKey =
			this.placement === 'bottom' && this.edge ? `${this.placement}-edge` : this.placement;

		const classes = this.drawerInstance._getPlacementClasses(placementKey);

		classes.base.forEach((cls) => element.classList.add(cls));

		if (this.drawerInstance.isVisible()) {
			classes.active.forEach((cls) => element.classList.add(cls));
			classes.inactive.forEach((cls) => element.classList.remove(cls));
		} else {
			classes.active.forEach((cls) => element.classList.remove(cls));
			classes.inactive.forEach((cls) => element.classList.add(cls));
		}
	}

	private syncVisibility(): void {
		if (!this.drawerInstance) {
			return;
		}

		if (this.open && !this.drawerInstance.isVisible()) {
			this.drawerInstance.show();
		} else if (!this.open && this.drawerInstance.isVisible()) {
			this.drawerInstance.hide();
		}
	}

	private heightClassForPlacement(): string {
		if (this.placement === 'top' || this.placement === 'bottom') {
			return 'h-auto max-h-full';
		}

		return this.heightClass;
	}

	private inactiveClassesForPlacement(): string[] {
		switch (this.placement) {
			case 'right':
				return ['translate-x-full'];
			case 'top':
				return ['-translate-y-full'];
			case 'bottom':
				return this.edge
					? ['translate-y-full', ...(this.edgeOffset ? [this.edgeOffset] : [])]
					: ['translate-y-full'];
			case 'left':
			default:
				return ['-translate-x-full'];
		}
	}

	private baseClassesForPlacement(): string[] {
		switch (this.placement) {
			case 'right':
				return ['top-0', 'right-0'];
			case 'top':
				return ['top-0', 'left-0', 'right-0'];
			case 'bottom':
				return ['bottom-0', 'left-0', 'right-0'];
			case 'left':
			default:
				return ['top-0', 'left-0'];
		}
	}

	private splitClasses(value?: string): string[] {
		return value ? value.split(/\s+/).filter(Boolean) : [];
	}
}


