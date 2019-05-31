import {Action} from '@ngrx/store';
import {CoinActions, CoinActionTypes} from '../actions/coin.actions';
import {ICoin} from '../interfaces/coin.interface';
import {IMeta} from '../interfaces/user-for-admin.interface';

export interface State {
    coinList: Array<ICoin>;
    meta?: IMeta;
}

export const initialState: State = {
    coinList: [],
};

export function reducer(state = initialState, action: CoinActions): State {
    switch (action.type) {
        case CoinActionTypes.LoadCoinsSuccess:
            return {
                ...state,
                coinList:
                    action.payload.meta.current_page !== 1
                        ? [...state.coinList, ...action.payload.data]
                        : action.payload.data,
                meta: action.payload.meta,
            };
        case CoinActionTypes.LoadCoinsFail:
            return {...state};
        case CoinActionTypes.DeleteCoinLocal:
            return {
                ...state,
                coinList: state.coinList.filter(
                    e => !(e.id && e.id === action.payload.id),
                ),
            };
        case CoinActionTypes.DeleteCoinSuccess:
            return {
                ...state,
                coinList: state.coinList.filter(
                    e => !(e.id && e.id === action.payload.id),
                ),
            };
        case CoinActionTypes.AddLocalCoin:
            return {
                ...state,
                coinList: [
                    ...state.coinList,
                    <ICoin>{
                        isNew: true,
                        name: '',
                        icon: '',
                        color: '#fff',
                        id: action.payload,
                    },
                ],
            };
        default:
            return state;
    }
}
