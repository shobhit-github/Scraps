import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';

@Component({
    selector: 'app-ico-follow',
    templateUrl: './ico-follow.component.html',
    styleUrls: ['../../styles.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcoFollowComponent implements OnInit {
    @Input()
    soc;

    constructor() {
    }

    ngOnInit() {
    }
}
