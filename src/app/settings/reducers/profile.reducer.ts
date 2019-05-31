import {Action} from '@ngrx/store';
import {IProfileSettings} from '../interfaces/profile.interfaces';
import {ProfileActionTypes, ProfileActions} from '../actions/profile.actions';
import {SafeUrl} from '@angular/platform-browser';

export interface State extends IProfileSettings {
    nickname: string;
    avatar: string | SafeUrl;
}

export const initialState: State = {
    user_id: 0,
    id: 0,
    nickname: '',
    avatar: '',
};

export function reducer(state = initialState, action: ProfileActions): State {
    switch (action.type) {
        case ProfileActionTypes.SuccessLoadProfileSettings:
            return {...state, ...action.payload};
        case ProfileActionTypes.ChangeAvatarProfileSettings:
            return {...state, avatar: action.payload};
        default:
            return state;
    }
}
