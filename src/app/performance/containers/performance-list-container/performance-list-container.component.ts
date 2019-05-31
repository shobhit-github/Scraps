import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {IFullChartData} from 'src/app/core/interfaces/chart.interface';
import {IPerformanceFilter, IPerformanceItem, IStatisticItem} from '../../../dashboard/interfaces/dashboard-service';
import {CurveFactory, curveMonotoneX} from 'd3-shape';
import {select, Store} from '@ngrx/store';
import * as fromStoreDashboard from '../../../dashboard/reducers';
import * as fromStore from '../../reducers';
import {Init, LoadPerformance, SetFilter} from '../../../dashboard/actions/performance.actions';
import {take, tap} from 'rxjs/operators';
import {LoadRecentActivity, SetActivePage, SetActiveType} from '../../actions/recent-activity.actions';

export enum EIcoTypes {
    'top' = 'Premium (Top Picks)',
    'active' = 'Silver (Active ICOs)',
    'air' = 'Airdrop',
}

export enum ETabStatus {
    overview,
    breakdown,
}

@Component({
    selector: 'app-performance-list-container',
    templateUrl: './performance-list-container.component.html',
    styleUrls: ['../../styles.scss', './performance-list-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceListContainerComponent {
    public activeCateg = 'All';
    public activePage = 1;
    public ETabStatus = ETabStatus;
    public tabStatus: ETabStatus = ETabStatus.overview;
    public stats$: Observable<Array<IStatisticItem>>;
    public performanceList$: Observable<Array<IPerformanceItem>>;
    public chartData$: Observable<Array<IFullChartData>>;
    public curve: CurveFactory = curveMonotoneX;
    public filter$: Observable<IPerformanceFilter>;
    private init$: Observable<IPerformanceFilter>;
    private sub: Subscription;
    public recentActivity$: Observable<any>;
    activeLink: string;
    public categTabs = [
        {
            type: 'all',
            hint: 'All',
        },
        {
            type: 'Round',
            hint: 'Round-Ups',
        },
        {
            type: 'Invest',
            hint: 'Invested',
        },
        // {
        //   hint: 'Withdrawn',
        // },
    ];
    public filterName = '7D';

    constructor(
        private store: Store<fromStoreDashboard.State>,
    ) {
        this.filter$ = this.store.pipe(select(fromStoreDashboard.getFilter));
        this.stats$ = this.store.pipe(select(fromStoreDashboard.getStats));
        this.performanceList$ = this.store.pipe(select(fromStoreDashboard.getPerformanceList));
        this.chartData$ = this.store.pipe(select(fromStoreDashboard.getChartData));
        this.store.dispatch(new LoadPerformance());
        this.init$ = this.filter$.pipe(
            take(1),
            tap(filter => this.store.dispatch(new Init(filter))),
        );
        this.sub = this.init$.subscribe();
        this.store.dispatch(new LoadRecentActivity({
            activeType: this.activeCateg,
            page: this.activePage,
        }));
        this.recentActivity$ = this.store.pipe(select(fromStore.getRecentActivity));
    }

    public setFilter(filter: IPerformanceFilter) {
        this.filterName = filter.period;
        this.store.dispatch(new SetFilter(filter));
    }

    public setActiveLink(e) {
        this.activeCateg = e;
        switch (e) {
            case ('Invested'):
                this.activeLink = 'Invest';
                break;
            case ('Round-Ups'):
                this.activeLink = 'Round';
                break;
            default:
                this.activeLink = 'All';
        }
        this.activePage = 1;
        this.store.dispatch(new SetActiveType({activeType: this.activeLink, page: 1}));
    }

    public setActivePage(e) {
        this.activePage = e;
        this.store.dispatch(new SetActivePage({activeType: this.activeLink, page: e}));
    }
}
