import {Action} from '@ngrx/store';
import {ListActions, ListActionTypes} from '../actions/list.actions';
import {IIco} from '../interfaces/ico.interface';

export interface State {
    icos: Array<IIco>;
    filter: 'top' | 'active' | 'air';
    page: number;
    count: number;
}

export const initialState: State = {
    icos: [],
    filter: 'top',
    page: 1,
    count: 1,
};

export function reducer(state = initialState, action: ListActions): State {
    switch (action.type) {
        case ListActionTypes.LoadListSuccess:
            return {
                ...state,
                icos: action.payload.data,
                page: action.payload.meta.current_page,
                count: action.payload.meta.last_page,
            };

        default:
            return state;
    }
}
