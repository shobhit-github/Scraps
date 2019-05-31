import {BankActionTypes, BankActions} from '../actions/bank.actions';
import {IBank} from '../../auth/interfaces/banks.interfaces';
import {createSelector, createFeatureSelector} from '@ngrx/store';

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

export function reducer(state = initialState, action: BankActions): State {
    switch (action.type) {
        case BankActionTypes.loadedBanks:
            return {...state, bankList: action.payload};
        case BankActionTypes.changeBank:
            return {...state, bank: action.payload, step: state.step + 1};
        case BankActionTypes.resetBank:
            return {...state, bank: undefined, step: state.step - 1};
        case BankActionTypes.connect:
            return {
                ...state,
                isPending: true,
                connectionSuccess: false,
                connectionFailed: false,
            };
        case BankActionTypes.connectSuccess:
            return {
                ...state,
                isPending: false,
                connectionSuccess: true,
                connectionFailed: false,
            };
        case BankActionTypes.connectFailed:
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

export const selectBankState = createFeatureSelector('bank');
export const selectBanksPendingState = createSelector(
    selectBankState,
    (state: State) => state.isPending,
);
export const selectBanksListState = createSelector(
    selectBankState,
    (state: State) => state.bankList,
);
export const selectBanksActiveBankState = createSelector(
    selectBankState,
    (state: State) => state.bank,
);
export const selectBanksConnectSuccessState = createSelector(
    selectBankState,
    (state: State) => state.connectionSuccess,
);
export const selectBanksConnectFailedState = createSelector(
    selectBankState,
    (state: State) => state.connectionFailed,
);
export const selectBanksStepState = createSelector(
    selectBankState,
    (state: State) => state.step,
);
