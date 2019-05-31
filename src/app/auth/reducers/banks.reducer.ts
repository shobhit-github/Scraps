import {IBank} from '../interfaces/banks.interfaces';
import {BanksActionTypes, BanksActions} from '../actions/banks.actions';

export interface State {
    step: number;
    isPending: boolean;
    bank?: IBank;
    bankList: Array<IBank>;
    connectionSuccess?: boolean;
    connectionFailed?: boolean;
}

export const initialState: State = {
    step: 1,
    isPending: false,
    bankList: []
};

export function reducer(state = initialState, action: BanksActions): State {
    switch (action.type) {
        case BanksActionTypes.loadedBanks:
            return {...state, bankList: action.payload};
        case BanksActionTypes.changeBank:
            return {...state, bank: action.payload, step: state.step + 1};
        case BanksActionTypes.resetBank:
            return {...state, bank: undefined, step: state.step - 1};
        case BanksActionTypes.connect:
            return {
                ...state,
                isPending: true,
                connectionSuccess: false,
                connectionFailed: false,
            };
        case BanksActionTypes.connectSuccess:
            return {
                ...state,
                isPending: false,
                connectionSuccess: true,
                connectionFailed: false,
            };
        case BanksActionTypes.connectFailed:
            return {
                ...state,
                isPending: false,
                connectionSuccess: false,
                connectionFailed: true,
            };
        default:
            return state;
    }
}
