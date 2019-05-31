import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {QuizRoutingModule} from './quiz-routing.module';
import {StoreModule} from '@ngrx/store';
import * as fromRisk from './reducers/risk.reducer';
import {EffectsModule} from '@ngrx/effects';
import {RiskEffects} from './effects/risk.effects';
import {RiskPageComponent} from './containers/risk-page/risk-page.component';
import {ProgressComponent} from './components/progress/progress.component';
import {FinishComponent} from './components/finish/finish.component';
import {StartContainerComponent} from './containers/start-container/start-container.component';
import {ProgressContainerComponent} from './containers/progress-container/progress-container.component';
import {FinishContainerComponent} from './containers/finish-container/finish-container.component';
import {MaterialModule} from '../material';
import {CoreModule} from '../core/core.module';

@NgModule({
    imports: [
        CoreModule,
        MaterialModule,
        CommonModule,
        QuizRoutingModule,
        StoreModule.forFeature('risk', fromRisk.reducer),
        EffectsModule.forFeature([RiskEffects]),
    ],
    declarations: [
        RiskPageComponent,
        ProgressComponent,
        FinishComponent,
        StartContainerComponent,
        ProgressContainerComponent,
        FinishContainerComponent,
    ],
    exports: [FinishComponent],
})
export class QuizModule {
}
