import {Action} from '@ngrx/store';

import {
    ISripeInfo,
    IInvestRequest,
    IStripeCard,
} from '../interfaces/stripe-card.interface';
import {ITotal} from '../interfaces/total.interface';
import {ICurrencyData} from '../interfaces/currency.interface';

export enum InvestActionTypes {
    LoadPayments = '[Invest] Load Payments',
    LoadPaymentsSuccess = '[Invest] Load Payments Success',
    LoadPaymentsFail = '[Invest] Load Payments Fail',
    LoadFee = '[Invest] Load Fee',
    LoadFeeSuccess = '[Invest] Load Fee Success',
    LoadFeeFail = '[Invest] Load Fee Fail',
    Invest = '[Invest] Invest',
    InvestSuccess = '[Invest] Invest Success',
    InvestFail = '[Invest] Invest Fail',
    SetAmount = '[Invest] Set Amount',
    SetAmountSuccess = '[Invest] Set Amount Success',
    SetAmountFail = '[Invest] Set Amount Fail',
    SetPeriod = '[Invest] Set Period',
    SetRecurring = '[Invest] Set Recurring',
    LoadTotal = '[Invest] Load Total',
    LoadTotalSuccess = '[Invest] Load Total Success',
    LoadTotalFail = '[Invest] Load Total Fail',
    LoadCurrency = '[Invest] Load Currency',
    LoadCurrencySuccess = '[Invest] Load Currency Success',
    LoadCurrencyFail = '[Invest] Load Currency Fail',
    SetPayment = '[Invest] Set Payment',
}

export class LoadPayments implements Action {
    readonly type = InvestActionTypes.LoadPayments;
}

export class LoadPaymentsSuccess implements Action {
    readonly type = InvestActionTypes.LoadPaymentsSuccess;

    constructor(public payload: ISripeInfo) {
    }
}

export class LoadPaymentsFail implements Action {
    readonly type = InvestActionTypes.LoadPaymentsFail;
}

export class LoadFee implements Action {
    readonly type = InvestActionTypes.LoadFee;
}

export class LoadFeeSuccess implements Action {
    readonly type = InvestActionTypes.LoadFeeSuccess;

    constructor(public payload: number) {
    }
}

export class LoadFeeFail implements Action {
    readonly type = InvestActionTypes.LoadFeeFail;
}

export class Invest implements Action {
    readonly type = InvestActionTypes.Invest;

    constructor(public payload: IInvestRequest) {
    }
}

export class InvestSuccess implements Action {
    readonly type = InvestActionTypes.InvestSuccess;
}

export class InvestFail implements Action {
    readonly type = InvestActionTypes.InvestFail;
}

export class SetAmount implements Action {
    readonly type = InvestActionTypes.SetAmount;
}

export class SetPeriod implements Action {
    readonly type = InvestActionTypes.SetPeriod;
}

export class SetRecurring implements Action {
    readonly type = InvestActionTypes.SetRecurring;
}

export class LoadTotal implements Action {
    readonly type = InvestActionTypes.LoadTotal;
}

export class LoadTotalSuccess implements Action {
    readonly type = InvestActionTypes.LoadTotalSuccess;

    constructor(public payload: ITotal) {
    }
}

export class LoadTotalFail implements Action {
    readonly type = InvestActionTypes.LoadTotalFail;
}

export class LoadCurrency implements Action {
    readonly type = InvestActionTypes.LoadCurrency;
}

export class LoadCurrencySuccess implements Action {
    readonly type = InvestActionTypes.LoadCurrencySuccess;

    constructor(public payload: ICurrencyData) {
    }
}

export class LoadCurrencyFail implements Action {
    readonly type = InvestActionTypes.LoadCurrencyFail;
}

export class SetPayment implements Action {
    readonly type = InvestActionTypes.SetPayment;

    constructor(public payload: IStripeCard) {
    }
}

export type InvestActions =
    | LoadPayments
    | LoadPaymentsSuccess
    | LoadPaymentsFail
    | LoadFee
    | LoadFeeSuccess
    | LoadFeeFail
    | Invest
    | InvestSuccess
    | InvestFail
    | SetAmount
    | SetPeriod
    | SetRecurring
    | LoadTotal
    | LoadTotalSuccess
    | LoadTotalFail
    | LoadCurrency
    | LoadCurrencySuccess
    | LoadCurrencyFail
    | SetPayment;
