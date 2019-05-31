import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {
    VerifyNumberActions,
    VerifyNumberActionTypes,
    PhoneSend,
    PhoneSuccess,
    CodeSend,
} from '../actions/verify.actions';
import {Action} from '@ngrx/store';
import {map, mergeMap, catchError, tap} from 'rxjs/operators';
import {VerifyService} from '../services/verify.service';
import {Router} from '@angular/router';
import {StorageService} from '../services/storage.service';
import {ResendRegisterCode} from '../actions/verify.actions';

@Injectable()
export class VerifyEffects {
    @Effect()
    sendPhone$: Observable<Action> = this.actions$.pipe(
        ofType<PhoneSend>(VerifyNumberActionTypes.phoneSend),
        map(action => action.payload),
        mergeMap((config: { phone: string; country: string }) => {
            return this.verifyService.sendPhone(config).pipe(
                // If successful, dispatch success action with result
                map((data: any) => {
                    return {
                        type: VerifyNumberActionTypes.phoneSuccess,
                        payload: data,
                    };
                }),
                // If request fails, dispatch failed action
                catchError(() => {
                    return of({type: VerifyNumberActionTypes.phoneFailed});
                }),
            );
        }),
    );
    @Effect()
    reSendPhone$: Observable<Action> = this.actions$.pipe(
        ofType<ResendRegisterCode>(VerifyNumberActionTypes.ResendRegisterCode),
        mergeMap(() => {
            return this.verifyService.reSendCode().pipe(
                // If successful, dispatch success action with result
                map((data: any) => {
                    return {
                        type: VerifyNumberActionTypes.SuccessResendRegisterCode,
                        payload: data,
                    };
                }),
                // If request fails, dispatch failed action
                catchError(() => {
                    return of({type: VerifyNumberActionTypes.FailedResendRegisterCode});
                }),
            );
        }),
    );
    @Effect()
    phoneSuccess$: Observable<Action> = this.actions$.pipe(
        ofType<PhoneSuccess>(VerifyNumberActionTypes.phoneSuccess),
        map(() => {
            return {
                type: VerifyNumberActionTypes.stepIncrement,
            };
        }),
    );
    @Effect()
    sendCode$: Observable<Action> = this.actions$.pipe(
        ofType<CodeSend>(VerifyNumberActionTypes.codeSend),
        map(action => action.payload.code),
        mergeMap((code: string) => {
            return this.verifyService.sendCode(code).pipe(
                // If successful, dispatch success action with result
                map((data: any) => {
                    return {
                        type: VerifyNumberActionTypes.codeSuccess,
                        payload: data,
                    };
                }),
                // If request fails, dispatch failed action
                catchError(() => {
                    return of({type: VerifyNumberActionTypes.codeFailed});
                }),
            );
        }),
    );

    constructor(
        private actions$: Actions,
        private verifyService: VerifyService,
    ) {
    }
}
