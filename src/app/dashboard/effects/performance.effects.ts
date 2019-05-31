import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    PerformanceActionTypes,
    LoadStats,
    LoadStatsSuccess,
    LoadStatsFail,
    SetFilter,
    Init,
    LoadPerformance,
    LoadPerformanceSuccess,
    LoadPerformanceFail,
    LoadChart,
    LoadChartSuccess,
    LoadChartFail,
} from '../actions/performance.actions';
import {mergeMap, map, catchError, pluck, tap} from 'rxjs/operators';
import {DashboardService} from '../services/dashboard.service';
import {of} from 'rxjs';
import {IPerformanceFilter} from '../interfaces/dashboard-service';

@Injectable()
export class PerformanceEffects {
    @Effect()
    loadStats$ = this.actions$.pipe(
        ofType<LoadStats>(PerformanceActionTypes.LoadStats),
        mergeMap(action =>
            this.dashboardService.getStatistic(action.payload).pipe(
                map(data => new LoadStatsSuccess(data)),
                catchError(() => of(new LoadStatsFail())),
            ),
        ),
    );

    @Effect()
    loadPerformance$ = this.actions$.pipe(
        ofType<LoadPerformance>(PerformanceActionTypes.LoadPerformance),
        mergeMap(() =>
            this.dashboardService.getPerformance().pipe(
                map(data => new LoadPerformanceSuccess(data)),
                catchError(() => of(new LoadPerformanceFail())),
            ),
        ),
    );
    @Effect()
    loadChart$ = this.actions$.pipe(
        ofType<LoadChart>(PerformanceActionTypes.LoadChart),
        pluck('payload'),
        mergeMap((filter: IPerformanceFilter) =>
            this.dashboardService.getChartData(filter).pipe(
                map(data => new LoadChartSuccess(data)),
                catchError(() => of(new LoadChartFail())),
            ),
        ),
    );

    @Effect()
    setFilter$ = this.actions$.pipe(
        ofType<SetFilter | Init>(
            PerformanceActionTypes.SetFilter,
            PerformanceActionTypes.Init,
        ),
        pluck('payload'),
        mergeMap((filter: IPerformanceFilter) =>
            of(new LoadStats(filter), new LoadChart(filter)),
        ),
    );

    constructor(
        private actions$: Actions,
        private dashboardService: DashboardService,
    ) {
    }
}
