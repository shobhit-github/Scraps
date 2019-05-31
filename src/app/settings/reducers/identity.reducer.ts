import {Action} from '@ngrx/store';
import {
    IdentityActions,
    IdentityActionTypes,
} from '../actions/identity.actions';
import {IFileMessageResponse} from '../../message/interfaces/chat.interfaces';
import {EStatusesSource} from '../../admin/interfaces/table.interfaces';

export interface State {
    identityIdList: Array<number>;
    images: Array<IFileMessageResponse>;
    status: EStatusesSource;
    success?: boolean;
    failed?: boolean;
    pending?: boolean;
}

export const initialState: State = {
    identityIdList: [],
    images: [],
    status: 0,
};

export function reducer(state = initialState, action: IdentityActions): State {
    switch (action.type) {
        case IdentityActionTypes.SuccessLoadIdentity:
            return {...state, ...action.payload};

        default:
            return state;
    }
}
