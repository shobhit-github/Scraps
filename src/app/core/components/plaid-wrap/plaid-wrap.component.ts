import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';

@Component({
    selector: 'app-plaid-wrap',
    templateUrl: './plaid-wrap.component.html',
    styleUrls: ['./plaid-wrap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaidWrapComponent implements OnInit {
    @Input() public plaidStatus: boolean;

    constructor() {
    }

    ngOnInit() {
    }
}
