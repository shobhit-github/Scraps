import {Action} from '@ngrx/store';
import {
    IAccountSettings,
    IAccountPersonal,
    IAccountAddress,
    IAccountPreference,
} from '../interfaces/account.insterfaces';

export enum SettingsActionTypes {
    LoadSecuritySettingsettings = '[Settings] Load Security Settings',
    UpdatePhone = '[Settings] Update Phone Security Settings',
    UpdateTFA = '[Settings] Update Two Factor Authentication Security Settings',
    AddBank = '[Settings] Add Bank Security Settings',
    RemoveBank = '[Settings] Remove Bank Security Settings',
    CloseAccount = '[Settings] Close Account Security Settings',

    LoadNotificationsSettings = '[Settings] Load Notifications Settings',
    UpdateNotifications = '[Settings] Update Notifications Settings',

    LoadManageCardsSettings = '[Settings] Load Manage Cards Settings',
    CancelCard = '[Settings] Cancel Card Manage Cards Settings',
    FreezeCard = '[Settings] Freeze Card Manage Cards Settings',

    Success = '[Settings] Success update',
    Fail = '[Settings] Fail update',
}

export class LoadSecuritySettingsettings implements Action {
    readonly type = SettingsActionTypes.LoadSecuritySettingsettings;
}

export class LoadNotificationsSettings implements Action {
    readonly type = SettingsActionTypes.LoadNotificationsSettings;
}

export class LoadManageCardsSettings implements Action {
    readonly type = SettingsActionTypes.LoadManageCardsSettings;
}

export type SettingsActions =
    | LoadSecuritySettingsettings
    | LoadNotificationsSettings
    | LoadManageCardsSettings;
