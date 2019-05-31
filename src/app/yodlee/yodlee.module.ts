import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {MaterialModule} from '../material';
import {YodleeComponent} from './components/yodlee/yodlee.component';
import {YodleeContainerComponent} from './containers/yodlee-container/yodlee-container.component';
import {YodleeEffects} from './effects/yodlee.effects';
import * as fromYodlee from './reducers/yodlee.reducer';

export function windowFactory() {
    return window;
}

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        StoreModule.forFeature('yodlee', fromYodlee.reducer),
        EffectsModule.forFeature([YodleeEffects]),
    ],
    declarations: [YodleeContainerComponent, YodleeComponent],
    providers: [
        // { provide: YodleeService, useClass: YodleeMockService },
        {provide: 'window', useFactory: windowFactory},
    ],
    exports: [YodleeContainerComponent],
})
export class YodleeModule {
}
