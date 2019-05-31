// FIXME: duplicate code from auth banks -> bank
import {Action} from '@ngrx/store';
import {IBank, IConnect} from '../../auth/interfaces/banks.interfaces';

export enum BankActionTypes {
    loadBanks = '[Bank] Load Banks',
    loadedBanks = '[Bank] Loaded Banks',
    changeBank = '[Bank] Select new bank',
    resetBank = '[Bank] Reset bank',
    connect = '[Bank] Connect to bank',
    connectSuccess = '[Bank] Connect to bank success',
    connectFailed = '[Bank] Connect to bank filed',
}

export class LoadedBanks implements Action {
    readonly type = BankActionTypes.loadedBanks;

    constructor(public payload: Array<IBank>) {
    }
}

export class LoadBanks implements Action {
    readonly type = BankActionTypes.loadBanks;

    constructor(public payload: string) {
    }
}

export class ChangeBank implements Action {
    readonly type = BankActionTypes.changeBank;

    constructor(public payload: IBank) {
    }
}

export class ResetBank implements Action {
    readonly type = BankActionTypes.resetBank;
}

export class Connect implements Action {
    readonly type = BankActionTypes.connect;

    constructor(public payload: IConnect) {
    }
}

export class ConnectSuccess implements Action {
    readonly type = BankActionTypes.connectSuccess;
}

export class ConnectFailed implements Action {
    readonly type = BankActionTypes.connectFailed;
}

export type BankActions =
    | LoadBanks
    | ChangeBank
    | ResetBank
    | Connect
    | ConnectSuccess
    | LoadedBanks
    | ConnectFailed;
