import {Action} from '@ngrx/store';
import {VerifyNumberActionTypes, VerifyNumberActions} from '../actions/verify.actions';

export interface State {
    step: number;
    isSelectedCountry: boolean;
    isPending: boolean;
    isPhoneSuccess?: boolean;
    isPhoneFailed?: boolean;
    isCodeSuccess?: boolean;
    isCodeFailed?: boolean;
    phone?: string;
    country?: string;
}

export const initialState: State = {
    step: 2,
    isSelectedCountry: true,
    isPending: false,
};

export function reducer(state = initialState, action: VerifyNumberActions): State {
    switch (action.type) {
        case VerifyNumberActionTypes.stepIncrement:
            return {...state, step: state.step + 1};
        case VerifyNumberActionTypes.stepDecrement:
            return {...state, step: state.step - 1};
        case VerifyNumberActionTypes.selectedCountry:
            return {...state, isSelectedCountry: true};
        case VerifyNumberActionTypes.phoneSend:
            return {
                ...state,
                isPending: true,
                isPhoneFailed: false,
                isPhoneSuccess: false,
                phone: action.payload.phone,
                country: action.payload.country,
            };
        case VerifyNumberActionTypes.phoneSuccess:
            return {
                ...state,
                isPending: false,
                isPhoneFailed: false,
                isPhoneSuccess: true,
            };
        case VerifyNumberActionTypes.phoneFailed:
            return {
                ...state,
                isPending: false,
                isPhoneFailed: true,
                isPhoneSuccess: false,
            };
        case VerifyNumberActionTypes.codeSend:
            return {
                ...state,
                isPending: true,
                isCodeFailed: false,
                isCodeSuccess: false,
            };
        case VerifyNumberActionTypes.codeSuccess:
            return {
                ...state,
                isPending: false,
                isCodeFailed: false,
                isCodeSuccess: true,
            };
        case VerifyNumberActionTypes.codeFailed:
            return {
                ...state,
                isPending: false,
                isCodeFailed: true,
                isCodeSuccess: false,
            };
        case VerifyNumberActionTypes.LoadVerifyNumbers:
            return state;
        default:
            return state;
    }
}
