import {
    Directive,
    AfterViewInit,
    Input,
    HostListener,
    Renderer2,
    inject,
    HostBinding,
    ElementRef,
} from '@angular/core';

@Directive({
    selector: '[upxDropdown]',
    standalone: true,
})
export class DropdownDirective implements AfterViewInit {
    renderer = inject(Renderer2);
    el = inject(ElementRef);

    menuEl: any;

    toogleEl: any;
    toggleWidth: number = 0;
    toggleHeight: number = 0;

    @Input() options = {
        transition: 'transition-opacity',
        duration: 300,
    };

    @Input() upxDropdownTarget!: string;
    @Input() upxDropdownPlacement: string = 'down';

    @HostBinding('class')
    get classes() {
        return {
            'upx-dropdown': true,
            'upx-dropdown-placement-down': this.upxDropdownPlacement === 'down',
            'upx-dropdown-placement-up': this.upxDropdownPlacement === 'up',
            'upx-dropdown-placement-end': this.upxDropdownPlacement === 'end',
            'upx-dropdown-placement-start':
                this.upxDropdownPlacement === 'start',
        };
    }

    @HostListener('click') onClick() {
        this.toggle();
    }

    ngAfterViewInit(): void {
        this.menuEl = this.el.nativeElement.querySelector('.upx-dropdown-menu');
        this.toogleEl = this.el.nativeElement.querySelector(
            '.upx-dropdown-toggle'
        );
        if (this.toogleEl) {
            this.toggleHeight = this.toogleEl.offsetHeight;
            this.toggleWidth = this.toogleEl.offsetWidth;
            this.menuEl.style.transform = this.getPropertyValueTransform3d();
        }
    }

    isHidden(): boolean {
        return this.menuEl.offsetParent === null;
    }

    getPropertyValueTransform3d() {
        let transform = `translate3d(0px, 0px, 0px)`;

        switch (this.upxDropdownPlacement) {
            case 'down':
                transform = `translate3d(0px, ${this.toggleHeight}px, 0px)`;
                break;
            case 'up':
                transform = `translate3d(0px, -${this.toggleHeight}px, 0px)`;
                break;
            case 'end':
                transform = `translate3d(${this.toggleWidth}px, 0px, 0px)`;
                break;
            case 'start':
                transform = `translate3d(-${this.toggleWidth}px, 0px, 0px)`;
                break;
        }

        return transform;
    }

    toggle() {
        if (this.menuEl) {
            setTimeout(() => {
                this.menuEl.classList.add(
                    this.options.transition,
                    `duration-${this.options.duration}`
                );
            }, 0);

            this.isHidden() ? this.show() : this.hide();
        }
    }

    hide() {
        setTimeout(() => {
            this.menuEl.classList.add('opacity-0', 'ease-out');
            this.menuEl.classList.remove('opacity-100');
        }, 0);

        setTimeout(() => {
            this.menuEl.style.display = 'none';
        }, this.options.duration);
    }

    show() {
        setTimeout(() => {
            this.menuEl.classList.remove('opacity-0');
            this.menuEl.classList.add('opacity-100', 'ease-in');
        }, 0);

        setTimeout(() => {
            this.menuEl.style.display = 'block';
        }, this.options.duration);

        document.addEventListener(
            'click',
            () => {
                this.toggle();
            },
            { once: true }
        );
    }
}
