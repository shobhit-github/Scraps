import {Action} from '@ngrx/store';

export enum VerifyNumberActionTypes {
    LoadVerifyNumbers = '[VerifyNumber] Load VerifyNumbers',
    selectedCountry = '[VerifyNumber] new country selected',
    phoneSend = '[VerifyNumber] phone sended to server',
    phoneSuccess = '[VerifyNumber] phone success',
    phoneFailed = '[VerifyNumber] phone failed',
    codeSend = '[VerifyNumber] code sended to server',
    codeSuccess = '[VerifyNumber] code success',
    codeFailed = '[VerifyNumber] code failed',
    stepIncrement = '[VerifyNumber] next step',
    stepDecrement = '[VerifyNumber] back step',
    ResendRegisterCode = '[Auth] register code resend',
    SuccessResendRegisterCode = '[Auth] register code resend success',
    FailedResendRegisterCode = '[Auth] register code resend failed',
}

export class VerifyNumber implements Action {
    readonly type = VerifyNumberActionTypes.LoadVerifyNumbers;
}

export class SelectedCountry implements Action {
    readonly type = VerifyNumberActionTypes.selectedCountry;
}

export class PhoneSend implements Action {
    readonly type = VerifyNumberActionTypes.phoneSend;

    constructor(public payload: { phone: string; country: string }) {
    }
}

export class PhoneSuccess implements Action {
    readonly type = VerifyNumberActionTypes.phoneSuccess;
}

export class PhoneFailed implements Action {
    readonly type = VerifyNumberActionTypes.phoneFailed;
}

export class CodeSend implements Action {
    readonly type = VerifyNumberActionTypes.codeSend;

    constructor(public payload: { code: string }) {
    }
}

export class CodeSuccess implements Action {
    readonly type = VerifyNumberActionTypes.codeSuccess;
}

export class CodeFailed implements Action {
    readonly type = VerifyNumberActionTypes.codeFailed;
}

export class NextStep implements Action {
    readonly type = VerifyNumberActionTypes.stepIncrement;
}

export class BackStep implements Action {
    readonly type = VerifyNumberActionTypes.stepDecrement;
}

export class ResendRegisterCode implements Action {
    readonly type = VerifyNumberActionTypes.ResendRegisterCode;
}

export class SuccessResendRegisterCode implements Action {
    readonly type = VerifyNumberActionTypes.SuccessResendRegisterCode;
}

export class FailedResendRegisterCode implements Action {
    readonly type = VerifyNumberActionTypes.FailedResendRegisterCode;
}

export type VerifyNumberActions =
    | NextStep
    | BackStep
    | VerifyNumber
    | SelectedCountry
    | PhoneSend
    | PhoneSuccess
    | PhoneFailed
    | CodeSend
    | CodeSuccess
    | CodeFailed
    | ResendRegisterCode
    | SuccessResendRegisterCode
    | FailedResendRegisterCode;
