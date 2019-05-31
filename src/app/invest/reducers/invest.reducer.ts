import {createFeatureSelector, createSelector} from '@ngrx/store';

import {InvestActions, InvestActionTypes} from '../actions/invest.actions';
import {ICurrencyData} from '../interfaces/currency.interface';
import {IStripeCard} from '../interfaces/stripe-card.interface';
import {ITotal} from '../interfaces/total.interface';

export interface State {
    paymentList: Array<IStripeCard>;
    payment?: IStripeCard;
    fee: number;
    total: ITotal;
    currency: ICurrencyData;
}

export const initialState: State = {
    paymentList: [],
    fee: 0.05,
    currency: {
        symbol: '$',
        name: 'USD',
    },
    total: {
        amount: 0,
        fee: 0,
        value: 0,
    },
};

export function reducer(state = initialState, action: InvestActions): State {
    switch (action.type) {
        case InvestActionTypes.LoadPaymentsSuccess:
            return {
                ...state,
                paymentList: action.payload.stripe_card_list,
                payment: action.payload.active_card,
            };
        case InvestActionTypes.LoadFeeSuccess:
            return {
                ...state,
                fee: action.payload,
            };
        case InvestActionTypes.LoadTotalSuccess:
            return {...state, total: action.payload};
        case InvestActionTypes.LoadCurrencySuccess:
            return {...state, currency: action.payload};
        case InvestActionTypes.SetPayment:
            return {...state, payment: action.payload};
        default:
            return state;
    }
}

export const getInvest = createFeatureSelector('invest');

export const getPaymentList = createSelector(
    getInvest,
    (state: State) => state.paymentList,
);
export const getPayment = createSelector(
    getInvest,
    (state: State) => state.payment,
);
export const getFee = createSelector(
    getInvest,
    (state: State) => state.fee,
);
export const getCurrency = createSelector(
    getInvest,
    (state: State) => state.currency,
);
export const getTotal = createSelector(
    getInvest,
    (state: State) => state.total,
);
