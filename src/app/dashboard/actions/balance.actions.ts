import {Action} from '@ngrx/store';
import {IPortfolioBalance} from '../interfaces/dashboard-service';
import {IPortfolio} from 'src/app/portfolio/interfaces/portfolio';

export enum BalanceActionTypes {
    LoadBalance = '[Balance] Load Balance',
    UpdateBalance = '[Balance] Update Balance',
    LoadBalanceSuccess = '[Balance] Load Balance Success',
    LoadBalanceFail = '[Balance] Load Balance Fail',
    LoadAssetBalance = '[Balance] Load Asset Balance',
    LoadAssetBalanceSuccess = '[Balance] Load Asset Balance Success',
    LoadAssetBalanceFail = '[Balance] Load Asset Balance Fail',
}

export class LoadBalance implements Action {
    readonly type = BalanceActionTypes.LoadBalance;
}

export class UpdateBalance implements Action {
    readonly type = BalanceActionTypes.UpdateBalance;
}

export class LoadBalanceSuccess implements Action {
    readonly type = BalanceActionTypes.LoadBalanceSuccess;

    constructor(public payload: IPortfolioBalance) {
    }
}

export class LoadBalanceFail implements Action {
    readonly type = BalanceActionTypes.LoadBalanceFail;
}

export class LoadAssetBalance implements Action {
    readonly type = BalanceActionTypes.LoadAssetBalance;
}

export class LoadAssetBalanceSuccess implements Action {
    readonly type = BalanceActionTypes.LoadAssetBalanceSuccess;

    constructor(public payload: IPortfolio) {
    }
}

export class LoadAssetBalanceFail implements Action {
    readonly type = BalanceActionTypes.LoadAssetBalanceFail;
}

export type BalanceActions =
    | LoadBalance
    | LoadBalanceSuccess
    | LoadBalanceFail
    | LoadAssetBalance
    | LoadAssetBalanceSuccess
    | LoadAssetBalanceFail
    | UpdateBalance
    ;
