import {Action, createFeatureSelector, createSelector} from '@ngrx/store';
import {YodleeActions, YodleeActionTypes} from '../actions/yodlee.actions';

export interface IYodleeCreds {
    NODE_URL?: string;
    RSESSION?: string;
    FINAPP_ID?: string;
    TOKEN?: string;
    EXTRA_PARAMS?: string;
}

export interface State extends IYodleeCreds {
    form?: string;
}

export const initialState: State = {};

export function reducer(state = initialState, action: YodleeActions): State {
    switch (action.type) {
        case YodleeActionTypes.LoadYodleeSuccess:
            return {...state, ...action.payload};
        case YodleeActionTypes.LoadFormSuccess:
            return {...state, form: action.payload};

        default:
            return state;
    }
}

export const getYodlee = createFeatureSelector('yodlee');

export const getCreds = createSelector(
    getYodlee,
    ({NODE_URL, RSESSION, FINAPP_ID, TOKEN, EXTRA_PARAMS}) => ({
        NODE_URL,
        RSESSION,
        FINAPP_ID,
        TOKEN,
        EXTRA_PARAMS,
        redirectReq: true,
    }),
);

export const getForm = createSelector(getYodlee, (state: State) => state.form);
