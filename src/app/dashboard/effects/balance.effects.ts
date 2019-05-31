import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, delay, map, mergeMap} from 'rxjs/operators';

import {
    BalanceActionTypes,
    LoadAssetBalanceFail,
    LoadAssetBalanceSuccess,
    LoadBalanceFail,
    LoadBalanceSuccess,
} from '../actions/balance.actions';
import {DashboardService} from '../services/dashboard.service';

@Injectable()
export class BalanceEffects {
    @Effect()
    loadBalance$ = this.actions$.pipe(
        ofType(BalanceActionTypes.LoadBalance),
        mergeMap(() =>
            this.dashboardService.getBallance().pipe(
                map(balance => new LoadBalanceSuccess(balance)),
                catchError(() => of(new LoadBalanceFail())),
            ),
        ),
    );
    @Effect()
    updateBalance$ = this.actions$.pipe(
        ofType(BalanceActionTypes.UpdateBalance),
        delay(15000),
        mergeMap(() =>
            this.dashboardService.getBallance().pipe(
                map(balance => new LoadBalanceSuccess(balance)),
                catchError(() => of(new LoadBalanceFail())),
            ),
        ),
    );
    @Effect()
    loadAssetBalance$ = this.actions$.pipe(
        ofType(BalanceActionTypes.LoadAssetBalance),
        // pluck('payload'),
        mergeMap(() =>

            this.dashboardService.getAssetBallance().pipe(
                map(balance => new LoadAssetBalanceSuccess(balance)),
                catchError(() => of(new LoadAssetBalanceFail())),
            ),
        ),
    );

    constructor(
        private actions$: Actions,
        private dashboardService: DashboardService,
    ) {
    }
}
