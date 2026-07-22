import {ComponentRef, Directive, ElementRef, inject, Input, OnInit, ViewContainerRef} from '@angular/core';
import {MatTooltip, TooltipPosition as MatTooltipPosition} from "@angular/material/tooltip";

export declare type TooltipPosition = MatTooltipPosition;

@Directive({
    selector: '[upxTooltip]',
    exportAs: 'upxTooltip',
    standalone: true,
    host: {
        'class': 'upx-tooltip',
        '(mouseenter)': 'show()',
        '(mouseleave)': 'hide()'
    },
})
export class TooltipDirective implements OnInit{

    private viewContainerRef!: ViewContainerRef;
    private elementRef!: ElementRef;
    private componentRef?: ComponentRef<MatTooltip>;

    @Input('upxTooltip')
    message: string = '';

    @Input('upxTooltipPosition')
    position: TooltipPosition = 'below';

    ngOnInit(): void {
        /*this.componentRef = this.viewContainerRef.createComponent(MatTooltip);
        this.componentRef.instance.message = this.message;
        this.componentRef.instance.position = this.position;
        this.viewContainerRef.insert(this.componentRef.hostView);*/
    }

    show(){

        //this.componentRef?.instance.show();
    }

    hide(){
        console.log('hide');
    }

    toogle(){
        console.log('toogle');
    }

}
