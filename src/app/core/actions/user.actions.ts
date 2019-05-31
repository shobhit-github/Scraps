import {Action} from '@ngrx/store';
import {ILoginResponse} from '../../auth/interfaces/login.interface';
import {SafeUrl} from '@angular/platform-browser';

export enum UserActionTypes {
    SaveUser = '[User] Save User',
    UpdateAvatar = '[User] Update User Avatar',
    DeleteUser = '[User] Delete User',
}

export class SaveUser implements Action {
    readonly type = UserActionTypes.SaveUser;

    constructor(public payload: ILoginResponse) {
    }
}

export class UpdateAvatar implements Action {
    readonly type = UserActionTypes.UpdateAvatar;

    constructor(public payload: string | SafeUrl) {
    }
}

export class DeleteUser implements Action {
    readonly type = UserActionTypes.DeleteUser;
}

export type UserActions = SaveUser | DeleteUser | UpdateAvatar;
