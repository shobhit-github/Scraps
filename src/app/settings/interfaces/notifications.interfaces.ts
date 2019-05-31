export interface INotificationsSettings {
    desktop_notification: 0 | 1;
    user_notifications: Array<INotification>;
}

export interface INotification {
    notification: {
        id: number;
        label: string;
    };
    status: 0 | 1;
}

export interface INotificationsRequest {
    notification_id: number;
    status: 0 | 1;
}
