import {Action} from '@ngrx/store';
import {IWalletKeys} from '../interfaces/wallet.interfaces';

export enum WalletActionTypes {
    LoadWalletKeys = '[Wallet] Get Wallet Keys',
    SuccessLoadWalletKeys = '[Wallet] Success Load Wallet Keys',
    FailedLoadWalletKeys = '[Wallet] Failed Load Wallet Keys',
    UpdateWalletKeys = '[Wallet] Set Wallet Keys',
    SuccessUpdateWalletKeys = '[Wallet] Success Update Wallet Keys',
    FailedUpdateWalletKeys = '[Wallet] Failed Update Wallet Keys',
}

export class LoadWalletKeys implements Action {
    readonly type = WalletActionTypes.LoadWalletKeys;
}

export class SuccessLoadWalletKeys {
    readonly type = WalletActionTypes.SuccessLoadWalletKeys;

    constructor(public payload: IWalletKeys) {
    }
}

export class FailedLoadWalletKeys {
    readonly type = WalletActionTypes.FailedLoadWalletKeys;
}

export class UpdateWalletKeys implements Action {
    readonly type = WalletActionTypes.UpdateWalletKeys;

    constructor(public payload: IWalletKeys) {
    }
}

export class SuccessUpdateWalletKeys {
    readonly type = WalletActionTypes.SuccessUpdateWalletKeys;
}

export class FailedUpdateWalletKeys {
    readonly type = WalletActionTypes.FailedUpdateWalletKeys;
}

export type WalletActions =
    | LoadWalletKeys
    | SuccessLoadWalletKeys
    | FailedLoadWalletKeys
    | UpdateWalletKeys
    | SuccessUpdateWalletKeys
    | FailedUpdateWalletKeys
    ;
