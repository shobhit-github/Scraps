import {Action} from '@ngrx/store';
import {
    IPaginationResponse,
    IPaginationRequest,
} from '../../core/interfaces/pagination.interface';
import {IPortfolioAdmin} from '../interfaces/portfolio.interface';
import {ICoin} from '../interfaces/coin.interface';

export enum PortfolioActionTypes {
    LoadPortfolios = '[Portfolio] Load Portfolios',
    LoadPortfoliosSuccess = '[Portfolio] Load Portfolios Success',
    LoadPortfoliosFail = '[Portfolio] Load PortfoliosFail',
    AddLocalPortfolio = '[Portfolio] Add Local Portfolio',
    DeletePortfolioLocal = '[Portfolio] Delete Portfolio Local',
    AddOrUpdatePortfolio = '[Portfolio] Add Or Update Portfolio',
    AddOrUpdatePortfolioSuccess = '[Portfolio] Add Or Update Portfolio Success',
    AddOrUpdatePortfolioFail = '[Portfolio] Add Or Update Portfolio Fail',
    DeletePortfolio = '[Portfolio] Delete Portfolio',
    DeletePortfolioSuccess = '[Portfolio] Delete Portfolio Success',
    DeletePortfolioFail = '[Portfolio] Delete Portfolio Fail',
    LoadAllCoins = '[Portfolio] Load Coin List',
    LoadAllCoinsSuccess = '[Portfolio] Load Coin List Success',
    LoadAllCoinsFail = '[Portfolio] Load Coin List Fail',
    DeleteOpt = '[Portfolio] Delete Option',
    AddOpt = '[Portfolio] Add Option',
}

export class LoadPortfolios implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolios;

    constructor(public payload: IPaginationRequest) {
    }
}

export class LoadPortfoliosSuccess implements Action {
    readonly type = PortfolioActionTypes.LoadPortfoliosSuccess;

    constructor(public payload: IPaginationResponse<Array<IPortfolioAdmin>>) {
    }
}

export class LoadPortfoliosFail implements Action {
    readonly type = PortfolioActionTypes.LoadPortfoliosFail;
}

export class AddLocalPortfolio implements Action {
    readonly type = PortfolioActionTypes.AddLocalPortfolio;

    constructor(public payload: number | string) {
    }
}

export class DeletePortfolioLocal implements Action {
    readonly type = PortfolioActionTypes.DeletePortfolioLocal;

    constructor(public payload: IPortfolioAdmin) {
    }
}

export class AddOrUpdatePortfolio implements Action {
    readonly type = PortfolioActionTypes.AddOrUpdatePortfolio;

    constructor(public payload: IPortfolioAdmin) {
    }
}

export class AddOrUpdatePortfolioSuccess implements Action {
    readonly type = PortfolioActionTypes.AddOrUpdatePortfolioSuccess;
}

export class AddOrUpdatePortfolioFail implements Action {
    readonly type = PortfolioActionTypes.AddOrUpdatePortfolioFail;
}

export class DeletePortfolio implements Action {
    readonly type = PortfolioActionTypes.DeletePortfolio;

    constructor(public payload: IPortfolioAdmin) {
    }
}

export class DeletePortfolioSuccess implements Action {
    readonly type = PortfolioActionTypes.DeletePortfolioSuccess;

    constructor(public payload: IPortfolioAdmin) {
    }
}

export class DeletePortfolioFail implements Action {
    readonly type = PortfolioActionTypes.DeletePortfolioFail;
}

export class LoadAllCoins implements Action {
    readonly type = PortfolioActionTypes.LoadAllCoins;
}

export class LoadAllCoinsSuccess implements Action {
    readonly type = PortfolioActionTypes.LoadAllCoinsSuccess;

    constructor(public payload: Array<ICoin>) {
    }
}

export class LoadAllCoinsFail implements Action {
    readonly type = PortfolioActionTypes.LoadAllCoinsFail;
}

export class DeleteOpt implements Action {
    readonly type = PortfolioActionTypes.DeleteOpt;

    constructor(public payload: { portfolio: IPortfolioAdmin; optId: string }) {
    }
}

export class AddOpt implements Action {
    readonly type = PortfolioActionTypes.AddOpt;

    constructor(public payload: { portfolioId: string; optId: string }) {
    }
}

export type PortfolioActions =
    | LoadPortfolios
    | LoadPortfoliosSuccess
    | LoadPortfoliosFail
    | AddLocalPortfolio
    | DeletePortfolioLocal
    | AddOrUpdatePortfolio
    | AddOrUpdatePortfolioSuccess
    | AddOrUpdatePortfolioFail
    | DeletePortfolio
    | DeletePortfolioSuccess
    | DeletePortfolioFail
    | LoadAllCoins
    | LoadAllCoinsSuccess
    | LoadAllCoinsFail
    | DeleteOpt
    | AddOpt;
