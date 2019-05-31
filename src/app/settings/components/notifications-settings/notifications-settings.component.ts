import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
    Output,
    EventEmitter,
} from '@angular/core';
import {
    INotification,
    INotificationsRequest,
} from '../../interfaces/notifications.interfaces';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-notifications-settings',
    templateUrl: './notifications-settings.component.html',
    styleUrls: ['./notifications-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsSettingsComponent implements OnInit, OnChanges {
    @Input() public list: Array<INotification>;
    @Input() public isDesktop: 1 | 0;
    @Output() public OnSubmit = new EventEmitter<Array<INotificationsRequest>>();
    @Output() public OnToggleDesktop = new EventEmitter<0 | 1>();
    public form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.save();
    }

    ngOnChanges() {
        this.save();
    }

    onSubmit(form: FormGroup) {
        this.OnSubmit.emit(this.convert(form.value));
    }

    toggleDesktop() {
        this.OnToggleDesktop.emit(!this.isDesktop ? 1 : 0);
    }

    private save() {
        if (this.list.length > 0) {
            const config = this.list.reduce(
                (memo, pair) => ({
                    ...memo,
                    [pair.notification.id]: pair.status,
                }),
                {},
            );
            this.form = this.fb.group(config);
        }
    }

    private convert(value: any): Array<INotificationsRequest> {
        const converted = Object.entries(value).map(([key, val]) => ({
            notification_id: Number(key),
            status: <0 | 1>(<boolean>val ? 1 : 0),
        }));
        return converted;
    }
}
