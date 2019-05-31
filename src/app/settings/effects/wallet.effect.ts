import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {WalletSettingsService} from '../services/wallet-settings.service';
import {catchError, map, mergeMap, pluck} from 'rxjs/operators';
import {
    LoadWalletKeys,
    SuccessUpdateWalletKeys,
    UpdateWalletKeys,
    WalletActionTypes
} from '../actions/wallet.actions';
import {of} from 'rxjs';
import {SettingsActionTypes} from '../actions/settings.actions';

@Injectable()
export class WalletEffect {
    @Effect()
    getWalletKeys$ = this.actions$.pipe(
        ofType<LoadWalletKeys>(WalletActionTypes.LoadWalletKeys),
        mergeMap(() => {
            return this.walletSettingsService.getWalletKeys().pipe(
                map(data => {
                    return {
                        type: WalletActionTypes.SuccessLoadWalletKeys,
                        payload: data,
                    };
                }),
                catchError(() => of({type: WalletActionTypes.FailedLoadWalletKeys})),
            );
        }),
    );
    @Effect()
    setWalletKeys$ = this.actions$.pipe(
        ofType<UpdateWalletKeys>(WalletActionTypes.UpdateWalletKeys),
        pluck('payload'),
        mergeMap((payload) => {
            return this.walletSettingsService.setWalletKeys(payload).pipe(
                map(data => {
                    return {
                        type: WalletActionTypes.SuccessUpdateWalletKeys,
                        payload: data,
                    };
                }),
                catchError(() => of({type: WalletActionTypes.FailedUpdateWalletKeys})),
            );
        }),
    );

    @Effect()
    success$ = this.actions$.pipe(
        ofType<SuccessUpdateWalletKeys>(WalletActionTypes.SuccessUpdateWalletKeys),
        map(() => {
            return {
                type: SettingsActionTypes.Success,
            };
        }),
    );

    constructor(
        private actions$: Actions,
        private walletSettingsService: WalletSettingsService,
    ) {
    }
}
