import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    NotificationsActionTypes,
    UpdateNotification,
    SuccessUpdateNotification,
    FailedUpdateNotification,
    UpdateDesktop,
} from '../actions/notifications.actions';
import {mergeMap, map, catchError} from 'rxjs/operators';
import {SettingsService} from '../services/settings.service';
import {of} from 'rxjs';
import {SettingsActionTypes} from '../actions/settings.actions';
import {PushNotificationsService} from 'ng-push';

@Injectable()
export class NotificationsEffects {
    @Effect()
    load$ = this.actions$.pipe(
        ofType(NotificationsActionTypes.Load),
        mergeMap(() =>
            this.settingsService.getNotifications().pipe(
                map(data => ({
                    type: NotificationsActionTypes.SuccessLoad,
                    payload: data,
                })),
                catchError(() =>
                    of({
                        type: NotificationsActionTypes.FailedLoad,
                    }),
                ),
            ),
        ),
    );
    @Effect()
    update$ = this.actions$.pipe(
        ofType<UpdateNotification>(NotificationsActionTypes.UpdateNotification),
        mergeMap(action =>
            this.settingsService.updateNotifications(action.payload).pipe(
                map(() => ({
                    type: NotificationsActionTypes.SuccessUpdateNotification,
                })),
                catchError(() =>
                    of({
                        type: NotificationsActionTypes.FailedUpdateNotification,
                    }),
                ),
            ),
        ),
    );
    @Effect()
    success$ = this.actions$.pipe(
        ofType<SuccessUpdateNotification>(
            NotificationsActionTypes.SuccessUpdateNotification,
        ),
        map(() => ({type: SettingsActionTypes.Success})),
    );
    @Effect()
    failed$ = this.actions$.pipe(
        ofType<FailedUpdateNotification>(
            NotificationsActionTypes.FailedUpdateNotification,
        ),
        map(() => ({type: SettingsActionTypes.Fail})),
    );
    @Effect()
    toggleDesktop$ = this.actions$.pipe(
        ofType<UpdateDesktop>(NotificationsActionTypes.UpdateDesktop),
        mergeMap(action => {
            if (action.payload) {
                switch (this.pushNotifications.permission) {
                    case 'default':
                        this.pushNotifications.requestPermission();
                        break;
                    case 'granted':
                        return of({type: NotificationsActionTypes.FailedUpdateDesktop});
                    case 'denied':
                        return of({type: NotificationsActionTypes.FailedUpdateDesktop});
                }
            }
            return this.settingsService
                .updateDesktopNotifications(action.payload)
                .pipe(
                    map(() => ({
                        type: NotificationsActionTypes.SuccessUpdateDesktop,
                        payload: action.payload,
                    })),
                    catchError(() =>
                        of({type: NotificationsActionTypes.FailedUpdateDesktop}),
                    ),
                );
        }),
    );

    constructor(
        private actions$: Actions,
        private settingsService: SettingsService,
        private pushNotifications: PushNotificationsService,
    ) {
    }
}
