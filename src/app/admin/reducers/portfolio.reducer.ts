import {
    PortfolioActions,
    PortfolioActionTypes,
} from '../actions/portfolio.actions';
import {IMeta} from '../interfaces/user-for-admin.interface';
import {IPortfolioAdmin} from '../interfaces/portfolio.interface';
import {ICoin} from '../interfaces/coin.interface';

export interface State {
    portfolioList: Array<IPortfolioAdmin>;
    coinList: Array<ICoin>;
    meta?: IMeta;
}

export const initialState: State = {
    portfolioList: [],
    coinList: [],
};

export function reducer(state = initialState, action: PortfolioActions): State {
    switch (action.type) {
        case PortfolioActionTypes.LoadPortfoliosSuccess:
            return {
                ...state,
                portfolioList:
                    action.payload.meta.current_page !== 1
                        ? [...state.portfolioList, ...action.payload.data]
                        : action.payload.data,
                meta: action.payload.meta,
            };
        case PortfolioActionTypes.LoadAllCoinsSuccess:
            return {
                ...state,
                coinList: action.payload,
            };
        case PortfolioActionTypes.LoadPortfoliosFail:
            return {...state};
        case PortfolioActionTypes.DeletePortfolioLocal:
            return {
                ...state,
                portfolioList: state.portfolioList.filter(
                    e => !(e.id && e.id === action.payload.id),
                ),
            };
        case PortfolioActionTypes.DeletePortfolioSuccess:
            return {
                ...state,
                portfolioList: state.portfolioList.filter(
                    e => !(e.id && e.id === action.payload.id),
                ),
            };
        case PortfolioActionTypes.AddLocalPortfolio:
            return {
                ...state,
                portfolioList: [
                    ...state.portfolioList,
                    <IPortfolioAdmin>{
                        isNew: true,
                        id: action.payload,
                        package_name: '',
                        risk_name: '',
                        risk_value: 0,
                        suggest: 0,
                        owner: {},
                        options: [],
                    },
                ],
            };
        case PortfolioActionTypes.DeleteOpt:
            return {
                ...state,
                portfolioList: [
                    ...state.portfolioList.map(portfolio => {
                        if (action.payload.portfolio.id === portfolio.id) {
                            const newPortfolio = {...portfolio};
                            newPortfolio.options = newPortfolio.options.filter(opt => {
                                return String(opt.option_id) !== String(action.payload.optId);
                            });
                            return newPortfolio;
                        }
                        return portfolio;
                    }),
                ],
            };
        case PortfolioActionTypes.AddOpt:
            return {
                ...state,
                portfolioList: [
                    ...state.portfolioList.map(portfolio => {
                        if (action.payload.portfolioId === portfolio.id) {
                            const newPortfolio = {...portfolio};
                            newPortfolio.options = [
                                ...newPortfolio.options,
                                {
                                    coin_id: state.coinList[0].id,
                                    option_id: action.payload.optId,
                                    value: '0',
                                    isNew: true,
                                },
                            ];
                            return newPortfolio;
                        }
                        return portfolio;
                    }),
                ],
            };
        // case PortfolioActionTypes.AddOpt:
        //   return {
        //     ...state,
        //     portfolioList: [
        //       ...state.portfolioList.map(portfolio => {
        //         if (action.payload.portfolio.id === portfolio.id) {
        //           const newPortfolio = { ...portfolio };
        //           newPortfolio.options = newPortfolio.options.filter(
        //             opt => opt.option_id !== action.payload.optId,
        //           );
        //           return newPortfolio;
        //         }
        //         return portfolio;
        //       }),
        //     ],
        //   };
        default:
            return state;
    }
}
