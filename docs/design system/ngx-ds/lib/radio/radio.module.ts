import { NgModule } from '@angular/core';
import { RadioComponent, RadioGroupComponent } from './radio.component';

const COMPONENTS = [RadioComponent, RadioGroupComponent];

@NgModule({
    imports: [COMPONENTS],
    exports: [COMPONENTS]
})
export class RadioModule {}
