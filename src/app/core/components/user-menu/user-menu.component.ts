import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import * as fromUser from '../../reducers/user.reducer';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent implements OnInit {
    @Input() public user: fromUser.State;
    @Output() public OnLogout = new EventEmitter<undefined>();

    constructor() {
    }

    ngOnInit() {
    }
}
