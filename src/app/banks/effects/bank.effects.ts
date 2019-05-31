import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, share, switchMap} from 'rxjs/operators';

import {IConnect} from '../../auth/interfaces/banks.interfaces';
import {BanksService} from '../../auth/services/banks.service';
import {BankActionTypes, Connect, LoadBanks} from '../actions/bank.actions';

@Injectable()
export class BankEffects {
    @Effect()
    loadBankList$: Observable<Action> = this.actions$.pipe(
        ofType<LoadBanks>(BankActionTypes.loadBanks),
        map(action => action.payload),
        switchMap((query: string) => {
            return this.bankService.getBanksList(query).pipe(
                // If successful, dispatch success action with result
                map((data: any) => {
                    return {
                        type: BankActionTypes.loadedBanks,
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
        ofType<Connect>(BankActionTypes.connect),
        map(action => action.payload),
        switchMap((connectData: IConnect) => {
            return this.bankService.connectToBank(connectData).pipe(
                // If successful, dispatch success action with result
                map((data: any) => {
                    return {
                        type: BankActionTypes.connectSuccess,
                    };
                }),
                // If request fails, dispatch failed action
                catchError(() => {
                    return of({type: BankActionTypes.connectFailed});
                }),
                share(),
            );
        }),
    );

    constructor(
        private actions$: Actions,
        private bankService: BanksService,
        private router: Router,
    ) {
    }
}
