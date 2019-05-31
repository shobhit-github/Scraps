import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    Input,
} from '@angular/core';

@Component({
    selector: 'app-plaid',
    templateUrl: './plaid.component.html',
    styleUrls: ['./plaid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaidComponent implements OnInit {
    @Input() isRegister = false;
    @Input() ready = false;

    constructor() {
    }

    ngOnInit() {
    }
}
