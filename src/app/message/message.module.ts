import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
    FormControlName,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import {PickerModule} from '@ctrl/ngx-emoji-mart';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {CoreModule} from '../core/core.module';
import {MaterialModule} from '../material';
import {AddFileComponent} from './components/add-file/add-file.component';
import {ChatComponent} from './components/chat/chat.component';
import {DialogGlobalSearchComponent} from './components/dialog-global-search/dialog-global-search.component';
import {DialogJumpComponent} from './components/dialog-jump/dialog-jump.component';
import {DialogLightboxComponent} from './components/dialog-lightbox/dialog-lightbox.component';
import {DialogListItemComponent} from './components/dialog-list-item/dialog-list-item.component';
import {DialogListComponent} from './components/dialog-list/dialog-list.component';
import {DialogSearchComponent} from './components/dialog-search/dialog-search.component';
import {FilePreviewComponent} from './components/file-preview/file-preview.component';
import {PortfolioInfoComponent} from './components/portfolio-info/portfolio-info.component';
import {PortfolioPerformanceComponent} from './components/portfolio-performance/portfolio-performance.component';
import {TypeComponent} from './components/type/type.component';
import {VoicePreviewComponent} from './components/voice-preview/voice-preview.component';
import {VoiceRecordComponent} from './components/voice-record/voice-record.component';
import {MessagePageComponent} from './containers/message-page/message-page.component';
import {ContenteditableDirective} from './directives/contenteditable.directive';
import {MessageEffects} from './effects/message.effects';
import {VoiceEffects} from './effects/voice.effects';
import {MessageRoutingModule} from './message-routing.module';
import {HighlightPipe} from './pipes/highlight.pipe';
import * as fromMessage from './reducers';

@NgModule({
    imports: [
        CommonModule,
        PickerModule,
        CoreModule,
        MaterialModule,
        MessageRoutingModule,
        EffectsModule.forFeature([MessageEffects, VoiceEffects]),
        StoreModule.forFeature('message', fromMessage.reducers),
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        ContenteditableDirective,
        MessagePageComponent,
        ChatComponent,
        DialogListComponent,
        DialogJumpComponent,
        DialogSearchComponent,
        DialogListItemComponent,
        DialogLightboxComponent,
        TypeComponent,
        AddFileComponent,
        FilePreviewComponent,
        DialogGlobalSearchComponent,
        VoiceRecordComponent,
        VoicePreviewComponent,
        PortfolioInfoComponent,
        HighlightPipe,
        PortfolioPerformanceComponent,
    ],
    entryComponents: [DialogLightboxComponent, DialogGlobalSearchComponent],
    exports: [PortfolioPerformanceComponent],
})
export class MessageModule {
    constructor() {
        const originFormControlNameNgOnChanges =
            FormControlName.prototype.ngOnChanges;
        FormControlName.prototype.ngOnChanges = function () {
            const result = originFormControlNameNgOnChanges.apply(this, arguments);
            // console.log(this.valueAccessor);

            const ref =
                this.valueAccessor._elementRef ||
                this.valueAccessor.elementRef ||
                this.valueAccessor._element;
            this.control.nativeElement = ref.nativeElement;
            return result;
        };
    }
}
