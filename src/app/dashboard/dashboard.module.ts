import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromDashboard from './reducers';
import {EffectsModule} from '@ngrx/effects';
import {BalanceEffects} from './effects/balance.effects';
import {PerformanceEffects} from './effects/performance.effects';
import {DashboardContainerComponent} from './containers/dashboard-container/dashboard-container.component';
import {DashboardService} from './services/dashboard.service';
import {DashboardMockService} from './services/dashboard-mock.service';
import {StatisticComponent} from './components/statistic/statistic.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {PeriodFilterComponent} from './components/period-filter/period-filter.component';
import {MaterialModule} from '../material';
import {PortfolioBalanceComponent} from './components/portfolio-balance/portfolio-balance.component';
import {CoreModule} from '../core/core.module';
import {PerformanceStatComponent} from './components/performance-stat/performance-stat.component';
import {MessageModule} from '../message/message.module';
import {RoundUpsModule} from '../round-ups/round-ups.module';
import {AssetBalanceComponent} from './components/asset-balance/asset-balance.component';

@NgModule({
    imports: [
        DashboardRoutingModule,
        CoreModule,
        MaterialModule,
        CommonModule,
        StoreModule.forFeature('dashboard', fromDashboard.reducers, {
            metaReducers: fromDashboard.metaReducers,
        }),
        EffectsModule.forFeature([BalanceEffects, PerformanceEffects]),
        MessageModule,
        RoundUpsModule,
    ],
    declarations: [
        DashboardContainerComponent,
        StatisticComponent,
        PeriodFilterComponent,
        PortfolioBalanceComponent,
        PerformanceStatComponent,
        AssetBalanceComponent,
    ],
    providers: [
        DashboardMockService,
        {
            provide: DashboardService,
            useClass: DashboardMockService,
        },
    ],
    exports: [
        PerformanceStatComponent,
        StatisticComponent,
        PeriodFilterComponent,
    ],
})
export class DashboardModule {
}
