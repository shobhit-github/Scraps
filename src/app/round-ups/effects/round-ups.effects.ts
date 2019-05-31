import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    RoundUpsActions,
    RoundUpsActionTypes,
    LoadInfoSuccess,
    LoadInfoFail,
    LoadList,
    LoadListSuccess,
    LoadListFail,
    LoadRecurring,
    LoadRecurringSuccess,
    LoadRecurringFail,
    SetRecurring,
    SetRecurringSuccess,
    SetRecurringFail,
} from '../actions/round-ups.actions';
import {RoundUpsService} from '../services/round-ups.service';
import {
    switchMap,
    map,
    catchError,
    pluck,
    tap,
    mergeMap,
} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class RoundUpsEffects {
    @Effect()
    loadInfo$ = this.actions$.pipe(
        ofType(RoundUpsActionTypes.LoadInfo),
        switchMap(() => this.roundUpsService.getInfo()),
        map(data => new LoadInfoSuccess(data)),
        catchError(() => of(new LoadInfoFail())),
    );
    @Effect()
    loadRoundUps$ = this.actions$.pipe(
        ofType<LoadList>(RoundUpsActionTypes.LoadList),
        pluck('payload'),
        mergeMap(({params, type}) =>
            this.roundUpsService.getRoundUps(params, type).pipe(
                map(data => new LoadListSuccess(data)),
                catchError((err) => of(new LoadListFail(err))),
            ),
        ),
    );
    @Effect()
    loadRecurring$ = this.actions$.pipe(
        ofType<LoadRecurring>(RoundUpsActionTypes.LoadRecurring),
        switchMap(() => this.roundUpsService.getRecurring()),
        map(data => new LoadRecurringSuccess(data)),
        catchError(() => of(new LoadRecurringFail())),
    );
    @Effect({dispatch: false})
    setRecurring$ = this.actions$.pipe(
        ofType<SetRecurring>(RoundUpsActionTypes.SetRecurring),
        map(() => this.router.navigate(['/invest', 'buy'])),
    );

    constructor(
        private actions$: Actions<RoundUpsActions>,
        private roundUpsService: RoundUpsService,
        private router: Router,
    ) {
    }
}
