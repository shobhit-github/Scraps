import {WalletActions, WalletActionTypes} from '../actions/wallet.actions';

export interface State {
    public_key: string;
    private_key: string;
}

export const initialState: State = {
    public_key: '',
    private_key: '',
};

export function reducer(state = initialState, action: WalletActions): State {
    switch (action.type) {
        case WalletActionTypes.SuccessLoadWalletKeys:
            return {...state, ...action.payload};
        case WalletActionTypes.UpdateWalletKeys:
            return {...state, ...action.payload};
        default:
            return state;
    }
}
