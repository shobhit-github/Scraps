import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import {ISecuritySettings} from '../../interfaces/security.interfaces';

@Component({
    selector: 'app-two-factor-settings',
    templateUrl: './two-factor-settings.component.html',
    styleUrls: ['./two-factor-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwoFactorSettingsComponent implements OnInit {
    @Input() public data: ISecuritySettings;
    @Output() public OnToggleTFA = new EventEmitter<0 | 1>();

    constructor() {
    }

    ngOnInit() {
    }
}
