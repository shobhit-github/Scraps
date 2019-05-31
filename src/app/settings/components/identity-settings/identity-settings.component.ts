import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import {IFileMessageResponse} from '../../../message/interfaces/chat.interfaces';

@Component({
    selector: 'app-identity-settings',
    templateUrl: './identity-settings.component.html',
    styleUrls: ['./identity-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentitySettingsComponent implements OnInit {
    @Input() public fileList: Array<IFileMessageResponse>;
    @Output() public OnUpload = new EventEmitter<undefined>();

    constructor() {
    }

    ngOnInit() {
    }
}
