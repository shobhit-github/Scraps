import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

import {
    SetFilter,
    Init,
    LoadPerformance,
} from '../../actions/performance.actions';
import {
    IPerformanceFilter,
    IStatisticItem,
    IPortfolioBalance,
    IPerformanceItem,
} from '../../interfaces/dashboard-service';
import * as fromStore from '../../reducers';
import {take, tap} from 'rxjs/operators';
import {
    LoadAssetBalance,
    LoadBalance,
    UpdateBalance,
} from '../../actions/balance.actions';
import {IPortfolio} from 'src/app/portfolio/interfaces/portfolio';
import {
    IFullChartData,
} from 'src/app/core/interfaces/chart.interface';
import {CurveFactory, curveMonotoneX} from 'd3';

@Component({
    selector: 'app-dashboard-container',
    templateUrl: './dashboard-container.component.html',
    styleUrls: ['./dashboard-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardContainerComponent implements OnDestroy {
    public balance$: Observable<IPortfolioBalance>;
    public assetBalance$: Observable<IPortfolio>;
    public filter$: Observable<IPerformanceFilter>;
    public performanceList$: Observable<Array<IPerformanceItem>>;
    public stats$: Observable<Array<IStatisticItem>>;
    public chartData$: Observable<Array<IFullChartData>>;
    public curve: CurveFactory = curveMonotoneX;
    private init$: Observable<IPerformanceFilter>;
    private sub: Subscription;
    public filterName = '7D';

    constructor(private store: Store<fromStore.State>) {
        this.filter$ = this.store.pipe(select(fromStore.getFilter));
        this.performanceList$ = this.store.pipe(
            select(fromStore.getPerformanceList),
        );
        this.stats$ = this.store.pipe(select(fromStore.getStats));
        this.balance$ = this.store.pipe(select(fromStore.getPortfolioBalance));
        this.assetBalance$ = this.store.pipe(select(fromStore.getAssetBalance));
        this.chartData$ = this.store.pipe(select(fromStore.getChartData));
        this.store.dispatch(new LoadBalance());
        this.store.dispatch(new UpdateBalance());
        this.store.dispatch(new LoadPerformance());
        this.store.dispatch(new LoadAssetBalance);
        this.init$ = this.filter$.pipe(
            take(1),
            tap(filter => this.store.dispatch(new Init(filter))),
        );
        this.sub = this.init$.subscribe();
    }

    public setFilter(filter: IPerformanceFilter) {
        this.filterName = filter.period;
        this.store.dispatch(new SetFilter(filter));
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
