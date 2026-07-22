import {
    Directive,
    HostBinding,
    HostListener,
    Input,
    AfterViewInit,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[upxDismiss]',
    standalone: true,
})
export class DismissDirective implements AfterViewInit {
    targetEl: any;
    @Input() options = {
        transition: 'transition-opacity',
        duration: 300,
        timing: 'ease-out',
        //onHide: (t?: any, targetEl?: any) => {},
    };
    @Input() targetDismissId!: string;
    @HostListener('click') onClick() {
        this.hide();
    }
    @HostBinding('class')
    get classes() {
        return {
            'upx-dismiss': true,
        };
    }
    constructor(private renderer: Renderer2) {}

    ngAfterViewInit() {
        this.targetEl = this.renderer.selectRootElement(
            `[dismissId="${this.targetDismissId}"]`,
            true
        );
    }

    hide() {
        if (this.targetEl) {
            setTimeout(() => {
                this.targetEl.classList.add(
                    this.options.transition,
                    `duration-${this.options.duration}`,
                    this.options.timing,
                    'opacity-0'
                );
            }, 0);

            setTimeout(() => {
                this.targetEl.classList.add('hidden');
            }, this.options.duration);

            // callback function
            //this.options.onHide(this, this.targetEl);
        }
    }
}
