import {Action} from '@ngrx/store';
import {
    SecurityActions,
    SecurityActionTypes,
} from '../actions/security.actions';
import {
    ISecuritySettings,
    IBankSettings,
    IPlaidSettings,
} from '../interfaces/security.interfaces';

export interface State extends ISecuritySettings {
    status: number;
    phone: string;
    two_factor_auth: 0 | 1;
    step: number;
    pending: boolean;
    error: boolean;
    banks: Array<{ type: string }>;
    plaid_ids: Array<{ id: number }>;
    banksContent?: Array<Array<IBankSettings>>;
    plaidContent?: Array<IPlaidSettings>;
}

export const initialState: State = {
    status: 1,
    phone: '',
    two_factor_auth: 0,
    step: 0,
    pending: false,
    error: false,
    banks: [],
    plaid_ids: [],
    plaidContent: [],
};

export function reducer(state = initialState, action: SecurityActions): State {
    switch (action.type) {
        case SecurityActionTypes.SuccessLoad:
            return {...state, ...action.payload};
        case SecurityActionTypes.SuccessUpdateTFA:
            return {...state, two_factor_auth: action.payload};
        case SecurityActionTypes.InitUpdatePhone:
            return {
                ...state,
                step: 1,
                pending: false,
            };
        case SecurityActionTypes.UpdatePhone:
            return {
                ...state,
                pending: true,
                error: false,
            };
        case SecurityActionTypes.SuccessUpdatePhone:
            return {
                ...state,
                step: 2,
                pending: false,
                error: false,
            };
        case SecurityActionTypes.SuccessLoadBanks:
            return {
                ...state,
                banksContent: action.payload,
            };
        case SecurityActionTypes.SuccessLoadPlaid:
            return {
                ...state,
                plaidContent: action.payload.filter(item => !!item),
            };
        case SecurityActionTypes.FailedUpdatePhone:
            return {
                ...state,
                pending: false,
                error: true,
            };
        case SecurityActionTypes.UpdatePhoneWithCode:
            return {
                ...state,
                pending: true,
                error: false,
            };
        case SecurityActionTypes.SuccessUpdatePhoneWithCode:
            return {
                ...state,
                step: 0,
                pending: false,
                error: false,
            };
        case SecurityActionTypes.FailedUpdatePhoneWithCode:
            return {
                ...state,
                pending: false,
                error: true,
            };
        case SecurityActionTypes.ResetUpdatePhone:
            return {
                ...state,
                step: 0,
                pending: false,
                error: false,
            };

        default:
            return state;
    }
}
