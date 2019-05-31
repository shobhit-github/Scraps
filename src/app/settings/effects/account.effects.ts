import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    LoadAccountSettings,
    UpdatePersonal,
    FailedUpdatePersonal,
    SuccessUpdatePersonal,
    UpdateAddress,
    FailedUpdateAddress,
    SuccessUpdateAddress,
    SuccessUpdatePreference,
    FailedUpdatePreference,
    UpdatePreference,
    AccountActionTypes,
    UpdatePassword,
    SendCode,
    FailedUpdatePassword,
    SuccessUpdatePassword,
} from '../actions/account.actions';
import {mergeMap, map, catchError} from 'rxjs/operators';
import {SettingsService} from '../services/settings.service';
import {of} from 'rxjs';
import {SettingsActionTypes} from '../actions/settings.actions';

@Injectable()
export class AccountEffects {
    @Effect()
    loadAccountSettings$ = this.actions$.pipe(
        ofType<LoadAccountSettings>(AccountActionTypes.LoadAccountSettings),
        mergeMap(() => {
            return this.settinsService.getAccount().pipe(
                map(account => ({
                    type: AccountActionTypes.SuccessAccountSettings,
                    payload: account,
                })),
                catchError(() =>
                    of({
                        type: AccountActionTypes.FailedAccountSettings,
                    }),
                ),
            );
        }),
    );
    @Effect()
    updatePersonal$ = this.actions$.pipe(
        ofType<UpdatePersonal>(AccountActionTypes.UpdatePersonal),
        mergeMap(action => {
            return this.settinsService.updatePersonal(action.payload).pipe(
                map(() => ({
                    type: AccountActionTypes.SuccessUpdatePersonal,
                })),
                catchError(() =>
                    of({
                        type: AccountActionTypes.FailedUpdatePersonal,
                    }),
                ),
            );
        }),
    );
    @Effect()
    updateAddress$ = this.actions$.pipe(
        ofType<UpdateAddress>(AccountActionTypes.UpdateAddress),
        mergeMap(action => {
            return this.settinsService.updateAddress(action.payload).pipe(
                map(() => ({
                    type: AccountActionTypes.SuccessUpdateAddress,
                })),
                catchError(() =>
                    of({
                        type: AccountActionTypes.FailedUpdateAddress,
                    }),
                ),
            );
        }),
    );
    @Effect()
    updatePreference$ = this.actions$.pipe(
        ofType<UpdatePreference>(AccountActionTypes.UpdatePreference),
        mergeMap(action => {
            return this.settinsService.updatePreference(action.payload).pipe(
                map(() => ({
                    type: AccountActionTypes.SuccessUpdatePreference,
                })),
                catchError(() =>
                    of({
                        type: AccountActionTypes.FailedUpdatePreference,
                    }),
                ),
            );
        }),
    );
    @Effect()
    sendCode$ = this.actions$.pipe(
        ofType<SendCode>(AccountActionTypes.SendCode),
        mergeMap(() =>
            this.settinsService.updatePasswordSendCode().pipe(
                map(() => ({type: AccountActionTypes.SuccessSendCode})),
                catchError(() => of({type: AccountActionTypes.FailedSendCode})),
            ),
        ),
    );
    @Effect()
    updatePassword$ = this.actions$.pipe(
        ofType<UpdatePassword>(AccountActionTypes.UpdatePassword),
        mergeMap(action =>
            this.settinsService.updatePassword(action.payload).pipe(
                map(() => ({type: AccountActionTypes.SuccessUpdatePassword})),
                catchError(() => of({type: AccountActionTypes.FailedUpdatePassword})),
            ),
        ),
    );
    @Effect()
    failedUpdateAccount$ = this.actions$.pipe(
        ofType<| FailedUpdatePersonal
            | FailedUpdateAddress
            | FailedUpdatePreference
            | FailedUpdatePassword>(
            AccountActionTypes.FailedUpdatePersonal,
            AccountActionTypes.FailedUpdateAddress,
            AccountActionTypes.FailedUpdatePreference,
            AccountActionTypes.FailedUpdatePassword,
        ),
        map(() => {
            return {
                type: AccountActionTypes.LoadAccountSettings,
            };
        }),
    );
    @Effect()
    success$ = this.actions$.pipe(
        ofType<| SuccessUpdatePersonal
            | SuccessUpdateAddress
            | SuccessUpdatePreference
            | SuccessUpdatePassword>(
            AccountActionTypes.SuccessUpdatePersonal,
            AccountActionTypes.SuccessUpdateAddress,
            AccountActionTypes.SuccessUpdatePreference,
            AccountActionTypes.SuccessUpdatePassword,
        ),
        map(() => {
            return {
                type: SettingsActionTypes.Success,
            };
        }),
    );
    @Effect()
    failed$ = this.actions$.pipe(
        ofType<| FailedUpdatePersonal
            | FailedUpdateAddress
            | FailedUpdatePreference
            | FailedUpdatePassword>(
            AccountActionTypes.FailedUpdatePersonal,
            AccountActionTypes.FailedUpdateAddress,
            AccountActionTypes.FailedUpdatePreference,
            AccountActionTypes.FailedUpdatePassword,
        ),
        map(() => {
            return {
                type: SettingsActionTypes.Fail,
            };
        }),
    );

    constructor(
        private actions$: Actions,
        private settinsService: SettingsService,
    ) {
    }
}
