import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    YodleeActions,
    YodleeActionTypes,
    LoadYodleeSuccess,
    LoadYodleeFial,
    LoadFormSuccess,
    LoadFormFail,
} from '../actions/yodlee.actions';
import {pluck, mergeMap, catchError, map} from 'rxjs/operators';
import {IYodleeCreds} from '../reducers/yodlee.reducer';
import {YodleeService} from '../services/yodlee.service';
import {of} from 'rxjs';

@Injectable()
export class YodleeEffects {

    @Effect()
    loadCreds$ = this.actions$.pipe(
        ofType(YodleeActionTypes.LoadYodlee),
        mergeMap(() =>
            this.yodleeService.getCreds().pipe(
                map((creds: IYodleeCreds) => new LoadYodleeSuccess(creds)),
                catchError(() => of(new LoadYodleeFial())),
            ),
        ),
    );
    // @Effect()
    // loadForm$ = this.actions$.pipe(
    //   ofType(YodleeActionTypes.LoadForm),
    //   pluck('payload'),
    //   mergeMap((creds: IYodleeCreds) =>
    //     this.yodleeService.getForm(creds).pipe(
    //       map((form: string) => new LoadFormSuccess(form)),
    //       catchError(() => of(new LoadFormFail())),
    //     ),
    //   ),
    // );

    constructor(
        private actions$: Actions,
        private yodleeService: YodleeService,
    ) {
    }
}
