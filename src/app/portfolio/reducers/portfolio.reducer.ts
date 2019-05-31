import {createFeatureSelector, createSelector} from '@ngrx/store';

import {
    PortfolioActions,
    PortfolioActionTypes,
} from '../actions/portfolio.actions';
import {IPortfolio} from '../interfaces/portfolio';

export interface State {
    portfolio?: IPortfolio;
    portfolioList: Array<IPortfolio>;
}

export const initialState: State = {
    portfolioList: [],
};

export function reducer(state = initialState, action: PortfolioActions): State {
    switch (action.type) {
        case PortfolioActionTypes.LoadPortfolioSuccess:
            return {...state, portfolio: action.payload};
        case PortfolioActionTypes.SetPortfolio:
            return {...state, portfolio: action.payload};
        case PortfolioActionTypes.LoadPortfolioListSuccess:
            return {
                ...state,
                portfolioList: action.payload,
                portfolio: state.portfolio
                    ? state.portfolio
                    : action.payload
                        ? action.payload[0]
                        : null,
            };
        default:
            return state;
    }
}

export const getPortfolioState = createFeatureSelector('portfolio');
export const getPortfolio = createSelector(
    getPortfolioState,
    (state: State) => state.portfolio,
);
export const getPortfolioList = createSelector(
    getPortfolioState,
    (state: State) => state.portfolioList,
);
