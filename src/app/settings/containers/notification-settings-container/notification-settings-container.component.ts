import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as fromStore from '../../reducers';
import * as fromNotifications from '../../actions/notifications.actions';
import {INotificationsRequest} from '../../interfaces/notifications.interfaces';

@Component({
    selector: 'app-notification-settings-container',
    templateUrl: './notification-settings-container.component.html',
    styleUrls: ['./notification-settings-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationSettingsContainerComponent implements OnInit {
    public notificationsList$ = this.store.pipe(
        select(fromStore.getNotificationsList),
    );
    public isDesktop$ = this.store.pipe(
        select(fromStore.getNotificationsIsDesktop),
    );

    constructor(private store: Store<fromStore.State>) {
        this.store.dispatch(new fromNotifications.Load());
    }

    ngOnInit() {
    }

    public saveNotifications(data: Array<INotificationsRequest>) {
        this.store.dispatch(new fromNotifications.UpdateNotification(data));
    }

    public toggleDesktop(status: 0 | 1) {
        this.store.dispatch(new fromNotifications.UpdateDesktop(status));
    }
}
