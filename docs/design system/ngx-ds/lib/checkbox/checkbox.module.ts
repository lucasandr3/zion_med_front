import { NgModule } from '@angular/core';
import { CheckboxComponent, CheckboxGroupComponent } from './checkbox.component';

const COMPONENTS = [CheckboxComponent, CheckboxGroupComponent];

@NgModule({
    imports: [COMPONENTS],
    exports: [COMPONENTS]
})
export class CheckboxModule {}
