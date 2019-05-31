import {AuthActionTypes, AuthActions} from '../actions/auth.actions';
import {ILoginResponse} from '../interfaces/login.interface';

export interface State {
    isAuth: boolean;
    isPending: boolean;
    registerSuccess?: boolean;
    registerFailed?: boolean;
    loginSuccess?: boolean;
    loginFailed?: boolean;
    forgotSuccess?: boolean;
    forgotFailed?: boolean;
    changePasswordSuccess?: boolean;
    changePasswordFailed?: boolean;
    step: number;
    userEmail?: string;
    loginData?: ILoginResponse;
    two_factor_auth: 0 | 1;
    codeFailed?: boolean;
    codeSuccess?: boolean;
    resetTokenValid?: boolean;
}

export const initialState: State = {
    step: 1,
    isAuth: false,
    isPending: false,
    two_factor_auth: 0,
};

export function reducer(state = initialState, action: AuthActions): State {
    switch (action.type) {
        case AuthActionTypes.stepIncrement:
            return {...state, step: state.step + 1};
        case AuthActionTypes.stepDecrement:
            return {...state, step: state.step - 1};
        case AuthActionTypes.pending:
            return {...state, isPending: true};
        case AuthActionTypes.pendingEnd:
            return {...state, isPending: false};
        case AuthActionTypes.login:
            return {
                ...state,
                isPending: true,
                loginSuccess: false,
                loginFailed: false,
            };
        case AuthActionTypes.loginSuccess:
            return {
                ...state,
                isAuth: true,
                loginSuccess: true,
                loginFailed: false,
                isPending: false,
                loginData: action.payload,
                two_factor_auth: action.payload.two_factor_auth,
            };
        case AuthActionTypes.RefreshTokenSuccess:
            return {
                ...state,
                isAuth: true,
                loginSuccess: true,
                loginFailed: false,
                isPending: false,
                loginData: action.payload,
                two_factor_auth: action.payload.two_factor_auth,
            };
        case AuthActionTypes.registerLoginSuccess:
            return {
                ...state,
                isAuth: true,
                loginSuccess: true,
                loginFailed: false,
                isPending: false,
                loginData: action.payload,
                two_factor_auth: action.payload.two_factor_auth,
            };
        case AuthActionTypes.LoginCode:
            return {
                ...state,
                isPending: true,
                codeFailed: false,
                codeSuccess: false,
            };
        case AuthActionTypes.SuccessLoginCode:
            return {
                ...state,
                isPending: false,
                codeFailed: false,
                codeSuccess: true,
            };
        case AuthActionTypes.FailedLoginCode:
            return {
                ...state,
                isPending: false,
                codeFailed: true,
                codeSuccess: false,
            };
        case AuthActionTypes.loginFailed:
            return {
                ...state,
                isAuth: false,
                loginSuccess: false,
                loginFailed: true,
                isPending: false,
                loginData: undefined,
                two_factor_auth: 0,
            };
        case AuthActionTypes.logout:
            return {
                ...state,
                isAuth: false,
                isPending: false,
                registerSuccess: undefined,
                registerFailed: undefined,
                loginSuccess: undefined,
                loginFailed: undefined,
                forgotSuccess: undefined,
                forgotFailed: undefined,
                changePasswordSuccess: undefined,
                changePasswordFailed: undefined,
                step: 1,
                userEmail: undefined,
                two_factor_auth: 0,
            };
        case AuthActionTypes.logouted:
            return {
                ...state,
                isAuth: false,
                loginData: undefined,
                two_factor_auth: 0,
            };
        case AuthActionTypes.registerSuccess:
            return {
                ...state,
                isAuth: true,
                registerSuccess: true,
                registerFailed: false,
                loginSuccess: undefined,
                loginFailed: undefined,
                forgotSuccess: undefined,
                forgotFailed: undefined,
                changePasswordSuccess: undefined,
                changePasswordFailed: undefined,
            };
        case AuthActionTypes.registerFailed:
            return {
                ...state,
                isAuth: false,
                registerSuccess: false,
                registerFailed: true,
            };
        case AuthActionTypes.registerInit:
            return {...initialState};
        case AuthActionTypes.forgot:
            return {...state, isPending: true, userEmail: action.payload.email};
        case AuthActionTypes.forgotSuccess:
            return {
                ...state,
                forgotSuccess: true,
                forgotFailed: false,
                isPending: false,
            };
        case AuthActionTypes.forgotFailed:
            return {
                ...state,
                forgotSuccess: false,
                forgotFailed: true,
                isPending: false,
            };
        case AuthActionTypes.changePassword:
            return {...state, isPending: true};
        case AuthActionTypes.changePasswordSuccess:
            return {
                ...state,
                changePasswordSuccess: true,
                changePasswordFailed: false,
                isPending: false,
            };
        case AuthActionTypes.changePasswordFailed:
            return {
                ...state,
                changePasswordSuccess: false,
                changePasswordFailed: true,
                isPending: false,
            };
        case AuthActionTypes.registerReset:
            return {
                ...state,
                registerSuccess: false,
                registerFailed: false,
                isPending: false,
            };
        case AuthActionTypes.CheckToken:
            return {
                ...state,
                isPending: true,
            };
        case AuthActionTypes.CheckTokenSuccess:
            return {
                ...state,
                isPending: false,
                resetTokenValid: true,
            };
        case AuthActionTypes.CheckTokenFail:
            return {
                ...state,
                isPending: false,
                resetTokenValid: false,
            };
        case AuthActionTypes.ForceTokenUpdate:
            return {
                ...state,
                two_factor_auth: action.payload.two_factor_auth,
            };
        default:
            return state;
    }
}
