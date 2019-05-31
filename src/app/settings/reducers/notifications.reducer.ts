import {Action} from '@ngrx/store';
import {
    NotificationsActions,
    NotificationsActionTypes,
} from '../actions/notifications.actions';
import {
    INotificationsSettings,
    INotification,
} from '../interfaces/notifications.interfaces';

export interface State extends INotificationsSettings {
    desktop_notification: 0 | 1;
    user_notifications: Array<INotification>;
}

export const initialState: State = {
    desktop_notification: 0,
    user_notifications: [],
};

export function reducer(
    state = initialState,
    action: NotificationsActions,
): State {
    switch (action.type) {
        case NotificationsActionTypes.SuccessLoad:
            return {...state, ...action.payload};
        case NotificationsActionTypes.SuccessUpdateDesktop:
            return {...state, desktop_notification: action.payload};

        default:
            return state;
    }
}
