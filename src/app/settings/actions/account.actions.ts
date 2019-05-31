import {Action} from '@ngrx/store';
import {
    IAccountSettings,
    IAccountPreference,
    IAccountAddress,
    IAccountPersonal,
} from '../interfaces/account.insterfaces';
import {IChangePasswordSettings} from '../interfaces/change-password.interfaces';

export enum AccountActionTypes {
    LoadAccountSettings = '[Account] Load',
    SuccessAccountSettings = '[Account] Success Load',
    FailedAccountSettings = '[Account] Failed Load',
    UpdatePersonal = '[Account] Update Personal',
    SuccessUpdatePersonal = '[Account] Success Update Personal',
    FailedUpdatePersonal = '[Account] Failed Update Personal',
    UpdateAddress = '[Account] Update Address',
    SuccessUpdateAddress = '[Account] Success Update Address',
    FailedUpdateAddress = '[Account] Failed Update Address',
    UpdatePreference = '[Account] Update Preference',
    SuccessUpdatePreference = '[Account] Success Update Preference',
    FailedUpdatePreference = '[Account] Failed Update Preference',
    UpdatePassword = '[Account] Update Password',
    SuccessUpdatePassword = '[Account] Success Update Password',
    FailedUpdatePassword = '[Account] Failed Update Password',
    SendCode = '[Account] Update Password Send Code',
    SuccessSendCode = '[Account] Success Update Password Send Code',
    FailedSendCode = '[Account] Failed Update Password Send Code',
}

export class LoadAccountSettings implements Action {
    readonly type = AccountActionTypes.LoadAccountSettings;
}

export class SuccessAccountSettings implements Action {
    readonly type = AccountActionTypes.SuccessAccountSettings;

    constructor(public payload: IAccountSettings) {
    }
}

export class FailedAccountSettings implements Action {
    readonly type = AccountActionTypes.FailedAccountSettings;
}

export class UpdatePersonal implements Action {
    readonly type = AccountActionTypes.UpdatePersonal;

    constructor(public payload: IAccountPersonal) {
    }
}

export class SuccessUpdatePersonal implements Action {
    readonly type = AccountActionTypes.SuccessUpdatePersonal;

    constructor(public payload: IAccountPersonal) {
    }
}

export class FailedUpdatePersonal implements Action {
    readonly type = AccountActionTypes.FailedUpdatePersonal;

    constructor(public payload: IAccountPersonal) {
    }
}

export class UpdateAddress implements Action {
    readonly type = AccountActionTypes.UpdateAddress;

    constructor(public payload: IAccountAddress) {
    }
}

export class SuccessUpdateAddress implements Action {
    readonly type = AccountActionTypes.SuccessUpdateAddress;

    constructor(public payload: IAccountAddress) {
    }
}

export class FailedUpdateAddress implements Action {
    readonly type = AccountActionTypes.FailedUpdateAddress;

    constructor(public payload: IAccountAddress) {
    }
}

export class UpdatePreference implements Action {
    readonly type = AccountActionTypes.UpdatePreference;

    constructor(public payload: IAccountPreference) {
    }
}

export class SuccessUpdatePreference implements Action {
    readonly type = AccountActionTypes.SuccessUpdatePreference;

    constructor(public payload: IAccountPreference) {
    }
}

export class FailedUpdatePreference implements Action {
    readonly type = AccountActionTypes.FailedUpdatePreference;

    constructor(public payload: IAccountPreference) {
    }
}

export class UpdatePassword implements Action {
    readonly type = AccountActionTypes.UpdatePassword;

    constructor(public payload: IChangePasswordSettings) {
    }
}

export class SuccessUpdatePassword implements Action {
    readonly type = AccountActionTypes.SuccessUpdatePassword;
}

export class FailedUpdatePassword implements Action {
    readonly type = AccountActionTypes.FailedUpdatePassword;
}

export class SendCode implements Action {
    readonly type = AccountActionTypes.SendCode;
}

export class SuccessSendCode implements Action {
    readonly type = AccountActionTypes.SuccessSendCode;
}

export class FailedSendCode implements Action {
    readonly type = AccountActionTypes.FailedSendCode;
}

export type AccountActions =
    | LoadAccountSettings
    | SuccessAccountSettings
    | FailedAccountSettings
    | UpdateAddress
    | SuccessUpdateAddress
    | FailedUpdateAddress
    | UpdatePreference
    | SuccessUpdatePreference
    | FailedUpdatePreference
    | UpdatePassword
    | SuccessUpdatePassword
    | FailedUpdatePassword
    | SendCode
    | SuccessSendCode
    | FailedSendCode;
