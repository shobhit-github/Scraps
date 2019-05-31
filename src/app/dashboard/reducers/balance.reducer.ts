import {BalanceActions, BalanceActionTypes} from '../actions/balance.actions';
import {IPortfolioBalance} from '../interfaces/dashboard-service';
import {IPortfolio} from 'src/app/portfolio/interfaces/portfolio';

export interface State {
    portfolioBalance?: IPortfolioBalance;
    assetBalance?: IPortfolio;
}

export const initialState: State = {
    portfolioBalance: {
        total: 0,
        symbol: '$',
        changeTo: {
            percent: 0,
            currency: 0,
        },
    },
};

export function reducer(state = initialState, action: BalanceActions): State {
    switch (action.type) {
        case BalanceActionTypes.LoadBalanceSuccess:
            return {...state, portfolioBalance: action.payload};
        case BalanceActionTypes.LoadAssetBalanceSuccess:
            return {...state, assetBalance: action.payload};
        default:
            return state;
    }
}
