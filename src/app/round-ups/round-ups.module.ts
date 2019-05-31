import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoundUpsRoutingModule} from './round-ups-routing.module';
import {StoreModule} from '@ngrx/store';
import * as fromRoundUps from './reducers/round-ups.reducer';
import {EffectsModule} from '@ngrx/effects';
import {RoundUpsEffects} from './effects/round-ups.effects';
import {RoundUpsPageComponent} from './containers/round-ups-page/round-ups-page.component';
import {RoundUpsInfoComponent} from './components/round-ups-info/round-ups-info.component';
import {RoundUpsListComponent} from './components/round-ups-list/round-ups-list.component';
import {RoundUpsRecurringComponent} from './components/round-ups-recurring/round-ups-recurring.component';
import {CoreModule} from '../core/core.module';
import {MaterialModule} from '../material/material.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';
import {DownloadReportComponent} from './components/download-report/download-report.component';
import {PagerComponent} from './components/pager/pager.component';

@NgModule({
    imports: [
        CommonModule,
        NgxChartsModule,
        CoreModule,
        MaterialModule,
        RoundUpsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        StoreModule.forFeature('roundUps', fromRoundUps.reducer),
        EffectsModule.forFeature([RoundUpsEffects]),
    ],
    declarations: [
        RoundUpsPageComponent,
        RoundUpsInfoComponent,
        RoundUpsListComponent,
        RoundUpsRecurringComponent,
        DownloadReportComponent,
        PagerComponent,
    ],
    exports: [
        DownloadReportComponent,
        PagerComponent,
    ],
})
export class RoundUpsModule {
}
