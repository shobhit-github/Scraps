import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MemoizedSelector,
} from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromAccount from './account.reducer';
import * as fromProfile from './profile.reducer';
import * as fromSecurity from './security.reducer';
import * as fromStatuses from './statuses.reducer';
import * as fromNotifications from './notifications.reducer';
import * as fromReferral from './referral.reducer';
import * as fromIdentity from './identity.reducer';
import * as fromRoundUpsSettings from './round-ups-settings.reducer';
import * as fromWalletSettings from './wallet.reducer';

export interface SettingsState {
    account: fromAccount.State;
    statuses: fromStatuses.State;
    profile: fromProfile.State;
    security: fromSecurity.State;
    referral: fromReferral.State;
    notifications: fromNotifications.State;
    identity: fromIdentity.State;
    roundUpsSettings: fromRoundUpsSettings.State;
    walletSettings: fromWalletSettings.State;
}

export interface State extends fromRoot.State {
    settings: SettingsState;
}

export const reducers: ActionReducerMap<SettingsState> = {
    account: fromAccount.reducer,
    statuses: fromStatuses.reducer,
    profile: fromProfile.reducer,
    security: fromSecurity.reducer,
    notifications: fromNotifications.reducer,
    referral: fromReferral.reducer,
    identity: fromIdentity.reducer,
    roundUpsSettings: fromRoundUpsSettings.reducer,
    walletSettings: fromWalletSettings.reducer,
};

export const selectSettings = createFeatureSelector<SettingsState>('settings');
export const getRoundUps = createSelector(
    selectSettings,
    (state: SettingsState) => state.roundUpsSettings,
);
export const getIdentity = createSelector(
    selectSettings,
    (state: SettingsState) => state.identity,
);
export const getImages = createSelector(
    getIdentity,
    (state: fromIdentity.State) => state.images,
);
export const getStatuses = createSelector(
    selectSettings,
    (state: SettingsState) => state.statuses,
);
export const getNotifications = createSelector(
    selectSettings,
    (state: SettingsState) => state.notifications,
);
export const getReferral = createSelector(
    selectSettings,
    (state: SettingsState) => state.referral,
);
export const getReferralLink = createSelector(
    getReferral,
    (state: fromReferral.State) => state.link,
);
export const getNotificationsList = createSelector(
    getNotifications,
    (state: fromNotifications.State) => state.user_notifications,
);
export const getNotificationsIsDesktop = createSelector(
    getNotifications,
    (state: fromNotifications.State) => state.desktop_notification,
);
export const getSuccess = createSelector(
    getStatuses,
    (state: fromStatuses.State) => state.success,
);
export const getFailed = createSelector(
    getStatuses,
    (state: fromStatuses.State) => state.failed,
);
export const getAccount: MemoizedSelector<SettingsState,
    fromAccount.State> = createSelector(selectSettings, (state: SettingsState) => state.account);

export const getProfile = createSelector(
    selectSettings,
    (state: SettingsState) => state.profile,
);
export const getSecurity = createSelector(
    selectSettings,
    (state: SettingsState) => state.security,
);
export const getSecurityStep = createSelector(
    getSecurity,
    (state: fromSecurity.State) => state.step,
);
export const getSecurityError = createSelector(
    getSecurity,
    (state: fromSecurity.State) => state.error,
);

export const getPersonal = createSelector(
    getAccount,
    (state: fromAccount.State) => {
        return state.personal;
    },
);
export const getAddress = createSelector(
    getAccount,
    (state: fromAccount.State) => state.address,
);
export const getPreference = createSelector(
    getAccount,
    (state: fromAccount.State) => state.preference,
);
export const getWalletKeys = createSelector(
    selectSettings,
    (state: SettingsState) => state.walletSettings,
);
