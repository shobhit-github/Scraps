import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    ProfileActionTypes,
    LoadProfileSettings,
    UpdateProfileSettings,
    SuccessUpdateProfileSettings,
    FailedUpdateProfileSettings,
    SuccessLoadProfileSettings,
} from '../actions/profile.actions';
import {mergeMap, map, catchError} from 'rxjs/operators';
import {SettingsService} from '../services/settings.service';
import {of} from 'rxjs';
import {SettingsActionTypes} from '../actions/settings.actions';
import {UpdateAvatar} from '../../core/actions/user.actions';

@Injectable()
export class ProfileEffects {
    @Effect()
    public load = this.actions$.pipe(
        ofType<LoadProfileSettings>(ProfileActionTypes.LoadProfileSettings),
        mergeMap(() => {
            return this.settingsService.getProfile().pipe(
                map(
                    data => ({
                        type: ProfileActionTypes.SuccessLoadProfileSettings,
                        payload: data,
                    }),
                    catchError(() =>
                        of({
                            type: ProfileActionTypes.FailedLoadProfileSettings,
                        }),
                    ),
                ),
            );
        }),
    );
    @Effect()
    public update = this.actions$.pipe(
        ofType<UpdateProfileSettings>(ProfileActionTypes.UpdateProfileSettings),
        mergeMap(action => {
            return this.settingsService.updateProfile(action.payload).pipe(
                map(() => ({
                    type: ProfileActionTypes.SuccessUpdateProfileSettings,
                })),
                catchError(() =>
                    of({
                        type: ProfileActionTypes.FailedUpdateProfileSettings,
                    }),
                ),
            );
        }),
    );
    @Effect()
    public updateAvatar = this.actions$.pipe(
        ofType<SuccessLoadProfileSettings>(
            ProfileActionTypes.SuccessLoadProfileSettings,
        ),
        map(action => {
            return new UpdateAvatar(action.payload.avatar);
        }),
    );
    @Effect()
    public result = this.actions$.pipe(
        ofType<SuccessUpdateProfileSettings | FailedUpdateProfileSettings>(
            ProfileActionTypes.SuccessUpdateProfileSettings,
            ProfileActionTypes.FailedUpdateProfileSettings,
        ),
        map(() => ({
            type: ProfileActionTypes.LoadProfileSettings,
        })),
    );
    @Effect()
    public success = this.actions$.pipe(
        ofType<SuccessUpdateProfileSettings>(
            ProfileActionTypes.SuccessUpdateProfileSettings,
        ),
        map(() => ({
            type: SettingsActionTypes.Success,
        })),
    );
    @Effect()
    public failed = this.actions$.pipe(
        ofType<FailedUpdateProfileSettings>(
            ProfileActionTypes.FailedUpdateProfileSettings,
        ),
        map(() => ({
            type: SettingsActionTypes.Fail,
        })),
    );

    constructor(
        private actions$: Actions,
        private settingsService: SettingsService,
    ) {
    }
}
