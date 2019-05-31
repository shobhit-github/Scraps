import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Output,
    EventEmitter,
} from '@angular/core';

@Component({
    selector: 'app-close-account-settings',
    templateUrl: './close-account-settings.component.html',
    styleUrls: ['./close-account-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseAccountSettingsComponent {
    @Output() public OnCloseAccount = new EventEmitter<undefined>();

    constructor() {
    }

    onCloseAccount() {
        this.OnCloseAccount.emit();
    }
}
