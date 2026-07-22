export enum ToastType {
    Error,
    Success,
    Warning,
    Info,
}

export interface ToastInterface {
    id: string;
    type: ToastType;
    message: string;
    autoClose?: boolean;
    keepAfterRouteChange?: boolean;
    fade?: boolean;
	duration?: number; 
}

export class Toast implements ToastInterface {
    id: string = 'upx-toast-default';
    type: ToastType = ToastType.Info;
    message: string = '';
    autoClose?: boolean = true;
    keepAfterRouteChange?: boolean = true;
    fade?: boolean = true;
	duration?: number = 3000;
    constructor(init?: Partial<Toast>) {
        Object.assign(this, init);
    }
}
