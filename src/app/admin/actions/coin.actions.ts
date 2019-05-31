import {Action} from '@ngrx/store';
import {ICoin} from '../interfaces/coin.interface';
import {IMeta} from '../interfaces/user-for-admin.interface';
import {
    IPaginationRequest,
    IPaginationResponse,
} from '../../core/interfaces/pagination.interface';

export enum CoinActionTypes {
    LoadCoins = '[Coin] Load Coins',
    LoadCoinsSuccess = '[Coin] Load Coins Success',
    LoadCoinsFail = '[Coin] Load CoinsFail',
    AddOrUpdateCoin = '[Coin] Add Or Update Coins',
    AddOrUpdateCoinSuccess = '[Coin] Add Or Update Coins Success',
    AddOrUpdateCoinFail = '[Coin] Add Or Update Coins Fail',
    DeleteCoin = '[Coin] Delete Coins',
    DeleteCoinSuccess = '[Coin] Delete Coins Success',
    DeleteCoinFail = '[Coin] Delete Coins Fail',
    AddLocalCoin = '[Coin] Add Local Coin',
    DeleteCoinLocal = '[Coin] Delete Coin Local',
}

export class LoadCoins implements Action {
    readonly type = CoinActionTypes.LoadCoins;

    constructor(public payload: IPaginationRequest) {
    }
}

export class LoadCoinsSuccess implements Action {
    readonly type = CoinActionTypes.LoadCoinsSuccess;

    constructor(public payload: IPaginationResponse<Array<ICoin>>) {
    }
}

export class LoadCoinsFail implements Action {
    readonly type = CoinActionTypes.LoadCoinsFail;
}

export class AddLocalCoin implements Action {
    readonly type = CoinActionTypes.AddLocalCoin;

    constructor(public payload: number | string) {
    }
}

export class DeleteCoinLocal implements Action {
    readonly type = CoinActionTypes.DeleteCoinLocal;

    constructor(public payload: ICoin) {
    }
}

export class AddOrUpdateCoin implements Action {
    readonly type = CoinActionTypes.AddOrUpdateCoin;

    constructor(public payload: FormData) {
    }
}

export class AddOrUpdateCoinSuccess implements Action {
    readonly type = CoinActionTypes.AddOrUpdateCoinSuccess;
}

export class AddOrUpdateCoinFail implements Action {
    readonly type = CoinActionTypes.AddOrUpdateCoinFail;
}

export class DeleteCoin implements Action {
    readonly type = CoinActionTypes.DeleteCoin;

    constructor(public payload: ICoin) {
    }
}

export class DeleteCoinSuccess implements Action {
    readonly type = CoinActionTypes.DeleteCoinSuccess;

    constructor(public payload: ICoin) {
    }
}

export class DeleteCoinFail implements Action {
    readonly type = CoinActionTypes.DeleteCoinFail;
}

export type CoinActions =
    | LoadCoins
    | LoadCoinsSuccess
    | LoadCoinsFail
    | AddLocalCoin
    | DeleteCoinLocal
    | AddOrUpdateCoin
    | AddOrUpdateCoinSuccess
    | AddOrUpdateCoinFail
    | DeleteCoin
    | DeleteCoinSuccess
    | DeleteCoinFail;
