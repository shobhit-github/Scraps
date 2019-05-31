import {Action} from '@ngrx/store';
import {IProfileSettings} from '../interfaces/profile.interfaces';
import {SafeUrl} from '@angular/platform-browser';

export enum ProfileActionTypes {
    LoadProfileSettings = '[Profile] Load',
    SuccessLoadProfileSettings = '[Profile] Success Load',
    FailedLoadProfileSettings = '[Profile] Failed Load',
    UpdateProfileSettings = '[Profile] Update',
    ChangeAvatarProfileSettings = '[Profile] Change displayed avatar',
    SuccessUpdateProfileSettings = '[Profile] Success Update',
    FailedUpdateProfileSettings = '[Profile] Failed Update',
}

export class LoadProfileSettings implements Action {
    readonly type = ProfileActionTypes.LoadProfileSettings;
}

export class SuccessLoadProfileSettings implements Action {
    readonly type = ProfileActionTypes.SuccessLoadProfileSettings;

    constructor(public payload: IProfileSettings) {
    }
}

export class FailedLoadProfileSettings implements Action {
    readonly type = ProfileActionTypes.FailedLoadProfileSettings;
}

export class ChangeAvatarProfileSettings implements Action {
    readonly type = ProfileActionTypes.ChangeAvatarProfileSettings;

    constructor(public payload: string | SafeUrl) {
    }
}

export class UpdateProfileSettings implements Action {
    readonly type = ProfileActionTypes.UpdateProfileSettings;

    constructor(public payload: FormData) {
    }
}

export class SuccessUpdateProfileSettings implements Action {
    readonly type = ProfileActionTypes.SuccessUpdateProfileSettings;
}

export class FailedUpdateProfileSettings implements Action {
    readonly type = ProfileActionTypes.FailedUpdateProfileSettings;
}

export type ProfileActions =
    | ChangeAvatarProfileSettings
    | SuccessLoadProfileSettings
    | FailedLoadProfileSettings
    | LoadProfileSettings
    | UpdateProfileSettings
    | SuccessUpdateProfileSettings
    | FailedUpdateProfileSettings;
