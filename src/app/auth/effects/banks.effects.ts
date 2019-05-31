import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    BanksActionTypes,
    LoadBanks,
    Connect,
    ConnectSuccess,
} from '../actions/banks.actions';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {map, concatMap, catchError, tap, mergeMap} from 'rxjs/operators';
import {BanksService} from '../services/banks.service';
import {IConnect} from '../interfaces/banks.interfaces';
import {Router} from '@angular/router';
import {State} from '../../admin/reducers';
import {Load, StepActionTypes} from '../actions/step.actions';

@Injectable()
export class BanksEffects {
    @Effect()
    loadBankList$: Observable<Action> = this.actions$.pipe(
        ofType<LoadBanks>(BanksActionTypes.loadBanks),
        map(action => action.payload),
        concatMap((query: string) => {
            return this.banksService.getBanksList(query).pipe(
                // If successful, dispatch success action with result
                map((data: any) => {
                    return {
                        type: BanksActionTypes.loadedBanks,
                        payload: data,
                    };
                }),
                // If request fails, dispatch failed action
                // catchError(() => {
                //   this.storageService.setCodeFail();
                //   return of({ type: VerifyNumberActionTypes.codeFailed });
                // }),
            );
        }),
    );
    @Effect()
    connect$: Observable<Action> = this.actions$.pipe(
        ofType<Connect>(BanksActionTypes.connect),
        map(action => action.payload),
        concatMap((connectData: IConnect) => {
            return this.banksService.connectToBank(connectData).pipe(
                // If successful, dispatch success action with result
                map((data: any) => {
                    return {
                        type: BanksActionTypes.connectSuccess,
                    };
                }),
                // If request fails, dispatch failed action
                catchError(() => {
                    return of({type: BanksActionTypes.connectFailed});
                }),
            );
        }),
    );
    @Effect({dispatch: false})
    success$: Observable<Action> = this.actions$.pipe(
        ofType<ConnectSuccess>(BanksActionTypes.connectSuccess),
        tap(() => this.router.navigate(['/auth-quiz/start'])),
    );

    constructor(
        private actions$: Actions,
        private banksService: BanksService,
        private router: Router,
        private store: Store<State>,
    ) {
    }
}
