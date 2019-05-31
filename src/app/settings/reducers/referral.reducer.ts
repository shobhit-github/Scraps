import {ReferralActions, ReferralActionTypes} from '../actions/referral.actions';

export interface State {
    link: string;
}

export const initialState: State = {
    link: '',
};

export function reducer(state = initialState, action: ReferralActions): State {
    switch (action.type) {
        case ReferralActionTypes.SuccessLoadReferral:
            return {...state, ...action.payload};

        default:
            return state;
    }
}
