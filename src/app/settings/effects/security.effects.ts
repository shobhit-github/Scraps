import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, pluck} from 'rxjs/operators';

import {
    AuthActionTypes,
    ForceTokenUpdate,
} from '../../auth/actions/auth.actions';
import {
    FailedUpdateCloseAccount,
    FailedUpdateTFA,
    Load,
    SecurityActionTypes,
    SuccessUpdateCloseAccount,
    SuccessUpdateTFA,
    UpdateCloseAccount,
    UpdatePhone,
    UpdateTFA,
    FailedUpdatePhoneWithCode,
    SuccessUpdatePhoneWithCode,
    UpdatePhoneWithCode,
    SuccessLoad,
    LoadPlaid,
    SuccessLoadPlaid,
    FailedLoadPlaid,
} from '../actions/security.actions';
import {SettingsActionTypes} from '../actions/settings.actions';
import {SettingsService} from '../services/settings.service';
import {AuthService} from '../../auth/services/auth.service';

@Injectable()
export class SecurityEffects {
    @Effect()
    load$ = this.actions$.pipe(
        ofType<Load>(SecurityActionTypes.Load),
        mergeMap(() => {
            return this.settingsService.getSecurity().pipe(
                map(security => ({
                    type: SecurityActionTypes.SuccessLoad,
                    payload: security,
                })),
                catchError(() => of({type: SecurityActionTypes.FailedLoad})),
            );
        }),
    );
    @Effect()
    successLoadWithPlaid$ = this.actions$.pipe(
        ofType<SuccessLoad>(SecurityActionTypes.SuccessLoad),
        map(action => new LoadPlaid(action.payload)),
    );
    @Effect()
    loadPlaid$ = this.actions$.pipe(
        ofType<LoadPlaid>(SecurityActionTypes.LoadPlaid),
        mergeMap(action =>
            this.settingsService.getBanksPlaidByList(action.payload.plaid_ids).pipe(
                map(data => new SuccessLoadPlaid(data)),
                catchError(() => of(new FailedLoadPlaid())),
            ),
        ),
    );
    @Effect()
    public updatePhone = this.actions$.pipe(
        ofType<UpdatePhone>(SecurityActionTypes.UpdatePhone),
        mergeMap(action => {
            return this.settingsService.updatePhone(action.payload).pipe(
                map(() => ({
                    type: SecurityActionTypes.SuccessUpdatePhone,
                })),
                catchError(() =>
                    of({
                        type: SecurityActionTypes.FailedUpdatePhone,
                    }),
                ),
            );
        }),
    );
    @Effect()
    public updatePhoneWithCode = this.actions$.pipe(
        ofType<UpdatePhoneWithCode>(SecurityActionTypes.UpdatePhoneWithCode),
        mergeMap(action => {
            return this.settingsService.updatePhone(action.payload).pipe(
                map(() => ({
                    type: SecurityActionTypes.SuccessUpdatePhoneWithCode,
                })),
                catchError(() =>
                    of({
                        type: SecurityActionTypes.FailedUpdatePhoneWithCode,
                    }),
                ),
            );
        }),
    );
    @Effect()
    public closeAccount = this.actions$.pipe(
        ofType<UpdateCloseAccount>(SecurityActionTypes.UpdateCloseAccount),
        mergeMap(action => {
            return this.settingsService.closeAccount().pipe(
                map(() => ({
                    type: SecurityActionTypes.SuccessUpdateCloseAccount,
                })),
                catchError(() =>
                    of({
                        type: SecurityActionTypes.FailedUpdateCloseAccount,
                    }),
                ),
            );
        }),
    );
    @Effect()
    public updateTFA = this.actions$.pipe(
        ofType<UpdateTFA>(SecurityActionTypes.UpdateTFA),
        mergeMap(action => {
            return this.settingsService.updateTFA(action.payload).pipe(
                map(() => ({
                    type: SecurityActionTypes.SuccessUpdateTFA,
                })),
                catchError(() => {
                    return of({
                        type: SecurityActionTypes.FailedUpdateTFA,
                    });
                }),
            );
        }),
    );
    @Effect()
    public successUpdateTFA = this.actions$.pipe(
        ofType<SuccessUpdateTFA>(SecurityActionTypes.SuccessUpdateTFA),
        pluck('payload'),
        mergeMap(() => {
            return this.authService.checkTFA().pipe(
                map((data: { two_factor_auth: (0 | 1) }) => new ForceTokenUpdate(data)),
                catchError(() => {
                    return of(new ForceTokenUpdate({two_factor_auth: 0}));
                }),
            );
        }),
    );
    @Effect()
    public result = this.actions$.pipe(
        ofType<SuccessUpdatePhoneWithCode | SuccessUpdateTFA>(
            SecurityActionTypes.SuccessUpdatePhoneWithCode,
            SecurityActionTypes.SuccessUpdateTFA,
        ),
        map(() => ({
            type: SecurityActionTypes.Load,
        })),
    );
    @Effect()
    public close = this.actions$.pipe(
        ofType<UpdateCloseAccount>(SecurityActionTypes.UpdateCloseAccount),
        mergeMap(() =>
            this.settingsService.closeAccount().pipe(
                map(() => ({
                    type: SecurityActionTypes.SuccessUpdateCloseAccount,
                })),
                catchError(() =>
                    of({type: SecurityActionTypes.FailedUpdateCloseAccount}),
                ),
            ),
        ),
    );
    @Effect()
    successClose$ = this.actions$.pipe(
        ofType<SuccessUpdateCloseAccount>(
            SecurityActionTypes.SuccessUpdateCloseAccount,
        ),
        map(() => ({type: AuthActionTypes.logout})),
    );
    @Effect()
    public success = this.actions$.pipe(
        ofType<SuccessUpdatePhoneWithCode | SuccessUpdateTFA>(
            SecurityActionTypes.SuccessUpdatePhoneWithCode,
            SecurityActionTypes.SuccessUpdateTFA,
        ),
        map(() => ({
            type: SettingsActionTypes.Success,
        })),
    );
    @Effect()
    public failed = this.actions$.pipe(
        ofType<FailedUpdatePhoneWithCode | FailedUpdateCloseAccount | FailedUpdateTFA>(
            SecurityActionTypes.FailedUpdatePhone,
            SecurityActionTypes.FailedUpdateCloseAccount,
            SecurityActionTypes.FailedUpdateTFA,
        ),
        map(() => ({
            type: SettingsActionTypes.Fail,
        })),
    );

    constructor(
        private actions$: Actions,
        private settingsService: SettingsService,
        private authService: AuthService,
    ) {
    }
}
