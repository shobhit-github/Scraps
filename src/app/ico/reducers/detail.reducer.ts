import {Action} from '@ngrx/store';
import {DetailActions, DetailActionTypes} from '../actions/detail.actions';
import {IIco} from '../interfaces/ico.interface';

export interface State {
    ico?: IIco;
}

export const initialState: State = {};

export function reducer(state = initialState, action: DetailActions): State {
    switch (action.type) {
        case DetailActionTypes.LoadDetailSuccess:
            return {...state, ico: action.payload};

        default:
            return state;
    }
}
