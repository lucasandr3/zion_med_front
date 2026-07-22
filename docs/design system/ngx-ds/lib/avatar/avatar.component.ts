import {
    Component,
    HostBinding,
    inject,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { Md5 } from 'ts-md5';
import { ModalService } from '../services/modal.service';
import { imageViewModalComponent } from '../../../core/image-view/image-view-modal-component';


@Component({
    selector: 'upx-avatar',
    standalone: true,
    imports: [CommonModule, IconComponent],
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit, OnChanges {
	modalService: ModalService = inject(ModalService);
    @Input() variant: string = 'icon'; // icon, image, initials
    @Input() size: string = 'md'; // xs, sm, md, lg, xl
    @Input() shape: string = 'circle'; // square, rounded, circle
    @Input() color: string = 'default'; // random, colors
    @Input() src?: string;
    @Input() text?: string = 'UP';
    @Input() icon: string = 'person';
    @Input() email?: string;
    @Input() matTooltip?: string;
	@Input() expandImage = false;
	@Input() imageList = [];
	@Input() midTab : any;
    isLoaded: boolean;
    colors = [
        //'red',
        'orange',
        'amber',
        'yellow',
        'lime',
        'green',
        'emerald',
        'teal',
        'cyan',
        'sky',
        'blue',
        'indigo',
        'violet',
        'purple',
        'fuchsia',
        'pink',
        //'rose',
    ];

    @HostBinding('class')
    get classes() {
        return {
            'upx-avatar': true,
            'upx-avatar-loading': !this.isLoaded,

            'upx-avatar-shape-square': this.shape === 'square',
            'upx-avatar-shape-rounded': this.shape === 'rounded',
            'upx-avatar-shape-circle': this.shape === 'circle',

            'upx-avatar-size-xs': this.size === 'xs',
            'upx-avatar-size-sm': this.size === 'sm',
            'upx-avatar-size-md': this.size === 'md',
            'upx-avatar-size-lg': this.size === 'lg',
            'upx-avatar-size-xl': this.size === 'xl',
			'upx-avatar-size-xl-2': this.size === 'xl2',

            'upx-avatar-variant-icon': this.variant === 'icon',
            'upx-avatar-variant-image': this.variant === 'image',
            'upx-avatar-variant-initials': this.variant === 'initials',

            'upx-avatar-color-default': this.color === 'default',
            'upx-avatar-color-theme': this.color === 'theme',
            'upx-avatar-color-white': this.color === 'white',
            'upx-avatar-color-neutral': this.color === 'neutral',
            'upx-avatar-color-stone': this.color === 'stone',

            'upx-avatar-color-red': this.color === 'red',
            'upx-avatar-color-orange': this.color === 'orange',
            'upx-avatar-color-amber': this.color === 'amber',
            'upx-avatar-color-yellow': this.color === 'yellow',
            'upx-avatar-color-lime': this.color === 'lime',
            'upx-avatar-color-green': this.color === 'green',
            'upx-avatar-color-emerald': this.color === 'emerald',
            'upx-avatar-color-teal': this.color === 'teal',
            'upx-avatar-color-cyan': this.color === 'cyan',
            'upx-avatar-color-sky': this.color === 'sky',
            'upx-avatar-color-blue': this.color === 'blue',
            'upx-avatar-color-indigo': this.color === 'indigo',
            'upx-avatar-color-violet': this.color === 'violet',
            'upx-avatar-color-purple': this.color === 'purple',
            'upx-avatar-color-fuchsia': this.color === 'fuchsia',
            'upx-avatar-color-pink': this.color === 'pink',
            'upx-avatar-color-rose': this.color === 'rose',
        };
    }

    constructor() {
        this.isLoaded = !(this.variant === 'image' && this.src);
    }

    ngOnInit(): void {
        if (this.color === 'random') this.setColorRandom();
        if(!this.src && this.email) this.src = this.getGravatarUrl();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['text']) {
            if (this.color === 'random') this.setColorRandom();
        }
    }

    getInitials(): string {
        if (this.text && this.text !== 'undefined') {
            const text = this.removeLeadingNonLetters(this.text);
            const words = text.split(' ');
            return (
                words[0][0] +
                (words.length === 1 && words[0].length > 1 ? words[0][1] : '') +
                (words.length >= 2 ? words[1][0] : '')
            ).toUpperCase();
        } else return 'UP';
    }

    loadImage() {
        this.isLoaded = true;
    }

    setColorRandom() {
        const text = this.text || (Math.random() + 1).toString();
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            hash = text.charCodeAt(i) + ((hash << 5) - hash);
        }
        hash = Math.abs(hash) % this.colors.length;
        this.color = this.colors[hash];
    }

    errorHandler() {
        this.variant = 'initials';
    }

    getGravatarUrl() {
        // if(this.email){
        //     const hash = Md5.hashStr(this.email.trim().toLowerCase());
        //     return `https://www.gravatar.com/avatar/${hash}?d=404`;
        // } else
            return '';
    }

	showImage(){
		let isMultiple = false;
		if (this.imageList.length && this.imageList.length > 1) {
			isMultiple = true;
		}

		if (this.expandImage) {
			this.modalService.modalForm(imageViewModalComponent, {
				src: this.src,
				imageList: this.imageList,
				midTab: this.midTab,
				multiple: isMultiple
			}).subscribe((result) => {

			});
		}
	}
    
    removeLeadingNonLetters(text: string) {
        if (!text) return '';
        return text
            .replace(/^\s*\d+\s*/g, '')
            .replace(/\s{2,}/g, ' ')
            .trim();
    }
}
