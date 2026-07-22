import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'upx-icon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
    @Input() source: string = 'material-icons';
    @Input() sourceType: string = 'outlined';
    @Input() name!: string;
    @Input() dynamicClass: string = '';
    @HostBinding('title') @Input() titleText: string = '';
    @Input() size: string = 'md'; // xs, sm, md, lg, xl
    @Input() animate!: string; // spin, ping, pulse, bounce

    @HostBinding('class')
    get classes() {
        return {
            'upx-icon': true,
            'upx-icon-size-xs': this.size === 'xs',
            'upx-icon-size-sm': this.size === 'sm',
            'upx-icon-size-md': this.size === 'md',
            'upx-icon-size-lg': this.size === 'lg',
            'upx-icon-size-xl': this.size === 'xl',
            'upx-icon-size-2xl': this.size === '2xl',
            'upx-icon-size-3xl': this.size === '3xl',
            'upx-icon-size-4xl': this.size === '4xl',
            'upx-icon-animate-spin': this.animate === 'spin',
            'upx-icon-animate-ping': this.animate === 'ping',
            'upx-icon-animate-pulse': this.animate === 'pulse',
            'upx-icon-animate-bounce': this.animate === 'bounce',
        };
    }

    get spanClasses(): Record<string, boolean> {
        return {
            'material-icons-outlined': this.source === 'material-icons' && this.sourceType === 'outlined',
            'material-icons-filled': this.source === 'material-icons' && this.sourceType === 'filled',
            'material-icons-round': this.source === 'material-icons' && this.sourceType === 'round',
            'material-icons-two-tone': this.source === 'material-icons' && this.sourceType === 'two-tone',
            [this.dynamicClass]: !!this.dynamicClass,
        };
    }
}
