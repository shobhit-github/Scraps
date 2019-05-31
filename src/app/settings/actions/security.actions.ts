import {Action} from '@ngrx/store';
import {
    ISecuritySettings,
    ISecuritySettingsPhone,
    IBankSettings,
    IPlaidSettings,
} from '../interfaces/security.interfaces';

export enum SecurityActionTypes {
    Load = '[Security] Load',
    SuccessLoad = '[Security] Success Load',
    FailedLoad = '[Security] Failed Load',
    LoadBanks = '[Security] Load Banks',
    SuccessLoadBanks = '[Security] Success Load Banks',
    FailedLoadBanks = '[Security] Failed Load Banks',
    LoadPlaid = '[Security] Load Plaid Banks',
    SuccessLoadPlaid = '[Security] Success Load Plaid Banks',
    FailedLoadPlaid = '[Security] Failed Load Plaid Banks',
    InitUpdatePhone = '[Security] Init Update Phone',
    ResetUpdatePhone = '[Security] Reset Update Phone',
    UpdatePhone = '[Security] Update Phone',
    SuccessUpdatePhone = '[Security] Success Update Phone',
    FailedUpdatePhone = '[Security] Failed Update Phone',
    UpdatePhoneWithCode = '[Security] Update Phone With Code',
    SuccessUpdatePhoneWithCode = '[Security] Success Update Phone With Code',
    FailedUpdatePhoneWithCode = '[Security] Failed Update Phone With Code',
    UpdateCloseAccount = '[Security] Update Close Account',
    SuccessUpdateCloseAccount = '[Security] Success Close Account',
    FailedUpdateCloseAccount = '[Security] Failed Close Account',
    UpdateTFA = '[Security] Update Two Factor Auth',
    SuccessUpdateTFA = '[Security] Success Update Two Factor Auth',
    FailedUpdateTFA = '[Security] Failed Update Two Factor Auth',
}

export class Load implements Action {
    readonly type = SecurityActionTypes.Load;
}

export class SuccessLoad implements Action {
    readonly type = SecurityActionTypes.SuccessLoad;

    constructor(public payload: ISecuritySettings) {
    }
}

export class FailedLoad implements Action {
    readonly type = SecurityActionTypes.FailedLoad;
}

export class UpdatePhone implements Action {
    readonly type = SecurityActionTypes.UpdatePhone;

    constructor(public payload: ISecuritySettingsPhone) {
    }
}

export class InitUpdatePhone implements Action {
    readonly type = SecurityActionTypes.InitUpdatePhone;
}

export class ResetUpdatePhone implements Action {
    readonly type = SecurityActionTypes.ResetUpdatePhone;
}

export class SuccessUpdatePhone implements Action {
    readonly type = SecurityActionTypes.SuccessUpdatePhone;
}

export class FailedUpdatePhone implements Action {
    readonly type = SecurityActionTypes.FailedUpdatePhone;
}

export class UpdatePhoneWithCode implements Action {
    readonly type = SecurityActionTypes.UpdatePhoneWithCode;

    constructor(public payload: ISecuritySettingsPhone) {
    }
}

export class SuccessUpdatePhoneWithCode implements Action {
    readonly type = SecurityActionTypes.SuccessUpdatePhoneWithCode;
}

export class FailedUpdatePhoneWithCode implements Action {
    readonly type = SecurityActionTypes.FailedUpdatePhoneWithCode;
}

export class UpdateCloseAccount implements Action {
    readonly type = SecurityActionTypes.UpdateCloseAccount;
}

export class SuccessUpdateCloseAccount implements Action {
    readonly type = SecurityActionTypes.SuccessUpdateCloseAccount;
}

export class FailedUpdateCloseAccount implements Action {
    readonly type = SecurityActionTypes.FailedUpdateCloseAccount;
}

export class UpdateTFA implements Action {
    readonly type = SecurityActionTypes.UpdateTFA;

    constructor(public payload: 0 | 1) {
    }
}

export class SuccessUpdateTFA implements Action {
    readonly type = SecurityActionTypes.SuccessUpdateTFA;

    constructor(public payload: 0 | 1) {
    }
}

export class FailedUpdateTFA implements Action {
    readonly type = SecurityActionTypes.FailedUpdateTFA;
}

export class LoadBanks implements Action {
    readonly type = SecurityActionTypes.LoadBanks;

    constructor(public payload: ISecuritySettings) {
    }
}

export class SuccessLoadBanks implements Action {
    readonly type = SecurityActionTypes.SuccessLoadBanks;

    constructor(public payload: Array<Array<IBankSettings>>) {
    }
}

export class FailedLoadBanks implements Action {
    readonly type = SecurityActionTypes.FailedLoadBanks;
}

export class LoadPlaid implements Action {
    readonly type = SecurityActionTypes.LoadPlaid;

    constructor(public payload: ISecuritySettings) {
    }
}

export class SuccessLoadPlaid implements Action {
    readonly type = SecurityActionTypes.SuccessLoadPlaid;

    constructor(public payload: Array<IPlaidSettings>) {
    }
}

export class FailedLoadPlaid implements Action {
    readonly type = SecurityActionTypes.FailedLoadPlaid;
}

export type SecurityActions =
    | Load
    | SuccessLoad
    | FailedLoad
    | UpdateCloseAccount
    | SuccessUpdateCloseAccount
    | FailedUpdateCloseAccount
    | UpdateTFA
    | SuccessUpdateTFA
    | FailedUpdateTFA
    | UpdatePhone
    | InitUpdatePhone
    | ResetUpdatePhone
    | SuccessUpdatePhone
    | FailedUpdatePhone
    | LoadBanks
    | SuccessLoadBanks
    | FailedLoadBanks
    | LoadPlaid
    | SuccessLoadPlaid
    | FailedLoadPlaid
    | UpdatePhoneWithCode
    | SuccessUpdatePhoneWithCode
    | FailedUpdatePhoneWithCode;
