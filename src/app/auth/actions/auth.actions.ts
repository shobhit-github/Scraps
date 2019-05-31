import {Action} from '@ngrx/store';
import {IRegisterInfo} from '../interfaces/register.interface';
import {ILoginResponse, ILoginRequest} from '../interfaces/login.interface';
import {IForgotRequest} from '../interfaces/forgot.interface';
import {IChangePasswordRequest} from '../interfaces/change.interface';

export enum AuthActionTypes {
    registerInit = '[Auth] User init',
    register = '[Auth] User register',
    registerSuccess = '[Auth] User success register',
    registerFailed = '[Auth] User failed register',
    registerReset = '[Auth] User reset register',
    forgot = '[Auth] User forgot password',
    forgotSuccess = '[Auth] User success forgot password',
    forgotFailed = '[Auth] User failed forgot password',
    changePassword = '[Auth] User change password',
    changePasswordFailed = '[Auth] User failed change password',
    changePasswordSuccess = '[Auth] User success change password',
    logout = '[Auth] User logout',
    logouted = '[Auth] User logouted',
    login = '[Auth] User login',
    loginSuccess = '[Auth] User success login',
    registerLoginSuccess = '[Auth] User success login from register',
    loginFailed = '[Auth] User failed login',
    pending = '[Auth] Data is pending',
    pendingEnd = '[Auth] Data is pending finished',
    stepIncrement = '[Auth] next step',
    stepDecrement = '[Auth] back step',
    ResendLoginCode = '[Auth] login code resend',
    SuccessResendLoginCode = '[Auth] login code resend success',
    FailedResendLoginCode = '[Auth] login code resend failed',
    LoginCode = '[Auth] login code',
    SuccessLoginCode = '[Auth] login code success',
    FailedLoginCode = '[Auth] login code failed',
    CheckToken = '[Auth] Check Reset Token',
    CheckTokenSuccess = '[Auth] Check Reset Token Success',
    CheckTokenFail = '[Auth] Check Reset Token Fail',
    RefreshToken = '[Auth] Refresh Token',
    RefreshTokenSuccess = '[Auth] Refresh Token Success',
    RefreshTokenFail = '[Auth] Refresh Token Fail',
    ForceTokenUpdate = '[Auth] Force Token Update',
}

export class RefreshToken implements Action {
    readonly type = AuthActionTypes.RefreshToken;

    constructor(public payload: Function) {
    }
}

export class RefreshTokenSuccess implements Action {
    readonly type = AuthActionTypes.RefreshTokenSuccess;

    constructor(public payload: ILoginResponse) {
    }
}

export class RefreshTokenFail implements Action {
    readonly type = AuthActionTypes.RefreshTokenFail;
}

export class Login implements Action {
    readonly type = AuthActionTypes.login;

    constructor(public payload: ILoginRequest) {
    }
}

export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.loginSuccess;

    constructor(public payload: ILoginResponse, public isAdmin?: boolean) {
    }
}

export class RegisterLoginSuccess implements Action {
    readonly type = AuthActionTypes.registerLoginSuccess;

    constructor(public payload: ILoginResponse) {
    }
}

export class ResendLoginCode implements Action {
    readonly type = AuthActionTypes.ResendLoginCode;
}

export class SuccessResendLoginCode implements Action {
    readonly type = AuthActionTypes.SuccessResendLoginCode;
}

export class FailedResendLoginCode implements Action {
    readonly type = AuthActionTypes.FailedResendLoginCode;
}

export class LoginCode implements Action {
    readonly type = AuthActionTypes.LoginCode;

    constructor(public payload: string) {
    }
}

export class SuccessLoginCode implements Action {
    readonly type = AuthActionTypes.SuccessLoginCode;
}

export class FailedLoginCode implements Action {
    readonly type = AuthActionTypes.FailedLoginCode;
}

export class LoginFailed implements Action {
    readonly type = AuthActionTypes.loginFailed;
}

export class Register implements Action {
    readonly type = AuthActionTypes.register;

    constructor(public payload: IRegisterInfo) {
    }
}

export class RegisterSuccess implements Action {
    readonly type = AuthActionTypes.registerSuccess;

    constructor(public payload: ILoginResponse) {
    }
}

export class RegisterFailed implements Action {
    readonly type = AuthActionTypes.registerFailed;
}

export class RegisterInit implements Action {
    readonly type = AuthActionTypes.registerInit;
}

export class RegisterReset implements Action {
    readonly type = AuthActionTypes.registerReset;
}

export class Forgot implements Action {
    readonly type = AuthActionTypes.forgot;

    constructor(public payload: IForgotRequest) {
    }
}

export class ForgotFailed implements Action {
    readonly type = AuthActionTypes.forgotFailed;
}

export class ForgotSuccess implements Action {
    readonly type = AuthActionTypes.forgotSuccess;
}

export class ChangePassword implements Action {
    readonly type = AuthActionTypes.changePassword;

    constructor(public payload: IChangePasswordRequest) {
    }
}

export class ChangePasswordFailed implements Action {
    readonly type = AuthActionTypes.changePasswordFailed;
}

export class ChangePasswordSuccess implements Action {
    readonly type = AuthActionTypes.changePasswordSuccess;
}

export class Pending implements Action {
    readonly type = AuthActionTypes.pending;
}

export class PendingEnd implements Action {
    readonly type = AuthActionTypes.pendingEnd;
}

export class Logout implements Action {
    readonly type = AuthActionTypes.logout;
}

export class Logouted implements Action {
    readonly type = AuthActionTypes.logouted;
}

export class NextStep implements Action {
    readonly type = AuthActionTypes.stepIncrement;
}

export class BackStep implements Action {
    readonly type = AuthActionTypes.stepDecrement;
}

export class CheckToken implements Action {
    readonly type = AuthActionTypes.CheckToken;

    constructor(public payload: { token: string; user_id: string | number }) {
    }
}

export class CheckTokenSuccess implements Action {
    readonly type = AuthActionTypes.CheckTokenSuccess;
}

export class CheckTokenFail implements Action {
    readonly type = AuthActionTypes.CheckTokenFail;
}

export class ForceTokenUpdate implements Action {
    readonly type = AuthActionTypes.ForceTokenUpdate;

    constructor(public payload: { two_factor_auth: (0 | 1) }) {
    }
}

export type AuthActions =
    | Pending
    | PendingEnd
    | Register
    | RegisterInit
    | RegisterSuccess
    | RegisterFailed
    | Forgot
    | ForgotSuccess
    | ForgotFailed
    | ChangePassword
    | ChangePasswordFailed
    | ChangePasswordSuccess
    | Logout
    | Logouted
    | Login
    | LoginSuccess
    | RegisterLoginSuccess
    | RegisterReset
    | LoginFailed
    | NextStep
    | BackStep
    | ResendLoginCode
    | SuccessResendLoginCode
    | FailedResendLoginCode
    | LoginCode
    | SuccessLoginCode
    | FailedLoginCode
    | CheckToken
    | CheckTokenSuccess
    | CheckTokenFail
    | RefreshToken
    | RefreshTokenSuccess
    | RefreshTokenFail
    | ForceTokenUpdate
    ;
