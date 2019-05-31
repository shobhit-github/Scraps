import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PerformanceRoutingModule} from './performance-routing.module';
import {PerformanceListContainerComponent} from './containers/performance-list-container/performance-list-container.component';
import {CoreModule} from '../core/core.module';
import {MaterialModule} from '../material';
import {RecentTableComponent} from './components/recent-table/recent-table.component';
import {MatTableModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import {ShareButtonModule} from '@ngx-share/button';
import {MessageModule} from '../message/message.module';
import {DashboardModule} from '../dashboard/dashboard.module';
import {IcoModule} from '../ico/ico.module';
import {EffectsModule} from '@ngrx/effects';
import {RecentActivityEffect} from './effects/recent-activity.effect';
import {StoreModule} from '@ngrx/store';
import * as fromPerformance from './reducers';
import {RoundUpsModule} from '../round-ups/round-ups.module';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        MaterialModule,
        ShareButtonModule,
        PerformanceRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MessageModule,
        DashboardModule,
        IcoModule,
        EffectsModule.forFeature([RecentActivityEffect]),
        StoreModule.forFeature('performance', fromPerformance.reducers),
        RoundUpsModule,
    ],
    declarations: [
        PerformanceListContainerComponent,
        RecentTableComponent
    ],
})
export class PerformanceModule {
}
