import {Action} from '@ngrx/store';

import {IPortfolio} from '../interfaces/portfolio';
import {IPortfolioRequest} from '../interfaces/request.interface';

export enum PortfolioActionTypes {
    LoadPortfolio = '[Portfolio] Load Portfolio',
    LoadPortfolioSuccess = '[Portfolio] Load Portfolio Success',
    LoadPortfolioFail = '[Portfolio] Load Portfolio Fail',
    LoadPortfolioList = '[Portfolio] Load Portfolio List',
    LoadPortfolioListSuccess = '[Portfolio] Load Portfolio List Success',
    LoadPortfolioListFail = '[Portfolio] Load Portfolio List Fail',
    SetPortfolio = '[Portfolio] Set Portfolio',
    InvestPortfolio = '[Portfolio] Invest Portfolio',
    InvestPortfolioSuccess = '[Portfolio] Invest Portfolio Success',
    InvestPortfolioFail = '[Portfolio] Invest Portfolio Fail',
}

export class LoadPortfolio implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolio;
}

export class LoadPortfolioSuccess implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolioSuccess;

    constructor(public payload: IPortfolio) {
    }
}

export class LoadPortfolioFail implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolioFail;
}

export class LoadPortfolioList implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolioList;
}

export class LoadPortfolioListSuccess implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolioListSuccess;

    constructor(public payload: Array<IPortfolio>) {
    }
}

export class LoadPortfolioListFail implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolioListFail;
}

export class InvestPortfolio implements Action {
    readonly type = PortfolioActionTypes.InvestPortfolio;

    constructor(public payload: IPortfolioRequest) {
    }
}

export class InvestPortfolioSuccess implements Action {
    readonly type = PortfolioActionTypes.InvestPortfolioSuccess;

    constructor(public payload: number) {
    }
}

export class InvestPortfolioFail implements Action {
    readonly type = PortfolioActionTypes.InvestPortfolioFail;
}

export class SetPortfolio implements Action {
    readonly type = PortfolioActionTypes.SetPortfolio;

    constructor(public payload: IPortfolio) {
    }
}

export type PortfolioActions =
    | LoadPortfolio
    | LoadPortfolioSuccess
    | LoadPortfolioFail
    | LoadPortfolioList
    | LoadPortfolioListSuccess
    | LoadPortfolioListFail
    | SetPortfolio
    | InvestPortfolio
    | InvestPortfolioSuccess
    | InvestPortfolioFail;
