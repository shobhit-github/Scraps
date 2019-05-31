import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {CoreModule} from '../core/core.module';
import {MaterialModule} from '../material';
import {RoundUpsModule} from '../round-ups/round-ups.module';
import {BuyContainerComponent} from './containers/buy-container/buy-container.component';
import {SellContainerComponent} from './containers/sell-container/sell-container.component';
import {InvestEffects} from './effects/invest.effects';
import {InvestRoutingModule} from './invest-routing.module';
import * as fromInvest from './reducers/invest.reducer';
import {PortfolioModule} from '../portfolio/portfolio.module';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        InvestRoutingModule,
        RoundUpsModule,
        PortfolioModule,
    ],
    declarations: [BuyContainerComponent, SellContainerComponent],
})
export class InvestModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootInvestModule,
        };
    }
}

@NgModule({
    imports: [
        StoreModule.forFeature('invest', fromInvest.reducer),
        EffectsModule.forFeature([InvestEffects]),
    ],
})
export class RootInvestModule {
}
