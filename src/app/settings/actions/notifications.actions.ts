import {Action} from '@ngrx/store';
import {
    INotificationsSettings,
    INotificationsRequest,
} from '../interfaces/notifications.interfaces';

export enum NotificationsActionTypes {
    Load = '[Notifications] Load Notifications',
    SuccessLoad = '[Notifications] Success Load Notifications',
    FailedLoad = '[Notifications] Failed Load Notifications',
    UpdateNotification = '[Notifications] Update Notifications',
    SuccessUpdateNotification = '[Notifications] Success Update Notifications',
    FailedUpdateNotification = '[Notifications] Failed Update Notifications',
    UpdateDesktop = '[Notifications] Update Desktop Notifications',
    SuccessUpdateDesktop = '[Notifications] Success Update Desktop Notifications',
    FailedUpdateDesktop = '[Notifications] Failed Update Desktop Notifications',
}

export class Load implements Action {
    readonly type = NotificationsActionTypes.Load;
}

export class SuccessLoad implements Action {
    readonly type = NotificationsActionTypes.SuccessLoad;

    constructor(public payload: INotificationsSettings) {
    }
}

export class FailedLoad implements Action {
    readonly type = NotificationsActionTypes.FailedLoad;
}

export class UpdateNotification implements Action {
    readonly type = NotificationsActionTypes.UpdateNotification;

    constructor(public payload: Array<INotificationsRequest>) {
    }
}

export class SuccessUpdateNotification implements Action {
    readonly type = NotificationsActionTypes.SuccessUpdateNotification;
}

export class FailedUpdateNotification implements Action {
    readonly type = NotificationsActionTypes.FailedUpdateNotification;
}

export class UpdateDesktop implements Action {
    readonly type = NotificationsActionTypes.UpdateDesktop;

    constructor(public payload: 0 | 1) {
    }
}

export class SuccessUpdateDesktop implements Action {
    readonly type = NotificationsActionTypes.SuccessUpdateDesktop;

    constructor(public payload: 0 | 1) {
    }
}

export class FailedUpdateDesktop implements Action {
    readonly type = NotificationsActionTypes.FailedUpdateDesktop;
}

export type NotificationsActions =
    | Load
    | SuccessLoad
    | FailedLoad
    | UpdateNotification
    | SuccessUpdateNotification
    | FailedUpdateNotification
    | UpdateDesktop
    | SuccessUpdateDesktop
    | FailedUpdateDesktop;
