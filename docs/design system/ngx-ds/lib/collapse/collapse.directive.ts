import {
    Directive,
    AfterViewInit,
    Input,
    HostListener,
    Renderer2,
    inject,
    HostBinding,
} from '@angular/core';

@Directive({
    selector: '[upxCollapse]',
    standalone: true,
})
export class CollapseDirective implements AfterViewInit {
    renderer = inject(Renderer2);

    targetEl: any;
    targetAttr: string = 'upxCollapseId';

    @Input() options = {
        transition: 'transition-opacity',
        duration: 300,
    };

    @Input() upxCollapseTarget!: string;

    @HostBinding('class')
    get classes() {
        return {
            'upx-collapse': true,
        };
    }

    @HostListener('click') onClick() {
        this.toggle();
    }

    ngAfterViewInit(): void {
        this.targetEl = this.renderer.selectRootElement(
            `[${this.targetAttr}="${this.upxCollapseTarget}"]`,
            true
        );
    }

    isHidden(): boolean {
        return this.targetEl.offsetParent === null;
    }

    toggle() {
        if (this.targetEl) {
            setTimeout(() => {
                this.targetEl.classList.add(
                    this.options.transition,
                    `duration-${this.options.duration}`
                );
            }, 0);

            if (this.isHidden()) {
                setTimeout(() => {
                    this.targetEl.classList.remove('opacity-0');
                    this.targetEl.classList.add('opacity-100', 'ease-in');
                }, 0);

                setTimeout(() => {
                    this.targetEl.classList.remove('upx-collapse-hidden');
                }, this.options.duration);
            } else {
                setTimeout(() => {
                    this.targetEl.classList.add('opacity-0', 'ease-out');
                    this.targetEl.classList.remove('opacity-100');
                }, 0);

                setTimeout(() => {
                    this.targetEl.classList.add('upx-collapse-hidden');
                }, this.options.duration);
            }

            // callback function
            //this.options.onHide(this, this.targetEl);
        }
    }
}
