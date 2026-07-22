import { NgModule } from '@angular/core';
import {ModalComponent, ModalContentComponent, ModalFooterComponent, ModalHeadingComponent} from "./modal.component";

const COMPONENTS = [ModalComponent, ModalHeadingComponent, ModalContentComponent, ModalFooterComponent];

@NgModule({
    imports: [COMPONENTS],
    exports: [COMPONENTS]
})
export class ModalModule { }
