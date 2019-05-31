import {Action} from '@ngrx/store';
import {EIdentity} from '../interfaces/identity.enum';
import {
    IdentityActionTypes,
    IdentityActions,
} from '../actions/identity.actions';

export interface State {
    type?: EIdentity;
    uploadSuccess?: boolean;
    uploadFailed?: boolean;
    isPending: boolean;
}

export const initialState: State = {
    isPending: false,
};

export function reducer(state = initialState, action: IdentityActions): State {
    switch (action.type) {
        case IdentityActionTypes.changeType:
            return {...state, type: action.payload};
        case IdentityActionTypes.resetType:
            return {
                ...state,
                type: undefined,
                isPending: false,
                uploadFailed: false,
                uploadSuccess: false,
            };
        case IdentityActionTypes.upload:
            return {...state, isPending: true};
        case IdentityActionTypes.uploadSuccess:
            return {
                ...state,
                isPending: false,
                uploadFailed: false,
                uploadSuccess: true,
            };
        case IdentityActionTypes.uploadFailed:
            return {
                ...state,
                isPending: false,
                uploadFailed: true,
                uploadSuccess: false,
            };
        default:
            return state;
    }
}
