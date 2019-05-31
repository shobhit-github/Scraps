import {AccountActions, AccountActionTypes} from '../actions/account.actions';
import {
    IAccountPersonal,
    IAccountAddress,
    IAccountPreference,
    IAccountSettings,
} from '../interfaces/account.insterfaces';

export interface State extends IAccountSettings {
    personal: IAccountPersonal;
    address: IAccountAddress;
    preference: IAccountPreference;
}

export const initialState: State = {
    personal: {
        name: '',
        email: '',
        birthday: '',
        employment_id: '',
        income_id: '',
    },
    address: {
        id: 0,
        user_id: 0,
        street: '',
        city: '',
        country: '',
        code: '',
    },
    preference: {
        id: 0,
        user_id: 0,
        timezone: '',
        currency: '',
    },
};

export function reducer(state = initialState, action: AccountActions): State {
    switch (action.type) {
        case AccountActionTypes.LoadAccountSettings:
            return state;
        case AccountActionTypes.SuccessAccountSettings:
            return {...state, ...action.payload};
        default:
            return state;
    }
}
