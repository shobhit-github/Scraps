import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import * as fromUser from '../../reducers/user.reducer';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit {
    @Input() user: fromUser.State;
    @Input() big = false;
    @Input() bigger = false;
    @Input() biggest = false;

    constructor() {
    }

    ngOnInit() {
    }
}
