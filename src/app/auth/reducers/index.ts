import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromAuth from './auth.reducer';
import * as fromVerify from './verify.reducer';
import * as fromIdentity from './identity.reducer';
import * as fromBanks from './banks.reducer';
import * as fromStep from './step.reducer';
import * as fromDemographics from './demographics.reducer';
import {ILoginResponse} from '../interfaces/login.interface';

export interface AuthState {
    auth: fromAuth.State;
    banks: fromBanks.State;
    verify: fromVerify.State;
    identity: fromIdentity.State;
    step: fromStep.State;
    demographics: fromDemographics.State;
}

export interface State extends fromRoot.State {
    authContainer: AuthState;
}

export const reducersAuth: ActionReducerMap<AuthState> = {
    auth: fromAuth.reducer,
    banks: fromBanks.reducer,
    verify: fromVerify.reducer,
    identity: fromIdentity.reducer,
    step: fromStep.reducer,
    demographics: fromDemographics.reducer,
};

export const selectAuthState = createFeatureSelector<AuthState>(
    'authContainer',
);

export const selectStepState = createSelector(
    selectAuthState,
    (state: AuthState) => state.step.step,
);
export const getDemographics = createSelector(
    selectAuthState,
    (state: AuthState) => state.demographics,
);
export const getEmployments = createSelector(
    getDemographics,
    (state: fromDemographics.State) => state.employmentList,
);
export const getIncome = createSelector(
    getDemographics,
    (state: fromDemographics.State) => state.incomeList,
);
export const getSuccess = createSelector(
    getDemographics,
    (state: fromDemographics.State) => state.success,
);
export const selectAuthPendingState = createSelector(
    selectAuthState,
    (state: AuthState) => state.auth.isPending,
);
export const getTFA = createSelector(selectAuthState, (state: AuthState) => {
    return state.auth.two_factor_auth;
});
export const selectAuthChangePasswordSuccessState = createSelector(
    selectAuthState,
    (state: AuthState) => state.auth.changePasswordSuccess,
);
export const selectAuthChangePasswordFailedState = createSelector(
    selectAuthState,
    (state: AuthState) => state.auth.changePasswordFailed,
);
export const selectAuthRegisterSuccessState = createSelector(
    selectAuthState,
    (state: AuthState) => state.auth.registerSuccess,
);
export const selectAuthRegisterFailedState = createSelector(
    selectAuthState,
    (state: AuthState) => state.auth.registerFailed,
);
export const selectAuthLoginSuccessState = createSelector(
    selectAuthState,
    (state: AuthState) => state.auth.loginSuccess,
);
export const selectAuthLoginFailedState = createSelector(
    selectAuthState,
    (state: AuthState) => state.auth.loginFailed,
);
export const selectAuthCodeSuccessState = createSelector(
    selectAuthState,
    (state: AuthState) => state.auth.codeSuccess,
);
export const selectAuthCodeFailedState = createSelector(
    selectAuthState,
    (state: AuthState) => state.auth.codeFailed,
);
export const selectAuthForgotSuccessState = createSelector(
    selectAuthState,
    (state: AuthState) => state.auth.forgotSuccess,
);
export const selectAuthForgotFailedState = createSelector(
    selectAuthState,
    (state: AuthState) => state.auth.forgotFailed,
);
export const selectAuthIsAuthState = createSelector(
    selectAuthState,
    (state: AuthState) => state.auth.isAuth,
);
export const selectAuthStepState = createSelector(
    selectAuthState,
    (state: AuthState) => state.auth.step,
);
export const selectAuthEmailState = createSelector(
    selectAuthState,
    (state: AuthState) => state.auth.userEmail,
);
export const getAuth = createSelector(
    selectAuthState,
    (state: AuthState) => state.auth,
);
export const getLoginData = createSelector(
    getAuth,
    (state: fromAuth.State) => state.loginData,
);
export const getIsTokenValid = createSelector(
    getAuth,
    (state: fromAuth.State) => state.resetTokenValid,
);
export const getUserStatus = createSelector(
    getLoginData,
    (state: ILoginResponse) => state.status,
);
export const selectVerifyCountryState = createSelector(
    selectAuthState,
    (state: AuthState) => state.verify.isSelectedCountry,
);
export const selectVerifyPendingState = createSelector(
    selectAuthState,
    (state: AuthState) => state.verify.isPending,
);
export const selectVerifyStepState = createSelector(
    selectAuthState,
    (state: AuthState) => state.verify.step,
);
export const selectVerifyPhoneSuccessState = createSelector(
    selectAuthState,
    (state: AuthState) => state.verify.isPhoneSuccess,
);
export const getPhone = createSelector(
    selectAuthState,
    (state: AuthState) => state.verify.phone,
);
export const getCountry = createSelector(
    selectAuthState,
    (state: AuthState) => state.verify.country,
);
export const getPhoneAndCountry = createSelector(
    selectAuthState,
    (state: AuthState) => ({
        phone: state.verify.phone,
        country: state.verify.country,
    }),
);
export const selectVerifyPhoneFailedState = createSelector(
    selectAuthState,
    (state: AuthState) => state.verify.isPhoneFailed,
);
export const selectVerifyCodeSuccessState = createSelector(
    selectAuthState,
    (state: AuthState) => state.verify.isCodeSuccess,
);
export const selectVerifyCodeFailedState = createSelector(
    selectAuthState,
    (state: AuthState) => state.verify.isCodeFailed,
);

export const selectIdetityPendingState = createSelector(
    selectAuthState,
    (state: AuthState) => state.identity.isPending,
);
export const selectIdetityTypeState = createSelector(
    selectAuthState,
    (state: AuthState) => state.identity.type,
);
export const selectIdetityUploadSuccessState = createSelector(
    selectAuthState,
    (state: AuthState) => state.identity.uploadSuccess,
);
export const selectIdetityUploadFailedState = createSelector(
    selectAuthState,
    (state: AuthState) => state.identity.uploadFailed,
);

export const selectBanksPendingState = createSelector(
    selectAuthState,
    (state: AuthState) => state.banks.isPending,
);
export const selectBanksListState = createSelector(
    selectAuthState,
    (state: AuthState) => state.banks.bankList,
);
export const selectBanksActiveBankState = createSelector(
    selectAuthState,
    (state: AuthState) => state.banks.bank,
);
export const selectBanksConnectSuccessState = createSelector(
    selectAuthState,
    (state: AuthState) => state.banks.connectionSuccess,
);
export const selectBanksConnectFailedState = createSelector(
    selectAuthState,
    (state: AuthState) => state.banks.connectionFailed,
);
export const selectBanksStepState = createSelector(
    selectAuthState,
    (state: AuthState) => state.banks.step,
);
