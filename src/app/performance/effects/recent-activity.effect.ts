import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    FailLoadRecentActivity,
    LoadRecentActivity,
    RecentActivityType,
} from '../actions/recent-activity.actions';
import {catchError, map, mergeMap, pluck} from 'rxjs/operators';
import {of} from 'rxjs';
import {PerformanceService} from '../services/performance.service';

@Injectable()
export class RecentActivityEffect {
    @Effect()
    loadRecentActivity$ = this.actions$.pipe(
        ofType(RecentActivityType.LoadRecentActivity),
        pluck('payload'),
        mergeMap((req: { activeType: string, page: number }) => {
                return this.performanceService.getRecentActivity(req).pipe(
                    map(data => ({
                            type: RecentActivityType.SuccessLoadRecentActivity,
                            payload: {
                                data: this.convert(data.data),
                                meta: data.meta,
                            },
                        }),
                    ),
                    catchError(() => of(new FailLoadRecentActivity())),
                );
            },
        ),
    );

    @Effect()
    setActiveType$ = this.actions$.pipe(
        ofType(RecentActivityType.SetActiveType),
        pluck('payload'),
        mergeMap(({activeType, page}) =>
            of(new LoadRecentActivity({activeType, page})),
        ),
    );

    @Effect()
    setActivePage$ = this.actions$.pipe(
        ofType(RecentActivityType.SetActivePage),
        pluck('payload'),
        mergeMap(({activeType, page}) =>
            of(new LoadRecentActivity({activeType, page})),
        ),
    );

    constructor(
        private actions$: Actions,
        private performanceService: PerformanceService,
    ) {
    }

    private convert(data) {
        const newData = [];
        data.forEach(el => {
            newData.push({
                type: el.recent_type,
                title: el.title,
                increase: el.increase,
                mode: el.mode,
                time: el.time,
                hint: el.hint,
                value: el.value,
            });
        });
        return newData;
    }
}
