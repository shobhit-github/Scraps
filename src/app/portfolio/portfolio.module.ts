import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {TextMaskModule} from 'angular2-text-mask';

import {CoreModule} from '../core/core.module';
import {MaterialModule} from '../material';
import {MessageModule} from '../message/message.module';
import {AmountComponent} from './components/amount/amount.component';
import {BreakdownComponent} from './components/breakdown/breakdown.component';
import {ChooseComponent} from './components/choose/choose.component';
import {PaymentComponent} from './components/payment/payment.component';
import {StatisticPortfolioComponent} from './components/statistic-portfolio/statistic-portfolio.component';
import {PortfolioPageComponent} from './containers/portfolio-page/portfolio-page.component';
import {PortfolioEffects} from './effects/portfolio.effects';
import {PortfolioRoutingModule} from './portfolio-routing.module';
import * as fromPortfolio from './reducers/portfolio.reducer';
import {DashboardModule} from '../dashboard/dashboard.module';
import {SnackBarComponent} from '../core/components/snack-bar/snack-bar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        MaterialModule,
        TextMaskModule,
        PortfolioRoutingModule,
        MessageModule,
        DashboardModule,
    ],
    declarations: [
        PortfolioPageComponent,
        BreakdownComponent,
        StatisticPortfolioComponent,
        ChooseComponent,
        PaymentComponent,
        AmountComponent,
    ],
    exports: [
        ChooseComponent,
        PaymentComponent,
        AmountComponent,
        StatisticPortfolioComponent,
    ],
    entryComponents: [SnackBarComponent],
})
export class PortfolioModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootPortfolioModule,
        };
    }
}

@NgModule({
    imports: [
        StoreModule.forFeature('portfolio', fromPortfolio.reducer),
        EffectsModule.forFeature([PortfolioEffects]),
    ],
})
export class RootPortfolioModule {
}
