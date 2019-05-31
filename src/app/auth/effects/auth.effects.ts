import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {concat, merge, Observable, of} from 'rxjs';
import {
    catchError,
    map,
    mergeMap,
    tap,
    pluck,
    switchMap,
} from 'rxjs/operators';

import {DeleteUser, SaveUser} from '../../core/actions/user.actions';
import {
    AuthActionTypes,
    ChangePassword,
    FailedLoginCode,
    FailedResendLoginCode,
    Forgot,
    Login,
    LoginCode,
    LoginSuccess,
    Logout,
    Logouted,
    Register,
    RegisterLoginSuccess,
    RegisterReset,
    RegisterSuccess,
    ResendLoginCode,
    SuccessLoginCode,
    SuccessResendLoginCode,
    CheckToken,
    CheckTokenSuccess,
    CheckTokenFail,
    RefreshToken,
    RefreshTokenFail,
    RefreshTokenSuccess,
    LoginFailed,
    RegisterFailed,
    PendingEnd,
    Pending,
} from '../actions/auth.actions';
import {IChangePasswordRequest} from '../interfaces/change.interface';
import {IForgotRequest} from '../interfaces/forgot.interface';
import {ILoginRequest, ILoginResponse} from '../interfaces/login.interface';
import {IRegisterInfo} from '../interfaces/register.interface';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
    ) {
    }

    @Effect()
    register$: Observable<Action> = this.actions$.pipe(
        ofType<Register>(AuthActionTypes.register),
        pluck('payload'),
        mergeMap((registerData: IRegisterInfo) => {
            const pending = of(new Pending());
            const register = this.authService.registerUser(registerData).pipe(
                // If successful, dispatch success action with result
                map((data: ILoginResponse) => new RegisterSuccess(data)),
                // If request fails, dispatch failed action
                catchError(() => {
                    return of(new RegisterFailed());
                }),
            );
            const pendingEnd = of(new PendingEnd());
            const concated = concat(register, pendingEnd);
            const merged = merge(pending, concated);
            return merged;
        }),
    );
    @Effect({dispatch: true})
    registerSuccess$: Observable<Action> = this.actions$.pipe(
        ofType<RegisterSuccess>(AuthActionTypes.registerSuccess),
        pluck('payload'),
        mergeMap((loginData: ILoginResponse) => {
            return of(new RegisterLoginSuccess(loginData));
        }),
        tap(() => {
            this.router.navigate(['/auth', 'progress']);
        }),
    );
    @Effect({dispatch: true})
    registerReset$: Observable<Action> = this.actions$.pipe(
        ofType<RegisterReset>(AuthActionTypes.registerReset),
        mergeMap(() => {
            return this.authService.logout().pipe(
                map(() => {
                    this.router.navigate(['/auth', 'register']);
                    return new Logouted();
                }),
            );
        }),
    );
    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType<Login>(AuthActionTypes.login),
        pluck('payload'),
        mergeMap((loginData: ILoginRequest) => {
            return this.authService.login(loginData).pipe(
                // If successful, dispatch success action with result
                map((data: ILoginResponse) => new LoginSuccess(data)),
                // If request fails, dispatch failed action
                catchError(() => {
                    return of(new LoginFailed());
                }),
            );
        }),
    );
    @Effect()
    refresh$: Observable<Action> = this.actions$.pipe(
        ofType<RefreshToken>(AuthActionTypes.RefreshToken),
        pluck('payload'),
        mergeMap((cb: Function) => {
            return this.authService.refreshToken().pipe(
                // If successful, dispatch success action with result
                map((data: ILoginResponse) => {
                    cb();
                    return new RefreshTokenSuccess(data);
                }),
                // If request fails, dispatch failed action
                catchError(() => {
                    return of(new RefreshTokenFail());
                }),
            );
        }),
    );
    @Effect()
    changePassword$: Observable<Action> = this.actions$.pipe(
        ofType<ChangePassword>(AuthActionTypes.changePassword),
        pluck('payload'),
        mergeMap((changeData: IChangePasswordRequest) => {
            return this.authService.reset(changeData).pipe(
                // If successful, dispatch success action with result
                map((data: any) => {
                    return {
                        type: AuthActionTypes.changePasswordSuccess,
                    };
                }),
                // If request fails, dispatch failed action
                catchError(() => {
                    return of({type: AuthActionTypes.changePasswordFailed});
                }),
            );
        }),
    );
    @Effect({dispatch: false})
    changePasswordSuccess$: Observable<Action> = this.actions$.pipe(
        ofType<ChangePassword>(AuthActionTypes.changePassword),
        tap(() => {
            this.router.navigate(['/auth', 'login']);
        }),
    );

    @Effect()
    logout$: Observable<Action> = this.actions$.pipe(
        ofType<Logout>(AuthActionTypes.logout),
        mergeMap(() => {
            return this.authService.logout().pipe(
                // If successful, dispatch success action with result
                map(() => {
                    return {
                        type: AuthActionTypes.logouted,
                    };
                }),
                // If request fails, dispatch failed action
                catchError(() => {
                    return of({type: AuthActionTypes.logouted});
                }),
            );
        }),
    );

    @Effect()
    logouted$: Observable<Action> = this.actions$.pipe(
        ofType<Logouted>(AuthActionTypes.logouted),
        map(() => {
            this.router.navigate(['/auth', 'register']);
            return new DeleteUser();
        }),
    );
    @Effect()
    failRefresh$: Observable<Action> = this.actions$.pipe(
        ofType<RefreshTokenFail>(AuthActionTypes.RefreshTokenFail),
        map(() => {
            return new Logouted();
        }),
    );

    @Effect()
    loginSuccess$: Observable<Action> = this.actions$.pipe(
        ofType<LoginSuccess>(AuthActionTypes.loginSuccess),
        map((action: LoginSuccess) => {
            if (!action.payload.two_factor_auth && !action.isAdmin) {
                this.router.navigate(['/news']);
            }
            return new SaveUser(action.payload);
        }),
    );
    @Effect()
    onTFAResend$: Observable<Action> = this.actions$.pipe(
        ofType<ResendLoginCode>(AuthActionTypes.ResendLoginCode),
        mergeMap(action => {
            return this.authService.resendCodeTFA().pipe(
                map(() => new SuccessResendLoginCode()),
                catchError(() => of(new FailedResendLoginCode())),
            );
        }),
    );
    @Effect()
    onTFA$: Observable<Action> = this.actions$.pipe(
        ofType<LoginCode>(AuthActionTypes.LoginCode),
        mergeMap(action => {
            return this.authService.confirmCodeTFA(action.payload).pipe(
                map(() => new SuccessLoginCode()),
                catchError(() => of(new FailedLoginCode())),
            );
        }),
    );
    @Effect({dispatch: false})
    onTFASuccess$: Observable<Action> = this.actions$.pipe(
        ofType<SuccessLoginCode>(AuthActionTypes.SuccessLoginCode),
        tap(() => {
            this.router.navigate(['/news']);
        }),
    );
    @Effect()
    registerLoginSuccess$: Observable<Action> = this.actions$.pipe(
        ofType<RegisterLoginSuccess>(AuthActionTypes.registerLoginSuccess),
        map((action: RegisterLoginSuccess) => {
            return new SaveUser(action.payload);
        }),
    );

    @Effect()
    forgot$: Observable<Action> = this.actions$.pipe(
        ofType<Forgot>(AuthActionTypes.forgot),
        pluck('payload'),
        mergeMap((forgotData: IForgotRequest) => {
            return this.authService.forgot(forgotData).pipe(
                map((resp: any) => {
                    return {
                        type: AuthActionTypes.forgotSuccess,
                    };
                }),
                catchError((err: any) => of({type: AuthActionTypes.forgotFailed})),
            );
        }),
    );
    @Effect()
    checkToken$: Observable<Action> = this.actions$.pipe(
        ofType<CheckToken>(AuthActionTypes.CheckToken),
        pluck('payload'),
        switchMap((data: { token: string; user_id: number | string }) =>
            this.authService.checkToken(data),
        ),
        map(() => new CheckTokenSuccess()),
        catchError(() => of(new CheckTokenFail())),
    );
}
