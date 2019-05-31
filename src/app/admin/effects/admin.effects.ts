import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of, concat} from 'rxjs';
import {catchError, map, mergeMap, tap, switchMap} from 'rxjs/operators';

import {
    AdminActionTypes,
    LoadUsers,
    LoadUsersSuccess,
    Login,
    Success,
    Update,
    LoadNewsCats,
    LoadNewsCatsSuccess,
    UpdateCat,
    DownloadFile,
    SearchUsers,
} from '../actions/admin.actions';
import {TableItem} from '../interfaces/table.interfaces';
import {IUserForAdmin} from '../interfaces/user-for-admin.interface';
import {AdminService} from '../services/admin.service';
import {
    AuthActionTypes,
    AuthActions,
    LoginSuccess,
    LoginFailed,
} from '../../auth/actions/auth.actions';
import {ILoginResponse} from '../../auth/interfaces/login.interface';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {Sort} from '@angular/material';

@Injectable()
export class AdminEffects {

    @Effect()
    login$ = this.actions$.pipe(
        ofType<Login>(AdminActionTypes.Login),
        map(action => action.payload),
        mergeMap(loginData => {
            const status = this.adminService.login(loginData).pipe(
                map(
                    (data: ILoginResponse): AuthActions => new LoginSuccess(data, true),
                ),
                catchError(() => of(new LoginFailed())),
            );
            const result = status.pipe(
                mergeMap((statusAction: AuthActions) => {
                    if (statusAction.type === AuthActionTypes.loginSuccess) {
                        return of({type: AdminActionTypes.Success});
                    } else {
                        return of({type: AdminActionTypes.Fail});
                    }
                }),
            );
            const concated = concat(status, result);
            // const merged = merge(pending, concated);
            return concated;
        }),
    );

    @Effect()
    loadUsers$ = this.actions$.pipe(
        ofType<LoadUsers>(AdminActionTypes.LoadUsers),
        map(action => action.payload),
        mergeMap((req: { limit: number; page: number; sort?: Sort }) => {
            return this.adminService.getUsers(req).pipe(
                map(
                    (data): LoadUsersSuccess => ({
                        type: AdminActionTypes.LoadUsersSuccess,
                        payload: {
                            users: this.convert(data.data),
                            meta: data.meta,
                            links: data.links,
                        },
                    }),
                ),
                catchError(() => of({type: AdminActionTypes.LoadUsersFailed})),
            );
        }),
    );

    @Effect()
    searchUsers$ = this.actions$.pipe(
        ofType<SearchUsers>(AdminActionTypes.SearchUsers),
        map(action => action.payload),
        mergeMap((req: { limit: number; page: number; sort?: Sort, q?: string }) => {
            return this.adminService.SearchUsers(req).pipe(
                map(
                    (data): LoadUsersSuccess => ({
                        type: AdminActionTypes.LoadUsersSuccess,
                        payload: {
                            users: this.convert(data.data),
                            meta: data.meta,
                            links: data.links,
                        },
                    }),
                ),
                catchError(() => of({type: AdminActionTypes.LoadUsersFailed})),
            );
        }),
    );

    @Effect()
    loadNews$ = this.actions$.pipe(
        ofType<LoadNewsCats>(AdminActionTypes.LoadNewsCats),
        mergeMap(() => {
            return this.adminService.getNews().pipe(
                map(
                    (data): LoadNewsCatsSuccess => ({
                        type: AdminActionTypes.LoadNewsCatsSuccess,
                        payload: data,
                    }),
                ),
            );
        }),
    );

    @Effect({dispatch: false})
    success$ = this.actions$.pipe(
        ofType<Success>(AdminActionTypes.Success),
        tap(() => {
            this.router.navigate(['/admin', 'users']);
        }),
    );

    @Effect({dispatch: false})
    update$ = this.actions$.pipe(
        ofType<Update>(AdminActionTypes.Update),
        switchMap(action => {
            return this.adminService.setUserStatus(
                action.payload.status,
                String(action.payload.userId),
            );
        }),
    );

    @Effect()
    updateNews$ = this.actions$.pipe(
        ofType<UpdateCat>(AdminActionTypes.UpdateCat),
        switchMap(action => {
            return this.adminService.updateNewsCat(action.payload).pipe(
                map(() => {
                    // if (action.payload.has('image')) {
                    return {
                        type: AdminActionTypes.LoadNewsCats,
                    };
                    // }
                }),
            );
        }),
    );

    @Effect({dispatch: false})
    downloadFile$ = this.actions$.pipe(
        ofType<DownloadFile>(AdminActionTypes.DownloadFile),
        map(action => action.payload),
        mergeMap(action => {
            return this.adminService.downloadFile(String(action.type)).pipe(
                map(data => {
                    saveAs(
                        new Blob([data]),
                        `users-${moment().format('YYYY-MM-DD')}.${action.type}`,
                    );
                }),
            );
        }),
    );

    constructor(
        private actions$: Actions,
        private adminService: AdminService,
        private router: Router,
    ) {
    }

    private convert(data: IUserForAdmin[]): TableItem[] {
        const newData: TableItem[] = [];
        data.forEach(el => {
            newData.push({
                id: el.user.id,
                email: el.user.email,
                dateCreated: el.user.created_at,
                legalName: el.user.name,
                attachedDocs: el.files.map(img => img.url),
                status: el.user.status,
                referral_link: el.user.referral_link,
            });
        });
        return newData;
    }
}
