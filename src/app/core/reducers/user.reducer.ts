import {Action} from '@ngrx/store';
import {UserActionTypes, UserActions} from '../actions/user.actions';
import {SafeUrl} from '@angular/platform-browser';
import {EStatusesSource} from '../../admin/interfaces/table.interfaces';

export interface State {
    user_id: number;
    email: string;
    name: string;
    avatar?: string | SafeUrl;
}

export const initialState: State = {
    user_id: 0,
    email: '',
    name: '',
};

export function reducer(state = initialState, action: UserActions): State {
    switch (action.type) {
        case UserActionTypes.SaveUser:
            return {
                ...state,
                user_id: action.payload.user_id,
                name: action.payload.name,
                email: action.payload.email,
                avatar: action.payload.avatar,
            };
        case UserActionTypes.DeleteUser:
            return initialState;
        case UserActionTypes.UpdateAvatar:
            return {
                ...state,
                avatar: action.payload,
            };
        default:
            return state;
    }
}

// export const getUser = (state: State) => state
