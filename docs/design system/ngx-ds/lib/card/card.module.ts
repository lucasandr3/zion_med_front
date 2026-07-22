import {NgModule} from "@angular/core";
import {
    CardComponent,
    CardContentComponent,
    CardActionsComponent,
    CardHeaderComponent, CardSubtitleComponent,
    CardTitleComponent
} from "./card.component";

const COMPONENTS = [
    CardComponent, CardHeaderComponent, CardTitleComponent, CardSubtitleComponent, CardContentComponent, CardActionsComponent
]

@NgModule({
    imports: [COMPONENTS],
    exports: [COMPONENTS],

})
export class CardModule {}
