import {Action} from '@ngrx/store';
import {SettingsActionTypes} from '../actions/settings.actions';

export interface State {
    success: boolean;
    failed: boolean;
}

export const initialState: State = {
    success: false,
    failed: false,
};

export function reducer(state = initialState, action: Action): State {
    switch (action.type) {
        case SettingsActionTypes.Success:
            return {...state, success: true, failed: false};
        case SettingsActionTypes.Fail:
            return {...state, success: false, failed: true};
        default:
            // console.log('%c reset statuses', 'color:red');
            return initialState;
    }
}
