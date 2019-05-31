import {Action} from '@ngrx/store';
import {IBank, IConnect} from '../interfaces/banks.interfaces';

export enum BanksActionTypes {
    loadBanks = '[Banks] Load Banks',
    loadedBanks = '[Banks] Loaded Banks',
    changeBank = '[Banks] Select new bank',
    resetBank = '[Banks] Reset bank',
    connect = '[Banks] Connect to bank',
    connectSuccess = '[Banks] Connect to bank success',
    connectFailed = '[Banks] Connect to bank filed',
}

export class LoadedBanks implements Action {
    readonly type = BanksActionTypes.loadedBanks;

    constructor(public payload: Array<IBank>) {
    }
}

export class LoadBanks implements Action {
    readonly type = BanksActionTypes.loadBanks;

    constructor(public payload: string) {
    }
}

export class ChangeBank implements Action {
    readonly type = BanksActionTypes.changeBank;

    constructor(public payload: IBank) {
    }
}

export class ResetBank implements Action {
    readonly type = BanksActionTypes.resetBank;
}

export class Connect implements Action {
    readonly type = BanksActionTypes.connect;

    constructor(public payload: IConnect) {
    }
}

export class ConnectSuccess implements Action {
    readonly type = BanksActionTypes.connectSuccess;
}

export class ConnectFailed implements Action {
    readonly type = BanksActionTypes.connectFailed;
}

export type BanksActions =
    | LoadBanks
    | ChangeBank
    | ResetBank
    | Connect
    | ConnectSuccess
    | LoadedBanks
    | ConnectFailed;
