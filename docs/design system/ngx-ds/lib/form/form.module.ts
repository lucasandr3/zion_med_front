import { NgModule } from '@angular/core';
import {FormGridComponent, FormFieldComponent, FormPageComponent, FormPageContentComponent} from "./form.component";

const COMPONENTS = [
    FormPageComponent, FormPageContentComponent, FormGridComponent, FormFieldComponent
]

@NgModule({
    imports: [COMPONENTS],
    exports: [COMPONENTS],
})
export class FormModule { }
